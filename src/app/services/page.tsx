import { Suspense } from 'react';
import type { Metadata } from 'next';
import ServicesPage from '@/components/pages/ServicesPage';
import LoadingSpinner from '@/components/LoadingSpinner';

export const metadata: Metadata = {
  title: 'Academic Writing Services | Dissertation, Essay, Assignment Help',
  description: '35+ academic writing services including dissertation, essay, nursing, CIPD, law assignment help. AI-free guaranteed.',
  alternates: { canonical: 'https://fizbussinesssolution.com/services' },
};

export default function Page() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ServicesPage />
    </Suspense>
  );
}
