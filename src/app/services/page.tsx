import { Suspense } from 'react';
import type { Metadata } from 'next';
import ServicesPage from '@/components/pages/ServicesPage';
import LoadingSpinner from '@/components/LoadingSpinner';

export const metadata: Metadata = {
  title: 'Academic Coaching, Research Guidance & Draft Feedback',
  description: 'Explore ethical academic coaching, dissertation guidance, proofreading, referencing support, research-methods tutoring, and data-analysis tutoring.',
  alternates: { canonical: 'https://fizbusinesssolutions.com/services' },
};

export default function Page() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ServicesPage />
    </Suspense>
  );
}
