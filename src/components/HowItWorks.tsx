'use client';

import { ClipboardList, UserCheck, PencilLine, type LucideIcon } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';
import ProcessStep from './how-it-works/ProcessStep';

const steps: { id: string; title: string; desc: string; icon: LucideIcon }[] = [
  {
    id: '01',
    title: 'Share Your Requirements',
    desc: 'Send your brief, word count and deadline through the form or WhatsApp in under a minute.',
    icon: ClipboardList,
  },
  {
    id: '02',
    title: 'Get Your Price',
    desc: 'Receive a clear quote in GBP, with 10% off your first order, and confirm to get started.',
    icon: UserCheck,
  },
  {
    id: '03',
    title: 'Get Expert Help',
    desc: 'A qualified subject expert works on your request and keeps you updated until your deadline.',
    icon: PencilLine,
  },
];

const HowItWorks = () => (
  <section className="py-20 md:py-28 bg-soft-rose">
    <div className="max-w-site mx-auto px-4">
      <SectionHeader
        badge="Simple Process"
        title="How It Works"
        subtitle="Get expert assignment help in three simple steps"
      />

      <div className="relative">
        <div className="hidden lg:block absolute top-[60px] left-[20%] right-[20%] h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent z-0" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 relative z-10">
          {steps.map((step, i) => (
            <ProcessStep key={step.id} {...step} index={i} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorks;
