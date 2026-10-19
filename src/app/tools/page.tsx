import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Lock, Sparkles } from 'lucide-react';
import SupportRequestForm from '@/components/SupportRequestForm';
import FaqSection from '@/components/FaqSection';
import { TOOL_ICONS } from '@/components/tools/toolIcons';
import { SITE_URL } from '@/content/landing';
import { getPost, postPath } from '@/content/blog';
import { TOOLS, TOOLS_PATH, toolPath } from '@/content/tools';

const TITLE = 'Free Tools for University Students | FIZBS';
const DESCRIPTION =
  'Free tools for UK university students: a degree classification calculator, Harvard and APA referencing generators and a word counter with pages converter.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${TOOLS_PATH}` },
  openGraph: {
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${TOOLS_PATH}`,
    type: 'website',
  },
};

const NEEDS: { need: string; tool: string; slug: string }[] = [
  { need: 'I want to know my degree class, or the marks I need for a First, 2:1 or Distinction', tool: 'Degree Classification Calculator', slug: 'degree-classification-calculator' },
  { need: 'I need to reference a book, journal article, website, newspaper, thesis or video in Harvard, or create a reference from a DOI or ISBN', tool: 'Harvard Referencing Generator', slug: 'harvard-referencing-generator' },
  { need: 'My course uses APA 7, for example in psychology, nursing, education or business', tool: 'APA Referencing Generator', slug: 'apa-referencing-generator' },
  { need: 'I need my word count without the reference list, or to know how many pages it fills', tool: 'Word Counter and Pages Converter', slug: 'word-counter' },
];

const HUB_FAQS = [
  {
    q: 'Are the tools really free?',
    a: 'Yes. All four tools are free to use, with no sign-up and no limit on how often you use them.',
  },
  {
    q: 'Is anything I type saved or sent to FIZBS?',
    a: 'The degree calculator and word counter run entirely in your browser, so your marks and text are not sent to us. The Harvard and APA generators keep your reference list in your own browser only, so you can come back to it on the same device. If you use autocite, the DOI, ISBN, title or link you enter is sent to public lookup services such as Crossref, or to our server to read a web page, only to fill in the details.',
  },
  {
    q: 'Which referencing styles do the generators use?',
    a: 'The Harvard generator follows the Cite Them Right version of Harvard, which many UK universities use, and the APA generator follows APA 7th edition. Always check your module handbook, because some universities use their own variation.',
  },
  {
    q: "Will the degree calculator match my university's result?",
    a: "It works out your average from the marks, credits and year weightings you enter. Your official result follows your university's regulations, which may include rounding, borderline rules or discounted credits.",
  },
  {
    q: 'Can I get expert help after using a tool?',
    a: 'Yes. If you would like feedback on a draft, a proofread or a full referencing check, message us on WhatsApp. Proofreading starts from £12 per 1,000 words and first orders get 10% off.',
  },
];

const GUIDE_SLUGS = ['harvard-referencing-guide', 'uk-university-grading-system', 'how-to-structure-a-university-essay', 'how-to-write-a-dissertation'];

export default function Page() {
  const guides = GUIDE_SLUGS.map((s) => getPost(s, 'en')).filter((p) => p !== undefined);
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Free Tools for University Students',
      description: DESCRIPTION,
      url: `${SITE_URL}${TOOLS_PATH}`,
      inLanguage: 'en-GB',
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: TOOLS.map((t, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE_URL}${toolPath(t)}`, name: t.name })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Free Tools', item: `${SITE_URL}${TOOLS_PATH}` },
      ],
    },
  ];

  return (
    <div lang="en" className="bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="relative overflow-hidden bg-navy">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-light" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C9A227_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative z-10 max-w-[1100px] mx-auto px-4 py-14 md:py-20 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-[11px] font-black uppercase tracking-wider mb-5">
            <Sparkles className="w-3.5 h-3.5" /> Free Student Tools
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-4">Free Tools for University Students</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Quick, free tools for the jobs every UK student faces: working out your degree classification, referencing your sources in Harvard or APA, and checking your word count.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white/85">
            <Lock className="w-4 h-4 text-[#C9A227]" /> No sign-up. Everything runs in your browser.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-[1100px] mx-auto px-4">
          <h2 className="sr-only">Tools</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {TOOLS.map((t) => {
              const Icon = TOOL_ICONS[t.slug];
              return (
                <li key={t.slug}>
                  <Link href={toolPath(t)} className="group flex h-full flex-col rounded-3xl border border-gray-100 bg-white p-7 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all">
                    <span className="w-12 h-12 rounded-xl bg-navy text-[#C9A227] flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6" />
                    </span>
                    <span className="text-xl font-extrabold text-navy group-hover:text-primary transition-colors mb-2">{t.name}</span>
                    <span className="text-[15px] text-gray-600 leading-relaxed flex-1">{t.cardText}</span>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-black text-primary">
                      Open tool <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="pb-4">
        <div className="max-w-[900px] mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-navy mb-5">Which tool do I need?</h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
            <table className="w-full text-left text-[15px]">
              <thead className="bg-navy text-white">
                <tr>
                  <th scope="col" className="px-4 py-3 font-bold">If you need to...</th>
                  <th scope="col" className="px-4 py-3 font-bold">Use</th>
                </tr>
              </thead>
              <tbody>
                {NEEDS.map((n) => (
                  <tr key={n.slug} className="border-t border-gray-100">
                    <td className="px-4 py-3 text-gray-700">{n.need}</td>
                    <td className="px-4 py-3">
                      <Link href={`${TOOLS_PATH}/${n.slug}`} className="font-bold text-primary hover:underline">{n.tool}</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white mt-12">
        <div className="max-w-[900px] mx-auto px-4 text-gray-700 text-[17px] leading-relaxed">
          <h2 className="text-2xl md:text-3xl font-extrabold text-navy mb-4">Built for UK university rules</h2>
          <p className="mb-4">
            Each tool follows the conventions most UK universities use: credit-weighted averages and the usual First, 2:1 and 2:2 bands, the Cite Them Right version of Harvard, APA 7th edition, and word count rules that leave out your reference list. Every university has its own regulations, so each tool explains what to check in your handbook.
          </p>
          <p>
            FIZ Business Solutions (FIZBS) has supported university students since 2015, today in the UK, Saudi Arabia, the UAE and the USA. If you would like an expert to look at your work, our Master&apos;s and PhD-qualified team can help with feedback, proofreading and referencing.
          </p>
          {guides.length > 0 && (
            <div className="mt-8 rounded-2xl border border-[#E9DCAE] bg-[#FBF6E6] p-6">
              <h2 className="text-xl font-extrabold text-navy mb-4">Free Student Guides</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {guides.map((g) => (
                  <li key={g.slug}>
                    <Link href={postPath(g)} className="flex items-start gap-2 text-[15px] font-bold text-navy hover:text-primary transition-colors leading-snug">
                      <ChevronRight className="w-4 h-4 mt-0.5 shrink-0 text-primary" /> {g.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <FaqSection faqs={HUB_FAQS} title="Questions About the Free Tools" className="bg-gray-50" />

      <section className="py-14 md:py-20 bg-navy">
        <div className="max-w-[1100px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">Want an expert to look at your work?</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Tell us what you need and we will reply on WhatsApp with a clear price. Assignments from £20 per 1,000 words, proofreading from £12, 10% off your first order.
            </p>
          </div>
          <div id="support-form" className="scroll-mt-[120px]">
            <SupportRequestForm locale="en" />
          </div>
        </div>
      </section>
    </div>
  );
}
