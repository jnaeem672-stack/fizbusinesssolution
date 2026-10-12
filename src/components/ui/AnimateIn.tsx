'use client';

import { m as motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

interface AnimateInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
}

const offsets = {
  up: { y: 32 },
  down: { y: -32 },
  left: { x: 32 },
  right: { x: -32 },
  none: {},
};

const variants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, x: 0, y: 0 },
};

export default function AnimateIn({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.55,
}: AnimateInProps) {
  const offset = offsets[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
