'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  BookOpen,
  Check,
  ChevronDown,
  ClipboardPaste,
  Copy,
  Download,
  FileText,
  FolderPlus,
  Globe,
  Keyboard,
  Loader2,
  MoreHorizontal,
  Pencil,
  Plus,
  Quote,
  Redo2,
  Search,
  Share2,
  Trash2,
  Undo2,
  X,
} from 'lucide-react';
import { segmentsToHtml, segmentsToText, type SourceInput, type SourceType } from '@/utils/harvard';
import { autocite, LookupError } from '@/utils/cite/lookup';
import { detectQuery, tidyUrl } from '@/utils/cite/detect';
import type { CiteResult } from '@/utils/cite/types';
import {
  blankProject,
  decodeShare,
  DEFAULT_PREFS,
  encodeShare,
  FONTS,
  loadPrefs,
  loadStore,
  newId,
  savePrefs,
  saveStore,
  shownRefs,
  SIZES,
  STYLE_NAMES,
  type Prefs,
  type Project,
  type RefItem,
  type ReferenceStyle,
  type ShownRef,
  type SourceItem,
  type Store,
} from './store';
import { buildBibtex, buildDocx, buildRis, buildText, download, fileBase, heading } from './exporters';
import SourceEditor, { emptySource, PreEditor, TYPE_LABELS, today } from './SourceEditor';
import { copyRich, Rich } from './ui';

type Tab = 'website' | 'book' | 'journal' | SourceType;
const MAIN_TABS: { id: Tab; label: string; Icon: typeof Globe }[] = [
  { id: 'website', label: 'Website', Icon: Globe },
  { id: 'book', label: 'Book', Icon: BookOpen },
  { id: 'journal', label: 'Journal', Icon: FileText },
];
const MORE_TYPES: SourceType[] = ['chapter', 'newspaper', 'report', 'thesis', 'video', 'conference', 'lecture'];
const PLACEHOLDERS: Partial<Record<Tab, string>> = {
  website: 'Paste a web page link (URL)',
  book: 'Search by book title or author, or paste an ISBN',
  journal: 'Search by article title, or paste a DOI or article link',
};

type EditorState =
  | { kind: 'source'; mode: 'add' | 'edit'; id?: string; initial: SourceInput; notice?: string; tone?: 'ok' | 'warn' }
  | { kind: 'pre'; id?: string; text: string }
  | null;

const DEFAULT_ID = 'default';

function useClickOutside(open: boolean, close: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close]);
  return ref;
}

function authorsSummary(r: CiteResult): string {
  const d = r.data;
  if (d.org) return d.org;
  if (!d.authors.length) return '';
  const names = d.authors.slice(0, 3).map((a) => a.surname);
  return d.authors.length > 3 ? `${names.join(', ')} and others` : names.join(', ');
}

const refHtml = (r: ShownRef) => `<p style="margin:0 0 0.5em 0.5in;text-indent:-0.5in">${segmentsToHtml(r.segs)}</p>`;

export default function ReferenceWorkspace({ defaultStyle }: { defaultStyle: ReferenceStyle }) {
  const [store, setStore] = useState<Store>(() => {
    const p = blankProject('My project', defaultStyle);
    return { v: 1, current: DEFAULT_ID, projects: [{ ...p, id: DEFAULT_ID }] };
  });
  const [ready, setReady] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);
  const history = useRef<Record<string, { past: RefItem[][]; future: RefItem[][] }>>({});
  const [, setTick] = useState(0);

  const [tab, setTab] = useState<Tab>(defaultStyle === 'apa' ? 'journal' : 'website');
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [results, setResults] = useState<CiteResult[]>([]);
  const runId = useRef(0);

  const [editor, setEditor] = useState<EditorState>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [moreOpen, setMoreOpen] = useState(false);
  const [dlOpen, setDlOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [incoming, setIncoming] = useState<Project | null>(null);
  const [shareLink, setShareLink] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [renaming, setRenaming] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const moreRef = useClickOutside(moreOpen, useCallback(() => setMoreOpen(false), []));
  const dlRef = useClickOutside(dlOpen, useCallback(() => setDlOpen(false), []));

  const showToast = (text: string) => {
    setToast(text);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2600);
  };

  // Load saved projects and settings, and any shared list in the link
  useEffect(() => {
    setStore(loadStore(defaultStyle));
    setPrefs(loadPrefs());
    setReady(true);
    const m = /#refs=([A-Za-z0-9_-]+)/.exec(window.location.hash);
    if (m) void decodeShare(m[1]).then((p) => p && setIncoming(p));
  }, [defaultStyle]);

  useEffect(() => {
    if (ready && !saveStore(store)) showToast('Your browser did not let us save this list. Download it so you do not lose it.');
  }, [store, ready]);

  const project = store.projects.find((p) => p.id === store.current) ?? store.projects[0];
  const style = project.style;
  const refs = useMemo(() => shownRefs(project, prefs.sort), [project, prefs.sort]);
  const hist = history.current[project.id] ?? { past: [], future: [] };

  const updateProject = (id: string, fn: (p: Project) => Project) =>
    setStore((prev) => ({ ...prev, projects: prev.projects.map((p) => (p.id === id ? fn(p) : p)) }));

  /** Change the current project's references, with undo */
  const commitItems = (next: RefItem[]) => {
    const h = (history.current[project.id] ??= { past: [], future: [] });
    h.past.push(project.items);
    if (h.past.length > 50) h.past.shift();
    h.future = [];
    updateProject(project.id, (p) => ({ ...p, items: next }));
  };

  const undo = () => {
    const h = history.current[project.id];
    const prev = h?.past.pop();
    if (!h || !prev) return;
    h.future.push(project.items);
    updateProject(project.id, (p) => ({ ...p, items: prev }));
    setTick((t) => t + 1);
  };
  const redo = () => {
    const h = history.current[project.id];
    const next = h?.future.pop();
    if (!h || !next) return;
    h.past.push(project.items);
    updateProject(project.id, (p) => ({ ...p, items: next }));
    setTick((t) => t + 1);
  };

  // Ctrl+Z / Ctrl+Y outside text fields
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (editor || !(e.ctrlKey || e.metaKey)) return;
      const t = e.target as HTMLElement;
      if (t.closest('input, textarea, select, [contenteditable="true"]')) return;
      const k = e.key.toLowerCase();
      if (k === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if (k === 'y' || (k === 'z' && e.shiftKey)) {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const setPref = <K extends keyof Prefs>(k: K, v: Prefs[K]) => {
    const next = { ...prefs, [k]: v };
    setPrefs(next);
    savePrefs(next);
  };

  /* ---------- Projects ---------- */

  const newProject = () => {
    const p = blankProject(`Project ${store.projects.length + 1}`, style);
    setStore((prev) => ({ ...prev, current: p.id, projects: [...prev.projects, p] }));
    setSelected(new Set());
    setRenaming(p.id);
  };
  const switchProject = (id: string) => {
    setStore((prev) => ({ ...prev, current: id }));
    setSelected(new Set());
    setConfirmDelete(null);
  };
  const deleteProject = (id: string) => {
    setStore((prev) => {
      const rest = prev.projects.filter((p) => p.id !== id);
      const projects = rest.length ? rest : [blankProject('My project', style)];
      return { ...prev, projects, current: prev.current === id ? projects[0].id : prev.current };
    });
    delete history.current[id];
    setConfirmDelete(null);
    setSelected(new Set());
    showToast('Project deleted');
  };
  const renameProject = (id: string, name: string) => {
    updateProject(id, (p) => ({ ...p, name: name.trim().slice(0, 80) || p.name }));
    setRenaming(null);
  };

  /* ---------- Search ---------- */

  const openManual = (type: SourceType) => setEditor({ kind: 'source', mode: 'add', initial: emptySource(type) });

  const openFromCite = (r: CiteResult) => {
    const d = r.data;
    const missingDate = !d.year
      ? d.type === 'video'
        ? ' We could not find the upload date: it is shown under the video, so add the year (and the day and month for APA), or tick No date if there is none.'
        : ' We could not find the date, so add the year from the source, or tick No date if there is none.'
      : '';
    setEditor({
      kind: 'source',
      mode: 'add',
      initial: { ...d, noDate: false, accessed: today(), citePage: '' },
      notice: `We filled in the details from ${r.source}. Check them against your source before you save, especially the capitalisation of the title, the year and the edition.${missingDate}`,
      tone: 'ok',
    });
  };

  const runSearch = async (raw = q) => {
    const query = detectQuery(raw);
    if (query.kind === 'empty') {
      setMessage('Paste a DOI, ISBN or web link, or type at least three letters of the title.');
      return;
    }
    const id = ++runId.current;
    setBusy(true);
    setMessage('');
    setResults([]);
    try {
      const out = await autocite(raw);
      if (id !== runId.current) return;
      if (out.kind === 'single') openFromCite(out.result);
      else if (out.kind === 'many') {
        const want: SourceType = tab === 'website' ? 'website' : tab;
        setResults([...out.results].sort((a, b) => Number(b.data.type === want) - Number(a.data.type === want)));
      } else {
        setMessage(
          {
            doi: 'We could not find that DOI. Check it for typing errors, or fill in the details yourself.',
            isbn: 'We could not find that ISBN. Try searching by the book title instead, or fill in the details yourself.',
            url: 'We could not read that page. Fill in the details yourself.',
            title: 'No matches found. Try adding the author’s surname or the year, or fill in the details yourself.',
            empty: 'Paste a DOI, ISBN or web link, or type a title.',
          }[out.reason],
        );
      }
    } catch (e) {
      if (id !== runId.current) return;
      if (query.kind === 'url') {
        const reason = e instanceof LookupError && e.message && !/^HTTP/.test(e.message) ? `${e.message} ` : 'We could not read the details from that page. ';
        setEditor({
          kind: 'source',
          mode: 'add',
          initial: { ...emptySource('website'), url: tidyUrl(query.url) },
          notice: `${reason}We have added the link and today's date, so fill in the title, author and date.`,
          tone: 'warn',
        });
      } else {
        setMessage('The lookup service did not respond. Please try again in a moment, or fill in the details yourself.');
      }
    } finally {
      if (id === runId.current) setBusy(false);
    }
  };

  const pasteAndSearch = async () => {
    try {
      const text = (await navigator.clipboard.readText()).trim();
      if (!text) {
        setMessage('Your clipboard is empty. Copy a link, DOI or ISBN first.');
        return;
      }
      setQ(text);
      void runSearch(text);
    } catch {
      setMessage('Your browser did not allow us to read the clipboard. Paste into the box instead (Ctrl+V).');
    }
  };

  /* ---------- References ---------- */

  const saveSource = (src: SourceInput) => {
    if (editor?.kind === 'source' && editor.mode === 'edit' && editor.id) {
      commitItems(project.items.map((it) => (it.id === editor.id ? { id: it.id, added: it.added, src } : it)));
      showToast('Reference updated');
    } else {
      commitItems([...project.items, { id: newId(), added: Date.now(), src }]);
      setQ('');
      setResults([]);
      showToast('Saved to your project');
    }
    setEditor(null);
  };
  const savePre = (text: string) => {
    if (editor?.kind === 'pre' && editor.id) commitItems(project.items.map((it) => (it.id === editor.id ? { id: it.id, added: it.added, pre: text } : it)));
    else commitItems([...project.items, { id: newId(), added: Date.now(), pre: text }]);
    setEditor(null);
    showToast('Saved to your project');
  };
  const editRef = (id: string) => {
    const it = project.items.find((x) => x.id === id);
    if (!it) return;
    if ('src' in it) setEditor({ kind: 'source', mode: 'edit', id, initial: it.src });
    else if ('pre' in it) setEditor({ kind: 'pre', id, text: it.pre });
  };
  const removeRefs = (ids: string[]) => {
    commitItems(project.items.filter((it) => !ids.includes(it.id)));
    setSelected(new Set());
    showToast(ids.length > 1 ? `${ids.length} references deleted` : 'Reference deleted');
  };

  const chosen = selected.size ? refs.filter((r) => selected.has(r.id)) : refs;
  const copyList = async (list: ShownRef[]) => {
    if (!list.length) return;
    const ok = await copyRich(list.map(refHtml).join(''), list.map((r) => segmentsToText(r.segs)).join('\n\n'));
    showToast(ok ? `Copied ${list.length} reference${list.length > 1 ? 's' : ''}` : 'Copying did not work in this browser');
  };

  const sourceItems = (list: ShownRef[]) =>
    list.flatMap((r) => {
      const it = project.items.find((x) => x.id === r.id);
      return it && 'src' in it ? [it as SourceItem] : [];
    });

  const doDownload = (kind: 'docx' | 'txt' | 'ris' | 'bib') => {
    setDlOpen(false);
    const list = chosen;
    if (!list.length) {
      showToast('Add a reference first');
      return;
    }
    const base = fileBase(project.name);
    if (kind === 'docx') download(`${base}.docx`, buildDocx(list, style, prefs), 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    else if (kind === 'txt') download(`${base}.txt`, buildText(list, style), 'text/plain;charset=utf-8');
    else {
      const items = sourceItems(list);
      if (!items.length) {
        showToast('Only references made with the form can be exported to reference managers');
        return;
      }
      if (kind === 'ris') download(`${base}.ris`, buildRis(items), 'application/x-research-info-systems;charset=utf-8');
      else download(`${base}.bib`, buildBibtex(items), 'application/x-bibtex;charset=utf-8');
      if (items.length < list.length) showToast(`${list.length - items.length} pasted reference(s) were left out of this file`);
    }
  };

  const share = async () => {
    if (!project.items.length) {
      showToast('Add a reference first');
      return;
    }
    const code = await encodeShare(project);
    const link = `${window.location.origin}${window.location.pathname}#refs=${code}`;
    try {
      await navigator.clipboard.writeText(link);
      showToast('Share link copied. Anyone with the link can add a copy of this list.');
    } catch {
      setShareLink(link);
    }
  };

  const acceptIncoming = () => {
    if (!incoming) return;
    setStore((prev) => ({ ...prev, current: incoming.id, projects: [...prev.projects, incoming] }));
    setIncoming(null);
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
    showToast('Shared list added as a new project');
  };

  const activeType: SourceType = tab;
  const allSelected = refs.length > 0 && refs.every((r) => selected.has(r.id));
  const lineHeight = style === 'apa' ? 2 : 1.6;

  return (
    <div className="flex min-h-[640px] flex-col lg:flex-row">
      {/* Projects */}
      <aside className="hidden w-[232px] shrink-0 flex-col border-r border-gray-100 bg-gray-50 lg:flex">
        <div className="p-4">
          <button type="button" onClick={newProject} className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-bold text-navy shadow-sm hover:border-primary">
            <FolderPlus className="h-4 w-4" /> Start new project
          </button>
        </div>
        <p className="px-4 pb-2 text-[11px] font-black uppercase tracking-widest text-gray-500">Your projects</p>
        <ul className="flex-1 space-y-1 overflow-y-auto px-2 pb-4">
          {store.projects.map((p) => {
            const active = p.id === project.id;
            return (
              <li key={p.id}>
                {renaming === p.id ? (
                  <input
                    autoFocus
                    onFocus={(e) => e.target.select()}
                    defaultValue={p.name}
                    aria-label="Project name"
                    onBlur={(e) => renameProject(p.id, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') renameProject(p.id, (e.target as HTMLInputElement).value);
                      if (e.key === 'Escape') setRenaming(null);
                    }}
                    className="w-full rounded-lg border border-primary bg-white px-3 py-2 text-sm font-bold text-navy outline-none"
                  />
                ) : (
                  <div className={`group flex items-center rounded-lg ${active ? 'bg-primary/15 shadow-[inset_3px_0_0_#C9A227]' : 'hover:bg-white'}`}>
                    <button type="button" onClick={() => switchProject(p.id)} className="min-w-0 flex-1 truncate px-3 py-2 text-left text-sm font-bold text-navy" aria-current={active ? 'true' : undefined}>
                      {p.name}
                    </button>
                    <span className="pr-1 text-xs font-bold text-gray-500">{p.items.length}</span>
                    {active && (
                      <>
                        <button type="button" onClick={() => setRenaming(p.id)} className="rounded p-1.5 text-gray-500 hover:text-navy" aria-label={`Rename ${p.name}`} title="Rename">
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button type="button" onClick={() => setConfirmDelete(p.id)} className="rounded p-1.5 text-gray-500 hover:text-red-600" aria-label={`Delete ${p.name}`} title="Delete">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                )}
                {confirmDelete === p.id && (
                  <div className="mx-1 mt-1 rounded-lg border border-red-200 bg-red-50 p-2 text-xs text-red-900">
                    Delete this project and its {p.items.length} reference{p.items.length === 1 ? '' : 's'}?
                    <div className="mt-2 flex gap-2">
                      <button type="button" onClick={() => deleteProject(p.id)} className="rounded-md bg-red-600 px-2.5 py-1 font-bold text-white">Delete</button>
                      <button type="button" onClick={() => setConfirmDelete(null)} className="rounded-md px-2.5 py-1 font-bold text-red-900 hover:bg-red-100">Cancel</button>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        <p className="border-t border-gray-100 px-4 py-3 text-[11px] leading-relaxed text-gray-500">Projects are saved in this browser only. Download or share a list to keep a copy.</p>
      </aside>

      <div className="min-w-0 flex-1">
        {/* Top bar */}
        <div className="flex flex-wrap items-center gap-2 border-b border-gray-100 px-3 py-3 sm:px-5">
          {/* Phones and tablets: project picker */}
          <div className="flex w-full min-w-0 items-center gap-1 lg:hidden">
            <label htmlFor="project-pick" className="sr-only">Project</label>
            <select id="project-pick" value={project.id} onChange={(e) => switchProject(e.target.value)} className="min-w-0 flex-1 truncate rounded-lg border border-gray-200 bg-white px-2 py-2 text-sm font-bold text-navy">
              {store.projects.map((p) => (
                <option key={p.id} value={p.id}>{p.name} ({p.items.length})</option>
              ))}
            </select>
            <button type="button" onClick={newProject} className="rounded-lg p-2 text-navy hover:bg-gray-100" aria-label="Start new project" title="New project">
              <Plus className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => setRenaming(project.id)} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100" aria-label="Rename project" title="Rename">
              <Pencil className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => setConfirmDelete(project.id)} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-red-600" aria-label="Delete project" title="Delete">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div className="flex items-center gap-1">
            <button type="button" onClick={undo} disabled={!hist.past.length} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-navy disabled:opacity-30" aria-label="Undo" title="Undo (Ctrl+Z)">
              <Undo2 className="h-4 w-4" />
            </button>
            <button type="button" onClick={redo} disabled={!hist.future.length} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-navy disabled:opacity-30" aria-label="Redo" title="Redo (Ctrl+Y)">
              <Redo2 className="h-4 w-4" />
            </button>
          </div>
          <p className="hidden min-w-0 flex-1 truncate text-sm font-bold text-gray-600 lg:block">{project.name}</p>
          <div className="ml-auto flex items-center gap-2">
            <button type="button" onClick={share} className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 py-2 text-sm font-bold text-navy hover:border-primary">
              <Share2 className="h-4 w-4" /> <span className="hidden sm:inline">Share</span>
            </button>
            <div ref={dlRef} className="relative">
              <button type="button" onClick={() => setDlOpen((o) => !o)} aria-expanded={dlOpen} aria-haspopup="menu" className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-bold hover:brightness-110">
                <Download className="h-4 w-4" /> <span className="hidden sm:inline">Download References</span><span className="sm:hidden">Download</span> <ChevronDown className="h-4 w-4" />
              </button>
              {dlOpen && (
                <div role="menu" className="absolute right-0 z-30 mt-2 w-72 overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-xl">
                  <p className="px-4 pb-1 pt-2 text-[11px] font-bold text-gray-500">{selected.size ? `${selected.size} selected reference${selected.size > 1 ? 's' : ''}` : `All ${refs.length} references`}</p>
                  {[
                    { k: 'copy' as const, label: 'Copy to clipboard', note: 'Paste into Word or Google Docs with italics' },
                    { k: 'docx' as const, label: 'Word document (.docx)', note: 'Hanging indent, your font and size' },
                    { k: 'txt' as const, label: 'Plain text (.txt)', note: '' },
                    { k: 'ris' as const, label: 'RIS file', note: 'Zotero, EndNote, Mendeley' },
                    { k: 'bib' as const, label: 'BibTeX (.bib)', note: 'LaTeX and Overleaf' },
                  ].map((o) => (
                    <button
                      key={o.k}
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        if (o.k === 'copy') {
                          setDlOpen(false);
                          void copyList(chosen);
                        } else doDownload(o.k);
                      }}
                      className="block w-full px-4 py-2.5 text-left hover:bg-gray-50"
                    >
                      <span className="block text-sm font-bold text-navy">{o.label}</span>
                      {o.note && <span className="block text-xs text-gray-500">{o.note}</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          {(renaming === project.id || confirmDelete === project.id) && (
            <div className="w-full lg:hidden">
              {renaming === project.id ? (
                <input
                  autoFocus
                  onFocus={(e) => e.target.select()}
                  defaultValue={project.name}
                  aria-label="Project name"
                  onBlur={(e) => renameProject(project.id, e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && renameProject(project.id, (e.target as HTMLInputElement).value)}
                  className="w-full rounded-lg border border-primary px-3 py-2 text-base font-bold text-navy outline-none"
                />
              ) : (
                <div className="flex flex-wrap items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-2 text-sm text-red-900">
                  Delete this project and its {project.items.length} references?
                  <button type="button" onClick={() => deleteProject(project.id)} className="rounded-md bg-red-600 px-2.5 py-1 font-bold text-white">Delete</button>
                  <button type="button" onClick={() => setConfirmDelete(null)} className="rounded-md px-2.5 py-1 font-bold">Cancel</button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-5 bg-[#FAF9F6] px-3 py-5 sm:px-6 sm:py-6">
          {incoming && (
            <div role="status" className="flex flex-wrap items-center gap-3 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-navy">
              <span className="flex-1">
                Someone shared a reference list with you: <strong>{incoming.name}</strong> ({incoming.items.length} reference{incoming.items.length === 1 ? '' : 's'}).
              </span>
              <button type="button" onClick={acceptIncoming} className="rounded-lg bg-navy px-3 py-1.5 font-bold text-white">Add as a new project</button>
              <button type="button" onClick={() => setIncoming(null)} className="rounded-lg p-1.5 hover:bg-white/60" aria-label="Dismiss">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Cite a: */}
          <div>
            <div className="grid grid-cols-4 items-end border-b border-gray-200 sm:flex sm:gap-1" role="group" aria-label="Source type">
              <span className="hidden shrink-0 pb-2.5 pr-2 font-serif text-lg italic text-navy sm:inline">Cite a:</span>
              {MAIN_TABS.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={tab === id}
                  onClick={() => {
                    setTab(id);
                    setResults([]);
                    setMessage('');
                  }}
                  className={`-mb-px inline-flex min-w-0 items-center justify-center gap-1 border-b-[3px] px-1 py-2.5 text-xs font-bold sm:shrink-0 sm:gap-1.5 sm:px-4 sm:text-sm ${tab === id ? 'border-gold bg-white text-navy' : 'border-transparent text-gray-500 hover:text-navy'}`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" /> {label}
                </button>
              ))}
              <div ref={moreRef} className="relative min-w-0 sm:shrink-0">
                <button
                  type="button"
                  aria-expanded={moreOpen}
                  aria-haspopup="menu"
                  onClick={() => setMoreOpen((o) => !o)}
                  className={`-mb-px inline-flex w-full min-w-0 items-center justify-center gap-1 border-b-[3px] px-1 py-2.5 text-xs font-bold sm:w-auto sm:gap-1.5 sm:px-4 sm:text-sm ${MORE_TYPES.includes(tab as SourceType) ? 'border-gold bg-white text-navy' : 'border-transparent text-gray-500 hover:text-navy'}`}
                >
                  {MORE_TYPES.includes(tab as SourceType) ? <span className="truncate">{TYPE_LABELS[tab as SourceType]}</span> : <><MoreHorizontal className="h-4 w-4" aria-hidden="true" /> More</>}
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                </button>
                {moreOpen && (
                  <div role="menu" className="absolute right-0 z-30 mt-1 w-60 overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-xl">
                    {MORE_TYPES.map((t) => (
                      <button
                        key={t}
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          setTab(t);
                          setMoreOpen(false);
                          setResults([]);
                          setMessage('');
                        }}
                        className="block w-full px-4 py-2.5 text-left text-sm font-bold text-navy hover:bg-gray-50"
                      >
                        {TYPE_LABELS[t]}
                      </button>
                    ))}
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setMoreOpen(false);
                        setEditor({ kind: 'pre', text: '' });
                      }}
                      className="block w-full border-t border-gray-100 px-4 py-2.5 text-left text-sm font-bold text-navy hover:bg-gray-50"
                    >
                      Pre-formatted reference
                      <span className="block text-xs font-normal text-gray-500">Paste a reference you already have</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <form
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                void runSearch();
              }}
              className="rounded-b-xl rounded-tr-xl border border-t-0 border-gray-200 bg-white p-3 shadow-sm sm:p-4"
            >
              <label htmlFor="cite-q" className="sr-only">Find your source</label>
              <div className="flex flex-wrap gap-2 sm:flex-nowrap">
                <div className="relative min-w-0 flex-1 basis-full sm:basis-auto">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" aria-hidden="true" />
                  <input
                    id="cite-q"
                    type="text"
                    inputMode="search"
                    autoComplete="off"
                    spellCheck={false}
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder={PLACEHOLDERS[tab] ?? 'Paste a DOI or link, or search by title'}
                    className="w-full min-w-0 rounded-xl border border-gray-200 bg-gray-50 py-3 pl-9 pr-9 text-base text-navy outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/15"
                  />
                  {q && (
                    <button
                      type="button"
                      onClick={() => {
                        setQ('');
                        setResults([]);
                        setMessage('');
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 hover:text-navy"
                      aria-label="Clear search"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <button type="button" onClick={pasteAndSearch} className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gray-200 text-navy hover:border-primary" aria-label="Paste from clipboard and search" title="Paste and search">
                  <ClipboardPaste className="h-5 w-5" />
                </button>
                <button type="button" onClick={() => openManual(activeType)} className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 text-sm font-bold text-navy hover:border-primary" aria-label={`Fill in a ${TYPE_LABELS[activeType].toLowerCase()} reference yourself`} title="Fill in the details yourself">
                  <Keyboard className="h-5 w-5" /> <span className="hidden md:inline">Manual</span>
                </button>
                <button type="submit" disabled={busy} className="inline-flex h-12 flex-1 shrink-0 items-center justify-center gap-2 rounded-xl bg-navy px-6 text-sm font-black text-white hover:bg-navy-light disabled:opacity-60 sm:flex-none">
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Search className="h-4 w-4" aria-hidden="true" />} Search
                </button>
              </div>
              <div role="status" className="empty:hidden">
                {busy && <p className="mt-3 text-sm text-gray-600">Looking up your source...</p>}
                {message && (
                  <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900">
                    {message}{' '}
                    <button type="button" onClick={() => openManual(activeType)} className="font-bold underline">Fill in the details</button>
                  </p>
                )}
              </div>
              {results.length > 0 && (
                <div className="mt-3">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-xs font-black uppercase tracking-wider text-gray-600">Choose your source ({results.length} found)</p>
                    <button type="button" onClick={() => setResults([])} className="text-xs font-bold text-gray-500 hover:text-navy">Close</button>
                  </div>
                  <ul className="max-h-[360px] divide-y divide-gray-100 overflow-y-auto rounded-xl border border-gray-100">
                    {results.map((r, i) => {
                      const d = r.data;
                      const meta = [authorsSummary(r), d.year, d.type === 'journal' || d.type === 'chapter' || d.type === 'conference' ? d.container : d.publisher].filter(Boolean).join(' · ');
                      return (
                        <li key={`${r.source}-${i}`}>
                          <button type="button" onClick={() => openFromCite(r)} className="block w-full px-3 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none">
                            <span className="mb-1 flex flex-wrap items-center gap-2">
                              <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-navy">{TYPE_LABELS[d.type]}</span>
                              <span className="text-[10px] font-bold text-gray-400">{r.source}</span>
                            </span>
                            <span className="block break-words text-sm font-bold text-navy">{d.title}</span>
                            {meta && <span className="block break-words text-xs text-gray-500">{meta}</span>}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </form>
          </div>

          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm">
            <label className="inline-flex items-center gap-2 font-bold text-navy">
              <input
                type="checkbox"
                checked={allSelected}
                disabled={!refs.length}
                onChange={() => setSelected(allSelected ? new Set() : new Set(refs.map((r) => r.id)))}
                className="h-4 w-4 accent-[#0B1D3A]"
                aria-label="Select all references"
              />
              <span className="sr-only sm:not-sr-only">{selected.size ? `${selected.size} selected` : 'Select'}</span>
            </label>
            {selected.size > 0 && (
              <>
                <button type="button" onClick={() => copyList(chosen)} className="inline-flex items-center gap-1 rounded-lg px-2 py-1 font-bold text-navy hover:bg-gray-100">
                  <Copy className="h-4 w-4" /> Copy
                </button>
                <button type="button" onClick={() => removeRefs([...selected])} className="inline-flex items-center gap-1 rounded-lg px-2 py-1 font-bold text-red-700 hover:bg-red-50">
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              </>
            )}
            <div className="ml-auto flex flex-wrap items-center gap-2">
              <label className="sr-only" htmlFor="ref-style">Referencing style</label>
              <select
                id="ref-style"
                value={style}
                onChange={(e) => updateProject(project.id, (p) => ({ ...p, style: e.target.value as ReferenceStyle }))}
                className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 font-bold text-navy"
              >
                {(Object.keys(STYLE_NAMES) as ReferenceStyle[]).map((s) => (
                  <option key={s} value={s}>{STYLE_NAMES[s]}</option>
                ))}
              </select>
              <label className="sr-only" htmlFor="ref-font">Font</label>
              <select id="ref-font" value={prefs.font} onChange={(e) => setPref('font', e.target.value)} className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-gray-700">
                {FONTS.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
              <label className="sr-only" htmlFor="ref-size">Font size</label>
              <select id="ref-size" value={prefs.size} onChange={(e) => setPref('size', Number(e.target.value))} className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-gray-700">
                {SIZES.map((s) => (
                  <option key={s} value={s}>{s} pt</option>
                ))}
              </select>
              <label className="sr-only" htmlFor="ref-sort">Order</label>
              <select id="ref-sort" value={prefs.sort} onChange={(e) => setPref('sort', e.target.value as Prefs['sort'])} className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-gray-700">
                <option value="az">A to Z (auto sort)</option>
                <option value="added">Order added</option>
              </select>
            </div>
          </div>

          {/* The reference list, set out like a page */}
          <div
            className="mx-auto w-full max-w-[816px] rounded-sm border border-gray-200 bg-white px-4 py-8 text-[#111] shadow-md sm:px-12 sm:py-12"
            style={{ fontFamily: `"${prefs.font}", ${prefs.font === 'Arial' || prefs.font === 'Calibri' ? 'Arial, sans-serif' : 'Georgia, "Times New Roman", serif'}`, fontSize: `${prefs.size}pt` }}
          >
            <h2 className={`mb-4 font-bold ${style === 'apa' ? 'text-center' : ''}`} style={{ fontSize: '1em' }}>{heading(style)}</h2>
            {refs.length ? (
              <ol id="reference-list" className="space-y-1">
                {refs.map((r) => {
                  const isSel = selected.has(r.id);
                  return (
                    <li key={r.id} className={`group relative -mx-2 flex flex-wrap items-start gap-x-2 rounded px-2 py-1 sm:flex-nowrap ${isSel ? 'bg-primary/10' : 'hover:bg-[#FBF6E6]'}`}>
                      <input
                        type="checkbox"
                        checked={isSel}
                        onChange={() => {
                          const next = new Set(selected);
                          if (isSel) next.delete(r.id);
                          else next.add(r.id);
                          setSelected(next);
                        }}
                        className={`mt-[0.45em] h-4 w-4 shrink-0 accent-[#0B1D3A] ${isSel ? '' : 'sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100'}`}
                        aria-label="Select reference"
                      />
                      <p className="min-w-0 flex-1 break-words pl-[2em] -indent-[2em] sm:pl-[0.5in] sm:-indent-[0.5in]" style={{ lineHeight }}>
                        <Rich segs={r.segs} />
                      </p>
                      <div className="flex shrink-0 basis-full items-center justify-end gap-0.5 font-sans sm:basis-auto sm:absolute sm:-top-4 sm:right-2 sm:z-10 sm:rounded-lg sm:border sm:border-gray-100 sm:bg-white sm:p-0.5 sm:opacity-0 sm:shadow-md sm:group-hover:opacity-100 sm:focus-within:opacity-100">
                        {r.editable && (
                          <button type="button" onClick={() => editRef(r.id)} className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-navy" aria-label="Edit reference" title="Edit">
                            <Pencil className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={async () => showToast((await copyRich(segmentsToHtml(r.segs), segmentsToText(r.segs))) ? 'Reference copied' : 'Copying did not work')}
                          className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-navy"
                          aria-label="Copy reference"
                          title="Copy reference"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                        {r.parenthetical && (
                          <button
                            type="button"
                            onClick={async () =>
                              showToast((await copyRich(segmentsToHtml(r.parenthetical!), segmentsToText(r.parenthetical!))) ? `Copied ${segmentsToText(r.parenthetical!)}` : 'Copying did not work')
                            }
                            className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-navy"
                            aria-label="Copy in-text citation"
                            title="Copy in-text citation"
                          >
                            <Quote className="h-4 w-4" />
                          </button>
                        )}
                        <button type="button" onClick={() => removeRefs([r.id])} className="rounded-md p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600" aria-label="Delete reference" title="Delete">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ol>
            ) : (
              <div className="py-16 text-center font-sans">
                <p className="text-lg font-bold text-navy">No references yet</p>
                <p className="mt-2 text-sm text-gray-600">Search for a source above, or use Manual to fill in the details yourself.</p>
                <button type="button" onClick={() => openManual(activeType)} className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-bold text-navy hover:border-primary">
                  <Plus className="h-4 w-4" /> Add a {TYPE_LABELS[activeType].toLowerCase()} reference
                </button>
              </div>
            )}
          </div>
          <p className="text-center text-xs text-gray-500">
            {refs.length} reference{refs.length === 1 ? '' : 's'} in {STYLE_NAMES[style]} · saved in this browser{' '}
            {refs.length > 0 && (
              <button type="button" onClick={() => copyList(refs)} className="ml-1 inline-flex items-center gap-1 font-bold text-navy underline">
                <Copy className="h-3 w-3" /> Copy all
              </button>
            )}
          </p>
        </div>
      </div>

      {editor?.kind === 'source' && (
        <SourceEditor
          key={editor.id ?? 'new'}
          style={style}
          initial={editor.initial}
          mode={editor.mode}
          notice={editor.notice}
          noticeTone={editor.tone}
          onSave={saveSource}
          onClose={() => setEditor(null)}
        />
      )}
      {editor?.kind === 'pre' && <PreEditor initial={editor.text} onSave={savePre} onClose={() => setEditor(null)} />}

      {shareLink && createPortal(
        <div className="fixed inset-0 z-[10010] flex items-center justify-center bg-navy/60 p-4" role="dialog" aria-modal="true" aria-label="Share link">
          <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl">
            <p className="font-extrabold text-navy">Share this reference list</p>
            <p className="mt-1 text-sm text-gray-600">Copy the link below. Anyone who opens it can add a copy of this list to their own browser.</p>
            <textarea readOnly value={shareLink} onFocus={(e) => e.target.select()} className="mt-3 h-24 w-full rounded-lg border border-gray-200 p-2 font-mono text-xs" />
            <button type="button" onClick={() => setShareLink('')} className="mt-3 w-full rounded-xl bg-navy py-2.5 text-sm font-bold text-white">Done</button>
          </div>
        </div>,
        document.body,
      )}

      {ready &&
        createPortal(
          <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-24 z-[10020] flex justify-center px-4">
            {toast && (
              <p className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2.5 text-sm font-bold text-white shadow-xl">
                <Check className="h-4 w-4 text-gold" aria-hidden="true" /> {toast}
              </p>
            )}
          </div>,
          document.body,
        )}
    </div>
  );
}
