export const CONTACT_EMAIL = 'jnaeem672@gmail.com';

const defaultSubject = 'Learning support inquiry from FIZ Business Solutions website';
const defaultBody =
  'Hello,\n\nI would like to discuss ethical academic coaching or research support. I have completed the following work so far:\n\n';

export const MAILTO_URL = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(defaultSubject)}&body=${encodeURIComponent(defaultBody)}`;

export function buildMailtoUrl(subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const query = params.toString();
  return query ? `mailto:${CONTACT_EMAIL}?${query}` : `mailto:${CONTACT_EMAIL}`;
}
