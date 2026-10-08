import { Suspense } from 'react';
import type { Metadata } from 'next';
import HomePage from '@/components/pages/HomePage';
import LoadingSpinner from '@/components/LoadingSpinner';

export const metadata: Metadata = {
  title: { absolute: 'Assignment Help & Dissertation Help UK & Saudi Arabia | FIZBS' },
  description:
    'Need assignment help or dissertation help? FIZBS supports UK and Saudi Arabian students with essays, reports, MBA assignments, research proposals and SPSS analysis. Instant price from £20 per 1,000 words, 10% off your first order.',
  alternates: {
    canonical: 'https://fizbusinessolutions.com/',
    languages: { 'en-GB': 'https://fizbusinessolutions.com/', 'ar-SA': 'https://fizbusinessolutions.com/ar' },
  },
  openGraph: {
    title: 'Assignment Help & Dissertation Help UK & Saudi Arabia | FIZBS',
    description:
      'Expert assignment and dissertation help from qualified subject specialists. Instant price, 10% off your first order and 24/7 WhatsApp support.',
    url: 'https://fizbusinessolutions.com',
  },
};

export default function Page() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HomePage />
    </Suspense>
  );
}
