import type { Metadata } from 'next';
import HomePage from '@/components/pages/HomePage';

const TITLE = 'FIZ Business Solutions | Assignment & Dissertation Help UK';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description:
    'FIZ Business Solutions (FIZBS): assignment and dissertation help for UK and Saudi students. From £20 per 1,000 words, 10% off your first order.',
  alternates: {
    canonical: 'https://fizbusinessolutions.com/',
    languages: { 'en-GB': 'https://fizbusinessolutions.com/', 'ar-SA': 'https://fizbusinessolutions.com/ar' },
  },
  openGraph: {
    title: TITLE,
    description:
      'Expert assignment and dissertation help from qualified subject specialists. Instant price, 10% off your first order and 24/7 WhatsApp support.',
    url: 'https://fizbusinessolutions.com',
  },
};

/** Tells Google the site's name (and common spellings) so brand searches find the homepage. */
const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'FIZ Business Solutions',
  alternateName: ['FIZBS', 'FIZ Business Solution', 'fizbusinessolutions'],
  url: 'https://fizbusinessolutions.com/',
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }} />
      <HomePage />
    </>
  );
}
