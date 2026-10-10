import Link from 'next/link';
import { ArrowRight, BookOpen, CheckCircle2, Eye, Layers, ShieldCheck } from 'lucide-react';
import SupportRequestForm from '@/components/SupportRequestForm';
import { SITE_URL, getLandingPage, landingLabel, landingPath } from '@/content/landing';
import { SAMPLES, SAMPLE_CATEGORIES, getSampleCategory, samplePath } from '@/content/samples';
import SamplesBrowser, { type CategoryChip, type SampleCard } from './SamplesBrowser';
import { CATEGORY_ICONS } from './categoryIcons';

export default function SamplesIndex() {
  const cards: SampleCard[] = SAMPLES.map((s) => ({
    slug: s.slug,
    title: s.title,
    excerpt: s.excerpt,
    category: s.category,
    categoryLabel: getSampleCategory(s.category).label,
    subject: s.subject,
    scope: s.scope,
  }));
  const chips: CategoryChip[] = SAMPLE_CATEGORIES.map((c) => ({
    id: c.id,
    label: c.label,
    description: c.description,
    count: SAMPLES.filter((s) => s.category === c.id).length,
  }));

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Academic Work Samples by FIZBS Experts',
      url: `${SITE_URL}/samples`,
      inLanguage: 'en-GB',
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: SAMPLES.map((s, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE_URL}${samplePath(s)}`,
          name: s.title,
        })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Samples', item: `${SITE_URL}/samples` },
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
            <Eye className="w-3.5 h-3.5" /> Free Work Samples
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-4">
            Academic Work Samples by Our Experts
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            See the quality of our work before you order. Browse samples by category, from essays and reports to dissertations, data analysis and database projects.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3 text-sm font-bold text-white/85">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2"><ShieldCheck className="w-4 h-4 text-[#C9A227]" /> Personal details removed</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2"><BookOpen className="w-4 h-4 text-[#C9A227]" /> For reference and learning</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2"><Layers className="w-4 h-4 text-[#C9A227]" /> {SAMPLE_CATEGORIES.length} categories</span>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-navy mb-6">Browse samples</h2>
          <SamplesBrowser samples={cards} categories={chips} />
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl md:text-4xl font-extrabold text-navy tracking-tight mb-3">Sample categories</h2>
            <p className="text-gray-600 text-lg">Each category links to the matching service, so you can see prices and how we help.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SAMPLE_CATEGORIES.map((c) => {
              const Icon = CATEGORY_ICONS[c.id];
              const count = SAMPLES.filter((s) => s.category === c.id).length;
              const service = getLandingPage(c.service, 'en');
              return (
                <div key={c.id} className="flex flex-col rounded-2xl border border-gray-100 bg-gray-50 p-6">
                  <div className="w-11 h-11 rounded-xl bg-navy text-[#C9A227] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-extrabold text-navy mb-2">{c.label}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1">{c.description}</p>
                  <p className="mt-4 text-xs font-black uppercase tracking-widest text-primary">
                    {count > 0 ? `${count} sample${count > 1 ? 's' : ''}` : 'Samples coming soon'}
                  </p>
                  {service && (
                    <Link href={landingPath(service)} className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-navy hover:text-primary">
                      {landingLabel(service)} <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-[900px] mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-navy mb-5">How to use these samples</h2>
          <ul className="space-y-3 text-gray-700 text-[17px] leading-relaxed">
            {[
              'Use them to see how a strong answer is structured, how claims are supported and how sources are referenced.',
              'Compare the approach with your own brief and marking criteria, since every module asks for something slightly different.',
              'Do not copy or submit any sample as your own work. They are published for reference only, and copying would count as plagiarism.',
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" /> <span>{t}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-gray-600">
            Want step-by-step advice instead? Read our{' '}
            <Link href="/blog" className="font-bold text-primary hover:underline">free student guides</Link>.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-navy">
        <div className="max-w-[1100px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">Need help with a similar task?</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Tell us what you need and we will reply on WhatsApp with a clear price. Assignments from £20 per 1,000 words, 10% off your first order, 50% to start and 50% on completion.
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
