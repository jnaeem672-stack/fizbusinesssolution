import type { Metadata } from 'next';
import ContactPage from '@/components/pages/ContactPage';

export const metadata: Metadata = {
  title: { absolute: 'Contact FIZBS | Assignment & Dissertation Help' },
  description: 'Contact FIZBS for assignment help, dissertation help, research proposal help and proofreading. Get a free quote on WhatsApp 24/7.',
  alternates: { canonical: 'https://fizbusinessolutions.com/contact' },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact FIZ Business Solutions',
  url: 'https://fizbusinessolutions.com/contact',
  mainEntity: {
    '@type': 'Organization',
    name: 'FIZ Business Solutions',
    alternateName: 'FIZBS',
    url: 'https://fizbusinessolutions.com/',
    email: 'info@fizbusinessolutions.com',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      telephone: '+971543800388',
      email: 'info@fizbusinessolutions.com',
      areaServed: ['GB', 'SA', 'AE', 'US'],
      availableLanguage: ['English'],
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    },
  },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <ContactPage />
    </>
  );
}
