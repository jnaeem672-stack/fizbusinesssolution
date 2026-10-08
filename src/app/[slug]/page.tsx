import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LandingPage from '@/components/landing/LandingPage';
import { EN_LANDING_PAGES, SITE_URL, getLandingPage } from '@/content/landing';

export const dynamicParams = false;

export function generateStaticParams() {
  return EN_LANDING_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getLandingPage(slug, 'en');
  if (!page) return {};
  const url = `${SITE_URL}/${page.slug}`;
  const hasArabic = Boolean(getLandingPage(slug, 'ar'));
  return {
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: {
      canonical: url,
      ...(hasArabic && { languages: { 'en-GB': url, 'ar-SA': `${SITE_URL}/ar/${page.slug}` } }),
    },
    openGraph: { title: page.metaTitle, description: page.metaDescription, url, type: 'website', locale: 'en_GB' },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getLandingPage(slug, 'en');
  if (!page) notFound();
  return <LandingPage page={page} />;
}
