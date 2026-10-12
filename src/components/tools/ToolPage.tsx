import type { ReactNode } from 'react';
import Link from 'next/link';
import { CheckCircle2, ChevronRight, Calculator, Lock, Smartphone, Sparkles } from 'lucide-react';
import SupportRequestForm from '@/components/SupportRequestForm';
import QuoteCalculator from '@/QuoteCalculator';
import FaqSection from '@/components/FaqSection';
import WhatsAppLink from '@/components/ui/WhatsAppLink';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { buildWhatsAppUrl } from '@/constants/whatsapp';
import { SITE_URL, getLandingPage, landingLabel, landingPath } from '@/content/landing';
import { getPost, postPath } from '@/content/blog';
import { TOOLS, TOOLS_PATH, toolPath, type ToolContent } from '@/content/tools';
import { TOOL_ICONS } from './toolIcons';

function sectionId(heading: string) {
  return heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export default function ToolPage({ tool, children }: { tool: ToolContent; children: ReactNode }) {
  const url = `${SITE_URL}${toolPath(tool)}`;
  const whatsappUrl = buildWhatsAppUrl(tool.whatsappMessage);
  const services = tool.services.map((s) => getLandingPage(s, 'en')).filter((p) => p !== undefined);
  const guides = tool.guides.map((g) => getPost(g, 'en')).filter((p) => p !== undefined);
  const otherTools = TOOLS.filter((t) => t.slug !== tool.slug);

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: tool.name,
      description: tool.metaDescription,
      url,
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
      publisher: { '@type': 'Organization', name: 'FIZ Business Solutions', url: SITE_URL },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Free Tools', item: `${SITE_URL}${TOOLS_PATH}` },
        { '@type': 'ListItem', position: 3, name: tool.name, item: url },
      ],
    },
  ];

  return (
    <div lang="en" className="bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="relative overflow-hidden bg-navy">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-light" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C9A227_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative z-10 max-w-[1100px] mx-auto px-4 pt-10 pb-24 md:pt-14 md:pb-28">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-bold text-white/50 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href={TOOLS_PATH} className="hover:text-white">Free Tools</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/80">{tool.name}</span>
          </nav>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-[11px] font-black uppercase tracking-wider mb-5">
            <Sparkles className="w-3.5 h-3.5" /> Free Student Tool
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-4 max-w-3xl">{tool.h1}</h1>
          <p className="text-gray-300 text-lg max-w-3xl leading-relaxed">{tool.subtitle}</p>
          <ul className="mt-6 flex flex-wrap gap-2.5 text-[13px] font-semibold text-white">
            <li className="inline-flex items-center gap-2 rounded-lg bg-white/[0.07] border border-white/10 px-3.5 py-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Free, no sign-up</li>
            <li className="inline-flex items-center gap-2 rounded-lg bg-white/[0.07] border border-white/10 px-3.5 py-2"><Lock className="w-4 h-4 text-primary" /> Runs in your browser</li>
            <li className="inline-flex items-center gap-2 rounded-lg bg-white/[0.07] border border-white/10 px-3.5 py-2"><Smartphone className="w-4 h-4 text-primary" /> Works on mobile</li>
          </ul>
        </div>
      </section>

      <section className="relative z-10 -mt-16 md:-mt-20 pb-12">
        <div className="max-w-[1100px] mx-auto px-4">
          <div className="rounded-3xl bg-white shadow-2xl border border-gray-100 p-4 sm:p-6 md:p-8">{children}</div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[1100px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <article className="lg:col-span-8 text-gray-700 text-[17px] leading-relaxed">
            {tool.sections.map((section) => (
              <div key={section.heading} className="mb-10">
                <h2 id={sectionId(section.heading)} className="scroll-mt-[130px] text-2xl md:text-3xl font-extrabold text-navy tracking-tight mb-4">
                  {section.heading}
                </h2>
                <div className="space-y-4">
                  {section.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}
                </div>
                {section.steps && (
                  <ol className="mt-5 space-y-3">
                    {section.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-black">{i + 1}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                )}
                {section.bullets && (
                  <ul className="mt-4 space-y-2.5">
                    {section.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.table && (
                  <div className="mt-6 overflow-x-auto rounded-2xl border border-gray-200">
                    <table className="w-full text-left text-[15px]">
                      <caption className="sr-only">{section.table.caption}</caption>
                      <thead className="bg-navy text-white">
                        <tr>
                          {section.table.head.map((h) => (
                            <th key={h} scope="col" className="px-4 py-3 font-bold whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row) => (
                          <tr key={row[0]} className="border-t border-gray-100 even:bg-gray-50">
                            {row.map((cell, i) =>
                              i === 0 ? (
                                <th key={i} scope="row" className="px-4 py-2.5 font-bold text-navy whitespace-nowrap">{cell}</th>
                              ) : (
                                <td key={i} className="px-4 py-2.5">{cell}</td>
                              ),
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}

            {guides.length > 0 && (
              <div className="rounded-2xl border border-[#E9DCAE] bg-[#FBF6E6] p-6">
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
          </article>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-[110px] space-y-6">
              <div className="bg-navy rounded-3xl p-7 text-white shadow-2xl">
                <div className="w-12 h-12 icon-gradient rounded-xl flex items-center justify-center mb-5">
                  <Calculator className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-extrabold mb-4">Need expert help?</h2>
                <ul className="space-y-3 mb-6 text-sm text-white/80">
                  {['Assignments from £20 per 1,000 words', 'Proofreading from £12 per 1,000 words', '10% off your first order', '24/7 WhatsApp support'].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {item}
                    </li>
                  ))}
                </ul>
                <a href="#quote" className="block w-full py-3.5 bg-primary text-white text-center font-bold rounded-xl hover:brightness-110 transition-all mb-3">
                  See My Price
                </a>
                <WhatsAppLink href={whatsappUrl} aria-label="Chat on WhatsApp" className="flex items-center justify-center gap-2 w-full py-3 bg-white text-navy font-bold rounded-xl">
                  <WhatsAppIcon size={22} className="w-5 h-5" />
                  Chat on WhatsApp
                </WhatsAppLink>
              </div>

              <div className="bg-gray-50 rounded-3xl p-7 border border-gray-100">
                <h2 className="text-lg font-extrabold text-navy mb-4">More Free Tools</h2>
                <ul className="space-y-3">
                  {otherTools.map((t) => {
                    const Icon = TOOL_ICONS[t.slug];
                    return (
                      <li key={t.slug}>
                        <Link href={toolPath(t)} className="flex items-center gap-2.5 text-sm font-bold text-gray-600 hover:text-primary transition-colors">
                          <Icon className="w-4 h-4 text-primary shrink-0" /> {t.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {services.length > 0 && (
                <div className="bg-gray-50 rounded-3xl p-7 border border-gray-100">
                  <h2 className="text-lg font-extrabold text-navy mb-4">Related Services</h2>
                  <ul className="space-y-2.5">
                    {services.map((p) => (
                      <li key={p.slug}>
                        <Link href={landingPath(p)} className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-primary transition-colors">
                          <ChevronRight className="w-4 h-4 text-primary" /> {landingLabel(p)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>

      <QuoteCalculator locale="en" />

      <FaqSection faqs={tool.faqs} title="Frequently Asked Questions" className="bg-white" />

      <section className="py-14 md:py-20 bg-navy">
        <div className="max-w-[1100px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">Want an expert to look at your work?</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Tell us what you need and we will reply on WhatsApp with a clear price. Assignments from £20 per 1,000 words, proofreading from £12, 10% off your first order, 50% to start and 50% on completion.
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
