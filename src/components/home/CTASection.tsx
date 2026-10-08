'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Clock, Award } from 'lucide-react';
import WhatsAppLink from '@/components/ui/WhatsAppLink';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { SUPPORT_FORM_PATH } from '@/constants/supportNavigation';
import { WHATSAPP_URL } from '@/constants/whatsapp';

export interface CTASectionProps {
  badge?: string;
  title?: string;
  subtitle?: string;
}

const CTASection = ({
  badge = '🎁 First Order 10% OFF',
  title = 'Need Assignment or Dissertation Help?',
  subtitle = 'Tell us your subject, word count and deadline. A qualified expert is ready to help, and we reply quickly on WhatsApp.',
}: CTASectionProps) => (
  <section className="relative py-20 md:py-28 overflow-hidden bg-navy">
    <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy" />
    <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C41E3A_1px,transparent_1px)] [background-size:24px_24px]" />
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />

    <div className="relative z-10 max-w-site mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center"
      >
        <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md text-primary text-xs font-black uppercase tracking-widest rounded-full mb-6 border border-white/10">
          {badge}
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-5 tracking-tight leading-tight">{title}</h2>
        <p className="text-gray-300 text-base md:text-lg mb-10 leading-relaxed">{subtitle}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href={SUPPORT_FORM_PATH}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl text-base shadow-xl shadow-primary/40 hover:brightness-110 hover:scale-[1.03] active:scale-[0.97] transition-all w-full sm:w-auto min-w-[220px]"
          >
            Get Free Quote <ArrowRight className="w-5 h-5" />
          </Link>
          <WhatsAppLink href={WHATSAPP_URL} aria-label="Chat with us on WhatsApp" className="inline-flex hover:scale-105 active:scale-95 transition-transform">
            <WhatsAppIcon size={48} className="w-12 h-12" />
          </WhatsAppLink>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-white/50">
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
            <Award className="w-4 h-4 text-primary" /> Since 2015
          </span>
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
            <Clock className="w-4 h-4 text-primary" /> On-Time Delivery
          </span>
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-primary" /> 100% Confidential
          </span>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CTASection;
