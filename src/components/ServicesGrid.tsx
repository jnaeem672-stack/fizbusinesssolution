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
  { name: 'Academic Coaching', icon: GraduationCap, desc: 'One-to-one guidance on academic concepts, planning, structure, and critical thinking.' },
  { name: 'Draft Feedback', icon: MessageSquareText, desc: 'Constructive comments on work you have written, with clear revision priorities.' },
  { name: 'Dissertation Coaching', icon: BookOpenCheck, desc: 'Guidance on research questions, literature reviews, methodology, and chapter planning.' },
  { name: 'Literature Search Skills', icon: Search, desc: 'Learn how to find, evaluate, organise, and synthesise credible academic sources.' },
  { name: 'Proofreading', icon: SpellCheck2, desc: 'Language-focused review of grammar, punctuation, clarity, and consistency.' },
  { name: 'Referencing Support', icon: Quote, desc: 'Practical help with citations, reference lists, and institution-specific styles.' },
  { name: 'Data Analysis Tutoring', icon: BarChart3, desc: 'Guided learning in SPSS, Excel, NVivo, Python, and interpretation of results.' },
  { name: 'Presentation Coaching', icon: Presentation, desc: 'Improve slide structure, visual clarity, speaker notes, and delivery confidence.' },
];

const ServicesGrid = () => (
  <section className="py-20 md:py-28 bg-white" id="services">
    <div className="max-w-site mx-auto px-4">
      <SectionHeader
        title="Ethical Learning Support Services"
        subtitle="Coaching, tutoring, feedback, and proofreading designed to strengthen your own understanding and independent work."
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
