import Link from 'next/link';
import { CheckCircle2, ChevronRight, GraduationCap, Clock, Languages, Building2, PhoneCall } from 'lucide-react';
import TeamAvatar from '@/components/team/TeamAvatar';
import SupportRequestForm from '@/components/SupportRequestForm';
import FaqSection from '@/components/FaqSection';
import PaymentSection from '@/components/PaymentSection';
import WhatsAppLink from '@/components/ui/WhatsAppLink';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { buildWhatsAppUrl } from '@/constants/whatsapp';
import { EXPERTS, type ExpertProfile } from '@/content/experts';
import { getLandingPage, landingLabel, landingPath, SITE_URL } from '@/content/landing';

export default function ExpertProfilePage({ expert }: { expert: ExpertProfile }) {
  const a = expert.article;
  const firstName = expert.name.split(' ')[0];
  const whatsappUrl = buildWhatsAppUrl(
    `Hello FIZBS! I'd like to work with ${expert.name} (${expert.title}).\nSubject: \nWord count: \nDeadline: `
  );
  const callUrl = buildWhatsAppUrl(
    `Hello FIZBS! I'd like to book a WhatsApp call with ${expert.name} (${expert.title}) to discuss my assessment.\nSubject: \nPreferred call time: `
  );
  const related = a.related.map((s) => getLandingPage(s, 'en')).filter((p): p is NonNullable<typeof p> => Boolean(p));
  const colleagues = EXPERTS.filter((e) => e.group === expert.group && e.slug !== expert.slug).slice(0, 4);
  const url = `${SITE_URL}/experts/${expert.slug}`;

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      url,
      mainEntity: {
        '@type': 'Person',
        name: expert.name,
        jobTitle: expert.title,
        hasCredential: expert.qualification,
        ...(expert.university && { alumniOf: expert.university.split(',')[0] }),
        knowsLanguage: expert.languages?.split(',').map((l) => l.trim()),
        worksFor: { '@type': 'Organization', name: 'FIZ Business Solutions', url: SITE_URL },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Our Team', item: `${SITE_URL}/our-team` },
        { '@type': 'ListItem', position: 3, name: expert.name, item: url },
      ],
    },
  ];

  const facts = [
    { icon: GraduationCap, label: expert.qualification },
    ...(expert.university ? [{ icon: Building2, label: `${expert.university}${expert.year ? ` (${expert.year})` : ''}` }] : []),
    ...(expert.experience ? [{ icon: Clock, label: `${expert.experience} of experience` }] : []),
    ...(expert.languages ? [{ icon: Languages, label: expert.languages }] : []),
  ];

  return (
    <div className="bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero / profile card */}
      <section className="relative overflow-hidden bg-navy pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-light" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C41E3A_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="relative z-10 max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 pt-10 md:pt-14">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-bold text-white/50 mb-8">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/our-team" className="hover:text-white">Our Team</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/80">{expert.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
            <div className="lg:col-span-7">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 text-center sm:text-left">
                <TeamAvatar initials={expert.initials} gradient={expert.gradient} icon={expert.icon} size="lg" />
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-primary text-white text-[11px] font-black uppercase tracking-widest mb-3">{expert.group}</span>
                  <p className="text-3xl md:text-4xl font-extrabold text-white">{expert.name}</p>
                  <p className="text-primary font-bold mt-1">{expert.title}</p>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-5">{a.h1}</h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-7 max-w-2xl">{a.subtitle}</p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 max-w-2xl">
                {facts.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.07] border border-white/10 text-white text-sm font-semibold">
                    <Icon className="w-5 h-5 text-primary shrink-0" /> {label}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <WhatsAppLink
                  href={whatsappUrl}
                  aria-label={`Hire ${expert.name} on WhatsApp`}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-navy font-bold rounded-xl text-lg shadow-xl hover:scale-[1.02] transition-all"
                >
                  <WhatsAppIcon size={28} className="w-7 h-7" /> Hire {firstName} on WhatsApp
                </WhatsAppLink>
                <a href="#quote-form" className="px-8 py-4 bg-primary text-white font-bold rounded-xl text-lg shadow-xl shadow-primary/40 hover:brightness-110 transition-all text-center">
                  Get a Free Quote
                </a>
              </div>
              <WhatsAppLink
                href={callUrl}
                aria-label={`Book a WhatsApp call with ${expert.name}`}
                className="inline-flex items-center gap-2 mt-4 text-sm font-bold text-white/80 hover:text-white underline-offset-4 hover:underline"
              >
                <PhoneCall className="w-4 h-4 text-[#25D366]" /> Prefer to talk first? Book a WhatsApp call with {firstName} (in English)
              </WhatsAppLink>
            </div>

            <div id="quote-form" className="w-full lg:col-span-5 scroll-mt-[110px]">
              <div id="support-form">
                <SupportRequestForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <article className="lg:col-span-8 text-gray-700 text-[17px] leading-relaxed">
            <div className="space-y-5 mb-10">
              {a.intro.map((p, i) => (
                <p key={i} className={i === 0 ? 'text-lg text-navy font-medium' : undefined}>{p}</p>
              ))}
            </div>
            {a.sections.map((section) => (
              <div key={section.heading} className="mb-10">
                <h2 className="text-2xl md:text-3xl font-extrabold text-navy tracking-tight mb-4">{section.heading}</h2>
                <div className="space-y-4">{section.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}</div>
                {section.bullets && (
                  <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                    {section.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" /> <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </article>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-[110px] space-y-6">
              <div className="bg-navy rounded-3xl p-7 text-white shadow-2xl text-center">
                <div className="flex justify-center mb-4">
                  <TeamAvatar initials={expert.initials} gradient={expert.gradient} icon={expert.icon} />
                </div>
                <p className="text-xl font-extrabold">{expert.name}</p>
                <p className="text-primary text-sm font-bold mb-5">{expert.title}</p>
                <WhatsAppLink
                  href={whatsappUrl}
                  aria-label={`Hire ${expert.name} on WhatsApp`}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-white text-navy font-bold rounded-xl mb-3"
                >
                  <WhatsAppIcon size={22} className="w-5 h-5" /> Hire {firstName}
                </WhatsAppLink>
                <a href="/#quote" className="block w-full py-3.5 bg-primary text-white font-bold rounded-xl hover:brightness-110 transition-all">
                  See Instant Price
                </a>
                <WhatsAppLink
                  href={callUrl}
                  aria-label={`Book a WhatsApp call with ${expert.name}`}
                  className="flex items-center justify-center gap-2 w-full py-3 mt-3 border border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-all text-sm"
                >
                  <PhoneCall className="w-4 h-4 text-[#25D366]" /> Book a Call With {firstName}
                </WhatsAppLink>
                <p className="text-white/50 text-[11px] mt-2">WhatsApp call · in English · at a time that suits you</p>
                <p className="text-white/60 text-xs mt-4">From £20 per 1,000 words · 50% to start, 50% on completion</p>
              </div>

              {related.length > 0 && (
                <div className="bg-gray-50 rounded-3xl p-7 border border-gray-100">
                  <h2 className="text-lg font-extrabold text-navy mb-4">Related Services</h2>
                  <ul className="space-y-2.5">
                    {related.map((p) => (
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

      <FaqSection faqs={a.faqs} title={`Questions About Working With ${firstName}`} className="bg-gray-50" />

      <PaymentSection className="bg-white" />

      {colleagues.length > 0 && (
        <section className="py-14 md:py-20 bg-soft-rose">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-navy text-center mb-10">More Experts in {expert.group}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {colleagues.map((c) => (
                <Link key={c.slug} href={`/experts/${c.slug}`} className="group bg-white rounded-2xl border border-gray-100 p-5 text-center hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="flex justify-center mb-3">
                    <TeamAvatar initials={c.initials} gradient={c.gradient} icon={c.icon} size="sm" />
                  </div>
                  <p className="font-extrabold text-navy group-hover:text-primary transition-colors">{c.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{c.title}</p>
                  <p className="text-xs font-bold text-primary mt-1">{c.qualification}</p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/our-team" className="inline-flex items-center gap-2 px-7 py-3 bg-navy text-white font-bold rounded-xl">
                Meet the Full Team <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
