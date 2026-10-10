import type { MetadataRoute } from 'next';
import { AR_LANDING_PAGES, EN_LANDING_PAGES, SITE_URL } from '@/content/landing';
import { EXPERTS } from '@/content/experts';
import { EN_POSTS, AR_POSTS, postPath } from '@/content/blog';
import { SAMPLES, samplePath } from '@/content/samples';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const core: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/ar`, lastModified, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${SITE_URL}/services`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/our-team`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/terms`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/privacy-policy`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
  ];
  const landing: MetadataRoute.Sitemap = [
    ...EN_LANDING_PAGES.map((page) => ({
      url: `${SITE_URL}/${page.slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: page.slug.startsWith('assignment-help-') && !['assignment-help-uk', 'assignment-help-saudi-arabia'].includes(page.slug) ? 0.8 : 0.9,
    })),
    ...AR_LANDING_PAGES.map((page) => ({
      url: `${SITE_URL}/ar/${page.slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
  ];
  const experts: MetadataRoute.Sitemap = EXPERTS.map((e) => ({
    url: `${SITE_URL}/experts/${e.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));
  const blog: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/blog`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/ar/blog`, lastModified, changeFrequency: 'weekly', priority: 0.7 },
    ...[...EN_POSTS, ...AR_POSTS].map((post) => ({
      url: `${SITE_URL}${postPath(post)}`,
      lastModified: new Date(post.published),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
  const samples: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/samples`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/results`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    ...SAMPLES.map((sample) => ({
      url: `${SITE_URL}${samplePath(sample)}`,
      lastModified: new Date(sample.published),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
  return [...core, ...landing, ...experts, ...blog, ...samples];
}
