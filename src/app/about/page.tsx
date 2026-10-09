import type { Metadata } from 'next';
import AboutPage from '@/components/pages/AboutPage';

export const metadata: Metadata = {
  title: 'About FIZBS: Assignment & Dissertation Help Since 2015',
  description: 'FIZ Business Solutions has provided assignment help and dissertation help since 2015, supporting 10,000+ students and 350+ research projects in the UK and Saudi Arabia.',
  alternates: { canonical: 'https://fizbusinessolutions.com/about' },
};

export default function Page() {
  return (
    <AboutPage />
  );
}
