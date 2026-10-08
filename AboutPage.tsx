'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ShieldCheck,
  BookOpenCheck,
  Clock,
  UserRoundCheck,
  BadgePoundSterling,
  GraduationCap,
  type LucideIcon,
} from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import SupportRequestSection from '@/components/home/SupportRequestSection';
import CTASection from '@/components/home/CTASection';
import { useSupportFormScroll } from '@/hooks/useSupportFormScroll';
import { SUPPORT_FORM_HASH } from '@/constants/supportNavigation';

const values: { title: string; icon: LucideIcon; desc: string }[] = [
  { title: 'Qualified Experts', icon: UserRoundCheck, desc: "Master's and PhD-qualified specialists in business, management, finance, health, law, computing and more." },
  { title: 'On-Time Delivery', icon: Clock, desc: 'We plan around your deadline, from 48 hours to several weeks, and keep you updated on WhatsApp.' },
  { title: 'Fair UK Pricing', icon: BadgePoundSterling, desc: 'Transparent prices in GBP from £20 per 1,000 words, with 10% off your first order.' },
  { title: '100% Confidential', icon: ShieldCheck, desc: 'Your name, university and files are kept private and never shared with anyone.' },
];

const approach = [
  {
    title: 'Share Your Requirements',
    desc: 'Send your assignment brief, subject, word count and deadline through our form or WhatsApp.',
    icon: GraduationCap,
  },
  {
    title: 'Get a Clear Price',
    desc: 'We reply with a transparent quote in GBP and match you with a qualified expert in your subject.',
    icon: BadgePoundSterling,
  },
  {
    title: 'Get Expert Help',
    desc: 'Your expert works on your request and keeps you updated until your deadline.',
    icon: BookOpenCheck,
  },
];

export default function AboutPage() {
  useSupportFormScroll();

  return (
    <div className="min-h-screen bg-white">
      <PageHero
        title="About FIZ Business Solutions"
        subtitle="Trusted assignment and dissertation help for students in the UK and Saudi Arabia since 2015. 10,000+ students supported and 350+ research projects completed."
        breadcrumb="About Us"
        badge="Since 2015"
        backgroundImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80"
        highlights={['10+ Years', '10,000+ Students', '350+ Research Projects']}
        ctaLabel="Get a Free Quote"
        ctaHref={SUPPORT_FORM_HASH}
        waveColor="#ffffff"
      />

      <SupportRequestSection />

      <section className="py-20 max-w-site mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-5xl font-black text-navy leading-tight mb-8">
                Assignment &amp; Dissertation Help <span className="text-primary">You Can Trust</span>
              </h2>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80" alt="University students working on assignments together" className="w-full h-[400px] object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-primary/10" />
              </div>
            </motion.div>
          </div>
          <div className="lg:w-1/2">
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>FIZ Business Solutions (FIZBS) has provided assignment help and dissertation help to university students since 2015. Over the last 10 years we have supported more than 10,000 students and completed 350+ research projects.</p>
              <p>Our team of qualified subject experts helps Bachelor&apos;s, Master&apos;s, MBA and PhD students at universities across the UK and Saudi Arabia, with a special focus on business, management, marketing, finance and accounting.</p>
              <p>Whether you need help with an essay, a business report, a case study, a research proposal or a full dissertation, we offer clear pricing, on-time delivery and friendly 24/7 support on WhatsApp.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-site mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl md:text-5xl font-black text-navy mb-5">How We Work</h2>
            <p className="text-gray-600 text-lg leading-relaxed">Getting assignment help from FIZBS is quick and simple.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {approach.map((item, index) => (
              <motion.article key={item.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-navy mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-navy">
        <div className="max-w-site mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-5">Why Students Choose Us</h2>
            <p className="text-white/65 text-lg leading-relaxed">What you can expect every time you work with FIZBS.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((item, index) => (
              <motion.article key={item.title} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl">
                <item.icon className="w-10 h-10 text-primary mb-6" />
                <h3 className="text-white font-bold text-lg mb-4">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-navy mb-5">See Your Price in Seconds</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Use our instant price calculator for assignment and dissertation help, and get 10% off your first order.
          </p>
          <Link href="/#quote" className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:brightness-110 transition-all">
            Get Instant Price
          </Link>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
