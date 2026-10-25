'use client';

import { LazyMotion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import type { ProvidersProps } from '@/types';
import { afterFirstPaint } from '@/lib/afterFirstPaint';

// The animation features load after the first paint (or on the first tap or scroll), so the first screen
// does not wait for them. Until then `m` components show their starting state.
const loadMotionFeatures = () =>
  new Promise<typeof import('./motionFeatures').default>((resolve) => {
    afterFirstPaint(() => {
      import('./motionFeatures').then((mod) => resolve(mod.default));
    });
  });

export default function Providers({ children }: ProvidersProps) {
  return (
    // LazyMotion + `m` components load only the animation features the site uses,
    // instead of the full framer-motion bundle. `strict` flags any full `motion` component left behind.
    <LazyMotion features={loadMotionFeatures} strict>
      {children}
      <Toaster position="top-right" reverseOrder={false} />
    </LazyMotion>
  );
}
