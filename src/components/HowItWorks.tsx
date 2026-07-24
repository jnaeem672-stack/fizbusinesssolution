'use client';

import { ClipboardList, UserCheck, PencilLine, type LucideIcon } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';
import ProcessStep from './how-it-works/ProcessStep';

const steps: { id: string; title: string; desc: string; icon: LucideIcon }[] = [
  {
    id: '01',
    title: 'Explain Your Learning Need',
    desc: 'Tell us what you have completed so far and which concept, skill, or difficulty you want help with.',
    icon: ClipboardList,
  },
  {
    id: '02',
    title: 'Receive the Right Support',
    desc: 'We review the request for academic integrity and recommend coaching, tutoring, feedback, or proofreading.',
    icon: UserCheck,
  },
  {
    id: '03',
    title: 'Apply the Guidance',
    desc: 'You revise, practise, and complete the work yourself using the explanations and feedback provided.',
    icon: PencilLine,
  },
];

const HowItWorks = () => (
  <section className="py-20 md:py-28 bg-gray-50">
    <div className="max-w-site mx-auto px-4">
      <SectionHeader
        title="How Ethical Support Works"
        subtitle="A clear process that protects your authorship and builds independent skills"
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
