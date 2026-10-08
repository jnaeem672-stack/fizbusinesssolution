'use client';

import {
  BookOpenCheck,
  MessageSquareText,
  Search,
  SpellCheck2,
  Quote,
  BarChart3,
  Presentation,
  GraduationCap,
  type LucideIcon,
} from 'lucide-react';
import SectionHeader from './ui/SectionHeader';
import ServiceCard from './services/ServiceCard';

const services: { name: string; icon: LucideIcon; desc: string }[] = [
  { name: 'Assignment Help', icon: GraduationCap, desc: 'Expert help with essays, reports, case studies and coursework across 100+ subjects.' },
  { name: 'Draft Review & Feedback', icon: MessageSquareText, desc: 'Detailed expert review of your draft with clear improvements before submission.' },
  { name: 'Dissertation Help', icon: BookOpenCheck, desc: 'Help with topics, proposals, literature reviews, methodology and every chapter.' },
  { name: 'Literature Review Help', icon: Search, desc: 'Find, evaluate and organise credible academic sources for a strong literature review.' },
  { name: 'Proofreading & Editing', icon: SpellCheck2, desc: 'Polish grammar, flow, clarity and academic tone to UK university standards.' },
  { name: 'Referencing Help', icon: Quote, desc: 'Accurate Harvard, APA, MLA and OSCOLA citations and reference lists.' },
  { name: 'Data Analysis Help', icon: BarChart3, desc: 'SPSS, Excel, NVivo, Stata and Python analysis with clear interpretation of results.' },
  { name: 'Presentation Help', icon: Presentation, desc: 'Professional slides, speaker notes and structure for confident presentations.' },
];

const ServicesGrid = () => (
  <section className="py-20 md:py-28 bg-white" id="services">
    <div className="max-w-site mx-auto px-4">
      <SectionHeader
        badge="Our Services"
        title="Our Assignment Help Services"
        subtitle="Expert help for Bachelor's, Master's, MBA and PhD students in the UK and Saudi Arabia, matched to a qualified subject specialist."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {services.map((service, index) => (
          <ServiceCard key={service.name} {...service} index={index} />
        ))}
      </div>
    </div>
  </section>
);

export default ServicesGrid;
