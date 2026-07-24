import { Suspense } from 'react';
import type { Metadata } from 'next';
import ContactPage from '@/components/pages/ContactPage';
import LoadingSpinner from '@/components/LoadingSpinner';

export const metadata: Metadata = {
  title: 'Contact FIZ Business Solutions',
  description: 'Contact FIZ Business Solutions to discuss ethical academic coaching, research guidance, draft feedback, proofreading, or data-analysis tutoring.',
  alternates: { canonical: 'https://fizbusinesssolutions.com/contact' },
};

export default function Page() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ContactPage />
    </Suspense>
  );
}
