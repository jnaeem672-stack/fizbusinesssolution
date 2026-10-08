'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { SUPPORT_FORM_PATH } from '@/constants/supportNavigation';
import type { ServiceCardProps } from '@/types';

const ServiceCard = ({ name, desc, icon: Icon, index }: ServiceCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.08 }}
    whileHover={{ y: -8 }}
    className="group relative overflow-hidden p-6 md:p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/20 transition-all h-full flex flex-col"
  >
    <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-[#e8455f] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
    <div className="w-14 h-14 icon-gradient rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
      <Icon className="w-7 h-7" />
    </div>
    <h3 className="text-navy font-extrabold text-lg mb-3">{name}</h3>
    <p className="text-gray-500 text-sm mb-6 leading-relaxed flex-grow">{desc}</p>
    <Link
      href={SUPPORT_FORM_PATH}
      className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider hover:gap-3 transition-all mt-auto"
    >
      Get a Quote <ChevronRight className="w-4 h-4" />
    </Link>
  </motion.div>
);

export default ServiceCard;
