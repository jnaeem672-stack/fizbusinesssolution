'use client';

import { useMemo, useRef, useState } from 'react';
import { Plus, Trash2, Info, Target } from 'lucide-react';

type Mode = 'ug' | 'pg';
type YearKey = 'y1' | 'y2' | 'y3' | 'y4';
interface ModuleRow { id: number; name: string; credits: string; mark: string }
interface YearData { total: string; modules: ModuleRow[] }

const YEAR_LABELS: Record<YearKey, string> = { y1: 'Year 1', y2: 'Year 2', y3: 'Year 3', y4: 'Year 4' };
const YEAR_KEYS: YearKey[] = ['y1', 'y2', 'y3', 'y4'];

const PRESETS: { id: string; label: string; w: Record<YearKey, number> }[] = [
  { id: '40-60', label: 'Year 2: 40%, Year 3: 60%', w: { y1: 0, y2: 40, y3: 60, y4: 0 } },
  { id: '50-50', label: 'Year 2: 50%, Year 3: 50%', w: { y1: 0, y2: 50, y3: 50, y4: 0 } },
  { id: '33-67', label: 'Year 2: 33%, Year 3: 67% (1:2)', w: { y1: 0, y2: 100 / 3, y3: 200 / 3, y4: 0 } },
  { id: '25-75', label: 'Year 2: 25%, Year 3: 75% (1:3)', w: { y1: 0, y2: 25, y3: 75, y4: 0 } },
  { id: '20-80', label: 'Year 2: 20%, Year 3: 80%', w: { y1: 0, y2: 20, y3: 80, y4: 0 } },
  { id: '0-100', label: 'Final year only (100%)', w: { y1: 0, y2: 0, y3: 100, y4: 0 } },
  { id: 'scot', label: 'Scotland: Year 3: 50%, Year 4: 50%', w: { y1: 0, y2: 0, y3: 50, y4: 50 } },
  { id: 'custom', label: 'Custom weighting', w: { y1: 0, y2: 40, y3: 60, y4: 0 } },
];

const UG_BANDS = [
  { min: 70, label: 'First Class', short: 'First' },
  { min: 60, label: 'Upper Second (2:1)', short: '2:1' },
  { min: 50, label: 'Lower Second (2:2)', short: '2:2' },
  { min: 40, label: 'Third Class', short: 'Third' },
];
const PG_BANDS = [
  { min: 70, label: 'Distinction', short: 'Distinction' },
  { min: 60, label: 'Merit', short: 'Merit' },
  { min: 50, label: 'Pass', short: 'Pass' },
];

const num = (v: string) => {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : NaN;
};

function emptyRows(nextId: () => number, count: number, credits = '20'): ModuleRow[] {
  return Array.from({ length: count }, () => ({ id: nextId(), name: '', credits, mark: '' }));
}

const inputCls =
  'w-full min-w-0 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-base text-navy outline-none focus:border-primary focus:ring-2 focus:ring-primary/15';

function ModuleTable({
  title,
  data,
  defaultTotal,
  onChange,
  nextId,
}: {
  title: string;
  data: YearData;
  defaultTotal: string;
  onChange: (d: YearData) => void;
  nextId: () => number;
}) {
  const update = (id: number, patch: Partial<ModuleRow>) =>
    onChange({ ...data, modules: data.modules.map((m) => (m.id === id ? { ...m, ...patch } : m)) });
  const listed = data.modules.reduce((s, m) => s + (num(m.credits) > 0 ? num(m.credits) : 0), 0);
  const total = num(data.total) > 0 ? num(data.total) : num(defaultTotal);
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return (
    <fieldset className="rounded-2xl border border-gray-200 p-4 sm:p-5">
      <legend className="px-2 text-sm font-black uppercase tracking-widest text-primary">{title}</legend>
      <div className="grid grid-cols-[24px_minmax(0,1fr)_minmax(0,1fr)_40px] sm:grid-cols-[minmax(0,1fr)_96px_96px_44px] gap-2 text-[11px] font-black uppercase tracking-wider text-gray-500 mb-2" aria-hidden="true">
        <span className="sm:hidden">#</span>
        <span className="hidden sm:block">Module (optional)</span>
        <span>Credits</span>
        <span>Mark %</span>
        <span />
      </div>
      <ul className="space-y-2">
        {data.modules.map((m, i) => (
          <li key={m.id} className="grid grid-cols-[24px_minmax(0,1fr)_minmax(0,1fr)_40px] sm:grid-cols-[minmax(0,1fr)_96px_96px_44px] gap-2 items-center">
            <span className="sm:hidden text-sm font-bold text-gray-500" aria-hidden="true">{i + 1}</span>
            <input
              className={`${inputCls} hidden sm:block`}
              value={m.name}
              placeholder={`Module ${i + 1}`}
              aria-label={`${title} module ${i + 1} name`}
              onChange={(e) => update(m.id, { name: e.target.value })}
            />
            <input
              className={inputCls}
              type="number"
              inputMode="numeric"
              min={0}
              step={5}
              value={m.credits}
              aria-label={`${title} module ${i + 1} credits`}
              onChange={(e) => update(m.id, { credits: e.target.value })}
            />
            <input
              className={inputCls}
              type="number"
              inputMode="decimal"
              min={0}
              max={100}
              step={0.1}
              value={m.mark}
              placeholder="-"
              aria-label={`${title} module ${i + 1} mark`}
              onChange={(e) => update(m.id, { mark: e.target.value })}
            />
            <button
              type="button"
              onClick={() => onChange({ ...data, modules: data.modules.filter((x) => x.id !== m.id) })}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600"
              aria-label={`Remove ${title} module ${i + 1}`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onChange({ ...data, modules: [...data.modules, ...emptyRows(nextId, 1)] })}
          className="inline-flex items-center gap-1.5 rounded-lg border border-navy/15 px-3.5 py-2 text-sm font-bold text-navy hover:border-primary hover:text-primary"
        >
          <Plus className="w-4 h-4" /> Add module
        </button>
        <label htmlFor={`${slug}-total`} className="flex items-center gap-2 text-sm font-bold text-gray-600">
          Total credits for this {title.startsWith('Year') ? 'year' : 'degree'}
          <input
            id={`${slug}-total`}
            className={`${inputCls.replace('w-full ', '')} w-24`}
            type="number"
            inputMode="numeric"
            min={0}
            step={10}
            value={data.total}
            onChange={(e) => onChange({ ...data, total: e.target.value })}
          />
        </label>
      </div>
      {listed !== total && (
        <p className="mt-2 text-xs text-gray-500">
          Modules listed add up to {listed} of {total} credits. Credits without a mark are treated as still to come.
        </p>
      )}
    </fieldset>
  );
}

export default function DegreeCalculator() {
  const idRef = useRef(0);
  const nextId = () => ++idRef.current;

  const [mode, setMode] = useState<Mode>('ug');
  const [preset, setPreset] = useState('40-60');
  const [custom, setCustom] = useState<Record<YearKey, string>>({ y1: '0', y2: '40', y3: '60', y4: '0' });
  const [years, setYears] = useState<Record<YearKey, YearData>>(() => ({
    y1: { total: '120', modules: emptyRows(nextId, 6) },
    y2: { total: '120', modules: emptyRows(nextId, 6) },
    y3: { total: '120', modules: emptyRows(nextId, 6) },
    y4: { total: '120', modules: emptyRows(nextId, 6) },
  }));
  const [pg, setPg] = useState<YearData>(() => ({
    total: '180',
    modules: [...emptyRows(nextId, 4, '30'), { id: nextId(), name: 'Dissertation', credits: '60', mark: '' }],
  }));

  const weights: Record<YearKey, number> = useMemo(() => {
    if (preset !== 'custom') return PRESETS.find((p) => p.id === preset)!.w;
    const w = {} as Record<YearKey, number>;
    YEAR_KEYS.forEach((k) => {
      const n = num(custom[k]);
      w[k] = n > 0 ? n : 0;
    });
    return w;
  }, [preset, custom]);

  const result = useMemo(() => {
    const parts: { w: number; data: YearData; defaultTotal: number }[] =
      mode === 'pg'
        ? [{ w: 100, data: pg, defaultTotal: 180 }]
        : YEAR_KEYS.filter((k) => weights[k] > 0).map((k) => ({ w: weights[k], data: years[k], defaultTotal: 120 }));
    const W = parts.reduce((s, p) => s + p.w, 0);
    if (W <= 0) return null;

    let A = 0;
    let B = 0;
    let soFarNum = 0;
    let soFarDen = 0;
    let completed = 0;
    let remaining = 0;
    let invalid = false;
    for (const p of parts) {
      let S = 0;
      let C = 0;
      for (const m of p.data.modules) {
        const c = num(m.credits);
        const mk = num(m.mark);
        if (!(c > 0) || m.mark.trim() === '') continue;
        if (!(mk >= 0 && mk <= 100)) { invalid = true; continue; }
        S += c * mk;
        C += c;
      }
      const total = Math.max(num(p.data.total) > 0 ? num(p.data.total) : p.defaultTotal, C);
      const R = total - C;
      A += (p.w / W) * (S / total);
      B += (p.w / W) * (R / total);
      if (C > 0) {
        soFarNum += (p.w / W) * (S / C);
        soFarDen += p.w / W;
      }
      completed += C;
      remaining += R;
    }
    const current = soFarDen > 0 ? soFarNum / soFarDen : null;
    return { A, B, current, completed, remaining, invalid, weightSum: W, complete: B < 1e-9 };
  }, [mode, pg, years, weights]);

  const bands = mode === 'pg' ? PG_BANDS : UG_BANDS;
  const average = result ? (result.complete ? result.A : result.current) : null;
  const band = average !== null ? bands.find((b) => average >= b.min - 1e-9) : undefined;
  const nextBand = average !== null ? [...bands].reverse().find((b) => b.min > average + 1e-9) : undefined;
  const borderline = average !== null && nextBand && nextBand.min - average <= 2;

  const visibleYears = YEAR_KEYS.filter((k) => weights[k] > 0);

  return (
    <div>
      <div role="group" aria-label="Degree type" className="inline-flex rounded-xl bg-gray-100 p-1 mb-6">
        {(
          [
            ['ug', 'Undergraduate (Honours)'],
            ['pg', "Master's"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            aria-pressed={mode === id}
            onClick={() => setMode(id)}
            className={`rounded-lg px-4 py-2.5 text-sm font-black transition-colors ${mode === id ? 'bg-navy text-white shadow' : 'text-navy hover:text-primary'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {average !== null && (
        <a
          href="#degree-result"
          className="lg:hidden sticky top-[118px] z-20 mb-5 flex items-center justify-between gap-3 rounded-xl bg-navy px-4 py-3 text-white shadow-lg"
        >
          <span className="text-sm font-bold">
            {result?.complete ? 'Final' : 'So far'}: <span className="text-lg font-extrabold text-primary">{average.toFixed(2)}%</span>{' '}
            {band ? band.short : mode === 'pg' ? 'Below a Pass' : 'Below a Third'}
          </span>
          <span className="text-xs font-black underline underline-offset-4">Details</span>
        </a>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-6 lg:gap-8 items-start">
        <div className="space-y-5 min-w-0">
          {mode === 'ug' && (
            <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4 sm:p-5">
              <label htmlFor="weighting" className="block text-sm font-black text-navy mb-2">How does your university weight each year?</label>
              <select id="weighting" value={preset} onChange={(e) => setPreset(e.target.value)} className={inputCls}>
                {PRESETS.map((p) => (
                  <option key={p.id} value={p.id}>{p.label}</option>
                ))}
              </select>
              {preset === 'custom' && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {YEAR_KEYS.map((k) => (
                    <label key={k} className="text-xs font-bold text-gray-600">
                      {YEAR_LABELS[k]} weight %
                      <input
                        className={`${inputCls} mt-1`}
                        type="number"
                        inputMode="decimal"
                        min={0}
                        max={100}
                        value={custom[k]}
                        onChange={(e) => setCustom({ ...custom, [k]: e.target.value })}
                      />
                    </label>
                  ))}
                </div>
              )}
              {result && Math.abs(result.weightSum - 100) > 0.01 && (
                <p className="mt-3 text-xs text-gray-600">Your weights add up to {Math.round(result.weightSum * 10) / 10}%. They have been scaled to 100%.</p>
              )}
              <p className="mt-3 text-xs text-gray-500 flex items-start gap-1.5">
                <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" /> Years with 0% weighting are hidden. Find your weighting in your university&apos;s academic regulations.
              </p>
            </div>
          )}

          {mode === 'ug' ? (
            visibleYears.length ? (
              visibleYears.map((k) => (
                <ModuleTable
                  key={k}
                  title={`${YEAR_LABELS[k]} (${Math.round(weights[k] * 10) / 10}%)`}
                  data={years[k]}
                  defaultTotal="120"
                  nextId={nextId}
                  onChange={(d) => setYears((prev) => ({ ...prev, [k]: d }))}
                />
              ))
            ) : (
              <p className="text-sm font-bold text-red-700">Enter a weighting above 0% for at least one year.</p>
            )
          ) : (
            <ModuleTable title="Master's modules" data={pg} defaultTotal="180" nextId={nextId} onChange={setPg} />
          )}
        </div>

        <div id="degree-result" className="scroll-mt-[130px] lg:sticky lg:top-[110px] rounded-2xl bg-navy p-5 sm:p-6 text-white" aria-live="polite">
          <p className="text-[11px] font-black uppercase tracking-widest text-primary mb-2">
            {result?.complete ? 'Your final average' : 'Your average so far'}
          </p>
          {average !== null ? (
            <>
              <p className="text-5xl font-extrabold tracking-tight">{average.toFixed(2)}<span className="text-2xl text-white/60">%</span></p>
              <p className="mt-2 text-xl font-extrabold text-primary">{band ? band.label : mode === 'pg' ? 'Below a Pass' : 'Below a Third'}</p>
              <div className="relative mt-5 h-3 rounded-full bg-white/10" aria-hidden="true">
                <div className="absolute inset-y-0 left-0 rounded-full bg-[#C9A227]" style={{ width: `${Math.min(Math.max(average, 0), 100)}%` }} />
                {bands.map((b) => (
                  <span key={b.min} className="absolute -top-1 h-5 w-px bg-white/60" style={{ left: `${b.min}%` }} />
                ))}
              </div>
              <div className="relative mt-1 h-4 text-[10px] font-bold text-white/60" aria-hidden="true">
                {bands.map((b) => (
                  <span key={b.min} className="absolute -translate-x-1/2" style={{ left: `${b.min}%` }}>{b.min}</span>
                ))}
              </div>
              {nextBand && (
                <p className="mt-3 text-sm text-white/80">
                  {(nextBand.min - average).toFixed(2)} marks below {nextBand.short === 'First' ? 'a First' : nextBand.short === 'Distinction' ? 'a Distinction' : `a ${nextBand.short}`}.
                </p>
              )}
              {borderline && (
                <p className="mt-2 text-xs text-white/70">Many universities treat averages within about 2 marks of a boundary as borderline. Check your regulations.</p>
              )}
            </>
          ) : (
            <p className="text-white/70 text-sm">Enter your module credits and marks to see your result.</p>
          )}

          {result && !result.complete && (
            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="flex items-center gap-2 text-sm font-black mb-1"><Target className="w-4 h-4 text-primary" /> Average needed in your remaining {Math.round(result.remaining)} credits</p>
              <p className="text-xs text-white/60 mb-3">Based on the marks you have entered and the total credits for each year.</p>
              <ul className="space-y-2 text-sm">
                {bands.map((b) => {
                  const x = (b.min - result.A) / result.B;
                  const text = x <= 0 ? 'Reached already' : x > 100 ? 'Not reachable' : `${x.toFixed(1)}%`;
                  return (
                    <li key={b.min} className="flex items-center justify-between gap-3 rounded-lg bg-white/[0.06] px-3 py-2">
                      <span className="font-bold">{b.short} ({b.min}+)</span>
                      <span className={`font-extrabold ${x > 100 ? 'text-white/50' : 'text-primary'}`}>{text}</span>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-3 text-[11px] text-white/50">You still need to pass your remaining modules under your university&apos;s rules.</p>
            </div>
          )}
          {result?.invalid && <p className="mt-4 text-xs font-bold text-red-300">Marks must be between 0 and 100. Rows outside that range are ignored.</p>}
        </div>
      </div>
    </div>
  );
}
