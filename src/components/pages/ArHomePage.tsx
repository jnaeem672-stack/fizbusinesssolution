import {
  Award,
  GraduationCap,
  BookOpenCheck,
  Globe2,
  CheckCircle2,
  MessageSquareText,
  Search,
  SpellCheck2,
  Quote,
  BarChart3,
  Presentation,
  UserRoundCheck,
  Clock,
  BadgePoundSterling,
  ShieldCheck,
  ClipboardList,
  UserCheck,
  PencilLine,
  MessageCircle,
} from 'lucide-react';
import SupportRequestForm from '@/components/SupportRequestForm';
import QuoteCalculator from '@/QuoteCalculator';
import UniversityStrip from '@/components/UniversityStrip';
import FaqSection from '@/components/FaqSection';
import ExpertCallSection from '@/components/ExpertCallSection';
import PaymentSection from '@/components/PaymentSection';
import WhatsAppLink from '@/components/ui/WhatsAppLink';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { buildWhatsAppUrl } from '@/constants/whatsapp';
import { AR_HOME } from '@/content/arHome';
import { AR_LANDING_PAGES, landingLabel, landingPath } from '@/content/landing';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=60';
const heroSrcSet = [640, 1024, 1600, 2000].map((w) => `${HERO_IMAGE}&w=${w} ${w}w`).join(', ');

const STAT_ICONS = [Award, GraduationCap, BookOpenCheck, Globe2];
const SERVICE_ICONS = [GraduationCap, MessageSquareText, BookOpenCheck, Search, SpellCheck2, Quote, BarChart3, Presentation];
const WHY_ICONS = [UserRoundCheck, Clock, BadgePoundSterling, ShieldCheck];
const HOW_ICONS = [ClipboardList, UserCheck, PencilLine];
const PROMISE_ICONS = [UserRoundCheck, Clock, MessageCircle, ShieldCheck];

function Header({ badge, title, subtitle, light = false }: { badge: string; title: string; subtitle: string; light?: boolean }) {
  return (
    <div className="text-center mb-12 md:mb-14">
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-black mb-4 ${light ? 'bg-white/10 text-primary' : 'bg-primary/10 text-primary'}`}>
        {badge}
      </span>
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 ${light ? 'text-white' : 'text-navy'}`}>{title}</h2>
      <p className={`max-w-2xl mx-auto text-base md:text-lg leading-relaxed ${light ? 'text-gray-400' : 'text-gray-500'}`}>{subtitle}</p>
      <div className="h-1 w-16 rounded-full bg-gradient-to-r from-primary to-[#e8455f] mt-6 mx-auto" />
    </div>
  );
}

export default function ArHomePage() {
  const c = AR_HOME;
  const whatsappUrl = buildWhatsAppUrl(c.whatsappMessage);

  return (
    <main lang="ar" dir="rtl" className="bg-gray-50 overflow-x-hidden">
      {/* Hero */}
      <section id="home-hero" className="relative lg:min-h-[88vh] flex items-center overflow-hidden bg-navy pb-16 lg:pb-0">
        <div className="absolute inset-0 z-0">
          <img
            src={`${HERO_IMAGE}&w=1600`}
            srcSet={heroSrcSet}
            sizes="100vw"
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-bl from-navy/95 via-navy/85 to-navy-light/90" />
        <div className="absolute inset-0 z-[1] opacity-20 bg-[radial-gradient(#C41E3A_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-start lg:items-center">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3 mb-7">
                <a href="#quote" className="inline-flex items-center px-4 py-1.5 bg-primary rounded-full text-xs font-black text-white shadow-lg shadow-primary/30">
                  {c.hero.badge}
                </a>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-xs font-bold border border-white/20 text-white">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  {c.hero.trustBadge}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-white mb-6 leading-[1.25]">
                {c.hero.h1Main} <span className="gradient-text">{c.hero.h1Highlight}</span>
              </h1>
              <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-7 leading-relaxed">{c.hero.subtitle}</p>

              <ul className="flex flex-wrap gap-2.5 mb-9 max-w-3xl">
                {c.hero.features.map((item) => (
                  <li key={item} className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/[0.07] border border-white/10 text-white text-sm font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
                <a href="#quote" className="px-9 py-4 bg-primary text-white font-bold rounded-xl text-lg shadow-xl shadow-primary/40 hover:brightness-110 transition-all text-center">
                  {c.hero.priceButton}
                </a>
                <WhatsAppLink
                  href={whatsappUrl}
                  aria-label={c.hero.whatsappButton}
                  className="inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-white text-navy font-bold rounded-xl text-lg shadow-xl hover:scale-[1.02] transition-all"
                >
                  <WhatsAppIcon size={28} className="w-7 h-7" />
                  {c.hero.whatsappButton}
                </WhatsAppLink>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl">
                {c.stats.map(({ value, label }, i) => {
                  const Icon = STAT_ICONS[i] ?? Award;
                  return (
                    <div key={label} className="flex flex-col items-start sm:items-center p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                      <Icon className="w-5 h-5 text-primary mb-2" />
                      <span className="text-lg md:text-xl font-bold text-white">{value}</span>
                      <span className="text-[11px] text-white/60 font-semibold mt-0.5">{label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div id="support-form" className="w-full lg:col-span-5 scroll-mt-[110px]">
              <SupportRequestForm locale="ar" />
            </div>
          </div>
        </div>
      </section>

      <UniversityStrip title={c.universities.title} subtitle={c.universities.subtitle} note={c.universities.note} rtl />

      <QuoteCalculator locale="ar" />

      {/* Services */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-site mx-auto px-4">
          <Header badge={c.services.badge} title={c.services.title} subtitle={c.services.subtitle} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {c.services.cards.map((card, i) => {
              const Icon = SERVICE_ICONS[i] ?? GraduationCap;
              return (
                <div key={card.title} className="group relative overflow-hidden p-6 md:p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/20 transition-all h-full flex flex-col">
                  <div className="w-14 h-14 icon-gradient rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-navy font-extrabold text-lg mb-3">{card.title}</h3>
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed flex-grow">{card.desc}</p>
                  <a href="#quote" className="text-primary font-bold text-sm mt-auto">{c.services.cardCta} ←</a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="py-20 md:py-24 bg-navy">
        <div className="max-w-site mx-auto px-4">
          <Header badge={c.why.badge} title={c.why.title} subtitle={c.why.subtitle} light />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {c.why.cards.map((card, i) => {
              const Icon = WHY_ICONS[i] ?? ShieldCheck;
              return (
                <div key={card.title} className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl hover:border-primary/40 transition-all h-full">
                  <div className="w-12 h-12 icon-gradient rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3">{card.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How */}
      <section className="py-20 md:py-24 bg-soft-rose">
        <div className="max-w-site mx-auto px-4">
          <Header badge={c.how.badge} title={c.how.title} subtitle={c.how.subtitle} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">
            {c.how.steps.map((step, i) => {
              const Icon = HOW_ICONS[i] ?? ClipboardList;
              return (
                <div key={step.title} className="text-center">
                  <div className="relative inline-block mb-8">
                    <div className="w-[110px] h-[110px] bg-white rounded-full flex items-center justify-center shadow-xl shadow-primary/10 ring-8 ring-primary/5 mx-auto">
                      <Icon className="w-11 h-11 text-primary" />
                    </div>
                    <span className="absolute -top-2 -left-2 w-10 h-10 icon-gradient rounded-full flex items-center justify-center font-extrabold">{`0${i + 1}`}</span>
                  </div>
                  <h3 className="text-navy font-bold text-xl mb-3">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Promise */}
      <section className="py-20 md:py-24 bg-gray-50">
        <div className="max-w-site mx-auto px-4">
          <Header badge={c.promise.badge} title={c.promise.title} subtitle={c.promise.subtitle} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {c.promise.cards.map((card, i) => {
              const Icon = PROMISE_ICONS[i] ?? ShieldCheck;
              return (
                <article key={card.title} className="p-7 md:p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all h-full">
                  <div className="w-12 h-12 rounded-xl icon-gradient flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-navy mb-3">{card.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{card.desc}</p>
                </article>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <a href="#quote" className="inline-flex px-8 py-3.5 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:brightness-110 transition-all">
              {c.promise.cta}
            </a>
          </div>
        </div>
      </section>

      {/* Arabic pages */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-navy mb-6">صفحات قد تهمك</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {AR_LANDING_PAGES.map((page) => (
              <a key={page.slug} href={landingPath(page)} className="px-5 py-3 rounded-xl border border-gray-200 bg-gray-50 text-navy font-bold text-sm hover:border-primary/40 hover:text-primary transition-colors">
                {landingLabel(page)}
              </a>
            ))}
          </div>
        </div>
      </section>

      <ExpertCallSection locale="ar" className="bg-white" />

      <PaymentSection locale="ar" className="bg-gray-50" />

      <FaqSection faqs={c.faq.items} title={c.faq.title} subtitle={c.faq.subtitle} badge={c.faq.badge} rtl className="bg-soft-rose" />

      {/* CTA */}
      <section className="relative py-20 md:py-24 overflow-hidden bg-navy">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C41E3A_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-white/10 text-primary text-xs font-black rounded-full mb-6 border border-white/10">{c.cta.badge}</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5 leading-tight">{c.cta.title}</h2>
          <p className="text-gray-300 text-base md:text-lg mb-10 leading-relaxed">{c.cta.text}</p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
            <a href="#quote" className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-xl shadow-primary/40 hover:brightness-110 transition-all">
              {c.cta.button}
            </a>
            <WhatsAppLink
              href={whatsappUrl}
              aria-label={c.hero.whatsappButton}
              className="inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-white text-navy font-bold rounded-xl"
            >
              <WhatsAppIcon size={26} className="w-6 h-6" />
              {c.hero.whatsappButton}
            </WhatsAppLink>
          </div>
        </div>
      </section>
    </main>
  );
}
