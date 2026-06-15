'use client';

import { motion, AnimatePresence } from 'framer-motion';
import WhatsAppLink from '@/components/ui/WhatsAppLink';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { WHATSAPP_URL } from '@/constants/whatsapp';
import type { StickyHelpBannerProps } from '@/types';

const StickyHelpBanner = ({ show }: StickyHelpBannerProps) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-navy/95 backdrop-blur-md text-white py-3 px-4 sm:py-4 sm:px-6 z-[9990] flex items-center justify-between gap-3 shadow-2xl border-t border-white/10 md:hidden safe-bottom"
      >
        <div className="flex items-center gap-3">
          <WhatsAppIcon size={40} className="w-10 h-10" />
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-primary">Need Help Fast?</p>
            <p className="text-sm font-bold">Chat with our experts</p>
          </div>
        </div>
        <WhatsAppLink
          href={WHATSAPP_URL}
          aria-label="Chat on WhatsApp"
          className="inline-flex hover:scale-105 active:scale-95 transition-transform shrink-0"
        >
          <WhatsAppIcon size={40} className="w-10 h-10" />
        </WhatsAppLink>
      </motion.div>
    )}
  </AnimatePresence>
);

export default StickyHelpBanner;
