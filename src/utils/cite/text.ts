/** Text helpers shared by the autocite parsers (browser and server) */
import type { Person } from '../harvard';

const NAMED: Record<string, string> = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ndash: '-', mdash: '-', hellip: '...',
  lsquo: '‘', rsquo: '’', ldquo: '“', rdquo: '”', eacute: 'é', egrave: 'è', aacute: 'á', oacute: 'ó', uuml: 'ü', ouml: 'ö', auml: 'ä', ccedil: 'ç',
};

export function decodeEntities(s: string): string {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, code: string) => {
    if (code[0] === '#') {
      const n = code[1].toLowerCase() === 'x' ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      try {
        return Number.isFinite(n) && n > 0 ? String.fromCodePoint(n) : m;
      } catch {
        return m;
      }
    }
    return NAMED[code.toLowerCase()] ?? m;
  });
}

/** Strip HTML tags, decode entities, replace long dashes with hyphens and collapse whitespace */
export function cleanText(v: unknown): string {
  if (v === undefined || v === null) return '';
  const s = Array.isArray(v) ? String(v[0] ?? '') : String(v);
  return decodeEntities(s.replace(/<[^>]*>/g, ''))
    .replace(/[\u2010-\u2015]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
}

/** "SMITH" -> "Smith", "O'NEILL" -> "O'Neill"; leaves mixed case alone */
export function fixCaps(s: string): string {
  if (!s || s !== s.toUpperCase() || !/[A-Z]{2}/.test(s)) return s;
  return s.toLowerCase().replace(/(^|[\s'’-])([a-z])/g, (_m, p: string, c: string) => p + c.toUpperCase());
}

const PARTICLES = new Set(['van', 'von', 'der', 'den', 'de', 'da', 'das', 'dos', 'del', 'della', 'di', 'du', 'la', 'le', 'bin', 'ibn', 'al', 'el', 'ter', 'ten']);
const SUFFIX = /^(jr|sr|ii|iii|iv|phd|md|mba|dr|prof)\.?$/i;

/** Split a full name ("Mark N. K. Saunders" or "Saunders, Mark N. K.") into surname and given names */
export function splitName(full: string): Person {
  let s = cleanText(full).replace(/^(by|dr\.?|prof\.?|professor)\s+/i, '').trim();
  if (!s) return { surname: '', given: '' };
  if (s.includes(',')) {
    const [a, ...rest] = s.split(',');
    const b = rest.join(',').trim();
    if (b && !SUFFIX.test(b)) return { surname: fixCaps(a.trim()), given: fixCaps(b.replace(/,?\s*(jr|sr)\.?$/i, '').trim()) };
    s = a.trim();
  }
  const tokens = s.split(/\s+/).filter((t) => !SUFFIX.test(t));
  if (tokens.length <= 1) return { surname: fixCaps(tokens[0] ?? ''), given: '' };
  let i = tokens.length - 1;
  while (i > 1 && PARTICLES.has(tokens[i - 1]) && tokens[i - 1] === tokens[i - 1].toLowerCase()) i -= 1;
  return { surname: fixCaps(tokens.slice(i).join(' ')), given: fixCaps(tokens.slice(0, i).join(' ')) };
}

const ORG_WORDS =
  /\b(organi[sz]ation|association|institute|institution|university|college|school|council|department|ministry|society|agency|committee|commission|group|ltd|limited|inc|plc|llc|corporation|company|office|board|bank|foundation|trust|centre|center|federation|network|service|services|authority|government|nhs|news|media|press|team|staff|editors?|editorial|academy|unit|bureau|partnership|forum|alliance|programme|program|project|union|nations|club|cooperation|consortium|channel)\b/i;

/** Does this author look like an organisation rather than a person? */
export function isOrgName(name: string): boolean {
  const n = cleanText(name);
  if (!n) return false;
  if (ORG_WORDS.test(n)) return true;
  if (/\d/.test(n)) return true;
  // Acronyms such as WHO, OECD or CIPD
  if (/^[A-Z&]{2,8}$/.test(n)) return true;
  return n.split(/\s+/).length > 5;
}

const WORD_ORDINALS = [
  'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth',
  'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth', 'twentieth',
];

/** "8th ed." / "Eighth edition" -> "8"; first editions and unrecognised text -> "" */
export function parseEdition(v: unknown): string {
  const s = cleanText(v).toLowerCase();
  if (!s) return '';
  const num = /(\d+)\s*(st|nd|rd|th)?\b/.exec(s);
  let n = num ? parseInt(num[1], 10) : 0;
  if (!n) {
    const idx = WORD_ORDINALS.findIndex((w) => new RegExp(`\\b${w}\\b`).test(s));
    n = idx >= 0 ? idx + 1 : 0;
  }
  if (!/ed|edn|edition/.test(s) && !/^\d+$/.test(s)) return '';
  return n > 1 && n < 100 ? String(n) : '';
}

const MONTH_ABBR = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

/** Parse dates such as 2019-03-05T10:00Z, 2019/03/05, 5 March 2019, Mar 5, 2019 or 2019 */
export function parseLooseDate(v: unknown): { year: string; month: string; day: string } {
  const s = cleanText(v);
  const none = { year: '', month: '', day: '' };
  if (!s) return none;
  let m = /^(\d{4})(?:[-/.](\d{1,2})(?:[-/.](\d{1,2}))?)?/.exec(s);
  if (m) return { year: m[1], month: m[2] ? String(parseInt(m[2], 10)) : '', day: m[3] ? String(parseInt(m[3], 10)) : '' };
  const monthIdx = (word: string) => MONTH_ABBR.indexOf(word.slice(0, 3).toLowerCase());
  m = /(\d{1,2})(?:st|nd|rd|th)?\s+([A-Za-z]{3,})\.?,?\s+(\d{4})/.exec(s);
  if (m && monthIdx(m[2]) >= 0) return { year: m[3], month: String(monthIdx(m[2]) + 1), day: String(parseInt(m[1], 10)) };
  m = /([A-Za-z]{3,})\.?\s+(\d{1,2})(?:st|nd|rd|th)?,?\s+(\d{4})/.exec(s);
  if (m && monthIdx(m[1]) >= 0) return { year: m[3], month: String(monthIdx(m[1]) + 1), day: String(parseInt(m[2], 10)) };
  m = /([A-Za-z]{3,})\.?\s+(\d{4})/.exec(s);
  if (m && monthIdx(m[1]) >= 0) return { year: m[2], month: String(monthIdx(m[1]) + 1), day: '' };
  m = /(?:^|\D)(1[5-9]\d{2}|20\d{2})(?!\d)/.exec(s);
  return m ? { year: m[1], month: '', day: '' } : none;
}

/** Normalise a page range to "77-101" */
export function cleanPages(v: unknown): string {
  return cleanText(v).replace(/\s*-+\s*/g, '-');
}
