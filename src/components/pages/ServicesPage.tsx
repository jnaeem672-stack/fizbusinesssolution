'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen, Scroll, FileText, Stethoscope, Scale, Settings,
  ChevronRight, CheckCircle2, Search,
  type LucideIcon,
} from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import SectionHeader from '@/components/ui/SectionHeader';
import OrderSection from '@/components/home/OrderSection';
import CTASection from '@/components/home/CTASection';
import { ORDER_FORM_HASH, scrollToOrderForm } from '@/constants/orderNavigation';
import { useOrderFormScroll } from '@/hooks/useOrderFormScroll';
import { ALL_SERVICES, SERVICE_CATEGORIES, type ServiceCategory } from '@/constants/servicesCatalog';

const featuredServices: { name: string; icon: LucideIcon; badge: string; desc: string; points: string[] }[] = [
  { name: 'Assignment Help', icon: BookOpen, badge: 'Most Popular', desc: 'Get top grades with our human-written assignments tailored to your specific requirements.', points: ['AI-Free Content', 'On-Time Delivery', 'Plagiarism Report'] },
  { name: 'Dissertation Writing', icon: Scroll, badge: 'Top Rated', desc: 'Comprehensive dissertation support from expert writers with years of research experience.', points: ['Specialist Writers', '24/7 Support', 'Unlimited Revisions'] },
  { name: 'Nursing Assignment', icon: Stethoscope, badge: 'Specialized', desc: 'Expert help for clinical case studies and healthcare papers according to UK standards.', points: ['Verified Experts', 'Zero AI Usage', 'On-Time Results'] },
  { name: 'CIPD Help', icon: FileText, badge: 'Professional', desc: 'Specialized support for CIPD Level 3, 5, and 7 assignments across all HR modules.', points: ['Subject Experts', 'Money-Back Guarantee', 'Confidential'] },
  { name: 'Law Assignment', icon: Scale, badge: 'New', desc: 'In-depth legal analysis and case studies handled by qualified legal professionals.', points: ['Legal Formatting', 'Proper Citations', 'Human Touch'] },
  { name: 'Engineering Assignment', icon: Settings, badge: 'Technical', desc: 'Solving complex engineering problems and technical reports with accuracy and precision.', points: ['Precision Work', 'Research Based', 'Verified PhDs'] },
];

function filterCategories(searchTerm: string): ServiceCategory[] {
  const q = searchTerm.trim().toLowerCase();
  if (!q) return SERVICE_CATEGORIES;

  return SERVICE_CATEGORIES.map((category) => ({
    ...category,
    services: category.services.filter(
      (service) =>
        service.name.toLowerCase().includes(q) ||
        service.desc.toLowerCase().includes(q) ||
        service.areas.toLowerCase().includes(q) ||
        category.title.toLowerCase().includes(q)
    ),
  })).filter((category) => category.services.length > 0);
}

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  useOrderFormScroll();

  const filteredCategories = useMemo(() => filterCategories(searchTerm), [searchTerm]);
  const totalResults = filteredCategories.reduce((sum, c) => sum + c.services.length, 0);

  const handleOrder = () => {
    scrollToOrderForm();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PageHero
        title="Our Academic Writing Services"
        subtitle="Expert-written, AI-free academic help across all subjects and levels. Join 10,000+ students who trust us for top grades."
        breadcrumb="Services"
        badge="26+ Premium Services"
        backgroundImage="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&q=80"
        highlights={['UK Writing Services', 'Subject Specialists', 'Diploma & Degree Help']}
        ctaLabel="Place Your Order"
        ctaHref={ORDER_FORM_HASH}
      />

      <OrderSection />

      <main className="flex-grow">
        <section className="py-16 md:py-24 bg-navy relative">
          <div className="max-w-site mx-auto px-4">
            <SectionHeader
              title="Highlight Services"
              subtitle="Our most popular academic writing services — trusted by thousands of students worldwide."
              light
              className="mb-12 md:mb-16"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredServices.map((s, i) => (
                <motion.div key={s.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -10 }} className="bg-white p-8 rounded-2xl shadow-2xl relative border-l-4 border-primary group">
                  <div className="absolute top-6 right-8 px-3 py-1 bg-primary text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">{s.badge}</div>
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                    <s.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-navy mb-4">{s.name}</h3>
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed">{s.desc}</p>
                  <ul className="space-y-3 mb-8">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-xs font-bold text-navy">
                        <CheckCircle2 className="w-4 h-4 text-primary" /> {p}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={handleOrder}
                    className="w-full py-4 bg-primary text-white font-black uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 text-xs shadow-xl shadow-primary/20 hover:brightness-110 transition-all"
                  >
                    Order Now <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 max-w-site mx-auto px-4">
          <SectionHeader
            title="Browse by Category"
            subtitle={`${ALL_SERVICES.length} services across UK writing, subject-specific help, and diploma programmes.`}
            className="mb-10"
          />

          <div className="max-w-md mx-auto relative mb-14">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search services (e.g. Nursing, CIPD, Essay)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-primary focus:ring-0 outline-none transition-all shadow-sm bg-white"
            />
          </div>

          {totalResults > 0 ? (
            <div className="space-y-16">
              {filteredCategories.map((category, catIndex) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: catIndex * 0.05 }}
                >
                  <div className="mb-8">
                    <h3 className="text-primary font-black text-sm uppercase tracking-[0.2em] mb-3">
                      {category.title}
                    </h3>
                    <div className="h-0.5 w-full max-w-xs bg-primary/20">
                      <div className="h-full w-16 bg-primary" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                    {category.services.map((service, i) => (
                      <motion.article
                        key={service.id}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.03 }}
                        className="group bg-white rounded-2xl border border-gray-100 p-5 md:p-6 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all flex flex-col h-full"
                      >
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <h4 className="font-black text-navy text-base leading-snug group-hover:text-primary transition-colors">
                            {service.name}
                          </h4>
                          <span className="shrink-0 px-2 py-0.5 bg-primary/10 text-primary text-[9px] font-black uppercase tracking-wider rounded-full">
                            {service.areas}
                          </span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-grow">
                          {service.desc}
                        </p>
                        <button
                          type="button"
                          onClick={handleOrder}
                          className="inline-flex items-center gap-1.5 text-primary font-black text-[10px] uppercase tracking-widest hover:gap-2.5 transition-all mt-auto"
                        >
                          Order Now <ChevronRight className="w-4 h-4" />
                        </button>
                      </motion.article>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
              <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
                No services found matching &quot;{searchTerm}&quot;
              </p>
            </div>
          )}
        </section>

        <CTASection
          badge="Start Today"
          title="Ready to Get Expert Help?"
          subtitle="Join 10,000+ students who trust FizBussinessSolution for original, AI-free academic success."
        />
      </main>
    </div>
  );
}
