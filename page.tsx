import type { Metadata } from 'next';
import AcademicIntegrityPage from '@/components/pages/AcademicIntegrityPage';

export const metadata: Metadata = {
  title: 'Academic Integrity Policy',
  description: 'Read the ethical boundaries for academic coaching, draft feedback, proofreading, research support, data analysis tutoring, and responsible AI use.',
  alternates: { canonical: 'https://fizbusinessolutions.com/academic-integrity' },
};

export default function Page() {
  return <AcademicIntegrityPage />;
}
