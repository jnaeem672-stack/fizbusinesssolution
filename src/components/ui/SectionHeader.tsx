'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import type { SectionHeaderProps } from '@/types';

const SectionHeader = ({
  title,
  badge = 'FIZBS',
  subtitle,
  light = false,
  centered = true,
  className = '',
}: SectionHeaderProps) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className={`${centered ? 'text-center' : 'text-left'} mb-12 md:mb-16 ${className}`}
  >
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 ${
        light ? 'bg-white/10 text-primary' : 'bg-primary/10 text-primary'
      }`}
    >
      <Sparkles className="w-3 h-3" /> {badge}
    </motion.span>
    <h2
      className={`text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight ${
        light ? 'text-white' : 'text-navy'
      }`}
    >
      {title}
    </h2>
    {subtitle && (
      <p
        className={`max-w-2xl ${centered ? 'mx-auto' : ''} text-base md:text-lg leading-relaxed ${
          light ? 'text-gray-400' : 'text-gray-500'
        }`}
      >
        {subtitle}
      </p>
    )}
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: 64 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className={`h-1 rounded-full bg-gradient-to-r from-primary to-[#E0BC4A] mt-6 ${centered ? 'mx-auto' : ''}`}
    />
  </motion.div>
);

export default SectionHeader;
