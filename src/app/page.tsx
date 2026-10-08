import { Suspense } from 'react';
import type { Metadata } from 'next';
import HomePage from '@/components/pages/HomePage';
import LoadingSpinner from '@/components/LoadingSpinner';

export const metadata: Metadata = {
  title: 'Assignment & Dissertation Help UK & Saudi Arabia',
  description:
    'Build stronger academic and research skills through expert academic help, draft feedback, proofreading, referencing support, and data-analysis tutoring.',
  alternates: { canonical: 'https://fizbusinesssolutions.com/' },
  openGraph: {
    title: 'Assignment & Dissertation Help UK & Saudi Arabia | FIZ Business Solutions',
    description:
      'Expert academic help, research guidance, draft feedback, proofreading, and data-analysis tutoring that preserve student authorship.',
    url: 'https://fizbusinesssolutions.com',
    images: ['https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80'],
  },
};

export default function Page() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HomePage />
    </Suspense>
  );
}
