'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { StickyHelpBannerProps } from '@/types';

const StickyHelpBanner = ({ show }: StickyHelpBannerProps) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-navy/95 backdrop-blur-md text-white py-3 pl-4 pr-20 sm:py-4 sm:pl-6 z-[9990] flex items-center justify-between gap-3 shadow-2xl border-t border-white/10 md:hidden safe-bottom"
      >
        <div className="min-w-0">
          <p className="text-[10px] font-black uppercase tracking-widest text-primary">🎁 First order 10% OFF</p>
          <p className="text-sm font-bold truncate">See your price in seconds</p>
        </div>
        <a
          href="#quote"
          className="shrink-0 px-4 py-2.5 bg-primary text-white text-sm font-bold rounded-lg shadow-lg active:scale-95 transition-transform"
        >
          Get Price
        </a>
      </motion.div>
    )}
  </AnimatePresence>
);

export default StickyHelpBanner;
