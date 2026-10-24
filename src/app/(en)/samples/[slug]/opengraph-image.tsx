import { brandOgImage, OG_SIZE } from '@/lib/og/BrandOgImage';
import { SAMPLES, getSample, getSampleCategory } from '@/content/samples';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'FIZBS work sample';

export function generateStaticParams() {
  return SAMPLES.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sample = getSample(slug);
  return brandOgImage({
    eyebrow: sample ? `${getSampleCategory(sample.category).label} sample` : 'Work sample',
    title: sample?.title ?? 'Academic Work Samples by Our Experts',
    footer: 'Free sample  |  Expert help on WhatsApp',
  });
}
