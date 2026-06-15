import { Suspense } from 'react';
import type { Metadata } from 'next';
import AboutPage from '@/components/pages/AboutPage';
import LoadingSpinner from '@/components/LoadingSpinner';

export const metadata: Metadata = {
  title: 'About Us | Expert Academic Writing Team',
  description: 'Learn about FizBussinessSolution, a global leader in professional academic writing services with over 500 subject matter experts.',
  alternates: { canonical: 'https://fizbussinesssolution.com/about' },
};

export default function Page() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AboutPage />
    </Suspense>
  );
}
