'use client';

import { useMemo, useRef, useState } from 'react';
import { Plus, Trash2, RotateCcw, Target } from 'lucide-react';
import WhatsAppLink from '@/components/ui/WhatsAppLink';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { buildWhatsAppUrl } from '@/constants/whatsapp';
import { SAUDI_GRADES, classify, type Scale } from '@/content/arGpa';

interface Row { id: number; name: string; hours: string; grade: string }

const inputCls =
  'w-full min-w-0 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-base text-navy outline-none focus:border-primary focus:ring-2 focus:ring-primary/15';

const num = (v: string) => {
  const n = parseFloat(v.replace(',', '.'));
  return Number.isFinite(n) ? n : NaN;
};

const fmt = (n: number) => n.toFixed(2);

export default function ArGpaCalculator() {
  const idRef = useRef(0);
  const nextId = () => ++idRef.current;
  const sample = (): Row[] => [
    { id: nextId(), name: '', hours: '3', grade: 'A' },
    { id: nextId(), name: '', hours: '4', grade: 'B+' },
    { id: nextId(), name: '', hours: '2', grade: 'C' },
    { id: nextId(), name: '', hours: '3', grade: '' },
  ];
  const [scale, setScale] = useState<Scale>(5);
  const [rows, setRows] = useState<Row[]>(sample);
  const [prevGpa, setPrevGpa] = useState('');
  const [prevHours, setPrevHours] = useState('');
  const [target, setTarget] = useState('');

  const update = (id: number, patch: Partial<Row>) => setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  const addRow = () => setRows((rs) => [...rs, { id: nextId(), name: '', hours: '3', grade: '' }]);
  const removeRow = (id: number) => setRows((rs) => (rs.length > 1 ? rs.filter((r) => r.id !== id) : rs));
  const reset = () => {
    setRows([1, 2, 3, 4].map(() => ({ id: nextId(), name: '', hours: '3', grade: '' })));
    setPrevGpa('');
    setPrevHours('');
    setTarget('');
  };

  const result = useMemo(() => {
    let hours = 0;
    let points = 0;
    for (const r of rows) {
      const h = num(r.hours);
      const g = SAUDI_GRADES.find((x) => x.letter === r.grade);
      if (!g || !(h > 0)) continue;
      hours += h;
      points += h * (scale === 5 ? g.p5 : g.p4);
    }
    const term = hours > 0 ? points / hours : NaN;
    const pg = num(prevGpa);
    const ph = num(prevHours);
    const hasPrev = pg >= 0 && pg <= scale && ph > 0;
    const cumulative = hasPrev && hours > 0 ? (pg * ph + points) / (ph + hours) : NaN;
    const t = num(target);
    let needed = NaN;
    if (hasPrev && hours > 0 && t > 0 && t <= scale) needed = (t * (ph + hours) - pg * ph) / hours;
    return { hours, points, term, cumulative, hasPrev, needed, target: t };
  }, [rows, scale, prevGpa, prevHours, target]);

  const minPoint = scale === 5 ? 1 : 0;
  const whatsappUrl = buildWhatsAppUrl(
    `مرحبًا FIZBS! استخدمت حاسبة المعدل في موقعكم${Number.isFinite(result.term) ? ` (معدلي الفصلي ${fmt(result.term)} من ${scale})` : ''} وأحتاج مساعدة في مقرر: `
  );

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-4 sm:p-6 md:p-8 shadow-xl shadow-gray-200/60" dir="rtl" lang="ar">
      {/* Scale */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="text-sm font-black text-navy">نظام المعدل في جامعتك:</span>
        {([5, 4] as Scale[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setScale(s)}
            aria-pressed={scale === s}
            className={`px-5 py-2 rounded-full border-2 text-sm font-black transition-colors ${
              scale === s ? 'bg-primary text-white border-primary' : 'bg-white text-navy border-gray-200 hover:border-primary'
            }`}
          >
            من {s}
          </button>
        ))}
      </div>

      {/* Courses */}
      <p className="text-sm font-black text-navy mb-3">مقررات هذا الفصل</p>
      <div className="space-y-3">
        <div className="hidden sm:grid grid-cols-[1fr_110px_190px_44px] gap-3 text-xs font-bold text-gray-500 px-1">
          <span>اسم المقرر (اختياري)</span>
          <span>الساعات</span>
          <span>التقدير</span>
          <span />
        </div>
        {rows.map((r, i) => (
          <div key={r.id} className="grid grid-cols-[88px_1fr_44px] sm:grid-cols-[1fr_110px_190px_44px] gap-2 sm:gap-3 rounded-2xl sm:rounded-none bg-gray-50 sm:bg-transparent p-3 sm:p-0">
            <input
              className={`${inputCls} col-span-2 sm:col-span-1`}
              placeholder={`المقرر ${i + 1}`}
              value={r.name}
              onChange={(e) => update(r.id, { name: e.target.value })}
              aria-label={`اسم المقرر ${i + 1}`}
            />
            <button
              type="button"
              onClick={() => removeRow(r.id)}
              className="sm:order-last flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50"
              aria-label={`حذف المقرر ${i + 1}`}
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <input
              className={`${inputCls} col-span-1`}
              inputMode="decimal"
              value={r.hours}
              onChange={(e) => update(r.id, { hours: e.target.value })}
              aria-label={`عدد ساعات المقرر ${i + 1}`}
              placeholder="الساعات"
            />
            <select
              className={`${inputCls} col-span-2 sm:col-span-1`}
              value={r.grade}
              onChange={(e) => update(r.id, { grade: e.target.value })}
              aria-label={`تقدير المقرر ${i + 1}`}
            >
              <option value="">اختر التقدير</option>
              {SAUDI_GRADES.map((g) => (
                <option key={g.letter} value={g.letter}>
                  {g.letter} ({g.range}) = {fmt(scale === 5 ? g.p5 : g.p4)}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" onClick={addRow} className="inline-flex items-center gap-2 rounded-xl border-2 border-dashed border-primary/50 px-4 py-2 text-sm font-black text-primary hover:bg-primary/5">
          <Plus className="w-4 h-4" /> إضافة مقرر
        </button>
        <button type="button" onClick={reset} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-bold text-gray-600 hover:border-primary hover:text-primary">
          <RotateCcw className="w-4 h-4" /> مسح الكل
        </button>
      </div>

      {/* Previous record and target */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <label className="block">
          <span className="block text-sm font-black text-navy mb-1.5">معدلك التراكمي السابق (اختياري)</span>
          <input className={inputCls} inputMode="decimal" placeholder={`مثال: ${scale === 5 ? '4.10' : '3.10'}`} value={prevGpa} onChange={(e) => setPrevGpa(e.target.value)} />
        </label>
        <label className="block">
          <span className="block text-sm font-black text-navy mb-1.5">ساعاتك المجتازة سابقًا</span>
          <input className={inputCls} inputMode="decimal" placeholder="مثال: 60" value={prevHours} onChange={(e) => setPrevHours(e.target.value)} />
        </label>
        <label className="block">
          <span className="block text-sm font-black text-navy mb-1.5">المعدل التراكمي الذي تريده (اختياري)</span>
          <input className={inputCls} inputMode="decimal" placeholder={`مثال: ${scale === 5 ? '4.25' : '3.25'}`} value={target} onChange={(e) => setTarget(e.target.value)} />
        </label>
      </div>

      {/* Results */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4" aria-live="polite">
        <div className="rounded-2xl bg-navy p-5 text-white">
          <p className="text-sm font-bold text-white/70">المعدل الفصلي</p>
          <p className="mt-1 text-4xl font-black whitespace-nowrap">
            {Number.isFinite(result.term) ? fmt(result.term) : '-'} <span className="text-lg text-white/60">من {scale}</span>
          </p>
          <p className="mt-2 text-sm text-white/80">
            {Number.isFinite(result.term) ? `التقدير: ${classify(result.term, scale)}` : 'أدخل الساعات والتقدير لمقرر واحد على الأقل'}
            {result.hours > 0 && ` · عدد الساعات: ${result.hours}`}
          </p>
        </div>
        <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-5">
          <p className="text-sm font-bold text-navy/70">المعدل التراكمي الجديد</p>
          <p className="mt-1 text-4xl font-black text-navy whitespace-nowrap">
            {Number.isFinite(result.cumulative) ? fmt(result.cumulative) : '-'} <span className="text-lg text-navy/70">من {scale}</span>
          </p>
          <p className="mt-2 text-sm text-navy/70">
            {Number.isFinite(result.cumulative)
              ? `التقدير العام: ${classify(result.cumulative, scale)}`
              : 'أدخل معدلك التراكمي السابق وساعاتك المجتازة لحسابه'}
          </p>
        </div>
      </div>

      {Number.isFinite(result.needed) && (
        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4 text-navy">
          <Target className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="text-[15px] leading-relaxed">
            {result.needed > scale
              ? `للوصول إلى ${fmt(result.target)} تحتاج إلى معدل فصلي أعلى من ${scale}، وهذا غير ممكن في هذا الفصل وحده. جرّب هدفًا أقرب أو وزّعه على أكثر من فصل.`
              : result.needed <= minPoint
                ? `ستصل إلى ${fmt(result.target)} أو أكثر مهما كانت تقديراتك في مقررات هذا الفصل.`
                : `للوصول إلى معدل تراكمي ${fmt(result.target)} تحتاج إلى معدل فصلي لا يقل عن ${fmt(result.needed)} من ${scale} في ساعات هذا الفصل (عدد الساعات: ${result.hours}).`}
          </p>
        </div>
      )}

      <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl bg-[#FBF6E6] border border-[#E9DCAE] p-4">
        <p className="text-[15px] text-navy leading-relaxed">تريد رفع معدلك؟ يساعدك خبير متخصص في فهم المقرر وتنظيم واجباتك ومراجعة مسوداتك.</p>
        <WhatsAppLink
          href={whatsappUrl}
          aria-label="تحدث مع خبير عبر واتساب"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-black text-navy hover:brightness-105"
        >
          <WhatsAppIcon size={20} className="w-5 h-5" /> تحدث مع خبير عبر واتساب
        </WhatsAppLink>
      </div>
      <p className="mt-3 text-xs text-gray-500">يتم الحساب في متصفحك فقط، ولا نحفظ أي بيانات تدخلها.</p>
    </div>
  );
}
