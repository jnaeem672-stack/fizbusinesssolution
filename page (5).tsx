import type { Metadata } from 'next';
import TermsPage from '@/components/pages/TermsPage';

export const metadata: Metadata = {
  title: 'Terms of Service & Acceptable Use',
  description: 'Terms governing ethical academic coaching, tutoring, draft feedback, proofreading, research guidance, and professional support.',
  alternates: { canonical: 'https://fizbusinessolutions.com/terms' },
};

export default function Page() {
  return <TermsPage />;
}
