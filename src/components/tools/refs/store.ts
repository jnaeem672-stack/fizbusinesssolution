/**
 * Reference projects saved in the visitor's browser (localStorage), plus share links.
 * Nothing here is sent to our server.
 */
import { formatSource, SOURCE_TYPES, type Formatted, type Person, type Segment, type SourceInput, type SourceType } from '@/utils/harvard';
import { formatApa } from '@/utils/apa';

export type ReferenceStyle = 'harvard' | 'apa';

export const STYLE_NAMES: Record<ReferenceStyle, string> = {
  harvard: 'Harvard (Cite Them Right)',
  apa: 'APA 7th edition',
};

/** A source the visitor added (or edited) through the form */
export interface SourceItem { id: string; added: number; src: SourceInput }
/** A reference pasted as finished text; shown as written in every style */
export interface PreItem { id: string; added: number; pre: string }
/** A reference saved by the first version of the tool, kept as formatted text in one style */
export interface LegacyItem { id: string; added: number; legacy: { style: ReferenceStyle; segs: Segment[]; sortKey: string } }
export type RefItem = SourceItem | PreItem | LegacyItem;

export interface Project {
  id: string;
  name: string;
  style: ReferenceStyle;
  created: number;
  items: RefItem[];
}

export interface Store {
  v: 1;
  current: string;
  projects: Project[];
}

export interface Prefs {
  font: string;
  size: number;
  sort: 'az' | 'added';
}

export const FONTS = ['Times New Roman', 'Arial', 'Calibri', 'Georgia'];
export const SIZES = [11, 12];
export const DEFAULT_PREFS: Prefs = { font: 'Times New Roman', size: 12, sort: 'az' };

export const STORE_KEY = 'fizbs-ref-projects-v1';
const PREFS_KEY = 'fizbs-ref-prefs-v1';
/** Lists saved by earlier versions of the tool */
const V2_KEY = 'fizbs-references-v2';
const V1_KEYS: Record<ReferenceStyle, string> = { harvard: 'fizbs-harvard-list', apa: 'fizbs-apa-list' };

export const newId = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

const s = (v: unknown) => (typeof v === 'string' ? v : '');
const n = (v: unknown, fallback: number) => (typeof v === 'number' && Number.isFinite(v) ? v : fallback);
const people = (v: unknown): Person[] =>
  Array.isArray(v) ? v.filter((p) => p && typeof p === 'object').map((p) => ({ surname: s(p.surname), given: s(p.given) })) : [];
const isSegments = (v: unknown): v is Segment[] =>
  Array.isArray(v) && v.every((x) => x && typeof x.text === 'string' && (x.italic === undefined || typeof x.italic === 'boolean'));
const isStyle = (v: unknown): v is ReferenceStyle => v === 'harvard' || v === 'apa';

/** Rebuild a stored or shared source safely (storage and links can hold anything) */
export function sanitiseSource(x: unknown): SourceInput | null {
  if (!x || typeof x !== 'object') return null;
  const o = x as Record<string, unknown>;
  if (!SOURCE_TYPES.includes(o.type as SourceType)) return null;
  return {
    type: o.type as SourceType,
    authors: people(o.authors),
    org: s(o.org),
    year: s(o.year),
    month: s(o.month),
    day: s(o.day),
    noDate: o.noDate === true,
    title: s(o.title),
    container: s(o.container),
    editors: people(o.editors),
    edition: s(o.edition),
    publisher: s(o.publisher),
    volume: s(o.volume),
    issue: s(o.issue),
    pages: s(o.pages),
    url: s(o.url),
    accessed: s(o.accessed),
    citePage: s(o.citePage),
    kind: s(o.kind),
  };
}

function sanitiseItem(x: unknown, i: number): RefItem | null {
  if (!x || typeof x !== 'object') return null;
  const o = x as Record<string, unknown>;
  const id = s(o.id) || newId();
  const added = n(o.added, i);
  const src = sanitiseSource(o.src);
  if (src) return { id, added, src };
  if (typeof o.pre === 'string' && o.pre.trim()) return { id, added, pre: o.pre.trim().slice(0, 2000) };
  const lg = o.legacy as Record<string, unknown> | undefined;
  if (lg && isStyle(lg.style) && isSegments(lg.segs) && typeof lg.sortKey === 'string') return { id, added, legacy: { style: lg.style, segs: lg.segs, sortKey: lg.sortKey } };
  return null;
}

function sanitiseProject(x: unknown, fallbackStyle: ReferenceStyle): Project | null {
  if (!x || typeof x !== 'object') return null;
  const o = x as Record<string, unknown>;
  const items = Array.isArray(o.items) ? o.items.map(sanitiseItem).filter((i): i is RefItem => i !== null) : [];
  return {
    id: s(o.id) || newId(),
    name: s(o.name).trim().slice(0, 80) || 'My project',
    style: isStyle(o.style) ? o.style : fallbackStyle,
    created: n(o.created, Date.now()),
    items,
  };
}

export function blankProject(name: string, style: ReferenceStyle): Project {
  return { id: newId(), name, style, created: Date.now(), items: [] };
}

/** Items saved by the earlier single-list versions of the tool */
function migrateOldLists(): RefItem[] {
  const out: RefItem[] = [];
  const raw = window.localStorage.getItem(V2_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      const items: unknown[] = Array.isArray(parsed?.items) ? parsed.items : [];
      items.forEach((it, i) => {
        const item = sanitiseItem(it, i);
        if (item) out.push(item);
      });
    } catch {
      /* damaged old list */
    }
    return out;
  }
  (Object.keys(V1_KEYS) as ReferenceStyle[]).forEach((style) => {
    try {
      const old = JSON.parse(window.localStorage.getItem(V1_KEYS[style]) ?? '[]');
      if (Array.isArray(old))
        old.forEach((x, i) => {
          if (x && typeof x.id === 'string' && typeof x.sortKey === 'string' && isSegments(x.segs))
            out.push({ id: `${style}-${x.id}`, added: i, legacy: { style, segs: x.segs, sortKey: x.sortKey } });
        });
    } catch {
      /* damaged old list */
    }
  });
  return out;
}

export function loadStore(defaultStyle: ReferenceStyle): Store {
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const projects = (Array.isArray(parsed?.projects) ? parsed.projects : [])
        .map((p: unknown) => sanitiseProject(p, defaultStyle))
        .filter((p: Project | null): p is Project => p !== null);
      if (projects.length) {
        const current = projects.some((p: Project) => p.id === parsed.current) ? parsed.current : projects[0].id;
        return { v: 1, current, projects };
      }
    }
    const first = blankProject('My project', defaultStyle);
    first.items = migrateOldLists();
    return { v: 1, current: first.id, projects: [first] };
  } catch {
    const first = blankProject('My project', defaultStyle);
    return { v: 1, current: first.id, projects: [first] };
  }
}

export function saveStore(store: Store): boolean {
  try {
    window.localStorage.setItem(STORE_KEY, JSON.stringify(store));
    return true;
  } catch {
    return false;
  }
}

export function loadPrefs(): Prefs {
  try {
    const p = JSON.parse(window.localStorage.getItem(PREFS_KEY) ?? '{}');
    return {
      font: FONTS.includes(p.font) ? p.font : DEFAULT_PREFS.font,
      size: SIZES.includes(p.size) ? p.size : DEFAULT_PREFS.size,
      sort: p.sort === 'added' ? 'added' : 'az',
    };
  } catch {
    return DEFAULT_PREFS;
  }
}

export function savePrefs(p: Prefs) {
  try {
    window.localStorage.setItem(PREFS_KEY, JSON.stringify(p));
  } catch {
    /* storage unavailable */
  }
}

/** APA does not use accessed dates */
export function formatIn(style: ReferenceStyle, src: SourceInput): Formatted {
  return style === 'apa' ? formatApa({ ...src, accessed: '' }) : formatSource(src);
}

export interface ShownRef {
  id: string;
  added: number;
  segs: Segment[];
  parenthetical: Segment[] | null;
  sortKey: string;
  editable: boolean;
  kind: 'src' | 'pre' | 'legacy';
}

/** The project's references in its style; legacy items from another style are hidden */
export function shownRefs(project: Project, sort: Prefs['sort']): ShownRef[] {
  const out = project.items.flatMap((it): ShownRef[] => {
    if ('src' in it) {
      const fm = formatIn(project.style, it.src);
      return [{ id: it.id, added: it.added, segs: fm.reference, parenthetical: fm.parenthetical, sortKey: fm.sortKey, editable: true, kind: 'src' }];
    }
    if ('pre' in it) return [{ id: it.id, added: it.added, segs: [{ text: it.pre }], parenthetical: null, sortKey: it.pre.toLowerCase(), editable: true, kind: 'pre' }];
    return it.legacy.style === project.style
      ? [{ id: it.id, added: it.added, segs: it.legacy.segs, parenthetical: null, sortKey: it.legacy.sortKey, editable: false, kind: 'legacy' }]
      : [];
  });
  return sort === 'added' ? out.sort((a, b) => a.added - b.added) : out.sort((a, b) => a.sortKey.localeCompare(b.sortKey));
}

/* ---------- Share links ---------- */

const b64url = (bytes: Uint8Array) => {
  let bin = '';
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};
const fromB64url = (str: string) => {
  const bin = atob(str.replace(/-/g, '+').replace(/_/g, '/'));
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
};

async function pipe(bytes: Uint8Array, stream: CompressionStream | DecompressionStream): Promise<Uint8Array> {
  const out = new Blob([bytes as BlobPart]).stream().pipeThrough(stream);
  return new Uint8Array(await new Response(out).arrayBuffer());
}

/** Drop empty fields so links stay short */
function compactSource(src: SourceInput): Record<string, unknown> {
  const o: Record<string, unknown> = {};
  Object.entries(src).forEach(([k, v]) => {
    if (Array.isArray(v) ? v.some((p) => p.surname || p.given) : v) o[k] = v;
  });
  return o;
}

export async function encodeShare(project: Project): Promise<string> {
  const payload = {
    n: project.name,
    s: project.style,
    i: project.items.flatMap((it) => ('src' in it ? [compactSource(it.src)] : 'pre' in it ? [{ pre: it.pre }] : [])),
  };
  const bytes = new TextEncoder().encode(JSON.stringify(payload));
  if (typeof CompressionStream !== 'undefined') {
    try {
      return `z${b64url(await pipe(bytes, new CompressionStream('deflate-raw')))}`;
    } catch {
      /* fall back to plain */
    }
  }
  return `j${b64url(bytes)}`;
}

export async function decodeShare(code: string): Promise<Project | null> {
  try {
    if (code.length > 200000) return null;
    let bytes: Uint8Array = fromB64url(code.slice(1));
    if (code[0] === 'z') {
      if (typeof DecompressionStream === 'undefined') return null;
      bytes = await pipe(bytes, new DecompressionStream('deflate-raw'));
    } else if (code[0] !== 'j') return null;
    const o = JSON.parse(new TextDecoder().decode(bytes));
    const items = (Array.isArray(o?.i) ? o.i : []).slice(0, 500).flatMap((x: unknown, i: number): RefItem[] => {
      if (x && typeof x === 'object' && typeof (x as { pre?: unknown }).pre === 'string') {
        const pre = ((x as { pre: string }).pre).trim().slice(0, 2000);
        return pre ? [{ id: newId(), added: i, pre }] : [];
      }
      const src = sanitiseSource({ authors: [], editors: [], ...(x as object) });
      return src ? [{ id: newId(), added: i, src }] : [];
    });
    return { id: newId(), name: (typeof o?.n === 'string' && o.n.trim().slice(0, 80)) || 'Shared project', style: isStyle(o?.s) ? o.s : 'harvard', created: Date.now(), items };
  } catch {
    return null;
  }
}
