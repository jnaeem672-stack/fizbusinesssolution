'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { isArabicPath } from '@/constants/arLinks';

/** Hides the English footer on /ar pages; those get the Arabic footer from app/ar/layout.tsx */
export default function HideOnArabic({ children }: { children: ReactNode }) {
  return isArabicPath(usePathname()) ? null : <>{children}</>;
}
