'use client';

import Link from 'next/link';
import {
  Briefcase,
  LineChart,
  Calculator,
  Cpu,
  HeartPulse,
  Scale,
  Building2,
  GraduationCap,
  type LucideIcon,
} from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import WhatsAppLink from '@/components/ui/WhatsAppLink';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { WHATSAPP_URL } from '@/constants/whatsapp';

type Group = { title: string; icon: LucideIcon; subjects: string[] };

const GROUPS: Group[] = [
  {
    title: 'Business & Management',
    icon: Briefcase,
    subjects: [
      'Business Management', 'MBA', 'Strategic Management', 'International Business', 'Human Resource Management',
      'Strategic HRM', 'Organisational Behaviour', 'Leadership', 'Operations Management', 'Supply Chain Management',
      'Logistics', 'Procurement', 'Project Management', 'Entrepreneurship', 'Small Business Management',
      'Family Business', 'Business Analytics', 'Business Ethics', 'Corporate Governance', 'Change Management',
      'Innovation Management', 'Knowledge Management', 'Risk Management', 'Quality Management', 'Sustainability Management',
      'Corporate Social Responsibility', 'Cross-Cultural Management', 'Talent Management', 'Business Communication',
      'Business Research Methods', 'Management Information Systems', 'Public Administration', 'Business Law',
    ],
  },
  {
    title: 'Marketing & Sales',
    icon: LineChart,
    subjects: [
      'Marketing', 'Digital Marketing', 'Strategic Marketing', 'Consumer Behaviour', 'Brand Management',
      'Marketing Research', 'Social Media Marketing', 'E-Commerce', 'Retail Management', 'Sales Management',
      'Advertising', 'Public Relations',
    ],
  },
  {
    title: 'Accounting, Finance & Economics',
    icon: Calculator,
    subjects: [
      'Accounting', 'Financial Accounting', 'Management Accounting', 'Auditing', 'Taxation',
      'Corporate Finance', 'Financial Management', 'Investment Analysis', 'Banking', 'Islamic Banking & Finance',
      'FinTech', 'Behavioural Finance', 'Insurance', 'Economics', 'Microeconomics',
      'Macroeconomics', 'International Economics', 'Development Economics', 'Econometrics', 'Statistics',
    ],
  },
  {
    title: 'Industry Management',
    icon: Building2,
    subjects: [
      'Hospitality Management', 'Tourism Management', 'Event Management', 'Sports Management', 'Healthcare Management',
      'Aviation Management', 'Oil & Gas Management', 'Construction Management', 'Engineering Management', 'Real Estate Management',
    ],
  },
  {
    title: 'Computing & Data',
    icon: Cpu,
    subjects: [
      'Computer Science', 'Information Technology', 'Data Science', 'Artificial Intelligence', 'Machine Learning',
      'Cyber Security', 'Software Engineering', 'Database Management', 'Cloud Computing', 'Networking',
    ],
  },
  {
    title: 'Health & Life Sciences',
    icon: HeartPulse,
    subjects: [
      'Nursing', 'Public Health', 'Health & Social Care', 'Pharmacy', 'Medicine',
      'Psychology', 'Nutrition', 'Biology', 'Biomedical Science',
    ],
  },
  {
    title: 'Law & Social Sciences',
    icon: Scale,
    subjects: [
      'Law', 'Criminology', 'Sociology', 'Political Science', 'International Relations',
      'Social Work', 'Media Studies', 'History', 'Islamic Studies',
    ],
  },
  {
    title: 'Education, Engineering & More',
    icon: GraduationCap,
    subjects: [
      'Education', 'TESOL', 'English Literature', 'Linguistics', 'Architecture',
      'Civil Engineering', 'Mechanical Engineering', 'Electrical Engineering', 'Petroleum Engineering', 'Environmental Science',
      'Mathematics', 'Chemistry',
    ],
  },
];

const ALL = GROUPS.flatMap((g) => g.subjects.map((name) => ({ name, icon: g.icon })));
const TOTAL = ALL.length;

// Split all subjects into 4 rows for the moving strips
const ROWS = [0, 1, 2, 3].map((r) => ALL.filter((_, i) => i % 4 === r));

function Row({ items, reverse }: { items: typeof ALL; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <div
        className="animate-marquee gap-3 w-max py-1"
        style={{ animationDuration: '90s', animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {doubled.map(({ name, icon: Icon }, i) => (
          <div
            key={`${name}-${i}`}
            className="flex items-center gap-2.5 pl-2 pr-4 py-2 rounded-xl border border-gray-200 bg-white shadow-sm shrink-0 hover:border-primary/40 transition-colors"
          >
            <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10">
              <Icon className="w-5 h-5 text-primary" />
            </span>
            <span className="text-sm font-bold text-navy whitespace-nowrap">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SubjectsSection() {
  return (
    <section id="subjects" className="py-14 md:py-20 bg-white">
      <div className="max-w-site mx-auto px-4">
        <SectionHeader
          title={`Assignment Help for ${TOTAL}+ Subjects`}
          subtitle="Business-focused academic help for students at UK and Saudi Arabian universities, from Bachelor's to MBA and PhD. Every request is matched with a subject specialist."
        />

        <div className="hidden sm:flex flex-wrap justify-center gap-2 mb-8">
          {GROUPS.map(({ title, icon: Icon, subjects }) => (
            <span
              key={title}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-xs font-bold text-navy"
            >
              <Icon className="w-3.5 h-3.5 text-primary" />
              {title}
              <span className="text-primary">{subjects.length}</span>
            </span>
          ))}
        </div>

        <div className="space-y-3">
          {ROWS.map((items, i) => (
            <Row key={i} items={items} reverse={i % 2 === 1} />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mt-10">
          <a
            href="#quote"
            className="px-8 py-3.5 bg-primary text-white font-bold rounded-xl text-center shadow-lg shadow-primary/30 hover:brightness-110 transition-all"
          >
            Get Instant Price
          </a>
          <WhatsAppLink
            href={WHATSAPP_URL}
            aria-label="Ask about your subject on WhatsApp"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-navy text-white font-bold rounded-xl hover:brightness-110 transition-all"
          >
            <WhatsAppIcon size={24} className="w-6 h-6" />
            Subject not listed? Ask us
          </WhatsAppLink>
        </div>
      </div>
    </section>
  );
}
