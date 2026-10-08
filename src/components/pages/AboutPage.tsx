'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ShieldCheck,
  BookOpenCheck,
  MessageSquareText,
  UserRoundCheck,
  Scale,
  GraduationCap,
  type LucideIcon,
} from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import SupportRequestSection from '@/components/home/SupportRequestSection';
import CTASection from '@/components/home/CTASection';
import { useSupportFormScroll } from '@/hooks/useSupportFormScroll';
import { SUPPORT_FORM_HASH } from '@/constants/supportNavigation';

const values: { title: string; icon: LucideIcon; desc: string }[] = [
  { title: 'Integrity', icon: ShieldCheck, desc: 'We refuse requests involving ghostwriting, impersonation, fabricated evidence, or dishonest authorship.' },
  { title: 'Learning', icon: BookOpenCheck, desc: 'Support should leave the learner with stronger skills, clearer understanding, and greater independence.' },
  { title: 'Clarity', icon: MessageSquareText, desc: 'We explain the scope and limits of support before work begins and give feedback that can be acted upon.' },
  { title: 'Responsibility', icon: UserRoundCheck, desc: 'Learners remain responsible for their final work and for following the policies of their institution.' },
];

const approach = [
  {
    title: 'Understand the Challenge',
    desc: 'We begin with what the learner has already completed, the feedback received, and the specific skill or concept causing difficulty.',
    icon: GraduationCap,
  },
  {
    title: 'Choose a Permitted Support Method',
    desc: 'The request is reviewed and shaped into academic help, tutoring, developmental feedback, proofreading, or another legitimate service.',
    icon: Scale,
  },
  {
    title: 'Build Independent Capability',
    desc: 'The learner applies the guidance, makes revisions, and remains the author and decision-maker throughout the process.',
    icon: BookOpenCheck,
  },
];

export default function AboutPage() {
  useSupportFormScroll();

  return (
    <div className="min-h-screen bg-white">
      <PageHero
        title="About FIZ Business Solutions"
        subtitle="Expert academic help, research guidance, and professional communication support centred on genuine learning and independent work."
        breadcrumb="About Us"
        badge="Learning & Research Support"
        backgroundImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80"
        highlights={['Student Authorship', 'Clear Boundaries', 'Practical Skills']}
        ctaLabel="Request Learning Support"
        ctaHref={SUPPORT_FORM_HASH}
        waveColor="#ffffff"
      />

      <SupportRequestSection />

      <section className="py-20 max-w-site mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-5xl font-black text-navy leading-tight mb-8">
                Support That Strengthens <span className="text-primary">Your Own Work</span>
              </h2>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80" alt="Learners collaborating in an educational setting" className="w-full h-[400px] object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-primary/10" />
              </div>
            </motion.div>
          </div>
          <div className="lg:w-1/2">
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>FIZ Business Solutions provides learning-focused support for students, researchers, and professionals who need clearer guidance on academic expectations, research methods, writing, analysis, or communication.</p>
              <p>Our role is to explain, question, demonstrate, and provide feedback. The learner remains responsible for the thinking, decisions, research, revisions, and final submission.</p>
              <p>We do not market completed assignments or promise grades. Requests that would involve contract cheating, examination assistance, fabricated data, hidden third-party authorship, or plagiarism concealment are refused.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-site mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl md:text-5xl font-black text-navy mb-5">Our Support Approach</h2>
            <p className="text-gray-600 text-lg leading-relaxed">Each request is shaped around a learning outcome rather than the production of a submission.</p>
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
            <h2 className="text-3xl md:text-5xl font-black text-white mb-5">Our Values</h2>
            <p className="text-white/65 text-lg leading-relaxed">These principles guide what we accept, how we work, and what customers can expect.</p>
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
          <h2 className="text-3xl md:text-4xl font-black text-navy mb-5">Transparent Support Boundaries</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Customers should check their institution&apos;s rules on tutoring, proofreading, artificial intelligence, collaboration, and disclosure of external support. Institutional rules take priority over any request made to us.
          </p>
          <Link href="/academic-integrity" className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:brightness-110 transition-all">
            Read Our Academic Integrity Policy
          </Link>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
