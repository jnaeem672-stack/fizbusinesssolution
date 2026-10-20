'use client';

import { useMemo, useState } from 'react';
import { m as motion } from 'framer-motion';
import { Calculator, CalendarDays, Check, Clock, FileText, Gift, GraduationCap, PenLine, Wrench, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import WhatsAppLink from '@/components/ui/WhatsAppLink';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { buildWhatsAppUrl } from '@/constants/whatsapp';
import { PAYMENT } from '@/constants/payment';
import { BASE_PRICES, formatPrice, inCurrency, type Currency } from '@/constants/pricing';

type Locale = 'en' | 'ar';
type Level = 'ug' | 'pg' | 'phd';
type ServiceKey = 'assignment' | 'dissertation' | 'proofreading';
type Deadline = 'standard' | 'priority' | 'urgent';

const LEVELS: { key: Level; en: string; ar: string }[] = [
  { key: 'ug', en: "Bachelor's", ar: 'بكالوريوس' },
  { key: 'pg', en: "Master's / MBA", ar: 'ماجستير / MBA' },
  { key: 'phd', en: 'PhD', ar: 'دكتوراه' },
];

// Price in GBP per 1,000 words (converted for SAR and AED pages)
const SERVICES: { key: ServiceKey; en: string; ar: string; shortEn: string; shortAr: string; icon: LucideIcon; rates: Record<Level, number> }[] = [
  { key: 'assignment', en: 'Assignment / Essay', ar: 'واجب / مقال', shortEn: 'Assignment', shortAr: 'واجب / مقال', icon: FileText, rates: { ug: BASE_PRICES.assignment, pg: BASE_PRICES.assignment, phd: BASE_PRICES.assignment } },
  { key: 'dissertation', en: 'Dissertation / Thesis', ar: 'رسالة علمية', shortEn: 'Dissertation', shortAr: 'رسالة علمية', icon: GraduationCap, rates: { ug: BASE_PRICES.dissertation, pg: BASE_PRICES.dissertation, phd: BASE_PRICES.dissertation } },
  { key: 'proofreading', en: 'Proofreading', ar: 'تدقيق لغوي', shortEn: 'Proofreading', shortAr: 'تدقيق لغوي', icon: PenLine, rates: { ...BASE_PRICES.proofreading } },
];

const DEADLINES: { key: Deadline; en: string; ar: string; multiplier: number; icon: LucideIcon }[] = [
  { key: 'standard', en: '7+ days', ar: '7 أيام أو أكثر', multiplier: 1, icon: CalendarDays },
  { key: 'priority', en: '3 to 6 days', ar: '3 إلى 6 أيام', multiplier: 1.25, icon: Clock },
  { key: 'urgent', en: '48 hours', ar: 'خلال 48 ساعة', multiplier: 1.5, icon: Zap },
];

const FIRST_ORDER_DISCOUNT = 0.1;

// Maximum total price (GBP) per type of work
const MAX_PRICE: Partial<Record<ServiceKey, number>> = { dissertation: BASE_PRICES.dissertationMax };

const WORD_OPTIONS = [1000, 2000, 3000, 5000, 8000, 10000, 12000, 15000, 20000];
const WORD_SHORT = ['1k', '2k', '3k', '5k', '8k', '10k', '12k', '15k', '20k'];

function discountFor(words: number): number {
  if (words >= 15000) return 0.15;
  if (words >= 8000) return 0.1;
  return 0;
}

const UI = {
  en: {
    badge: 'Instant Price',
    title: 'Assignment & Dissertation Help: Instant Price',
    subtitle: 'Select your type of work, level, word count and deadline to see your price in seconds.',
    type: '1. What do you need help with?',
    level: '2. Academic level',
    words: '3. Word count',
    dragHint: 'Drag the slider to change the length',
    wordsUnit: 'words',
    wordsAria: 'Word count',
    deadline: '4. Deadline',
    standardTag: 'Standard price',
    from: (p: string) => `From ${p} per 1,000 words`,
    dissertationSub: (p: string, max: string) => `${p} per 1,000 words, max ${max}`,
    tickOff: (pct: number) => `${pct}% off`,
    estimate: 'Your estimate',
    youSave: (p: string) => `You save ${p}`,
    wordsLine: (w: string, rate: string) => `${w} words × ${rate} per 1,000`,
    faster: (pct: number) => `Faster deadline (+${pct}%)`,
    firstDisc: (pct: number) => `First order discount (${pct}%)`,
    bigDisc: (pct: number) => `Bigger order discount (${pct}%)`,
    capLine: (max: string) => `Dissertation maximum (${max})`,
    firstOrder: 'This is my first order',
    firstOrderHint: '(10% off)',
    firstOrderAria: 'First order discount',
    cta: 'Get Exact Quote on WhatsApp',
    note: 'Estimate only. Your final quote is confirmed after we review your requirements.',
    techNote: 'Technical and software projects, such as 3ds Max, AutoCAD, SolidWorks, programming or large data analysis, are priced separately after we review your files.',
    techShort: 'Technical and software projects are priced separately.',
    art: 'Illustration of a happy student in a graduation cap',
  },
  ar: {
    badge: 'السعر الفوري',
    title: 'احسب سعر الواجب أو الرسالة فورًا',
    subtitle: 'اختر نوع العمل والمرحلة وعدد الكلمات والموعد النهائي لتعرف السعر خلال ثوانٍ.',
    type: '1. ما الذي تحتاج المساعدة فيه؟',
    level: '2. المرحلة الدراسية',
    words: '3. عدد الكلمات',
    dragHint: 'اسحب الشريط لتغيير عدد الكلمات',
    wordsUnit: 'كلمة',
    wordsAria: 'عدد الكلمات',
    deadline: '4. الموعد النهائي',
    standardTag: 'السعر الأساسي',
    from: (p: string) => `من ${p} لكل 1,000 كلمة`,
    dissertationSub: (p: string, max: string) => `${p} لكل 1,000 كلمة، بحد أقصى ${max}`,
    tickOff: (pct: number) => `خصم ${pct}%`,
    estimate: 'السعر التقديري',
    youSave: (p: string) => `وفّرت ${p}`,
    wordsLine: (w: string, rate: string) => `${w} كلمة × ${rate} لكل 1,000`,
    faster: (pct: number) => `رسوم الاستعجال (+${pct}%)`,
    firstDisc: (pct: number) => `خصم الطلب الأول (${pct}%)`,
    bigDisc: (pct: number) => `خصم الطلبات الكبيرة (${pct}%)`,
    capLine: (max: string) => `الحد الأقصى للرسالة (${max})`,
    firstOrder: 'هذا أول طلب لي',
    firstOrderHint: '(خصم 10%)',
    firstOrderAria: 'خصم الطلب الأول',
    cta: 'احصل على السعر الدقيق عبر واتساب',
    note: 'هذا سعر تقديري. يتم تأكيد السعر النهائي بعد مراجعة متطلباتك.',
    techNote: 'مشاريع البرمجيات والتصميم التقني الكبيرة، مثل 3ds Max وAutoCAD وSolidWorks والبرمجة وتحليل البيانات الكبير، يُتفق على سعرها بشكل منفصل بعد الاطلاع على الملفات.',
    techShort: 'مشاريع البرمجة والتصميم التقني يُتفق على سعرها بشكل منفصل.',
    art: 'رسم لطالب سعيد يرتدي قبعة التخرج',
  },
} as const;

/** Splits a price into a small currency mark and the big number, e.g. £ | 54, AED | 270, 270 | ريال */
function priceParts(value: number, currency: Currency, locale: Locale) {
  const num = value.toLocaleString('en-GB', { maximumFractionDigits: 0 });
  if (currency === 'GBP') return { pre: '£', num, post: '' };
  if (locale === 'ar') return { pre: '', num, post: currency === 'SAR' ? 'ريال' : 'درهم' };
  return { pre: currency, num, post: '' };
}

function StudentArt({ label, className }: { label: string; className?: string }) {
  return (
    <svg viewBox="0 0 120 120" role="img" aria-label={label} className={className}>
      <circle cx="60" cy="60" r="58" fill="#FEF3C7" />
      <circle cx="20" cy="34" r="3" fill="#3B82F6" />
      <rect x="93" y="24" width="6" height="6" rx="1" fill="#F59E0B" transform="rotate(20 96 27)" />
      <circle cx="102" cy="66" r="2.5" fill="#2563EB" />
      <rect x="15" y="70" width="5" height="5" rx="1" fill="#F59E0B" transform="rotate(-15 17 72)" />
      <circle cx="30" cy="20" r="2" fill="#2563EB" />
      <path d="M26 119c2-21 16-33 34-33s32 12 34 33z" fill="#2563EB" />
      <rect x="54" y="70" width="12" height="16" rx="5" fill="#C98E64" />
      <path d="M49 88l11 11 11-11" fill="none" stroke="#FBBF24" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M92 92c6-6 9-14 8-22" fill="none" stroke="#2563EB" strokeWidth="9" strokeLinecap="round" />
      <circle cx="100" cy="66" r="5.5" fill="#D9A07A" />
      <circle cx="60" cy="56" r="20" fill="#D9A07A" />
      <path d="M40 57c-1-13 7-22 20-22s21 9 20 22c-3-5-9-9-20-9s-17 4-20 9z" fill="#2A1A12" />
      <path d="M50.5 57q3.5-4.5 7 0M62.5 57q3.5-4.5 7 0" fill="none" stroke="#2A1A12" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M52 63.5q8 9 16 0z" fill="#FFFFFF" stroke="#2A1A12" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="47.5" cy="63" r="2.6" fill="#E98C7B" opacity="0.55" />
      <circle cx="72.5" cy="63" r="2.6" fill="#E98C7B" opacity="0.55" />
      <path d="M45 40v6c9 5 21 5 30 0v-6z" fill="#0F172A" />
      <path d="M32 36l28-12 28 12-28 12z" fill="#1E293B" />
      <path d="M86 37v13" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
      <circle cx="86" cy="52" r="3" fill="#FBBF24" />
    </svg>
  );
}

const labelCls = 'text-[12px] sm:text-[13px] font-black uppercase tracking-wider text-slate-900';

export default function QuoteCalculator({ locale = 'en', currency }: { locale?: Locale; currency?: Currency } = {}) {
  const isAr = locale === 'ar';
  // Arabic pages show Saudi riyals unless a currency is passed in
  const cur: Currency = currency ?? (isAr ? 'SAR' : 'GBP');
  const fmt = (value: number) => formatPrice(value, cur, locale);
  const fromGbp = (gbp: number) => fmt(inCurrency(gbp, cur));
  const t = UI[locale];
  const name = (item: { en: string; ar: string }) => (isAr ? item.ar : item.en);

  const [level, setLevel] = useState<Level>('pg');
  const [service, setService] = useState<ServiceKey>('assignment');
  const [deadline, setDeadline] = useState<Deadline>('standard');
  const [wordIndex, setWordIndex] = useState<number>(2);
  const [firstOrder, setFirstOrder] = useState<boolean>(true);
  const [drag, setDrag] = useState(false);
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);

  const words = WORD_OPTIONS[wordIndex];

  const quote = useMemo(() => {
    const serviceInfo = SERVICES.find((s) => s.key === service)!;
    const deadlineInfo = DEADLINES.find((d) => d.key === deadline)!;
    const rate = inCurrency(serviceInfo.rates[level], cur);
    const wordsCost = (words / 1000) * rate;
    const base = wordsCost * deadlineInfo.multiplier;
    const volumeDiscount = discountFor(words);
    const firstOrderApplies = firstOrder && FIRST_ORDER_DISCOUNT > volumeDiscount;
    const discount = Math.max(volumeDiscount, firstOrder ? FIRST_ORDER_DISCOUNT : 0);
    const discounted = base * (1 - discount);
    const capGbp = MAX_PRICE[service];
    const cap = capGbp === undefined ? undefined : inCurrency(capGbp, cur);
    const capped = cap !== undefined && discounted > cap;
    const total = capped ? cap : discounted;
    return { rate, wordsCost, base, discount, discounted, total, capped, cap, serviceInfo, deadlineInfo, firstOrderApplies };
  }, [level, service, deadline, words, firstOrder, cur]);

  const wordsLabel = words.toLocaleString('en-GB');
  const levelInfo = LEVELS.find((l) => l.key === level)!;
  const parts = priceParts(quote.total, cur, locale);

  // Arabic rows already say "fee" or "discount", so no +/- signs (they flip in right-to-left text)
  const plus = isAr ? '' : '+';
  const minus = isAr ? '' : '-';
  const lines: { k: string; v: string; good?: boolean }[] = [{ k: t.wordsLine(wordsLabel, fmt(quote.rate)), v: fmt(quote.wordsCost) }];
  if (quote.deadlineInfo.multiplier > 1) {
    lines.push({ k: t.faster(Math.round((quote.deadlineInfo.multiplier - 1) * 100)), v: `${plus}${fmt(quote.base - quote.wordsCost)}` });
  }
  if (quote.discount > 0) {
    const pct = Math.round(quote.discount * 100);
    lines.push({ k: quote.firstOrderApplies ? t.firstDisc(pct) : t.bigDisc(pct), v: `${minus}${fmt(quote.base * quote.discount)}`, good: true });
  }
  if (quote.capped && quote.cap !== undefined) {
    lines.push({ k: t.capLine(fmt(quote.cap)), v: `${minus}${fmt(quote.discounted - quote.cap)}`, good: true });
  }

  const summary = [`${wordsLabel} ${t.wordsUnit}`, name(quote.serviceInfo), name(levelInfo), name(quote.deadlineInfo)];

  const whatsappUrl = buildWhatsAppUrl(
    isAr
      ? `مرحبًا FIZBS! أريد عرض سعر.\n` +
          `المرحلة: ${levelInfo.ar}\n` +
          `نوع العمل: ${quote.serviceInfo.ar}\n` +
          `عدد الكلمات: ${wordsLabel}\n` +
          `الموعد النهائي: ${quote.deadlineInfo.ar}\n` +
          `السعر التقديري: ${fmt(quote.total)}` +
          (quote.firstOrderApplies ? `\nعرض الطلب الأول: خصم 10%` : '')
      : `Hello! I'd like a quote from FIZBS.\n` +
          `Level: ${levelInfo.en}\n` +
          `Type of work: ${quote.serviceInfo.en}\n` +
          `Word count: ${wordsLabel}\n` +
          `Deadline: ${quote.deadlineInfo.en}\n` +
          `Estimated price: ${fmt(quote.total)}` +
          (quote.firstOrderApplies ? `\nFirst order offer: 10% off` : '')
  );

  // Word slider geometry: the native range thumb is 44px wide, so its centre moves from 22px to (width - 22px)
  const frac = wordIndex / (WORD_OPTIONS.length - 1);
  const at = (f: number) => `calc(22px + (100% - 44px) * ${f})`;
  const trackH = drag ? 15 : hover || focus ? 12 : 9;
  const thumb = drag ? 54 : 42;
  const emoji = wordIndex <= 2 ? '📝' : wordIndex <= 5 ? '📚' : '🎓';

  const subFor = (key: ServiceKey) => {
    if (key === 'assignment') return t.from(fromGbp(BASE_PRICES.assignment));
    if (key === 'dissertation') return t.dissertationSub(fromGbp(BASE_PRICES.dissertation), fromGbp(BASE_PRICES.dissertationMax));
    return t.from(fromGbp(BASE_PRICES.proofreading.ug));
  };

  return (
    <section id="quote" className="py-12 md:py-24 bg-gray-50 scroll-mt-[110px]" dir={isAr ? 'rtl' : undefined}>
      <div className="max-w-site mx-auto px-4">
        <SectionHeader badge={t.badge} title={t.title} subtitle={t.subtitle} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-3 sm:gap-5 lg:gap-6 items-stretch text-slate-900"
        >
          {/* Options */}
          <div className="lg:col-span-3 flex flex-col gap-4 sm:gap-5 rounded-[26px] border border-slate-200 bg-white p-4 sm:p-6 shadow-xl shadow-slate-200/60">
            {/* 1. Type of work */}
            <div className="flex flex-col gap-2 sm:gap-2.5">
              <p className={labelCls}>{t.type}</p>
              <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                {SERVICES.map((s) => {
                  const on = service === s.key;
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => setService(s.key)}
                      aria-pressed={on}
                      className={`relative flex flex-col sm:flex-row items-center sm:items-start gap-1.5 sm:gap-3 rounded-2xl border-2 px-1.5 py-2.5 sm:p-3 text-center sm:text-start transition-colors ${
                        on ? 'border-blue-600 bg-blue-50' : 'border-slate-200 bg-white hover:border-blue-300'
                      }`}
                    >
                      <span className={`flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl ${on ? 'bg-blue-600 text-white' : 'bg-slate-100 text-blue-700'}`}>
                        <Icon className="h-[18px] w-[18px] sm:h-5 sm:w-5" aria-hidden="true" />
                      </span>
                      <span className="flex min-w-0 flex-col gap-0.5">
                        <span className="text-[12.5px] sm:text-[14px] font-extrabold leading-tight">
                          <span className="sm:hidden">{isAr ? s.shortAr : s.shortEn}</span>
                          <span className="hidden sm:inline">{name(s)}</span>
                        </span>
                        <span className="hidden sm:block text-[11.5px] font-medium leading-snug text-slate-600">{subFor(s.key)}</span>
                      </span>
                      {on && (
                        <span className="absolute top-1.5 end-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white">
                          <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Level */}
            <div className="flex flex-col gap-2 sm:gap-2.5">
              <p className={labelCls}>{t.level}</p>
              <div className="grid grid-cols-3 gap-1 rounded-full bg-slate-100 p-1">
                {LEVELS.map((l) => {
                  const on = level === l.key;
                  return (
                    <button
                      key={l.key}
                      type="button"
                      onClick={() => setLevel(l.key)}
                      aria-pressed={on}
                      className={`h-10 rounded-full px-1 text-[12.5px] sm:text-sm font-bold leading-tight transition-colors ${
                        on ? 'bg-blue-600 text-white shadow-md shadow-slate-900/15' : 'text-slate-900 hover:bg-white/70'
                      }`}
                    >
                      {name(l)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Word count */}
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                <label htmlFor="quote-words" className={labelCls}>{t.words}</label>
                <span className="text-[11px] sm:text-xs font-bold text-blue-700">{t.dragHint}</span>
              </div>
              <div dir="ltr" className="relative h-[112px] select-none">
                <div
                  className="absolute top-0 flex items-baseline gap-2 whitespace-nowrap rounded-xl bg-blue-950 px-3 py-1.5 text-white shadow-lg shadow-slate-900/20"
                  style={{ left: at(frac), transform: `translateX(-${Math.round(12 + frac * 76)}%)` }}
                  dir={isAr ? 'rtl' : 'ltr'}
                >
                  <span className="text-[13px] font-bold">{wordsLabel} {t.wordsUnit}</span>
                  <span className="text-base font-black text-amber-400">{fmt(quote.total)}</span>
                </div>
                <span
                  className="absolute top-[27px] h-2.5 w-2.5 bg-blue-950"
                  style={{ left: at(frac), transform: 'translateX(-50%) rotate(45deg)' }}
                  aria-hidden="true"
                />
                <div
                  className="absolute left-[22px] right-[22px] top-[60px] overflow-hidden rounded-full bg-slate-200 transition-[height] duration-150"
                  style={{ height: trackH, transform: 'translateY(-50%)' }}
                  aria-hidden="true"
                >
                  <div className="h-full rounded-full bg-blue-500" style={{ width: `${frac * 100}%` }} />
                </div>
                {WORD_OPTIONS.map((w, i) => {
                  const f = i / (WORD_OPTIONS.length - 1);
                  const off = discountFor(w) > discountFor(WORD_OPTIONS[i - 1] ?? 0) ? Math.round(discountFor(w) * 100) : 0;
                  return (
                    <span key={w} aria-hidden="true">
                      <span
                        className={`absolute top-[60px] h-1 w-1 rounded-full ${i <= wordIndex ? 'bg-white' : 'bg-slate-300'}`}
                        style={{ left: at(f), transform: 'translate(-50%, -50%)' }}
                      />
                      <span className="absolute top-[84px] flex flex-col items-center gap-0.5 whitespace-nowrap" style={{ left: at(f), transform: 'translateX(-50%)' }}>
                        <span className={`text-[11px] sm:text-xs ${i === wordIndex ? 'font-extrabold text-slate-900' : 'font-semibold text-slate-500'}`}>{WORD_SHORT[i]}</span>
                        {off > 0 && (
                          <span className="rounded-full border border-blue-200 bg-blue-50 px-1.5 text-[10px] font-extrabold leading-4 text-blue-700" dir={isAr ? 'rtl' : 'ltr'}>
                            {t.tickOff(off)}
                          </span>
                        )}
                      </span>
                    </span>
                  );
                })}
                <span
                  className={`pointer-events-none absolute top-[60px] flex items-center justify-center rounded-full border-[3px] bg-white leading-none shadow-lg shadow-slate-900/20 transition-all duration-150 ${
                    focus || drag ? 'border-blue-700' : 'border-blue-500'
                  }`}
                  style={{ left: at(frac), width: thumb, height: thumb, fontSize: drag ? 26 : 20, transform: 'translate(-50%, -50%)' }}
                  aria-hidden="true"
                >
                  {emoji}
                </span>
                <input
                  id="quote-words"
                  type="range"
                  min={0}
                  max={WORD_OPTIONS.length - 1}
                  step={1}
                  value={wordIndex}
                  onChange={(event) => setWordIndex(Number(event.target.value))}
                  onPointerDown={() => setDrag(true)}
                  onPointerUp={() => setDrag(false)}
                  onPointerCancel={() => setDrag(false)}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => { setHover(false); setDrag(false); }}
                  onFocus={() => setFocus(true)}
                  onBlur={() => { setFocus(false); setDrag(false); }}
                  aria-label={t.wordsAria}
                  aria-valuetext={`${wordsLabel} ${t.wordsUnit}, ${fmt(quote.total)}`}
                  className="fiz-range absolute left-0 top-[38px] h-11 w-full"
                />
              </div>
            </div>

            {/* 4. Deadline */}
            <div className="flex flex-col gap-2 sm:gap-2.5">
              <p className={labelCls}>{t.deadline}</p>
              <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                {DEADLINES.map((d) => {
                  const on = deadline === d.key;
                  const Icon = d.icon;
                  const tag = d.multiplier > 1 ? `+${Math.round((d.multiplier - 1) * 100)}%` : t.standardTag;
                  return (
                    <button
                      key={d.key}
                      type="button"
                      onClick={() => setDeadline(d.key)}
                      aria-pressed={on}
                      className={`flex items-center justify-center sm:justify-start gap-2.5 rounded-2xl border-2 px-1.5 py-2 sm:px-3 sm:py-2.5 text-center sm:text-start transition-colors ${
                        on ? 'border-blue-600 bg-blue-50' : 'border-slate-200 bg-white hover:border-blue-300'
                      }`}
                    >
                      <Icon className={`hidden sm:block h-5 w-5 shrink-0 ${on ? 'text-blue-700' : 'text-slate-500'}`} aria-hidden="true" />
                      <span className="flex flex-col gap-0.5">
                        <span className="text-[12.5px] sm:text-[14px] font-extrabold leading-tight">{name(d)}</span>
                        <span dir={d.multiplier > 1 ? 'ltr' : undefined} className={`text-[11px] sm:text-xs font-bold ${d.multiplier > 1 ? 'text-blue-700' : 'text-slate-600'}`}>{tag}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <p className="hidden sm:flex items-start gap-2 text-[12px] leading-relaxed text-slate-600">
              <Wrench className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-700" aria-hidden="true" />
              <span>{t.techNote}</span>
            </p>
          </div>

          {/* Estimate */}
          <div id="quote-estimate" className="lg:col-span-2 flex flex-col gap-3 sm:gap-4 rounded-[26px] bg-blue-950 p-4 sm:p-6 text-white shadow-2xl shadow-blue-950/20">
            <div className="flex items-center gap-3">
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <span className="flex items-center gap-2 text-[11px] sm:text-xs font-black uppercase tracking-widest text-white/80">
                  <Calculator className="h-4 w-4 text-amber-400" aria-hidden="true" /> {t.estimate}
                </span>
                <div className="flex items-start gap-1 leading-none" aria-live="polite">
                  {parts.pre && <span className="mt-1.5 text-xl sm:text-2xl font-black text-amber-400">{parts.pre}</span>}
                  <span className="text-5xl sm:text-6xl font-black tracking-tight">{parts.num}</span>
                  {parts.post && <span className="mt-2 text-lg sm:text-xl font-black text-amber-400">{parts.post}</span>}
                </div>
                {quote.total < quote.base && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm sm:text-base font-bold text-white/60 line-through">{fmt(quote.base)}</span>
                    <span className="rounded-full bg-green-500/20 px-2.5 py-0.5 text-[12px] sm:text-[13px] font-black text-green-300">{t.youSave(fmt(quote.base - quote.total))}</span>
                  </div>
                )}
              </div>
              <StudentArt label={t.art} className="h-16 w-16 shrink-0 sm:h-24 sm:w-24" />
            </div>

            <p className="hidden sm:block text-[13px] text-white/80">
              {summary.map((part, i) => (
                <span key={part}>
                  {i > 0 && ' · '}
                  <bdi>{part}</bdi>
                </span>
              ))}
            </p>

            <div className="hidden sm:flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.07] p-3.5 text-[12.5px]">
              {lines.map((line) => (
                <div key={line.k} className="flex justify-between gap-3">
                  <span className="text-white/80">{line.k}</span>
                  <span className={`whitespace-nowrap font-extrabold ${line.good ? 'text-green-300' : 'text-white'}`}>{line.v}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 rounded-2xl border-[1.5px] border-dashed border-amber-400 px-3 py-2 sm:py-2.5">
              <Gift className="h-5 w-5 shrink-0 text-amber-400" aria-hidden="true" />
              <span className="flex-1 text-[13px] sm:text-sm font-bold">
                {t.firstOrder} <span className="text-amber-400">{t.firstOrderHint}</span>
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={firstOrder}
                aria-label={t.firstOrderAria}
                onClick={() => setFirstOrder((v) => !v)}
                className={`relative h-[30px] w-[52px] shrink-0 rounded-full transition-colors ${firstOrder ? 'bg-amber-600' : 'bg-white/30'}`}
              >
                <span className="absolute top-[3px] h-6 w-6 rounded-full bg-white shadow transition-all" style={{ left: firstOrder ? 25 : 3 }} />
              </button>
            </div>

            <WhatsAppLink
              href={whatsappUrl}
              aria-label={t.cta}
              className="mt-auto flex h-12 sm:h-14 w-full items-center justify-center gap-2.5 rounded-2xl bg-[#25D366] px-4 text-[14px] sm:text-base font-black text-slate-900 shadow-xl transition-all hover:brightness-105"
            >
              <WhatsAppIcon size={22} className="h-[22px] w-[22px] !text-slate-900" />
              {t.cta}
            </WhatsAppLink>
            <div className="flex flex-col gap-1 text-center">
              <p className="text-[11.5px] sm:text-xs font-bold text-white/90">💳 {PAYMENT[locale].split}</p>
              <p className="text-[10.5px] sm:text-[11px] leading-snug text-white/65">
                {t.note}
                <span className="sm:hidden"> {t.techShort}</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
