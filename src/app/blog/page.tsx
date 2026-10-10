import type { Metadata } from 'next';
import BlogIndex from '@/components/blog/BlogIndex';
import { EN_POSTS } from '@/content/blog';
import { SITE_URL } from '@/content/landing';

export const metadata: Metadata = {
  title: { absolute: 'Student Guides: Assignments, Dissertations & Research | FIZBS' },
  description:
    'Free step-by-step guides for UK and Saudi students: how to write a dissertation, literature review, methodology, Harvard referencing, SPSS tests and more.',
  alternates: { canonical: `${SITE_URL}/blog`, languages: { 'en-GB': `${SITE_URL}/blog`, 'ar-SA': `${SITE_URL}/ar/blog` } },
  openGraph: {
      images: [{ url: '/opengraph-image', width: 1200, height: 630 }], title: 'Student Guides | FIZBS', url: `${SITE_URL}/blog`, type: 'website' },
};

export default function Page() {
  return <BlogIndex posts={EN_POSTS} locale="en" />;
}
