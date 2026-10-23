/**
 * Read citation details from a web page's HTML: Highwire/Google Scholar tags (citation_*), Dublin Core,
 * Open Graph, JSON-LD (schema.org) and the <title>. Pure string parsing, so it runs on the server without a DOM.
 */
import type { SourceType } from '../harvard';
import { emptyCite, type CiteData } from './types';
import { cleanPages, cleanText, decodeEntities, isOrgName, parseLooseDate, splitName } from './text';

type Json = Record<string, unknown>;

/** Newspapers and magazines: cited as newspaper or magazine articles */
const NEWSPAPERS: Record<string, string> = {
  'theguardian.com': 'The Guardian',
  'nytimes.com': 'The New York Times',
  'telegraph.co.uk': 'The Telegraph',
  'independent.co.uk': 'The Independent',
  'ft.com': 'Financial Times',
  'thetimes.co.uk': 'The Times',
  'thetimes.com': 'The Times',
  'economist.com': 'The Economist',
  'washingtonpost.com': 'The Washington Post',
  'wsj.com': 'The Wall Street Journal',
  'latimes.com': 'Los Angeles Times',
  'usatoday.com': 'USA Today',
  'dailymail.co.uk': 'Daily Mail',
  'mirror.co.uk': 'The Mirror',
  'standard.co.uk': 'Evening Standard',
  'scotsman.com': 'The Scotsman',
  'heraldscotland.com': 'The Herald',
  'manchestereveningnews.co.uk': 'Manchester Evening News',
  'arabnews.com': 'Arab News',
  'saudigazette.com.sa': 'Saudi Gazette',
  'gulfnews.com': 'Gulf News',
  'khaleejtimes.com': 'Khaleej Times',
  'thenationalnews.com': 'The National',
  'dawn.com': 'Dawn',
  'forbes.com': 'Forbes',
  'hbr.org': 'Harvard Business Review',
  'theatlantic.com': 'The Atlantic',
  'time.com': 'Time',
  'newyorker.com': 'The New Yorker',
  'newstatesman.com': 'New Statesman',
  'spectator.co.uk': 'The Spectator',
  'wired.com': 'Wired',
  'wired.co.uk': 'Wired',
  'fortune.com': 'Fortune',
};

/** Broadcasters, online news and well-known sites: cited as web pages with the site name */
const SITE_NAMES: Record<string, string> = {
  'bbc.co.uk': 'BBC News',
  'bbc.com': 'BBC News',
  'news.sky.com': 'Sky News',
  'cnn.com': 'CNN',
  'reuters.com': 'Reuters',
  'apnews.com': 'AP News',
  'aljazeera.com': 'Al Jazeera',
  'npr.org': 'NPR',
  'cnbc.com': 'CNBC',
  'bloomberg.com': 'Bloomberg',
  'businessinsider.com': 'Business Insider',
  'huffpost.com': 'HuffPost',
  'theconversation.com': 'The Conversation',
  'gov.uk': 'GOV.UK',
  'nhs.uk': 'NHS',
  'who.int': 'World Health Organization',
  'ons.gov.uk': 'Office for National Statistics',
  'cipd.org': 'CIPD',
  'wikipedia.org': 'Wikipedia',
};

const VIDEO_HOSTS: Record<string, string> = {
  'youtube.com': 'YouTube',
  'youtu.be': 'YouTube',
  'vimeo.com': 'Vimeo',
  'ted.com': 'TED',
  'dailymotion.com': 'Dailymotion',
};

/** Find a host or its parent domain in a map: news.bbc.co.uk -> bbc.co.uk */
export function hostLookup(map: Record<string, string>, host: string): string {
  const h = host.toLowerCase().replace(/^www\./, '');
  const parts = h.split('.');
  for (let i = 0; i < parts.length - 1; i += 1) {
    const candidate = parts.slice(i).join('.');
    if (map[candidate]) return map[candidate];
  }
  return '';
}

function parseAttrs(tag: string): Record<string, string> {
  const out: Record<string, string> = {};
  const re = /([a-zA-Z_:.-]+)\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'>]+))/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(tag))) out[m[1].toLowerCase()] = decodeEntities(m[3] ?? m[4] ?? m[5] ?? '');
  return out;
}

function collectMeta(html: string): Map<string, string[]> {
  const meta = new Map<string, string[]>();
  const re = /<meta\b[^>]*>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    const a = parseAttrs(m[0]);
    const key = (a.name || a.property || a.itemprop || '').toLowerCase().trim();
    const content = a.content;
    if (!key || content === undefined) continue;
    const list = meta.get(key) ?? [];
    list.push(content);
    meta.set(key, list);
  }
  // <link itemprop="name" content="..."> and similar carry the same kind of data
  return meta;
}

function jsonLdNodes(html: string): Json[] {
  const nodes: Json[] = [];
  const re = /<script\b[^>]*type\s*=\s*["']?application\/ld\+json["']?[^>]*>([\s\S]*?)<\/script>/gi;
  let m: RegExpExecArray | null;
  const walk = (v: unknown) => {
    if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === 'object') {
      const o = v as Json;
      nodes.push(o);
      if (o['@graph']) walk(o['@graph']);
    }
  };
  while ((m = re.exec(html))) {
    try {
      walk(JSON.parse(m[1].trim()));
    } catch {
      /* invalid JSON-LD is common; skip it */
    }
  }
  return nodes;
}

const typesOf = (n: Json): string[] => (Array.isArray(n['@type']) ? (n['@type'] as unknown[]).map(String) : [String(n['@type'] ?? '')]);
const ARTICLE_TYPES = ['NewsArticle', 'ReportageNewsArticle', 'AnalysisNewsArticle', 'OpinionNewsArticle', 'Article', 'BlogPosting', 'ScholarlyArticle', 'Report', 'TechArticle', 'VideoObject', 'WebPage'];

function ldNames(v: unknown): string[] {
  const list = Array.isArray(v) ? v : v ? [v] : [];
  return list
    .map((x) => (typeof x === 'string' ? x : x && typeof x === 'object' ? String((x as Json).name ?? '') : ''))
    .map(cleanText)
    .filter(Boolean);
}

const isJunkAuthor = (s: string, site: string) =>
  !s || /https?:|www\.|@|\.com\b/i.test(s) || s.length > 80 || /^(admin|administrator|staff|editor|guest|unknown|anonymous)$/i.test(s) || (!!site && s.toLowerCase() === site.toLowerCase());

/** "Jane Doe and John Smith" / "Jane Doe, John Smith" -> two names; "Doe, Jane" stays one name */
function splitAuthorList(s: string): string[] {
  const t = cleanText(s).replace(/^by\s+/i, '');
  const parts = t.split(/\s*(?:,|&|\band\b|\|)\s*/i).filter(Boolean);
  if (parts.length > 1 && parts.some((p) => !/\s/.test(p))) return [t];
  return parts;
}

export interface PageCitation {
  data: CiteData;
  /** DOI found in the page's metadata, if any */
  doi: string;
}

export function parsePage(html: string, pageUrl: string): PageCitation {
  const url = new URL(pageUrl);
  const host = url.hostname.toLowerCase();
  const meta = collectMeta(html);
  const first = (...keys: string[]) => {
    for (const k of keys) {
      const v = meta.get(k)?.map(cleanText).find(Boolean);
      if (v) return v;
    }
    return '';
  };
  const all = (k: string) => (meta.get(k) ?? []).map(cleanText).filter(Boolean);

  const nodes = jsonLdNodes(html);
  const ld = ARTICLE_TYPES.map((t) => nodes.find((n) => typesOf(n).includes(t))).find(Boolean) ?? {};
  const ldTypes = typesOf(ld);
  const ldPublisher = cleanText((ld.publisher as Json | undefined)?.name ?? '');

  const newspaper = hostLookup(NEWSPAPERS, host);
  const newsSite = hostLookup(SITE_NAMES, host);
  const videoHost = hostLookup(VIDEO_HOSTS, host);
  const siteName = newspaper || newsSite || first('og:site_name', 'application-name') || ldPublisher;

  // DOI from scholarly metadata
  const doiRaw = first('citation_doi', 'bepress_citation_doi', 'prism.doi', 'dc.identifier', 'dcterms.identifier');
  const doiMatch = /(10\.\d{4,9}\/\S+)/.exec(doiRaw);
  const doi = doiMatch ? doiMatch[1] : '';

  // Type of source
  const journal = first('citation_journal_title', 'prism.publicationname');
  const conference = first('citation_conference_title');
  const thesisInst = first('citation_dissertation_institution');
  const reportInst = first('citation_technical_report_institution');
  let type: SourceType = 'website';
  if (videoHost || ldTypes.includes('VideoObject') || first('og:type').startsWith('video')) type = 'video';
  else if (journal) type = 'journal';
  else if (conference) type = 'conference';
  else if (thesisInst) type = 'thesis';
  else if (reportInst) type = 'report';
  else if (newspaper) type = 'newspaper';
  const d = emptyCite(type);

  // Title
  let title = first('citation_title', 'dc.title', 'og:title', 'twitter:title') || cleanText(ld.headline ?? ld.name ?? '');
  if (!title) {
    const t = /<title\b[^>]*>([\s\S]*?)<\/title>/i.exec(html);
    title = t ? cleanText(t[1]) : '';
  }
  // Drop a trailing " | Site name" or " - Site name"
  if (siteName) {
    const esc = siteName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    title = title.replace(new RegExp(`\\s*[|\\-:]\\s*${esc}\\s*$`, 'i'), '').trim() || title;
  }
  d.title = title;

  // Authors
  let names = all('citation_author');
  if (!names.length) names = ldNames(ld.author);
  if (!names.length) names = all('dc.creator');
  if (!names.length) {
    const metaAuthor = first('author', 'article:author', 'parsely-author', 'sailthru.author', 'byl', 'twitter:creator:name');
    names = metaAuthor ? splitAuthorList(metaAuthor) : [];
  }
  names = names.filter((n) => !isJunkAuthor(n, siteName)).slice(0, 25);
  if (names.length === 1 && isOrgName(names[0])) d.org = names[0];
  else d.authors = names.map(splitName).filter((p) => p.surname);
  // A web page with no named author is usually cited under the organisation that publishes it
  if (!d.org && !d.authors.length && (type === 'website' || type === 'report' || type === 'video') && siteName) d.org = siteName;

  // Date
  const date = parseLooseDate(
    first(
      'citation_publication_date',
      'citation_date',
      'citation_online_date',
      'article:published_time',
      'datepublished',
      'uploaddate',
      'dc.date',
      'dcterms.created',
      'date',
      'pubdate',
      'parsely-pub-date',
      'sailthru.date',
    ) || cleanText(ld.datePublished ?? ld.uploadDate ?? ld.dateCreated ?? ''),
  );
  // Web pages are cited with the year they were published or last updated (Cite Them Right), so a later update wins
  const updated =
    type === 'website'
      ? parseLooseDate(first('article:modified_time', 'og:updated_time', 'dcterms.modified', 'dc.date.modified', 'last-modified') || cleanText(ld.dateModified ?? ''))
      : { year: '', month: '', day: '' };
  const useUpdated = Boolean(updated.year) && (!date.year || Number(updated.year) > Number(date.year)) && Number(updated.year) <= new Date().getFullYear();
  const shown = useUpdated ? updated : date;
  d.year = shown.year;
  d.month = shown.month;
  d.day = shown.day;

  // Where it was published
  if (type === 'journal') {
    d.container = journal;
    d.volume = first('citation_volume', 'prism.volume');
    d.issue = first('citation_issue', 'prism.number');
    const fp = first('citation_firstpage', 'prism.startingpage');
    const lp = first('citation_lastpage', 'prism.endingpage');
    d.pages = cleanPages(fp && lp ? `${fp}-${lp}` : fp);
  } else if (type === 'conference') {
    d.container = conference;
  } else if (type === 'thesis') {
    d.publisher = thesisInst;
    d.kind = 'phd';
  } else if (type === 'report') {
    d.publisher = reportInst;
  } else if (type === 'video') {
    d.container = videoHost;
  } else {
    d.container = siteName;
  }
  if (type === 'journal' || type === 'conference') d.publisher = first('citation_publisher', 'dc.publisher');

  d.url = pageUrl;
  return { data: d, doi };
}

/** Upload date from a YouTube watch page (its JSON player data) */
export function youtubeDate(html: string): { year: string; month: string; day: string } {
  const iso =
    /"(?:uploadDate|publishDate|datePublished)"\s*:\s*"(\d{4}-\d{2}-\d{2})/.exec(html) ||
    /itemprop=["'](?:uploadDate|datePublished)["'][^>]*content=["'](\d{4}-\d{2}-\d{2})/.exec(html) ||
    /content=["'](\d{4}-\d{2}-\d{2})[^"']*["'][^>]*itemprop=["'](?:uploadDate|datePublished)["']/.exec(html);
  if (iso) return parseLooseDate(iso[1]);
  // The date shown under the video, e.g. "10 Apr 2021" or "Premiered Apr 10, 2021"
  const shown = /"dateText"\s*:\s*\{\s*"simpleText"\s*:\s*"([^"]+)"/.exec(html);
  return parseLooseDate(shown ? shown[1] : '');
}
