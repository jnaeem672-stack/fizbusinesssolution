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

// Card surface styling — kept in one place so the look can be retuned easily.
const CARD_SURFACE =
  'bg-gradient-to-br from-navy to-navy-light border border-white/10 shadow-lg shadow-navy/20';

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p.charAt(0).toUpperCase()).join('');
}

const AUTO_SPEED_PX_PER_SEC = 42; // slow, smooth marquee

export default function CustomerReviews({ locale = 'en' }: { locale?: ReviewLocale } = {}) {
  const rtl = locale === 'ar';
  const t = COPY[locale];
  const reviews = getPublishableReviews(locale);

  const scrollerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(true);
  const [paused, setPaused] = useState(false); // hover / focus
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const count = reviews.length;
  const hasCarousel = count > 1;
  // Seamless loop needs a duplicate set; skip duplicates under reduced motion.
  const looping = hasCarousel && !reducedMotion;
  const displayReviews = looping ? [...reviews, ...reviews] : reviews;

  // Respect the user's reduced-motion preference.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Only auto-scroll while the section is actually on screen.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // One card + gap, for manual step distance.
  const cardStep = useCallback(() => {
    const s = scrollerRef.current;
    const first = s?.firstElementChild as HTMLElement | null;
    if (!s || !first) return 360;
    const cs = getComputedStyle(s);
    const gap = parseFloat(cs.columnGap || cs.gap || '24') || 24;
    return first.offsetWidth + gap;
  }, []);

  // Continuous, seamless auto-scroll. When the viewport passes the first set,
  // jump back by exactly one set — invisible because the two sets are identical.
  useEffect(() => {
    const s = scrollerRef.current;
    if (!s) return;
    const active = playing && inView && !paused && looping;
    if (!active) return;
    let last = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      const d = (AUTO_SPEED_PX_PER_SEC * dt) / 1000;
      const half = s.scrollWidth / 2;
      if (half > 0) {
        if (rtl) {
          s.scrollLeft -= d;
          if (s.scrollLeft <= -half) s.scrollLeft += half;
        } else {
          s.scrollLeft += d;
          if (s.scrollLeft >= half) s.scrollLeft -= half;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, inView, paused, looping, rtl]);

  // Keep the scroll position inside the first set after manual scrolling, so the
  // loop never runs out of buffer. Fires once the scroll settles (invisible wrap).
  const idleTimer = useRef<number | null>(null);
  const handleScroll = useCallback(() => {
    if (!looping) return;
    if (idleTimer.current) window.clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(() => {
      const s = scrollerRef.current;
      if (!s) return;
      const half = s.scrollWidth / 2;
      if (half <= 0) return;
      let x = s.scrollLeft;
      if (rtl) {
        while (x <= -half) x += half;
        while (x > 0) x -= half;
      } else {
        while (x >= half) x -= half;
        while (x < 0) x += half;
      }
      if (x !== s.scrollLeft) s.scrollLeft = x;
    }, 160);
  }, [looping, rtl]);

  const manualScroll = useCallback(
    (dir: 1 | -1) => {
      const s = scrollerRef.current;
      if (!s) return;
      const step = cardStep();
      const behavior: ScrollBehavior = reducedMotion ? 'auto' : 'smooth';
      if (looping) {
        const half = s.scrollWidth / 2;
        if (rtl) {
          if (dir < 0 && s.scrollLeft > -step) s.scrollLeft -= half; // pre-wrap for prev
          s.scrollBy({ left: dir > 0 ? -step : step, behavior });
        } else {
          if (dir < 0 && s.scrollLeft < step) s.scrollLeft += half; // pre-wrap for prev
          s.scrollBy({ left: dir * step, behavior });
        }
      } else {
        s.scrollBy({ left: rtl ? -dir * step : dir * step, behavior });
      }
    },
    [cardStep, looping, reducedMotion, rtl],
  );

  // Pause auto-scroll on keyboard focus anywhere inside the carousel.
  const onFocusCapture = useCallback(() => setPaused(true), []);
  const onBlurCapture = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
  }, []);

  if (count === 0) return null;

  const PrevIcon = rtl ? ChevronRight : ChevronLeft;
  const NextIcon = rtl ? ChevronLeft : ChevronRight;
  const autoActive = playing && looping;

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
              aria-pressed={!autoActive}
              aria-label={autoActive ? t.pause : t.play}
              className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white border border-gray-200 text-navy shadow-sm hover:border-primary/40 hover:text-primary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
            >
              {autoActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <button
              type="button"
              onClick={() => manualScroll(-1)}
              aria-label={t.prev}
              className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white border border-gray-200 text-navy shadow-sm hover:border-primary/40 hover:text-primary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
            >
              <PrevIcon className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => manualScroll(1)}
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
          {displayReviews.map((review, i) => (
            <ReviewCard
              key={`${review.id}-${i < count ? '0' : '1'}`}
              review={review}
              locale={locale}
              translatedLabel={t.translated}
              duplicate={i >= count}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({
  review,
  locale,
  translatedLabel,
  duplicate = false,
}: {
  review: Review;
  locale: ReviewLocale;
  translatedLabel: string;
  duplicate?: boolean;
}) {
  const text = reviewText(review, locale);
  if (!text) return null;
  const translated = isTranslated(review, locale);
  const name = review.displayName[locale];

  return (
    <article
      aria-hidden={duplicate || undefined}
      className={`${styles.card} ${CARD_SURFACE} w-[86vw] sm:w-[348px] lg:w-[366px] flex flex-col rounded-3xl p-7 md:p-8`}
    >
      <Quote className="w-8 h-8 text-primary/60 mb-4 shrink-0" aria-hidden="true" />

      <p className="text-gray-100 leading-relaxed text-[15px] mb-6 flex-grow whitespace-pre-line">
        {text}
      </p>

      {translated && (
        <span className="inline-flex items-center self-start gap-1 px-2 py-0.5 mb-4 rounded-full bg-white/10 text-gray-300 text-[10px] font-semibold uppercase tracking-wide">
          {translatedLabel}
        </span>
      )}

      <div className="mt-auto pt-4 border-t border-white/10 flex items-center gap-3">
        <span className="flex items-center justify-center w-11 h-11 rounded-full icon-gradient shrink-0 text-sm font-black">
          {review.anonymous ? (
            <UserRound className="w-5 h-5" aria-hidden="true" />
          ) : (
            <span dir="ltr">{initials(name)}</span>
          )}
        </span>
        <div className="min-w-0">
          <p className="text-white font-bold text-sm truncate" dir="auto">
            {name}
          </p>
          {review.sourceUrl ? (
            <a
              href={review.sourceUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              tabIndex={duplicate ? -1 : undefined}
              className="inline-flex items-center gap-1 text-[11px] text-gray-300 hover:text-primary transition-colors"
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
}
