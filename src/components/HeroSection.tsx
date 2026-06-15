'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import WhatsAppLink from '@/components/ui/WhatsAppLink';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { WHATSAPP_URL } from '@/constants/whatsapp';
import { scrollToOrderForm } from '@/constants/orderNavigation';

import 'swiper/css';
import 'swiper/css/effect-fade';

const DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1400&q=80',
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1400&q=80',
  'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?w=1400&q=80',
  'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1400&q=80',
];

const DEFAULT_TYPING = [
  'Expert Assignment Help',
  'AI-Free Guaranteed Work',
  'On-Time Every Time',
  'Trusted by 10,000+ Students',
];

interface HeroSectionProps {
  breadcrumb?: string;
  badge?: string;
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  typingTexts?: string[];
  images?: string[];
}

const HeroSection = ({
  breadcrumb,
  badge = '⭐ 4.8/5 — Rated #1 Assignment Help Service',
  title = 'Get Professional',
  titleHighlight = 'Academic Help',
  subtitle = '100% original, AI-free academic writing by subject matter experts. Delivered on time, every time.',
  typingTexts = DEFAULT_TYPING,
  images = DEFAULT_IMAGES,
}: HeroSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % typingTexts.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [typingTexts.length]);

  return (
    <div className="relative flex-1 w-full h-full bg-navy flex items-center p-8 md:p-12 lg:px-16 lg:py-12 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-35">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          className="h-full w-full"
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <div
                className="w-full h-full bg-cover bg-center scale-105"
                style={{ backgroundImage: `url(${img})` }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="absolute inset-0 z-[1] bg-gradient-to-br from-navy/90 via-navy/80 to-navy-light/85" />
      <div className="absolute inset-0 z-[1] opacity-15 bg-[radial-gradient(#C41E3A_1px,transparent_1px)] [background-size:20px_20px]" />
      <div className="absolute top-1/4 -left-24 w-72 h-72 bg-primary/20 rounded-full blur-[100px] z-[1]" />

      <div className="relative z-10 w-full text-left max-w-2xl mx-auto lg:mx-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {breadcrumb && (
            <nav className="flex items-center gap-2 text-primary font-bold text-[10px] mb-5 uppercase tracking-widest">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white/60">{breadcrumb}</span>
            </nav>
          )}

          <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[11px] font-bold mb-6 border border-white/20 text-white uppercase tracking-wider">
            {badge}
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight leading-tight">
            {title} <br />
            <span className="gradient-text">{titleHighlight}</span>
          </h1>

          <div className="h-10 sm:h-12 mb-6 sm:mb-8 flex items-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentIndex}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.4 }}
                className="text-lg sm:text-xl md:text-2xl font-bold text-white/90 border-l-4 border-primary pl-4"
              >
                {typingTexts[currentIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          <p className="text-gray-300 text-base sm:text-lg max-w-md mb-8 sm:mb-10 leading-relaxed">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToOrderForm()}
              className="px-8 py-4 bg-primary text-white font-bold rounded-xl text-lg shadow-xl shadow-primary/30 w-full sm:w-auto"
            >
              Order My Essay
            </motion.button>
            <WhatsAppLink
              href={WHATSAPP_URL}
              aria-label="Chat on WhatsApp"
              className="inline-flex hover:scale-105 active:scale-95 transition-transform"
            >
              <WhatsAppIcon size={40} className="w-10 h-10" />
            </WhatsAppLink>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-white/60">
            <span className="text-xs">✓ AI-Free Content</span>
            <span className="text-xs">✓ Money-Back Guarantee</span>
            <span className="text-xs">✓ 24/7 Support</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
