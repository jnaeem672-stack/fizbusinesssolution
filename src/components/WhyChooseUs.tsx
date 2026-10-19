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
    title: 'Planned Around Your Deadline',
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

// Students studying together (cottonbro studio, Pexels License: free for commercial use)
const BG_IMAGE = 'https://images.pexels.com/photos/4778621/pexels-photo-4778621.jpeg?auto=compress&cs=tinysrgb';
const bgSrcSet = [800, 1200, 1600, 2000].map((w) => `${BG_IMAGE}&w=${w} ${w}w`).join(', ');

const WhyChooseUs = () => (
  <div className="bg-navy relative overflow-hidden">
    <StatsBar />

    <section className="py-20 md:py-28 relative z-10 overflow-hidden">
      <img
        src={`${BG_IMAGE}&w=1600`}
        srcSet={bgSrcSet}
        sizes="100vw"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-10 w-full h-full object-cover object-center"
      />
      {/* Dark enough for the cards to stay readable, light enough for the students to show */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-navy/90 via-navy/80 to-navy/95" />
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
