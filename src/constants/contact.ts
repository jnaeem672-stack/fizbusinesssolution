export const CONTACT_EMAIL = 'info@fizbusinessolutions.com';

/** UK registered contact address and phone (kept consistent with the Google Business Profile NAP) */
export const UK_ADDRESS = {
  street: '77 St Leonards Rd',
  locality: 'Windsor',
  region: 'Berkshire',
  postalCode: 'SL4 3BZ',
  country: 'United Kingdom',
  countryCode: 'GB',
} as const;
/** One-line display form, e.g. for the footer */
export const UK_ADDRESS_LINE = '77 St Leonards Rd, Windsor, Berkshire SL4 3BZ, United Kingdom';
/** UK phone, display and E.164 forms */
export const UK_PHONE_DISPLAY = '01753 620899';
export const UK_PHONE_E164 = '+441753620899';
export const UK_TEL_URL = `tel:${UK_PHONE_E164}`;

const defaultSubject = 'Learning support inquiry from FIZ Business Solutions website';
const defaultBody =
  'Hello,\n\nI would like to discuss expert academic help or research support. I have completed the following work so far:\n\n';

export const MAILTO_URL = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(defaultSubject)}&body=${encodeURIComponent(defaultBody)}`;

export function buildMailtoUrl(subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const query = params.toString();
  return query ? `mailto:${CONTACT_EMAIL}?${query}` : `mailto:${CONTACT_EMAIL}`;
}
