import type { Metadata } from 'next';
import HomePage from '@/components/pages/HomePage';
import { DEFAULT_SHARE_IMAGE } from '@/components/RootDocument';
import HomeSeoHub from '@/components/home/HomeSeoHub';
import { EN_POSTS, postPath } from '@/content/blog';

const TITLE = 'Expert Assignment & Dissertation Help | UK & Gulf | FIZBS';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description:
    'Expert assignment and dissertation help for students in the UK, the Gulf and worldwide. Qualified subject experts, 24/7 WhatsApp and 10% off your first order.',
  alternates: {
    canonical: 'https://fizbusinessolutions.com/',
    languages: { 'en-GB': 'https://fizbusinessolutions.com/', ar: 'https://fizbusinessolutions.com/ar', 'x-default': 'https://fizbusinessolutions.com/' },
  },
  openGraph: {
    title: TITLE,
    description:
      'Expert assignment and dissertation help from qualified subject specialists. Instant price, 10% off your first order and 24/7 WhatsApp support.',
    url: 'https://fizbusinessolutions.com',
    images: [DEFAULT_SHARE_IMAGE],
  },
};

/** Tells Google the site's name (and common spellings) so brand searches find the homepage. */
const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://fizbusinessolutions.com/#website',
  name: 'FIZ Business Solutions',
  alternateName: ['FIZBS', 'FIZ Business Solution', 'fizbusinessolutions'],
  url: 'https://fizbusinessolutions.com/',
};

// Built on the server so the full guide texts are never bundled into the homepage JavaScript
const LATEST_GUIDES = EN_POSTS.slice(0, 6).map((p) => ({
  slug: p.slug,
  href: postPath(p),
  title: p.title,
  excerpt: p.excerpt,
  category: p.category,
}));

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }} />
      <HomePage guides={LATEST_GUIDES} seo={<HomeSeoHub />} />
    </>
  );
}
