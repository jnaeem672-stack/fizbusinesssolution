'use client';

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { CaseSensitive, Check, ListPlus, Plus, X } from 'lucide-react';
import {
  isDoi,
  LECTURE_FORMATS,
  missingFields,
  MONTHS,
  segmentsToHtml,
  segmentsToText,
  SOURCE_TYPES,
  THESIS_LEVELS,
  toSentenceCase,
  type Person,
  type SourceInput,
  type SourceType,
} from '@/utils/harvard';
import { formatIn, STYLE_NAMES, type ReferenceStyle } from './store';
import { CopyButton, Rich } from './ui';

export const TYPE_LABELS: Record<SourceType, string> = {
  book: 'Book',
  chapter: 'Chapter in edited book',
  journal: 'Journal article',
  website: 'Website',
  newspaper: 'Newspaper or magazine',
  report: 'Report',
  thesis: 'Thesis or dissertation',
  video: 'Video',
  conference: 'Conference paper',
  lecture: 'Lecture or slides',
};

const inputCls =
  'w-full min-w-0 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-base text-navy outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 disabled:bg-gray-50';
const labelCls = 'block text-xs font-black uppercase tracking-wider text-gray-600 mb-1.5';

export function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function emptySource(type: SourceType): SourceInput {
  return {
    type, authors: [], org: '', year: '', month: '', day: '', noDate: false, title: '', container: '', editors: [],
    edition: '', publisher: '', volume: '', issue: '', pages: '', url: '', accessed: today(), citePage: '', kind: '',
  };
}

/** Shared dialog frame: a sheet on phones, a centred panel on larger screens */
export function Dialog({ title, onClose, children, wide = true }: { title: string; onClose: () => void; children: ReactNode; wide?: boolean }) {
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const first = panelRef.current?.querySelector<HTMLElement>('input, textarea, select, button[data-autofocus]');
    first?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);
  // Rendered at the end of <body> so that it sits above the site header and floating buttons
  return createPortal(
    <div className="fixed inset-0 z-[10010] flex items-end justify-center bg-navy/60 sm:items-center sm:p-4" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`flex max-h-[94vh] w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl ${wide ? 'sm:max-w-5xl' : 'sm:max-w-xl'}`}
      >
        <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-5 py-4">
          <h2 className="text-lg font-extrabold text-navy">{title}</h2>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-navy" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>,
    document.body,
  );
}

type KeyedPerson = Person & { key: number };

function PeopleFields({ legend, people, onChange, nextKey }: { legend: string; people: KeyedPerson[]; onChange: (p: KeyedPerson[]) => void; nextKey: () => number }) {
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
              <X className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>
      <button type="button" onClick={() => onChange([...people, { key: nextKey(), surname: '', given: '' }])} className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline">
        <Plus className="h-4 w-4" /> Add another
      </button>
    </fieldset>
  );
}

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

type Fields = Omit<SourceInput, 'type' | 'authors' | 'editors'>;

export default function SourceEditor({
  style,
  initial,
  mode,
  notice: initialNotice = '',
  noticeTone = 'ok',
  onSave,
  onClose,
}: {
  style: ReferenceStyle;
  initial: SourceInput;
  mode: 'add' | 'edit';
  notice?: string;
  noticeTone?: 'ok' | 'warn';
  onSave: (src: SourceInput) => void;
  onClose: () => void;
}) {
  const isApa = style === 'apa';
  const keyRef = useRef(0);
  const nextKey = () => ++keyRef.current;
  const withKeys = (list: Person[]): KeyedPerson[] => (list.length ? list.map((p) => ({ ...p, key: nextKey() })) : [{ key: nextKey(), surname: '', given: '' }]);

  const [type, setType] = useState<SourceType>(initial.type);
  const [authorMode, setAuthorMode] = useState<'people' | 'org'>(initial.org && !initial.authors.some((a) => a.surname) ? 'org' : 'people');
  const [authors, setAuthors] = useState<KeyedPerson[]>(() => withKeys(initial.authors));
  const [editors, setEditors] = useState<KeyedPerson[]>(() => withKeys(initial.editors));
  const [f, setF] = useState<Fields>(() => {
    const { type: _t, authors: _a, editors: _e, ...rest } = initial; // eslint-disable-line @typescript-eslint/no-unused-vars
    return { ...rest, month: rest.month ?? '', day: rest.day ?? '', kind: rest.kind ?? '', accessed: rest.accessed || today() };
  });
  const [notice, setNotice] = useState(initialNotice);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setF((prev) => ({ ...prev, [k]: e.target instanceof HTMLInputElement && e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const src: SourceInput = {
    ...f,
    type,
    authors: authorMode === 'people' ? authors.map(({ surname, given }) => ({ surname, given })) : [],
    org: authorMode === 'org' ? f.org : '',
    editors: type === 'chapter' || type === 'conference' ? editors.map(({ surname, given }) => ({ surname, given })) : [],
  };
  const missing = missingFields(src);
  const srcKey = JSON.stringify(src);
  const out = useMemo(() => formatIn(style, src), [srcKey, style]); // eslint-disable-line react-hooks/exhaustive-deps

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
  const doiTypes: SourceType[] = ['book', 'chapter', 'journal', 'report', 'thesis', 'conference'];
  const urlRequired = type === 'website' || type === 'video';
  const urlLabel = urlRequired ? 'URL' : doiTypes.includes(type) ? 'DOI or URL (optional)' : 'URL (optional)';
  const showAccessed = !isApa && (urlRequired || (f.url.trim() !== '' && !isDoi(f.url)));
  const authorLegend = AUTHOR_LEGENDS[type] ?? 'Author';

  return (
    <Dialog title={mode === 'edit' ? 'Edit reference' : 'Add a reference'} onClose={onClose}>
      <div className="grid grid-cols-1 gap-6 p-5 lg:grid-cols-[minmax(0,1fr)_340px]">
        <form className="min-w-0 space-y-5" onSubmit={(e) => e.preventDefault()}>
          {notice && (
            <div role="status" className={`flex items-start gap-2 rounded-lg px-3 py-2 text-sm ${noticeTone === 'warn' ? 'bg-amber-50 text-amber-900' : 'bg-emerald-50 text-emerald-900'}`}>
              {noticeTone === 'ok' && <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />}
              <p className="flex-1">{notice}</p>
              <button type="button" onClick={() => setNotice('')} className="shrink-0 rounded p-0.5 hover:bg-black/5" aria-label="Dismiss message">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          <div>
            <label htmlFor="ref-type" className={labelCls}>Source type</label>
            <select id="ref-type" className={inputCls} value={type} onChange={(e) => setType(e.target.value as SourceType)}>
              {SOURCE_TYPES.map((t) => (
                <option key={t} value={t}>{TYPE_LABELS[t]}</option>
              ))}
            </select>
          </div>

          <div>
            <div className="mb-3 flex flex-wrap gap-4 text-sm font-bold text-navy">
              <label className="inline-flex items-center gap-2">
                <input type="radio" name="authorMode" checked={authorMode === 'people'} onChange={() => setAuthorMode('people')} className="h-4 w-4 accent-[#0B1D3A]" />
                {authorLegend}(s)
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" name="authorMode" checked={authorMode === 'org'} onChange={() => setAuthorMode('org')} className="h-4 w-4 accent-[#0B1D3A]" />
                Organisation as author
              </label>
            </div>
            {authorMode === 'people' ? (
              <PeopleFields legend={authorLegend} people={authors} onChange={setAuthors} nextKey={nextKey} />
            ) : (
              <label className="block">
                <span className={labelCls}>Organisation</span>
                <input className={inputCls} value={f.org} onChange={set('org')} placeholder={type === 'video' ? 'e.g. Harvard University or the channel name' : 'e.g. World Health Organization'} />
              </label>
            )}
            <p className="mt-2 text-xs text-gray-500">No author or organisation? Leave this empty and the reference will start with the title.</p>
          </div>

          <div className={`grid items-end gap-3 ${dayMonth ? 'grid-cols-[64px_minmax(0,1fr)_minmax(0,1fr)] sm:grid-cols-[72px_minmax(0,1fr)_minmax(0,1fr)_auto]' : 'grid-cols-[minmax(0,1fr)_auto]'}`}>
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
              <input type="checkbox" checked={f.noDate} onChange={set('noDate')} className="h-4 w-4 accent-[#0B1D3A]" /> No date
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
                  <CaseSensitive className="h-3.5 w-3.5" /> Sentence case
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
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
              <span className={labelCls}>{type === 'thesis' ? 'University' : type === 'lecture' ? 'University or course website' : 'Publisher'}</span>
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
            <input className={inputCls} value={f.url} onChange={set('url')} placeholder={type === 'journal' || type === 'conference' ? 'e.g. 10.1191/1478088706qp063oa' : 'https://'} />
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

        <div className="lg:sticky lg:top-0 lg:self-start">
          <div className="rounded-2xl bg-navy p-5 text-white" aria-live="polite">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-[11px] font-black uppercase tracking-widest text-primary">{STYLE_NAMES[style]}</p>
              {!missing.length && <CopyButton html={segmentsToHtml(out.reference)} text={segmentsToText(out.reference)} label="Copy reference" />}
            </div>
            {missing.length ? (
              <p className="text-sm text-white/70">Add the {missing.join(', ')} to see your reference.</p>
            ) : (
              <p className="break-words text-[15px] leading-relaxed"><Rich segs={out.reference} /></p>
            )}
            {!missing.length && (
              <div className="mt-5 space-y-3 border-t border-white/10 pt-4">
                <p className="text-[11px] font-black uppercase tracking-widest text-primary">In-text citation</p>
                <div className="flex items-start justify-between gap-3">
                  <p className="break-words text-[15px]"><span className="block text-[11px] font-bold text-white/50">Parenthetical</span><Rich segs={out.parenthetical} /></p>
                  <CopyButton html={segmentsToHtml(out.parenthetical)} text={segmentsToText(out.parenthetical)} label="Copy parenthetical citation" />
                </div>
                <div className="flex items-start justify-between gap-3">
                  <p className="break-words text-[15px]"><span className="block text-[11px] font-bold text-white/50">Narrative</span><Rich segs={out.narrative} /></p>
                  <CopyButton html={segmentsToHtml(out.narrative)} text={segmentsToText(out.narrative)} label="Copy narrative citation" />
                </div>
              </div>
            )}
          </div>
          <div className="mt-4 flex gap-2">
            <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-bold text-navy hover:border-navy">
              Cancel
            </button>
            <button
              type="button"
              disabled={missing.length > 0}
              onClick={() => onSave({ ...src, accessed: f.accessed })}
              className="flex flex-[2] items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {mode === 'edit' ? <Check className="h-5 w-5" /> : <ListPlus className="h-5 w-5" />} {mode === 'edit' ? 'Save changes' : 'Save to project'}
            </button>
          </div>
          {missing.length > 0 && <p className="mt-2 text-center text-xs text-gray-500">Fill in the {missing.join(', ')} to save.</p>}
        </div>
      </div>
    </Dialog>
  );
}

/** A reference the visitor already has as finished text */
export function PreEditor({ initial, onSave, onClose }: { initial: string; onSave: (text: string) => void; onClose: () => void }) {
  const [text, setText] = useState(initial);
  return (
    <Dialog title={initial ? 'Edit pre-formatted reference' : 'Add a pre-formatted reference'} onClose={onClose} wide={false}>
      <div className="space-y-4 p-5">
        <label className="block">
          <span className={labelCls}>Reference</span>
          <textarea className={`${inputCls} min-h-[140px]`} value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste a finished reference, for example from your library catalogue" maxLength={2000} />
        </label>
        <p className="text-xs text-gray-500">It is added exactly as written and stays the same when you switch style. Italics are not kept, so add them in your document.</p>
        <div className="flex gap-2">
          <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-bold text-navy hover:border-navy">Cancel</button>
          <button
            type="button"
            disabled={!text.trim()}
            onClick={() => onSave(text.trim())}
            className="flex-[2] rounded-xl bg-primary py-3 text-sm font-bold hover:brightness-110 disabled:opacity-50"
          >
            Save to project
          </button>
        </div>
      </div>
    </Dialog>
  );
}
