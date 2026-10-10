import Link from 'next/link';
import { CheckCircle2, ChevronRight, Clock, CalendarDays, Lightbulb, PhoneCall, Calculator, BookOpen } from 'lucide-react';
import FaqSection from '@/components/FaqSection';
import SupportRequestForm from '@/components/SupportRequestForm';
import WhatsAppLink from '@/components/ui/WhatsAppLink';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { buildWhatsAppUrl } from '@/constants/whatsapp';
import { expertCallUrl, EXPERT_CALL } from '@/constants/expertCall';
import { SITE_URL, getLandingPage, landingLabel, landingPath, type LandingContent } from '@/content/landing';
import { EN_POSTS, AR_POSTS, postPath, readingMinutes, sectionId, type BlogPost } from '@/content/blog';

const LABELS = {
  en: {
    home: 'Home',
    blog: 'Student Guides',
    by: 'FIZBS Academic Team',
    updated: 'Updated',
    read: 'min read',
    toc: 'In this guide',
    sideTitle: 'Need expert help?',
    sideText: 'Qualified Master\'s and PhD experts help with assignments, dissertations and research. Assignments from £20 per 1,000 words, 10% off your first order.',
    whatsapp: 'Chat on WhatsApp',
    price: 'See Instant Price',
    related: 'Related Services',
    faq: 'Frequently Asked Questions',
    formTitle: 'Get expert help with your work',
    formText: 'Tell us what you need and we will reply on WhatsApp with a clear price. 50% to start, 50% on completion.',
    more: 'More Student Guides',
    tipLabel: 'Tip',
    msg: (title: string) => `Hello FIZBS! I read your guide "${title}" and I need help.\nSubject: \nWord count: \nDeadline: `,
  },
  ar: {
    home: 'الرئيسية',
    blog: 'أدلة الطلاب',
    by: 'فريق FIZBS الأكاديمي',
    updated: 'آخر تحديث',
    read: 'دقائق قراءة',
    toc: 'محتويات الدليل',
    sideTitle: 'تحتاج مساعدة متخصصة؟',
    sideText: 'خبراء يحملون الماجستير والدكتوراه يساعدونك في الواجبات والرسائل العلمية والبحث. الواجبات من 20 جنيهًا لكل 1,000 كلمة، وخصم 10% على أول طلب.',
    whatsapp: 'تواصل عبر واتساب',
    price: 'اعرف السعر الآن',
    related: 'خدمات ذات صلة',
    faq: 'الأسئلة الشائعة',
    formTitle: 'احصل على مساعدة متخصصة',
    formText: 'أخبرنا بما تحتاجه وسنرد عليك عبر واتساب بسعر واضح. 50% عند البدء و50% عند الإنجاز.',
    more: 'المزيد من أدلة الطلاب',
    tipLabel: 'نصيحة',
    msg: (title: string) => `مرحبًا FIZBS! قرأت دليل "${title}" وأحتاج مساعدة.\nالتخصص: \nعدد الكلمات: \nالموعد النهائي: `,
  },
} as const;

function formatDate(iso: string, locale: 'en' | 'ar') {
  return new Date(iso).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BlogPostPage({ post }: { post: BlogPost }) {
  const isAr = post.locale === 'ar';
  const t = LABELS[post.locale];
  const url = `${SITE_URL}${postPath(post)}`;
  const blogIndex = isAr ? '/ar/blog' : '/blog';
  const homePath = isAr ? '/ar' : '/';
  const minutes = readingMinutes(post);
  const whatsappUrl = buildWhatsAppUrl(t.msg(post.title));
  const services = post.relatedServices
    .map((slug) => getLandingPage(slug, post.locale) ?? getLandingPage(slug, 'en'))
    .filter((p): p is LandingContent => Boolean(p));
  const morePosts = (isAr ? AR_POSTS : EN_POSTS).filter((p) => p.slug !== post.slug).slice(0, 3);
  const ids = post.sections.map((s, i) => sectionId(s.heading, i, post.locale));

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.metaDescription,
      url,
      mainEntityOfPage: url,
      inLanguage: isAr ? 'ar' : 'en-GB',
      datePublished: post.published,
      dateModified: post.published,
      articleSection: post.category,
      keywords: post.keywords.join(', '),
      author: { '@type': 'Organization', name: 'FIZ Business Solutions', url: SITE_URL },
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
        { '@type': 'ListItem', position: 1, name: t.home, item: `${SITE_URL}${homePath}` },
        { '@type': 'ListItem', position: 2, name: t.blog, item: `${SITE_URL}${blogIndex}` },
        { '@type': 'ListItem', position: 3, name: post.title, item: url },
      ],
    },
  ];

  return (
    <div lang={post.locale} className="bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy" dir={isAr ? 'rtl' : undefined}>
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-light" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C9A227_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-6 pt-10 pb-12 md:pt-14 md:pb-16">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-bold text-white/50 mb-6">
            <Link href={homePath} className="hover:text-white">{t.home}</Link>
            <ChevronRight className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} />
            <Link href={blogIndex} className="hover:text-white">{t.blog}</Link>
          </nav>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-[11px] font-black uppercase tracking-wider mb-5">
            <BookOpen className="w-3.5 h-3.5" /> {post.category}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-5 max-w-4xl">{post.title}</h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mb-6">{post.excerpt}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/70 font-semibold">
            <span>{t.by}</span>
            <span className="inline-flex items-center gap-1.5"><CalendarDays className="w-4 h-4 text-primary" /> {t.updated} {formatDate(post.published, post.locale)}</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /> {minutes} {t.read}</span>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-12 md:py-16 bg-white" dir={isAr ? 'rtl' : undefined}>
        <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <article className="lg:col-span-8 text-gray-700 text-[17px] leading-relaxed">
            <div className="space-y-5 mb-10">
              {post.intro.map((p, i) => (
                <p key={i} className={i === 0 ? 'text-lg text-navy font-medium' : undefined}>{p}</p>
              ))}
            </div>

            <nav aria-label={t.toc} className="mb-12 rounded-2xl border border-gray-100 bg-gray-50 p-6">
              <p className="text-sm font-black uppercase tracking-widest text-primary mb-4">{t.toc}</p>
              <ol className="space-y-2.5 text-[15px]">
                {post.sections.map((s, i) => (
                  <li key={s.heading} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-[11px] font-black text-white">{i + 1}</span>
                    <a href={`#${ids[i]}`} className="font-semibold text-navy hover:text-primary transition-colors">{s.heading}</a>
                  </li>
                ))}
              </ol>
            </nav>

            {post.sections.map((s, si) => (
              <div key={s.heading} className="mb-11">
                <h2 id={ids[si]} className="scroll-mt-[130px] text-2xl md:text-3xl font-extrabold text-navy tracking-tight mb-4">{s.heading}</h2>
                <div className="space-y-4">{s.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}</div>
                {s.steps && (
                  <ol className="mt-5 space-y-3">
                    {s.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-black">{i + 1}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                )}
                {s.bullets && (
                  <ul className="mt-5 space-y-2.5">
                    {s.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" /> <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {s.subsections?.map((sub) => (
                  <div key={sub.heading} className="mt-7">
                    <h3 className="text-xl font-extrabold text-navy mb-3">{sub.heading}</h3>
                    <div className="space-y-3">{sub.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}</div>
                    {sub.bullets && (
                      <ul className="mt-3 space-y-2">
                        {sub.bullets.map((b, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-1.5" /> <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
                {s.tip && (
                  <div className="mt-6 flex gap-3 rounded-2xl border border-[#E9DCAE] bg-[#FBF6E6] p-5">
                    <Lightbulb className="w-6 h-6 text-primary shrink-0" />
                    <p className="text-[16px] text-navy"><strong>{t.tipLabel}: </strong>{s.tip}</p>
                  </div>
                )}
              </div>
            ))}
          </article>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-[120px] space-y-6">
              <div className="bg-navy rounded-3xl p-7 text-white shadow-2xl">
                <p className="text-xl font-extrabold mb-3">{t.sideTitle}</p>
                <p className="text-sm text-white/75 leading-relaxed mb-6">{t.sideText}</p>
                <WhatsAppLink
                  href={whatsappUrl}
                  aria-label={t.whatsapp}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-white text-navy font-bold rounded-xl mb-3"
                >
                  <WhatsAppIcon size={22} className="w-5 h-5" /> {t.whatsapp}
                </WhatsAppLink>
                <a href={isAr ? '/ar#quote' : '/#quote'} className="flex items-center justify-center gap-2 w-full py-3.5 bg-primary font-bold rounded-xl hover:brightness-105 transition-all mb-3">
                  <Calculator className="w-5 h-5" /> {t.price}
                </a>
                <WhatsAppLink
                  href={expertCallUrl(post.locale)}
                  aria-label={EXPERT_CALL[post.locale].sideCta}
                  className="flex items-center justify-center gap-2 w-full py-3 border border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-all text-sm"
                >
                  <PhoneCall className="w-4 h-4 text-[#25D366]" /> {EXPERT_CALL[post.locale].sideCta}
                </WhatsAppLink>
              </div>

              {services.length > 0 && (
                <div className="bg-gray-50 rounded-3xl p-7 border border-gray-100">
                  <p className="text-lg font-extrabold text-navy mb-4">{t.related}</p>
                  <ul className="space-y-2.5">
                    {services.map((p) => (
                      <li key={p.slug + p.locale}>
                        <Link href={landingPath(p)} className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-primary transition-colors">
                          <ChevronRight className={`w-4 h-4 text-primary ${isAr ? 'rotate-180' : ''}`} /> {landingLabel(p)}
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

      <FaqSection faqs={post.faqs} title={t.faq} rtl={isAr} className="bg-soft-rose" />

      {/* Lead form */}
      <section className="py-14 md:py-20 bg-navy" dir={isAr ? 'rtl' : undefined}>
        <div className="max-w-[1100px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">{t.formTitle}</h2>
            <p className="text-gray-300 text-lg leading-relaxed">{t.formText}</p>
          </div>
          <div id="support-form" className="scroll-mt-[120px]">
            <SupportRequestForm locale={post.locale} />
          </div>
        </div>
      </section>

      {morePosts.length > 0 && (
        <section className="py-14 md:py-20 bg-white" dir={isAr ? 'rtl' : undefined}>
          <div className="max-w-[1200px] mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-navy text-center mb-10">{t.more}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {morePosts.map((p) => (
                <Link key={p.slug} href={postPath(p)} className="group rounded-2xl border border-gray-100 bg-gray-50 p-6 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <span className="text-[11px] font-black uppercase tracking-widest text-primary">{p.category}</span>
                  <p className="mt-2 text-lg font-extrabold text-navy group-hover:text-primary transition-colors leading-snug">{p.title}</p>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed line-clamp-3">{p.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
