'use client';

import Link from 'next/link';
import { CheckCircle2, XCircle, ShieldCheck, UserRoundCheck, Bot, DatabaseZap } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import AnimateIn from '@/components/ui/AnimateIn';

const permitted = [
  'Explaining academic concepts, theories, methods, and assessment terminology.',
  'Helping a learner interpret a brief, marking criteria, learning outcomes, or tutor feedback.',
  'Supporting brainstorming, question refinement, planning, and study scheduling.',
  'Providing developmental feedback on work substantially written by the learner.',
  'Proofreading grammar, punctuation, spelling, clarity, and consistency within institutional rules.',
  'Teaching literature-search, referencing, research-methods, data-analysis, and presentation skills.',
  'Using clearly labelled examples or practice exercises created for learning rather than submission.',
  'Preparing legitimate non-assessed professional documents such as business reports, website copy, and training materials.',
];

const prohibited = [
  'Writing or rewriting assessed assignments, dissertations, theses, reports, portfolios, or reflective work for submission as the learner’s own.',
  'Taking examinations, quizzes, tests, interviews, vivas, or other assessments for another person.',
  'Logging into a learner’s institutional account, impersonating a learner, or communicating with an institution on their behalf dishonestly.',
  'Fabricating or manipulating participants, interviews, surveys, references, data, results, ethical approval, attendance, or evidence.',
  'Rewriting plagiarised or unauthorised AI-generated work to evade detection or conceal its true authorship.',
  'Guaranteeing a grade, pass, publication, admission, visa outcome, or institutional approval.',
  'Providing support that the learner’s institution expressly prohibits.',
];

export default function AcademicIntegrityPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        title="Academic Integrity Policy"
        subtitle="Clear boundaries for ethical coaching, tutoring, feedback, proofreading, research guidance, and responsible AI use."
        breadcrumb="Academic Integrity"
        badge="Integrity Before Revenue"
        backgroundImage="https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?w=1600&q=80"
        highlights={['Student Authorship', 'No Ghostwriting', 'No Fabricated Research']}
        ctaLabel="Request Permitted Support"
        ctaHref="/#support-form"
      />

      <section className="py-16 md:py-20 max-w-site mx-auto px-4">
        <AnimateIn>
          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-sm p-7 md:p-12">
            <div className="flex items-start gap-4 mb-10">
              <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0"><ShieldCheck className="w-7 h-7" /></div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-navy mb-3">Purpose</h2>
                <p className="text-gray-600 leading-relaxed">FIZ Business Solutions exists to improve understanding and capability. The learner must remain the genuine author of assessed work and must follow the academic-integrity, collaboration, proofreading, and artificial-intelligence rules of the relevant institution.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <article className="rounded-2xl bg-green-50 border border-green-100 p-6 md:p-8">
                <h3 className="text-xl font-black text-navy mb-5 flex items-center gap-2"><CheckCircle2 className="w-6 h-6 text-green-600" /> Permitted Support</h3>
                <ul className="space-y-4">
                  {permitted.map((item) => <li key={item} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed"><CheckCircle2 className="w-4 h-4 text-green-600 mt-1 shrink-0" />{item}</li>)}
                </ul>
              </article>

              <article className="rounded-2xl bg-red-50 border border-red-100 p-6 md:p-8">
                <h3 className="text-xl font-black text-navy mb-5 flex items-center gap-2"><XCircle className="w-6 h-6 text-red-600" /> Prohibited Requests</h3>
                <ul className="space-y-4">
                  {prohibited.map((item) => <li key={item} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed"><XCircle className="w-4 h-4 text-red-600 mt-1 shrink-0" />{item}</li>)}
                </ul>
              </article>
            </div>

            <div className="space-y-10">
              <article>
                <h3 className="text-2xl font-black text-navy mb-4 flex items-center gap-3"><UserRoundCheck className="w-6 h-6 text-primary" /> Learner Responsibilities</h3>
                <p className="text-gray-600 leading-relaxed">Customers must provide accurate information, submit only materials they are permitted to share, participate honestly in the learning process, verify all facts and references, disclose external support where required, and ensure the final submission reflects their own understanding and work.</p>
              </article>

              <article>
                <h3 className="text-2xl font-black text-navy mb-4 flex items-center gap-3"><Bot className="w-6 h-6 text-primary" /> Artificial Intelligence</h3>
                <p className="text-gray-600 leading-relaxed">AI rules differ between institutions and assessments. We will not help conceal prohibited AI use, falsify an AI declaration, or misrepresent AI-generated material as wholly student-authored. Where AI is permitted, it should be used transparently, critically, and in accordance with the relevant policy.</p>
              </article>

              <article>
                <h3 className="text-2xl font-black text-navy mb-4 flex items-center gap-3"><DatabaseZap className="w-6 h-6 text-primary" /> Research Data and Evidence</h3>
                <p className="text-gray-600 leading-relaxed">Sample or simulated data used for teaching must be clearly labelled and must not be presented as genuine findings. We do not invent participants, ethics approvals, fieldwork, interviews, references, or results. Customers are responsible for lawful data collection, consent, confidentiality, and secure handling.</p>
              </article>

              <article>
                <h3 className="text-2xl font-black text-navy mb-4">Review, Refusal, and Cancellation</h3>
                <p className="text-gray-600 leading-relaxed">We may ask questions, narrow the scope, require evidence of the learner’s own progress, or refuse and cancel a request where the proposed support may facilitate misconduct, deception, or violation of institutional rules. Payment does not create an entitlement to prohibited support.</p>
              </article>
            </div>

            <div className="mt-12 p-6 rounded-2xl bg-navy text-white">
              <h3 className="text-xl font-black mb-3">Unsure whether your request is permitted?</h3>
              <p className="text-white/70 leading-relaxed mb-5">Describe what you have already completed and the exact skill or question you need help with. We will recommend a safer learning-focused scope or decline the request.</p>
              <Link href="/contact" className="inline-flex px-6 py-3 bg-primary text-white font-bold rounded-lg hover:brightness-110 transition-all">Contact Us</Link>
            </div>
          </div>
        </AnimateIn>
      </section>
    </div>
  );
}
