'use client';

import Link from 'next/link';
import PageHero from '@/components/ui/PageHero';
import AnimateIn from '@/components/ui/AnimateIn';
import { CONTACT_EMAIL, MAILTO_URL } from '@/constants/contact';

const sections = [
  ['1. Service Scope', 'FIZ Business Solutions provides tutoring, academic coaching, research guidance, developmental feedback, proofreading, data-analysis tutoring, presentation coaching, and legitimate professional writing. The agreed scope will be described before work begins.'],
  ['2. Academic Integrity', 'All services are subject to our Academic Integrity Policy. We do not provide ghostwritten assessed work, examination assistance, impersonation, fabricated evidence, plagiarism concealment, or guaranteed academic outcomes.'],
  ['3. Customer Responsibilities', 'Customers must provide accurate information, follow institutional rules, upload only materials they are permitted to share, disclose external support where required, and remain responsible for all final decisions, claims, references, calculations, analysis, and submissions.'],
  ['4. Draft Feedback and Proofreading', 'Feedback identifies strengths, weaknesses, questions, and revision priorities. Proofreading normally addresses language and consistency. Where requested changes would replace authorship or introduce undisclosed substantive content, we may limit or refuse the work.'],
  ['5. Research and Data', 'Customers are responsible for lawful and ethical data collection, consent, confidentiality, secure handling, and the accuracy of datasets. Teaching examples or simulated data must never be represented as genuine research findings.'],
  ['6. Fees, Timing, and Changes', 'Fees, deliverables, and timing should be agreed before work begins. Material changes to scope may require a revised fee or schedule. Dates are estimates unless expressly confirmed. Delays caused by incomplete information, late responses, or third-party services may affect timing.'],
  ['7. Cancellations and Refunds', 'Cancellation and refund decisions depend on the agreed scope, work already completed, costs incurred, and the reason for cancellation. Prohibited or misleading requests may be refused or cancelled. Any specific refund commitment must be confirmed in writing for the relevant service.'],
  ['8. No Grade or Outcome Guarantee', 'Academic results, publication, admissions, professional decisions, and institutional approvals depend on factors outside our control. We do not guarantee marks, passes, classifications, publication, admission, or approval.'],
  ['9. Intellectual Property and Use', 'Customers retain rights in materials they provide, subject to third-party rights. Educational examples, feedback, templates, and training materials supplied by us may be used for personal learning unless a different licence is agreed. They must not be misrepresented as original assessed work.'],
  ['10. Confidentiality and Privacy', 'Personal information and uploaded materials are handled according to our Privacy Policy. Customers should not send unnecessary sensitive data, passwords, live assessment credentials, or unlawfully obtained materials.'],
  ['11. Limitation and Professional Advice', 'Our services are educational and informational. They are not a substitute for legal, medical, financial, immigration, or other regulated professional advice. Customers should obtain qualified advice where required.'],
  ['12. Changes and Contact', 'We may update these terms as our services or obligations change. Questions can be sent through the contact page or by email.'],
] as const;

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        title="Terms of Service & Acceptable Use"
        subtitle="The conditions that apply to coaching, tutoring, feedback, proofreading, research guidance, and professional support."
        breadcrumb="Terms"
        badge="Clear Service Boundaries"
        backgroundImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80"
        highlights={['No Grade Guarantees', 'Student Responsibility', 'Integrity Review']}
        ctaLabel="Contact Us"
        ctaHref="/contact"
      />

      <section className="py-16 md:py-20 max-w-site mx-auto px-4">
        <AnimateIn>
          <div className="max-w-3xl mx-auto">
            <p className="text-sm text-gray-500 mb-8"><strong className="text-navy">Effective date:</strong> 24 July 2026</p>
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7 md:p-12 space-y-9">
              <p className="text-gray-600 leading-relaxed">By requesting or using a service, you agree to these terms, the <Link href="/academic-integrity" className="text-primary font-semibold hover:underline">Academic Integrity Policy</Link>, and the <Link href="/privacy-policy" className="text-primary font-semibold hover:underline">Privacy Policy</Link>.</p>
              {sections.map(([title, content]) => (
                <article key={title}>
                  <h2 className="text-xl md:text-2xl font-black text-navy mb-3">{title}</h2>
                  <p className="text-gray-600 leading-relaxed">{content}</p>
                </article>
              ))}
              <p className="text-gray-600 leading-relaxed">Contact: <a href={MAILTO_URL} className="text-primary font-semibold hover:underline">{CONTACT_EMAIL}</a>.</p>
            </div>
          </div>
        </AnimateIn>
      </section>
    </div>
  );
}
