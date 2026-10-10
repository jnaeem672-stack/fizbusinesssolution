export interface BlogSection {
  /** H2 heading */
  heading: string;
  paragraphs?: string[];
  /** Unordered list */
  bullets?: string[];
  /** Ordered (numbered) list, e.g. steps */
  steps?: string[];
  /** Optional H3 sub-sections inside this section */
  subsections?: { heading: string; paragraphs?: string[]; bullets?: string[] }[];
  /** Optional highlighted tip / example box */
  tip?: string;
}

export interface BlogPost {
  /** URL slug, served at /blog/{slug} (en) or /ar/blog/{slug} (ar) */
  slug: string;
  locale: 'en' | 'ar';
  /** H1 shown on the page */
  title: string;
  /** Google title, max ~60 characters */
  metaTitle: string;
  /** Google description, 140-155 characters */
  metaDescription: string;
  keywords: string[];
  /** Short category label, e.g. 'Dissertation', 'Referencing' */
  category: string;
  /** 1-2 sentence summary shown on the blog index card */
  excerpt: string;
  /** ISO date */
  published: string;
  /** Opening paragraphs */
  intro: string[];
  sections: BlogSection[];
  /** 4-6 FAQs (FAQPage schema) */
  faqs: { q: string; a: string }[];
  /** 2-4 landing page slugs to link to as related services (must exist for the same locale or English) */
  relatedServices: string[];
}
