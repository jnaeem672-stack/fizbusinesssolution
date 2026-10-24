// TEMPORARY diagnostic (24 Oct 2026): shows which request headers carry the visited host name,
// so we can see why www requests from Googlebot are not redirected. Remove after the check.
// Client IP addresses are never shown; unrelated header values are hidden.
export const dynamic = 'force-dynamic';

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function GET(request: Request) {
  const lines: string[] = [];
  request.headers.forEach((value, name) => {
    const n = name.toLowerCase();
    if (n === 'cookie' || n === 'authorization') return;
    const isIp =
      n === 'x-forwarded-for' || n === 'x-real-ip' || n.includes('client-ip') || n === 'cf-connecting-ip' || n === 'true-client-ip';
    const relevant =
      n.includes('host') || n.includes('forward') || n === 'via' || n === 'user-agent' || n.startsWith('x-hcdn') ||
      n.startsWith('cdn') || n.includes('proto') || n.includes('scheme') || /fizbusinessolutions/i.test(value);
    let shown = '(hidden)';
    if (isIp) shown = '(ip hidden)';
    else if (relevant) shown = value.replace(/for=[^;,]+/gi, 'for=(hidden)');
    lines.push(`${n}: ${shown}`);
  });
  lines.sort();
  lines.push('', `request.url: ${request.url}`);
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex, nofollow"><title>Host check</title></head><body><pre>${escapeHtml(lines.join('\n'))}</pre></body></html>`;
  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store',
      'x-robots-tag': 'noindex, nofollow',
    },
  });
}
