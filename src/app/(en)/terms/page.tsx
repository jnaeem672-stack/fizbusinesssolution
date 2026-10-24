import type { Metadata } from 'next';
import TermsPage from '@/components/pages/TermsPage';

export const metadata: Metadata = {
  title: 'Terms of Service & Acceptable Use',
  description: 'Terms governing tutoring, draft feedback, proofreading, research guidance and academic support from FIZ Business Solutions (FIZBS).',
  alternates: { canonical: 'https://fizbusinessolutions.com/terms' },
};

export default function Page() {
  return <TermsPage />;
}
