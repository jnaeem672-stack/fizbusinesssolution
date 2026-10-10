/** Official FIZBS social profiles. Used in the footer and in the site's Organization schema (sameAs). */
export const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://www.facebook.com/share/1C6KFy3srb/' },
  { label: 'Instagram', href: 'https://www.instagram.com/fisbusiness992/' },
] as const;

export const SOCIAL_URLS: string[] = SOCIAL_LINKS.map((s) => s.href);
