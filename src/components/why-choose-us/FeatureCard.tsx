'use client';

import { motion } from 'framer-motion';
import type { FeatureCardProps } from '@/types';

const FeatureCard = ({ title, desc, icon: Icon, index }: FeatureCardProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.1 }}
    viewport={{ once: true }}
    className="group bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-2xl hover:bg-white/10 hover:border-primary/40 hover:-translate-y-1 transition-all text-left h-full"
  >
    <div className="w-12 h-12 icon-gradient rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-white font-bold text-lg mb-3">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

export default FeatureCard;
