'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ShieldCheck, X } from 'lucide-react';

type ConsentChoice = 'accepted' | 'declined';

const updateGoogleConsent = (choice: ConsentChoice) => {
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag !== 'function') return;
  const value = choice === 'accepted' ? 'granted' : 'denied';
  gtag('consent', 'update', {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  });
};

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let consent: string | null = null;
    try {
      consent = localStorage.getItem('cookie-consent');
    } catch {
      consent = null;
    }
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (type: ConsentChoice) => {
    try {
      localStorage.setItem('cookie-consent', type);
    } catch {
      // storage unavailable; the choice still applies for this visit
    }
    updateGoogleConsent(type);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed z-[10001] left-3 right-3 bottom-[5.75rem] sm:left-6 sm:right-auto sm:bottom-6 sm:max-w-md bg-navy text-white p-4 sm:p-6 rounded-2xl shadow-2xl border border-white/10 safe-bottom"
        >
          <button
            type="button"
            onClick={() => setIsVisible(false)}
            aria-label="Close cookie notice"
            className="absolute top-3 right-3 p-1.5 text-white/40 hover:text-white transition-colors rounded-lg hover:bg-white/5"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-3 pr-6 sm:pr-8">
            <div className="p-2 bg-primary/20 rounded-lg shrink-0">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider sm:tracking-widest mb-1">
                Your Cookie Choices
              </h3>
              <p className="text-[11px] sm:text-xs text-white/70 leading-relaxed mb-4">
                We use essential cookies to run this site and, with your permission, advertising cookies from Google to measure our ads. Choose Accept All to allow them or Decline to use essential cookies only. See our{' '}
                <Link href="/privacy-policy" className="text-primary hover:underline font-bold">
                  Privacy Policy
                </Link>
                .
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => handleConsent('accepted')}
                  className="w-full sm:w-auto sm:flex-1 px-4 sm:px-6 py-2.5 bg-primary text-white text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] rounded-lg hover:brightness-110 transition-all shadow-lg shadow-primary/20"
                >
                  Accept All
                </button>
                <button
                  type="button"
                  onClick={() => handleConsent('declined')}
                  className="w-full sm:w-auto sm:flex-1 px-4 sm:px-6 py-2.5 bg-white/5 text-white border border-white/10 text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] rounded-lg hover:bg-white/10 transition-all"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
