import type { ReactNode } from 'react';
import ArFooter from '@/components/ArFooter';

/** Every Arabic page (/ar, /ar/[slug], /ar/blog...) ends with the Arabic footer */
export default function ArabicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ArFooter />
    </>
  );
}
