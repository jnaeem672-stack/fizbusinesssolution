'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { SUPPORT_FORM_PATH } from '@/constants/supportNavigation';
import type { ServiceCardProps } from '@/types';
import { SERVICE_PAGE_LINKS } from '@/constants/serviceLinks';

const ServiceCard = ({ name, desc, icon: Icon, index }: ServiceCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.08 }}
    whileHover={{ y: -8 }}
    className="group relative overflow-hidden p-6 md:p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/20 transition-all h-full flex flex-col"
  >
    <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-[#E0BC4A] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
    <div className="w-14 h-14 icon-gradient rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
      <Icon className="w-7 h-7" />
    </div>
    <h3 className="text-navy font-extrabold text-lg mb-3">
      {SERVICE_PAGE_LINKS[name] ? <Link href={SERVICE_PAGE_LINKS[name]} className="hover:text-primary transition-colors">{name}</Link> : name}
    </h3>
    <p className="text-gray-500 text-sm mb-6 leading-relaxed flex-grow">{desc}</p>
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-auto">
      {SERVICE_PAGE_LINKS[name] && (
        <Link
          href={SERVICE_PAGE_LINKS[name]}
          className="inline-flex items-center gap-1.5 text-navy font-bold text-sm uppercase tracking-wider hover:text-primary transition-all"
        >
          Learn More<span className="sr-only"> about {name}</span> <ChevronRight className="w-4 h-4" />
        </Link>
      )}
      <Link
        href={SUPPORT_FORM_PATH}
        className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider hover:gap-3 transition-all"
      >
        Get a Quote<span className="sr-only"> for {name}</span> <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  </motion.div>
);

export default ServiceCard;
