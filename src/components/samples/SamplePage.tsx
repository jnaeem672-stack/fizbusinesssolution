import Link from 'next/link';
import {
  AlertTriangle,
  BookOpen,
  Calculator,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  FileDown,
  Info,
  PhoneCall,
} from 'lucide-react';
import FaqSection from '@/components/FaqSection';
import SupportRequestForm from '@/components/SupportRequestForm';
import WhatsAppLink from '@/components/ui/WhatsAppLink';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { buildWhatsAppUrl } from '@/constants/whatsapp';
import { expertCallUrl, EXPERT_CALL } from '@/constants/expertCall';
import { SITE_URL, getLandingPage, landingLabel, landingPath, type LandingContent } from '@/content/landing';
import { guidesForService, postPath } from '@/content/blog';
import { SAMPLES, getSampleCategory, samplePath, sampleSectionId, type Sample, type SampleBlock } from '@/content/samples';
import CodeBlock from './CodeBlock';
import { CATEGORY_ICONS } from './categoryIcons';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

function Block({ block }: { block: SampleBlock }) {
  switch (block.type) {
    case 'p':
      return <p>{block.text}</p>;
    case 'bullets':
      return (
        <ul className="space-y-2.5">
          {block.items.map((b) => (
            <li key={b} className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" /> <span>{b}</span>
            </li>
          ))}
        </ul>
      );
    case 'note':
      return (
        <div className="flex gap-3 rounded-2xl border border-[#E9DCAE] bg-[#FBF6E6] p-5">
          <Info className="w-6 h-6 text-primary shrink-0" />
          <p className="text-[16px] text-navy">{block.text}</p>
        </div>
      );
    case 'code':
      return <CodeBlock code={block.code} lang={block.lang} title={block.title} />;
    case 'image':
      return (
        <figure className="my-2">
          <a href={block.src} target="_blank" rel="noopener" className="block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow">
            <img src={block.src} alt={block.alt} width={block.width} height={block.height} loading="lazy" decoding="async" className="w-full h-auto" />
          </a>
          {block.caption && <figcaption className="mt-2.5 text-sm text-gray-500">{block.caption} Tap the image to open it full size.</figcaption>}
        </figure>
      );
    case 'table':
      return (
        <div className="my-2">
          {/* Mobile: one card per row */}
          <div className="sm:hidden space-y-3">
            {block.rows.map((row, ri) => (
              <div key={ri} className="rounded-2xl border border-gray-200 bg-white p-4">
                <p className="font-extrabold text-navy break-words">{row[0]}</p>
                <dl className="mt-2 space-y-1.5 text-[15px]">
                  {row.slice(1).map((cell, ci) => (
                    <div key={ci}>
                      <dt className="text-[11px] font-black uppercase tracking-widest text-primary">{block.head[ci + 1]}</dt>
                      <dd className="text-gray-700">{cell}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
          <div tabIndex={0} role="region" aria-label={block.caption ?? 'Table'} className="hidden sm:block overflow-x-auto rounded-2xl border border-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]">
            <table className="w-full min-w-[560px] text-left text-[14px] leading-snug">
              {block.caption && <caption className="sr-only">{block.caption}</caption>}
              <thead className="bg-navy text-white">
                <tr>
                  {block.head.map((h) => (
                    <th key={h} scope="col" className="px-4 py-3 font-bold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, ri) => (
                  <tr key={ri} className={ri % 2 ? 'bg-gray-50' : 'bg-white'}>
                    {row.map((cell, ci) => (
                      <td key={ci} className={`px-4 py-3 align-top border-t border-gray-100 ${ci === 0 ? 'font-bold text-navy whitespace-nowrap' : 'text-gray-700'}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption && <p className="mt-2 text-sm text-gray-500">{block.caption}</p>}
        </div>
      );
  }
}

export default function SamplePage({ sample }: { sample: Sample }) {
  const category = getSampleCategory(sample.category);
  const Icon = CATEGORY_ICONS[sample.category];
  const url = `${SITE_URL}${samplePath(sample)}`;
  const whatsappUrl = buildWhatsAppUrl(
    `Hello FIZBS! I saw your sample "${sample.title}" and I need help with a similar task.\nSubject: \nDeadline: `,
  );
  const services = sample.relatedServices
    .map((slug) => getLandingPage(slug, 'en'))
    .filter((p): p is LandingContent => Boolean(p));
  const guides = sample.relatedServices.flatMap((slug) => guidesForService(slug, 'en', 3));
  const uniqueGuides = guides.filter((g, i) => guides.findIndex((x) => x.slug === g.slug) === i).slice(0, 3);
  const moreSamples = SAMPLES.filter((s) => s.slug !== sample.slug).slice(0, 3);
  const ids = sample.sections.map((s) => sampleSectionId(s.heading));
  const image = sample.sections.flatMap((s) => s.blocks).find((b): b is Extract<SampleBlock, { type: 'image' }> => b.type === 'image');

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: sample.title,
      description: sample.metaDescription,
      url,
      mainEntityOfPage: url,
      inLanguage: 'en-GB',
      datePublished: sample.published,
      dateModified: sample.published,
      articleSection: `${category.label} sample`,
      keywords: sample.keywords.join(', '),
      ...(image ? { image: `${SITE_URL}${image.src}` } : {}),
      author: { '@type': 'Organization', name: 'FIZ Business Solutions academic team', url: `${SITE_URL}/our-team` },
      publisher: {
        '@type': 'Organization',
        name: 'FIZ Business Solutions',
        url: SITE_URL,
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/apple-icon` },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Samples', item: `${SITE_URL}/samples` },
        { '@type': 'ListItem', position: 3, name: sample.title, item: url },
      ],
    },
  ];

  const facts = [
    ['Category', category.label],
    ['Subject', sample.subject],
    ['Level', sample.level],
    ['Scope', sample.scope],
    ['Tools', sample.tools.join(', ')],
  ];

  return (
    <div lang="en" className="bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-light" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C9A227_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-6 pt-10 pb-12 md:pt-14 md:pb-16">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-bold text-white/60 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/samples" className="hover:text-white">Samples</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/80">{category.label}</span>
          </nav>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-[11px] font-black uppercase tracking-wider mb-5">
            <Icon className="w-3.5 h-3.5" /> {category.label} sample
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-5 max-w-4xl">{sample.title}</h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mb-6">{sample.excerpt}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/75 font-semibold">
            <Link href="/our-team" className="underline-offset-4 hover:underline hover:text-white">FIZBS Academic Team</Link>
            <span className="inline-flex items-center gap-1.5"><CalendarDays className="w-4 h-4 text-[#C9A227]" /> Published {formatDate(sample.published)}</span>
            <span className="inline-flex items-center gap-1.5"><ClipboardList className="w-4 h-4 text-[#C9A227]" /> {sample.scope}</span>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <article className="lg:col-span-8 min-w-0 text-gray-700 text-[17px] leading-relaxed">
            <div className="space-y-5 mb-8">
              {sample.intro.map((p, i) => (
                <p key={i} className={i === 0 ? 'text-lg text-navy font-medium' : undefined}>{p}</p>
              ))}
            </div>

            <div className="mb-10 flex gap-3 rounded-2xl border border-red-100 bg-red-50 p-5">
              <AlertTriangle className="w-6 h-6 text-red-700 shrink-0" />
              <p className="text-[15px] text-gray-800">
                <strong className="text-red-800">For reference only.</strong> This sample shows our approach and quality. Do not copy it or submit it as your own work. Personal details have been removed, and only part of the solution is shown.
              </p>
            </div>

            <dl className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-px overflow-hidden rounded-2xl border border-gray-100 bg-gray-100">
              {facts.map(([k, v]) => (
                <div key={k} className="bg-gray-50 px-5 py-4">
                  <dt className="text-[11px] font-black uppercase tracking-widest text-primary">{k}</dt>
                  <dd className="mt-1 font-bold text-navy text-[15px]">{v}</dd>
                </div>
              ))}
            </dl>

            <h2 id="the-brief" className="scroll-mt-[130px] text-2xl md:text-3xl font-extrabold text-navy tracking-tight mb-4">What the brief asked for</h2>
            <ol className="mb-11 space-y-3">
              {sample.brief.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-black">{i + 1}</span>
                  <span>{b}</span>
                </li>
              ))}
            </ol>

            <nav aria-label="In this sample" className="mb-12 rounded-2xl border border-gray-100 bg-gray-50 p-6">
              <p className="text-sm font-black uppercase tracking-widest text-primary mb-4">In this sample</p>
              <ol className="space-y-2.5 text-[15px]">
                {sample.sections.map((s, i) => (
                  <li key={s.heading} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-[11px] font-black text-white">{i + 1}</span>
                    <a href={`#${ids[i]}`} className="font-semibold text-navy hover:text-primary transition-colors">{s.heading}</a>
                  </li>
                ))}
              </ol>
            </nav>

            {sample.sections.map((s, si) => (
              <div key={s.heading} className="mb-12">
                <h2 id={ids[si]} className="scroll-mt-[130px] text-2xl md:text-3xl font-extrabold text-navy tracking-tight mb-5">{s.heading}</h2>
                <div className="space-y-5">
                  {s.blocks.map((b, bi) => <Block key={bi} block={b} />)}
                </div>
              </div>
            ))}

            {sample.file && (
              <a
                href={sample.file.href}
                target="_blank"
                rel="noopener"
                className="mb-12 flex items-center gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-5 hover:border-[#C9A227] transition-colors"
              >
                <FileDown className="w-8 h-8 text-primary shrink-0" />
                <span>
                  <span className="block font-extrabold text-navy">{sample.file.label}</span>
                  <span className="block text-sm text-gray-600">PDF preview{sample.file.pages ? `, ${sample.file.pages} pages` : ''}, watermarked</span>
                </span>
              </a>
            )}
          </article>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-[120px] space-y-6">
              <div className="bg-navy rounded-3xl p-7 text-white shadow-2xl">
                <p className="text-xl font-extrabold mb-3">Need help with a similar task?</p>
                <p className="text-sm text-white/75 leading-relaxed mb-6">
                  Qualified Master&apos;s and PhD experts help with assignments, projects and dissertations. Share your brief for a clear price, with 10% off your first order.
                </p>
                <WhatsAppLink
                  href={whatsappUrl}
                  aria-label="Chat on WhatsApp about a similar task"
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-white text-navy font-bold rounded-xl mb-3"
                >
                  <WhatsAppIcon size={22} className="w-5 h-5" /> Chat on WhatsApp
                </WhatsAppLink>
                <a href="/#quote" className="flex items-center justify-center gap-2 w-full py-3.5 bg-primary font-bold rounded-xl hover:brightness-105 transition-all mb-3">
                  <Calculator className="w-5 h-5" /> See Instant Price
                </a>
                <WhatsAppLink
                  href={expertCallUrl('en')}
                  aria-label={EXPERT_CALL.en.sideCta}
                  className="flex items-center justify-center gap-2 w-full py-3 border border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-all text-sm"
                >
                  <PhoneCall className="w-4 h-4 text-[#25D366]" /> {EXPERT_CALL.en.sideCta}
                </WhatsAppLink>
              </div>

              {services.length > 0 && (
                <div className="bg-gray-50 rounded-3xl p-7 border border-gray-100">
                  <p className="text-lg font-extrabold text-navy mb-4">Related Services</p>
                  <ul className="space-y-2.5">
                    {services.map((p) => (
                      <li key={p.slug}>
                        <Link href={landingPath(p)} className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-primary transition-colors">
                          <ChevronRight className="w-4 h-4 text-primary" /> {landingLabel(p)}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link href="/samples" className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-primary transition-colors">
                        <ChevronRight className="w-4 h-4 text-primary" /> All work samples
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>

      <FaqSection faqs={sample.faqs} title="Frequently Asked Questions" className="bg-soft-rose" />

      <section className="py-14 md:py-20 bg-navy">
        <div className="max-w-[1100px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">Get expert help with your own brief</h2>
            <p className="text-gray-300 text-lg leading-relaxed">Tell us what you need and we will reply on WhatsApp with a clear price. 50% to start, 50% on completion.</p>
          </div>
          <div id="support-form" className="scroll-mt-[120px]">
            <SupportRequestForm locale="en" />
          </div>
        </div>
      </section>

      {(moreSamples.length > 0 || uniqueGuides.length > 0) && (
        <section className="py-14 md:py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-navy text-center mb-10">
              {moreSamples.length > 0 ? 'More Work Samples' : 'Free Student Guides'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(moreSamples.length > 0
                ? moreSamples.map((s) => ({ key: s.slug, href: samplePath(s), label: getSampleCategory(s.category).label, title: s.title, text: s.excerpt }))
                : uniqueGuides.map((g) => ({ key: g.slug, href: postPath(g), label: g.category, title: g.title, text: g.excerpt }))
              ).map((item) => (
                <Link key={item.key} href={item.href} className="group rounded-2xl border border-gray-100 bg-gray-50 p-6 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-primary">
                    <BookOpen className="w-3.5 h-3.5" /> {item.label}
                  </span>
                  <p className="mt-2 text-lg font-extrabold text-navy group-hover:text-primary transition-colors leading-snug">{item.title}</p>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed line-clamp-3">{item.text}</p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/samples" className="inline-flex items-center gap-2 text-sm font-black text-navy hover:text-primary">
                Browse all samples <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
