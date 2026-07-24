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
    ${sectionTitle(`Request Received, ${safeName}!`, 'We will review your request for the most appropriate ethical form of support.')}
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
    ${infoBox('Our services are educational and developmental. We do not write assessed work, take examinations, fabricate data, or guarantee grades.', 'success')}
    ${sectionTitle('What Happens Next')}
    ${stepsList([
      'We review your request and any files against our Academic Integrity Policy.',
      'We recommend a suitable service such as coaching, draft feedback, proofreading, or research-methods tutoring.',
      'You receive a response with the proposed scope, timing, and fee.',
      'You remain the author and apply the guidance to your own work.',
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
