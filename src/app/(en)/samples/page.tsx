import type { Metadata } from 'next';
import SamplesIndex from '@/components/samples/SamplesIndex';
import { SITE_URL } from '@/content/landing';

export const metadata: Metadata = {
  title: { absolute: 'Assignment & Dissertation Samples by Our Experts | FIZBS' },
  description:
    'Free academic work samples from FIZBS experts: essays, reports, dissertations, data analysis and database projects. See our quality before you order.',
  alternates: { canonical: `${SITE_URL}/samples` },
  openGraph: {
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    title: 'Academic Work Samples | FIZBS',
    description: 'See the quality of our work before you order: samples by category from FIZBS experts.',
    url: `${SITE_URL}/samples`,
    type: 'website',
  },
};

export default function Page() {
  return <SamplesIndex />;
}
