'use client';

import { useEffect, useState } from 'react';
import HomeHero from '@/components/home/HomeHero';
import ServicesGrid from '@/components/ServicesGrid';
import QuoteCalculator from '@/QuoteCalculator';
import UniversityStrip from '@/components/UniversityStrip';
import SubjectsSection from '@/components/SubjectsSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import CTASection from '@/components/home/CTASection';
import StickyHelpBanner from '@/components/home/StickyHelpBanner';
import { useSupportFormScroll } from '@/hooks/useSupportFormScroll';

export default function HomePage() {
  const [showHelper, setShowHelper] = useState(false);
  useSupportFormScroll();

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('home-hero');
      if (hero) {
        setShowHelper(hero.getBoundingClientRect().bottom < 0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <main className="bg-gray-50 overflow-x-hidden">
        <HomeHero />
        <UniversityStrip />
        <QuoteCalculator />
        <SubjectsSection />
        <ServicesGrid />
        <WhyChooseUs />
        <HowItWorks />
        <Testimonials />
        <CTASection />
      </main>
      <StickyHelpBanner show={showHelper} />
    </>
  );
}
