'use client';

import { ShieldCheck, Clock, UserRoundCheck, BadgePoundSterling, type LucideIcon } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';
import StatsBar from './why-choose-us/StatsBar';
import FeatureCard from './why-choose-us/FeatureCard';

const features: { title: string; desc: string; icon: LucideIcon }[] = [
  {
    title: 'Qualified Subject Experts',
    desc: "Master's and PhD-qualified specialists who know UK and Saudi university marking criteria.",
    icon: UserRoundCheck,
  },
  {
    title: 'On-Time, Every Time',
    desc: 'Deadlines from 48 hours to several weeks, with regular progress updates on WhatsApp.',
    icon: Clock,
  },
  {
    title: 'Affordable UK Pricing',
    desc: 'Transparent prices in GBP from £20 per 1,000 words, plus 10% off your first order.',
    icon: BadgePoundSterling,
  },
  {
    title: '100% Confidential',
    desc: 'Your details and files stay private and are never shared with anyone.',
    icon: ShieldCheck,
  },
];

const WhyChooseUs = () => (
  <div className="bg-navy relative overflow-hidden">
    <StatsBar />

    <section className="py-20 md:py-28 relative z-10">
      <div className="max-w-site mx-auto px-4">
        <SectionHeader
          badge="Why FIZBS"
          title="Why Students Choose FIZBS"
          subtitle="10+ years of trusted assignment and dissertation help for students in the UK and Saudi Arabia."
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
