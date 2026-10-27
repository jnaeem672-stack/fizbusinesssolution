/** Official FIZBS social profiles. Used in the footer and in the site's Organization schema (sameAs). */
export const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://www.facebook.com/share/1C6KFy3srb/' },
  { label: 'Instagram', href: 'https://www.instagram.com/fisbusiness992/' },
] as const;

export const SOCIAL_URLS: string[] = SOCIAL_LINKS.map((s) => s.href);

/**
 * Personal profiles of team members, used as Person sameAs in the schema (not shown in the footer),
 * so search engines and AI assistants can connect the person across sites. Only profiles the person controls.
 */
export const PERSON_PROFILES: Record<string, string[]> = {
  'sajjad-akbar-ali': [
    'https://www.linkedin.com/in/sajjad-akbar-ali-63150517b/',
    'https://www.quora.com/profile/Sajjad-Akbar-53',
    'https://nathre.com/writers/sajjad-akbarali',
  ],
};
