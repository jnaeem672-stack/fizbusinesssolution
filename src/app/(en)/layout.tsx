import type { ReactNode } from 'react';
import '../globals.css';
import RootDocument, { SITE_METADATA } from '@/components/RootDocument';
import Footer from '@/components/Footer';

export const metadata = SITE_METADATA;

/** Root layout for every English page: the server sends lang="en" in the first HTML */
export default function EnglishRootLayout({ children }: { children: ReactNode }) {
  return (
    <RootDocument lang="en" footer={<Footer />}>
      {children}
    </RootDocument>
  );
}
