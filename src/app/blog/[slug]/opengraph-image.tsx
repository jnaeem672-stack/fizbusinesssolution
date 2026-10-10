import { brandOgImage, OG_SIZE } from '@/lib/og/BrandOgImage';
import { EN_POSTS, getPost } from '@/content/blog';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'FIZBS student guide';

export function generateStaticParams() {
  return EN_POSTS.map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug, 'en');
  return brandOgImage({
    eyebrow: post ? `${post.category} guide` : 'Student guide',
    title: post?.title ?? 'Student Guides for UK and Saudi Students',
    footer: 'Free guide  |  Expert help on WhatsApp',
  });
}
