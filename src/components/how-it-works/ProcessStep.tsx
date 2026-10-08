'use client';

import { motion } from 'framer-motion';
import type { ProcessStepProps } from '@/types';

const ProcessStep = ({ id, title, desc, icon: Icon, index }: ProcessStepProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.2 }}
    viewport={{ once: true }}
    className="text-center"
  >
    <div className="relative inline-block mb-8">
      <div className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] bg-white rounded-full flex items-center justify-center shadow-xl shadow-primary/10 ring-8 ring-primary/5 border border-primary/10 relative group mx-auto">
        <Icon className="w-10 h-10 md:w-12 md:h-12 text-primary transition-transform group-hover:scale-110" />
        <div className="absolute -top-2 -right-2 w-9 h-9 md:w-10 md:h-10 icon-gradient rounded-full flex items-center justify-center font-extrabold text-base md:text-lg">
          {id}
        </div>
      </div>
    </div>
    <h3 className="text-navy font-bold text-lg md:text-xl mb-3">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed px-2 md:px-4 max-w-xs mx-auto">{desc}</p>
  </motion.div>
);

export default ProcessStep;
