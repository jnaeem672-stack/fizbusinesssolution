import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/content/landing';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    // ?_rsc= requests are Next.js navigation data, not pages: every page's HTML already carries its
    // content, and in Oct 2026 they were 73% of Googlebot's requests to this site (crawl stats).
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/*?_rsc=', '/*&_rsc='] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
