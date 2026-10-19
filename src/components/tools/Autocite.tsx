'use client';

import { useRef, useState } from 'react';
import { Loader2, Search, X } from 'lucide-react';
import { autocite, LookupError } from '@/utils/cite/lookup';
import { detectQuery, tidyUrl } from '@/utils/cite/detect';
import type { CiteResult } from '@/utils/cite/types';
import type { SourceType } from '@/utils/harvard';

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

function authorsSummary(r: CiteResult): string {
  const d = r.data;
  if (d.org) return d.org;
  if (!d.authors.length) return '';
  const names = d.authors.slice(0, 3).map((a) => a.surname);
  return d.authors.length > 3 ? `${names.join(', ')} and others` : names.join(', ');
}

const EXAMPLES = ['10.1191/1478088706qp063oa', '9781292208787', 'https://www.bbc.co.uk/news/...'];

export default function Autocite({
  onPick,
  onUrlFallback,
}: {
  onPick: (r: CiteResult) => void;
  onUrlFallback: (url: string) => void;
}) {
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ tone: 'info' | 'error'; text: string } | null>(null);
  const [results, setResults] = useState<CiteResult[]>([]);
  const runId = useRef(0);

  const run = async () => {
    const query = detectQuery(q);
    if (query.kind === 'empty') {
      setMessage({ tone: 'error', text: 'Paste a DOI, ISBN or web link, or type at least three letters of the title.' });
      return;
    }
    const id = ++runId.current;
    setBusy(true);
    setMessage(null);
    setResults([]);
    try {
      const out = await autocite(q);
      if (id !== runId.current) return;
      if (out.kind === 'single') {
        onPick(out.result);
      } else if (out.kind === 'many') {
        setResults(out.results);
      } else {
        const text = {
          doi: 'We could not find that DOI. Check it for typing errors, or fill in the details below.',
          isbn: 'We could not find that ISBN. Try searching by the book title instead, or fill in the details below.',
          url: 'We could not read that page. Fill in the details below.',
          title: 'No matches found. Try adding the author’s surname or the year, or fill in the details below.',
          empty: 'Paste a DOI, ISBN or web link, or type a title.',
        }[out.reason];
        setMessage({ tone: 'error', text });
      }
    } catch (e) {
      if (id !== runId.current) return;
      if (query.kind === 'url') {
        onUrlFallback(tidyUrl(query.url));
        setMessage({
          tone: 'error',
          text:
            e instanceof LookupError && e.message && !/^HTTP/.test(e.message)
              ? `${e.message} We have added the link and today's date, so fill in the title, author and date below.`
              : 'We could not read the details from that page. We have added the link, so fill in the title, author and date below.',
        });
      } else {
        setMessage({ tone: 'error', text: 'The lookup service did not respond. Please try again in a moment, or fill in the details below.' });
      }
    } finally {
      if (id === runId.current) setBusy(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          void run();
        }}
      >
        <label htmlFor="autocite-q" className="block text-sm font-extrabold text-navy mb-1">
          Autocite: find your source
        </label>
        <p id="autocite-help" className="text-xs text-gray-500 mb-3">
          Paste a DOI, ISBN or web link, or type the title of a book or article. The details fill in for you to check.
        </p>
        <div className="flex gap-2">
          <div className="relative flex-1 min-w-0">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" aria-hidden="true" />
            <input
              id="autocite-q"
              type="text"
              inputMode="search"
              autoComplete="off"
              spellCheck={false}
              aria-describedby="autocite-help"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="e.g. 10.1191/1478088706qp063oa"
              className="w-full min-w-0 rounded-xl border border-gray-200 bg-gray-50 py-3 pl-9 pr-9 text-base text-navy outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/15"
            />
            {q && (
              <button
                type="button"
                onClick={() => {
                  setQ('');
                  setResults([]);
                  setMessage(null);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 hover:text-navy"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            type="submit"
            disabled={busy}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-navy w-12 sm:w-auto sm:px-5 py-3 text-sm font-black text-white hover:bg-navy-light disabled:opacity-60"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Search className="h-4 w-4" aria-hidden="true" />}
            <span className="sr-only sm:not-sr-only">Find source</span>
          </button>
        </div>
        <p className="mt-2 text-[11px] text-gray-400 break-words">
          Examples: {EXAMPLES.map((x, i) => (
            <span key={x}>
              {i > 0 && ' · '}
              <code className="font-mono">{x}</code>
            </span>
          ))}
        </p>
      </form>

      <div role="status" className="empty:hidden">
        {busy && <p className="mt-3 text-sm text-gray-600">Looking up your source...</p>}
        {message && (
          <p className={`mt-3 rounded-lg px-3 py-2 text-sm ${message.tone === 'error' ? 'bg-amber-50 text-amber-900' : 'bg-gray-50 text-gray-700'}`}>{message.text}</p>
        )}
        {results.length > 0 && <p className="mt-4 text-xs font-black uppercase tracking-wider text-gray-600">Choose your source ({results.length} found)</p>}
      </div>

      {results.length > 0 && (
        <ul className="mt-2 divide-y divide-gray-100 rounded-xl border border-gray-100">
          {results.map((r, i) => {
            const d = r.data;
            const meta = [authorsSummary(r), d.year, d.type === 'journal' || d.type === 'chapter' || d.type === 'conference' ? d.container : d.publisher]
              .filter(Boolean)
              .join(' · ');
            return (
              <li key={`${r.source}-${i}`}>
                <button
                  type="button"
                  onClick={() => {
                    setResults([]);
                    setMessage(null);
                    onPick(r);
                  }}
                  className="block w-full px-3 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                >
                  <span className="mb-1 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-navy">{TYPE_LABELS[d.type]}</span>
                    <span className="text-[10px] font-bold text-gray-400">{r.source}</span>
                  </span>
                  <span className="block text-sm font-bold text-navy break-words">{d.title}</span>
                  {meta && <span className="block text-xs text-gray-500 break-words">{meta}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
