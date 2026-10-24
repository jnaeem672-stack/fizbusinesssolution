import { SAUDI_CITY_SLUGS } from '@/constants/arLinks';

/**
 * hreflang code for an Arabic page. Saudi-specific pages (the Saudi assignment page and the Saudi city
 * pages) say ar-SA; every other Arabic page serves Arabic readers in any country and says ar.
 * Both pages of a pair must use the same code, so English and Arabic pages call this helper.
 */
const SAUDI_SPECIFIC = new Set(['assignment-help-saudi-arabia', ...SAUDI_CITY_SLUGS]);

export function arabicHreflang(slug?: string): 'ar' | 'ar-SA' {
  return slug && SAUDI_SPECIFIC.has(slug) ? 'ar-SA' : 'ar';
}
