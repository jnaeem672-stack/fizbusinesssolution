/**
 * Server-only: fetch a public web page for citation details without letting the request reach private
 * networks (SSRF protection). Every hop is checked: http/https only, ports 80/443, no credentials, no
 * private, loopback, link-local or reserved addresses, checked again at connect time so DNS rebinding
 * cannot slip through. Bodies are capped in size and time.
 */
import dns from 'node:dns';
import http from 'node:http';
import https from 'node:https';
import net from 'node:net';
import zlib from 'node:zlib';
import type { Readable } from 'node:stream';

export class FetchBlockedError extends Error {}

export function isBlockedIp(ip: string): boolean {
  if (net.isIPv4(ip)) {
    const [a, b, c] = ip.split('.').map(Number);
    return (
      a === 0 ||
      a === 10 ||
      a === 127 ||
      (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 192 && b === 0 && (c === 0 || c === 2)) ||
      (a === 198 && (b === 18 || b === 19)) ||
      (a === 198 && b === 51 && c === 100) ||
      (a === 203 && b === 0 && c === 113) ||
      a >= 224
    );
  }
  if (net.isIPv6(ip)) {
    const x = ip.toLowerCase().replace(/^\[|\]$/g, '');
    if (x === '::' || x === '::1') return true;
    const mapped = /^::ffff:(\d+\.\d+\.\d+\.\d+)$/.exec(x);
    if (mapped) return isBlockedIp(mapped[1]);
    return (
      x.startsWith('::ffff:') ||
      x.startsWith('::') ||
      /^f[cd]/.test(x) ||
      /^fe[89ab]/.test(x) ||
      x.startsWith('ff') ||
      x.startsWith('64:ff9b:') ||
      x.startsWith('100:') ||
      x.startsWith('2001:db8') ||
      x.startsWith('2002:')
    );
  }
  return true;
}

type LookupCb = (err: NodeJS.ErrnoException | null, address: string | dns.LookupAddress[], family?: number) => void;

function safeLookup(hostname: string, options: dns.LookupOptions, callback: LookupCb) {
  dns.lookup(hostname, { all: true, verbatim: true }, (err, addresses) => {
    if (err) return callback(err, '');
    const list = addresses as dns.LookupAddress[];
    if (!list.length || list.some((a) => isBlockedIp(a.address))) {
      const e = new FetchBlockedError('blocked address') as NodeJS.ErrnoException;
      e.code = 'EBLOCKED';
      return callback(e, '');
    }
    // IPv4 first: many hosting servers have no working IPv6 route
    const sorted = [...list].sort((a, b) => a.family - b.family);
    if (options && options.all) return callback(null, sorted);
    return callback(null, sorted[0].address, sorted[0].family);
  });
}

export function checkUrl(u: URL, allowPrivate = false): void {
  if (u.protocol !== 'http:' && u.protocol !== 'https:') throw new FetchBlockedError('only http and https links');
  if (u.username || u.password) throw new FetchBlockedError('links with a username or password are not allowed');
  if (u.port && u.port !== '80' && u.port !== '443') throw new FetchBlockedError('unusual port');
  if (allowPrivate) return;
  const host = u.hostname.toLowerCase().replace(/^\[|\]$/g, '');
  if (!host.includes('.') || /\.(localhost|local|internal|lan|home|corp|intranet)$/.test(host) || host === 'localhost') {
    throw new FetchBlockedError('private host');
  }
  if (net.isIP(host) && isBlockedIp(host)) throw new FetchBlockedError('private address');
}

export interface FetchedPage {
  url: string;
  html: string;
}

interface Options {
  maxBytes?: number;
  timeoutMs?: number;
  maxRedirects?: number;
  /** Tests only: allow local addresses */
  allowPrivate?: boolean;
  userAgent?: string;
  /** Cookie header, e.g. to skip a cookie consent page */
  cookie?: string;
}

type Resolved = Required<Omit<Options, 'cookie'>> & { cookie: string };

const UA = 'Mozilla/5.0 (compatible; FIZBS-ReferenceGenerator/1.0; +https://fizbusinessolutions.com/tools/harvard-referencing-generator)';

function charsetOf(contentType: string, head: Buffer): string {
  const fromHeader = /charset=["']?([\w-]+)/i.exec(contentType)?.[1];
  if (fromHeader) return fromHeader.toLowerCase();
  const sniff = head.subarray(0, 4096).toString('latin1');
  return (/<meta[^>]+charset=["']?([\w-]+)/i.exec(sniff)?.[1] ?? 'utf-8').toLowerCase();
}

function requestOnce(u: URL, opts: Resolved, deadline: number) {
  return new Promise<{ status: number; location?: string; html?: string }>((resolveOuter, rejectOuter) => {
    const mod = u.protocol === 'https:' ? https : http;
    const remaining = Math.max(1000, deadline - Date.now());
    // Hard limit for the whole request, not just idle time on the socket
    const timer = setTimeout(() => req.destroy(new Error('timeout')), remaining);
    const resolve = (v: { status: number; location?: string; html?: string }) => {
      clearTimeout(timer);
      resolveOuter(v);
    };
    const reject = (e: unknown) => {
      clearTimeout(timer);
      rejectOuter(e);
    };
    const req = mod.request(
      u,
      {
        method: 'GET',
        headers: {
          'User-Agent': opts.userAgent,
          Accept: 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.5',
          'Accept-Language': 'en-GB,en;q=0.9',
          'Accept-Encoding': 'gzip, deflate, br',
          ...(opts.cookie ? { Cookie: opts.cookie } : {}),
        },
        lookup: opts.allowPrivate ? undefined : (safeLookup as unknown as net.LookupFunction),
        timeout: remaining,
      },
      (res) => {
        const status = res.statusCode ?? 0;
        if (status >= 300 && status < 400 && res.headers.location) {
          res.resume();
          resolve({ status, location: res.headers.location });
          return;
        }
        if (status !== 200) {
          res.resume();
          reject(new Error(`HTTP ${status}`));
          return;
        }
        const type = String(res.headers['content-type'] ?? '');
        if (type && !/text\/html|application\/xhtml\+xml/i.test(type)) {
          res.resume();
          reject(new FetchBlockedError('not an HTML page'));
          return;
        }
        const enc = String(res.headers['content-encoding'] ?? '').toLowerCase();
        let stream: Readable = res;
        if (enc === 'gzip' || enc === 'x-gzip') stream = res.pipe(zlib.createGunzip());
        else if (enc === 'deflate') stream = res.pipe(zlib.createInflate());
        else if (enc === 'br') stream = res.pipe(zlib.createBrotliDecompress());
        const chunks: Buffer[] = [];
        let size = 0;
        let done = false;
        const finish = () => {
          if (done) return;
          done = true;
          const buf = Buffer.concat(chunks);
          let html: string;
          try {
            html = new TextDecoder(charsetOf(type, buf)).decode(buf);
          } catch {
            html = buf.toString('utf8');
          }
          resolve({ status, html });
        };
        stream.on('data', (c: Buffer) => {
          if (done) return;
          chunks.push(c);
          size += c.length;
          if (size >= opts.maxBytes) {
            finish();
            req.destroy();
          }
        });
        stream.on('end', finish);
        stream.on('error', (e) => (size > 0 ? finish() : reject(e)));
      },
    );
    req.on('timeout', () => req.destroy(new Error('timeout')));
    req.on('error', reject);
    req.end();
  });
}

export async function fetchPage(rawUrl: string, options: Options = {}): Promise<FetchedPage> {
  const opts = {
    maxBytes: options.maxBytes ?? 1_500_000,
    timeoutMs: options.timeoutMs ?? 8000,
    maxRedirects: options.maxRedirects ?? 4,
    allowPrivate: options.allowPrivate ?? false,
    userAgent: options.userAgent ?? UA,
    cookie: options.cookie ?? '',
  };
  const deadline = Date.now() + opts.timeoutMs;
  let u = new URL(rawUrl);
  for (let hop = 0; hop <= opts.maxRedirects; hop += 1) {
    checkUrl(u, opts.allowPrivate);
    if (Date.now() > deadline) throw new Error('timeout');
    const r = await requestOnce(u, opts, deadline);
    if (r.location) {
      u = new URL(r.location, u);
      continue;
    }
    return { url: u.toString(), html: r.html ?? '' };
  }
  throw new Error('too many redirects');
}
