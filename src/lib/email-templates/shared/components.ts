import type { InfoBoxType } from '@/types';
import type { UploadedFile } from '@/types';
import { escapeHtml } from './escape';
import { isAllowedUploadUrl } from '@/lib/uploadSecurity';

export const BRAND = {
  primary: '#C41E3A',
  primaryLight: '#fef2f4',
  navy: '#0f1f3d',
  navyLight: '#1a2f5e',
  whatsapp: '#25D366',
  muted: '#64748b',
  border: '#eef1f5',
} as const;

const INFO_BOX_COLORS: Record<InfoBoxType, { bg: string; border: string; text: string }> = {
  info: { bg: '#eff6ff', border: '#3b82f6', text: '#1e40af' },
  success: { bg: '#f0fdf4', border: '#22c55e', text: '#166534' },
  warning: { bg: '#fef3c7', border: '#f59e0b', text: '#92400e' },
};

export function sectionTitle(text: string, subtitle?: string): string {
  return `
    <div style="margin-bottom:24px;">
      <h2 style="margin:0;color:${BRAND.navy};font-size:22px;font-weight:800;line-height:1.3;">${text}</h2>
      ${subtitle ? `<p style="margin:8px 0 0;color:${BRAND.muted};font-size:14px;line-height:1.6;">${subtitle}</p>` : ''}
    </div>`;
}

export function infoBox(text: string, type: InfoBoxType = 'info'): string {
  const c = INFO_BOX_COLORS[type];
  return `<div style="background:${c.bg};border-left:4px solid ${c.border};padding:16px 20px;border-radius:0 10px 10px 0;margin:20px 0;">
    <p style="margin:0;color:${c.text};font-size:14px;line-height:1.7;">${text}</p>
  </div>`;
}

export function statusBadge(label: string, color: string, bg: string): string {
  return `<span style="display:inline-block;background:${bg};color:${color};padding:5px 14px;border-radius:999px;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.5px;">${label}</span>`;
}

export function highlightCard(title: string, value: string, accent = BRAND.primary): string {
  return `
    <div style="background:linear-gradient(135deg,${BRAND.navy} 0%,${BRAND.navyLight} 100%);border-radius:14px;padding:24px;margin:0 0 24px;text-align:center;">
      <p style="margin:0 0 8px;color:rgba(255,255,255,0.65);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;">${title}</p>
      <p style="margin:0;color:#ffffff;font-size:18px;font-weight:800;line-height:1.4;">${value}</p>
      <div style="width:48px;height:3px;background:${accent};border-radius:2px;margin:16px auto 0;"></div>
    </div>`;
}

export function detailRow(label: string, value?: string): string {
  if (!value) return '';
  return `
    <tr>
      <td style="padding:14px 18px;border-bottom:1px solid ${BRAND.border};color:${BRAND.navyLight};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.6px;width:38%;vertical-align:top;">${label}</td>
      <td style="padding:14px 18px;border-bottom:1px solid ${BRAND.border};color:#334155;font-size:14px;line-height:1.6;vertical-align:top;">${value}</td>
    </tr>`;
}

export function tableSectionHeader(title: string): string {
  return `
    <tr>
      <td colspan="2" style="background:${BRAND.navy};color:#ffffff;padding:12px 18px;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:1.2px;">
        ${title}
      </td>
    </tr>`;
}

export function detailTable(rows: string): string {
  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid ${BRAND.border};border-radius:14px;overflow:hidden;margin:8px 0 24px;">
      ${rows}
    </table>`;
}

export function attachmentList(files: UploadedFile[] = [], attachedToEmail = false): string {
  if (!files.length) {
    return `<p style="margin:0;color:${BRAND.muted};font-size:14px;font-style:italic;">No files uploaded</p>`;
  }

  const safeFiles = files.filter((file) => isAllowedUploadUrl(file.url));
  if (!safeFiles.length) {
    return `<p style="margin:0;color:${BRAND.muted};font-size:14px;font-style:italic;">No valid files uploaded</p>`;
  }

  const items = safeFiles
    .map(
      (file) => `
      <tr>
        <td style="padding:12px 16px;border-bottom:1px solid ${BRAND.border};">
          <table role="presentation" cellspacing="0" cellpadding="0" width="100%">
            <tr>
              <td width="40" style="vertical-align:middle;">
                <div style="width:36px;height:36px;background:${BRAND.primaryLight};border-radius:10px;text-align:center;line-height:36px;font-size:16px;">📎</div>
              </td>
              <td style="vertical-align:middle;padding-left:12px;">
                <p style="margin:0;color:${BRAND.navy};font-size:14px;font-weight:700;">${escapeHtml(file.name)}</p>
                <p style="margin:4px 0 0;color:${BRAND.muted};font-size:12px;">${escapeHtml(file.size)}${attachedToEmail ? ' · Attached to this email' : ''}</p>
              </td>
              <td align="right" style="vertical-align:middle;">
                <a href="${escapeHtml(file.url)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:${BRAND.primary};color:#ffffff;text-decoration:none;padding:8px 14px;border-radius:8px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">View</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>`
    )
    .join('');

  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid ${BRAND.border};border-radius:14px;overflow:hidden;">
      ${items}
    </table>`;
}

export function stepsList(steps: string[]): string {
  const items = steps
    .map(
      (step, i) => `
      <tr>
        <td style="padding:12px 0;vertical-align:top;width:32px;">
          <div style="width:24px;height:24px;background:${BRAND.primary};color:#fff;border-radius:50%;text-align:center;line-height:24px;font-size:12px;font-weight:800;">${i + 1}</div>
        </td>
        <td style="padding:12px 0 12px 12px;color:#334155;font-size:14px;line-height:1.6;vertical-align:top;">${step}</td>
      </tr>`
    )
    .join('');

  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0">${items}</table>`;
}

export function metaRow(items: { label: string; value: string }[]): string {
  const cells = items
    .map(
      (item) => `
      <td align="center" style="padding:16px 8px;background:#f8fafc;border:1px solid ${BRAND.border};">
        <p style="margin:0 0 4px;color:${BRAND.muted};font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">${item.label}</p>
        <p style="margin:0;color:${BRAND.navy};font-size:13px;font-weight:800;">${item.value}</p>
      </td>`
    )
    .join('');

  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-radius:12px;overflow:hidden;margin:0 0 24px;"><tr>${cells}</tr></table>`;
}
