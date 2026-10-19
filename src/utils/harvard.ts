/**
 * Harvard reference formatting (Cite Them Right style, 12th edition conventions:
 * no place of publication, "edn", "(eds)", "Available at:", "(Accessed: 12 October 2026)").
 */
export type SourceType =
  | 'book'
  | 'chapter'
  | 'journal'
  | 'website'
  | 'newspaper'
  | 'report'
  | 'thesis'
  | 'video'
  | 'conference'
  | 'lecture';

export const SOURCE_TYPES: SourceType[] = ['book', 'chapter', 'journal', 'website', 'newspaper', 'report', 'thesis', 'video', 'conference', 'lecture'];

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
  /** Month number 1-12 (newspapers, web pages, videos, slides) */
  month?: string;
  /** Day of the month */
  day?: string;
  noDate: boolean;
  /** Book title, chapter title, article title, page title, report title, thesis title, video title or paper title */
  title: string;
  /**
   * Book title (chapter), journal name (journal), newspaper or magazine name (newspaper), website name (website, APA),
   * platform (video), proceedings title (conference), module (lecture, Harvard) or repository (thesis, APA)
   */
  container: string;
  editors: Person[];
  edition: string;
  /** Publisher, university (thesis) or university / course website (lecture) */
  publisher: string;
  volume: string;
  issue: string;
  pages: string;
  url: string;
  /** ISO date yyyy-mm-dd */
  accessed: string;
  /** Page number(s) for the in-text citation */
  citePage: string;
  /** Thesis level or lecture format */
  kind?: string;
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

export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/** Thesis levels with the wording each style uses */
export const THESIS_LEVELS: { id: string; label: string; harvard: string; apa: string }[] = [
  { id: 'phd', label: 'PhD or doctoral thesis', harvard: 'PhD thesis', apa: 'Doctoral dissertation' },
  { id: 'mphil', label: 'MPhil thesis', harvard: 'MPhil thesis', apa: "Master's thesis" },
  { id: 'msc', label: 'MSc dissertation', harvard: 'MSc dissertation', apa: "Master's thesis" },
  { id: 'ma', label: 'MA dissertation', harvard: 'MA dissertation', apa: "Master's thesis" },
  { id: 'mba', label: 'MBA dissertation', harvard: 'MBA dissertation', apa: "Master's thesis" },
  { id: 'ug', label: 'Undergraduate dissertation', harvard: 'Undergraduate dissertation', apa: "Bachelor's thesis" },
];

/** Lecture and course material formats with the wording each style uses */
export const LECTURE_FORMATS: { id: string; label: string; harvard: string; apa: string }[] = [
  { id: 'slides', label: 'PowerPoint slides', harvard: 'PowerPoint presentation', apa: 'PowerPoint slides' },
  { id: 'notes', label: 'Lecture notes', harvard: 'Lecture notes', apa: 'Lecture notes' },
  { id: 'recording', label: 'Recorded lecture', harvard: 'Recorded lecture', apa: 'Video' },
  { id: 'lecture', label: 'Lecture (attended)', harvard: 'Lecture', apa: 'Lecture' },
];

export function kindLabel(type: SourceType, kind: string | undefined, style: 'harvard' | 'apa'): string {
  const list = type === 'thesis' ? THESIS_LEVELS : type === 'lecture' ? LECTURE_FORMATS : [];
  const found = list.find((k) => k.id === kind) ?? list[0];
  return found ? found[style] : '';
}

export function formatDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!m) return '';
  const month = MONTHS[Number(m[2]) - 1];
  if (!month) return '';
  return `${Number(m[3])} ${month} ${m[1]}`;
}

/** Month name from a 1-12 string, or '' */
export function monthName(month: string | undefined): string {
  const n = parseInt(String(month ?? '').trim(), 10);
  return n >= 1 && n <= 12 ? MONTHS[n - 1] : '';
}

/** Day 1-31 from a string, or '' */
export function dayNumber(day: string | undefined): string {
  const n = parseInt(String(day ?? '').trim(), 10);
  return n >= 1 && n <= 31 ? String(n) : '';
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

const clean = (s: string | undefined) => String(s ?? '').trim().replace(/\s+/g, ' ');

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

const DOI_RE = /^(?:doi:\s*|https?:\/\/(?:dx\.)?doi\.org\/)?(10\.\d{4,9}\/\S+)$/i;

export function isDoi(url: string): boolean {
  return DOI_RE.test(url.trim());
}

export function normaliseUrl(url: string): string {
  const u = url.trim();
  if (!u) return '';
  const doi = DOI_RE.exec(u);
  if (doi) return `https://doi.org/${doi[1]}`;
  return u;
}

/** Default video platform from the link when none is typed */
export function videoPlatform(container: string, url: string): string {
  const c = clean(container);
  if (c) return c;
  const u = url.toLowerCase();
  if (/youtube\.com|youtu\.be/.test(u)) return 'YouTube';
  if (/vimeo\.com/.test(u)) return 'Vimeo';
  if (/ted\.com/.test(u)) return 'TED';
  return '';
}

/** Add a full stop unless the text already ends with terminal punctuation */
const stop = (s: string) => (/[.?!]$/.test(s) ? '' : '.');

/** Source types whose title sits inside a larger work and so goes in quotation marks in Harvard */
const HARVARD_PART_TYPES: SourceType[] = ['journal', 'chapter', 'newspaper', 'conference', 'lecture'];

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
  // A DOI is a permanent link, so it does not need an accessed date
  const accessed = url && !isDoi(src.url) ? formatDate(src.accessed) : '';

  const hasAuthor = Boolean(org || people.length);
  const authorText = org || joinNames(people.map(personName));

  // Title as it appears in the reference: italic for standalone works, quoted for parts of a larger work
  const titleIsPart = HARVARD_PART_TYPES.includes(src.type);
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
  const editorsText = () => {
    const eds = src.editors.filter((e) => clean(e.surname));
    return eds.length ? `${joinNames(eds.map(personName))} (${eds.length > 1 ? 'eds' : 'ed.'}) ` : '';
  };
  const publisherAndPages = () => {
    if (publisher && pages) return ` ${publisher}, ${pages}.`;
    if (publisher) return ` ${publisher}${stop(publisher)}`;
    if (pages) return ` ${pages}.`;
    return '';
  };

  switch (src.type) {
    case 'book': {
      ref.push({ text: hasAuthor ? stop(title) : '.' });
      if (edition) ref.push({ text: ` ${edition}` });
      if (publisher) ref.push({ text: ` ${publisher}${stop(publisher)}` });
      ref.push({ text: availability() });
      break;
    }
    case 'chapter': {
      ref.push({ text: ', in ' });
      ref.push({ text: editorsText() });
      ref.push({ text: container, italic: true }, { text: stop(container) });
      if (edition) ref.push({ text: ` ${edition}` });
      ref.push({ text: publisherAndPages() });
      ref.push({ text: availability() });
      break;
    }
    case 'conference': {
      const eds = editorsText();
      ref.push({ text: eds ? `, in ${eds}` : ', ' });
      ref.push({ text: container, italic: true }, { text: stop(container) });
      ref.push({ text: publisherAndPages() });
      ref.push({ text: availability() });
      break;
    }
    case 'journal': {
      ref.push({ text: ', ' }, { text: container, italic: true });
      const vol = clean(src.volume);
      const iss = clean(src.issue);
      if (vol || iss) ref.push({ text: `, ${vol}${iss ? `(${iss})` : ''}` });
      if (pages) ref.push({ text: `, ${pages}` });
      ref.push({ text: '.' });
      ref.push({ text: availability() });
      break;
    }
    case 'newspaper': {
      ref.push({ text: ', ' }, { text: container, italic: true });
      const month = src.noDate ? '' : monthName(src.month);
      if (month) ref.push({ text: `, ${[dayNumber(src.day), month].filter(Boolean).join(' ')}` });
      if (pages) ref.push({ text: `, ${pages}` });
      ref.push({ text: '.' });
      ref.push({ text: availability() });
      break;
    }
    case 'website':
    case 'video': {
      ref.push({ text: hasAuthor ? stop(title) : '.' });
      ref.push({ text: availability() });
      break;
    }
    case 'report': {
      ref.push({ text: hasAuthor ? stop(title) : '.' });
      if (edition) ref.push({ text: ` ${edition}` });
      if (publisher && publisher.toLowerCase() !== org.toLowerCase()) ref.push({ text: ` ${publisher}${stop(publisher)}` });
      ref.push({ text: availability() });
      break;
    }
    case 'thesis': {
      ref.push({ text: hasAuthor ? stop(title) : '.' });
      ref.push({ text: ` ${kindLabel('thesis', src.kind, 'harvard')}.` });
      if (publisher) ref.push({ text: ` ${publisher}${stop(publisher)}` });
      ref.push({ text: availability() });
      break;
    }
    case 'lecture': {
      ref.push({ text: ` [${kindLabel('lecture', src.kind, 'harvard')}].` });
      if (container) ref.push({ text: ` ${container}${stop(container)}` });
      if (publisher) ref.push({ text: ` ${publisher}${stop(publisher)}` });
      ref.push({ text: availability() });
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

export function mergeSegments(segs: Segment[]): Segment[] {
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
  const titleName: Partial<Record<SourceType, string>> = {
    journal: 'article title',
    chapter: 'chapter title',
    newspaper: 'article title',
    conference: 'paper title',
    video: 'video title',
  };
  if (!clean(src.title)) missing.push(titleName[src.type] ?? 'title');
  if (!src.noDate && !clean(src.year)) missing.push('year (or tick No date)');
  if (src.type === 'journal' && !clean(src.container)) missing.push('journal name');
  if (src.type === 'chapter' && !clean(src.container)) missing.push('book title');
  if (src.type === 'newspaper' && !clean(src.container)) missing.push('newspaper or magazine name');
  if (src.type === 'conference' && !clean(src.container)) missing.push('conference or proceedings title');
  if ((src.type === 'website' || src.type === 'video') && !clean(src.url)) missing.push('URL');
  return missing;
}

/**
 * Sentence case for titles: keeps the first word, the first word after a colon, acronyms and
 * mixed-case words (iPhone, McDonald) as they are, and lower-cases other capitalised words.
 * Proper nouns cannot be detected, so the student should check the result.
 */
const KEEP_CAPS = new Set(
  (
    'UK England English Scotland Scottish Wales Welsh Ireland Irish Britain British London Manchester Birmingham Leeds Glasgow Edinburgh ' +
    'Saudi Arabia Arabian Arab Arabic Riyadh Jeddah Dubai Abu Dhabi Emirates Emirati Qatar Kuwait Oman Bahrain Egypt Gulf Middle East ' +
    'America American Americans Canada Canadian Europe European Asia Asian Africa African Australia Australian Pakistan Pakistani India Indian ' +
    'China Chinese Japan Japanese Germany German France French Spain Spanish Italy Italian Turkey Turkish Malaysia Nigeria Indonesia ' +
    'Islam Islamic Muslim Muslims Christian Covid Brexit Google Amazon Apple Microsoft Facebook Instagram Twitter TikTok YouTube LinkedIn ' +
    'January February March April May June July August September October November December Monday Tuesday Wednesday Thursday Friday Saturday Sunday ' +
    'Kingdom United'
  ).split(' '),
);

export function toSentenceCase(title: string): string {
  let capNext = true;
  return title
    .split(/(\s+)/)
    .map((tok) => {
      if (/^\s+$/.test(tok) || !tok) return tok;
      let out = tok;
      const core = tok.replace(/^[("'‘“]+|[)"'’”:;,.?!]+$/g, '');
      if (capNext) {
        out = tok.replace(/[A-Za-z]/, (c) => c.toUpperCase());
      } else if (/^[A-Z][a-z’'-]*$/.test(core) && core !== 'I' && !KEEP_CAPS.has(core.replace(/[’']s$/, ''))) {
        out = tok.replace(core, core.toLowerCase());
      }
      capNext = /[:?!]["'’”)]?$/.test(tok);
      return out;
    })
    .join('');
}
