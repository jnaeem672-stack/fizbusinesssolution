import type { Metadata } from 'next';
import BlogIndex from '@/components/blog/BlogIndex';
import { AR_POSTS, postPath } from '@/content/blog';
import { AR_BLOG_HUB } from '@/content/blog/arHub';
import { SITE_URL } from '@/content/landing';
import { AR_SHARE_IMAGE } from '@/components/RootDocument';

export const metadata: Metadata = {
  title: { absolute: 'أدلة الطلاب: خطة البحث والتوثيق والرسائل العلمية | FIZBS' },
  description: 'أدلة مجانية بالعربية لطلاب الجامعات في السعودية: اختيار عنوان الرسالة، وخطة البحث، والإطار النظري، والبحث الكمي والنوعي، والملخص، والتوثيق بنظام APA.',
  alternates: { canonical: `${SITE_URL}/ar/blog`, languages: { ar: `${SITE_URL}/ar/blog`, 'en-GB': `${SITE_URL}/blog`, 'x-default': `${SITE_URL}/blog` } },
  openGraph: {
      images: [AR_SHARE_IMAGE], title: 'أدلة الطلاب | FIZBS', url: `${SITE_URL}/ar/blog`, type: 'website', locale: 'ar_SA' },
};

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'أدلة الطلاب بالعربية',
    url: `${SITE_URL}/ar/blog`,
    inLanguage: 'ar',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: AR_POSTS.map((post, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE_URL}${postPath(post)}`, name: post.title })),
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'ar',
    mainEntity: AR_BLOG_HUB.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <BlogIndex posts={AR_POSTS} locale="ar" hub={{ ...AR_BLOG_HUB, faqTitle: 'أسئلة شائعة عن الأدلة' }} />
    </>
  );
}
