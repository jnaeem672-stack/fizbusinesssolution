import type { SupportRequestFormData } from '@/types';
import { escapeHtml, formatMultiline, formatDateTime } from '../shared/escape';
import { wrapEmail } from '../shared/layout';
import {
  sectionTitle,
  infoBox,
  highlightCard,
  detailRow,
  tableSectionHeader,
  detailTable,
  attachmentList,
  statusBadge,
  metaRow,
  BRAND,
} from '../shared/components';

export interface AdminSupportRequestEmailOptions {
  data: SupportRequestFormData;
  requestRef: string;
  attachmentCount?: number;
}

export function adminSupportRequestEmail({
  data,
  requestRef,
  attachmentCount = 0,
}: AdminSupportRequestEmailOptions): string {
  const {
    fullName,
    email,
    countryCode,
    phone,
    studyCountry,
    supportTopic,
    department,
    subject,
    preferredDate,
    educationLevel,
    supportType,
    documentLength,
    references,
    currentProgress,
    learningGoals,
    academicIntegrityConfirmed,
    uploadedFiles = [],
  } = data;

  const safeName = escapeHtml(fullName);
  const safeTopic = escapeHtml(supportTopic);
  const fileCount = uploadedFiles.length;
  const attachedNote =
    attachmentCount > 0
      ? `<strong>${attachmentCount}</strong> file(s) are attached to this email. Links are also provided below.`
      : fileCount > 0
        ? 'Files could not be attached automatically — use the download links below.'
        : 'No files were uploaded with this request.';

  const body = `
    ${sectionTitle('📘 New Quote Request', `Reference: <strong style="color:${BRAND.primary};">${requestRef}</strong>`)}
    ${highlightCard('Support Topic', safeTopic)}
    ${metaRow([
      { label: 'Support Type', value: escapeHtml(supportType || '—') },
      { label: 'Preferred Date', value: preferredDate ? formatDateTime(preferredDate).split(',')[0] : 'Flexible' },
      { label: 'Status', value: statusBadge('New Lead', '#1e40af', '#dbeafe') },
    ])}
    ${infoBox(`<strong>${safeName}</strong> submitted a new quote request. Reply on WhatsApp quickly to convert this lead.`, 'warning')}
    ${detailTable(`
      ${tableSectionHeader('👤 Contact Details')}
      ${detailRow('Full Name', safeName)}
      ${detailRow('Email', `<a href="mailto:${escapeHtml(email)}" style="color:${BRAND.primary};text-decoration:none;font-weight:600;">${escapeHtml(email)}</a>`)}
      ${detailRow('WhatsApp', escapeHtml(`${countryCode || ''} ${phone}`.trim()))}
      ${detailRow('Study Country', studyCountry ? escapeHtml(studyCountry) : '—')}
      ${tableSectionHeader('📚 Request Details')}
      ${detailRow('Support Topic', safeTopic)}
      ${detailRow('Support Type', supportType ? escapeHtml(supportType) : '—')}
      ${detailRow('Department', department ? escapeHtml(department) : '—')}
      ${detailRow('Subject', subject ? escapeHtml(subject) : '—')}
      ${detailRow('Preferred Date', formatDateTime(preferredDate))}
      ${detailRow('Education Level', educationLevel ? escapeHtml(educationLevel) : '—')}
      ${detailRow('Document Length', documentLength ? escapeHtml(documentLength) : '—')}
      ${detailRow('Referencing Style', references ? escapeHtml(references) : '—')}
      ${detailRow('Current Progress', currentProgress ? formatMultiline(currentProgress) : '—')}
      ${detailRow('Learning Goals', learningGoals ? formatMultiline(learningGoals) : '—')}
      ${detailRow('Integrity Confirmation', academicIntegrityConfirmed ? 'Confirmed' : 'Not confirmed')}
      ${detailRow('Submitted At', formatDateTime(new Date().toISOString()))}
    `)}
    ${sectionTitle('📎 Uploaded Drafts or Supporting Files', attachedNote)}
    ${attachmentList(uploadedFiles, attachmentCount > 0)}
  `;

  return wrapEmail({
    title: `New Support Request: ${supportTopic}`,
    preheader: `[${requestRef}] Learning-support request from ${fullName}`,
    bodyContent: body,
  });
}
