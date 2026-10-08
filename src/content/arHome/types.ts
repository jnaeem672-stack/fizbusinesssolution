export interface ArHomeCard {
  title: string;
  desc: string;
}

export interface ArHomeContent {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  hero: {
    badge: string;
    trustBadge: string;
    h1Main: string;
    h1Highlight: string;
    /** 4-5 short rotating lines under the H1 */
    rotating: string[];
    subtitle: string;
    /** 6 short feature chips */
    features: string[];
    priceButton: string;
    whatsappButton: string;
  };
  stats: { value: string; label: string }[];
  universities: { title: string; subtitle: string; note: string };
  services: { badge: string; title: string; subtitle: string; cardCta: string; cards: ArHomeCard[] };
  why: { badge: string; title: string; subtitle: string; cards: ArHomeCard[] };
  how: { badge: string; title: string; subtitle: string; steps: ArHomeCard[] };
  promise: { badge: string; title: string; subtitle: string; cards: ArHomeCard[]; cta: string };
  faq: { badge: string; title: string; subtitle: string; items: { q: string; a: string }[] };
  cta: { badge: string; title: string; text: string; button: string };
  whatsappMessage: string;
}
