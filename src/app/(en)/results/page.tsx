import type { Metadata } from 'next';
import ResultsPage from '@/components/results/ResultsPage';
import { SITE_URL } from '@/content/landing';

export const metadata: Metadata = {
  title: { absolute: 'Real Student Results & Grades | FIZBS' },
  description:
    'Real grade screenshots shared by FIZBS students: reports, case studies, dissertations, MBA and MSc modules. Personal details removed from every result.',
  alternates: { canonical: `${SITE_URL}/results` },
  openGraph: {
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    title: 'Real Student Results | FIZBS',
    description: 'Real grade screenshots shared by FIZBS students, with personal details removed.',
    url: `${SITE_URL}/results`,
    type: 'website',
  },
};

export default function Page() {
  return <ResultsPage />;
}
