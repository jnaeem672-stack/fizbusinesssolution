import type { Metadata } from 'next';
import { SITE_URL } from '@/content/landing';
import { getTool, toolPath, type ToolId } from '@/content/tools';

export function toolMetadata(id: ToolId): Metadata {
  const tool = getTool(id)!;
  const url = `${SITE_URL}${toolPath(tool)}`;
  return {
    title: { absolute: tool.metaTitle },
    description: tool.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
      title: `${tool.name} | FIZBS`,
      description: tool.metaDescription,
      url,
      type: 'website',
    },
  };
}
