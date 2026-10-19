/**
 * APA 7th edition reference formatting (author-date, sentence-case titles, "&" before the last author,
 * DOI as https://doi.org/..., no retrieval date by default). Uses the same input shape as the Harvard tool.
 */
import {
  dayNumber,
  kindLabel,
  mergeSegments,
  monthName,
  normaliseUrl,
  videoPlatform,
  type Formatted,
  type Person,
  type Segment,
  type SourceInput,
  type SourceType,
} from './harvard';

const clean = (s: string | undefined) => String(s ?? '').trim().replace(/\s+/g, ' ');

/** "Sarah Anne" -> "S. A.", "Jean-Paul" -> "J.-P." */
export function apaInitials(given: string): string {
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
    .join(' ');
}

/** Reference-list order: Surname, I. I. */
function invertedName(p: Person): string {
  const surname = clean(p.surname);
  const ini = apaInitials(p.given);
  return ini ? `${surname}, ${ini}` : surname;
}

/** Editors inside a chapter reference: I. I. Surname */
function directName(p: Person): string {
  const surname = clean(p.surname);
  const ini = apaInitials(p.given);
  return ini ? `${ini} ${surname}` : surname;
}

/** APA author list: up to 20 names with "&" before the last; 21 or more: first 19, ellipsis, last */
export function apaAuthorList(people: Person[]): string {
  const names = people.map(invertedName);
  if (names.length === 0) return '';
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]}, & ${names[1]}`;
  if (names.length <= 20) return `${names.slice(0, -1).join(', ')}, & ${names[names.length - 1]}`;
  return `${names.slice(0, 19).join(', ')}, . . . ${names[names.length - 1]}`;
}

function editorList(people: Person[]): string {
  const names = people.map(directName);
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} & ${names[1]}`;
  return `${names.slice(0, -1).join(', ')}, & ${names[names.length - 1]}`;
}

function ordinal(n: number): string {
  const v = n % 100;
  if (v >= 11 && v <= 13) return `${n}th`;
  return `${n}${['th', 'st', 'nd', 'rd'][n % 10] ?? 'th'}`;
}

/** "3" -> "3rd ed.", "revised" -> "Rev. ed.", first edition -> "" */
export function apaEdition(edition: string): string {
  const e = clean(edition).replace(/\s+(edn\.?|edition|ed\.?)$/i, '');
  if (!e) return '';
  if (/^rev(ised|\.)?$/i.test(e)) return 'Rev. ed.';
  if (/^\d+(st|nd|rd|th)?$/i.test(e)) {
    const n = parseInt(e, 10);
    return n > 1 ? `${ordinal(n)} ed.` : '';
  }
  return `${e.charAt(0).toUpperCase()}${e.slice(1)} ed.`;
}

/** Page range for the reference list, without "pp." (journals) */
function bareRange(pages: string): string {
  return clean(pages).replace(/^pp?\.\s*/i, '').replace(/\s*[‐-―-]+\s*/g, '-');
}

/** Page or range with p./pp. (chapters and in-text citations) */
export function apaPages(pages: string): string {
  const p = bareRange(pages);
  if (!p) return '';
  return p.includes('-') ? `pp. ${p}` : `p. ${p}`;
}

/** Add a full stop unless the text already ends with terminal punctuation */
const stop = (s: string) => (/[.?!]$/.test(s) ? '' : '.');

/** Parts of a larger work: plain title in the reference, quotation marks in a title-only citation */
const APA_PART_TYPES: SourceType[] = ['journal', 'chapter', 'newspaper', 'conference'];
/** Sources dated to the day in APA: (2024, March 5) */
const APA_FULL_DATE_TYPES: SourceType[] = ['newspaper', 'website', 'video', 'lecture'];

export function formatApa(src: SourceInput): Formatted {
  const people = src.authors.filter((a) => clean(a.surname));
  const org = clean(src.org);
  const year = src.noDate ? 'n.d.' : clean(src.year) || 'n.d.';
  const month = year !== 'n.d.' && APA_FULL_DATE_TYPES.includes(src.type) ? monthName(src.month) : '';
  const date = month ? `${year}, ${month}${dayNumber(src.day) ? ` ${dayNumber(src.day)}` : ''}` : year;
  const title = clean(src.title);
  const container = clean(src.container);
  const publisher = clean(src.publisher);
  const edition = apaEdition(src.edition);
  const url = normaliseUrl(src.url);
  const hasAuthor = Boolean(org || people.length);
  const authorText = org || apaAuthorList(people);

  // Standalone works (book, report, web page, video, thesis, slides) have italic titles; parts of a larger work do not
  const titleIsPart = APA_PART_TYPES.includes(src.type);
  const italicTitle = !titleIsPart;

  // A thesis counts as published when it comes from a repository or database
  const thesisPublished = Boolean(url || container);
  const description = (): string => {
    if (src.type === 'video') return '[Video]';
    if (src.type === 'lecture') return `[${kindLabel('lecture', src.kind, 'apa')}]`;
    if (src.type === 'thesis') {
      const level = kindLabel('thesis', src.kind, 'apa');
      if (thesisPublished) return `[${level}${publisher ? `, ${publisher}` : ''}]`;
      return `[Unpublished ${level.charAt(0).toLowerCase()}${level.slice(1)}]`;
    }
    return '';
  };

  // Title plus any bracketed description that belongs directly after it, e.g. (3rd ed.) or [Video]
  const titleBlock = (): Segment[] => {
    const segs: Segment[] = [{ text: title, italic: italicTitle }];
    if ((src.type === 'book' || src.type === 'report') && edition) segs.push({ text: ` (${edition})` });
    const desc = description();
    if (desc) segs.push({ text: ` ${desc}` });
    const last = segs[segs.length - 1].text;
    segs.push({ text: stop(last) });
    return segs;
  };

  const ref: Segment[] = [];
  if (hasAuthor) {
    ref.push({ text: `${authorText}${stop(authorText)} (${date}). ` }, ...titleBlock());
  } else {
    // No author: the title moves to the author position
    ref.push(...titleBlock(), { text: ` (${date}).` });
  }

  const tailUrl = () => (url ? ` ${url}` : '');
  const addPart = (s: string) => {
    if (s && s.toLowerCase() !== authorText.toLowerCase()) ref.push({ text: ` ${s}${stop(s)}` });
  };

  switch (src.type) {
    case 'book':
    case 'report': {
      if (publisher && publisher.toLowerCase() !== org.toLowerCase()) ref.push({ text: ` ${publisher}${stop(publisher)}` });
      ref.push({ text: tailUrl() });
      break;
    }
    case 'chapter':
    case 'conference': {
      const eds = src.editors.filter((e) => clean(e.surname));
      ref.push({ text: ' In ' });
      if (eds.length) ref.push({ text: `${editorList(eds)} (${eds.length > 1 ? 'Eds.' : 'Ed.'}), ` });
      ref.push({ text: container, italic: true });
      const details = [src.type === 'chapter' ? edition : '', apaPages(src.pages)].filter(Boolean).join(', ');
      ref.push({ text: details ? ` (${details}).` : stop(container) });
      if (publisher) ref.push({ text: ` ${publisher}${stop(publisher)}` });
      ref.push({ text: tailUrl() });
      break;
    }
    case 'journal': {
      ref.push({ text: ' ' }, { text: container, italic: true });
      const vol = clean(src.volume);
      const iss = clean(src.issue);
      if (vol) ref.push({ text: ', ' }, { text: vol, italic: true });
      if (iss) ref.push({ text: `${vol ? '' : ', '}(${iss})` });
      const range = bareRange(src.pages);
      if (range) ref.push({ text: `, ${range}` });
      ref.push({ text: '.' });
      ref.push({ text: tailUrl() });
      break;
    }
    case 'newspaper': {
      ref.push({ text: ' ' }, { text: container, italic: true });
      const range = bareRange(src.pages);
      if (range) ref.push({ text: `, ${range}` });
      ref.push({ text: '.' });
      ref.push({ text: tailUrl() });
      break;
    }
    case 'website': {
      addPart(container);
      ref.push({ text: tailUrl() });
      break;
    }
    case 'video': {
      addPart(videoPlatform(container, src.url));
      ref.push({ text: tailUrl() });
      break;
    }
    case 'thesis': {
      if (thesisPublished) addPart(container);
      else addPart(publisher);
      ref.push({ text: tailUrl() });
      break;
    }
    case 'lecture': {
      addPart(publisher);
      ref.push({ text: tailUrl() });
      break;
    }
  }

  // In-text citation: 1 author, 2 authors joined by & (narrative: and), 3+ authors: first author et al.
  const surnames = people.map((p) => clean(p.surname));
  let par: Segment[];
  let nar: Segment[];
  if (org) {
    par = [{ text: org }];
    nar = [{ text: org }];
  } else if (surnames.length >= 3) {
    par = [{ text: `${surnames[0]} et al.` }];
    nar = par;
  } else if (surnames.length === 2) {
    par = [{ text: `${surnames[0]} & ${surnames[1]}` }];
    nar = [{ text: `${surnames[0]} and ${surnames[1]}` }];
  } else if (surnames.length === 1) {
    par = [{ text: surnames[0] }];
    nar = par;
  } else {
    // No author: use the title, italic for standalone works and in quotation marks for parts of a larger work
    par = titleIsPart ? [{ text: `"${title}"` }] : [{ text: title, italic: true }];
    nar = par;
  }
  const citePage = apaPages(src.citePage);
  const tail = `${year}${citePage ? `, ${citePage}` : ''}`;

  const sortKey = (hasAuthor ? authorText : title).replace(/^['"]/, '').toLowerCase() + ` ${year}`;

  // An untitled-author article or chapter keeps the comma inside the quotation marks: ("Title," 2020)
  const quotedTitle = !hasAuthor && titleIsPart;
  return {
    reference: mergeSegments(ref),
    parenthetical: quotedTitle
      ? [{ text: `("${title}," ${tail})` }]
      : mergeSegments([{ text: '(' }, ...par, { text: `, ${tail})` }]),
    narrative: mergeSegments([...nar, { text: ` (${tail})` }]),
    sortKey,
  };
}
