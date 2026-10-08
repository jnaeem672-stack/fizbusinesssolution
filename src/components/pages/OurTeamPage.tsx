import Link from 'next/link';
import { CheckCircle2, Award, GraduationCap, BookOpenCheck, Users, Languages, Clock } from 'lucide-react';
import TeamAvatar from '@/components/team/TeamAvatar';
import WhatsAppLink from '@/components/ui/WhatsAppLink';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { buildWhatsAppUrl } from '@/constants/whatsapp';
import { TEAM, SPECIALIST_GROUPS, SPECIALIST_COUNT, type TeamMember } from '@/content/team';
import { SUPPORT_FORM_PATH } from '@/constants/supportNavigation';
import { expertSlug } from '@/content/experts';

function HireButtons({ name }: { name: string; expertise?: string }) {
  return (
    <div className="grid grid-cols-2 gap-2 mt-auto pt-4">
      <Link
        href={`/experts/${expertSlug(name)}`}
        aria-label={`Hire ${name}`}
        className="inline-flex items-center justify-center gap-1.5 px-2 py-2.5 rounded-xl bg-navy text-white text-xs font-black whitespace-nowrap hover:brightness-110 transition-all"
      >
        <WhatsAppIcon size={16} className="w-4 h-4" /> Hire Expert
      </Link>
      <a
        href={SUPPORT_FORM_PATH}
        className="inline-flex items-center justify-center px-2 py-2.5 whitespace-nowrap rounded-xl border-2 border-primary/20 text-primary text-xs font-black hover:bg-primary hover:text-white hover:border-primary transition-all"
      >
        Get a Quote
      </a>
    </div>
  );
}

const STATS = [
  { icon: Award, value: '10+ Years', label: 'Since 2015' },
  { icon: GraduationCap, value: '10,000+', label: 'Students Supported' },
  { icon: BookOpenCheck, value: '350+', label: 'Research Projects' },
  { icon: Users, value: 'MBA, MPhil & CA', label: 'Qualified Team' },
];

function FounderCard({ m }: { m: TeamMember }) {
  return (
    <article className="relative overflow-hidden bg-white rounded-3xl border border-gray-100 shadow-xl p-8 md:p-10 flex flex-col sm:flex-row gap-8 items-center sm:items-start">
      <span className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-primary/5" />
      <div className="shrink-0">
        <TeamAvatar initials={m.initials} gradient={m.gradient} icon={m.icon} size="lg" />
      </div>
      <div className="relative text-center sm:text-left">
        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-black uppercase tracking-widest mb-3">{m.role}</span>
        <h3 className="text-2xl md:text-3xl font-extrabold text-navy mb-1"><Link href={`/experts/${expertSlug(m.name)}`} className="hover:text-primary transition-colors">{m.name}</Link></h3>
        <p className="text-primary font-bold mb-4">{m.qualification}</p>
        <p className="text-gray-600 leading-relaxed mb-5">{m.bio}</p>
        <ul className="flex flex-wrap justify-center sm:justify-start gap-2">
          {m.highlights.map((h) => (
            <li key={h} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-100 text-navy text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> {h}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function MemberCard({ m }: { m: TeamMember }) {
  return (
    <article className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 transition-all p-7 text-center h-full flex flex-col">
      <div className="mb-5">
        <TeamAvatar initials={m.initials} gradient={m.gradient} icon={m.icon} />
      </div>
      <h3 className="text-xl font-extrabold text-navy"><Link href={`/experts/${expertSlug(m.name)}`} className="hover:text-primary transition-colors">{m.name}</Link></h3>
      <p className="text-primary font-bold text-sm mt-1">{m.role}</p>
      <p className="text-navy/70 text-xs font-black uppercase tracking-wider mt-3">{m.qualification}</p>
      <p className="text-gray-500 text-sm leading-relaxed mt-3 mb-2">{m.bio}</p>
      <HireButtons name={m.name} expertise={m.role} />
    </article>
  );
}

export default function OurTeamPage() {
  const founders = TEAM.filter((m) => m.group === 'founders');
  const others = TEAM.filter((m) => m.group !== 'founders');
  const whatsappUrl = buildWhatsAppUrl('Hello FIZBS! I would like to discuss my assignment with your team. Subject: , Word count: , Deadline: ');

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FIZ Business Solutions',
    url: 'https://fizbusinessolutions.com',
    foundingDate: '2015',
    founder: founders.map((m) => ({ '@type': 'Person', name: m.name, jobTitle: m.role, hasCredential: m.qualification })),
    employee: others.map((m) => ({ '@type': 'Person', name: m.name, jobTitle: m.role, hasCredential: m.qualification })),
  };

  return (
    <div className="bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-light" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C41E3A_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute top-0 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="relative z-10 max-w-site mx-auto px-4 pt-16 pb-24 md:pt-20 md:pb-28 text-center">
          <nav aria-label="Breadcrumb" className="text-xs font-bold text-white/50 mb-6">
            <Link href="/" className="hover:text-white">Home</Link> <span className="mx-1">›</span> <span className="text-white/80">Our Team</span>
          </nav>
          <span className="inline-flex px-4 py-1.5 bg-primary rounded-full text-[11px] font-black text-white uppercase tracking-wider shadow-lg shadow-primary/30 mb-6">
            The people behind FIZBS
          </span>
          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            Meet Our <span className="gradient-text">Founders &amp; Team</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Since 2015, FIZ Business Solutions has helped university students in the UK, Saudi Arabia and beyond with assignments, dissertations and research. Meet the qualified people who make it happen.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="p-4 rounded-xl bg-white/5 border border-white/10">
                <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="text-lg md:text-xl font-bold text-white">{value}</p>
                <p className="text-[10px] text-white/50 uppercase tracking-wider font-semibold mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <svg viewBox="0 0 1440 80" className="absolute bottom-0 left-0 w-full h-auto" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z" fill="#f9fafb" />
        </svg>
      </section>

      {/* Founders */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 bg-primary/10 text-primary">Founders</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy tracking-tight">Founded on Research Experience</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {founders.map((m) => <FounderCard key={m.name} m={m} />)}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 bg-primary/10 text-primary">Our Story</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy tracking-tight">10+ Years of Academic Support</h2>
          </div>
          <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
            <p>
              FIZ Business Solutions has supported university students since 2015 and is led by co-founders Sajjad Akbar Ali and Fawad Hussain Khan. Sajjad is a professional researcher with an MBA and 20 published articles, and has worked on research, academic writing and proofreading since 2015.
            </p>
            <p>
              Our team includes a Chartered Accountant and MPhil-qualified specialists in accounting and finance. That is why business, management, MBA, finance and accounting are our core subjects.
            </p>
            <p>
              Over more than 10 years, FIZBS has supported over 10,000 students and completed more than 350 research projects for students in the UK, Saudi Arabia and other countries, with clear pricing and friendly support on WhatsApp.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-20 bg-soft-rose">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 bg-primary/10 text-primary">Our Team</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy tracking-tight mb-3">Business &amp; Finance Specialists</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Qualified team members who handle business, finance and accounting assignments every day.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {others.map((m) => <MemberCard key={m.name} m={m} />)}
          </div>
        </div>
      </section>

      {/* Subject specialists */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 bg-primary/10 text-primary">{SPECIALIST_COUNT} Subject Specialists</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy tracking-tight mb-3">Our Subject Specialists</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Master&apos;s and PhD-qualified specialists who support students across business, data, computing, science and social sciences.</p>
          </div>

          <div className="space-y-14">
            {SPECIALIST_GROUPS.map((group) => (
              <div key={group.title}>
                <h3 className="flex items-center gap-3 text-primary font-black text-sm uppercase tracking-[0.2em] mb-6">
                  <span className={`w-8 h-1 rounded-full bg-gradient-to-r ${group.gradient}`} />
                  {group.title}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {group.members.map((m) => {
                    const initials = m.name.replace('.', '').split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
                    return (
                      <article key={m.name} className="bg-gray-50 rounded-2xl border border-gray-100 p-5 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all h-full flex flex-col">
                        <div className="flex items-center gap-4 mb-4">
                          <TeamAvatar initials={initials} gradient={group.gradient} icon={group.icon} size="sm" />
                          <div>
                            <Link href={`/experts/${expertSlug(m.name)}`} className="font-extrabold text-navy hover:text-primary transition-colors">{m.name}</Link>
                            <p className="text-xs font-bold text-primary">{m.qualification}</p>
                          </div>
                        </div>
                        <p className="text-sm font-bold text-navy mb-1">{m.expertise}</p>
                        <p className="text-xs text-gray-500 mb-3">{m.university} ({m.year})</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                          <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-primary" /> {m.experience}</span>
                          <span className="inline-flex items-center gap-1"><Languages className="w-3.5 h-3.5 text-primary" /> {m.languages}</span>
                        </div>
                        <HireButtons name={m.name} expertise={m.expertise} />
                      </article>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 md:py-20 overflow-hidden bg-navy">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C41E3A_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">Work With Our Team</h2>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">Share your subject, word count and deadline. Get a clear price, 10% off your first order, and pay 50% to start.</p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
            <a href="/#quote" className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-xl shadow-primary/40 hover:brightness-110 transition-all">Get Instant Price</a>
            <WhatsAppLink href={whatsappUrl} aria-label="Chat on WhatsApp" className="inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-white text-navy font-bold rounded-xl">
              <WhatsAppIcon size={26} className="w-6 h-6" /> Chat on WhatsApp
            </WhatsAppLink>
          </div>
        </div>
      </section>
    </div>
  );
}
