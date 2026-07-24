'use client';

import PageHero from '@/components/ui/PageHero';
import ContactFormLayout from '@/components/contact/ContactFormLayout';
import ContactForm from '@/components/contact/ContactForm';
import AnimateIn from '@/components/ui/AnimateIn';
import SectionHeader from '@/components/ui/SectionHeader';
import { SUPPORT_FORM_HASH } from '@/constants/supportNavigation';
import { useSupportFormScroll } from '@/hooks/useSupportFormScroll';

export default function ContactPage() {
  useSupportFormScroll();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col overflow-x-hidden">
      <PageHero
        title="Contact FIZ Business Solutions"
        subtitle="Discuss academic coaching, research guidance, draft feedback, proofreading, or professional communication support."
        breadcrumb="Contact"
        badge="Ethical Learning Support"
        backgroundImage="https://images.unsplash.com/photo-1423666639043-f560172c73c7?w=1600&q=80"
        highlights={['WhatsApp', 'Email', 'Support Request Form']}
        ctaLabel="Request Learning Support"
        ctaHref={SUPPORT_FORM_HASH}
        waveColor="#f9fafb"
      />

      <ContactFormLayout />

      <section className="py-12 md:py-16 max-w-site mx-auto px-4 w-full">
        <SectionHeader
          title="General Questions"
          subtitle="Use this form for policies, billing, privacy, website questions, or other non-service inquiries."
          className="mb-10 md:mb-12"
        />
        <AnimateIn>
          <div className="max-w-3xl mx-auto">
            <ContactForm />
          </div>
        </AnimateIn>
      </section>
    </div>
  );
}
