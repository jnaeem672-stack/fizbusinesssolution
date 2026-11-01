'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Quote,
  UserRound,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  ExternalLink,
} from 'lucide-react';
import styles from './CustomerReviews.module.css';
import {
  getPublishableReviews,
  isTranslated,
  reviewText,
  type Review,
  type ReviewLocale,
} from '@/data/reviews';

const COPY = {
  en: {
    badge: 'Customer Feedback',
    title: 'What Our Customers Say',
    subtitle: "Feedback shared by people we've supported.",
    region: 'Customer feedback',
    prev: 'Previous reviews',
    next: 'Next reviews',
    pause: 'Pause automatic scrolling',
    play: 'Resume automatic scrolling',
    translated: 'Translated',
  },
  ar: {
    badge: 'ملاحظات العملاء',
    title: 'آراء عملائنا',
    subtitle: 'ملاحظات شاركها أشخاص قدّمنا لهم الدعم.',
    region: 'آراء العملاء',
    prev: 'المراجعات السابقة',
    next: 'المراجعات التالية',
    pause: 'إيقاف التمرير التلقائي',
    play: 'استئناف التمرير التلقائي',
    translated: 'مترجم',
  },
} as const;

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p.charAt(0).toUpperCase()).join('');
}

const AUTO_INTERVAL_MS = 5000;

export default function CustomerReviews({ locale = 'en' }: { locale?: ReviewLocale } = {}) {
  const rtl = locale === 'ar';
  const t = COPY[locale];
  const reviews = getPublishableReviews(locale);

  const scrollerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [paused, setPaused] = useState(false); // hover / focus
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const count = reviews.length;
  const hasCarousel = count > 1;

  // Respect the user's reduced-motion preference.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Only auto-advance while the section is actually on screen.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const scrollToIndex = useCallback(
    (i: number) => {
      const el = itemRefs.current[i];
      if (!el) return;
      // inline:'start' respects the section's dir; block:'nearest' prevents any
      // vertical page jump when the cards are already visible.
      el.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        inline: 'start',
        block: 'nearest',
      });
    },
    [reducedMotion],
  );

  // Scroll when the active index changes (skip the very first render).
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    scrollToIndex(index);
  }, [index, scrollToIndex]);

  // Auto-advance loop.
  useEffect(() => {
    if (!hasCarousel) return;
    const active = playing && inView && !paused && !reducedMotion;
    if (!active) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, AUTO_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [playing, inView, paused, reducedMotion, hasCarousel, count]);

  // Keep the index in sync after a manual swipe / native scroll.
  const syncRaf = useRef<number | null>(null);
  const handleScroll = useCallback(() => {
    if (syncRaf.current) cancelAnimationFrame(syncRaf.current);
    syncRaf.current = requestAnimationFrame(() => {
      const scroller = scrollerRef.current;
      if (!scroller) return;
      const mid = scroller.getBoundingClientRect().left + scroller.clientWidth / 2;
      let nearest = 0;
      let best = Infinity;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - mid);
        if (d < best) {
          best = d;
          nearest = i;
        }
      });
      setIndex((prev) => (prev === nearest ? prev : nearest));
    });
  }, []);

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + count) % count);
    },
    [count],
  );

  // Pause auto-advance on keyboard focus anywhere inside the carousel.
  const onFocusCapture = useCallback(() => setPaused(true), []);
  const onBlurCapture = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
  }, []);

  if (count === 0) return null;

  const PrevIcon = rtl ? ChevronRight : ChevronLeft;
  const NextIcon = rtl ? ChevronLeft : ChevronRight;
  const autoRunning = playing && !reducedMotion;

  return (
    <section
      aria-labelledby="customer-reviews-heading"
      dir={rtl ? 'rtl' : 'ltr'}
      lang={locale}
      className="py-20 md:py-24 bg-[#FBF8F0]"
    >
      <div className="max-w-site mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-12">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-black mb-4 bg-primary/10 text-[#735600]">
            {t.badge}
          </span>
          <h2
            id="customer-reviews-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-navy"
          >
            {t.title}
          </h2>
          <p className="max-w-2xl mx-auto text-base md:text-lg leading-relaxed text-gray-500">
            {t.subtitle}
          </p>
          <div className="h-1 w-16 rounded-full bg-gradient-to-r from-primary to-[#E0BC4A] mt-6 mx-auto" />
        </div>

        {/* Controls */}
        {hasCarousel && (
          <div className="flex items-center justify-end gap-2 mb-5">
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-pressed={!autoRunning}
              aria-label={autoRunning ? t.pause : t.play}
              className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white border border-gray-200 text-navy shadow-sm hover:border-primary/40 hover:text-primary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
            >
              {autoRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={t.prev}
              className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white border border-gray-200 text-navy shadow-sm hover:border-primary/40 hover:text-primary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
            >
              <PrevIcon className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={t.next}
              className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white border border-gray-200 text-navy shadow-sm hover:border-primary/40 hover:text-primary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
            >
              <NextIcon className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Scrolling row */}
        <div
          ref={scrollerRef}
          className={styles.scroller}
          role="group"
          aria-label={t.region}
          tabIndex={0}
          onScroll={handleScroll}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={onFocusCapture}
          onBlurCapture={onBlurCapture}
        >
          {reviews.map((review, i) => (
            <ReviewCard
              key={review.id}
              review={review}
              locale={locale}
              translatedLabel={t.translated}
              ref={(node) => {
                itemRefs.current[i] = node;
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const ReviewCard = ({
  ref,
  review,
  locale,
  translatedLabel,
}: {
  ref: (node: HTMLElement | null) => void;
  review: Review;
  locale: ReviewLocale;
  translatedLabel: string;
}) => {
  const text = reviewText(review, locale);
  if (!text) return null;
  const translated = isTranslated(review, locale);
  const name = review.displayName[locale];

  return (
    <article
      ref={ref}
      className={`${styles.card} w-[86vw] sm:w-[348px] lg:w-[366px] flex flex-col bg-white rounded-3xl border border-gray-100 shadow-sm p-7 md:p-8`}
    >
      <Quote className="w-8 h-8 text-primary/30 mb-4 shrink-0" aria-hidden="true" />

      <p className="text-gray-700 leading-relaxed text-[15px] mb-6 flex-grow whitespace-pre-line">
        {text}
      </p>

      {translated && (
        <span className="inline-flex items-center self-start gap-1 px-2 py-0.5 mb-4 rounded-full bg-gray-100 text-gray-500 text-[10px] font-semibold uppercase tracking-wide">
          {translatedLabel}
        </span>
      )}

      <div className="mt-auto pt-4 border-t border-gray-100 flex items-center gap-3">
        <span className="flex items-center justify-center w-11 h-11 rounded-full icon-gradient shrink-0 text-sm font-black">
          {review.anonymous ? (
            <UserRound className="w-5 h-5" aria-hidden="true" />
          ) : (
            <span dir="ltr">{initials(name)}</span>
          )}
        </span>
        <div className="min-w-0">
          <p className="text-navy font-bold text-sm truncate" dir="auto">
            {name}
          </p>
          {review.sourceUrl ? (
            <a
              href={review.sourceUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-1 text-[11px] text-gray-500 hover:text-primary transition-colors"
            >
              {review.sourceLabel[locale]}
              <ExternalLink className="w-3 h-3 shrink-0" aria-hidden="true" />
            </a>
          ) : (
            <p className="text-[11px] text-gray-400">{review.sourceLabel[locale]}</p>
          )}
        </div>
      </div>
    </article>
  );
};
