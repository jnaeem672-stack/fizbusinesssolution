import { brandOgImage, OG_SIZE } from '@/lib/og/BrandOgImage';
import { EN_LANDING_PAGES, getLandingPage } from '@/content/landing';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'FIZBS: Assignment and Dissertation Help';

export function generateStaticParams() {
  return EN_LANDING_PAGES.map((page) => ({ slug: page.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getLandingPage(slug, 'en');
  return brandOgImage({
    eyebrow: page?.badge ?? 'Expert help',
    title: page?.h1 ?? 'Assignment and Dissertation Help UK and Saudi Arabia',
    footer: 'Since 2015  |  10% off your first order',
  });
}
