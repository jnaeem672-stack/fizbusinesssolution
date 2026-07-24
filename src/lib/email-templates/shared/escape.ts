export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function formatMultiline(text: string): string {
  return escapeHtml(text).replace(/\n/g, '<br/>');
}

export function formatDateTime(value?: string): string {
  if (!value) return '—';
  try {
    return new Date(value).toLocaleString('en-GB', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: 'Europe/London',
    });
  } catch {
    return escapeHtml(value);
  }
}

export function generateRequestRef(): string {
  return `FIZ-${Date.now().toString(36).toUpperCase()}`;
}
