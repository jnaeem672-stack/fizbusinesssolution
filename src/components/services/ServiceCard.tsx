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
    className="group p-6 md:p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all h-full flex flex-col"
  >
    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
      <Icon className="w-8 h-8" />
    </div>
    <h3 className="text-navy font-bold text-lg mb-3">{name}</h3>
    <p className="text-gray-500 text-sm mb-6 leading-relaxed flex-grow">{desc}</p>
    <Link
      href={SUPPORT_FORM_PATH}
      className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider hover:gap-3 transition-all mt-auto"
    >
      Discuss This Service <ChevronRight className="w-4 h-4" />
    </Link>
  </motion.div>
);

export default ServiceCard;
