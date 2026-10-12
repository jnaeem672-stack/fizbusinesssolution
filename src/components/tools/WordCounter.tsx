'use client';

import { useDeferredValue, useMemo, useState } from 'react';
import { Eraser } from 'lucide-react';

const HAS_WORD_CHAR = /[\p{L}\p{N}]/u;
const REF_HEADING = /^[ \t]*(references|reference list|bibliography|works cited|list of references)[ \t]*:?[ \t]*$/im;

export function countText(raw: string, excludeRefs: boolean) {
  let text = raw;
  let cut = false;
  if (excludeRefs) {
    const m = REF_HEADING.exec(raw);
    if (m) {
      text = raw.slice(0, m.index);
      cut = true;
    }
  }
  const words = text.split(/\s+/).filter((t) => HAS_WORD_CHAR.test(t)).length;
  const characters = [...text].length;
  const noSpaces = [...text.replace(/\s/g, '')].length;
  const sentences = text.split(/[.!?]+(?=\s|$)/).filter((s) => HAS_WORD_CHAR.test(s)).length;
  const paragraphs = text.split(/\n+/).filter((l) => HAS_WORD_CHAR.test(l)).length;
  return { words, characters, noSpaces, sentences, paragraphs, cut };
}

const fmtPages = (words: number, perPage: number) => {
  const p = words / perPage;
  return p === 0 ? '0' : p < 0.1 ? '0.1' : (Math.round(p * 10) / 10).toString();
};

function fmtTime(words: number, wpm: number) {
  if (!words) return '0 min';
  const secs = Math.round((words / wpm) * 60);
  if (secs < 60) return `${secs} sec`;
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return s ? `${m} min ${s} sec` : `${m} min`;
}

const inputCls =
  'w-full min-w-0 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-base text-navy outline-none focus:border-primary focus:ring-2 focus:ring-primary/15';

export default function WordCounter() {
  const [text, setText] = useState('');
  const [excludeRefs, setExcludeRefs] = useState(true);
  const [limit, setLimit] = useState('');
  const [convert, setConvert] = useState('2000');
  const deferred = useDeferredValue(text);
  const stats = useMemo(() => countText(deferred, excludeRefs), [deferred, excludeRefs]);

  const limitNum = parseInt(limit.replace(/,/g, ''), 10);
  const hasLimit = Number.isFinite(limitNum) && limitNum > 0;
  const diff = hasLimit ? stats.words - limitNum : 0;
  const within10 = hasLimit && Math.abs(diff) <= limitNum * 0.1;

  const convertNum = Math.max(0, parseInt(convert.replace(/,/g, ''), 10) || 0);

  const tiles = [
    { label: 'Words', value: stats.words.toLocaleString('en-GB'), big: true },
    { label: 'Characters', value: stats.characters.toLocaleString('en-GB') },
    { label: 'Characters (no spaces)', value: stats.noSpaces.toLocaleString('en-GB') },
    { label: 'Sentences', value: stats.sentences.toLocaleString('en-GB') },
    { label: 'Paragraphs', value: stats.paragraphs.toLocaleString('en-GB') },
    { label: 'Reading time', value: fmtTime(stats.words, 200) },
    { label: 'Speaking time', value: fmtTime(stats.words, 130) },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-6 lg:gap-8 items-start">
        <div className="min-w-0">
          <label htmlFor="wc-text" className="block text-sm font-black text-navy mb-2">Paste or type your text</label>
          <textarea
            id="wc-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={14}
            placeholder="Paste your essay, report or dissertation chapter here..."
            className={`${inputCls} min-h-[280px] resize-y leading-relaxed`}
          />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <label className="inline-flex items-center gap-2 text-sm font-bold text-navy">
              <input type="checkbox" checked={excludeRefs} onChange={(e) => setExcludeRefs(e.target.checked)} className="accent-[#0B1D3A] w-4 h-4" />
              Exclude reference list
            </label>
            <button
              type="button"
              onClick={() => setText('')}
              className="inline-flex items-center gap-1.5 rounded-lg border border-navy/15 px-3.5 py-2 text-sm font-bold text-navy hover:border-primary hover:text-primary"
            >
              <Eraser className="w-4 h-4" /> Clear
            </button>
          </div>
          {excludeRefs && stats.cut && (
            <p className="mt-2 text-xs text-gray-600">Counting stops at your References or Bibliography heading.</p>
          )}
          <p className="mt-2 text-xs text-gray-500">Your text stays in your browser. Nothing is uploaded or saved.</p>
        </div>

        <div className="lg:sticky lg:top-[110px] space-y-4" aria-live="polite">
          <div className="rounded-2xl bg-navy p-5 text-white">
            <dl className="grid grid-cols-2 gap-3">
              {tiles.map((t) => (
                <div key={t.label} className={t.big ? 'col-span-2 rounded-xl bg-white/[0.06] p-4' : 'rounded-xl bg-white/[0.06] p-3'}>
                  <dt className="text-[10px] font-black uppercase tracking-widest text-white/60">{t.label}</dt>
                  <dd className={t.big ? 'text-4xl font-extrabold text-primary' : 'text-lg font-extrabold'}>{t.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 border-t border-white/10 pt-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-2">Pages (A4, 12 pt)</p>
              <ul className="grid grid-cols-3 gap-2 text-center">
                {[
                  ['Single', 500],
                  ['1.5', 333],
                  ['Double', 250],
                ].map(([label, per]) => (
                  <li key={label} className="rounded-lg bg-white/[0.06] py-2">
                    <span className="block text-lg font-extrabold">{fmtPages(stats.words, per as number)}</span>
                    <span className="block text-[10px] font-bold text-white/60">{label} spaced</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 p-4">
            <label htmlFor="wc-limit" className="block text-sm font-black text-navy mb-2">Word limit (optional)</label>
            <input id="wc-limit" className={inputCls} inputMode="numeric" value={limit} onChange={(e) => setLimit(e.target.value)} placeholder="e.g. 2500" />
            {hasLimit && (
              <p className={`mt-2 text-sm font-bold ${within10 ? 'text-green-700' : 'text-red-700'}`}>
                {diff === 0 ? 'Exactly on the limit.' : diff > 0 ? `${diff.toLocaleString('en-GB')} words over.` : `${Math.abs(diff).toLocaleString('en-GB')} words under.`}{' '}
                {within10 ? 'Within 10% of the limit.' : 'More than 10% away from the limit.'}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4 sm:p-5">
        <h2 className="text-lg font-extrabold text-navy mb-3">Words to pages converter</h2>
        <div className="grid grid-cols-1 sm:grid-cols-[200px_minmax(0,1fr)] gap-4 items-center">
          <label className="block">
            <span className="block text-xs font-black uppercase tracking-wider text-gray-600 mb-1.5">Number of words</span>
            <input className={inputCls} inputMode="numeric" value={convert} onChange={(e) => setConvert(e.target.value)} />
          </label>
          <p className="text-[17px] text-gray-700">
            <strong className="text-navy">{convertNum.toLocaleString('en-GB')} words</strong> is about{' '}
            <strong className="text-navy">{fmtPages(convertNum, 500)}</strong> pages single spaced,{' '}
            <strong className="text-navy">{fmtPages(convertNum, 333)}</strong> pages at 1.5 spacing, or{' '}
            <strong className="text-navy">{fmtPages(convertNum, 250)}</strong> pages double spaced.
          </p>
        </div>
      </div>
    </div>
  );
}
