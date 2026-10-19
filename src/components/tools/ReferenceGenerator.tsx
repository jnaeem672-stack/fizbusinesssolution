'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { CaseSensitive, Check, Copy, ListPlus, Pencil, Plus, RotateCcw, Trash2, X } from 'lucide-react';
import {
  formatSource,
  isDoi,
  LECTURE_FORMATS,
  missingFields,
  MONTHS,
  segmentsToHtml,
  segmentsToText,
  SOURCE_TYPES,
  THESIS_LEVELS,
  toSentenceCase,
  type Formatted,
  type Person,
  type Segment,
  type SourceInput,
  type SourceType,
} from '@/utils/harvard';
import { formatApa } from '@/utils/apa';
import type { CiteResult } from '@/utils/cite/types';
import Autocite, { TYPE_LABELS } from './Autocite';

export type ReferenceStyle = 'harvard' | 'apa';

const STYLE_LABELS: Record<ReferenceStyle, string> = { harvard: 'Harvard', apa: 'APA 7' };

/** Saved list (all styles share one list of sources, formatted in whichever style is selected) */
const LIST_KEY = 'fizbs-references-v2';
/** Lists saved by the first version of the tool, as formatted text */
const LEGACY_KEYS: Record<ReferenceStyle, string> = { harvard: 'fizbs-harvard-list', apa: 'fizbs-apa-list' };

interface SourceEntry { id: string; src: SourceInput }
interface LegacyEntry { id: string; legacy: { style: ReferenceStyle; segs: Segment[]; sortKey: string } }
type Entry = SourceEntry | LegacyEntry;

const isSegments = (v: unknown): v is Segment[] =>
  Array.isArray(v) && v.every((s) => s && typeof s.text === 'string' && (s.italic === undefined || typeof s.italic === 'boolean'));

const s = (v: unknown) => (typeof v === 'string' ? v : '');
const people = (v: unknown): Person[] =>
  Array.isArray(v) ? v.filter((p) => p && typeof p === 'object').map((p) => ({ surname: s(p.surname), given: s(p.given) })) : [];

/** Rebuild a stored source safely (storage can hold anything) */
function sanitiseSource(x: unknown): SourceInput | null {
  if (!x || typeof x !== 'object') return null;
  const o = x as Record<string, unknown>;
  if (!SOURCE_TYPES.includes(o.type as SourceType)) return null;
  return {
    type: o.type as SourceType,
    authors: people(o.authors),
    org: s(o.org),
    year: s(o.year),
    month: s(o.month),
    day: s(o.day),
    noDate: o.noDate === true,
    title: s(o.title),
    container: s(o.container),
    editors: people(o.editors),
    edition: s(o.edition),
    publisher: s(o.publisher),
    volume: s(o.volume),
    issue: s(o.issue),
    pages: s(o.pages),
    url: s(o.url),
    accessed: s(o.accessed),
    citePage: s(o.citePage),
    kind: s(o.kind),
  };
}

function loadEntries(): Entry[] {
  const raw = window.localStorage.getItem(LIST_KEY);
  if (raw) {
    const parsed = JSON.parse(raw);
    const items: unknown[] = Array.isArray(parsed?.items) ? parsed.items : [];
    return items.flatMap((it): Entry[] => {
      if (!it || typeof it !== 'object') return [];
      const o = it as Record<string, unknown>;
      const id = s(o.id);
      if (!id) return [];
      const src = sanitiseSource(o.src);
      if (src) return [{ id, src }];
      const lg = o.legacy as Record<string, unknown> | undefined;
      if (lg && (lg.style === 'harvard' || lg.style === 'apa') && isSegments(lg.segs) && typeof lg.sortKey === 'string')
        return [{ id, legacy: { style: lg.style, segs: lg.segs, sortKey: lg.sortKey } }];
      return [];
    });
  }
  // First visit with this version: bring over lists saved by the old Harvard and APA tools
  const migrated: Entry[] = [];
  (Object.keys(LEGACY_KEYS) as ReferenceStyle[]).forEach((style) => {
    try {
      const old = JSON.parse(window.localStorage.getItem(LEGACY_KEYS[style]) ?? '[]');
      if (Array.isArray(old))
        old.forEach((x) => {
          if (x && typeof x.id === 'string' && typeof x.sortKey === 'string' && isSegments(x.segs))
            migrated.push({ id: `${style}-${x.id}`, legacy: { style, segs: x.segs, sortKey: x.sortKey } });
        });
    } catch {
      /* ignore a damaged old list */
    }
  });
  return migrated;
}

const inputCls =
  'w-full min-w-0 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-base text-navy outline-none focus:border-primary focus:ring-2 focus:ring-primary/15';
const labelCls = 'block text-xs font-black uppercase tracking-wider text-gray-600 mb-1.5';

function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

async function copyRich(html: string, text: string) {
  try {
    if (typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write) {
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': new Blob([html], { type: 'text/html' }),
          'text/plain': new Blob([text], { type: 'text/plain' }),
        }),
      ]);
      return true;
    }
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function Rich({ segs }: { segs: Segment[] }) {
  return (
    <>
      {segs.map((sg, i) => (sg.italic ? <i key={i}>{sg.text}</i> : <span key={i}>{sg.text}</span>))}
    </>
  );
}

function CopyButton({ html, text, label, tone = 'dark' }: { html: string; text: string; label: string; tone?: 'dark' | 'light' }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        if (await copyRich(html, text)) {
          setDone(true);
          setTimeout(() => setDone(false), 1800);
        }
      }}
      className={
        tone === 'dark'
          ? 'inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-black text-white hover:bg-white/20'
          : 'shrink-0 rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-navy'
      }
      aria-label={label}
      title={tone === 'light' ? 'Copy' : undefined}
    >
      {done ? <Check className={tone === 'dark' ? 'w-3.5 h-3.5' : 'w-4 h-4'} /> : <Copy className={tone === 'dark' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />}
      {tone === 'dark' && (done ? ' Copied' : ' Copy')}
    </button>
  );
}

type KeyedPerson = Person & { key: number };

function PeopleFields({
  legend,
  people,
  onChange,
  nextKey,
}: {
  legend: string;
  people: KeyedPerson[];
  onChange: (p: KeyedPerson[]) => void;
  nextKey: () => number;
}) {
  return (
    <fieldset>
      <legend className={labelCls}>{legend}</legend>
      <ul className="space-y-2">
        {people.map((p, i) => (
          <li key={p.key} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_40px] gap-2">
            <input
              className={inputCls}
              placeholder="Surname"
              value={p.surname}
              aria-label={`${legend} ${i + 1} surname`}
              onChange={(e) => onChange(people.map((x) => (x.key === p.key ? { ...x, surname: e.target.value } : x)))}
            />
            <input
              className={inputCls}
              placeholder="First name or initials"
              value={p.given}
              aria-label={`${legend} ${i + 1} first name or initials`}
              onChange={(e) => onChange(people.map((x) => (x.key === p.key ? { ...x, given: e.target.value } : x)))}
            />
            <button
              type="button"
              onClick={() => onChange(people.length > 1 ? people.filter((x) => x.key !== p.key) : [{ key: nextKey(), surname: '', given: '' }])}
              className="flex h-11 w-10 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600"
              aria-label={`Remove ${legend.toLowerCase()} ${i + 1}`}
            >
              <X className="w-4 h-4" />
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => onChange([...people, { key: nextKey(), surname: '', given: '' }])}
        className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
      >
        <Plus className="w-4 h-4" /> Add another
      </button>
    </fieldset>
  );
}

const EMPTY_FIELDS = {
  org: '', year: '', month: '', day: '', noDate: false, title: '', container: '', edition: '', publisher: '',
  volume: '', issue: '', pages: '', url: '', accessed: '', citePage: '', kind: '',
};
type Fields = typeof EMPTY_FIELDS;

const TITLE_LABELS: Record<SourceType, string> = {
  book: 'Book title',
  chapter: 'Chapter title',
  journal: 'Article title',
  website: 'Web page title',
  newspaper: 'Article title',
  report: 'Report title',
  thesis: 'Thesis or dissertation title',
  video: 'Video title',
  conference: 'Paper title',
  lecture: 'Lecture or slides title',
};

const AUTHOR_LEGENDS: Partial<Record<SourceType, string>> = { chapter: 'Chapter author', video: 'Creator', lecture: 'Lecturer' };

export default function ReferenceGenerator({ style: initialStyle }: { style: ReferenceStyle }) {
  const [style, setStyle] = useState<ReferenceStyle>(initialStyle);
  const isApa = style === 'apa';
  const keyRef = useRef(0);
  const nextKey = () => ++keyRef.current;
  const previewRef = useRef<HTMLDivElement>(null);
  const formTopRef = useRef<HTMLDivElement>(null);

  const [type, setType] = useState<SourceType>('book');
  const [authorMode, setAuthorMode] = useState<'people' | 'org'>('people');
  const [authors, setAuthors] = useState<KeyedPerson[]>(() => [{ key: nextKey(), surname: '', given: '' }]);
  const [editors, setEditors] = useState<KeyedPerson[]>(() => [{ key: nextKey(), surname: '', given: '' }]);
  const [f, setF] = useState<Fields>(EMPTY_FIELDS);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [listCopied, setListCopied] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [notice, setNotice] = useState('');
  const [flash, setFlash] = useState('');

  // Accessed date defaults to today (set after mount to avoid a server/client mismatch)
  useEffect(() => {
    setF((prev) => (prev.accessed ? prev : { ...prev, accessed: today() }));
    try {
      setEntries(loadEntries());
    } catch {
      /* storage unavailable */
    }
  }, []);

  const saveEntries = (next: Entry[]) => {
    setEntries(next);
    try {
      window.localStorage.setItem(LIST_KEY, JSON.stringify({ v: 2, items: next }));
    } catch {
      /* storage unavailable */
    }
  };

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setF((prev) => ({ ...prev, [k]: e.target instanceof HTMLInputElement && e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const src: SourceInput = {
    type,
    authors: authorMode === 'people' ? authors.map(({ surname, given }) => ({ surname, given })) : [],
    org: authorMode === 'org' ? f.org : '',
    year: f.year,
    month: f.month,
    day: f.day,
    noDate: f.noDate,
    title: f.title,
    container: f.container,
    editors: type === 'chapter' || type === 'conference' ? editors.map(({ surname, given }) => ({ surname, given })) : [],
    edition: f.edition,
    publisher: f.publisher,
    volume: f.volume,
    issue: f.issue,
    pages: f.pages,
    url: f.url,
    // APA does not use accessed dates for these sources
    accessed: isApa ? '' : f.accessed,
    citePage: f.citePage,
    kind: f.kind,
  };
  const format = (x: SourceInput): Formatted => (style === 'apa' ? formatApa(x) : formatSource(x));
  const missing = missingFields(src);
  const srcKey = JSON.stringify(src);
  const out = useMemo(() => format(src), [srcKey, style]); // eslint-disable-line react-hooks/exhaustive-deps

  const refHtml = segmentsToHtml(out.reference);
  const refText = segmentsToText(out.reference);

  // The list in the selected style, A to Z
  const shown = useMemo(
    () =>
      entries
        .flatMap((e) => {
          if ('src' in e) {
            const fm = format({ ...e.src, accessed: isApa ? '' : e.src.accessed });
            return [{ id: e.id, segs: fm.reference, sortKey: fm.sortKey, editable: true }];
          }
          return e.legacy.style === style ? [{ id: e.id, segs: e.legacy.segs, sortKey: e.legacy.sortKey, editable: false }] : [];
        })
        .sort((a, b) => a.sortKey.localeCompare(b.sortKey)),
    [entries, style], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const loadSource = (x: SourceInput) => {
    setType(x.type);
    const hasOrg = Boolean(x.org) && !x.authors.some((a) => a.surname);
    setAuthorMode(hasOrg ? 'org' : 'people');
    setAuthors(x.authors.length ? x.authors.map((a) => ({ ...a, key: nextKey() })) : [{ key: nextKey(), surname: '', given: '' }]);
    setEditors(x.editors.length ? x.editors.map((a) => ({ ...a, key: nextKey() })) : [{ key: nextKey(), surname: '', given: '' }]);
    setF((prev) => ({
      org: x.org,
      year: x.year,
      month: x.month ?? '',
      day: x.day ?? '',
      noDate: x.noDate,
      title: x.title,
      container: x.container,
      edition: x.edition,
      publisher: x.publisher,
      volume: x.volume,
      issue: x.issue,
      pages: x.pages,
      url: x.url,
      accessed: x.accessed || prev.accessed || today(),
      citePage: x.citePage,
      kind: x.kind ?? '',
    }));
  };

  const scrollTo = (el: HTMLElement | null) => {
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  const applyCite = (r: CiteResult) => {
    const d = r.data;
    loadSource({ ...d, noDate: false, accessed: '', citePage: '' });
    const missingDate = !d.year
      ? d.type === 'video'
        ? ' We could not find the upload date: it is shown under the video, so add the year (and the day and month for APA), or tick No date if there is none.'
        : ' We could not find the date, so add the year from the source, or tick No date if there is none.'
      : '';
    setNotice(
      `We filled in the details from ${r.source}. Check them against your source before you use the reference, especially the capitalisation of the title, the year and the edition.${missingDate}`,
    );
    // On phones the preview sits below the form, so bring it into view
    if (window.innerWidth < 1024) setTimeout(() => scrollTo(previewRef.current), 50);
  };

  // The page could not be read: start a fresh web page reference with the link filled in
  const urlFallback = (url: string) => {
    setType('website');
    setAuthorMode('people');
    setAuthors([{ key: nextKey(), surname: '', given: '' }]);
    setEditors([{ key: nextKey(), surname: '', given: '' }]);
    setF({ ...EMPTY_FIELDS, url, accessed: today() });
    setNotice('');
  };

  const resetForm = () => {
    setType('book');
    setAuthorMode('people');
    setAuthors([{ key: nextKey(), surname: '', given: '' }]);
    setEditors([{ key: nextKey(), surname: '', given: '' }]);
    setF({ ...EMPTY_FIELDS, accessed: today() });
    setEditingId(null);
    setNotice('');
  };

  const showFlash = (text: string) => {
    setFlash(text);
    setTimeout(() => setFlash(''), 2200);
  };

  const addOrSave = () => {
    const stored: SourceInput = { ...src, accessed: f.accessed };
    if (editingId) {
      saveEntries(entries.map((e) => (e.id === editingId ? { id: e.id, src: stored } : e)));
      setEditingId(null);
      showFlash('Reference updated');
      return;
    }
    if (shown.some((x) => segmentsToText(x.segs) === refText)) {
      showFlash('This reference is already in your list');
      return;
    }
    saveEntries([...entries, { id: `${Date.now()}-${entries.length}`, src: stored }]);
    showFlash('Added to your reference list');
  };

  // Which fields each source type needs
  const dayMonth = type === 'newspaper' || (isApa && (type === 'website' || type === 'video' || type === 'lecture'));
  const containerLabel: Partial<Record<SourceType, string>> = {
    chapter: 'Book title',
    journal: 'Journal name',
    newspaper: 'Newspaper or magazine name',
    conference: 'Conference or proceedings title',
    video: 'Platform',
    ...(isApa ? { website: 'Website name (optional)', thesis: 'Repository or database (optional)' } : { lecture: 'Module code and title' }),
  };
  const containerPlaceholder: Partial<Record<SourceType, string>> = {
    journal: 'e.g. Journal of Management Studies',
    newspaper: 'e.g. The Guardian',
    conference: 'e.g. Proceedings of the 2024 International Conference on...',
    video: 'e.g. YouTube',
    website: 'e.g. BBC News (leave empty if the same as the author)',
    thesis: 'e.g. ProQuest Dissertations and Theses Global',
    lecture: 'e.g. BUS101: Principles of Management',
  };
  const publisherLabel: Partial<Record<SourceType, string>> = {
    book: 'Publisher',
    chapter: 'Publisher',
    report: 'Publisher',
    conference: 'Publisher',
    thesis: 'University',
    lecture: 'University or course website',
  };
  const doiTypes: SourceType[] = ['book', 'chapter', 'journal', 'report', 'thesis', 'conference'];
  const urlRequired = type === 'website' || type === 'video';
  const urlLabel = urlRequired ? 'URL' : doiTypes.includes(type) ? 'DOI or URL (optional)' : 'URL (optional)';
  const showAccessed = !isApa && (urlRequired || (f.url.trim() !== '' && !isDoi(f.url)));
  const authorLegend = AUTHOR_LEGENDS[type] ?? 'Author';

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs font-black uppercase tracking-wider text-gray-600" id="style-label">Referencing style</span>
        <div role="group" aria-labelledby="style-label" className="inline-flex rounded-full border border-gray-200 bg-white p-1">
          {(Object.keys(STYLE_LABELS) as ReferenceStyle[]).map((st) => (
            <button
              key={st}
              type="button"
              aria-pressed={style === st}
              onClick={() => setStyle(st)}
              className={`rounded-full px-4 py-1.5 text-sm font-black transition-colors ${style === st ? 'bg-navy text-white' : 'text-navy hover:text-primary'}`}
            >
              {STYLE_LABELS[st]}
            </button>
          ))}
        </div>
        <span className="text-xs text-gray-500">{isApa ? 'APA 7th edition' : 'Cite Them Right Harvard'}</span>
      </div>

      <Autocite onPick={applyCite} onUrlFallback={urlFallback} />

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_400px] gap-6 lg:gap-8 items-start">
        <form className="space-y-5 min-w-0" onSubmit={(e) => e.preventDefault()}>
          <div ref={formTopRef} className="flex items-center justify-between gap-3 scroll-mt-28">
            <p className="text-sm font-extrabold text-navy">{editingId ? 'Edit your reference' : 'Or fill in the details yourself'}</p>
            <button type="button" onClick={resetForm} className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-navy">
              <RotateCcw className="w-3.5 h-3.5" /> Clear form
            </button>
          </div>

          {notice && (
            <div role="status" className="flex items-start gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
              <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <p className="flex-1">{notice}</p>
              <button type="button" onClick={() => setNotice('')} className="shrink-0 rounded p-0.5 hover:bg-emerald-100" aria-label="Dismiss message">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          <fieldset>
            <legend className={labelCls}>Source type</legend>
            <div className="flex flex-wrap gap-2">
              {SOURCE_TYPES.map((t) => (
                <button
                  key={t}
                  type="button"
                  aria-pressed={type === t}
                  onClick={() => setType(t)}
                  className={`rounded-full px-4 py-2 text-sm font-bold border transition-colors ${type === t ? 'bg-navy border-navy text-white' : 'border-gray-200 text-navy hover:border-primary'}`}
                >
                  {TYPE_LABELS[t]}
                </button>
              ))}
            </div>
          </fieldset>

          <div>
            <div className="flex flex-wrap gap-4 mb-3 text-sm font-bold text-navy">
              <label className="inline-flex items-center gap-2">
                <input type="radio" name="authorMode" checked={authorMode === 'people'} onChange={() => setAuthorMode('people')} className="accent-[#0B1D3A] w-4 h-4" />
                {authorLegend}(s)
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" name="authorMode" checked={authorMode === 'org'} onChange={() => setAuthorMode('org')} className="accent-[#0B1D3A] w-4 h-4" />
                Organisation as author
              </label>
            </div>
            {authorMode === 'people' ? (
              <PeopleFields legend={authorLegend} people={authors} onChange={setAuthors} nextKey={nextKey} />
            ) : (
              <label className="block">
                <span className={labelCls}>Organisation</span>
                <input
                  className={inputCls}
                  value={f.org}
                  onChange={set('org')}
                  placeholder={type === 'video' ? 'e.g. Harvard University or the channel name' : 'e.g. World Health Organization'}
                />
              </label>
            )}
            <p className="mt-2 text-xs text-gray-500">No author or organisation? Leave this empty and the reference will start with the title.</p>
          </div>

          <div className={`grid gap-3 items-end ${dayMonth ? 'grid-cols-[64px_minmax(0,1fr)_minmax(0,1fr)] sm:grid-cols-[72px_minmax(0,1fr)_minmax(0,1fr)_auto]' : 'grid-cols-[minmax(0,1fr)_auto]'}`}>
            {dayMonth && (
              <>
                <label className="block">
                  <span className={labelCls}>Day</span>
                  <input className={inputCls} inputMode="numeric" value={f.day} onChange={set('day')} placeholder="5" disabled={f.noDate} maxLength={2} />
                </label>
                <div>
                  <label htmlFor="ref-month" className={labelCls}>Month</label>
                  <select id="ref-month" className={inputCls} value={f.month} onChange={set('month')} disabled={f.noDate}>
                    <option value="">-</option>
                    {MONTHS.map((m, i) => (
                      <option key={m} value={String(i + 1)}>{m}</option>
                    ))}
                  </select>
                </div>
              </>
            )}
            <label className="block">
              <span className={labelCls}>Year</span>
              <input className={inputCls} inputMode="numeric" value={f.year} onChange={set('year')} placeholder="e.g. 2023" disabled={f.noDate} />
            </label>
            <label className={`inline-flex items-center gap-2 pb-3 text-sm font-bold text-navy ${dayMonth ? 'col-span-3 sm:col-span-1' : ''}`}>
              <input type="checkbox" checked={f.noDate} onChange={set('noDate')} className="accent-[#0B1D3A] w-4 h-4" /> No date
            </label>
          </div>

          <div>
            <div className="flex items-end justify-between gap-2">
              <label htmlFor="ref-title" className={labelCls}>{TITLE_LABELS[type]}</label>
              {f.title.trim().split(/\s+/).length > 1 && (
                <button
                  type="button"
                  onClick={() => setF((prev) => ({ ...prev, title: toSentenceCase(prev.title) }))}
                  className="mb-1.5 inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:underline"
                  aria-label="Change the title to sentence case"
                  title="Capital letter only for the first word, the first word after a colon and proper nouns"
                >
                  <CaseSensitive className="w-3.5 h-3.5" /> Sentence case
                </button>
              )}
            </div>
            <input id="ref-title" className={inputCls} value={f.title} onChange={set('title')} placeholder="Capitalise only the first word and proper nouns" />
          </div>

          {(type === 'chapter' || type === 'conference') && (
            <PeopleFields legend={type === 'conference' ? 'Editor (optional)' : 'Editor'} people={editors} onChange={setEditors} nextKey={nextKey} />
          )}

          {containerLabel[type] && (
            <label className="block">
              <span className={labelCls}>{containerLabel[type]}</span>
              <input className={inputCls} value={f.container} onChange={set('container')} placeholder={containerPlaceholder[type]} />
            </label>
          )}

          {type === 'journal' && (
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className={labelCls}>Volume</span>
                <input className={inputCls} value={f.volume} onChange={set('volume')} />
              </label>
              <label className="block">
                <span className={labelCls}>Issue</span>
                <input className={inputCls} value={f.issue} onChange={set('issue')} />
              </label>
            </div>
          )}

          {(type === 'thesis' || type === 'lecture') && (
            <div>
              <label htmlFor="ref-kind" className={labelCls}>{type === 'thesis' ? 'Thesis or dissertation type' : 'Format'}</label>
              <select id="ref-kind" className={inputCls} value={f.kind || (type === 'thesis' ? 'phd' : 'slides')} onChange={set('kind')}>
                {(type === 'thesis' ? THESIS_LEVELS : LECTURE_FORMATS).map((k) => (
                  <option key={k.id} value={k.id}>{k.label}</option>
                ))}
              </select>
            </div>
          )}

          {(type === 'book' || type === 'chapter' || type === 'report') && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="block">
                <span className={labelCls}>Edition (if not the first)</span>
                <input className={inputCls} value={f.edition} onChange={set('edition')} placeholder="e.g. 3" />
              </label>
              <label className="block">
                <span className={labelCls}>Publisher</span>
                <input className={inputCls} value={f.publisher} onChange={set('publisher')} placeholder="e.g. Pearson" />
              </label>
            </div>
          )}

          {(type === 'conference' || type === 'thesis' || type === 'lecture') && (
            <label className="block">
              <span className={labelCls}>{publisherLabel[type]}</span>
              <input
                className={inputCls}
                value={f.publisher}
                onChange={set('publisher')}
                placeholder={type === 'thesis' ? 'e.g. University of Leeds' : type === 'lecture' ? 'e.g. University of Leeds or Moodle' : 'e.g. Springer'}
              />
            </label>
          )}

          {(type === 'journal' || type === 'chapter' || type === 'conference' || type === 'newspaper') && (
            <label className="block">
              <span className={labelCls}>{type === 'newspaper' ? 'Page (printed copy only)' : 'Pages'}</span>
              <input className={inputCls} value={f.pages} onChange={set('pages')} placeholder={type === 'newspaper' ? 'e.g. 9' : 'e.g. 45-67'} />
            </label>
          )}

          <label className="block">
            <span className={labelCls}>{urlLabel}</span>
            <input
              className={inputCls}
              value={f.url}
              onChange={set('url')}
              placeholder={type === 'journal' || type === 'conference' ? 'e.g. 10.1191/1478088706qp063oa' : 'https://'}
            />
          </label>

          {showAccessed && (
            <label className="block">
              <span className={labelCls}>Date accessed</span>
              <input className={inputCls} type="date" value={f.accessed} onChange={set('accessed')} />
            </label>
          )}

          <label className="block">
            <span className={labelCls}>Page number for a quote (optional)</span>
            <input className={inputCls} value={f.citePage} onChange={set('citePage')} placeholder="Only for the in-text citation, e.g. 45" />
          </label>
        </form>

        <div className="lg:sticky lg:top-[110px] space-y-4">
          <div ref={previewRef} className="rounded-2xl bg-navy p-5 sm:p-6 text-white scroll-mt-28" aria-live="polite">
            <div className="flex items-center justify-between gap-3 mb-3">
              <p className="text-[11px] font-black uppercase tracking-widest text-primary">{STYLE_LABELS[style]} reference</p>
              {!missing.length && <CopyButton html={refHtml} text={refText} label="Copy reference" />}
            </div>
            {missing.length ? (
              <p className="text-sm text-white/70">Add the {missing.join(', ')} to see your reference.</p>
            ) : (
              <p className="text-[15px] leading-relaxed break-words"><Rich segs={out.reference} /></p>
            )}
            {!missing.length && (
              <>
                <div className="mt-5 border-t border-white/10 pt-4 space-y-3">
                  <p className="text-[11px] font-black uppercase tracking-widest text-primary">In-text citation</p>
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[15px] break-words"><span className="block text-[11px] font-bold text-white/50">Parenthetical</span><Rich segs={out.parenthetical} /></p>
                    <CopyButton html={segmentsToHtml(out.parenthetical)} text={segmentsToText(out.parenthetical)} label="Copy parenthetical citation" />
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[15px] break-words"><span className="block text-[11px] font-bold text-white/50">Narrative</span><Rich segs={out.narrative} /></p>
                    <CopyButton html={segmentsToHtml(out.narrative)} text={segmentsToText(out.narrative)} label="Copy narrative citation" />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={addOrSave}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-bold hover:brightness-110"
                >
                  {editingId ? <Check className="w-5 h-5" /> : <ListPlus className="w-5 h-5" />} {editingId ? 'Save changes' : 'Add to reference list'}
                </button>
                {editingId && (
                  <button type="button" onClick={() => setEditingId(null)} className="mt-2 w-full text-center text-xs font-bold text-white/60 hover:text-white">
                    Cancel editing
                  </button>
                )}
              </>
            )}
            <p className="sr-only" role="status">{flash}</p>
            {flash && <p className="mt-3 text-center text-xs font-bold text-primary" aria-hidden="true">{flash}</p>}
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <h2 className="text-base font-extrabold text-navy">Your reference list ({shown.length})</h2>
              {shown.length > 0 && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Remove every reference from your list?')) saveEntries(entries.filter((e) => 'legacy' in e && e.legacy.style !== style));
                    }}
                    className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-bold text-gray-500 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Clear
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      const html = shown.map((x) => `<p>${segmentsToHtml(x.segs)}</p>`).join('');
                      const text = shown.map((x) => segmentsToText(x.segs)).join('\n\n');
                      if (await copyRich(html, text)) {
                        setListCopied(true);
                        setTimeout(() => setListCopied(false), 1800);
                      }
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-navy px-3 py-1.5 text-xs font-black text-white"
                  >
                    {listCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} {listCopied ? 'Copied' : 'Copy all'}
                  </button>
                </div>
              )}
            </div>
            {shown.length ? (
              <>
                <ol id="reference-list" className="space-y-3">
                  {shown.map((x) => (
                    <li key={x.id} className={`flex items-start gap-1 text-sm leading-relaxed ${x.id === editingId ? 'rounded-lg bg-primary/10 p-2 -m-2 text-navy' : 'text-gray-700'}`}>
                      <span className="flex-1 break-words pr-1"><Rich segs={x.segs} /></span>
                      {x.editable && (
                        <button
                          type="button"
                          onClick={() => {
                            const e = entries.find((y) => y.id === x.id);
                            if (!e || !('src' in e)) return;
                            loadSource(e.src);
                            setEditingId(e.id);
                            setNotice('');
                            scrollTo(formTopRef.current);
                          }}
                          className="shrink-0 rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-navy"
                          aria-label="Edit reference"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                      )}
                      <CopyButton html={segmentsToHtml(x.segs)} text={segmentsToText(x.segs)} label="Copy this reference" tone="light" />
                      <button
                        type="button"
                        onClick={() => {
                          saveEntries(entries.filter((y) => y.id !== x.id));
                          if (editingId === x.id) setEditingId(null);
                        }}
                        className="shrink-0 rounded-md p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
                        aria-label="Remove reference"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ol>
                <p className="mt-4 text-xs text-gray-500">
                  Switch the style above and the whole list changes with it. Paste it under the heading {isApa ? '"References"' : '"Reference list"'} at the end of your work.
                </p>
              </>
            ) : (
              <p className="text-sm text-gray-500">References you add appear here in alphabetical order. They are saved in this browser only.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
