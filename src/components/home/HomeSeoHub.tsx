import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import {
  AR_SERVICE_LINKS,
  QUALIFICATION_LINKS,
  SAUDI_CITY_LINKS,
  SUBJECT_LINKS,
  UAE_LINKS,
  UK_CITY_LINKS,
} from '@/content/landing';
import { TOOLS, toolPath } from '@/content/tools';

/**
 * Server-rendered homepage content: a plain-language overview of the service and a link hub to every
 * service, subject, qualification, city, Arabic page and free tool. No client JavaScript.
 */

const SERVICE_LINKS_ALL: { label: string; href: string }[] = [
  ['assignment-help-uk', 'Assignment Help UK'],
  ['dissertation-help-uk', 'Dissertation Help UK'],
  ['essay-help', 'Essay Help'],
  ['coursework-report-help', 'Coursework and Report Help'],
  ['case-study-help', 'Case Study Help'],
  ['presentation-help', 'Presentation Help'],
  ['research-proposal-help', 'Research Proposal Help'],
  ['literature-review-help', 'Literature Review Help'],
  ['research-methodology-help', 'Research Methodology Help'],
  ['thesis-help', 'Thesis Help'],
  ['data-analysis-help', 'Data Analysis Help'],
  ['spss-help', 'SPSS Help'],
  ['nvivo-thematic-analysis-help', 'NVivo and Thematic Analysis Help'],
  ['excel-data-analysis-help', 'Excel Data Analysis Help'],
  ['python-stata-help', 'Python and Stata Help'],
  ['proofreading-editing-services', 'Proofreading and Editing'],
  ['referencing-help', 'Referencing Help'],
  ['draft-review-feedback', 'Draft Review and Feedback'],
  ['phd-admission-scholarship-help', 'PhD Admission and Scholarship Help'],
].map(([slug, label]) => ({ label, href: `/${slug}` }));

const GROUPS: { title: string; links: { label: string; href: string }[]; rtl?: boolean }[] = [
  { title: 'Services', links: SERVICE_LINKS_ALL },
  { title: 'Subjects', links: SUBJECT_LINKS.map((l) => ({ label: `${l.label} Assignment Help`, href: l.href })) },
  { title: 'Professional qualifications', links: QUALIFICATION_LINKS },
  { title: 'UK cities', links: UK_CITY_LINKS },
  {
    title: 'Saudi Arabia',
    links: [{ label: 'Assignment Help Saudi Arabia', href: '/assignment-help-saudi-arabia' }, ...SAUDI_CITY_LINKS],
  },
  { title: 'UAE and USA', links: [...UAE_LINKS, { label: 'Assignment Help USA', href: '/assignment-help-usa' }] },
  { title: 'Free student tools', links: TOOLS.map((t) => ({ label: t.name, href: toolPath(t) })) },
  { title: 'بالعربية', links: AR_SERVICE_LINKS, rtl: true },
];

const GUIDANCE = [
  'Explaining your brief, the theory and the marking criteria, one to one',
  'Planning the structure of your work and the sources to use',
  'Written feedback on your own draft, showing what to improve and why',
  'Guidance on research design and data analysis in SPSS, NVivo, Excel, Stata or Python',
  'Proofreading and referencing checks on work you have written yourself',
];

export default function HomeSeoHub() {
  return (
    <>
      <section id="about-our-support" className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-gray-700 text-[17px] leading-relaxed">
          <p className="text-[11px] font-black uppercase tracking-widest text-primary mb-2">About Our Support</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy tracking-tight mb-5">
            Assignment and Dissertation Help for Students in the UK, Saudi Arabia and the UAE
          </h2>
          <div className="space-y-4">
            <p>
              FIZ Business Solutions (FIZBS) has supported university students since 2015, more than 10,000 in total, across more than 115
              subjects and over 350 research projects. Our experts hold Master&apos;s and PhD degrees in the fields they advise on, and
              business, management, finance and research methods are our strongest areas.
            </p>
            <p>
              We work with Bachelor&apos;s, Master&apos;s, MBA and PhD students at UK universities, at Saudi universities in English or
              Arabic, at UK and international branch campuses in the UAE, at colleges and universities in the United States, and on distance
              learning programmes taken from anywhere in the world. Everything happens online, through WhatsApp and this website, at any hour.
            </p>
          </div>

          <h3 className="mt-10 text-2xl font-extrabold text-navy mb-3">What our guidance includes</h3>
          <p>You stay the author of your work. Our experts help you understand the task and improve your own writing:</p>
          <ul className="mt-4 space-y-2.5">
            {GUIDANCE.map((g) => (
              <li key={g} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" /> <span>{g}</span>
              </li>
            ))}
          </ul>

          <h3 className="mt-10 text-2xl font-extrabold text-navy mb-3">Help at every level of study</h3>
          <p>
            First-year students often need help with essay structure, paraphrasing and referencing. Master&apos;s and MBA students bring
            case studies, strategy reports and dissertations that must apply theory to real organisations. PhD researchers come to us for
            research proposals, methodology, data analysis and preparation for the viva or thesis defence. Your expert adapts to the level,
            the marking criteria and the referencing style of your course.
          </p>

          <h3 className="mt-10 text-2xl font-extrabold text-navy mb-3">Support that fits where you study</h3>
          <p>
            UK students get experts who know British grade bands, critical writing and Harvard or APA referencing. Students in Saudi Arabia
            can message us in Arabic or English, read our Arabic pages and pay in Saudi riyals by local bank transfer. Students in the UAE
            get guidance that follows the standards of their UK or international branch campus, with prices in GBP and the AED equivalent
            on request. Students in the United States get guidance on APA and MLA papers, capstone projects and theses, with the US
            dollar equivalent on request.
          </p>

          <h3 className="mt-10 text-2xl font-extrabold text-navy mb-3">Clear pricing</h3>
          <p>
            Guidance and feedback on assignments start from £20 per 1,000 words for deadlines of seven days or more, with 25% added for 3
            to 6 days and 50% for 48 hours. Dissertation guidance is £30 per 1,000 words with a maximum of £350, and proofreading starts
            from £12 per 1,000 words. New customers get 10% off, and you pay 50% to start and 50% on completion.
          </p>
        </div>
      </section>

      <section id="explore" className="py-16 md:py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-site mx-auto px-4">
          <div className="max-w-3xl mb-10">
            <p className="text-[11px] font-black uppercase tracking-widest text-primary mb-2">Explore</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy tracking-tight">
              Find Support by Service, Subject and Location
            </h2>
            <p className="mt-3 text-gray-600 text-[17px]">
              Every page below explains what our experts help with, how it works and what it costs, for that service, subject or place.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 sm:gap-x-8 gap-y-10">
            {GROUPS.map((g) => (
              <nav key={g.title} aria-label={g.title} dir={g.rtl ? 'rtl' : undefined} lang={g.rtl ? 'ar' : undefined}>
                <h3 className="text-sm font-black uppercase tracking-widest text-navy mb-3">{g.title}</h3>
                <ul className="space-y-2 text-[14px] sm:text-[15px] leading-snug">
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-gray-600 hover:text-primary transition-colors">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
