import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ExpertProfilePage from '@/components/pages/ExpertProfilePage';
import { EXPERTS, getExpert } from '@/content/experts';
import { SITE_URL } from '@/content/landing';

export const dynamicParams = false;

export function generateStaticParams() {
  return EXPERTS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const expert = getExpert(slug);
  if (!expert) return {};
  const url = `${SITE_URL}/experts/${expert.slug}`;
  return {
    title: { absolute: expert.article.metaTitle },
    description: expert.article.metaDescription,
    keywords: expert.article.keywords,
    alternates: { canonical: url },
    openGraph: { title: expert.article.metaTitle, description: expert.article.metaDescription, url, type: 'profile' },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const expert = getExpert(slug);
  if (!expert) notFound();
  return <ExpertProfilePage expert={expert} />;
}
