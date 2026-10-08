import { Suspense } from 'react';
import type { Metadata } from 'next';
import ServicesPage from '@/components/pages/ServicesPage';
import LoadingSpinner from '@/components/LoadingSpinner';

export const metadata: Metadata = {
  title: 'Assignment Help, Dissertation Help & Proofreading',
  description: 'Explore expert academic help, dissertation guidance, proofreading, referencing support, research-methods tutoring, and data-analysis tutoring.',
  alternates: { canonical: 'https://fizbusinesssolutions.com/services' },
};

export default function Page() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ServicesPage />
    </Suspense>
  );
}
