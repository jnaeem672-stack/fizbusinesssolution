'use client';

import { ShieldCheck, Ban, UserRoundCheck, DatabaseZap } from 'lucide-react';
import Link from 'next/link';
import SectionHeader from './ui/SectionHeader';

const promises = [
  {
    title: 'No Ghostwriting',
    desc: 'We do not produce assignments, dissertations, or other assessed work for a learner to submit as their own.',
    icon: Ban,
  },
  {
    title: 'No Fabricated Research',
    desc: 'We do not invent participants, interviews, survey results, references, ethical approval, or statistical findings.',
    icon: DatabaseZap,
  },
  {
    title: 'No Impersonation',
    desc: 'We do not access student portals, take tests, attend assessments, or communicate with institutions as the student.',
    icon: UserRoundCheck,
  },
];

const Testimonials = () => (
  <section className="py-20 md:py-28 bg-white">
    <div className="max-w-site mx-auto px-4">
      <SectionHeader
        title="Our Academic Integrity Promise"
        subtitle="Ethical support must preserve genuine learning, transparent authorship, and institutional rules."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {promises.map(({ title, desc, icon: Icon }) => (
          <article key={title} className="p-7 md:p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:border-primary/30 transition-colors h-full">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-navy mb-3">{title}</h3>
            <p className="text-gray-600 leading-relaxed text-sm">{desc}</p>
          </article>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link href="/academic-integrity" className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs hover:underline">
          <ShieldCheck className="w-4 h-4" /> Read the full Academic Integrity Policy
        </Link>
      </div>
    </div>
  </section>
);

export default Testimonials;
