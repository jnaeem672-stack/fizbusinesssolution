/** Lightweight list of slugs that exist in both languages (used by the language switcher). */
export const AR_SLUGS = [
  'assignment-help-saudi-arabia',
  'dissertation-help-saudi-arabia',
  'assignment-help-riyadh',
  'assignment-help-jeddah',
  'assignment-help-dammam',
  'phd-admission-scholarship-help',
];

export const EN_ONLY_FALLBACK: Record<string, string> = {
  'dissertation-help-saudi-arabia': '/dissertation-help-uk',
};

/** Returns the URL of the same page in the other language, or the other language's homepage. */
export function alternateLanguagePath(pathname: string): { href: string; toArabic: boolean } {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (clean === '/ar' || clean.startsWith('/ar/')) {
    const slug = clean === '/ar' ? '' : clean.slice(4);
    if (!slug) return { href: '/', toArabic: false };
    return { href: EN_ONLY_FALLBACK[slug] ?? `/${slug}`, toArabic: false };
  }
  const slug = clean.slice(1);
  if (slug && AR_SLUGS.includes(slug)) return { href: `/ar/${slug}`, toArabic: true };
  return { href: '/ar', toArabic: true };
}
