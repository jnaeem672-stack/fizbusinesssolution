'use client';

import Link from 'next/link';
import { ChevronRight, ArrowRight } from 'lucide-react';
import type { PageHeroProps } from '@/types';
import { SUPPORT_FORM_HASH } from '@/constants/supportNavigation';

const PageHero = ({
  title,
  subtitle,
  breadcrumb,
  badge,
  backgroundImage = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1600&q=80',
  highlights = [],
  ctaLabel = 'Request Support',
  ctaHref = SUPPORT_FORM_HASH,
  waveColor = '#f9fafb',
}: PageHeroProps) => (
  <section className="relative min-h-[420px] md:min-h-[480px] flex items-center overflow-hidden bg-navy">
    <div
      className="absolute inset-0 z-0 bg-cover bg-center scale-105"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    />
    <div className="absolute inset-0 z-[1] bg-gradient-to-br from-navy/95 via-navy/88 to-navy-light/92" />
    <div className="absolute inset-0 z-[1] opacity-20 bg-[radial-gradient(#C9A227_1px,transparent_1px)] [background-size:24px_24px]" />
    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/15 rounded-full blur-[120px] z-[1]" />
    <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px] z-[1]" />

    <div className="relative z-10 w-full max-w-site mx-auto px-4 py-16 md:py-24 text-center">
      {breadcrumb && (
        <nav
          className="flex items-center justify-center gap-2 text-primary font-bold text-xs md:text-sm mb-6 uppercase tracking-widest"
        >
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white/70">{breadcrumb}</span>
        </nav>
      )}

      {badge && (
        <span
          className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[11px] font-bold mb-6 border border-white/20 text-white uppercase tracking-wider"
        >
          {badge}
        </span>
      )}

      <h1
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 tracking-tight leading-tight max-w-4xl mx-auto"
      >
        {title}
      </h1>

      {subtitle && (
        <p
          className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed mb-8"
        >
          {subtitle}
        </p>
      )}

      {highlights.length > 0 && (
        <div
          className="flex flex-wrap items-center justify-center gap-3 mb-8"
        >
          {highlights.map((item) => (
            <span
              key={item}
              className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white/80 text-xs font-bold uppercase tracking-wider"
            >
              {item}
            </span>
          ))}
        </div>
      )}

      {ctaHref && (
        <div
        >
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl text-base shadow-xl shadow-primary/40 hover:brightness-110 hover:scale-[1.03] active:scale-[0.97] transition-all"
          >
            {ctaLabel} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      )}
    </div>

    <div className="absolute bottom-0 left-0 right-0 z-10 leading-none">
      <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none">
        <path d="M0 30C360 60 720 0 1080 30C1260 45 1380 40 1440 35V60H0V30Z" fill={waveColor} />
      </svg>
    </div>
  </section>
);

export default PageHero;
