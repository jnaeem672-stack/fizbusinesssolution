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
    ${infoBox('For learning support, tell us what you have completed so far and which skill or challenge you want help with.', 'success')}
    ${sectionTitle('What to Expect')}
    ${stepsList([
      'Our team reviews your message and identifies the appropriate support area.',
      'We check that the request is compatible with academic-integrity requirements.',
      'You receive a clear reply explaining the next step.',
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
