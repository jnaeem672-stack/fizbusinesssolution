/** Turn Crossref, DataCite, Open Library and Google Books records into generator form data */
import type { Person, SourceType } from '../harvard';
import { emptyCite, type CiteData } from './types';
import { cleanPages, cleanText, fixCaps, isOrgName, parseEdition, parseLooseDate, splitName } from './text';

type Json = Record<string, unknown>;
const obj = (v: unknown): Json => (v && typeof v === 'object' && !Array.isArray(v) ? (v as Json) : {});
const arr = (v: unknown): unknown[] => (Array.isArray(v) ? v : v === undefined || v === null ? [] : [v]);
const str = (v: unknown): string => cleanText(v);

function titleWithSubtitle(title: string, subtitle: string): string {
  if (!subtitle || title.toLowerCase().includes(subtitle.toLowerCase())) return title;
  return /[:?!.]$/.test(title) ? `${title} ${subtitle}` : `${title}: ${subtitle}`;
}

/** People from Crossref/CSL style name objects; organisations are returned separately */
function cslPeople(list: unknown): { people: Person[]; org: string } {
  const people: Person[] = [];
  let org = '';
  for (const raw of arr(list)) {
    const a = obj(raw);
    const family = str(a.family);
    if (family) people.push({ surname: fixCaps(family), given: fixCaps(str(a.given)) });
    else if (str(a.name) || str(a.literal)) {
      const name = str(a.name) || str(a.literal);
      if (!people.length && !org && isOrgName(name)) org = name;
      else people.push(splitName(name));
    }
  }
  return { people: org ? [] : people, org };
}

function dateParts(v: unknown): { year: string; month: string; day: string } {
  const parts = arr(obj(v)['date-parts'])[0];
  const p = arr(parts).map((x) => (x === null || x === undefined ? '' : String(x)));
  return { year: /^\d{4}$/.test(p[0] ?? '') ? p[0] : '', month: p[1] ?? '', day: p[2] ?? '' };
}

const CROSSREF_TYPES: Record<string, SourceType> = {
  'journal-article': 'journal',
  'posted-content': 'journal',
  'book-chapter': 'chapter',
  'book-section': 'chapter',
  'book-part': 'chapter',
  'book-track': 'chapter',
  'reference-entry': 'chapter',
  book: 'book',
  monograph: 'book',
  'edited-book': 'book',
  'reference-book': 'book',
  'book-set': 'book',
  'proceedings-article': 'conference',
  report: 'report',
  'report-component': 'report',
  dissertation: 'thesis',
};

/** A Crossref /works record */
export function fromCrossref(m: Json): CiteData {
  const type: SourceType = CROSSREF_TYPES[str(m.type)] ?? 'report';
  const d = emptyCite(type);
  d.title = titleWithSubtitle(str(m.title), str(m.subtitle));
  const { people, org } = cslPeople(m.author);
  d.authors = people;
  d.org = org;
  d.editors = cslPeople(m.editor).people;
  // Journals: the issue (print) date is the version of record; otherwise the earliest published date
  const date =
    (type === 'journal' && dateParts(m['published-print']).year && dateParts(m['published-print'])) ||
    (dateParts(m.issued).year && dateParts(m.issued)) ||
    (dateParts(m['published-online']).year && dateParts(m['published-online'])) ||
    dateParts(m.created);
  d.year = date.year;
  const containers = arr(m['container-title']).map(str).filter(Boolean);
  const institution = str(obj(arr(m.institution)[0]).name);
  if (type === 'journal') d.container = containers[0] || institution || str(m.publisher);
  else if (type === 'chapter' || type === 'conference') d.container = containers[containers.length - 1] ?? '';
  d.volume = str(m.volume);
  d.issue = str(m.issue);
  d.pages = cleanPages(m.page);
  d.publisher = type === 'thesis' ? institution || str(m.publisher) : str(m.publisher);
  if (type === 'book' || type === 'chapter') d.edition = parseEdition(`${str(m['edition-number'])} edition`);
  if (type === 'thesis') d.kind = 'phd';
  const doi = str(m.DOI);
  d.url = doi ? `https://doi.org/${doi}` : str(m.URL);
  return d;
}

const DATACITE_TYPES: Record<string, SourceType> = {
  JournalArticle: 'journal',
  Preprint: 'journal',
  Book: 'book',
  BookChapter: 'chapter',
  Dissertation: 'thesis',
  Report: 'report',
  ConferencePaper: 'conference',
  Audiovisual: 'video',
};

/** A DataCite /dois record (the "data" object) */
export function fromDataCite(data: Json): CiteData {
  const a = obj(data.attributes);
  const types = obj(a.types);
  const type: SourceType = DATACITE_TYPES[str(types.resourceTypeGeneral)] ?? 'report';
  const d = emptyCite(type);
  const titles = arr(a.titles).map(obj);
  const main = titles.find((t) => !t.titleType) ?? titles[0] ?? {};
  const sub = titles.find((t) => t.titleType === 'Subtitle');
  d.title = titleWithSubtitle(str(main.title), sub ? str(sub.title) : '');
  for (const raw of arr(a.creators)) {
    const c = obj(raw);
    const family = str(c.familyName);
    const name = str(c.name);
    if (family) d.authors.push({ surname: fixCaps(family), given: fixCaps(str(c.givenName)) });
    else if (c.nameType === 'Organizational' || isOrgName(name)) {
      if (!d.authors.length && !d.org) d.org = name;
    } else if (name) d.authors.push(splitName(name));
  }
  if (d.org && d.authors.length) d.org = '';
  const publisher = typeof a.publisher === 'object' ? str(obj(a.publisher).name) : str(a.publisher);
  d.publisher = publisher;
  d.year = /^\d{4}$/.test(String(a.publicationYear ?? '')) ? String(a.publicationYear) : '';
  const container = obj(a.container);
  d.container = str(container.title) || (type === 'journal' ? publisher : '');
  d.volume = str(container.volume);
  d.issue = str(container.issue);
  const first = str(container.firstPage);
  const last = str(container.lastPage);
  d.pages = first && last ? `${first}-${last}` : first;
  if (type === 'thesis') d.kind = 'phd';
  const doi = str(a.doi) || str(data.id);
  d.url = doi ? `https://doi.org/${doi}` : str(a.url);
  return d;
}

/** Book records often list one person twice ("Mark N. K. Saunders" and "Mark N.K. Saunders"): keep the first */
export function dedupePeople(list: Person[]): Person[] {
  const seen = new Set<string>();
  return list.filter((p) => {
    const key = `${p.surname.toLowerCase().replace(/[^a-z\u00c0-\u024f]/g, '')}|${(p.given.trim()[0] ?? '').toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function bookAuthors(d: CiteData, names: string[]) {
  const clean = names.map(str).filter(Boolean);
  if (clean.length && isOrgName(clean[0])) d.org = clean[0];
  else d.authors = dedupePeople(clean.map(splitName).filter((p) => p.surname));
}

const EDITION_TAIL =
  /[\s,.:;(\-]*\b(\d{1,2}(?:st|nd|rd|th)?|first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth|eleventh|twelfth|thirteenth|fourteenth|fifteenth)\s+(?:edition|edn|ed)\b\.?\)?\s*$/i;

/** Book titles and subtitles sometimes carry the edition ("..., 8th edition"): move it to the edition field */
function bookTitle(d: CiteData, title: string, subtitle: string) {
  let t = title;
  let sub = subtitle;
  if (sub && /^\s*\(?\s*[\w]+\s+(edition|edn|ed)\b\.?\)?\s*$/i.test(sub)) {
    d.edition = d.edition || parseEdition(sub);
    sub = '';
  }
  const m = EDITION_TAIL.exec(t);
  if (m && m.index > 0) {
    d.edition = d.edition || parseEdition(`${m[1]} edition`);
    t = t.slice(0, m.index).trim();
  }
  d.title = titleWithSubtitle(t, sub);
}

/** Open Library api/books?jscmd=data record, plus the optional edition record for the edition number */
export function fromOpenLibrary(rec: Json, edition?: Json): CiteData {
  const d = emptyCite('book');
  d.edition = parseEdition(edition ? edition.edition_name : '');
  bookTitle(d, str(rec.title), str(rec.subtitle));
  bookAuthors(d, arr(rec.authors).map((x) => str(obj(x).name)));
  d.publisher = str(obj(arr(rec.publishers)[0]).name);
  d.year = parseLooseDate(rec.publish_date).year;
  return d;
}

/** Google Books volumeInfo */
export function fromGoogleBooks(v: Json): CiteData {
  const d = emptyCite('book');
  bookTitle(d, str(v.title), str(v.subtitle));
  bookAuthors(d, arr(v.authors).map(str));
  d.publisher = str(v.publisher);
  d.year = parseLooseDate(v.publishedDate).year;
  return d;
}

/** Open Library search.json doc (used when Google Books is unavailable) */
export function fromOpenLibrarySearch(doc: Json): CiteData {
  const d = emptyCite('book');
  bookTitle(d, str(doc.title), str(doc.subtitle));
  bookAuthors(d, arr(doc.author_name).map(str).slice(0, 6));
  d.publisher = str(arr(doc.publisher)[0]);
  d.year = /^\d{4}$/.test(String(doc.first_publish_year ?? '')) ? String(doc.first_publish_year) : '';
  return d;
}

/** Fill empty fields of a with values from b */
export function mergeCite(a: CiteData, b: CiteData): CiteData {
  const out = { ...a };
  (Object.keys(out) as (keyof CiteData)[]).forEach((k) => {
    if (k === 'type') return;
    const av = out[k];
    const bv = b[k];
    if (Array.isArray(av) ? av.length === 0 : !av) (out as Record<string, unknown>)[k] = bv;
  });
  // Authors come as a set from one source, never mixed
  const from = a.authors.length || a.org ? a : b;
  out.authors = from.authors;
  out.org = from.authors.length ? '' : from.org;
  return out;
}
