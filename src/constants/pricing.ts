/**
 * Prices by currency. GBP is the base price list; Arabic pages show Saudi riyals and the UAE pages show
 * UAE dirhams, each at 5 times the GBP figure (rounded, owner-approved price list).
 */
export type Currency = 'GBP' | 'SAR' | 'AED';

export const CURRENCY_FACTOR: Record<Currency, number> = { GBP: 1, SAR: 5, AED: 5 };

/** Base prices in GBP */
export const BASE_PRICES = {
  assignment: 20,
  dissertation: 30,
  proofreading: { ug: 12, pg: 15, phd: 18 },
} as const;

/** UAE landing pages show prices in AED */
export const UAE_SLUGS = ['assignment-help-uae', 'assignment-help-dubai'];

export function currencyFor(slug: string | undefined, locale: 'en' | 'ar'): Currency {
  if (locale === 'ar') return 'SAR';
  if (slug && UAE_SLUGS.includes(slug)) return 'AED';
  return 'GBP';
}

/** Convert a GBP amount to the given currency */
export const inCurrency = (gbp: number, currency: Currency) => gbp * CURRENCY_FACTOR[currency];

/** Format a price, e.g. "£1,350", "AED 1,350" or (Arabic) "1,350 ريال" */
export function formatPrice(value: number, currency: Currency, locale: 'en' | 'ar' = 'en'): string {
  const n = value.toLocaleString('en-GB', { maximumFractionDigits: 0 });
  if (currency === 'GBP') return `£${n}`;
  if (locale === 'ar') return `${n} ${currency === 'SAR' ? 'ريال' : 'درهم'}`;
  return `${currency} ${n}`;
}
