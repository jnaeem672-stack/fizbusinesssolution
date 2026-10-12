'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, Copy, ListPlus, Plus, Trash2, X } from 'lucide-react';
import {
  formatSource,
  missingFields,
  segmentsToHtml,
  segmentsToText,
  type Person,
  type Segment,
  type SourceInput,
  type SourceType,
} from '@/utils/harvard';

const TYPES: { id: SourceType; label: string }[] = [
  { id: 'book', label: 'Book' },
  { id: 'chapter', label: 'Chapter in edited book' },
  { id: 'journal', label: 'Journal article' },
  { id: 'website', label: 'Website' },
  { id: 'report', label: 'Report' },
];

const STORAGE_KEY = 'fizbs-harvard-list';

interface ListItem { id: string; segs: Segment[]; sortKey: string }

const isSegments = (v: unknown): v is Segment[] =>
  Array.isArray(v) && v.every((s) => s && typeof s.text === 'string' && (s.italic === undefined || typeof s.italic === 'boolean'));

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
      {segs.map((s, i) => (s.italic ? <i key={i}>{s.text}</i> : <span key={i}>{s.text}</span>))}
    </>
  );
}

function CopyButton({ html, text, label }: { html: string; text: string; label: string }) {
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
      className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-black text-white hover:bg-white/20"
      aria-label={label}
    >
      {done ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} {done ? 'Copied' : 'Copy'}
    </button>
  );
}

function PeopleFields({
  legend,
  people,
  onChange,
  nextKey,
}: {
  legend: string;
  people: (Person & { key: number })[];
  onChange: (p: (Person & { key: number })[]) => void;
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

export default function HarvardGenerator() {
  const keyRef = useRef(0);
  const nextKey = () => ++keyRef.current;

  const [type, setType] = useState<SourceType>('book');
  const [authorMode, setAuthorMode] = useState<'people' | 'org'>('people');
  const [authors, setAuthors] = useState<(Person & { key: number })[]>(() => [{ key: nextKey(), surname: '', given: '' }]);
  const [editors, setEditors] = useState<(Person & { key: number })[]>(() => [{ key: nextKey(), surname: '', given: '' }]);
  const [f, setF] = useState({
    org: '', year: '', noDate: false, title: '', container: '', edition: '', publisher: '',
    volume: '', issue: '', pages: '', url: '', accessed: '', citePage: '',
  });
  const [list, setList] = useState<ListItem[]>([]);
  const [listCopied, setListCopied] = useState(false);

  // Accessed date defaults to today (set after mount to avoid a server/client mismatch)
  useEffect(() => {
    setF((prev) => (prev.accessed ? prev : { ...prev, accessed: today() }));
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setList(parsed.filter((x) => x && typeof x.id === 'string' && typeof x.sortKey === 'string' && isSegments(x.segs)));
      }
    } catch {
      /* storage unavailable */
    }
  }, []);

  const saveList = (next: ListItem[]) => {
    setList(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable */
    }
  };

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setF((prev) => ({ ...prev, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const src: SourceInput = {
    type,
    authors: authorMode === 'people' ? authors : [],
    org: authorMode === 'org' ? f.org : '',
    year: f.year,
    noDate: f.noDate,
    title: f.title,
    container: f.container,
    editors,
    edition: f.edition,
    publisher: f.publisher,
    volume: f.volume,
    issue: f.issue,
    pages: f.pages,
    // For journals the accessed date is only added when the user asks for it
    url: f.url,
    accessed: type === 'journal' && !journalAccessed(f.url) ? '' : f.accessed,
    citePage: f.citePage,
  };
  const missing = missingFields(src);
  const out = useMemo(() => formatSource(src), [JSON.stringify(src)]); // eslint-disable-line react-hooks/exhaustive-deps

  const refHtml = segmentsToHtml(out.reference);
  const refText = segmentsToText(out.reference);
  const sorted = [...list].sort((a, b) => a.sortKey.localeCompare(b.sortKey));

  const titleLabel = { book: 'Book title', chapter: 'Chapter title', journal: 'Article title', website: 'Web page title', report: 'Report title' }[type];
  const showEditionPublisher = type === 'book' || type === 'chapter' || type === 'report';
  const showUrl = type !== 'chapter';
  const showAccessed = type === 'website' || type === 'report' || (type === 'journal' && journalAccessed(f.url));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_400px] gap-6 lg:gap-8 items-start">
      <form className="space-y-5 min-w-0" onSubmit={(e) => e.preventDefault()}>
        <fieldset>
          <legend className={labelCls}>Source type</legend>
          <div className="flex flex-wrap gap-2">
            {TYPES.map((t) => (
              <button
                key={t.id}
                type="button"
                aria-pressed={type === t.id}
                onClick={() => setType(t.id)}
                className={`rounded-full px-4 py-2 text-sm font-bold border transition-colors ${type === t.id ? 'bg-navy border-navy text-white' : 'border-gray-200 text-navy hover:border-primary'}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </fieldset>

        <div>
          <div className="flex flex-wrap gap-4 mb-3 text-sm font-bold text-navy">
            <label className="inline-flex items-center gap-2">
              <input type="radio" name="authorMode" checked={authorMode === 'people'} onChange={() => setAuthorMode('people')} className="accent-[#0B1D3A] w-4 h-4" />
              {type === 'chapter' ? 'Chapter author(s)' : 'Author(s)'}
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="radio" name="authorMode" checked={authorMode === 'org'} onChange={() => setAuthorMode('org')} className="accent-[#0B1D3A] w-4 h-4" />
              Organisation as author
            </label>
          </div>
          {authorMode === 'people' ? (
            <PeopleFields legend={type === 'chapter' ? 'Chapter author' : 'Author'} people={authors} onChange={setAuthors} nextKey={nextKey} />
          ) : (
            <label className="block">
              <span className={labelCls}>Organisation</span>
              <input className={inputCls} value={f.org} onChange={set('org')} placeholder="e.g. World Health Organization" />
            </label>
          )}
          <p className="mt-2 text-xs text-gray-500">No author or organisation? Leave this empty and the reference will start with the title.</p>
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 items-end">
          <label className="block">
            <span className={labelCls}>Year</span>
            <input className={inputCls} inputMode="numeric" value={f.year} onChange={set('year')} placeholder="e.g. 2023" disabled={f.noDate} />
          </label>
          <label className="inline-flex items-center gap-2 pb-3 text-sm font-bold text-navy">
            <input type="checkbox" checked={f.noDate} onChange={set('noDate')} className="accent-[#0B1D3A] w-4 h-4" /> No date
          </label>
        </div>

        <label className="block">
          <span className={labelCls}>{titleLabel}</span>
          <input className={inputCls} value={f.title} onChange={set('title')} placeholder="Capitalise only the first word and proper nouns" />
        </label>

        {type === 'chapter' && (
          <>
            <PeopleFields legend="Editor" people={editors} onChange={setEditors} nextKey={nextKey} />
            <label className="block">
              <span className={labelCls}>Book title</span>
              <input className={inputCls} value={f.container} onChange={set('container')} />
            </label>
          </>
        )}

        {type === 'journal' && (
          <>
            <label className="block">
              <span className={labelCls}>Journal name</span>
              <input className={inputCls} value={f.container} onChange={set('container')} placeholder="e.g. Journal of Management Studies" />
            </label>
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
          </>
        )}

        {showEditionPublisher && (
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

        {(type === 'journal' || type === 'chapter') && (
          <label className="block">
            <span className={labelCls}>Pages</span>
            <input className={inputCls} value={f.pages} onChange={set('pages')} placeholder="e.g. 45-67" />
          </label>
        )}

        {showUrl && (
          <label className="block">
            <span className={labelCls}>{type === 'journal' ? 'DOI or URL (optional)' : type === 'website' ? 'URL' : 'URL (optional)'}</span>
            <input className={inputCls} value={f.url} onChange={set('url')} placeholder={type === 'journal' ? 'e.g. 10.1191/1478088706qp063oa' : 'https://'} />
          </label>
        )}

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
        <div className="rounded-2xl bg-navy p-5 sm:p-6 text-white" aria-live="polite">
          <div className="flex items-center justify-between gap-3 mb-3">
            <p className="text-[11px] font-black uppercase tracking-widest text-primary">Reference</p>
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
                onClick={() => {
                  if (list.some((x) => segmentsToText(x.segs) === refText)) return;
                  saveList([...list, { id: `${Date.now()}-${list.length}`, segs: out.reference, sortKey: out.sortKey }]);
                }}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-bold hover:brightness-110"
              >
                <ListPlus className="w-5 h-5" /> Add to reference list
              </button>
            </>
          )}
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between gap-3 mb-3">
            <h2 className="text-base font-extrabold text-navy">Your reference list ({list.length})</h2>
            {list.length > 0 && (
              <button
                type="button"
                onClick={async () => {
                  const html = sorted.map((x) => `<p>${segmentsToHtml(x.segs)}</p>`).join('');
                  const text = sorted.map((x) => segmentsToText(x.segs)).join('\n\n');
                  if (await copyRich(html, text)) {
                    setListCopied(true);
                    setTimeout(() => setListCopied(false), 1800);
                  }
                }}
                className="inline-flex items-center gap-1.5 rounded-lg bg-navy px-3 py-1.5 text-xs font-black text-white"
              >
                {listCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} {listCopied ? 'Copied' : 'Copy all'}
              </button>
            )}
          </div>
          {list.length ? (
            <ol className="space-y-3">
              {sorted.map((x) => (
                <li key={x.id} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
                  <span className="flex-1 break-words"><Rich segs={x.segs} /></span>
                  <button
                    type="button"
                    onClick={() => saveList(list.filter((y) => y.id !== x.id))}
                    className="shrink-0 rounded-md p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
                    aria-label="Remove reference"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-sm text-gray-500">References you add appear here in alphabetical order. They are saved in this browser only.</p>
          )}
        </div>
      </div>
    </div>
  );
}

/** Journals found by URL (not DOI) need an accessed date */
function journalAccessed(url: string) {
  const u = url.trim();
  if (!u) return false;
  return !/^(?:doi:\s*|https?:\/\/(?:dx\.)?doi\.org\/)?10\.\d{4,9}\//i.test(u);
}
