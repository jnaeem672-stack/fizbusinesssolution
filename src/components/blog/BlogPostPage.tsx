import Link from 'next/link';
import { CheckCircle2, ChevronRight, Clock, CalendarDays, Lightbulb, PhoneCall, Calculator, BookOpen } from 'lucide-react';
import FaqSection from '@/components/FaqSection';
import SupportRequestForm from '@/components/SupportRequestForm';
import WhatsAppLink from '@/components/ui/WhatsAppLink';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { inline } from '@/components/ui/InlineText';
import { buildWhatsAppUrl } from '@/constants/whatsapp';
import { expertCallUrl, EXPERT_CALL } from '@/constants/expertCall';
import { SITE_URL, getLandingPage, landingLabel, landingPath, type LandingContent } from '@/content/landing';
import { EN_POSTS, AR_POSTS, postPath, readingMinutes, sectionId, type BlogPost } from '@/content/blog';
import { TOOLS, toolPath } from '@/content/tools';
import { GUIDE_GEO } from '@/content/blog/geo';
import { AR_QUICK_ANSWERS } from '@/content/blog/geoAr';
import { GUIDE_FIGURES, type GuideFigure } from '@/content/blog/figures';
import { getExpert } from '@/content/experts';
import { TOOL_ICONS } from '@/components/tools/toolIcons';

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
    seeAlso: 'Read next',
    sources: 'Sources',
    msg: 'Hello FIZBS, I would like to discuss my assignment.',
  },
  ar: {
    home: 'الرئيسية',
    blog: 'أدلة الطلاب',
    by: 'فريق FIZBS الأكاديمي',
    updated: 'آخر تحديث',
    read: 'دقائق قراءة',
    toc: 'محتويات الدليل',
    sideTitle: 'تحتاج مساعدة متخصصة؟',
    sideText: 'خبراء يحملون الماجستير والدكتوراه يساعدونك في الواجبات والرسائل العلمية والبحث. الواجبات من 100 ريال لكل 1,000 كلمة، وخصم 10% على أول طلب.',
    whatsapp: 'تواصل عبر واتساب',
    price: 'اعرف السعر الآن',
    related: 'خدمات ذات صلة',
    faq: 'الأسئلة الشائعة',
    formTitle: 'احصل على مساعدة متخصصة',
    formText: 'أخبرنا بما تحتاجه وسنرد عليك عبر واتساب بسعر واضح. 50% عند البدء و50% عند الإنجاز.',
    more: 'المزيد من أدلة الطلاب',
    tipLabel: 'نصيحة',
    seeAlso: 'اقرأ أيضًا',
    sources: 'المصادر',
    msg: 'مرحبًا FIZBS، أرغب في مناقشة واجبي.',
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
  const whatsappUrl = buildWhatsAppUrl(t.msg);
  const services = post.relatedServices
    .map((slug) => getLandingPage(slug, post.locale) ?? getLandingPage(slug, 'en'))
    .filter((p): p is LandingContent => Boolean(p));
  // Same-category guides first (e.g. other dissertation topic lists), then the most important others
  const others = (isAr ? AR_POSTS : EN_POSTS).filter((p) => p.slug !== post.slug);
  const morePosts = [...others.filter((p) => p.category === post.category), ...others.filter((p) => p.category !== post.category)].slice(0, 3);
  const ids = post.sections.map((s, i) => sectionId(s.heading, i, post.locale));
  const tools = isAr ? [] : TOOLS.filter((tool) => tool.guides.includes(post.slug));
  // In-article box pointing to the referencing generators (APA first on the APA guide)
  const refTools = isAr ? [] : TOOLS.filter((tool) => tool.promotedIn?.includes(post.slug));
  const harvardTool = refTools.find((tool) => tool.slug === 'harvard-referencing-generator');
  const apaTool = refTools.find((tool) => tool.slug === 'apa-referencing-generator');
  const [mainRefTool, altRefTool] = post.slug === 'apa-referencing-guide' ? [apaTool, harvardTool] : [harvardTool, apaTool];
  const geo = isAr ? undefined : GUIDE_GEO[post.slug];
  const quickAnswer = isAr ? AR_QUICK_ANSWERS[post.slug] : geo?.quickAnswer;
  const figures = isAr ? [] : GUIDE_FIGURES[post.slug] ?? [];
  const figuresFor = (heading: string, position?: GuideFigure['position']) =>
    figures.filter((f) => f.section === heading && f.position === position).map((f) => <Figure key={f.src} figure={f} />);
  const specialist = geo ? getExpert(geo.specialist) : undefined;
  const modified = geo?.updated ?? post.updated ?? post.published;

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
      dateModified: modified,
      ...(quickAnswer ? { abstract: quickAnswer } : {}),
      ...(figures.length ? { image: figures.map((f) => ({ '@type': 'ImageObject', url: `${SITE_URL}${f.src}`, caption: f.caption, width: f.width, height: f.height })) } : {}),
      articleSection: post.category,
      keywords: post.keywords.join(', '),
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
            <Link href="/our-team" className="underline-offset-4 hover:underline hover:text-white">{t.by}</Link>
            <span className="inline-flex items-center gap-1.5"><CalendarDays className="w-4 h-4 text-primary" /> {t.updated} {formatDate(modified, post.locale)}</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /> {minutes} {t.read}</span>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-12 md:py-16 bg-white" dir={isAr ? 'rtl' : undefined}>
        <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <article className="lg:col-span-8 text-gray-700 text-[17px] leading-relaxed">
            {quickAnswer && (
              <div id="quick-answer" className={`mb-8 rounded-2xl border-[#C9A227] bg-[#FBF6E6] p-6 ${isAr ? 'border-r-4' : 'border-l-4'}`}>
                <p className={`text-sm font-black text-primary mb-2 ${isAr ? '' : 'uppercase tracking-widest'}`}>{isAr ? 'الإجابة باختصار' : 'Quick answer'}</p>
                <p className="text-navy text-[17px] leading-relaxed">{quickAnswer}</p>
              </div>
            )}
            <div className="space-y-5 mb-10">
              {post.intro.map((p, i) => (
                <p key={i} className={i === 0 ? 'text-lg text-navy font-medium' : undefined}>{inline(p)}</p>
              ))}
            </div>

            {post.earlyCta && (
              <div className="mb-10 flex flex-col gap-4 rounded-2xl bg-navy p-6 text-white sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-lg font-extrabold">{post.earlyCta.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/80">{post.earlyCta.text}</p>
                </div>
                <WhatsAppLink
                  href={whatsappUrl}
                  aria-label={post.earlyCta.button}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-navy"
                >
                  <WhatsAppIcon size={20} className="w-5 h-5" /> {post.earlyCta.button}
                </WhatsAppLink>
              </div>
            )}

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
                {figuresFor(s.heading, 'top')}
                <div className="space-y-4">{s.paragraphs?.map((p, i) => <p key={i}>{inline(p)}</p>)}</div>
                {s.table && (
                  <div className="mt-6 overflow-x-auto rounded-2xl border border-gray-200" tabIndex={0} role="region" aria-label={s.table.caption}>
                    <table className="w-full text-left text-[15px]">
                      <caption className="sr-only">{s.table.caption}</caption>
                      <thead className="bg-navy text-white">
                        <tr>
                          {s.table.head.map((h) => (
                            <th key={h} scope="col" className="px-4 py-3 font-bold">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {s.table.rows.map((row) => (
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
                {figuresFor(s.heading, 'afterText')}
                {s.steps && (
                  <ol className="mt-5 space-y-3">
                    {s.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-black">{i + 1}</span>
                        <span>{inline(step)}</span>
                      </li>
                    ))}
                  </ol>
                )}
                {s.bullets && (
                  <ul className="mt-5 space-y-2.5">
                    {s.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" /> <span>{inline(b)}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {figuresFor(s.heading, undefined)}
                {s.subsections?.map((sub) => (
                  <div key={sub.heading} className="mt-7">
                    <h3 className="text-xl font-extrabold text-navy mb-3">{sub.heading}</h3>
                    <div className="space-y-3">{sub.paragraphs?.map((p, i) => <p key={i}>{inline(p)}</p>)}</div>
                    {sub.bullets && (
                      <ul className="mt-3 space-y-2">
                        {sub.bullets.map((b, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-1.5" /> <span>{inline(b)}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
                {s.tip && (
                  <div className="mt-6 flex gap-3 rounded-2xl border border-[#E9DCAE] bg-[#FBF6E6] p-5">
                    <Lightbulb className="w-6 h-6 text-primary shrink-0" />
                    <p className="text-[16px] text-navy"><strong>{t.tipLabel}: </strong>{inline(s.tip)}</p>
                  </div>
                )}
                {s.links && s.links.length > 0 && (
                  <div className="mt-5 flex flex-wrap items-center gap-2 text-[15px]">
                    <span className="font-bold text-navy">{t.seeAlso}:</span>
                    {s.links.map((l) => (
                      <Link key={l.href} href={l.href} className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 font-bold text-navy hover:border-primary hover:text-primary transition-colors">
                        {l.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {post.sources && post.sources.length > 0 && (
              <div className="mb-11 rounded-2xl border border-gray-200 bg-gray-50 p-6">
                <p className="text-lg font-extrabold text-navy mb-3">{t.sources}</p>
                <ul className="space-y-2 text-[15px]">
                  {post.sources.map((src) => (
                    <li key={src.href}>
                      <a href={src.href} target="_blank" rel="noopener noreferrer" className="font-bold text-navy underline decoration-primary decoration-2 underline-offset-2 hover:text-primary break-words">
                        {src.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {mainRefTool && (
              <div className="mb-11 rounded-2xl border border-gray-200 bg-gray-50 p-6">
                <p className="flex items-center gap-2 text-lg font-extrabold text-navy">
                  <BookOpen className="w-5 h-5 text-primary shrink-0" /> Reference your sources in seconds
                </p>
                <p className="mt-2 text-[16px]">
                  Paste a DOI, ISBN or web link into our{' '}
                  <Link href={toolPath(mainRefTool)} className="font-bold text-navy underline decoration-primary decoration-2 underline-offset-2 hover:text-primary">
                    free {mainRefTool.slug === 'apa-referencing-generator' ? 'APA' : 'Harvard'} referencing generator
                  </Link>{' '}
                  and get the full reference and in-text citation, ready to copy into your work.
                  {altRefTool && (
                    <>
                      {' '}Using {altRefTool.slug === 'apa-referencing-generator' ? 'APA 7' : 'Harvard'}? Try the{' '}
                      <Link href={toolPath(altRefTool)} className="font-bold text-navy underline decoration-primary decoration-2 underline-offset-2 hover:text-primary">
                        free {altRefTool.slug === 'apa-referencing-generator' ? 'APA' : 'Harvard'} referencing generator
                      </Link>
                      .
                    </>
                  )}
                </p>
              </div>
            )}
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

              {specialist && (
                <div className="rounded-3xl p-7 border border-gray-100 bg-white shadow-sm">
                  <p className="text-lg font-extrabold text-navy mb-1">Talk to a specialist</p>
                  <p className="text-sm text-gray-600 mb-4">Questions about this topic? Our specialist can help with your own work.</p>
                  <Link href={`/experts/${specialist.slug}`} className="group flex items-center gap-3">
                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${specialist.gradient} text-sm font-black text-white`}>
                      {specialist.initials}
                    </span>
                    <span>
                      <span className="block font-extrabold text-navy group-hover:text-primary transition-colors">{specialist.name}</span>
                      <span className="block text-xs font-semibold text-gray-500">{specialist.qualification} · {specialist.title}</span>
                    </span>
                  </Link>
                </div>
              )}

              {tools.length > 0 && (
                <div className="rounded-3xl p-7 border border-[#E9DCAE] bg-[#FBF6E6]">
                  <p className="text-lg font-extrabold text-navy mb-4">Free Student Tools</p>
                  <ul className="space-y-2.5">
                    {tools.map((tool) => {
                      const Icon = TOOL_ICONS[tool.slug];
                      return (
                        <li key={tool.slug}>
                          <Link href={toolPath(tool)} className="flex items-center gap-2 text-sm font-bold text-navy hover:text-primary transition-colors">
                            <Icon className="w-4 h-4 text-primary shrink-0" /> {tool.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

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

function Figure({ figure }: { figure: GuideFigure }) {
  return (
    <figure className="my-7">
      <a href={figure.src} target="_blank" rel="noopener" className="block" title="Open the full-size diagram">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={figure.src}
          alt={figure.alt}
          width={figure.width}
          height={figure.height}
          loading="lazy"
          decoding="async"
          className="w-full h-auto rounded-2xl"
        />
      </a>
      <figcaption className="mt-2.5 text-sm text-gray-500">{figure.caption} Tap or click to enlarge.</figcaption>
    </figure>
  );
}
