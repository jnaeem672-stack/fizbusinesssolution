/** Lightweight list of slugs that exist in both languages (used by the language switcher). */
export const AR_SLUGS = [
  'assignment-help-saudi-arabia',
  'dissertation-help-saudi-arabia',
  'assignment-help-riyadh',
  'assignment-help-jeddah',
  'assignment-help-dammam',
  'assignment-help-makkah',
  'mba-assignment-help',
  'research-proposal-help',
  'thesis-help',
  'spss-help',
  'phd-admission-scholarship-help',
];

/** Guides that exist in both languages with the same slug (the switcher links straight to the other version) */
export const BILINGUAL_GUIDE_SLUGS = [
  'human-vs-ai-academic-writing',
  'how-to-write-a-research-proposal',
  'quantitative-vs-qualitative-research',
  'apa-referencing-guide',
  'how-to-write-an-abstract',
];

export const EN_ONLY_FALLBACK: Record<string, string> = {
  'dissertation-help-saudi-arabia': '/dissertation-help-uk',
  // Arabic-only pages: send English readers to the closest English page
  '3ds-max-design-help': '/engineering-assignment-help',
  'autocad-help': '/engineering-assignment-help',
  'solidworks-help': '/engineering-assignment-help',
  'programming-help': '/computing-it-assignment-help',
  'gpa-calculator': '/tools/degree-classification-calculator',
  'student-services': '/assignment-help-saudi-arabia',
};

/** Returns the URL of the same page in the other language, or the other language's homepage. */
export function alternateLanguagePath(pathname: string): { href: string; toArabic: boolean } {
  const clean = pathname.replace(/\/+$/, '') || '/';
  // Blog: articles differ per language, so switch to the other language's blog index
  const guide = /^\/(?:ar\/)?blog\/([^/]+)$/.exec(clean)?.[1];
  if (clean === '/ar/blog' || clean.startsWith('/ar/blog/'))
    return { href: guide && BILINGUAL_GUIDE_SLUGS.includes(guide) ? `/blog/${guide}` : '/blog', toArabic: false };
  if (clean === '/blog' || clean.startsWith('/blog/'))
    return { href: guide && BILINGUAL_GUIDE_SLUGS.includes(guide) ? `/ar/blog/${guide}` : '/ar/blog', toArabic: true };
  if (clean === '/ar' || clean.startsWith('/ar/')) {
    const slug = clean === '/ar' ? '' : clean.slice(4);
    if (!slug) return { href: '/', toArabic: false };
    // Unknown or deeper Arabic addresses (for example a 404) go to the English homepage, never to a guessed URL
    return { href: EN_ONLY_FALLBACK[slug] ?? (AR_SLUGS.includes(slug) ? `/${slug}` : '/'), toArabic: false };
  }
  const slug = clean.slice(1);
  if (slug && AR_SLUGS.includes(slug)) return { href: `/ar/${slug}`, toArabic: true };
  return { href: '/ar', toArabic: true };
}
