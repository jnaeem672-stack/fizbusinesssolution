import type { UserSupportRequestConfirmationData } from '@/types';
import { escapeHtml, formatDateTime } from '../shared/escape';
import { wrapEmail } from '../shared/layout';
import {
  sectionTitle,
  infoBox,
  highlightCard,
  detailRow,
  detailTable,
  statusBadge,
  stepsList,
  metaRow,
  BRAND,
} from '../shared/components';

export interface UserSupportRequestConfirmationOptions extends UserSupportRequestConfirmationData {
  requestRef: string;
}

export function userSupportRequestConfirmation({
  fullName,
  supportTopic,
  preferredDate,
  requestRef,
}: UserSupportRequestConfirmationOptions): string {
  const safeName = escapeHtml(fullName);
  const safeTopic = escapeHtml(supportTopic);

  const body = `
    ${sectionTitle(`Request Received, ${safeName}!`, 'Thank you for choosing FIZBS. Our team is reviewing your requirements now.')}
    ${highlightCard('Your Support Topic', safeTopic)}
    ${metaRow([
      { label: 'Request Ref', value: requestRef },
      { label: 'Preferred Date', value: preferredDate ? formatDateTime(preferredDate).split(',')[0] : 'Flexible' },
      { label: 'Status', value: statusBadge('Under Review', '#1e40af', '#dbeafe') },
    ])}
    ${detailTable(`
      ${detailRow('Support Topic', safeTopic)}
      ${detailRow('Preferred Date', formatDateTime(preferredDate))}
      ${detailRow('Reference ID', `<strong style="color:${BRAND.primary};">${requestRef}</strong>`)}
    `)}
    ${infoBox('🎁 First order? You get up to 10% off. For the fastest reply, message us on WhatsApp with your reference ID.', 'success')}
    ${sectionTitle('What Happens Next')}
    ${stepsList([
      'Our team reviews your requirements and any files you attached.',
      'We match you with a qualified expert in your subject.',
      'You receive a clear price and timeline, usually on WhatsApp.',
      'Once confirmed, your expert starts work and keeps you updated until your deadline.',
    ])}
    <p style="margin:24px 0 0;color:${BRAND.muted};font-size:14px;line-height:1.7;">
      Questions? Reply to this email or message us on WhatsApp.<br/><br/>
      <strong style="color:${BRAND.navy};">The FIZ Business Solutions Team</strong>
    </p>
  `;

  return wrapEmail({
    title: 'Support Request Received — FIZ Business Solutions',
    preheader: `[${requestRef}] Your learning-support request is being reviewed`,
    bodyContent: body,
  });
}
