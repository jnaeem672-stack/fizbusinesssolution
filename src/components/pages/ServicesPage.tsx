'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  BookOpenCheck,
  MessageSquareText,
  SpellCheck2,
  BarChart3,
  Presentation,
  ChevronRight,
  CheckCircle2,
  Search,
  type LucideIcon,
} from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import SectionHeader from '@/components/ui/SectionHeader';
import SupportRequestSection from '@/components/home/SupportRequestSection';
import CTASection from '@/components/home/CTASection';
import { SUPPORT_FORM_HASH, scrollToSupportForm } from '@/constants/supportNavigation';
import { useSupportFormScroll } from '@/hooks/useSupportFormScroll';
import { ALL_SERVICES, SERVICE_CATEGORIES, type ServiceCategory } from '@/constants/servicesCatalog';

const featuredServices: { name: string; icon: LucideIcon; badge: string; desc: string; points: string[] }[] = [
  { name: 'Assignment Help', icon: GraduationCap, badge: 'Most Popular', desc: 'Expert assignment help for essays, reports, case studies and coursework in 100+ subjects at UK and Saudi universities.', points: ['From £20 per 1,000 words', 'Qualified subject experts', 'Harvard, APA & OSCOLA referencing'] },
  { name: 'Dissertation Help', icon: BookOpenCheck, badge: 'Research', desc: "Dissertation and thesis help for Bachelor's, Master's, MBA and PhD students, from proposal to final chapter.", points: ['Proposal & literature review', 'Methodology & data analysis', 'Maximum £350 per dissertation'] },
  { name: 'Research Proposal Help', icon: MessageSquareText, badge: 'Proposals', desc: 'Research proposals for dissertations and PhD applications with clear aims, questions and methodology.', points: ['Topic selection', 'Research questions', 'PhD & scholarship applications'] },
  { name: 'Proofreading & Editing', icon: SpellCheck2, badge: 'Language', desc: 'Professional proofreading and editing to UK academic standards for grammar, flow, clarity and tone.', points: ['Grammar & clarity', 'Academic tone', 'Fast turnaround'] },
  { name: 'Data Analysis Help', icon: BarChart3, badge: 'Technical', desc: 'SPSS, Excel, NVivo, Stata and Python analysis with clear tables, charts and interpretation of results.', points: ['SPSS & Excel', 'NVivo & thematic analysis', 'Clear interpretation'] },
  { name: 'Presentation Help', icon: Presentation, badge: 'Presentations', desc: 'Professional PowerPoint slides with clear structure, visuals and speaker notes for any subject.', points: ['Professional slides', 'Speaker notes', 'Any subject'] },
];

function filterCategories(searchTerm: string): ServiceCategory[] {
  const query = searchTerm.trim().toLowerCase();
  if (!query) return SERVICE_CATEGORIES;

  return SERVICE_CATEGORIES.map((category) => ({
    ...category,
    services: category.services.filter(
      (service) =>
        service.name.toLowerCase().includes(query) ||
        service.desc.toLowerCase().includes(query) ||
        service.areas.toLowerCase().includes(query) ||
        category.title.toLowerCase().includes(query)
    ),
  })).filter((category) => category.services.length > 0);
}

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  useSupportFormScroll();

  const filteredCategories = useMemo(() => filterCategories(searchTerm), [searchTerm]);
  const totalResults = filteredCategories.reduce((sum, category) => sum + category.services.length, 0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PageHero
        title="Assignment & Dissertation Help UK & Saudi Arabia"
        subtitle="Expert assignment help, dissertation help, research proposal help and proofreading for students in the UK and Saudi Arabia since 2015."
        breadcrumb="Services"
        badge="Trusted Since 2015"
        backgroundImage="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&q=80"
        highlights={['Assignment Help', 'Dissertation Help', 'Proofreading']}
        ctaLabel="Get a Free Quote"
        ctaHref={SUPPORT_FORM_HASH}
      />

      <SupportRequestSection />

      <main className="flex-grow">
        <section className="py-16 md:py-24 bg-navy relative">
          <div className="max-w-site mx-auto px-4">
            <SectionHeader
              badge="Most Popular"
              title="Our Most Popular Services"
              subtitle="Assignment and dissertation help from qualified subject experts, with transparent UK pricing and 10% off your first order."
              light
              className="mb-12 md:mb-16"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredServices.map((service, index) => (
                <motion.div key={service.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ y: -10 }} className="bg-white p-8 rounded-2xl shadow-2xl relative border-l-4 border-primary group">
                  <div className="absolute top-6 right-8 px-3 py-1 bg-primary text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">{service.badge}</div>
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                    <service.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-navy mb-4">{service.name}</h3>
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed">{service.desc}</p>
                  <ul className="space-y-3 mb-8">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-center gap-2 text-xs font-bold text-navy">
                        <CheckCircle2 className="w-4 h-4 text-primary" /> {point}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={scrollToSupportForm}
                    className="w-full py-4 bg-primary text-white font-black uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 text-xs shadow-xl shadow-primary/20 hover:brightness-110 transition-all"
                  >
                    Get a Quote <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 max-w-site mx-auto px-4">
          <SectionHeader
            badge="All Services"
            title="All Assignment & Dissertation Help Services"
            subtitle={`${ALL_SERVICES.length} services covering assignments, essays, dissertations, research proposals, data analysis and 100+ subjects.`}
            className="mb-10"
          />

          <div className="max-w-md mx-auto relative mb-14">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search services (e.g. SPSS, proofreading, literature review)..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-primary focus:ring-0 outline-none transition-all shadow-sm bg-white"
            />
          </div>

          {totalResults > 0 ? (
            <div className="space-y-16">
              {filteredCategories.map((category, categoryIndex) => (
                <motion.div key={category.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: categoryIndex * 0.05 }}>
                  <div className="mb-8">
                    <h3 className="text-primary font-black text-sm uppercase tracking-[0.2em] mb-3">{category.title}</h3>
                    <div className="h-0.5 w-full max-w-xs bg-primary/20"><div className="h-full w-16 bg-primary" /></div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                    {category.services.map((service, index) => (
                      <motion.article key={service.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.03 }} className="group bg-white rounded-2xl border border-gray-100 p-5 md:p-6 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all flex flex-col h-full">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <h4 className="font-black text-navy text-base leading-snug group-hover:text-primary transition-colors">{service.name}</h4>
                          <span className="shrink-0 px-2 py-0.5 bg-primary/10 text-primary text-[9px] font-black uppercase tracking-wider rounded-full">{service.areas}</span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-grow">{service.desc}</p>
                        <button type="button" onClick={scrollToSupportForm} className="inline-flex items-center gap-1.5 text-primary font-black text-[10px] uppercase tracking-widest hover:gap-2.5 transition-all mt-auto">
                          Get a Quote <ChevronRight className="w-4 h-4" />
                        </button>
                      </motion.article>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
              <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No services found matching &quot;{searchTerm}&quot;</p>
            </div>
          )}
        </section>

        <CTASection
          badge="🎁 First Order 10% OFF"
          title="Get Expert Assignment & Dissertation Help Today"
          subtitle="Share your brief, word count and deadline. We will send you a clear price and match you with a qualified subject expert."
        />
      </main>
    </div>
  );
}
