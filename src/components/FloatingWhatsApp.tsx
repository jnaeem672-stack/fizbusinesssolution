'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import WhatsAppLink from '@/components/ui/WhatsAppLink';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { WHATSAPP_URL } from '@/constants/whatsapp';

export default function FloatingWhatsApp() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={visible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.5, y: 20 }}
      className="fixed z-[10002] bottom-5 right-4 sm:bottom-6 sm:right-6 pointer-events-none"
    >
      <WhatsAppLink
        href={WHATSAPP_URL}
        aria-label="Chat on WhatsApp"
        className="pointer-events-auto flex items-center gap-0 sm:gap-3 group"
      >
        <span className="hidden sm:flex items-center bg-navy text-white text-[10px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap border border-white/10">
          Chat with us!
        </span>
        <WhatsAppIcon
          size={56}
          className="w-14 h-14 sm:w-16 sm:h-16 pulse-button hover:scale-105 active:scale-95 transition-transform"
        />
      </WhatsAppLink>
    </motion.div>
  );
}
