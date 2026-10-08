import Link from 'next/link';
import { CheckCircle2, Award, GraduationCap, BookOpenCheck, Layers, ChevronRight, Calculator } from 'lucide-react';
import SupportRequestForm from '@/components/SupportRequestForm';
import QuoteCalculator from '@/QuoteCalculator';
import FaqSection from '@/components/FaqSection';
import WhatsAppLink from '@/components/ui/WhatsAppLink';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { buildWhatsAppUrl } from '@/constants/whatsapp';
import {
  SITE_URL,
  getLandingPage,
  landingLabel,
  landingPath,
  type LandingContent,
} from '@/content/landing';

const LABELS = {
  en: {
    home: 'Home',
    price: 'Get Instant Price',
    whatsapp: 'Chat on WhatsApp',
    stats: [
      { icon: Award, value: '10+ Years', label: 'Since 2015' },
      { icon: GraduationCap, value: '10,000+', label: 'Students Supported' },
      { icon: BookOpenCheck, value: '350+', label: 'Research Projects' },
      { icon: Layers, value: '115+', label: 'Subjects' },
    ],
    sideTitle: 'Your Price in Seconds',
    sideItems: ['Assignments from £20 per 1,000 words', 'Dissertations capped at £350', '10% off your first order', '24/7 WhatsApp support'],
    sideCta: 'See My Price',
    faqTitle: 'Frequently Asked Questions',
    related: 'Related Services',
  },
  ar: {
    home: 'الرئيسية',
    price: 'احصل على السعر الآن',
    whatsapp: 'تواصل عبر واتساب',
    stats: [
      { icon: Award, value: '+10 سنوات', label: 'منذ 2015' },
      { icon: GraduationCap, value: '+10,000', label: 'طالب تم دعمهم' },
      { icon: BookOpenCheck, value: '+350', label: 'مشروع بحثي' },
      { icon: Layers, value: '+115', label: 'تخصص' },
    ],
    sideTitle: 'اعرف السعر خلال ثوانٍ',
    sideItems: ['الواجبات من 20 جنيهًا لكل 1,000 كلمة', 'الرسائل العلمية بحد أقصى 350 جنيهًا', 'خصم 10% على أول طلب', 'دعم عبر واتساب على مدار الساعة'],
    sideCta: 'اعرف السعر',
    faqTitle: 'الأسئلة الشائعة',
    related: 'خدمات ذات صلة',
  },
} as const;

export default function LandingPage({ page }: { page: LandingContent }) {
  const isAr = page.locale === 'ar';
  const t = LABELS[page.locale];
  const url = `${SITE_URL}${landingPath(page)}`;
  const whatsappUrl = buildWhatsAppUrl(page.whatsappMessage);
  const related = page.related
    .map((slug) => getLandingPage(slug, 'en'))
    .filter((p): p is LandingContent => Boolean(p));

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: page.h1,
      description: page.metaDescription,
      url,
      serviceType: landingLabel(page),
      areaServed: ['United Kingdom', 'Saudi Arabia'],
      provider: {
        '@type': 'ProfessionalService',
        name: 'FIZ Business Solutions',
        url: SITE_URL,
        telephone: '+971543800388',
      },
      offers: { '@type': 'Offer', priceCurrency: 'GBP', price: '20', description: 'From £20 per 1,000 words' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: landingLabel(page), item: url },
      ],
    },
  ];

  return (
    <div lang={page.locale} className="bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section id="landing-hero" className="relative overflow-hidden bg-navy pb-16 lg:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-light" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C41E3A_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 -right-32 w-80 h-80 bg-primary/15 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 pt-12 md:pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-start" dir={isAr ? 'rtl' : undefined}>
            <div className="lg:col-span-7">
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-bold text-white/50 mb-6">
                <Link href="/" className="hover:text-white">{t.home}</Link>
                <ChevronRight className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} />
                <span className="text-white/80">{landingLabel(page)}</span>
              </nav>

              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary rounded-full text-[11px] font-black text-white uppercase tracking-wider shadow-lg shadow-primary/30 mb-6">
                {page.badge}
              </span>

              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]">
                {page.h1}
              </h1>
              <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-7 leading-relaxed">{page.heroSubtitle}</p>

              <ul className="flex flex-wrap gap-2.5 mb-9">
                {page.highlights.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/[0.07] border border-white/10 text-white text-[13px] font-semibold"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
                <a
                  href="#quote"
                  className="px-9 py-4 bg-primary text-white font-bold rounded-xl text-lg shadow-xl shadow-primary/40 hover:brightness-110 transition-all text-center"
                >
                  {t.price}
                </a>
                <WhatsAppLink
                  href={whatsappUrl}
                  aria-label={t.whatsapp}
                  className="inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-white text-navy font-bold rounded-xl text-lg shadow-xl hover:scale-[1.02] transition-all"
                >
                  <WhatsAppIcon size={28} className="w-7 h-7" />
                  {t.whatsapp}
                </WhatsAppLink>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl">
                {t.stats.map(({ icon: Icon, value, label }) => (
                  <div key={label} className="flex flex-col items-start sm:items-center p-4 rounded-xl bg-white/5 border border-white/10">
                    <Icon className="w-5 h-5 text-primary mb-2" />
                    <span className="text-lg md:text-xl font-bold text-white">{value}</span>
                    <span className="text-[10px] text-white/50 uppercase tracking-wider font-semibold mt-0.5">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div id="support-form" className="w-full lg:col-span-5 scroll-mt-[110px]" dir="ltr">
              <SupportRequestForm />
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-14 md:py-20 bg-white" dir={isAr ? 'rtl' : undefined}>
        <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <article className="lg:col-span-8 text-gray-700 text-[17px] leading-relaxed">
            <div className="space-y-5 mb-10">
              {page.intro.map((p, i) => (
                <p key={i} className="first:text-lg first:text-navy first:font-medium">{p}</p>
              ))}
            </div>

            {page.sections.map((section) => (
              <div key={section.heading} className="mb-10">
                <h2 className="text-2xl md:text-3xl font-extrabold text-navy tracking-tight mb-4">{section.heading}</h2>
                <div className="space-y-4">
                  {section.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}
                </div>
                {section.bullets && (
                  <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                    {section.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </article>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-[110px] space-y-6">
              <div className="bg-navy rounded-3xl p-7 text-white shadow-2xl">
                <div className="w-12 h-12 icon-gradient rounded-xl flex items-center justify-center mb-5">
                  <Calculator className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-extrabold mb-4">{t.sideTitle}</h2>
                <ul className="space-y-3 mb-6 text-sm text-white/80">
                  {t.sideItems.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {item}
                    </li>
                  ))}
                </ul>
                <a href="#quote" className="block w-full py-3.5 bg-primary text-white text-center font-bold rounded-xl hover:brightness-110 transition-all mb-3">
                  {t.sideCta}
                </a>
                <WhatsAppLink
                  href={whatsappUrl}
                  aria-label={t.whatsapp}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-white text-navy font-bold rounded-xl"
                >
                  <WhatsAppIcon size={22} className="w-5 h-5" />
                  {t.whatsapp}
                </WhatsAppLink>
              </div>

              {related.length > 0 && (
                <div className="bg-gray-50 rounded-3xl p-7 border border-gray-100">
                  <h2 className="text-lg font-extrabold text-navy mb-4">{t.related}</h2>
                  <ul className="space-y-2.5" dir="ltr">
                    {related.map((p) => (
                      <li key={p.slug}>
                        <Link href={landingPath(p)} className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-primary transition-colors">
                          <ChevronRight className="w-4 h-4 text-primary" />
                          {landingLabel(p)}
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

      <div dir="ltr">
        <QuoteCalculator />
      </div>

      <FaqSection faqs={page.faqs} title={t.faqTitle} rtl={isAr} className="bg-white" />

      {/* Final CTA */}
      <section className="relative py-16 md:py-20 overflow-hidden bg-navy" dir={isAr ? 'rtl' : undefined}>
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C41E3A_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">{page.ctaTitle}</h2>
          <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed">{page.ctaText}</p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
            <a href="#quote" className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-xl shadow-primary/40 hover:brightness-110 transition-all">
              {t.price}
            </a>
            <WhatsAppLink
              href={whatsappUrl}
              aria-label={t.whatsapp}
              className="inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-white text-navy font-bold rounded-xl"
            >
              <WhatsAppIcon size={26} className="w-6 h-6" />
              {t.whatsapp}
            </WhatsAppLink>
          </div>
        </div>
      </section>
    </div>
  );
}
