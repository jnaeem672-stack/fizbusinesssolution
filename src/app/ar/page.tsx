import type { Metadata } from 'next';
import ArHomePage from '@/components/pages/ArHomePage';
import { AR_HOME } from '@/content/arHome';
import { SITE_URL } from '@/content/landing';

export const metadata: Metadata = {
  title: { absolute: AR_HOME.metaTitle },
  description: AR_HOME.metaDescription,
  keywords: AR_HOME.keywords,
  alternates: {
    canonical: `${SITE_URL}/ar`,
    languages: { 'ar-SA': `${SITE_URL}/ar`, 'en-GB': `${SITE_URL}/` },
  },
  openGraph: {
      images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    title: AR_HOME.metaTitle,
    description: AR_HOME.metaDescription,
    url: `${SITE_URL}/ar`,
    locale: 'ar_SA',
    type: 'website',
  },
};

export default function Page() {
  return <ArHomePage />;
}
