import Link from 'next/link';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import { postPath, readingMinutes, type BlogPost } from '@/content/blog';
import type { HubSection } from '@/content/blog/arHub';

const TEXT = {
  en: {
    badge: 'Free Student Guides',
    title: 'Student Guides: Assignments, Dissertations and Research',
    sub: 'Practical, step-by-step guides from the FIZBS academic team for UK and Saudi university students.',
    read: 'min read',
    cta: 'Read guide',
    other: 'Arabic guides',
    otherHref: '/ar/blog',
  },
  ar: {
    badge: 'أدلة مجانية للطلاب',
    title: 'أدلة الطلاب: الواجبات والرسائل العلمية والبحث',
    sub: 'أدلة عملية خطوة بخطوة من فريق FIZBS الأكاديمي لطلاب الجامعات في السعودية وبريطانيا.',
    read: 'دقائق قراءة',
    cta: 'اقرأ الدليل',
    other: 'English guides',
    otherHref: '/blog',
  },
} as const;

export default function BlogIndex({
  posts,
  locale,
  hub,
}: {
  posts: BlogPost[];
  locale: 'en' | 'ar';
  /** Optional guide-hub content shown under the cards (used on /ar/blog) */
  hub?: { sections: HubSection[]; faqs: { q: string; a: string }[]; faqTitle: string };
}) {
  const t = TEXT[locale];
  const isAr = locale === 'ar';
  return (
    <div lang={locale} className="bg-gray-50" dir={isAr ? 'rtl' : undefined}>
      <section className="relative overflow-hidden bg-navy">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-light" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C9A227_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative z-10 max-w-[1100px] mx-auto px-4 py-14 md:py-20 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-[11px] font-black uppercase tracking-wider mb-5">
            <BookOpen className="w-3.5 h-3.5" /> {t.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-4">{t.title}</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">{t.sub}</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={postPath(p)}
                className="group flex flex-col rounded-3xl bg-white border border-gray-100 p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <span className="text-[11px] font-black uppercase tracking-widest text-primary">{p.category}</span>
                <h2 className="mt-3 text-xl font-extrabold text-navy leading-snug group-hover:text-primary transition-colors">{p.title}</h2>
                <p className="mt-3 text-sm text-gray-500 leading-relaxed flex-1">{p.excerpt}</p>
                <div className="mt-5 flex items-center justify-between text-sm font-bold">
                  <span className="inline-flex items-center gap-1.5 text-gray-400"><Clock className="w-4 h-4" /> {readingMinutes(p)} {t.read}</span>
                  <span className="inline-flex items-center gap-1.5 text-navy group-hover:text-primary">
                    {t.cta} <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          {hub && (
            <div className="mt-14 max-w-3xl mx-auto space-y-10">
              {hub.sections.map((section) => (
                <section key={section.heading} className="rounded-3xl bg-white border border-gray-100 p-6 md:p-8 shadow-sm">
                  <h2 className="text-2xl font-extrabold text-navy mb-4">{section.heading}</h2>
                  {section.paragraphs?.map((para) => (
                    <p key={para} className="text-gray-600 leading-loose mb-4 last:mb-0">{para}</p>
                  ))}
                  {section.steps && (
                    <ol className="mt-2 space-y-3">
                      {section.steps.map((step, i) => (
                        <li key={step.text} className="flex gap-3">
                          <span className="shrink-0 w-7 h-7 rounded-full bg-navy text-white text-sm font-black flex items-center justify-center">{i + 1}</span>
                          <span className="text-gray-700 leading-loose">
                            {step.text}{' '}
                            {step.href && (
                              <Link href={step.href} className="font-bold text-primary hover:underline">{step.label}</Link>
                            )}
                          </span>
                        </li>
                      ))}
                    </ol>
                  )}
                  {section.links && (
                    <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {section.links.map((link) => (
                        <li key={link.href}>
                          <Link href={link.href} className="flex items-center justify-between gap-2 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-bold text-navy hover:border-primary hover:text-primary transition-colors">
                            {link.label} <ArrowRight className={`w-4 h-4 shrink-0 ${isAr ? 'rotate-180' : ''}`} />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
              <section className="rounded-3xl bg-white border border-gray-100 p-6 md:p-8 shadow-sm">
                <h2 className="text-2xl font-extrabold text-navy mb-4">{hub.faqTitle}</h2>
                <div className="divide-y divide-gray-100">
                  {hub.faqs.map((f) => (
                    <div key={f.q} className="py-4 first:pt-0 last:pb-0">
                      <h3 className="font-extrabold text-navy mb-1.5">{f.q}</h3>
                      <p className="text-gray-600 leading-loose">{f.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
          <div className="text-center mt-10">
            <Link href={t.otherHref} className="inline-flex items-center gap-2 text-sm font-black text-navy hover:text-primary">
              {t.other} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
