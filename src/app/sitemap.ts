import type { MetadataRoute } from 'next';
import { AR_LANDING_PAGES, EN_LANDING_PAGES, SITE_URL } from '@/content/landing';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const core: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/services`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
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
  return [...core, ...landing];
}
