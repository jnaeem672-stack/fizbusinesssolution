'use client';

import { LazyMotion, domAnimation } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import type { ProvidersProps } from '@/types';

export default function Providers({ children }: ProvidersProps) {
  return (
    // LazyMotion + `m` components load only the animation features the site uses,
    // instead of the full framer-motion bundle. `strict` flags any full `motion` component left behind.
    <LazyMotion features={domAnimation} strict>
      {children}
      <Toaster position="top-right" reverseOrder={false} />
    </LazyMotion>
  );
}
