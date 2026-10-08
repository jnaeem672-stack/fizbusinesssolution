import { Suspense } from 'react';
import type { Metadata } from 'next';
import AboutPage from '@/components/pages/AboutPage';
import LoadingSpinner from '@/components/LoadingSpinner';

export const metadata: Metadata = {
  title: 'About Our Ethical Learning Support',
  description: 'Learn how FIZ Business Solutions provides academic help, research guidance, draft feedback, and proofreading while protecting student authorship.',
  alternates: { canonical: 'https://fizbusinesssolutions.com/about' },
};

export default function Page() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AboutPage />
    </Suspense>
  );
}
