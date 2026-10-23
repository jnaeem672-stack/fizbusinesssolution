import type { MetadataRoute } from 'next';
import { AR_LANDING_PAGES, EN_LANDING_PAGES, SITE_URL } from '@/content/landing';
import { EXPERTS } from '@/content/experts';
import { EN_POSTS, AR_POSTS, postPath } from '@/content/blog';
import { SAMPLES, samplePath } from '@/content/samples';
import { TOOLS, TOOLS_PATH, toolPath } from '@/content/tools';
import { GUIDE_GEO } from '@/content/blog/geo';
import { GUIDE_FIGURES } from '@/content/blog/figures';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  // lastmod is only given where we know when the content really changed (guides, samples and updated tools).
  // A build date on every page would tell Google nothing and can make it ignore lastmod altogether.
  const core: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/ar`, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${SITE_URL}/ar/gpa-calculator`, lastModified: new Date('2026-10-20'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/services`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/about`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/our-team`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/contact`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/terms`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/privacy-policy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/academic-integrity`, changeFrequency: 'yearly', priority: 0.4 },
  ];
  const landing: MetadataRoute.Sitemap = [
    ...EN_LANDING_PAGES.map((page) => ({
      url: `${SITE_URL}/${page.slug}`,
      changeFrequency: 'weekly' as const,
      priority: page.slug.startsWith('assignment-help-') && !['assignment-help-uk', 'assignment-help-saudi-arabia', 'assignment-help-uae', 'assignment-help-usa'].includes(page.slug) ? 0.8 : 0.9,
    })),
    ...AR_LANDING_PAGES.map((page) => ({
      url: `${SITE_URL}/ar/${page.slug}`,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
  ];
  const experts: MetadataRoute.Sitemap = EXPERTS.map((e) => ({
    url: `${SITE_URL}/experts/${e.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));
  const blog: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/ar/blog`, changeFrequency: 'weekly', priority: 0.7 },
    ...[...EN_POSTS, ...AR_POSTS].map((post) => ({
      url: `${SITE_URL}${postPath(post)}`,
      lastModified: new Date((post.locale === 'en' && GUIDE_GEO[post.slug]?.updated) || post.updated || post.published),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      ...(post.locale === 'en' && GUIDE_FIGURES[post.slug] ? { images: GUIDE_FIGURES[post.slug].map((f) => `${SITE_URL}${f.src}`) } : {}),
    })),
  ];
  const samples: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/samples`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/results`, changeFrequency: 'weekly', priority: 0.8 },
    ...SAMPLES.map((sample) => ({
      url: `${SITE_URL}${samplePath(sample)}`,
      lastModified: new Date(sample.published),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
  const tools: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}${TOOLS_PATH}`, changeFrequency: 'monthly', priority: 0.8 },
    ...TOOLS.map((tool) => ({
      url: `${SITE_URL}${toolPath(tool)}`,
      ...(tool.updated ? { lastModified: new Date(tool.updated) } : {}),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
  return [...core, ...landing, ...experts, ...blog, ...samples, ...tools];
}
