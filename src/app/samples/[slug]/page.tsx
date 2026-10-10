import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SamplePage from '@/components/samples/SamplePage';
import { SAMPLES, getSample } from '@/content/samples';
import { SITE_URL } from '@/content/landing';

export const dynamicParams = false;

export function generateStaticParams() {
  return SAMPLES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const sample = getSample(slug);
  if (!sample) return {};
  const url = `${SITE_URL}/samples/${sample.slug}`;
  return {
    title: { absolute: sample.metaTitle },
    description: sample.metaDescription,
    keywords: sample.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: sample.metaTitle,
      description: sample.metaDescription,
      url,
      type: 'article',
      locale: 'en_GB',
      publishedTime: sample.published,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sample = getSample(slug);
  if (!sample) notFound();
  return <SamplePage sample={sample} />;
}
