import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPostPage from '@/components/blog/BlogPostPage';
import { AR_POSTS, getPost } from '@/content/blog';
import { SITE_URL } from '@/content/landing';

export const dynamicParams = false;

export function generateStaticParams() {
  return AR_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug, 'ar');
  if (!post) return {};
  const url = `${SITE_URL}/ar/blog/${post.slug}`;
  return {
    title: { absolute: post.metaTitle },
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
      title: post.metaTitle,
      description: post.metaDescription,
      url,
      type: 'article',
      locale: 'ar_SA',
      publishedTime: post.published,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug, 'ar');
  if (!post) notFound();
  return <BlogPostPage post={post} />;
}
