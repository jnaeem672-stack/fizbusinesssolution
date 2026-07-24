'use client';

import { ShieldCheck, MessageSquareText, UserRoundCheck, BookOpenCheck, type LucideIcon } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';
import StatsBar from './why-choose-us/StatsBar';
import FeatureCard from './why-choose-us/FeatureCard';

const features: { title: string; desc: string; icon: LucideIcon }[] = [
  {
    title: 'Student Authorship',
    desc: 'You remain responsible for the ideas, analysis, decisions, and final submission.',
    icon: UserRoundCheck,
  },
  {
    title: 'Clear Ethical Boundaries',
    desc: 'Requests are checked against our Academic Integrity Policy before support is accepted.',
    icon: ShieldCheck,
  },
  {
    title: 'Actionable Feedback',
    desc: 'Comments explain what needs improvement, why it matters, and how you can revise it.',
    icon: MessageSquareText,
  },
  {
    title: 'Lasting Skills',
    desc: 'Support focuses on transferable research, writing, analysis, and study skills.',
    icon: BookOpenCheck,
  },
];

const WhyChooseUs = () => (
  <div className="bg-navy relative overflow-hidden">
    <StatsBar />

    <section className="py-20 md:py-28 relative z-10">
      <div className="max-w-site mx-auto px-4">
        <SectionHeader
          title="Support Built Around Learning"
          subtitle="The goal is not to replace your work. It is to help you understand the task and improve your own response."
          light
          className="mb-12 md:mb-16"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} {...feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default WhyChooseUs;
