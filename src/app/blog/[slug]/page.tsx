import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPostPage from '@/components/blog/BlogPostPage';
import { EN_POSTS, getPost } from '@/content/blog';
import { SITE_URL } from '@/content/landing';

export const dynamicParams = false;

export function generateStaticParams() {
  return EN_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug, 'en');
  if (!post) return {};
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: { absolute: post.metaTitle },
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url,
      type: 'article',
      locale: 'en_GB',
      publishedTime: post.published,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug, 'en');
  if (!post) notFound();
  return <BlogPostPage post={post} />;
}
