export interface ExpertArticle {
  /** URL slug, served at /experts/{slug} */
  slug: string;
  /** Google title, max ~60 characters */
  metaTitle: string;
  /** Google description, 140-155 characters */
  metaDescription: string;
  keywords: string[];
  /** H1 shown on the profile page, includes the expert name and main subject */
  h1: string;
  /** Short subtitle under the H1 */
  subtitle: string;
  /** 2-3 opening paragraphs */
  intro: string[];
  /** 4-6 sections (H2) about the subject area and how this expert helps */
  sections: { heading: string; paragraphs?: string[]; bullets?: string[] }[];
  /** 4-5 FAQs */
  faqs: { q: string; a: string }[];
  /** 2-4 related landing page slugs */
  related: string[];
}
