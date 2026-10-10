import Link from 'next/link';
import { ArrowRight, Award, CheckCircle2, EyeOff, FileCheck2, Info, ShieldCheck } from 'lucide-react';
import SupportRequestForm from '@/components/SupportRequestForm';
import { SITE_URL } from '@/content/landing';
import { RESULTS_HIGHEST, STUDENT_RESULTS } from '@/content/results';
import ResultsGallery from './ResultsGallery';

export default function ResultsPage() {
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Real Student Results | FIZBS',
      url: `${SITE_URL}/results`,
      inLanguage: 'en-GB',
      description: 'Real grade screenshots shared by FIZBS students, with personal details removed.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Student Results', item: `${SITE_URL}/results` },
      ],
    },
  ];

  return (
    <div lang="en" className="bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="relative overflow-hidden bg-navy">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-light" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C9A227_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative z-10 max-w-[1100px] mx-auto px-4 py-14 md:py-20 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-[11px] font-black uppercase tracking-wider mb-5">
            <Award className="w-3.5 h-3.5" /> Real Student Results
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-4">
            Grades Our Students Received
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Real screenshots shared by students we have helped, from reports and case studies to dissertations, MBA and MSc modules.
          </p>
          <ul className="mt-8 grid grid-cols-3 gap-3 max-w-xl mx-auto text-center">
            <li className="rounded-2xl bg-white/10 px-2 py-4">
              <p className="text-2xl md:text-3xl font-black text-white">{RESULTS_HIGHEST}</p>
              <p className="text-xs font-bold text-white/70">Highest mark</p>
            </li>
            <li className="rounded-2xl bg-white/10 px-2 py-4">
              <p className="text-2xl md:text-3xl font-black text-white">{STUDENT_RESULTS.length}</p>
              <p className="text-xs font-bold text-white/70">Results shared</p>
            </li>
            <li className="rounded-2xl bg-white/10 px-2 py-4">
              <p className="text-2xl md:text-3xl font-black text-white">0</p>
              <p className="text-xs font-bold text-white/70">Names shown</p>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="mb-8 flex gap-3 rounded-2xl border border-[#E9DCAE] bg-[#FBF6E6] p-5">
            <Info className="w-6 h-6 text-primary shrink-0" />
            <p className="text-[15px] text-navy leading-relaxed">
              Grades are shown exactly as released by each university. Every result depends on the student&apos;s own work, the brief and the marker, so we cannot promise a specific grade. Tap any screenshot to see it full size.
            </p>
          </div>
          <ResultsGallery />
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[1000px] mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-navy mb-6">How we protect our students&apos; privacy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: EyeOff, title: 'Personal details removed', text: 'Names, student IDs, university names, logos, web addresses and module codes are covered or cropped out.' },
              { icon: ShieldCheck, title: 'Only the grade is shown', text: 'We crop out class statistics, submission IDs and similarity reports to keep every result anonymous.' },
              { icon: FileCheck2, title: 'Watermarked', text: 'Every screenshot carries a FIZBS watermark, so it is always clear where it comes from.' },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                <Icon className="w-7 h-7 text-primary mb-3" />
                <h3 className="text-lg font-extrabold text-navy mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
          <ul className="mt-8 space-y-3 text-gray-700 text-[16px]">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>
                Want to see how our experts work? Browse our{' '}
                <Link href="/samples" className="font-bold text-primary hover:underline">work samples</Link> or read our{' '}
                <Link href="/blog" className="font-bold text-primary hover:underline">free student guides</Link>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>
                Meet the people behind these results on our{' '}
                <Link href="/our-team" className="font-bold text-primary hover:underline">Our Team</Link> page.
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-navy">
        <div className="max-w-[1100px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">Get expert help with your next assignment</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Tell us what you need and we will reply on WhatsApp with a clear price. Assignments from £20 per 1,000 words, 10% off your first order, 50% to start and 50% on completion.
            </p>
            <a href="/#quote" className="inline-flex items-center gap-2 font-black text-[#C9A227] hover:underline">
              See your instant price <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div id="support-form" className="scroll-mt-[120px]">
            <SupportRequestForm locale="en" />
          </div>
        </div>
      </section>
    </div>
  );
}
