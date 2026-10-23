/**
 * Autocite lookups that run in the browser. Crossref, DataCite, Open Library and Google Books all allow
 * cross-origin requests; web pages are read by our own /api/cite route because browsers cannot read them directly.
 */
import { detectQuery, doiFromUrl, tidyUrl } from './detect';
import { fromCrossref, fromDataCite, fromGoogleBooks, fromOpenLibrary, fromOpenLibrarySearch, mergeCite } from './parse';
import type { CiteResult } from './types';

/** Crossref asks API users to identify themselves so that heavy use can be traced back */
const CROSSREF_MAILTO = 'info@fizbusinessolutions.com';

type Json = Record<string, unknown>;

export class LookupError extends Error {}

async function getJson(url: string, timeoutMs = 10000): Promise<Json | null> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: ctrl.signal, headers: { Accept: 'application/json' } });
    if (res.status === 404) return null;
    if (!res.ok) throw new LookupError(`HTTP ${res.status}`);
    return (await res.json()) as Json;
  } finally {
    clearTimeout(timer);
  }
}

const encDoi = (doi: string) => doi.split('/').map(encodeURIComponent).join('/');

export async function lookupDoi(doi: string): Promise<CiteResult | null> {
  try {
    const cr = await getJson(`https://api.crossref.org/works/${encDoi(doi)}?mailto=${encodeURIComponent(CROSSREF_MAILTO)}`);
    const message = cr && (cr.message as Json | undefined);
    if (message && typeof message === 'object') return { source: 'Crossref', data: fromCrossref(message) };
  } catch {
    /* fall through to DataCite */
  }
  const dc = await getJson(`https://api.datacite.org/dois/${encDoi(doi)}`).catch(() => null);
  const data = dc && (dc.data as Json | undefined);
  if (data && typeof data === 'object') return { source: 'DataCite', data: fromDataCite(data) };
  return null;
}

export async function lookupIsbn(isbn: string): Promise<CiteResult | null> {
  const [ol, olEdition, gb] = await Promise.allSettled([
    getJson(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`),
    getJson(`https://openlibrary.org/isbn/${isbn}.json`),
    getJson(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`),
  ]);
  const olRec = ol.status === 'fulfilled' && ol.value ? (ol.value[`ISBN:${isbn}`] as Json | undefined) : undefined;
  const edition = olEdition.status === 'fulfilled' && olEdition.value ? olEdition.value : undefined;
  const gbItem = gb.status === 'fulfilled' && gb.value ? ((gb.value.items as Json[] | undefined)?.[0]?.volumeInfo as Json | undefined) : undefined;

  const fromOl = olRec ? fromOpenLibrary(olRec, edition) : null;
  const fromGb = gbItem ? fromGoogleBooks(gbItem) : null;
  if (fromOl && fromGb) {
    const data = mergeCite(fromOl, fromGb);
    // Google Books lists people in the order printed on the cover; Open Library's order is often wrong
    if (fromGb.authors.length && !fromGb.org) {
      data.authors = fromGb.authors;
      data.org = '';
    }
    return { source: 'Open Library', data };
  }
  if (fromOl) return { source: 'Open Library', data: fromOl };
  if (fromGb) return { source: 'Google Books', data: fromGb };
  return null;
}

export async function searchTitle(q: string): Promise<CiteResult[]> {
  const enc = encodeURIComponent(q);
  const [cr, gb] = await Promise.allSettled([
    getJson(`https://api.crossref.org/works?query.bibliographic=${enc}&rows=6&mailto=${encodeURIComponent(CROSSREF_MAILTO)}`),
    getJson(`https://www.googleapis.com/books/v1/volumes?q=${enc}&maxResults=4&printType=books`),
  ]);
  const articles: CiteResult[] =
    cr.status === 'fulfilled' && cr.value
      ? ((obj(cr.value.message).items as Json[] | undefined) ?? [])
          .map((m) => ({ source: 'Crossref' as const, data: fromCrossref(m) }))
          .filter((r) => r.data.title)
      : [];
  let books: CiteResult[] =
    gb.status === 'fulfilled' && gb.value
      ? ((gb.value.items as Json[] | undefined) ?? [])
          .map((it) => ({ source: 'Google Books' as const, data: fromGoogleBooks(obj(it.volumeInfo)) }))
          .filter((r) => r.data.title)
      : [];
  if (!books.length) {
    const ol = await getJson(`https://openlibrary.org/search.json?q=${enc}&limit=4&fields=title,subtitle,author_name,first_publish_year,publisher`).catch(() => null);
    books = ((ol?.docs as Json[] | undefined) ?? []).map((doc) => ({ source: 'Open Library' as const, data: fromOpenLibrarySearch(doc) })).filter((r) => r.data.title);
  }
  if (cr.status === 'rejected' && gb.status === 'rejected' && !books.length) throw new LookupError('search failed');
  // Best article matches first, then books, then the remaining articles
  return [...articles.slice(0, 4), ...books.slice(0, 3), ...articles.slice(4)];
}

export async function lookupUrl(rawUrl: string): Promise<CiteResult | null> {
  const url = tidyUrl(rawUrl);
  const doi = doiFromUrl(url);
  if (doi) {
    const r = await lookupDoi(doi).catch(() => null);
    if (r) return r;
  }
  const res = await fetch(`/api/cite?url=${encodeURIComponent(url)}`, { headers: { Accept: 'application/json' } });
  const body = (await res.json().catch(() => ({}))) as { ok?: boolean; result?: CiteResult; doi?: string; error?: string };
  if (!res.ok || !body.ok || !body.result) throw new LookupError(body.error || `HTTP ${res.status}`);
  if (body.doi) {
    const r = await lookupDoi(body.doi).catch(() => null);
    if (r) return r;
  }
  return body.result;
}

function obj(v: unknown): Json {
  return v && typeof v === 'object' && !Array.isArray(v) ? (v as Json) : {};
}

export type AutociteOutcome =
  | { kind: 'single'; result: CiteResult }
  | { kind: 'many'; results: CiteResult[] }
  | { kind: 'none'; reason: 'doi' | 'isbn' | 'url' | 'title' | 'empty' };

/** Run the right lookup for whatever was pasted */
export async function autocite(raw: string): Promise<AutociteOutcome> {
  const q = detectQuery(raw);
  switch (q.kind) {
    case 'doi': {
      const r = await lookupDoi(q.doi);
      return r ? { kind: 'single', result: r } : { kind: 'none', reason: 'doi' };
    }
    case 'isbn': {
      const r = await lookupIsbn(q.isbn);
      return r ? { kind: 'single', result: r } : { kind: 'none', reason: 'isbn' };
    }
    case 'url': {
      const r = await lookupUrl(q.url);
      return r ? { kind: 'single', result: r } : { kind: 'none', reason: 'url' };
    }
    case 'title': {
      const results = await searchTitle(q.q);
      return results.length ? { kind: 'many', results } : { kind: 'none', reason: 'title' };
    }
    default:
      return { kind: 'none', reason: 'empty' };
  }
}
