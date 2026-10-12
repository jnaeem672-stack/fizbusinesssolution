/**
 * First-touch lead source for the current browser session (search engine, Google Ads, AI assistant, social,
 * referral or direct). Stored in sessionStorage and sent only with a quote request, so each lead email
 * shows how the student found the website. Independent of the Google Ads tag.
 */
export interface LeadSource {
  channel: string;
  detail: string;
  landing: string;
}

const KEY = 'fizbs-lead-source';
const AI = /(chatgpt|openai|perplexity|gemini|bard|copilot|claude|anthropic|deepseek|you\.com|poe\.com|meta\.ai|grok)/i;
const SEARCH = /(^|\.)(bing\.com|duckduckgo\.com|yahoo\.|yandex\.|ecosia\.org|baidu\.com)/i;
const SOCIAL = /(facebook\.com|fb\.com|instagram\.com|linkedin\.com|lnkd\.in|t\.co$|twitter\.com|x\.com$|pinterest\.|youtube\.com|reddit\.com|quora\.com|tiktok\.com|snapchat\.com|whatsapp\.com)/i;

export function classifyLeadSource(referrer: string, search: string, ownHost: string): Omit<LeadSource, 'landing'> {
  const params = new URLSearchParams(search);
  const utmSource = params.get('utm_source') || '';
  const utmMedium = params.get('utm_medium') || '';
  const utmCampaign = params.get('utm_campaign') || '';
  let host = '';
  try {
    host = referrer ? new URL(referrer).hostname.replace(/^www\./, '') : '';
  } catch {
    host = '';
  }
  if (host === ownHost.replace(/^www\./, '')) host = '';

  if (params.has('gclid') || params.has('gbraid') || params.has('wbraid') || /^(cpc|ppc|paid)/i.test(utmMedium)) {
    return { channel: 'Google Ads', detail: utmCampaign || (params.has('gclid') ? 'auto-tagged click' : utmSource) };
  }
  if (AI.test(utmSource) || AI.test(host)) return { channel: 'AI assistant', detail: utmSource || host };
  if (utmSource) return { channel: 'Campaign', detail: [utmSource, utmMedium, utmCampaign].filter(Boolean).join(' / ') };
  if (/(^|\.)google\./i.test(host)) return { channel: 'Google search', detail: host };
  if (SEARCH.test(host)) return { channel: 'Other search engine', detail: host };
  if (SOCIAL.test(host)) return { channel: 'Social media', detail: host };
  if (host) return { channel: 'Referral', detail: host };
  return { channel: 'Direct', detail: 'typed the address, a bookmark or an app' };
}

/** Record the first touch of this session (call once on page load). */
export function captureLeadSource(): void {
  try {
    if (window.sessionStorage.getItem(KEY)) return;
    const source: LeadSource = {
      ...classifyLeadSource(document.referrer, window.location.search, window.location.hostname),
      landing: window.location.pathname,
    };
    window.sessionStorage.setItem(KEY, JSON.stringify(source));
  } catch {
    /* storage unavailable: the form simply sends no source */
  }
}

export function getLeadSource(): LeadSource | undefined {
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return undefined;
    const v = JSON.parse(raw);
    if (v && typeof v.channel === 'string' && typeof v.detail === 'string' && typeof v.landing === 'string') return v;
  } catch {
    /* ignore */
  }
  return undefined;
}
