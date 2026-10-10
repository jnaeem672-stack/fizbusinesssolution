export type SampleCategoryId =
  | 'assignments-essays'
  | 'reports-case-studies'
  | 'dissertations-theses'
  | 'research-proposals'
  | 'data-analysis'
  | 'computing-it'
  | 'proofreading-editing';

export interface SampleCategory {
  id: SampleCategoryId;
  /** Short label used on filter chips and badges */
  label: string;
  /** One sentence shown on the category card */
  description: string;
  /** Main service landing page for this category (English slug) */
  service: string;
}

/** Content blocks that make up a sample section */
export type SampleBlock =
  | { type: 'p'; text: string }
  | { type: 'bullets'; items: string[] }
  | { type: 'table'; caption?: string; head: string[]; rows: string[][] }
  | { type: 'code'; title?: string; lang: 'sql' | 'text'; code: string }
  | { type: 'image'; src: string; alt: string; width: number; height: number; caption?: string }
  | { type: 'note'; text: string };

export interface SampleSection {
  /** H2 heading */
  heading: string;
  blocks: SampleBlock[];
}

export interface Sample {
  /** URL slug, served at /samples/{slug} */
  slug: string;
  category: SampleCategoryId;
  /** H1 shown on the page */
  title: string;
  /** Google title, max ~60 characters */
  metaTitle: string;
  /** Google description, 140-155 characters */
  metaDescription: string;
  keywords: string[];
  /** 1-2 sentence summary shown on cards and under the H1 */
  excerpt: string;
  /** ISO date */
  published: string;
  subject: string;
  level: string;
  /** e.g. '7 parts, 36 SQL tasks' */
  scope: string;
  tools: string[];
  /** Opening paragraphs */
  intro: string[];
  /** What the brief asked for, summarised in our own words */
  brief: string[];
  sections: SampleSection[];
  faqs: { q: string; a: string }[];
  /** 2-4 English landing page slugs */
  relatedServices: string[];
  /** Optional watermarked PDF preview stored in /public/samples */
  file?: { href: string; label: string; pages?: number };
}
