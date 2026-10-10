'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Layers } from 'lucide-react';
import WhatsAppLink from '@/components/ui/WhatsAppLink';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { buildWhatsAppUrl } from '@/constants/whatsapp';
import type { SampleCategoryId } from '@/content/samples';
import { CATEGORY_ICONS } from './categoryIcons';

export interface SampleCard {
  slug: string;
  title: string;
  excerpt: string;
  category: SampleCategoryId;
  categoryLabel: string;
  subject: string;
  scope: string;
}

export interface CategoryChip {
  id: SampleCategoryId;
  label: string;
  description: string;
  count: number;
}

export default function SamplesBrowser({ samples, categories }: { samples: SampleCard[]; categories: CategoryChip[] }) {
  const [active, setActive] = useState<SampleCategoryId | 'all'>('all');
  const shown = active === 'all' ? samples : samples.filter((s) => s.category === active);
  const activeCategory = categories.find((c) => c.id === active);

  const chip = (id: SampleCategoryId | 'all', label: string, count: number) => {
    const on = active === id;
    return (
      <button
        key={id}
        type="button"
        aria-pressed={on}
        onClick={() => setActive(id)}
        className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-bold transition-all ${
          on ? 'border-navy bg-navy text-white shadow-md' : 'border-gray-200 bg-white text-navy hover:border-[#C9A227]'
        }`}
      >
        {label}
        <span className={`rounded-full px-2 py-0.5 text-[11px] font-black ${on ? 'bg-[#C9A227] text-navy' : 'bg-gray-100 text-gray-600'}`}>{count}</span>
      </button>
    );
  };

  return (
    <div>
      <div className="-mx-4 px-4 mb-8 flex gap-2.5 overflow-x-auto pb-2 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible sm:pb-0 [scrollbar-width:thin]" role="group" aria-label="Filter samples by category">
        {chip('all', 'All samples', samples.length)}
        {categories.map((c) => chip(c.id, c.label, c.count))}
      </div>

      {shown.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shown.map((s) => {
            const Icon = CATEGORY_ICONS[s.category] ?? Layers;
            return (
              <Link
                key={s.slug}
                href={`/samples/${s.slug}`}
                className="group flex flex-col rounded-3xl bg-white border border-gray-100 p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-primary">
                  <Icon className="w-4 h-4" /> {s.categoryLabel}
                </span>
                <h3 className="mt-3 text-xl font-extrabold text-navy leading-snug group-hover:text-primary transition-colors">{s.title}</h3>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed flex-1">{s.excerpt}</p>
                <div className="mt-5 flex flex-wrap gap-2 text-[12px] font-bold text-gray-600">
                  <span className="rounded-lg bg-gray-50 px-2.5 py-1">{s.subject}</span>
                  <span className="rounded-lg bg-gray-50 px-2.5 py-1">{s.scope}</span>
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-black text-navy group-hover:text-primary">
                  View sample <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-[#E9DCAE] bg-[#FBF6E6] p-8 md:p-10 text-center">
          <p className="text-xl font-extrabold text-navy mb-2">New {activeCategory?.label} samples are on the way</p>
          <p className="text-gray-600 max-w-xl mx-auto mb-6">
            {activeCategory?.description} Tell us your subject and task on WhatsApp, and an expert will explain how we can help.
          </p>
          <WhatsAppLink
            href={buildWhatsAppUrl(`Hello FIZBS! I am looking at your ${activeCategory?.label ?? ''} samples and I need help.\nSubject: \nDeadline: `)}
            aria-label={`Ask about ${activeCategory?.label} on WhatsApp`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0F7A3D] text-white font-bold rounded-xl hover:brightness-105 transition-all"
          >
            <WhatsAppIcon size={22} className="w-5 h-5 !text-white" /> Ask on WhatsApp
          </WhatsAppLink>
        </div>
      )}
    </div>
  );
}
