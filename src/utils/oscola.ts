/**
 * OSCOLA 5th edition (Oxford University Standard for Citation of Legal Authorities, 2026) formatter.
 * Builds the full footnote, the short form for later footnotes, and the entry for the table of cases,
 * the table of legislation or the bibliography. Rules follow the Oxford Law Faculty guide:
 * footnotes end with a full stop, bibliography and table entries do not; no ibid (later footnotes use
 * a short form with a cross-reference such as (n 1)); case names are italic in footnotes but not in tables;
 * the bibliography lists secondary sources only, with the surname first and initials without full stops.
 */
import type { Segment } from './harvard';

export type OscolaType =
  | 'case'
  | 'act'
  | 'si'
  | 'eu-leg'
  | 'eu-case'
  | 'echr'
  | 'book'
  | 'chapter'
  | 'journal'
  | 'website'
  | 'newspaper'
  | 'thesis'
  | 'report';

export const OSCOLA_TYPES: OscolaType[] = ['case', 'act', 'si', 'eu-leg', 'eu-case', 'echr', 'book', 'chapter', 'journal', 'website', 'newspaper', 'thesis', 'report'];

export const OSCOLA_TYPE_LABELS: Record<OscolaType, string> = {
  case: 'UK case',
  act: 'Act of Parliament',
  si: 'Statutory instrument',
  'eu-leg': 'EU legislation',
  'eu-case': 'EU court case',
  echr: 'ECHR case',
  book: 'Book',
  chapter: 'Chapter in a book',
  journal: 'Journal article',
  website: 'Website or blog',
  newspaper: 'Newspaper article',
  thesis: 'Thesis',
  report: 'Report or command paper',
};

export type OscolaGroup = 'cases' | 'legislation' | 'secondary';

export const OSCOLA_GROUP_TITLES: Record<OscolaGroup, string> = {
  cases: 'Table of Cases',
  legislation: 'Table of Legislation',
  secondary: 'Bibliography',
};

export interface OscolaPerson {
  given: string;
  surname: string;
}

export interface OscolaInput {
  type: OscolaType;
  /** Authors (secondary sources) */
  authors: OscolaPerson[];
  /** Organisation as author (reports, websites) */
  org: string;
  /** Editors of the book a chapter appears in, or of a whole edited book */
  editors: OscolaPerson[];
  /** Book: the people are the editors of the whole book */
  editedBook: boolean;
  /** Case name, short title of an Act, name of an SI, title of EU legislation, or title of a secondary source */
  title: string;
  year: string;
  /** Pinpoint, for example [24], 580, s 2 is a provision (use provision), para 4.51 or 135 */
  pinpoint: string;
  /** Short name for later footnotes (cases) or a defined short form for legislation */
  shortName: string;
  /** Case: medium neutral citation, for example [2008] UKHL 13 */
  neutral: string;
  /** Case: law report citation, for example [2008] 1 AC 884 */
  report: string;
  /** Case: court identifier for cases without a neutral citation, for example HL, CA, KBD */
  court: string;
  /** Unreported case or ECHR case: date of judgment (yyyy-mm-dd) */
  decided: string;
  /** Judge, for example Lord Reed */
  judge: string;
  /** Act, SI or EU legislation: the provision, for example s 2, ss 1(1) and 4(3), reg 7(2), art 5 */
  provision: string;
  /** SI number, for example 2004/3166 */
  siNumber: string;
  /** EU legislation: type and number, for example Council Directive 2002/60/EC */
  euName: string;
  /** EU legislation: Official Journal reference, for example L192/27 */
  oj: string;
  /** EU case number, for example C-403/03 */
  caseNumber: string;
  /** European Case Law Identifier, for example EU:C:2005:446 */
  ecli: string;
  /** ECHR application number(s), for example 8139/09 */
  appNo: string;
  grandChamber: boolean;
  /** Book title (chapter), journal abbreviation, website or blog name, or newspaper */
  container: string;
  edition: string;
  publisher: string;
  volume: string;
  issue: string;
  firstPage: string;
  /** Date of a web page, blog post or newspaper article (yyyy-mm-dd) */
  date: string;
  url: string;
  doi: string;
  /** The URL is a persistent link, such as Perma.cc, so no accessed date is needed */
  persistent: boolean;
  /** Date accessed (yyyy-mm-dd) */
  accessed: string;
  /** Thesis: degree, for example MPhil thesis or PhD thesis */
  degree: string;
  institution: string;
  /** Report: series and number, for example Cm 6150, CP 815 or Law Com No 320 */
  series: string;
}

export interface OscolaFormatted {
  /** Full citation for the first footnote */
  footnote: Segment[];
  /** Short form for later footnotes, with (n 1) as the cross-reference placeholder; empty for legislation */
  shortForm: Segment[];
  /** Entry for the table of cases, the table of legislation or the bibliography */
  entry: Segment[];
  group: OscolaGroup;
  /** Order inside a group: UK cases, EU cases, ECHR cases; Acts, SIs, EU legislation */
  subgroup: number;
  sortKey: string;
}

export function emptyOscola(type: OscolaType): OscolaInput {
  return {
    type,
    authors: [{ given: '', surname: '' }],
    org: '',
    editors: [],
    editedBook: false,
    title: '',
    year: '',
    pinpoint: '',
    shortName: '',
    neutral: '',
    report: '',
    court: '',
    decided: '',
    judge: '',
    provision: '',
    siNumber: '',
    euName: '',
    oj: '',
    caseNumber: '',
    ecli: '',
    appNo: '',
    grandChamber: false,
    container: '',
    edition: '',
    publisher: '',
    volume: '',
    issue: '',
    firstPage: '',
    date: '',
    url: '',
    doi: '',
    persistent: false,
    accessed: '',
    degree: '',
    institution: '',
    series: '',
  };
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const c = (v: string | undefined) => String(v ?? '').replace(/\s+/g, ' ').trim();

/** yyyy-mm-dd to 1 July 2010 */
export function longDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(c(iso));
  if (!m) return c(iso);
  const month = MONTHS[Number(m[2]) - 1];
  return month ? `${Number(m[3])} ${month} ${m[1]}` : '';
}

/** Given names as OSCOLA prints them in footnotes: initials without full stops, run together (H.L.A. becomes HLA) */
export function footnoteGiven(given: string): string {
  const tokens = c(given).split(/[\s.]+/).filter(Boolean);
  const out: string[] = [];
  let run = '';
  for (const t of tokens) {
    if (/^\p{Lu}$/u.test(t)) {
      run += t;
    } else {
      if (run) out.push(run);
      run = '';
      out.push(t);
    }
  }
  if (run) out.push(run);
  return out.join(' ');
}

/** Initials for the bibliography: first letter of each given name, no full stops or spaces (Hart HLA) */
export function bibInitials(given: string): string {
  return c(given)
    .split(/[\s.]+/)
    .filter(Boolean)
    .map((t) =>
      // A token typed as initials, such as HLA or JAG, keeps every letter
      /^\p{Lu}{2,3}$/u.test(t)
        ? t
        : t
            .split('-')
            .filter(Boolean)
            .map((p) => p[0].toLocaleUpperCase('en-GB'))
            .join('-'),
    )
    .join('');
}

const realPeople = (people: OscolaPerson[]) => people.filter((p) => c(p.surname) || c(p.given));

const fullName = (p: OscolaPerson) => [footnoteGiven(p.given), c(p.surname)].filter(Boolean).join(' ');
const bibName = (p: OscolaPerson) => [c(p.surname), bibInitials(p.given)].filter(Boolean).join(' ');

function joinAnd(names: string[]): string {
  if (names.length <= 1) return names.join('');
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
}

/** Footnote authors: up to three names in full; more than three: first author and others */
function footnoteNames(people: OscolaPerson[]): string {
  const ps = realPeople(people);
  if (ps.length > 3) return `${fullName(ps[0])} and others`;
  return joinAnd(ps.map(fullName));
}

/** Bibliography authors: all authors, surname first, initials without full stops */
function bibNames(people: OscolaPerson[]): string {
  return joinAnd(realPeople(people).map(bibName));
}

const edSuffix = (people: OscolaPerson[]) => (realPeople(people).length > 1 ? ' (eds)' : ' (ed)');

/** 2 or 2nd or second becomes 2nd edn; rev or revised becomes rev edn */
export function editionText(edition: string): string {
  const e = c(edition).replace(/\s*(edn|edition|ed)\.?$/i, '');
  if (!e) return '';
  if (/^rev(ised)?$/i.test(e)) return 'rev edn';
  const words: Record<string, number> = { first: 1, second: 2, third: 3, fourth: 4, fifth: 5, sixth: 6, seventh: 7, eighth: 8, ninth: 9, tenth: 10 };
  const n = /^\d+$/.test(e) ? Number(e) : (words[e.toLowerCase()] ?? NaN);
  if (!Number.isNaN(n)) {
    const s = n % 100 >= 11 && n % 100 <= 13 ? 'th' : ['th', 'st', 'nd', 'rd'][n % 10] ?? 'th';
    return `${n}${s} edn`;
  }
  return `${e} edn`;
}

/** Strip a DOI prefix such as https://doi.org/ */
export function bareDoi(doi: string): string {
  return c(doi).replace(/^https?:\/\/(dx\.)?doi\.org\//i, '').replace(/^doi:\s*/i, '');
}

/* ---------- Segment helpers ---------- */

class Line {
  segs: Segment[] = [];
  add(text: string, italic = false) {
    if (!text) return this;
    const last = this.segs[this.segs.length - 1];
    if (last && Boolean(last.italic) === italic) last.text += text;
    else this.segs.push(italic ? { text, italic: true } : { text });
    return this;
  }
  get text() {
    return this.segs.map((s) => s.text).join('');
  }
  /** Close a footnote with a full stop, unless it already ends with . ? or ! */
  end() {
    const t = this.text.trimEnd();
    if (!t) return this;
    if (!/[.?!]$/.test(t)) this.add('.');
    return this;
  }
}

/** Remove a trailing full stop from a field (titles sometimes come with one) */
const noStop = (s: string) => c(s).replace(/\.$/, '');

/** Link part for online sources: DOI without angle brackets; a persistent link without an accessed date; otherwise URL and accessed date */
function linkPart(src: OscolaInput): string {
  const doi = bareDoi(src.doi);
  if (doi) return ` DOI: ${doi}`;
  const url = c(src.url);
  if (!url) return '';
  if (src.persistent) return ` <${url}>`;
  const acc = longDate(src.accessed);
  return acc ? ` <${url}> accessed ${acc}` : ` <${url}>`;
}

/** First significant word for sorting: Re Farquar's Estate is tabled as Farquar's Estate, Re */
export function tableCaseName(name: string): string {
  const n = c(name);
  const re = /^(re|in re|in the matter of)\s+(.+)$/i.exec(n);
  return re ? `${re[2]}, Re` : n;
}

const sortable = (s: string) =>
  s
    .toLocaleLowerCase('en-GB')
    .replace(/^(the|a|an)\s+/, '')
    .replace(/[^a-z0-9 ]/g, '')
    .trim();

/** Default short name for later footnotes: R v Crawford becomes Crawford, R (Haw) v Secretary of State becomes Haw, otherwise the first party */
export function defaultCaseShortName(name: string): string {
  const n = c(name);
  if (!n) return '';
  const rv = /^R\s+v\s+(.+)$/i.exec(n);
  if (rv) return rv[1].split(/\s+/)[0];
  const rx = /^R\s*\(([^)]+)\)/i.exec(n);
  if (rx) return rx[1];
  return n.split(/\s+v\s+/i)[0];
}

function firstAuthorSurname(src: OscolaInput): string {
  const p = realPeople(src.type === 'book' && src.editedBook && !realPeople(src.authors).length ? src.editors : src.authors)[0];
  if (p) return c(p.surname) || c(p.given);
  return c(src.org);
}

/* ---------- Formatter ---------- */

export function formatOscola(src: OscolaInput): OscolaFormatted {
  const t = src.type;
  const fn = new Line();
  const entry = new Line();
  const short = new Line();
  const pin = c(src.pinpoint);
  const year = c(src.year);

  switch (t) {
    case 'case': {
      const name = noStop(src.title);
      const nc = c(src.neutral);
      const lr = c(src.report);
      const court = c(src.court);
      const decided = longDate(src.decided);
      const cites = [nc, lr].filter(Boolean).join(', ');
      // Cases without a neutral citation name the court after the report; unreported cases give the court and the date
      const courtPart = nc ? '' : lr ? (court ? ` (${court})` : '') : court || decided ? ` (${[court, decided].filter(Boolean).join(', ')})` : '';
      fn.add(name, true);
      if (cites) fn.add(` ${cites}`);
      fn.add(courtPart);
      if (pin) fn.add(` ${pin}`);
      if (c(src.judge)) fn.add(` (${c(src.judge)})`);
      fn.end();
      entry.add(tableCaseName(name));
      if (cites) entry.add(` ${cites}`);
      entry.add(courtPart);
      const sn = c(src.shortName) || defaultCaseShortName(name);
      if (sn) short.add(sn, true).add(' (n 1)').add(pin ? ` ${pin}` : '').end();
      return { footnote: fn.segs, shortForm: short.segs, entry: entry.segs, group: 'cases', subgroup: 0, sortKey: sortable(tableCaseName(name)) };
    }
    case 'eu-case': {
      const name = noStop(src.title);
      const num = c(src.caseNumber).replace(/^(joined\s+)?cases?\s+/i, '');
      const joined = /^joined/i.test(c(src.caseNumber)) || /,|\sand\s/.test(num);
      const label = num ? `${joined ? 'Joined Cases' : 'Case'} ${num}` : '';
      const ecli = c(src.ecli);
      if (label) fn.add(`${label} `);
      fn.add(name, true);
      if (ecli) fn.add(` ${ecli}`);
      if (pin) fn.add(` ${pin}`);
      fn.end();
      entry.add(tableCaseName(name));
      if (label) entry.add(` (${label})`);
      if (ecli) entry.add(` ${ecli}`);
      const sn = c(src.shortName) || name.split(/\s+v\s+/i)[0];
      if (sn) short.add(sn, true).add(' (n 1)').add(pin ? ` ${pin}` : '').end();
      return { footnote: fn.segs, shortForm: short.segs, entry: entry.segs, group: 'cases', subgroup: 1, sortKey: sortable(tableCaseName(name)) };
    }
    case 'echr': {
      const name = noStop(src.title);
      const app = c(src.appNo).replace(/^app(lication)?\.?\s*nos?\.?\s*/i, '');
      const many = /,|\sand\s/.test(app);
      const decided = longDate(src.decided);
      const rest = `${src.grandChamber ? ' [GC]' : ''} ECtHR${app ? ` App No${many ? 's' : ''} ${app}` : ''}${decided ? ` (${decided})` : ''}`;
      fn.add(name, true).add(rest);
      if (pin) fn.add(` ${pin}`);
      fn.end();
      entry.add(tableCaseName(name)).add(rest);
      const sn = c(src.shortName) || name.split(/\s+v\s+/i)[0];
      if (sn) short.add(sn, true).add(' (n 1)').add(pin ? ` ${pin}` : '').end();
      return { footnote: fn.segs, shortForm: short.segs, entry: entry.segs, group: 'cases', subgroup: 2, sortKey: sortable(tableCaseName(name)) };
    }
    case 'act': {
      const title = noStop(src.title).replace(/\s+\d{4}$/, '');
      const base = `${title}${year ? ` ${year}` : ''}`;
      const sn = c(src.shortName);
      fn.add(base);
      if (sn) fn.add(` ('${sn}')`);
      if (c(src.provision)) fn.add(`, ${c(src.provision)}`);
      fn.end();
      entry.add(base);
      return { footnote: fn.segs, shortForm: [], entry: entry.segs, group: 'legislation', subgroup: 0, sortKey: sortable(base) };
    }
    case 'si': {
      const title = noStop(src.title).replace(/\s+\d{4}$/, '');
      const num = c(src.siNumber).replace(/^SI\s*/i, '');
      const base = `${title}${year ? ` ${year}` : ''}${num ? `, SI ${num}` : ''}`;
      fn.add(base);
      if (c(src.provision)) fn.add(`, ${c(src.provision)}`);
      fn.end();
      entry.add(base);
      return { footnote: fn.segs, shortForm: [], entry: entry.segs, group: 'legislation', subgroup: 1, sortKey: sortable(title) };
    }
    case 'eu-leg': {
      const name = c(src.euName);
      const title = noStop(src.title);
      const oj = c(src.oj).replace(/^OJ\s*/i, '');
      const base = `${[name, title].filter(Boolean).join(' ')}${year ? ` [${year}]` : ''}${oj ? ` OJ ${oj}` : ''}`;
      const sn = c(src.shortName);
      fn.add(base);
      if (sn) fn.add(` ('${sn}')`);
      if (c(src.provision)) fn.add(`, ${c(src.provision)}`);
      fn.end();
      entry.add(base);
      return { footnote: fn.segs, shortForm: [], entry: entry.segs, group: 'legislation', subgroup: 2, sortKey: sortable(name || title) };
    }
    default:
      return formatSecondary(src);
  }
}

function formatSecondary(src: OscolaInput): OscolaFormatted {
  const t = src.type;
  const fn = new Line();
  const bib = new Line();
  const short = new Line();
  const pin = c(src.pinpoint);
  const year = c(src.year);
  const title = noStop(src.title);
  const people = realPeople(src.authors);
  const editorsOnly = t === 'book' && src.editedBook;
  const authorPeople = editorsOnly ? realPeople(src.editors.length ? src.editors : src.authors) : people;
  const org = c(src.org);

  // Author parts for the footnote (names in full) and the bibliography (surname first)
  let fnAuthor = authorPeople.length ? footnoteNames(authorPeople) : org;
  let bibAuthor = authorPeople.length ? bibNames(authorPeople) : org;
  if (editorsOnly && authorPeople.length) {
    fnAuthor += edSuffix(authorPeople);
    bibAuthor += edSuffix(authorPeople);
  }

  const both = (fnText: string, bibText: string = fnText, italic = false) => {
    fn.add(fnText, italic);
    bib.add(bibText, italic);
  };
  const authorLead = () => {
    if (fnAuthor) {
      fn.add(`${fnAuthor}, `);
      bib.add(`${bibAuthor}, `);
    }
  };
  const pubParens = (extra: string[] = []) => {
    const pub = [c(src.publisher), year].filter(Boolean).join(' ');
    const parts = [...extra, editionText(src.edition), pub].filter(Boolean);
    return parts.length ? ` (${parts.join(', ')})` : '';
  };

  const unattributed = !fnAuthor;

  switch (t) {
    case 'book': {
      authorLead();
      both(title, title, true);
      both(pubParens());
      if (pin) fn.add(` ${pin}`);
      break;
    }
    case 'chapter': {
      authorLead();
      both(`'${title}' in `);
      const eds = realPeople(src.editors);
      if (eds.length) both(`${joinAnd(eds.map(fullName))}${edSuffix(eds)}, `);
      both(noStop(src.container), noStop(src.container), true);
      both(pubParens());
      if (pin) fn.add(` ${pin}`);
      break;
    }
    case 'journal': {
      authorLead();
      both(`'${title}'`);
      const vol = c(src.volume);
      const iss = c(src.issue);
      const yearPart = vol ? `(${year}) ${vol}${iss ? `(${iss})` : ''}` : year ? `[${year}]` : '';
      const journal = noStop(src.container);
      const page = c(src.firstPage).split(/[-–]/)[0].trim();
      both(`${yearPart ? ` ${yearPart}` : ''}${journal ? ` ${journal}` : ''}${page ? ` ${page}` : ''}`);
      if (pin) fn.add(`, ${pin}`);
      const doi = bareDoi(src.doi);
      if (doi) both(` DOI: ${doi}`);
      break;
    }
    case 'website': {
      authorLead();
      both(`'${title}'`);
      const inner = [noStop(src.container), longDate(src.date) || year].filter(Boolean).join(', ');
      if (inner) both(` (${inner})`);
      if (pin) fn.add(` ${pin}`);
      both(linkPart(src));
      break;
    }
    case 'newspaper': {
      authorLead();
      both(`'${title}' `);
      both(noStop(src.container), noStop(src.container), true);
      const d = longDate(src.date) || year;
      if (d) both(` (${d})`);
      if (pin) fn.add(` ${pin}`);
      if (c(src.url) || c(src.doi)) both(linkPart(src));
      break;
    }
    case 'thesis': {
      authorLead();
      both(title, title, true);
      const parts = [c(src.degree), [c(src.institution), year].filter(Boolean).join(' ')].filter(Boolean);
      if (parts.length) both(` (${parts.join(', ')})`);
      if (pin) fn.add(` ${pin}`);
      break;
    }
    case 'report': {
      authorLead();
      both(title, title, true);
      const series = c(src.series);
      both(series ? ` (${[series, year].filter(Boolean).join(', ')})` : pubParens());
      if (pin) fn.add(` ${pin}`);
      if (c(src.url) || c(src.doi)) both(linkPart(src));
      break;
    }
  }
  fn.end();
  if (unattributed) {
    // OSCOLA lists unattributed works first in the bibliography, after a double dash
    const lead = new Line().add('\u2014\u2014, ');
    bib.segs.forEach((s) => lead.add(s.text, Boolean(s.italic)));
    bib.segs = lead.segs;
  }

  const surname = firstAuthorSurname(src);
  const italicTitle = t === 'book' || t === 'thesis' || t === 'report';
  if (surname) short.add(surname).add(' (n 1)').add(pin ? ` ${pin}` : '').end();
  else if (title) short.add(italicTitle ? title : `'${title}'`, italicTitle).add(' (n 1)').add(pin ? ` ${pin}` : '').end();

  const sortKey = `${unattributed ? '0' : '1'} ${sortable(unattributed ? title : `${bibAuthor} ${title}`)}`;
  return { footnote: fn.segs, shortForm: short.segs, entry: bib.segs, group: 'secondary', subgroup: 0, sortKey };
}

/** True when the form has enough to make a useful citation */
export function hasEnough(src: OscolaInput): boolean {
  switch (src.type) {
    case 'case':
      return Boolean(c(src.title) && (c(src.neutral) || c(src.report) || c(src.court)));
    case 'act':
      return Boolean(c(src.title) && c(src.year));
    case 'si':
      return Boolean(c(src.title) && (c(src.siNumber) || c(src.year)));
    case 'eu-leg':
      return Boolean((c(src.euName) || c(src.title)) && c(src.year));
    case 'eu-case':
      return Boolean(c(src.title) && (c(src.caseNumber) || c(src.ecli)));
    case 'echr':
      return Boolean(c(src.title) && (c(src.appNo) || c(src.decided)));
    default:
      return Boolean(c(src.title));
  }
}

export function oscolaGroupOf(type: OscolaType): OscolaGroup {
  if (type === 'case' || type === 'eu-case' || type === 'echr') return 'cases';
  if (type === 'act' || type === 'si' || type === 'eu-leg') return 'legislation';
  return 'secondary';
}
