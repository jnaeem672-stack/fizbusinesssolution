'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import WhatsAppLink from '@/components/ui/WhatsAppLink';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import type { ContactCardProps } from '@/types';

const ContactCard = ({
  icon: Icon,
  label,
  value,
  link,
  color,
  desc,
  actionLabel,
  index = 0,
}: ContactCardProps) => {
  const isWhatsApp = link?.includes('wa.me') || link?.includes('whatsapp.com');
  const isExternal = link?.startsWith('http');

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ delay: index * 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-shadow group h-full flex flex-col"
    >
      <div className="flex flex-col sm:flex-row items-start gap-4 flex-grow">
        <motion.div
          whileHover={{ rotate: [0, -8, 8, 0] }}
          transition={{ duration: 0.4 }}
          className={`shrink-0 shadow-lg ${isWhatsApp ? 'p-0' : `p-3 rounded-xl ${color} text-white`}`}
        >
          {isWhatsApp ? (
            <WhatsAppIcon size={40} className="w-10 h-10" />
          ) : (
            <Icon className="w-6 h-6" />
          )}
        </motion.div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">{label}</p>
          {link ? (
            isWhatsApp ? (
              <WhatsAppLink
                href={link}
                className="text-base md:text-lg font-bold text-navy group-hover:text-[#25D366] transition-colors block mb-1 break-words"
              >
                {value}
              </WhatsAppLink>
            ) : (
              <a
                href={link}
                className="text-base md:text-lg font-bold text-navy group-hover:text-primary transition-colors block mb-1 break-words"
              >
                {value}
              </a>
            )
          ) : (
            <p className="text-base md:text-lg font-bold text-navy mb-1">{value}</p>
          )}
          <p className="text-gray-400 text-xs md:text-sm font-medium">{desc}</p>
        </div>
      </div>

      {link && actionLabel && (
        isWhatsApp ? (
          <WhatsAppLink
            href={link}
            aria-label={actionLabel}
            className="mt-5 inline-flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
          >
            <WhatsAppIcon size={40} className="w-10 h-10" />
          </WhatsAppLink>
        ) : (
          <a
            href={link}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="mt-5 inline-flex items-center justify-center gap-2 w-full py-3 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:brightness-110 transition-all"
          >
            {actionLabel} <ArrowRight className="w-4 h-4" />
          </a>
        )
      )}
    </motion.div>
  );
};

export default ContactCard;
