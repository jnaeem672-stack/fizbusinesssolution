import type { Metadata } from 'next';
import ArHomePage from '@/components/pages/ArHomePage';
import { AR_HOME } from '@/content/arHome';
import { SITE_URL } from '@/content/landing';
import { AR_SHARE_IMAGE } from '@/components/RootDocument';

export const metadata: Metadata = {
  title: { absolute: AR_HOME.metaTitle },
  description: AR_HOME.metaDescription,
  keywords: AR_HOME.keywords,
  alternates: {
    canonical: `${SITE_URL}/ar`,
    languages: { ar: `${SITE_URL}/ar`, 'en-GB': `${SITE_URL}/`, 'x-default': `${SITE_URL}/` },
  },
  openGraph: {
      images: [AR_SHARE_IMAGE],
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
