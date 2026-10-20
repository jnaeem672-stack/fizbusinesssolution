'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { isArabicPath } from '@/constants/arLinks';

/** Keeps <html lang> in step with the page language when visitors move between English and Arabic pages */
export default function LangSync() {
  const pathname = usePathname() || '/';
  useEffect(() => {
    document.documentElement.lang = isArabicPath(pathname) ? 'ar' : 'en';
  }, [pathname]);
  return null;
}
