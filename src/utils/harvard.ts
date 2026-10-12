/**
 * Harvard reference formatting (Cite Them Right style, 12th edition conventions:
 * no place of publication, "edn", "(eds)", "Available at:", "(Accessed: 12 October 2026)").
 */
export type SourceType = 'book' | 'chapter' | 'journal' | 'website' | 'report';

export interface Person {
  surname: string;
  given: string;
}

export interface SourceInput {
  type: SourceType;
  /** People authors (ignored when org is set) */
  authors: Person[];
  /** Organisation as author */
  org: string;
  year: string;
  noDate: boolean;
  /** Book title, chapter title, article title, page title or report title */
  title: string;
  /** Book title (chapter) or journal name (journal) */
  container: string;
  editors: Person[];
  edition: string;
  publisher: string;
  volume: string;
  issue: string;
  pages: string;
  url: string;
  /** ISO date yyyy-mm-dd */
  accessed: string;
  /** Page number(s) for the in-text citation */
  citePage: string;
}

export interface Segment {
  text: string;
  italic?: boolean;
}

export interface Formatted {
  reference: Segment[];
  parenthetical: Segment[];
  narrative: Segment[];
  sortKey: string;
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function formatDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!m) return '';
  const month = MONTHS[Number(m[2]) - 1];
  if (!month) return '';
  return `${Number(m[3])} ${month} ${m[1]}`;
}

export function initials(given: string): string {
  return given
    .split(/[\s.]+/)
    .filter(Boolean)
    .map((token) =>
      token
        .split('-')
        .filter(Boolean)
        .map((part) => `${part[0].toLocaleUpperCase('en-GB')}.`)
        .join('-'),
    )
    .join('');
}

const clean = (s: string) => s.trim().replace(/\s+/g, ' ');

function personName(p: Person): string {
  const surname = clean(p.surname);
  const ini = initials(p.given);
  return ini ? `${surname}, ${ini}` : surname;
}

export function joinNames(names: string[]): string {
  if (names.length <= 1) return names[0] ?? '';
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
}

function ordinal(n: number): string {
  const v = n % 100;
  if (v >= 11 && v <= 13) return `${n}th`;
  return `${n}${['th', 'st', 'nd', 'rd'][n % 10] ?? 'th'}`;
}

export function formatEdition(edition: string): string {
  const e = clean(edition).replace(/\s+(edn\.?|edition|ed\.?)$/i, '');
  if (!e) return '';
  const n = parseInt(e, 10);
  if (/^\d+(st|nd|rd|th)?$/i.test(e)) return n > 1 ? `${ordinal(n)} edn.` : '';
  return `${e.charAt(0).toUpperCase()}${e.slice(1)} edn.`;
}

export function formatPages(pages: string): string {
  const p = clean(pages).replace(/^pp?\.\s*/i, '').replace(/\s*[‐-―-]+\s*/g, '-');
  if (!p) return '';
  return p.includes('-') ? `pp. ${p}` : `p. ${p}`;
}

export function normaliseUrl(url: string): string {
  const u = url.trim();
  if (!u) return '';
  const doi = /^(?:doi:\s*|https?:\/\/(?:dx\.)?doi\.org\/)?(10\.\d{4,9}\/\S+)$/i.exec(u);
  if (doi) return `https://doi.org/${doi[1]}`;
  return u;
}

/** Add a full stop unless the text already ends with terminal punctuation */
const stop = (s: string) => (/[.?!]$/.test(s) ? '' : '.');

export function formatSource(src: SourceInput): Formatted {
  const people = src.authors.filter((a) => clean(a.surname));
  const org = clean(src.org);
  const year = src.noDate ? 'no date' : clean(src.year) || 'no date';
  const title = clean(src.title);
  const container = clean(src.container);
  const publisher = clean(src.publisher);
  const edition = formatEdition(src.edition);
  const pages = formatPages(src.pages);
  const url = normaliseUrl(src.url);
  const accessed = formatDate(src.accessed);

  const hasAuthor = Boolean(org || people.length);
  const authorText = org || joinNames(people.map(personName));

  // Title as it appears in the reference: italic for standalone works, quoted for parts of a larger work
  const titleIsPart = src.type === 'journal' || src.type === 'chapter';
  const titleSeg: Segment[] = titleIsPart ? [{ text: `'${title}'` }] : [{ text: title, italic: true }];

  const ref: Segment[] = [];
  if (hasAuthor) {
    ref.push({ text: `${authorText} (${year}) ` }, ...titleSeg);
  } else {
    ref.push(...titleSeg, { text: ` (${year})` });
  }

  const availability = () => {
    if (!url) return '';
    return ` Available at: ${url}${accessed ? ` (Accessed: ${accessed})` : ''}.`;
  };

  switch (src.type) {
    case 'book': {
      ref.push({ text: hasAuthor ? stop(title) : '.' });
      if (edition) ref.push({ text: ` ${edition}` });
      if (publisher) ref.push({ text: ` ${publisher}${stop(publisher)}` });
      if (url) ref.push({ text: availability() });
      break;
    }
    case 'chapter': {
      const eds = src.editors.filter((e) => clean(e.surname));
      ref.push({ text: ', in ' });
      if (eds.length) ref.push({ text: `${joinNames(eds.map(personName))} (${eds.length > 1 ? 'eds' : 'ed.'}) ` });
      ref.push({ text: container, italic: true }, { text: stop(container) });
      if (edition) ref.push({ text: ` ${edition}` });
      if (publisher && pages) ref.push({ text: ` ${publisher}, ${pages}.` });
      else if (publisher) ref.push({ text: ` ${publisher}${stop(publisher)}` });
      else if (pages) ref.push({ text: ` ${pages}.` });
      break;
    }
    case 'journal': {
      ref.push({ text: ', ' }, { text: container, italic: true });
      const vol = clean(src.volume);
      const iss = clean(src.issue);
      if (vol || iss) ref.push({ text: `, ${vol}${iss ? `(${iss})` : ''}` });
      if (pages) ref.push({ text: `, ${pages}` });
      ref.push({ text: '.' });
      if (url) ref.push({ text: availability() });
      break;
    }
    case 'website': {
      ref.push({ text: hasAuthor ? stop(title) : '.' });
      if (url) ref.push({ text: availability() });
      break;
    }
    case 'report': {
      ref.push({ text: hasAuthor ? stop(title) : '.' });
      if (edition) ref.push({ text: ` ${edition}` });
      if (publisher && publisher.toLowerCase() !== org.toLowerCase()) ref.push({ text: ` ${publisher}${stop(publisher)}` });
      if (url) ref.push({ text: availability() });
      break;
    }
  }

  // In-text citation
  const surnames = people.map((p) => clean(p.surname));
  let who: Segment[];
  if (org) who = [{ text: org }];
  else if (surnames.length >= 4) who = [{ text: `${surnames[0]} et al.` }];
  else if (surnames.length) who = [{ text: joinNames(surnames) }];
  else who = titleIsPart ? [{ text: `'${title}'` }] : [{ text: title, italic: true }];
  const citePage = formatPages(src.citePage);
  const tail = `${year}${citePage ? `, ${citePage}` : ''}`;

  const sortKey = (hasAuthor ? authorText : title).replace(/^['"]/, '').toLowerCase() + ` ${year}`;

  return {
    reference: mergeSegments(ref),
    parenthetical: mergeSegments([{ text: '(' }, ...who, { text: `, ${tail})` }]),
    narrative: mergeSegments([...who, { text: ` (${tail})` }]),
    sortKey,
  };
}

function mergeSegments(segs: Segment[]): Segment[] {
  const out: Segment[] = [];
  for (const s of segs) {
    if (!s.text) continue;
    const last = out[out.length - 1];
    if (last && Boolean(last.italic) === Boolean(s.italic)) last.text += s.text;
    else out.push({ ...s });
  }
  return out;
}

export function segmentsToText(segs: Segment[]): string {
  return segs.map((s) => s.text).join('');
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function segmentsToHtml(segs: Segment[]): string {
  return segs.map((s) => (s.italic ? `<i>${esc(s.text)}</i>` : esc(s.text))).join('');
}

/** Which fields are required before a reference is shown */
export function missingFields(src: SourceInput): string[] {
  const missing: string[] = [];
  if (!clean(src.title)) missing.push(src.type === 'journal' ? 'article title' : src.type === 'chapter' ? 'chapter title' : 'title');
  if (!src.noDate && !clean(src.year)) missing.push('year (or tick No date)');
  if (src.type === 'journal' && !clean(src.container)) missing.push('journal name');
  if (src.type === 'chapter' && !clean(src.container)) missing.push('book title');
  if (src.type === 'website' && !clean(src.url)) missing.push('URL');
  return missing;
}
