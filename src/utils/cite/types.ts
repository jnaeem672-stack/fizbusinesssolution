import type { Person, SourceType } from '../harvard';

/** Source details found by autocite, in the same shape as the generator form */
export interface CiteData {
  type: SourceType;
  authors: Person[];
  org: string;
  editors: Person[];
  year: string;
  month: string;
  day: string;
  title: string;
  container: string;
  publisher: string;
  edition: string;
  volume: string;
  issue: string;
  pages: string;
  url: string;
  kind: string;
}

export type CiteSourceName = 'Crossref' | 'DataCite' | 'Open Library' | 'Google Books' | 'Web page' | 'YouTube';

export interface CiteResult {
  source: CiteSourceName;
  data: CiteData;
}

export function emptyCite(type: SourceType): CiteData {
  return {
    type,
    authors: [],
    org: '',
    editors: [],
    year: '',
    month: '',
    day: '',
    title: '',
    container: '',
    publisher: '',
    edition: '',
    volume: '',
    issue: '',
    pages: '',
    url: '',
    kind: '',
  };
}
