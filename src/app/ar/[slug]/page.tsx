import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LandingPage from '@/components/landing/LandingPage';
import { AR_LANDING_PAGES, SITE_URL, getLandingPage } from '@/content/landing';

export const dynamicParams = false;

export function generateStaticParams() {
  return AR_LANDING_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getLandingPage(slug, 'ar');
  if (!page) return {};
  const url = `${SITE_URL}/ar/${page.slug}`;
  const hasEnglish = Boolean(getLandingPage(slug, 'en'));
  return {
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: {
      canonical: url,
      ...(hasEnglish && { languages: { 'ar-SA': url, 'en-GB': `${SITE_URL}/${page.slug}` } }),
    },
    openGraph: { title: page.metaTitle, description: page.metaDescription, url, type: 'website', locale: 'ar_SA' },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getLandingPage(slug, 'ar');
  if (!page) notFound();
  return <LandingPage page={page} />;
}
