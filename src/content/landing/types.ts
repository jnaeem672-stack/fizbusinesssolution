export interface LandingSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface LandingFaq {
  q: string;
  a: string;
}

export interface LandingContent {
  /** URL slug without leading slash, e.g. 'assignment-help-uk' */
  slug: string;
  locale: 'en' | 'ar';
  /** Browser/Google title, max ~60 characters, without the brand suffix */
  metaTitle: string;
  /** Google description, 140-155 characters */
  metaDescription: string;
  keywords: string[];
  /** Small label above the H1, 2-4 words */
  badge: string;
  h1: string;
  heroSubtitle: string;
  /** 3-4 short chips shown in the hero, 2-4 words each */
  highlights: string[];
  /** Opening paragraphs below the hero */
  intro: string[];
  /** Main body sections (H2 + paragraphs and/or bullets) */
  sections: LandingSection[];
  /** 6-8 FAQs, used for the FAQ accordion and FAQPage schema */
  faqs: LandingFaq[];
  ctaTitle: string;
  ctaText: string;
  /** Prefilled WhatsApp message for this page */
  whatsappMessage: string;
  /** Optional starting price for the Service schema (defaults to £20 per 1,000 words) */
  offer?: { price: string; description: string };
  /** Slugs of related landing pages for internal links (3-5) */
  related: string[];
}
