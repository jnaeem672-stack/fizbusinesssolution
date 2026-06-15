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
        FizBussinessSolution (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your privacy.
        This Privacy Policy explains how we collect, use, store, and safeguard your personal information when you
        visit our website, place an order, or contact us for academic writing services.
      </>
    ),
  },
  {
    title: '2. Information We Collect',
    content: (
      <>
        We may collect the following types of information:
        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li><strong>Personal details:</strong> name, email address, phone number, and country of study.</li>
          <li><strong>Order information:</strong> assignment topic, subject, deadline, requirements, and uploaded files.</li>
          <li><strong>Communication data:</strong> messages sent via our contact form, email, or WhatsApp.</li>
          <li><strong>Technical data:</strong> IP address, browser type, device information, and cookies (see Section 6).</li>
        </ul>
      </>
    ),
  },
  {
    title: '3. How We Use Your Information',
    content: (
      <>
        We use your information to:
        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li>Process and fulfil your assignment orders.</li>
          <li>Communicate with you about quotes, delivery, and support.</li>
          <li>Send order confirmations and service-related emails.</li>
          <li>Improve our website, services, and customer experience.</li>
          <li>Comply with legal obligations and prevent fraud or misuse.</li>
        </ul>
      </>
    ),
  },
  {
    title: '4. Data Confidentiality & Security',
    content: (
      <>
        Your order details and personal information are treated as strictly confidential. We do not sell your
        data to third parties. We implement reasonable technical and organisational measures to protect your
        information against unauthorised access, loss, or disclosure. Assignment files and communications are
        shared only with assigned writers and staff who need them to complete your order.
      </>
    ),
  },
  {
    title: '5. Sharing Your Information',
    content: (
      <>
        We may share limited information with trusted service providers who assist us in operating our website
        and delivering services (for example, email delivery or file hosting). These providers are required to
        keep your data secure and use it only for the purposes we specify. We may also disclose information if
        required by law or to protect our rights and the safety of our users.
      </>
    ),
  },
  {
    title: '6. Cookies',
    content: (
      <>
        Our website uses cookies to remember your preferences and improve your browsing experience. You can
        accept or decline non-essential cookies via the cookie banner. Essential cookies required for the site
        to function may still be used. You can also manage cookies through your browser settings.
      </>
    ),
  },
  {
    title: '7. Data Retention',
    content: (
      <>
        We retain your personal and order information for as long as necessary to fulfil your orders, provide
        support, and meet legal or accounting requirements. You may request deletion of your data subject to
        any obligations we have to retain certain records.
      </>
    ),
  },
  {
    title: '8. Your Rights',
    content: (
      <>
        Depending on your location, you may have the right to access, correct, delete, or restrict the processing
        of your personal data, and to object to certain uses or request data portability. To exercise these
        rights, contact us using the details below.
      </>
    ),
  },
  {
    title: '9. Third-Party Links',
    content: (
      <>
        Our website may contain links to third-party sites (such as WhatsApp or external resources). We are not
        responsible for the privacy practices of those sites. We encourage you to review their privacy policies
        before providing any personal information.
      </>
    ),
  },
  {
    title: '10. Changes to This Policy',
    content: (
      <>
        We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated
        effective date. Continued use of our website after changes constitutes acceptance of the revised policy.
      </>
    ),
  },
  {
    title: '11. Contact Us',
    content: (
      <>
        If you have questions about this Privacy Policy or how we handle your data, please contact us at{' '}
        <a href={MAILTO_URL} className="text-primary font-semibold hover:underline">
          {CONTACT_EMAIL}
        </a>{' '}
        or via our <Link href="/contact" className="text-primary font-semibold hover:underline">contact page</Link>.
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col overflow-x-hidden">
      <PageHero
        title="Privacy Policy"
        subtitle="How FizBussinessSolution collects, uses, and protects your personal information."
        breadcrumb="Privacy Policy"
        badge="Your Data, Protected"
        backgroundImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80"
        highlights={['Confidential Orders', 'Secure Data Handling', 'No Data Selling']}
        ctaLabel="Contact Us"
        ctaHref="/contact"
        waveColor="#f9fafb"
      />

      <section className="py-12 md:py-20 max-w-site mx-auto px-4 w-full">
        <AnimateIn>
          <div className="max-w-3xl mx-auto">
            <p className="text-sm text-gray-500 mb-10">
              <strong className="text-navy">Effective date:</strong> June 16, 2026
            </p>

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
