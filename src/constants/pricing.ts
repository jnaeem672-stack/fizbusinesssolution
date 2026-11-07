/**
 * Prices by currency. GBP is the base price list; the Gulf pages show a local currency rounded to an
 * owner-approved price list: SAR, AED and QAR at 5x the GBP figure, and KWD, OMR and BHD at 0.4x to 0.5x
 * (these Gulf dinars are high-value currencies, so the 5x list used for the other Gulf currencies would
 * badly over-price them).
 */
export type Currency = 'GBP' | 'SAR' | 'AED' | 'QAR' | 'KWD' | 'OMR' | 'BHD';

export const CURRENCY_FACTOR: Record<Currency, number> = { GBP: 1, SAR: 5, AED: 5, QAR: 5, KWD: 0.4, OMR: 0.5, BHD: 0.5 };

/** Base prices in GBP */
export const BASE_PRICES = {
  assignment: 20,
  dissertation: 30,
  proofreading: { ug: 12, pg: 15, phd: 18 },
} as const;

/** Landing pages that show prices in a Gulf currency instead of GBP */
export const UAE_SLUGS = ['assignment-help-uae', 'assignment-help-dubai'];
export const QAR_SLUGS = ['assignment-help-qatar'];
export const KWD_SLUGS = ['assignment-help-kuwait'];
export const OMR_SLUGS = ['assignment-help-oman'];
export const BHD_SLUGS = ['assignment-help-bahrain'];
/** Pages that show GBP even on their Arabic version (international-programme framing, e.g. Egypt, Tunisia). */
export const GBP_SLUGS = ['assignment-help-egypt', 'assignment-help-tunisia'];

export function currencyFor(slug: string | undefined, locale: 'en' | 'ar'): Currency {
  if (slug && QAR_SLUGS.includes(slug)) return 'QAR';
  if (slug && KWD_SLUGS.includes(slug)) return 'KWD';
  if (slug && OMR_SLUGS.includes(slug)) return 'OMR';
  if (slug && BHD_SLUGS.includes(slug)) return 'BHD';
  if (slug && UAE_SLUGS.includes(slug)) return 'AED';
  if (slug && GBP_SLUGS.includes(slug)) return 'GBP';
  if (locale === 'ar') return 'SAR';
  return 'GBP';
}

/** Convert a GBP amount to the given currency */
export const inCurrency = (gbp: number, currency: Currency) => gbp * CURRENCY_FACTOR[currency];

/** Arabic unit word per currency (SAR and QAR use the riyal, KWD the dinar, AED the dirham) */
export const AR_CURRENCY_WORD: Partial<Record<Currency, string>> = {
  SAR: 'ريال',
  AED: 'درهم',
  QAR: 'ريال قطري',
  KWD: 'دينار كويتي',
  OMR: 'ريال عماني',
  BHD: 'دينار بحريني',
};

/** Format a price, e.g. "£1,350", "QAR 1,350" or (Arabic) "1,350 ريال قطري" */
export function formatPrice(value: number, currency: Currency, locale: 'en' | 'ar' = 'en'): string {
  const n = value.toLocaleString('en-GB', { maximumFractionDigits: 0 });
  if (currency === 'GBP') return `£${n}`;
  if (locale === 'ar') return `${n} ${AR_CURRENCY_WORD[currency] ?? currency}`;
  return `${currency} ${n}`;
}
