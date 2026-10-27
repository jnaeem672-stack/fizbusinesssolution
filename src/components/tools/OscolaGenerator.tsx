'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { FileDown, Loader2, Pencil, Plus, Search, Sparkles, Trash2, X } from 'lucide-react';
import {
  bareDoi,
  emptyOscola,
  formatOscola,
  hasEnough,
  OSCOLA_GROUP_TITLES,
  OSCOLA_TYPE_LABELS,
  oscolaGroupOf,
  type OscolaFormatted,
  type OscolaGroup,
  type OscolaInput,
  type OscolaPerson,
  type OscolaType,
} from '@/utils/oscola';
import { segmentsToHtml, segmentsToText, type Segment, type SourceType } from '@/utils/harvard';
import { autocite } from '@/utils/cite/lookup';
import type { CiteData, CiteResult } from '@/utils/cite/types';
import { CopyButton, Rich, copyRich } from './refs/ui';
import { download, zip } from './refs/exporters';

const STORE_KEY = 'fizbs-oscola-v1';

const PRIMARY: OscolaType[] = ['case', 'act', 'si', 'eu-leg', 'eu-case', 'echr'];
const SECONDARY: OscolaType[] = ['book', 'chapter', 'journal', 'website', 'newspaper', 'thesis', 'report'];
/** Source types that can be filled in from a DOI, ISBN, link or title */
const LOOKUP: Partial<Record<OscolaType, string>> = {
  book: 'Paste an ISBN, or type the book title',
  chapter: 'Paste the DOI of the chapter',
  journal: 'Paste a DOI, or type the article title',
  website: 'Paste the link to the page or blog post',
  newspaper: 'Paste the link to the article',
  report: 'Paste a link or DOI to the report',
  thesis: 'Paste a DOI or repository link',
};

const GROUP_ORDER: OscolaGroup[] = ['cases', 'legislation', 'secondary'];
const SUBGROUP_TITLES: Record<OscolaGroup, string[]> = {
  cases: ['United Kingdom', 'European Union', 'European Court of Human Rights'],
  legislation: ['UK statutes', 'UK statutory instruments', 'EU legislation'],
  secondary: [''],
};
const ENTRY_LABEL: Record<OscolaGroup, string> = {
  cases: 'Table of Cases entry',
  legislation: 'Table of Legislation entry',
  secondary: 'Bibliography entry',
};

const inputCls =
  'w-full min-w-0 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-base text-navy outline-none focus:border-primary focus:ring-2 focus:ring-primary/15';
const labelCls = 'block text-xs font-black uppercase tracking-wider text-gray-600 mb-1.5';

interface Item {
  id: string;
  added: number;
  src: OscolaInput;
}

function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

const newId = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

function fresh(type: OscolaType): OscolaInput {
  return { ...emptyOscola(type), accessed: today() };
}

/** Worked examples (from the Oxford OSCOLA 5th edition guide) so students can see each format */
const EXAMPLES: Record<OscolaType, Partial<OscolaInput>> = {
  case: { title: 'Corr v IBC Vehicles Ltd', neutral: '[2008] UKHL 13', report: '[2008] 1 AC 884', pinpoint: '[12]' },
  act: { title: 'Human Rights Act', year: '1998', provision: 's 2' },
  si: { title: 'Eggs and Chicks (England) Regulations', year: '2009', siNumber: '2009/2163', provision: 'reg 7(2)' },
  'eu-leg': {
    euName: 'Regulation (EC) No 593/2008 of the European Parliament and of the Council',
    title: 'of 17 June 2008 on the law applicable to contractual obligations (Rome I)',
    year: '2008',
    oj: 'L177/6',
    shortName: 'Rome I Regulation',
  },
  'eu-case': { caseNumber: 'C-403/03', title: 'Schempp v Finanzamt', ecli: 'EU:C:2005:446', pinpoint: '[19]' },
  echr: { title: 'Othman (Abu Qatada) v United Kingdom', appNo: '8139/09', decided: '2012-01-17' },
  book: { authors: [{ given: 'HLA', surname: 'Hart' }], title: 'The Concept of Law', edition: '2', publisher: 'Clarendon Press', year: '1994', pinpoint: '135' },
  chapter: {
    authors: [{ given: 'Andrew', surname: 'Burrows' }],
    title: 'A New Dawn for the Law of Illegality',
    editors: [{ given: 'Sarah', surname: 'Green' }, { given: 'Alan', surname: 'Bogg' }],
    container: 'Illegality after Patel v Mirza',
    publisher: 'Hart Publishing',
    year: '2018',
  },
  journal: { authors: [{ given: 'JAG', surname: 'Griffith' }], title: 'The Common Law and the Political Constitution', year: '2001', volume: '117', container: 'LQR', firstPage: '42', pinpoint: '64' },
  website: { authors: [{ given: '', surname: 'Cyclefree' }], title: 'Is This Really Necessary, Minister?', container: 'Legal Feminist', date: '2023-04-27', url: 'https://perma.cc/3THK-P4AX', persistent: true },
  newspaper: { authors: [{ given: 'Jane', surname: 'Croft' }], title: 'Supreme Court Warns on Quality', container: 'Financial Times', date: '2010-07-01', pinpoint: '3' },
  thesis: { authors: [{ given: 'Ambika', surname: 'Vadehra' }], title: 'Exploitative Data Harvesting as an Article 102 TFEU Violation', degree: 'MPhil thesis', institution: 'University of Oxford', year: '2021' },
  report: { authors: [{ given: '', surname: '' }], org: 'Law Commission', title: 'The Illegality Defence', series: 'Law Com No 320', year: '2010', pinpoint: 'para 3.12' },
};

const CITE_TYPE: Record<SourceType, OscolaType> = {
  book: 'book',
  chapter: 'chapter',
  journal: 'journal',
  website: 'website',
  newspaper: 'newspaper',
  report: 'report',
  thesis: 'thesis',
  video: 'website',
  conference: 'chapter',
  lecture: 'website',
};

const DEGREES: Record<string, string> = { phd: 'PhD thesis', mphil: 'MPhil thesis', msc: 'MSc dissertation', ma: 'MA dissertation', mba: 'MBA dissertation', ug: 'Undergraduate dissertation' };

function isoFrom(d: CiteData): string {
  const y = d.year.trim();
  const m = parseInt(d.month, 10);
  const day = parseInt(d.day, 10);
  if (!/^\d{4}$/.test(y) || !(m >= 1 && m <= 12) || !(day >= 1 && day <= 31)) return '';
  return `${y}-${String(m).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

/** Turn a lookup result into the OSCOLA form */
function fromCite(d: CiteData): OscolaInput {
  const type = CITE_TYPE[d.type] ?? 'website';
  const src = fresh(type);
  const people = (list: CiteData['authors']): OscolaPerson[] => list.map((p) => ({ given: p.given, surname: p.surname }));
  src.authors = d.authors.length ? people(d.authors) : [{ given: '', surname: '' }];
  src.org = d.org;
  src.editors = people(d.editors);
  src.title = d.title;
  src.year = d.year;
  src.container = d.container;
  src.publisher = d.publisher;
  src.edition = d.edition;
  src.volume = d.volume;
  src.firstPage = d.pages.split(/[-–]/)[0].trim();
  src.date = isoFrom(d);
  if (type === 'thesis') {
    src.degree = DEGREES[d.kind] ?? 'PhD thesis';
    src.institution = d.publisher;
  }
  // Online sources keep their link; for books and print articles OSCOLA does not need one
  if (type === 'website' || type === 'newspaper' || type === 'report') {
    if (/doi\.org\//i.test(d.url)) src.doi = bareDoi(d.url);
    else src.url = d.url;
  }
  return src;
}

/* ---------- Small form parts ---------- */

function Field({ id, label, hint, children, wide }: { id: string; label: string; hint?: string; children: ReactNode; wide?: boolean }) {
  return (
    <div className={wide ? 'sm:col-span-2' : undefined}>
      <label htmlFor={id} className={labelCls}>
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-gray-500 leading-snug">{hint}</p>}
    </div>
  );
}

function PeopleField({ legend, people, onChange, hint }: { legend: string; people: OscolaPerson[]; onChange: (p: OscolaPerson[]) => void; hint?: string }) {
  const list = people.length ? people : [{ given: '', surname: '' }];
  const set = (i: number, key: keyof OscolaPerson, v: string) => onChange(list.map((p, j) => (j === i ? { ...p, [key]: v } : p)));
  return (
    <fieldset className="sm:col-span-2">
      <legend className={labelCls}>{legend}</legend>
      <div className="space-y-2">
        {list.map((p, i) => (
          <div key={i} className="flex gap-2">
            <input
              aria-label={`${legend} ${i + 1} first name or initials`}
              className={inputCls}
              placeholder="First name or initials"
              value={p.given}
              onChange={(e) => set(i, 'given', e.target.value)}
            />
            <input
              aria-label={`${legend} ${i + 1} surname`}
              className={inputCls}
              placeholder="Surname"
              value={p.surname}
              onChange={(e) => set(i, 'surname', e.target.value)}
            />
            {list.length > 1 && (
              <button
                type="button"
                onClick={() => onChange(list.filter((_, j) => j !== i))}
                className="shrink-0 rounded-lg px-2 text-gray-500 hover:bg-gray-100 hover:text-red-600"
                aria-label={`Remove ${legend.toLowerCase()} ${i + 1}`}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
      </div>
      <button type="button" onClick={() => onChange([...list, { given: '', surname: '' }])} className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline">
        <Plus className="h-4 w-4" /> Add another
      </button>
      {hint && <p className="mt-1 text-xs text-gray-500 leading-snug">{hint}</p>}
    </fieldset>
  );
}

const html = (segs: Segment[]) => segmentsToHtml(segs);
const text = (segs: Segment[]) => segmentsToText(segs);

/* ---------- Word export ---------- */

const xmlEsc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function run(t: string, opts: { italic?: boolean; bold?: boolean } = {}) {
  const f = 'Times New Roman';
  return `<w:r><w:rPr><w:rFonts w:ascii="${f}" w:hAnsi="${f}" w:cs="${f}" w:eastAsia="${f}"/>${opts.bold ? '<w:b/>' : ''}${opts.italic ? '<w:i/>' : ''}<w:sz w:val="24"/><w:szCs w:val="24"/></w:rPr><w:t xml:space="preserve">${xmlEsc(t)}</w:t></w:r>`;
}

function buildDocx(sections: { title: string; sub: { title: string; rows: Segment[][] }[] }[]): Uint8Array {
  const body = sections
    .map(
      (s) =>
        `<w:p><w:pPr><w:spacing w:before="240" w:after="160"/></w:pPr>${run(s.title, { bold: true })}</w:p>` +
        s.sub
          .map(
            (sub) =>
              (sub.title ? `<w:p><w:pPr><w:spacing w:before="120" w:after="80"/></w:pPr>${run(sub.title, { italic: true })}</w:p>` : '') +
              sub.rows
                .map((segs) => `<w:p><w:pPr><w:spacing w:after="120" w:line="360" w:lineRule="auto"/><w:ind w:left="720" w:hanging="720"/></w:pPr>${segs.map((sg) => run(sg.text, { italic: sg.italic })).join('')}</w:p>`)
                .join(''),
          )
          .join(''),
    )
    .join('');
  const document = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${body}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="708" w:footer="708" w:gutter="0"/></w:sectPr></w:body></w:document>`;
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

/* ---------- The generator ---------- */

export default function OscolaGenerator() {
  const [src, setSrc] = useState<OscolaInput>(() => fresh('case'));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [query, setQuery] = useState('');
  const [busy, setBusy] = useState(false);
  const [lookupMsg, setLookupMsg] = useState('');
  const [choices, setChoices] = useState<CiteResult[]>([]);
  const [confirmClear, setConfirmClear] = useState(false);
  const [notice, setNotice] = useState('');

  // The list is kept in this browser only
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed.filter((x) => x && x.id && x.src && x.src.type).map((x) => ({ ...x, src: { ...emptyOscola(x.src.type), ...x.src } })));
      }
    } catch {
      /* storage blocked: the list still works for this visit */
    }
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, loaded]);

  const preview = useMemo(() => formatOscola(src), [src]);
  const ready = hasEnough(src);
  const set = <K extends keyof OscolaInput>(key: K, value: OscolaInput[K]) => setSrc((s) => ({ ...s, [key]: value }));

  const chooseType = (type: OscolaType) => {
    setSrc(fresh(type));
    setEditingId(null);
    setQuery('');
    setLookupMsg('');
    setChoices([]);
  };

  const fillExample = () => setSrc({ ...fresh(src.type), ...EXAMPLES[src.type] });

  const runLookup = async () => {
    const q = query.trim();
    if (!q) return;
    setBusy(true);
    setLookupMsg('');
    setChoices([]);
    try {
      const out = await autocite(q);
      if (out.kind === 'single') {
        setSrc(fromCite(out.result.data));
        setLookupMsg(`Details filled in from ${out.result.source}. Check them against your source.`);
      } else if (out.kind === 'many') {
        setChoices(out.results.slice(0, 6));
      } else {
        setLookupMsg('Nothing was found. Please fill in the details below yourself.');
      }
    } catch {
      setLookupMsg('The lookup did not work just now. Please fill in the details below yourself.');
    } finally {
      setBusy(false);
    }
  };

  const save = () => {
    if (!ready) return;
    if (editingId) {
      setItems((list) => list.map((it) => (it.id === editingId ? { ...it, src } : it)));
      setNotice('Updated in your list.');
    } else {
      setItems((list) => [...list, { id: newId(), added: Date.now(), src }]);
      setNotice('Added to your list.');
    }
    setEditingId(null);
    setSrc(fresh(src.type));
    setQuery('');
    setLookupMsg('');
    setTimeout(() => setNotice(''), 2500);
  };

  const edit = (it: Item) => {
    setSrc({ ...emptyOscola(it.src.type), ...it.src });
    setEditingId(it.id);
    setLookupMsg('');
    setChoices([]);
    if (typeof window !== 'undefined') document.getElementById('oscola-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Sorted list: tables of cases and legislation first, then the bibliography
  const sections = useMemo(() => {
    const formatted = items.map((it) => ({ it, f: formatOscola(it.src) }));
    return GROUP_ORDER.map((g) => {
      const inGroup = formatted.filter((x) => x.f.group === g);
      const sub = SUBGROUP_TITLES[g]
        .map((title, i) => ({
          title,
          rows: inGroup.filter((x) => x.f.subgroup === i).sort((a, b) => a.f.sortKey.localeCompare(b.f.sortKey)),
        }))
        .filter((s) => s.rows.length);
      return { group: g, title: OSCOLA_GROUP_TITLES[g], sub, count: inGroup.length };
    }).filter((s) => s.count);
  }, [items]);

  const exportSections = sections.map((s) => ({
    title: s.title,
    sub: s.sub.map((sub) => ({ title: s.sub.length > 1 ? sub.title : '', rows: sub.rows.map((r) => r.f.entry) })),
  }));

  const copyAll = async () => {
    const h = exportSections
      .map((s) => `<p><b>${s.title}</b></p>${s.sub.map((sub) => `${sub.title ? `<p><i>${sub.title}</i></p>` : ''}${sub.rows.map((r) => `<p>${html(r)}</p>`).join('')}`).join('')}`)
      .join('');
    const t = exportSections.map((s) => `${s.title}\n\n${s.sub.map((sub) => `${sub.title ? `${sub.title}\n` : ''}${sub.rows.map((r) => text(r)).join('\n')}`).join('\n\n')}`).join('\n\n');
    if (await copyRich(h, t)) {
      setNotice('Your tables and bibliography were copied.');
      setTimeout(() => setNotice(''), 2500);
    }
  };

  const id = (k: string) => `osc-${k}`;
  const tf = (key: keyof OscolaInput, label: string, placeholder: string, hint?: string, wide?: boolean) => (
    <Field id={id(key)} label={label} hint={hint} wide={wide}>
      <input id={id(key)} className={inputCls} placeholder={placeholder} value={String(src[key] ?? '')} onChange={(e) => set(key, e.target.value as never)} />
    </Field>
  );
  const df = (key: 'decided' | 'date' | 'accessed', label: string, hint?: string) => (
    <Field id={id(key)} label={label} hint={hint}>
      <input id={id(key)} type="date" className={inputCls} value={src[key]} onChange={(e) => set(key, e.target.value)} />
    </Field>
  );
  const cb = (key: 'grandChamber' | 'persistent' | 'editedBook', label: string) => (
    <label className="sm:col-span-2 flex items-start gap-2.5 text-sm font-semibold text-navy">
      <input type="checkbox" className="mt-0.5 h-4 w-4 accent-[#C9A227]" checked={src[key]} onChange={(e) => set(key, e.target.checked)} />
      {label}
    </label>
  );
  const authors = (legend = 'Author') => <PeopleField legend={legend} people={src.authors} onChange={(p) => set('authors', p)} />;
  const online = () => (
    <>
      {tf('url', 'Link (URL)', 'https://...', 'A persistent link such as Perma.cc is best. Do not cite a downloaded PDF.', true)}
      {cb('persistent', 'This is a persistent link (for example Perma.cc), so no accessed date is needed')}
      {!src.persistent && df('accessed', 'Date accessed')}
      {tf('doi', 'DOI (if it has one)', '10.17176/20181005-145902-0', 'With a DOI, OSCOLA needs no link or accessed date.')}
    </>
  );

  const fields: Record<OscolaType, ReactNode> = {
    case: (
      <>
        {tf('title', 'Case name', 'Donoghue v Stevenson', 'Party names as in the law report. Use R v Smith for criminal cases.', true)}
        {tf('neutral', 'Neutral citation', '[2008] UKHL 13', 'Cases from 2001 onwards. Leave empty for older cases.')}
        {tf('report', 'Law report', '[2008] 1 AC 884', 'The best report: [year] volume series first page.')}
        {tf('court', 'Court', 'HL, CA, KBD, QBD, Ch D, PC', 'Only if there is no neutral citation. Use QBD before 9 September 2022 and KBD after.')}
        {df('decided', 'Date of judgment', 'Only for an unreported case with no neutral citation.')}
        {tf('pinpoint', 'Pinpoint', '[24] or 580', 'A paragraph in square brackets, or a page number.')}
        {tf('judge', 'Judge', 'Lord Reed', 'Optional. Leave out territorial titles (Lord Scott, not Lord Scott of Foscote).')}
        {tf('shortName', 'Short name for later footnotes', 'Corr', 'Optional. We suggest one from the case name.')}
      </>
    ),
    act: (
      <>
        {tf('title', 'Short title of the Act', 'Human Rights Act', undefined, true)}
        {tf('year', 'Year', '1998')}
        {tf('provision', 'Section', 's 2 or ss 1(1) and 4(3)', 'Optional. Use s for one section and ss for more.')}
        {tf('shortName', 'Short form (optional)', 'HRA 1998', 'Define it once here and use it in later footnotes.', true)}
      </>
    ),
    si: (
      <>
        {tf('title', 'Name of the statutory instrument', 'Eggs and Chicks (England) Regulations', undefined, true)}
        {tf('year', 'Year', '2009')}
        {tf('siNumber', 'SI number', '2009/2163')}
        {tf('provision', 'Regulation, rule or article', 'reg 7(2)', 'Optional.')}
      </>
    ),
    'eu-leg': (
      <>
        {tf('euName', 'Type and number', 'Council Directive 2002/60/EC', 'For example Regulation (EU) 2016/679 of the European Parliament and of the Council.', true)}
        {tf('title', 'Date and title', 'of 27 June 2002 laying down specific provisions for...', undefined, true)}
        {tf('year', 'Year of the Official Journal', '2002')}
        {tf('oj', 'Official Journal reference', 'L192/27', 'Series, issue and first page.')}
        {tf('provision', 'Article', 'art 5', 'Optional.')}
        {tf('shortName', 'Short form (optional)', 'GDPR')}
      </>
    ),
    'eu-case': (
      <>
        {tf('caseNumber', 'Case number', 'C-403/03', 'For joined cases, write Joined Cases C-1/23 and C-2/23.')}
        {tf('title', 'Case name', 'Schempp v Finanzamt')}
        {tf('ecli', 'European Case Law Identifier (ECLI)', 'EU:C:2005:446', 'OSCOLA 5 uses the ECLI instead of a report reference.')}
        {tf('pinpoint', 'Pinpoint paragraph', '[19]')}
        {tf('shortName', 'Short name for later footnotes', 'Schempp', 'Optional.')}
      </>
    ),
    echr: (
      <>
        {tf('title', 'Case name', 'Othman (Abu Qatada) v United Kingdom', undefined, true)}
        {tf('appNo', 'Application number(s)', '8139/09', 'OSCOLA 5 cites ECHR cases by application number.')}
        {df('decided', 'Date of judgment or decision')}
        {cb('grandChamber', 'Grand Chamber judgment [GC]')}
        {tf('pinpoint', 'Pinpoint paragraph', '[115]')}
        {tf('shortName', 'Short name for later footnotes', 'Othman', 'Optional.')}
      </>
    ),
    book: (
      <>
        {authors(src.editedBook ? 'Editor' : 'Author')}
        {cb('editedBook', 'This is an edited book: these people are the editors')}
        {tf('title', 'Book title', 'The Concept of Law', undefined, true)}
        {tf('edition', 'Edition', '2', 'Leave empty for a first edition.')}
        {tf('publisher', 'Publisher', 'Clarendon Press', 'No place of publication is needed.')}
        {tf('year', 'Year', '1994')}
        {tf('pinpoint', 'Pinpoint', '135 or para 4.51', 'A page number, or para for a paragraph.')}
      </>
    ),
    chapter: (
      <>
        {authors('Chapter author')}
        {tf('title', 'Chapter title', 'A New Dawn for the Law of Illegality', undefined, true)}
        <PeopleField legend="Book editor" people={src.editors} onChange={(p) => set('editors', p)} />
        {tf('container', 'Book title', 'Illegality after Patel v Mirza', undefined, true)}
        {tf('edition', 'Edition', '', 'Leave empty for a first edition.')}
        {tf('publisher', 'Publisher', 'Hart Publishing')}
        {tf('year', 'Year', '2018')}
        {tf('pinpoint', 'Pinpoint page', '45')}
      </>
    ),
    journal: (
      <>
        {authors()}
        {tf('title', 'Article title', 'The Common Law and the Political Constitution', undefined, true)}
        {tf('year', 'Year', '2001')}
        {tf('volume', 'Volume', '117', 'If the journal has no volume numbers, leave empty and the year goes in square brackets.')}
        {tf('container', 'Journal (abbreviation)', 'LQR', 'Use the standard abbreviation, for example LQR, MLR, CLJ, PL.')}
        {tf('issue', 'Issue', '', 'Only if each issue starts at page 1.')}
        {tf('firstPage', 'First page', '42')}
        {tf('pinpoint', 'Pinpoint page', '64')}
        {tf('doi', 'DOI (online-only articles)', '', 'Optional.')}
      </>
    ),
    website: (
      <>
        {authors('Author or blogger')}
        {tf('org', 'Or organisation as author', 'Ministry of Justice', 'Use this when there is no named person.')}
        {tf('title', 'Page or post title', 'Is This Really Necessary, Minister?', undefined, true)}
        {tf('container', 'Website or blog name', 'Legal Feminist')}
        {df('date', 'Date published')}
        {online()}
      </>
    ),
    newspaper: (
      <>
        {authors()}
        {tf('title', 'Article title', 'Supreme Court Warns on Quality', undefined, true)}
        {tf('container', 'Newspaper', 'Financial Times')}
        {df('date', 'Date')}
        {tf('pinpoint', 'Page', '3', 'For a print article, if known.')}
        {online()}
      </>
    ),
    thesis: (
      <>
        {authors()}
        {tf('title', 'Thesis title', 'Exploitative Data Harvesting as an Article 102 TFEU Violation', undefined, true)}
        {tf('degree', 'Type of thesis', 'PhD thesis or MPhil thesis')}
        {tf('institution', 'University', 'University of Oxford')}
        {tf('year', 'Year', '2021')}
        {tf('pinpoint', 'Pinpoint page', '')}
      </>
    ),
    report: (
      <>
        {authors()}
        {tf('org', 'Or organisation as author', 'Law Commission')}
        {tf('title', 'Title', 'The Illegality Defence', undefined, true)}
        {tf('series', 'Series and number', 'Law Com No 320, Cm 6150 or CP 815', 'Command papers from 2019 use CP.')}
        {tf('publisher', 'Publisher', '', 'Only if there is no series number.')}
        {tf('year', 'Year', '2010')}
        {tf('pinpoint', 'Pinpoint', 'para 3.12')}
        {tf('url', 'Link (optional)', 'https://...', undefined, true)}
        {src.url && !src.persistent && df('accessed', 'Date accessed')}
      </>
    ),
  };

  const typeButton = (t: OscolaType) => (
    <button
      key={t}
      type="button"
      onClick={() => chooseType(t)}
      aria-pressed={src.type === t}
      className={`rounded-full border px-3.5 py-2 text-sm font-bold transition-colors ${src.type === t ? 'border-navy bg-navy text-white' : 'border-gray-200 bg-white text-navy hover:border-primary'}`}
    >
      {OSCOLA_TYPE_LABELS[t]}
    </button>
  );

  const group = oscolaGroupOf(src.type);

  return (
    <div>
      {/* Source type */}
      <div className="space-y-3">
        <div>
          <p className="mb-2 text-[11px] font-black uppercase tracking-widest text-gray-500">Cases and legislation</p>
          <div className="flex flex-wrap gap-2">{PRIMARY.map(typeButton)}</div>
        </div>
        <div>
          <p className="mb-2 text-[11px] font-black uppercase tracking-widest text-gray-500">Books, articles and other sources</p>
          <div className="flex flex-wrap gap-2">{SECONDARY.map(typeButton)}</div>
        </div>
      </div>

      <div id="oscola-form" className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5 scroll-mt-[130px]">
        {/* Form */}
        <div className="lg:col-span-3">
          {LOOKUP[src.type] && (
            <div className="mb-5 rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <label htmlFor="osc-lookup" className={labelCls}>
                Fill in automatically
              </label>
              <div className="flex gap-2">
                <input
                  id="osc-lookup"
                  className={inputCls}
                  placeholder={LOOKUP[src.type]}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      void runLookup();
                    }
                  }}
                />
                <button type="button" onClick={() => void runLookup()} disabled={busy || !query.trim()} className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-navy px-4 text-sm font-bold text-white disabled:opacity-50">
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />} Search
                </button>
              </div>
              {lookupMsg && <p className="mt-2 text-sm text-gray-600" role="status">{lookupMsg}</p>}
              {choices.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {choices.map((r, i) => (
                    <li key={i}>
                      <button
                        type="button"
                        onClick={() => {
                          setSrc(fromCite(r.data));
                          setChoices([]);
                          setLookupMsg(`Details filled in from ${r.source}. Check them against your source.`);
                        }}
                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-left text-sm hover:border-primary"
                      >
                        <span className="font-bold text-navy">{r.data.title || 'Untitled'}</span>
                        <span className="block text-xs text-gray-500">
                          {[r.data.authors.map((a) => a.surname).filter(Boolean).slice(0, 3).join(', '), r.data.container, r.data.year].filter(Boolean).join(' · ')}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-lg font-extrabold text-navy">{editingId ? 'Edit' : 'Details'}: {OSCOLA_TYPE_LABELS[src.type]}</p>
            <button type="button" onClick={fillExample} className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline">
              <Sparkles className="h-4 w-4" /> Show an example
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{fields[src.type]}</div>
        </div>

        {/* Live preview */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl bg-navy p-5 text-white lg:sticky lg:top-[120px]" aria-live="polite">
            <p className="text-[11px] font-black uppercase tracking-widest text-white/60">Footnote (first citation)</p>
            <p className="mt-2 min-h-[3rem] text-[17px] leading-relaxed font-serif">{ready ? <Rich segs={preview.footnote} /> : <span className="text-white/50">Fill in the details to see your OSCOLA footnote.</span>}</p>
            {ready && <div className="mt-3"><CopyButton html={html(preview.footnote)} text={text(preview.footnote)} label="Copy footnote">Copy footnote</CopyButton></div>}

            {ready && preview.shortForm.length > 0 && (
              <>
                <p className="mt-5 text-[11px] font-black uppercase tracking-widest text-white/60">Later footnotes</p>
                <p className="mt-2 text-[16px] font-serif"><Rich segs={preview.shortForm} /></p>
                <p className="mt-1 text-xs text-white/60">Change 1 to the number of the footnote where you first cited it. OSCOLA 5 does not use ibid.</p>
              </>
            )}
            {ready && group === 'legislation' && (
              <p className="mt-4 text-xs text-white/60">Later footnotes repeat the legislation, or use the short form you defined.</p>
            )}

            {ready && (
              <>
                <p className="mt-5 text-[11px] font-black uppercase tracking-widest text-white/60">{ENTRY_LABEL[group]}</p>
                <p className="mt-2 text-[16px] font-serif"><Rich segs={preview.entry} /></p>
              </>
            )}

            <div className="mt-5 flex flex-wrap gap-2">
              <button type="button" onClick={save} disabled={!ready} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-black text-navy disabled:opacity-40">
                <Plus className="h-4 w-4" /> {editingId ? 'Save changes' : 'Add to my list'}
              </button>
              <button type="button" onClick={() => chooseType(src.type)} className="rounded-xl border border-white/30 px-4 py-2.5 text-sm font-bold text-white hover:bg-white/10">
                {editingId ? 'Cancel' : 'Clear form'}
              </button>
            </div>
            {notice && <p className="mt-3 text-sm font-bold text-primary" role="status">{notice}</p>}
          </div>
        </div>
      </div>

      {/* The list */}
      <div className="mt-8 border-t border-gray-100 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-extrabold text-navy">
            Your OSCOLA list {items.length > 0 && <span className="text-base font-bold text-gray-500">({items.length})</span>}
          </h2>
          {items.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => void copyAll()} className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-navy hover:border-primary">
                Copy all
              </button>
              <button
                type="button"
                onClick={() => download('oscola-references.docx', buildDocx(exportSections), 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')}
                className="inline-flex items-center gap-1.5 rounded-lg bg-navy px-3 py-2 text-sm font-bold text-white"
              >
                <FileDown className="h-4 w-4" /> Download Word file
              </button>
              {confirmClear ? (
                <span className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-2 py-1 text-sm text-red-900">
                  Clear the whole list?
                  <button type="button" onClick={() => { setItems([]); setConfirmClear(false); }} className="rounded-md bg-red-600 px-2.5 py-1 font-bold text-white">Clear</button>
                  <button type="button" onClick={() => setConfirmClear(false)} className="rounded-md px-2 py-1 font-bold">Cancel</button>
                </span>
              ) : (
                <button type="button" onClick={() => setConfirmClear(true)} className="rounded-lg px-3 py-2 text-sm font-bold text-gray-500 hover:text-red-600">
                  Clear list
                </button>
              )}
            </div>
          )}
        </div>
        {items.length === 0 ? (
          <p className="mt-3 text-gray-600">
            Sources you add appear here, sorted into a Table of Cases, a Table of Legislation and a Bibliography, as OSCOLA requires. Your list is saved in this browser only.
          </p>
        ) : (
          <div className="mt-4 space-y-6">
            {sections.map((s) => (
              <section key={s.group} aria-label={s.title}>
                <h3 className="mb-2 text-base font-black uppercase tracking-wider text-navy">{s.title}</h3>
                {s.sub.map((sub) => (
                  <div key={sub.title || s.group} className="mb-3">
                    {s.sub.length > 1 && <p className="mb-1 text-sm font-bold italic text-gray-600">{sub.title}</p>}
                    <ul className="divide-y divide-gray-100 rounded-xl border border-gray-200">
                      {sub.rows.map(({ it, f }: { it: Item; f: OscolaFormatted }) => (
                        <li key={it.id} className="flex items-start gap-3 px-4 py-3">
                          <div className="min-w-0 flex-1">
                            <p className="font-serif text-[16px] text-navy break-words"><Rich segs={f.entry} /></p>
                            <p className="mt-1 text-xs text-gray-500 break-words">Footnote: {text(f.footnote)}</p>
                          </div>
                          <div className="flex shrink-0 items-center">
                            <CopyButton html={html(f.footnote)} text={text(f.footnote)} label="Copy footnote" tone="light" />
                            <button type="button" onClick={() => edit(it)} className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-navy" aria-label="Edit" title="Edit">
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button type="button" onClick={() => setItems((list) => list.filter((x) => x.id !== it.id))} className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-red-600" aria-label="Delete" title="Delete">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
