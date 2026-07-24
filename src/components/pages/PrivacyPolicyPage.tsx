'use client';

import Link from 'next/link';
import PageHero from '@/components/ui/PageHero';
import AnimateIn from '@/components/ui/AnimateIn';
import { CONTACT_EMAIL, MAILTO_URL } from '@/constants/contact';

const sections = [
  {
    title: '1. Introduction',
    content: (
      <>
        FIZ Business Solutions (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) provides academic coaching, research guidance, proofreading, developmental feedback, and professional communication support. This Privacy Policy explains how we collect, use, store, and protect personal information when you visit our website, submit a support request, upload permitted materials, or contact us.
      </>
    ),
  },
  {
    title: '2. Information We Collect',
    content: (
      <>
        We may collect:
        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li><strong>Contact details:</strong> name, email address, phone number, and country.</li>
          <li><strong>Support-request information:</strong> subject area, education level, support type, learning goals, current progress, preferred dates, and referencing style.</li>
          <li><strong>Uploaded materials:</strong> drafts, assessment guidance, feedback, or other files you are permitted to share.</li>
          <li><strong>Communication data:</strong> messages sent through forms, email, or WhatsApp.</li>
          <li><strong>Technical data:</strong> IP address, browser, device, pages visited, and cookie preferences where available.</li>
        </ul>
      </>
    ),
  },
  {
    title: '3. How We Use Information',
    content: (
      <>
        We use personal information to:
        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li>Review requests and determine whether the proposed support is compatible with our Academic Integrity Policy.</li>
          <li>Respond to inquiries, recommend an appropriate service, and arrange coaching, feedback, or tutoring.</li>
          <li>Send confirmations and service-related communications.</li>
          <li>Protect the website, prevent misuse, and comply with applicable legal or accounting obligations.</li>
          <li>Improve our website, service processes, and customer experience.</li>
        </ul>
      </>
    ),
  },
  {
    title: '4. Academic Materials and Confidentiality',
    content: (
      <>
        Uploaded drafts and learning materials are used only to assess and provide the requested support. Access should be limited to authorised staff, tutors, reviewers, and service providers who need the information for that purpose. Do not upload passwords, student-portal credentials, live examination materials, unlawfully obtained content, or identifiable research-participant data unless you are legally permitted to share it and appropriate safeguards are in place.
      </>
    ),
  },
  {
    title: '5. Sharing Information',
    content: (
      <>
        We do not sell personal information. We may share limited data with service providers that support website hosting, email delivery, communications, or file handling. We may also disclose information where required by law, to protect legal rights, or to investigate fraud, abuse, or serious misuse of the service.
      </>
    ),
  },
  {
    title: '6. Cookies and Similar Technologies',
    content: (
      <>
        The website may use essential cookies and, with consent where required, optional cookies that support preferences, performance, or analytics. You may use the cookie banner and browser settings to manage non-essential cookies. Disabling some cookies may affect website functionality.
      </>
    ),
  },
  {
    title: '7. Data Security',
    content: (
      <>
        We use reasonable technical and organisational measures intended to protect information against unauthorised access, alteration, disclosure, or loss. No internet transmission or storage system can be guaranteed completely secure, so customers should avoid sending unnecessary sensitive information.
      </>
    ),
  },
  {
    title: '8. Data Retention',
    content: (
      <>
        Information is retained only for as long as reasonably necessary for the purposes described in this policy, including service delivery, communications, dispute handling, security, and legal or accounting obligations. Retention periods may vary according to the type of record and applicable requirements.
      </>
    ),
  },
  {
    title: '9. Your Rights',
    content: (
      <>
        Depending on your location, you may have rights to request access, correction, deletion, restriction, objection, or portability of personal data. Some rights may be limited by legal obligations or legitimate reasons for retaining records. Contact us to make a request.
      </>
    ),
  },
  {
    title: '10. Third-Party Services',
    content: (
      <>
        Our website may link to or use third-party services such as WhatsApp, email providers, hosting services, or file-hosting tools. Their handling of information is governed by their own policies. Review those policies before providing information through a third-party service.
      </>
    ),
  },
  {
    title: '11. Policy Updates',
    content: (
      <>
        We may revise this policy when our services, technology, or legal obligations change. The updated version will be posted on this page with a revised effective date.
      </>
    ),
  },
  {
    title: '12. Contact Us',
    content: (
      <>
        Questions or privacy requests can be sent to{' '}
        <a href={MAILTO_URL} className="text-primary font-semibold hover:underline">{CONTACT_EMAIL}</a>{' '}
        or through our <Link href="/contact" className="text-primary font-semibold hover:underline">contact page</Link>.
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col overflow-x-hidden">
      <PageHero
        title="Privacy Policy"
        subtitle="How FIZ Business Solutions handles personal information and permitted learning materials."
        breadcrumb="Privacy Policy"
        badge="Responsible Data Handling"
        backgroundImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80"
        highlights={['No Data Selling', 'Limited Access', 'Privacy Requests']}
        ctaLabel="Contact Us"
        ctaHref="/contact"
        waveColor="#f9fafb"
      />

      <section className="py-12 md:py-20 max-w-site mx-auto px-4 w-full">
        <AnimateIn>
          <div className="max-w-3xl mx-auto">
            <p className="text-sm text-gray-500 mb-10"><strong className="text-navy">Effective date:</strong> 24 July 2026</p>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-10 space-y-10">
              {sections.map((section) => (
                <article key={section.title}>
                  <h2 className="text-xl md:text-2xl font-black text-navy mb-4">{section.title}</h2>
                  <div className="text-gray-600 leading-relaxed text-base">{section.content}</div>
                </article>
              ))}
            </div>
          </div>
        </AnimateIn>
      </section>
    </div>
  );
}
