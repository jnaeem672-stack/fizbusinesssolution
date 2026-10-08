'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, CheckCircle2 } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import WhatsAppLink from '@/components/ui/WhatsAppLink';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { buildWhatsAppUrl } from '@/constants/whatsapp';

type Level = 'ug' | 'pg' | 'phd';
type ServiceKey = 'assignment' | 'dissertation' | 'proofreading';
type Deadline = 'standard' | 'priority' | 'urgent';

const LEVELS: { key: Level; label: string }[] = [
  { key: 'ug', label: 'Undergraduate' },
  { key: 'pg', label: "Master's / MBA" },
  { key: 'phd', label: 'PhD' },
];

// Price in GBP per 1,000 words
const SERVICES: { key: ServiceKey; label: string; rates: Record<Level, number> }[] = [
  { key: 'assignment', label: 'Assignment / Essay / Report', rates: { ug: 20, pg: 20, phd: 20 } },
  { key: 'dissertation', label: 'Dissertation / Thesis / Proposal', rates: { ug: 30, pg: 30, phd: 30 } },
  { key: 'proofreading', label: 'Proofreading & Referencing', rates: { ug: 12, pg: 15, phd: 18 } },
];

const DEADLINES: { key: Deadline; label: string; multiplier: number }[] = [
  { key: 'standard', label: '7+ days', multiplier: 1 },
  { key: 'priority', label: '3–6 days', multiplier: 1.25 },
  { key: 'urgent', label: 'Within 48 hours', multiplier: 1.5 },
];

const FIRST_ORDER_DISCOUNT = 0.1;

const WORD_OPTIONS = [1000, 2000, 3000, 5000, 8000, 10000, 12000, 15000, 20000];

function discountFor(words: number): number {
  if (words >= 15000) return 0.15;
  if (words >= 8000) return 0.1;
  return 0;
}

const gbp = (value: number) => `£${value.toLocaleString('en-GB', { maximumFractionDigits: 0 })}`;

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
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.key}
            type="button"
            onClick={() => onChange(option.key)}
            aria-pressed={value === option.key}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${
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

export default function QuoteCalculator() {
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
    const total = base * (1 - discount);
    return { rate, base, discount, total, serviceInfo, deadlineInfo, firstOrderApplies };
  }, [level, service, deadline, words, firstOrder]);

  const levelLabel = LEVELS.find((l) => l.key === level)!.label;

  const whatsappUrl = buildWhatsAppUrl(
    `Hello! I'd like a quote from FIZBS.\n` +
      `Level: ${levelLabel}\n` +
      `Type of work: ${quote.serviceInfo.label}\n` +
      `Word count: ${words.toLocaleString('en-GB')}\n` +
      `Deadline: ${quote.deadlineInfo.label}\n` +
      `Estimated price: ${gbp(quote.total)}` +
      (quote.firstOrderApplies ? `\nFirst order offer: 10% off` : '')
  );

  return (
    <section id="quote" className="py-16 md:py-24 bg-gray-50 scroll-mt-[110px]">
      <div className="max-w-site mx-auto px-4">
        <SectionHeader
          title="Assignment & Dissertation Help: Instant Price"
          subtitle="Select your type of work, level, word count and deadline to see your price in seconds."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8"
        >
          <div className="lg:col-span-3 bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/60 p-6 md:p-10 space-y-8">
            <OptionGroup
              label="1. Type of work"
              options={SERVICES.map(({ key, label }) => ({ key, label }))}
              value={service}
              onChange={setService}
            />
            <OptionGroup label="2. Academic level" options={LEVELS} value={level} onChange={setLevel} />

            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-black uppercase tracking-widest text-navy">3. Word count</p>
                <span className="text-sm font-black text-primary">{words.toLocaleString('en-GB')} words</span>
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
              label="4. Deadline"
              options={DEADLINES.map(({ key, label }) => ({ key, label }))}
              value={deadline}
              onChange={setDeadline}
            />

            <label className="flex items-center gap-3 p-4 rounded-2xl border-2 border-dashed border-primary/40 bg-primary/5 cursor-pointer">
              <input
                type="checkbox"
                checked={firstOrder}
                onChange={(event) => setFirstOrder(event.target.checked)}
                className="w-5 h-5 accent-[#C41E3A] cursor-pointer"
              />
              <span className="text-sm font-bold text-navy">
                🎁 This is my first order <span className="text-primary">(get up to 10% off)</span>
              </span>
            </label>
          </div>

          <div className="lg:col-span-2 bg-navy rounded-3xl p-6 md:p-10 text-white flex flex-col shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-primary/20 rounded-xl">
                <Calculator className="w-6 h-6 text-primary" />
              </div>
              <p className="text-xs font-black uppercase tracking-widest text-white/70">Your estimate</p>
            </div>

            {quote.discount > 0 && (
              <p className="text-xl font-bold text-white/40 line-through mb-1">{gbp(quote.base)}</p>
            )}
            <p className="text-5xl md:text-6xl font-black mb-2">{gbp(quote.total)}</p>
            <p className="text-sm text-white/60 mb-8">
              {gbp(quote.rate)} per 1,000 words
              {quote.deadlineInfo.multiplier > 1 && ` · +${Math.round((quote.deadlineInfo.multiplier - 1) * 100)}% priority`}
            </p>

            {quote.discount > 0 && (
              <div className="mb-6 px-4 py-3 rounded-xl bg-primary/15 border border-primary/30 text-sm font-bold">
                🎁 {Math.round(quote.discount * 100)}% discount applied
                {quote.firstOrderApplies ? ' (first order offer)' : ` for ${words.toLocaleString('en-GB')}+ words`}
              </div>
            )}

            <ul className="space-y-3 mb-8 text-sm text-white/80">
              {['1-to-1 support from a subject expert', 'Clear, actionable feedback', 'Confidential & secure'].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> {item}
                </li>
              ))}
            </ul>

            <WhatsAppLink
              href={whatsappUrl}
              aria-label="Get your exact quote on WhatsApp"
              className="mt-auto w-full py-4 bg-white text-navy font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-3 text-xs shadow-xl hover:brightness-110 transition-all"
            >
              <WhatsAppIcon size={24} className="w-6 h-6" />
              Get Exact Quote on WhatsApp
            </WhatsAppLink>
            <p className="text-[11px] text-white/40 text-center mt-3">
              Estimate only. Your final quote is confirmed after we review your requirements.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
