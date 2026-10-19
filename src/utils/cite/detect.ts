/** Work out what the student pasted into the autocite box */
export type CiteQuery =
  | { kind: 'doi'; doi: string }
  | { kind: 'isbn'; isbn: string }
  | { kind: 'url'; url: string }
  | { kind: 'title'; q: string }
  | { kind: 'empty' };

const DOI_IN_TEXT = /(10\.\d{4,9}\/[^\s"<>]+)/;

function safeDecode(s: string): string {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

/** Remove trailing punctuation and reader-page suffixes that are not part of a DOI */
export function tidyDoi(doi: string): string {
  return doi
    .replace(/[.,;)\]]+$/, '')
    .replace(/(\/(full|abstract|abs|pdf|epdf|html|fulltext|meta|summary|references|figures|issuetoc))+$/i, '')
    .replace(/\.pdf$/i, '');
}

export function isValidIsbn(isbn: string): boolean {
  if (/^\d{9}[\dX]$/.test(isbn)) {
    const sum = isbn.split('').reduce((s, c, i) => s + (c === 'X' ? 10 : Number(c)) * (10 - i), 0);
    return sum % 11 === 0;
  }
  if (/^97[89]\d{10}$/.test(isbn)) {
    const sum = isbn.split('').reduce((s, c, i) => s + Number(c) * (i % 2 ? 3 : 1), 0);
    return sum % 10 === 0;
  }
  return false;
}

export function detectQuery(raw: string): CiteQuery {
  const s = raw.trim();
  if (!s) return { kind: 'empty' };

  // DOI, bare or as a doi.org link
  const doi = /^(?:doi:\s*|https?:\/\/(?:dx\.)?doi\.org\/)?(10\.\d{4,9}\/\S+)$/i.exec(s);
  if (doi) return { kind: 'doi', doi: tidyDoi(safeDecode(doi[1])) };

  // ISBN-10 or ISBN-13, with or without hyphens
  const isbn = s.replace(/^isbn(?:-1[03])?:?\s*/i, '').replace(/[\s-]/g, '').toUpperCase();
  if (/^[\d]{9}[\dX]$|^\d{13}$/.test(isbn) && isValidIsbn(isbn)) return { kind: 'isbn', isbn };

  // Web links, with or without https://
  if (!/\s/.test(s)) {
    if (/^https?:\/\//i.test(s)) return { kind: 'url', url: s };
    if (/^www\./i.test(s) || /^[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}(\/\S*)?$/i.test(s)) return { kind: 'url', url: `https://${s}` };
  }

  return s.length >= 3 ? { kind: 'title', q: s.slice(0, 300) } : { kind: 'empty' };
}

/** A DOI inside a publisher link, e.g. https://www.tandfonline.com/doi/full/10.1191/1478088706qp063oa */
export function doiFromUrl(url: string): string {
  try {
    const u = new URL(url);
    const m = DOI_IN_TEXT.exec(safeDecode(u.pathname));
    return m ? tidyDoi(m[1]) : '';
  } catch {
    return '';
  }
}

/** Remove tracking parameters from a link before it goes into a reference */
export function tidyUrl(url: string): string {
  try {
    const u = new URL(url);
    [...u.searchParams.keys()].forEach((k) => {
      if (/^(utm_|fbclid$|gclid$|gbraid$|wbraid$|mc_cid$|mc_eid$|ocid$|cmpid$|_ga$|ref_src$|igshid$|si$)/i.test(k)) u.searchParams.delete(k);
    });
    u.hash = '';
    return u.toString();
  } catch {
    return url;
  }
}
