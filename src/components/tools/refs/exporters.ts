/** Downloads for a reference project: Word (.docx), plain text, RIS and BibTeX. Everything is built in the browser. */
import { isDoi, segmentsToText, type Person, type Segment, type SourceInput } from '@/utils/harvard';
import type { Prefs, ReferenceStyle, ShownRef, SourceItem } from './store';

/* ---------- A tiny zip writer (stored, no compression), enough for a .docx ---------- */

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[i] = c >>> 0;
  }
  return t;
})();

function crc32(data: Uint8Array): number {
  let c = 0xffffffff;
  for (let i = 0; i < data.length; i++) c = CRC_TABLE[(c ^ data[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

export function zip(files: { name: string; text: string }[]): Uint8Array {
  const enc = new TextEncoder();
  const chunks: Uint8Array[] = [];
  const central: Uint8Array[] = [];
  let offset = 0;
  const u16 = (v: number) => [v & 0xff, (v >>> 8) & 0xff];
  const u32 = (v: number) => [v & 0xff, (v >>> 8) & 0xff, (v >>> 16) & 0xff, (v >>> 24) & 0xff];
  // 1 January 2026, 00:00 in DOS date/time format
  const dosTime = 0;
  const dosDate = ((2026 - 1980) << 9) | (1 << 5) | 1;
  for (const f of files) {
    const name = enc.encode(f.name);
    const data = enc.encode(f.text);
    const crc = crc32(data);
    const local = new Uint8Array([
      ...u32(0x04034b50), ...u16(20), ...u16(0x0800), ...u16(0), ...u16(dosTime), ...u16(dosDate),
      ...u32(crc), ...u32(data.length), ...u32(data.length), ...u16(name.length), ...u16(0),
    ]);
    chunks.push(local, name, data);
    central.push(
      new Uint8Array([
        ...u32(0x02014b50), ...u16(20), ...u16(20), ...u16(0x0800), ...u16(0), ...u16(dosTime), ...u16(dosDate),
        ...u32(crc), ...u32(data.length), ...u32(data.length), ...u16(name.length), ...u16(0), ...u16(0), ...u16(0), ...u16(0),
        ...u32(0), ...u32(offset),
      ]),
      name,
    );
    offset += local.length + name.length + data.length;
  }
  const centralSize = central.reduce((a, c) => a + c.length, 0);
  const end = new Uint8Array([
    ...u32(0x06054b50), ...u16(0), ...u16(0), ...u16(files.length), ...u16(files.length), ...u32(centralSize), ...u32(offset), ...u16(0),
  ]);
  const all = [...chunks, ...central, end];
  const out = new Uint8Array(all.reduce((a, c) => a + c.length, 0));
  let p = 0;
  all.forEach((c) => {
    out.set(c, p);
    p += c.length;
  });
  return out;
}

/* ---------- Word ---------- */

const xml = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function heading(style: ReferenceStyle) {
  return style === 'apa' ? 'References' : 'Reference list';
}

function docxRun(text: string, font: string, half: number, opts: { italic?: boolean; bold?: boolean } = {}) {
  const f = xml(font);
  return `<w:r><w:rPr><w:rFonts w:ascii="${f}" w:hAnsi="${f}" w:cs="${f}" w:eastAsia="${f}"/>${opts.bold ? '<w:b/>' : ''}${opts.italic ? '<w:i/>' : ''}<w:sz w:val="${half}"/><w:szCs w:val="${half}"/></w:rPr><w:t xml:space="preserve">${xml(text)}</w:t></w:r>`;
}

export function buildDocx(refs: ShownRef[], style: ReferenceStyle, prefs: Prefs): Uint8Array {
  const half = prefs.size * 2;
  // APA: double spacing, title centred and bold. Harvard (Cite Them Right): 1.5 spacing, title bold.
  const line = style === 'apa' ? 480 : 360;
  const titlePara = `<w:p><w:pPr>${style === 'apa' ? '<w:jc w:val="center"/>' : ''}<w:spacing w:after="240" w:line="${line}" w:lineRule="auto"/></w:pPr>${docxRun(heading(style), prefs.font, half, { bold: true })}</w:p>`;
  const paras = refs
    .map(
      (r) =>
        `<w:p><w:pPr><w:spacing w:after="${style === 'apa' ? 0 : 160}" w:line="${line}" w:lineRule="auto"/><w:ind w:left="720" w:hanging="720"/></w:pPr>${r.segs
          .map((sg: Segment) => docxRun(sg.text, prefs.font, half, { italic: sg.italic }))
          .join('')}</w:p>`,
    )
    .join('');
  const document = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${titlePara}${paras}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="708" w:footer="708" w:gutter="0"/></w:sectPr></w:body></w:document>`;
  return zip([
    {
      name: '[Content_Types].xml',
      text: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>`,
    },
    {
      name: '_rels/.rels',
      text: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`,
    },
    { name: 'word/document.xml', text: document },
  ]);
}

export function buildText(refs: ShownRef[], style: ReferenceStyle): string {
  return `${heading(style)}\r\n\r\n${refs.map((r) => segmentsToText(r.segs)).join('\r\n\r\n')}\r\n`;
}

/* ---------- RIS (Zotero, EndNote, Mendeley) ---------- */

const RIS_TYPES: Record<SourceInput['type'], string> = {
  book: 'BOOK',
  chapter: 'CHAP',
  journal: 'JOUR',
  website: 'ELEC',
  newspaper: 'NEWS',
  report: 'RPRT',
  thesis: 'THES',
  video: 'VIDEO',
  conference: 'CPAPER',
  lecture: 'GEN',
};

const personName = (p: Person) => [p.surname.trim(), p.given.trim()].filter(Boolean).join(', ');
const doiOf = (url: string) => (isDoi(url) ? url.trim().replace(/^https?:\/\/(dx\.)?doi\.org\//i, '').replace(/^doi:\s*/i, '') : '');

function pageParts(pages: string): [string, string] {
  const [a, b] = pages.split(/\s*[-\u2013\u2014]\s*/);
  return [a?.trim() ?? '', b?.trim() ?? ''];
}

export function buildRis(items: SourceItem[]): string {
  const lines: string[] = [];
  const add = (tag: string, v: string | undefined) => {
    if (v && v.trim()) lines.push(`${tag}  - ${v.trim().replace(/\s+/g, ' ')}`);
  };
  items.forEach(({ src }) => {
    add('TY', RIS_TYPES[src.type]);
    src.authors.filter((p) => p.surname).forEach((p) => add('AU', personName(p)));
    if (!src.authors.some((p) => p.surname) && src.org) add('AU', src.org);
    src.editors.filter((p) => p.surname).forEach((p) => add('ED', personName(p)));
    add('TI', src.title);
    if (src.type === 'journal') add('JO', src.container);
    else if (src.type === 'chapter' || src.type === 'conference') add('T2', src.container);
    else if (src.container) add('T2', src.container);
    if (!src.noDate && src.year) {
      add('PY', src.year);
      if (src.month) add('DA', `${src.year}/${src.month.padStart(2, '0')}/${src.day ? src.day.padStart(2, '0') : ''}/`);
    }
    add('ET', src.edition);
    add('PB', src.publisher);
    add('VL', src.volume);
    add('IS', src.issue);
    const [sp, ep] = pageParts(src.pages);
    add('SP', sp);
    add('EP', ep);
    const doi = doiOf(src.url);
    if (doi) add('DO', doi);
    else {
      add('UR', src.url);
      if (src.url) add('Y2', src.accessed);
    }
    lines.push('ER  - ', '');
  });
  return lines.join('\r\n');
}

/* ---------- BibTeX ---------- */

const bib = (t: string) => t.replace(/\\/g, '\\textbackslash{}').replace(/([&%$#_{}])/g, '\\$1').replace(/~/g, '\\textasciitilde{}').replace(/\^/g, '\\textasciicircum{}');

function bibType(src: SourceInput): string {
  switch (src.type) {
    case 'book':
      return 'book';
    case 'chapter':
      return 'incollection';
    case 'journal':
    case 'newspaper':
      return 'article';
    case 'report':
      return 'techreport';
    case 'thesis':
      return src.kind && src.kind !== 'phd' ? 'mastersthesis' : 'phdthesis';
    case 'conference':
      return 'inproceedings';
    default:
      return 'misc';
  }
}

export function buildBibtex(items: SourceItem[]): string {
  const used = new Set<string>();
  return items
    .map(({ src }) => {
      const first = (src.authors.find((p) => p.surname)?.surname || src.org || 'ref').normalize('NFD').replace(/[^A-Za-z]/g, '').toLowerCase() || 'ref';
      const word = (src.title.split(/\s+/).find((w) => w.length > 3) ?? '').normalize('NFD').replace(/[^A-Za-z]/g, '').toLowerCase();
      let key = `${first}${src.noDate ? 'nd' : src.year}${word}`;
      let k = key;
      for (let i = 2; used.has(k); i++) k = `${key}${String.fromCharCode(96 + i)}`;
      key = k;
      used.add(key);
      const fields: [string, string][] = [];
      const add = (name: string, v: string | undefined, raw = false) => {
        if (v && v.trim()) fields.push([name, raw ? v.trim() : bib(v.trim())]);
      };
      const authors = src.authors.filter((p) => p.surname).map((p) => bib(personName(p)));
      if (authors.length) fields.push(['author', authors.join(' and ')]);
      else if (src.org) fields.push(['author', `{${bib(src.org)}}`]);
      const editors = src.editors.filter((p) => p.surname).map((p) => bib(personName(p)));
      if (editors.length) fields.push(['editor', editors.join(' and ')]);
      add('title', src.title);
      if (src.type === 'journal' || src.type === 'newspaper') add('journal', src.container);
      else if (src.type === 'chapter' || src.type === 'conference') add('booktitle', src.container);
      else if (src.container) add('howpublished', src.container);
      if (!src.noDate) add('year', src.year);
      add('edition', src.edition);
      if (src.type === 'thesis') add('school', src.publisher);
      else if (src.type === 'report') add('institution', src.publisher);
      else add('publisher', src.publisher);
      add('volume', src.volume);
      add('number', src.issue);
      add('pages', src.pages.replace(/\s*[-\u2013\u2014]\s*/, '--'));
      const doi = doiOf(src.url);
      if (doi) add('doi', doi, true);
      else {
        add('url', src.url, true);
        if (src.url) add('urldate', src.accessed, true);
      }
      return `@${bibType(src)}{${key},\n${fields.map(([f, v]) => `  ${f} = {${v}}`).join(',\n')}\n}`;
    })
    .join('\n\n');
}

export function download(name: string, data: Uint8Array | string, mime: string) {
  const blob = new Blob([typeof data === 'string' ? data : (data as BlobPart)], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export function fileBase(name: string) {
  return name.trim().replace(/[^\w\- ]+/g, '').replace(/\s+/g, '-').slice(0, 60) || 'references';
}
