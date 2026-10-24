import type { ReactNode } from 'react';
import '../globals.css';
import RootDocument, { AR_SHARE_IMAGE, SITE_METADATA } from '@/components/RootDocument';
import ArFooter from '@/components/ArFooter';
import { cairoArabicPreloaded } from './fonts';

// Arabic pages share the Arabic image and locale by default (pages that set their own openGraph name it too)
export const metadata = {
  ...SITE_METADATA,
  openGraph: { ...SITE_METADATA.openGraph, locale: 'ar_SA', images: [AR_SHARE_IMAGE] },
};

/**
 * Root layout for every Arabic page (/ar, /ar/[slug], /ar/blog...): the server sends
 * lang="ar" dir="rtl" in the first HTML, and every page ends with the Arabic footer.
 */
export default function ArabicRootLayout({ children }: { children: ReactNode }) {
  return (
    <RootDocument lang="ar" footer={<ArFooter />} arabicFontVariable={cairoArabicPreloaded.variable}>
      {children}
    </RootDocument>
  );
}
