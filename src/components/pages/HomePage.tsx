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
import ResultsStrip from '@/components/results/ResultsStrip';
import CTASection from '@/components/home/CTASection';
import FaqSection from '@/components/FaqSection';
import PaymentSection from '@/components/PaymentSection';
import TeamTeaser from '@/components/team/TeamTeaser';
import ExpertCallSection from '@/components/ExpertCallSection';
import LatestGuides from '@/components/home/LatestGuides';
import { HOME_FAQS } from '@/content/homeFaqs';
import StickyHelpBanner from '@/components/home/StickyHelpBanner';
import { useSupportFormScroll } from '@/hooks/useSupportFormScroll';

export default function HomePage() {
  const [showHelper, setShowHelper] = useState(false);
  useSupportFormScroll();

  useEffect(() => {
    const hash = window.location.hash.split('#').filter(Boolean)[0];
    if (hash && hash !== 'support-form') {
      const timer = setTimeout(() => document.getElementById(hash)?.scrollIntoView({ block: 'start' }), 400);
      return () => clearTimeout(timer);
    }
  }, []);

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
        <TeamTeaser />
        <ExpertCallSection className="bg-white" />
        <HowItWorks />
        <Testimonials />
        <ResultsStrip />
        <LatestGuides />
        <PaymentSection className="bg-white" />
        <FaqSection
          faqs={HOME_FAQS}
          title="Assignment Help FAQs"
          subtitle="Quick answers about prices, deadlines, subjects and how FIZBS works."
          className="bg-soft-rose"
        />
        <CTASection />
      </main>
      <StickyHelpBanner show={showHelper} />
    </>
  );
}
