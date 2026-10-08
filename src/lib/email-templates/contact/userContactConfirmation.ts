import type { UserContactConfirmationData } from '@/types';
import { escapeHtml } from '../shared/escape';
import { wrapEmail } from '../shared/layout';
import { sectionTitle, infoBox, stepsList, BRAND } from '../shared/components';

export function userContactConfirmation({ name }: UserContactConfirmationData): string {
  const safeName = escapeHtml(name);

  const body = `
    ${sectionTitle(`Thank You, ${safeName}!`, 'Your message has been delivered to our support team.')}
    <p style="margin:0 0 20px;color:${BRAND.muted};font-size:15px;line-height:1.8;">
      We have received your inquiry and aim to reply within
      <strong style="color:${BRAND.navy};">24 hours</strong>.
    </p>
    ${infoBox('Need assignment or dissertation help? Send us your subject, word count and deadline on WhatsApp for a quick quote.', 'success')}
    ${sectionTitle('What to Expect')}
    ${stepsList([
      'Our team reviews your message.',
      'We match your request with the right subject expert.',
      'You receive a clear reply with the next steps.',
    ])}
    <p style="margin:28px 0 0;color:${BRAND.muted};font-size:14px;line-height:1.7;">
      Best regards,<br/>
      <strong style="color:${BRAND.navy};">The FIZ Business Solutions Team</strong>
    </p>
  `;

  return wrapEmail({
    title: 'We Received Your Message',
    preheader: 'Thank you for contacting FIZ Business Solutions — we will reply soon',
    bodyContent: body,
  });
}
