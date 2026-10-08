'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, CheckCircle2 } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import WhatsAppLink from '@/components/ui/WhatsAppLink';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { buildWhatsAppUrl } from '@/constants/whatsapp';
import { PAYMENT } from '@/constants/payment';

type Level = 'ug' | 'pg' | 'phd';
type ServiceKey = 'assignment' | 'dissertation' | 'proofreading';
type Deadline = 'standard' | 'priority' | 'urgent';

const LEVELS: { key: Level; label: string }[] = [
  { key: 'ug', label: "Bachelor's" },
  { key: 'pg', label: "Master's / MBA" },
  { key: 'phd', label: 'PhD' },
];

// Price in GBP per 1,000 words
const SERVICES: { key: ServiceKey; label: string; rates: Record<Level, number> }[] = [
  { key: 'assignment', label: 'Assignment / Essay', rates: { ug: 20, pg: 20, phd: 20 } },
  { key: 'dissertation', label: 'Dissertation / Thesis', rates: { ug: 30, pg: 30, phd: 30 } },
  { key: 'proofreading', label: 'Proofreading', rates: { ug: 12, pg: 15, phd: 18 } },
];

const DEADLINES: { key: Deadline; label: string; multiplier: number }[] = [
  { key: 'standard', label: '7+ days', multiplier: 1 },
  { key: 'priority', label: '3–6 days', multiplier: 1.25 },
  { key: 'urgent', label: '48 hours', multiplier: 1.5 },
];

const FIRST_ORDER_DISCOUNT = 0.1;

// Maximum total price (GBP) per type of work
const MAX_PRICE: Partial<Record<ServiceKey, number>> = { dissertation: 350 };

const WORD_OPTIONS = [1000, 2000, 3000, 5000, 8000, 10000, 12000, 15000, 20000];

function discountFor(words: number): number {
  if (words >= 15000) return 0.15;
  if (words >= 8000) return 0.1;
  return 0;
}

const gbp = (value: number) => `£${value.toLocaleString('en-GB', { maximumFractionDigits: 0 })}`;

const AR_LABELS: Record<string, string> = {
  ug: 'بكالوريوس',
  pg: 'ماجستير / MBA',
  phd: 'دكتوراه',
  assignment: 'واجب / مقال',
  dissertation: 'رسالة علمية',
  proofreading: 'تدقيق لغوي',
  standard: '7 أيام أو أكثر',
  priority: '3 إلى 6 أيام',
  urgent: 'خلال 48 ساعة',
};

const UI = {
  en: {
    badge: 'Instant Price',
    title: 'Assignment & Dissertation Help: Instant Price',
    subtitle: 'Select your type of work, level, word count and deadline to see your price in seconds.',
    type: '1. Type of work',
    level: '2. Academic level',
    words: '3. Word count',
    wordsUnit: 'words',
    deadline: '4. Deadline',
    firstOrder: 'This is my first order',
    firstOrderHint: '(get up to 10% off)',
    estimate: 'Your estimate',
    per1000: 'per 1,000 words',
    priority: 'priority',
    capped: (total: string, save: string) => `Best price: maximum ${total} for any dissertation. You save ${save}`,
    discount: (pct: number) => `${pct}% discount applied`,
    firstOrderOffer: ' (first order offer)',
    forWords: (w: string) => ` for ${w}+ words`,
    perks: ['1-to-1 support from a subject expert', 'Clear, actionable feedback', 'Confidential & secure'],
    cta: 'Get Exact Quote on WhatsApp',
    note: 'Estimate only. Your final quote is confirmed after we review your requirements.',
  },
  ar: {
    badge: 'السعر الفوري',
    title: 'احسب سعر الواجب أو الرسالة فورًا',
    subtitle: 'اختر نوع العمل والمرحلة وعدد الكلمات والموعد النهائي لتعرف السعر خلال ثوانٍ.',
    type: '1. نوع العمل',
    level: '2. المرحلة الدراسية',
    words: '3. عدد الكلمات',
    wordsUnit: 'كلمة',
    deadline: '4. الموعد النهائي',
    firstOrder: 'هذا أول طلب لي',
    firstOrderHint: '(خصم حتى 10%)',
    estimate: 'السعر التقديري',
    per1000: 'لكل 1,000 كلمة',
    priority: 'رسوم استعجال',
    capped: (total: string, save: string) => `أفضل سعر: ${total} كحد أقصى لأي رسالة علمية. وفّرت ${save}`,
    discount: (pct: number) => `تم تطبيق خصم ${pct}%`,
    firstOrderOffer: ' (عرض الطلب الأول)',
    forWords: (w: string) => ` لطلبات ${w}+ كلمة`,
    perks: ['دعم فردي من خبير في تخصصك', 'ملاحظات واضحة وعملية', 'سرية وأمان تام'],
    cta: 'احصل على السعر الدقيق عبر واتساب',
    note: 'هذا سعر تقديري. يتم تأكيد السعر النهائي بعد مراجعة متطلباتك.',
  },
} as const;

function OptionGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { key: T; label: string }[];
  value: T;
  onChange: (key: T) => void;
}) {
  return (
    <div>
      <p className="text-xs font-black uppercase tracking-widest text-navy mb-3">{label}</p>
      <div className="grid grid-cols-3 gap-2">
        {options.map((option) => (
          <button
            key={option.key}
            type="button"
            onClick={() => onChange(option.key)}
            aria-pressed={value === option.key}
            className={`px-2 sm:px-4 py-2.5 rounded-xl text-[12px] sm:text-sm leading-tight text-center font-bold border transition-all ${
              value === option.key
                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                : 'bg-white text-navy border-gray-200 hover:border-primary/40'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function QuoteCalculator({ locale = 'en' }: { locale?: 'en' | 'ar' } = {}) {
  const isAr = locale === 'ar';
  const t = UI[locale];
  const lbl = (key: string, en: string) => (isAr ? AR_LABELS[key] ?? en : en);
  const [level, setLevel] = useState<Level>('pg');
  const [service, setService] = useState<ServiceKey>('assignment');
  const [deadline, setDeadline] = useState<Deadline>('standard');
  const [words, setWords] = useState<number>(3000);
  const [firstOrder, setFirstOrder] = useState<boolean>(true);

  const quote = useMemo(() => {
    const serviceInfo = SERVICES.find((s) => s.key === service)!;
    const deadlineInfo = DEADLINES.find((d) => d.key === deadline)!;
    const rate = serviceInfo.rates[level];
    const base = (words / 1000) * rate * deadlineInfo.multiplier;
    const volumeDiscount = discountFor(words);
    const firstOrderApplies = firstOrder && FIRST_ORDER_DISCOUNT > volumeDiscount;
    const discount = Math.max(volumeDiscount, firstOrder ? FIRST_ORDER_DISCOUNT : 0);
    const discounted = base * (1 - discount);
    const cap = MAX_PRICE[service];
    const capped = cap !== undefined && discounted > cap;
    const total = capped ? cap : discounted;
    return { rate, base, discount, total, capped, serviceInfo, deadlineInfo, firstOrderApplies };
  }, [level, service, deadline, words, firstOrder]);

  const levelLabel = LEVELS.find((l) => l.key === level)!.label;

  const whatsappUrl = buildWhatsAppUrl(
    isAr
      ? `مرحبًا FIZBS! أريد عرض سعر.\n` +
          `المرحلة: ${lbl(level, levelLabel)}\n` +
          `نوع العمل: ${lbl(quote.serviceInfo.key, quote.serviceInfo.label)}\n` +
          `عدد الكلمات: ${words.toLocaleString('en-GB')}\n` +
          `الموعد النهائي: ${lbl(quote.deadlineInfo.key, quote.deadlineInfo.label)}\n` +
          `السعر التقديري: ${gbp(quote.total)}` +
          (quote.firstOrderApplies ? `\nعرض الطلب الأول: خصم 10%` : '')
      :
    `Hello! I'd like a quote from FIZBS.\n` +
      `Level: ${levelLabel}\n` +
      `Type of work: ${quote.serviceInfo.label}\n` +
      `Word count: ${words.toLocaleString('en-GB')}\n` +
      `Deadline: ${quote.deadlineInfo.label}\n` +
      `Estimated price: ${gbp(quote.total)}` +
      (quote.firstOrderApplies ? `\nFirst order offer: 10% off` : '')
  );

  return (
    <section id="quote" className="py-12 md:py-24 bg-gray-50 scroll-mt-[110px]" dir={isAr ? 'rtl' : undefined}>
      <div className="max-w-site mx-auto px-4">
        <SectionHeader
          badge={t.badge}
          title={t.title}
          subtitle={t.subtitle}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8"
        >
          <div className="lg:col-span-3 bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/60 p-4 sm:p-6 md:p-10 space-y-6 md:space-y-8">
            <OptionGroup
              label={t.type}
              options={SERVICES.map(({ key, label }) => ({ key, label: lbl(key, label) }))}
              value={service}
              onChange={setService}
            />
            <OptionGroup label={t.level} options={LEVELS.map(({ key, label }) => ({ key, label: lbl(key, label) }))} value={level} onChange={setLevel} />

            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-black uppercase tracking-widest text-navy">{t.words}</p>
                <span className="text-sm font-black text-primary">{words.toLocaleString('en-GB')} {t.wordsUnit}</span>
              </div>
              <input
                type="range"
                min={0}
                max={WORD_OPTIONS.length - 1}
                step={1}
                value={WORD_OPTIONS.indexOf(words)}
                onChange={(event) => setWords(WORD_OPTIONS[Number(event.target.value)])}
                aria-label="Word count"
                className="w-full accent-[#C41E3A] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-bold text-gray-400 mt-1">
                <span>1,000</span>
                <span>20,000</span>
              </div>
            </div>

            <OptionGroup
              label={t.deadline}
              options={DEADLINES.map(({ key, label }) => ({ key, label: lbl(key, label) }))}
              value={deadline}
              onChange={setDeadline}
            />

            <label className="flex items-center gap-3 p-3 sm:p-4 rounded-2xl border-2 border-dashed border-primary/40 bg-primary/5 cursor-pointer">
              <input
                type="checkbox"
                checked={firstOrder}
                onChange={(event) => setFirstOrder(event.target.checked)}
                className="w-5 h-5 accent-[#C41E3A] cursor-pointer"
              />
              <span className="text-[13px] sm:text-sm font-bold text-navy">
                🎁 {t.firstOrder} <span className="text-primary">{t.firstOrderHint}</span>
              </span>
            </label>
          </div>

          <div className="lg:col-span-2 bg-navy rounded-3xl p-5 sm:p-6 md:p-10 text-white flex flex-col shadow-2xl">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="p-2.5 bg-primary/20 rounded-xl">
                <Calculator className="w-6 h-6 text-primary" />
              </div>
              <p className="text-xs font-black uppercase tracking-widest text-white/70">{t.estimate}</p>
            </div>

            {quote.total < quote.base && (
              <p className="text-xl font-bold text-white/40 line-through mb-1">{gbp(quote.base)}</p>
            )}
            <p className="text-5xl md:text-6xl font-black mb-2">{gbp(quote.total)}</p>
            <p className="text-sm text-white/60 mb-5 md:mb-8">
              {gbp(quote.rate)} {t.per1000}
              {quote.deadlineInfo.multiplier > 1 && ` · +${Math.round((quote.deadlineInfo.multiplier - 1) * 100)}% ${t.priority}`}
            </p>

            {quote.capped ? (
              <div className="mb-6 px-4 py-3 rounded-xl bg-primary/15 border border-primary/30 text-sm font-bold">
                🎁 {t.capped(gbp(quote.total), gbp(quote.base - quote.total))}
              </div>
            ) : (
              quote.discount > 0 && (
                <div className="mb-6 px-4 py-3 rounded-xl bg-primary/15 border border-primary/30 text-sm font-bold">
                  🎁 {t.discount(Math.round(quote.discount * 100))}
                  {quote.firstOrderApplies ? t.firstOrderOffer : t.forWords(words.toLocaleString('en-GB'))}
                </div>
              )
            )}

            <ul className="hidden sm:block space-y-3 mb-8 text-sm text-white/80">
              {t.perks.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> {item}
                </li>
              ))}
            </ul>

            <WhatsAppLink
              href={whatsappUrl}
              aria-label={t.cta}
              className="mt-auto w-full py-4 bg-white text-navy font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-3 text-xs shadow-xl hover:brightness-110 transition-all"
            >
              <WhatsAppIcon size={24} className="w-6 h-6" />
              {t.cta}
            </WhatsAppLink>
            <p className="text-xs text-white/80 text-center mt-4 font-bold">
              💳 {PAYMENT[locale].split}
            </p>
            <p className="text-[11px] text-white/40 text-center mt-1.5">
              {t.note}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
