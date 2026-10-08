'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowDown, BookOpenCheck, ShieldCheck, Globe2, GraduationCap, Award, CheckCircle2 } from 'lucide-react';
import SupportRequestForm from '@/components/SupportRequestForm';
import WhatsAppLink from '@/components/ui/WhatsAppLink';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { WHATSAPP_URL } from '@/constants/whatsapp';
import { SUPPORT_FORM_HASH } from '@/constants/supportNavigation';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=60';
const heroSrcSet = [640, 1024, 1600, 2000].map((w) => `${HERO_IMAGE}&w=${w} ${w}w`).join(', ');

const typingTexts = [
  'Assignment & Essay Guidance',
  'Dissertation & Thesis Support',
  'Research Proposal Help',
  'Proofreading & Referencing',
  'PhD Admission & Scholarship Guidance',
];

const features = [
  'UK Academic Standards',
  'Qualified Subject Experts',
  'Harvard, APA & OSCOLA Referencing',
  '100% Confidential',
  'On-Time Delivery',
  '24/7 WhatsApp Support',
];

const commitments = [
  { icon: Award, value: '10+ Years', label: 'Since 2015' },
  { icon: GraduationCap, value: '10,000+', label: 'Students Supported' },
  { icon: BookOpenCheck, value: '350+', label: 'Research Projects' },
  { icon: Globe2, value: 'UK & Gulf', label: 'Online Worldwide' },
];

export default function HomeHero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % typingTexts.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home-hero" className="relative lg:min-h-[92vh] flex items-center overflow-hidden bg-navy pb-16 lg:pb-0">
      <div className="absolute inset-0 z-0">
        <img
          src={`${HERO_IMAGE}&w=1600`}
          srcSet={heroSrcSet}
          sizes="100vw"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover scale-105"
        />
      </div>

      <div className="absolute inset-0 z-[1] bg-gradient-to-br from-navy/95 via-navy/85 to-navy-light/90" />
      <div className="absolute inset-0 z-[1] opacity-20 bg-[radial-gradient(#C41E3A_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px] z-[1] animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-primary/15 rounded-full blur-[100px] z-[1] animate-float" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-20 md:py-24 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-start lg:items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-3 mb-7"
            >
              <a
                href="#quote"
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary rounded-full text-[11px] font-black text-white uppercase tracking-wider shadow-lg shadow-primary/30 hover:brightness-110 transition-all"
              >
                🎁 First Order? Up To 10% OFF
              </a>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[11px] font-bold border border-white/20 text-white uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                Trusted Since 2015
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold text-white mb-6 tracking-tight leading-[1.08]"
            >
              Assignment &amp; Dissertation Help{' '}
              <span className="gradient-text">UK &amp; Saudi Arabia</span>
            </motion.h1>

            <div className="h-12 sm:h-14 mb-6 flex items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentIndex}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.4 }}
                  className="text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-bold text-white/90 border-l-4 border-primary pl-5"
                >
                  {typingTexts[currentIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-gray-300 text-lg md:text-xl max-w-2xl mb-7 leading-relaxed"
            >
              Expert one-to-one academic guidance from qualified subject specialists for Undergraduate, Master&apos;s, MBA and PhD students. Clear feedback, proper referencing and support you can count on.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-2.5 mb-9 max-w-3xl"
            >
              {features.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/[0.07] border border-white/10 text-white text-[13px] font-semibold"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  {item}
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10"
            >
              <a
                href="#quote"
                className="px-9 py-4 bg-primary text-white font-bold rounded-xl text-lg shadow-xl shadow-primary/40 hover:brightness-110 hover:scale-[1.03] active:scale-[0.97] transition-all text-center"
              >
                Get Instant Price
              </a>
              <WhatsAppLink
                href={WHATSAPP_URL}
                aria-label="Chat with us on WhatsApp"
                className="inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-white text-navy font-bold rounded-xl text-lg shadow-xl hover:scale-[1.03] active:scale-[0.97] transition-all"
              >
                <WhatsAppIcon size={28} className="w-7 h-7" />
                Chat on WhatsApp
              </WhatsAppLink>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-5 max-w-3xl"
            >
              {commitments.map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex flex-col items-start sm:items-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <Icon className="w-5 h-5 text-primary mb-2" />
                  <span className="text-lg md:text-xl font-bold text-white">{value}</span>
                  <span className="text-[10px] text-white/50 uppercase tracking-wider font-semibold mt-0.5">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            id="support-form"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:col-span-5 scroll-mt-[110px] lg:sticky lg:top-[100px]"
          >
            <SupportRequestForm />
          </motion.div>
        </div>
      </div>

      <Link
        href={SUPPORT_FORM_HASH}
        aria-label="Go to support request form"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex lg:hidden flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors"
      >
        <span className="text-[10px] uppercase tracking-widest font-bold">Request Support</span>
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </Link>

      <div className="absolute bottom-0 left-0 right-0 z-10 leading-none">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none">
          <path d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z" fill="#f9fafb" />
        </svg>
      </div>
    </section>
  );
}
