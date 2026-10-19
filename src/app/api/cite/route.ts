import { NextRequest, NextResponse } from 'next/server';
import { fetchPage, FetchBlockedError } from '@/utils/cite/safeFetch';
import { hostLookup, parsePage, youtubeDate } from '@/utils/cite/page';
import { cleanText } from '@/utils/cite/text';
import { emptyCite, type CiteResult } from '@/utils/cite/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Reads citation details (title, author, date, site) from a public web page for the referencing generators */

const WINDOW_MS = 60_000;
const PER_IP = 30;
const GLOBAL = 300;
const hits = new Map<string, { n: number; t: number }>();
let globalHits = { n: 0, t: 0 };

function rateLimited(ip: string): boolean {
  const now = Date.now();
  if (now - globalHits.t > WINDOW_MS) globalHits = { n: 0, t: now };
  globalHits.n += 1;
  if (globalHits.n > GLOBAL) return true;
  // Without a client address only the overall limit applies
  if (!ip) return false;
  if (hits.size > 5000) hits.clear();
  const h = hits.get(ip);
  if (!h || now - h.t > WINDOW_MS) {
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  h.n += 1;
  return h.n > PER_IP;
}

const CACHE_MS = 6 * 60 * 60 * 1000;
const cache = new Map<string, { t: number; body: { ok: true; result: CiteResult; doi: string } }>();

function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' } });
}

async function youtubeOEmbed(url: string): Promise<{ title: string; author: string } | null> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 6000);
  try {
    const res = await fetch(`https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(url)}`, { signal: ctrl.signal });
    if (!res.ok) return null;
    const j = (await res.json()) as { title?: string; author_name?: string };
    return { title: cleanText(j.title), author: cleanText(j.author_name) };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export async function GET(req: NextRequest) {
  // Only our own pages may call this from a browser
  if (req.headers.get('sec-fetch-site') === 'cross-site') return json({ ok: false, error: 'Not allowed' }, 403);

  const raw = (req.nextUrl.searchParams.get('url') ?? '').trim();
  let target: URL;
  try {
    if (!raw || raw.length > 2000) throw new Error('bad');
    target = new URL(raw);
    if (target.protocol !== 'http:' && target.protocol !== 'https:') throw new Error('bad');
  } catch {
    return json({ ok: false, error: 'Please paste a full web link starting with https://' }, 400);
  }

  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || req.headers.get('x-real-ip') || '';
  if (rateLimited(ip)) return json({ ok: false, error: 'Too many lookups. Please wait a minute and try again.' }, 429);

  const key = target.toString();
  const cached = cache.get(key);
  if (cached && Date.now() - cached.t < CACHE_MS) return json(cached.body);

  try {
    let result: CiteResult;
    let doi = '';
    const isYouTube = hostLookup({ 'youtube.com': 'y', 'youtu.be': 'y' }, target.hostname) !== '';
    if (isYouTube) {
      const [oembed, page] = await Promise.all([youtubeOEmbed(key), fetchPage(key).catch(() => null)]);
      const parsed = page ? parsePage(page.html, key).data : null;
      if (!oembed && !parsed?.title) throw new Error('no data');
      const date = page ? youtubeDate(page.html) : { year: '', month: '', day: '' };
      const data = parsed ?? emptyCite('video');
      data.type = 'video';
      data.title = oembed?.title || data.title;
      if (oembed?.author) {
        data.org = oembed.author;
        data.authors = [];
      }
      data.container = 'YouTube';
      data.year = date.year || data.year;
      data.month = date.month || data.month;
      data.day = date.day || data.day;
      data.url = key;
      result = { source: 'YouTube', data };
    } else {
      const page = await fetchPage(key);
      const parsed = parsePage(page.html, key);
      if (!parsed.data.title && !parsed.doi) throw new Error('no data');
      result = { source: 'Web page', data: parsed.data };
      doi = parsed.doi;
    }
    const body = { ok: true as const, result, doi };
    if (cache.size > 500) cache.delete(cache.keys().next().value as string);
    cache.set(key, { t: Date.now(), body });
    return json(body);
  } catch (e) {
    const blocked = e instanceof FetchBlockedError || (e as NodeJS.ErrnoException)?.code === 'EBLOCKED';
    return json(
      {
        ok: false,
        error: blocked
          ? 'That link cannot be read. Please check it is a public web page.'
          : 'We could not read the details from that page. You can fill them in below.',
      },
      422,
    );
  }
}
