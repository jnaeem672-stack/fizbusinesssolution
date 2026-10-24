import type { Metadata } from 'next';
import HomePage from '@/components/pages/HomePage';
import { DEFAULT_SHARE_IMAGE } from '@/components/RootDocument';
import HomeSeoHub from '@/components/home/HomeSeoHub';
import { EN_POSTS, postPath } from '@/content/blog';

const TITLE = 'Assignment & Dissertation Help UK, Saudi & UAE | FIZBS';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description:
    "Assignment and dissertation guidance for students in the UK, Saudi Arabia and the UAE from Master's and PhD experts. 24/7 WhatsApp, 10% off first order.",
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
