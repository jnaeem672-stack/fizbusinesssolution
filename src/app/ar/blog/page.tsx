import type { Metadata } from 'next';
import BlogIndex from '@/components/blog/BlogIndex';
import { AR_POSTS } from '@/content/blog';
import { SITE_URL } from '@/content/landing';

export const metadata: Metadata = {
  title: { absolute: 'أدلة الطلاب: خطة البحث والتوثيق والرسائل العلمية | FIZBS' },
  description: 'أدلة مجانية خطوة بخطوة لطلاب الجامعات في السعودية: كيفية كتابة خطة البحث، والتوثيق بنظام APA، والرسائل العلمية.',
  alternates: { canonical: `${SITE_URL}/ar/blog`, languages: { 'ar-SA': `${SITE_URL}/ar/blog`, 'en-GB': `${SITE_URL}/blog` } },
  openGraph: { title: 'أدلة الطلاب | FIZBS', url: `${SITE_URL}/ar/blog`, type: 'website', locale: 'ar_SA' },
};

export default function Page() {
  return <BlogIndex posts={AR_POSTS} locale="ar" />;
}
