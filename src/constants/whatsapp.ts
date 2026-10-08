export const WHATSAPP_PHONE = '971543800388';
export const WHATSAPP_NUMBER = '+971 54 380 0388';
export const WHATSAPP_MESSAGE =
  'Hello! I would like to discuss expert academic help or research support with FIZ Business Solutions.';

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export function buildWhatsAppUrl(message = WHATSAPP_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
