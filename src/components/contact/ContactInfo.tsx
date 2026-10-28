import Link from 'next/link';
import { ChevronRight, Mail, PhoneCall } from 'lucide-react';
import FaqSection from '@/components/FaqSection';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { EXPERT_CALL } from '@/constants/expertCall';
import { PAYMENT } from '@/constants/payment';
import { UK_ADDRESS_LINE, UK_PHONE_DISPLAY, UK_TEL_URL } from '@/constants/contact';

const STEPS = [
  {
    title: 'Send your details',
    text: 'Share your subject, level, word count and deadline, plus your brief or marking criteria if you have them, on WhatsApp, through the form or by email.',
  },
  {
    title: 'Get a clear price',
    text: 'We reply on WhatsApp with a quote, including 10% off your first order. A quote is free and there is no obligation to go ahead.',
  },
  {
    title: 'Confirm and pay 50%',
    text: 'We confirm exactly what support you will receive. You then pay 50% to start, by UK bank transfer in GBP or Saudi bank transfer in SAR.',
  },
  {
    title: 'Work with your expert',
    text: "A Master's or PhD-qualified expert in your subject works on your request, and our team answers questions on WhatsApp 24/7. The remaining 50% is paid on completion.",
  },
];

const OPTIONS = [
  {
    icon: 'wa' as const,
    title: 'WhatsApp',
    text: 'Best for a quick price, short questions and updates. Available 24/7.',
  },
  {
    icon: Mail,
    title: 'Email',
    text: 'Best for detailed requirements, long briefs and several files at once.',
  },
  {
    icon: PhoneCall,
    title: 'WhatsApp call with an expert',
    text: 'Talk through your brief and marking criteria before you order. Calls are in English, at a time that suits you in UK or Saudi time.',
  },
];

const FAQS = [
  {
    q: 'Is a quote free?',
    a: 'Yes. Send your subject, word count and deadline and we will reply with a clear price. There is no charge for a quote and no obligation to go ahead.',
  },
  {
    q: 'What should I send for an accurate price?',
    a: 'Your subject and level, the word count, your deadline, and the assignment brief or marking criteria if you have them. A draft or tutor feedback also helps if you want feedback on existing work.',
  },
  {
    q: 'Where is FIZBS based?',
    a: 'FIZ Business Solutions supports students online through WhatsApp, email and our website. Our UK contact address is 77 St Leonards Rd, Windsor, Berkshire SL4 3BZ, and you can reach our UK line on 01753 620899. We work with university students across the UK, Saudi Arabia and the wider Gulf.',
  },
  {
    q: 'When can I contact you?',
    a: 'WhatsApp is open 24/7, so you can send your brief in the evening, at the weekend or between lectures, in UK or Saudi time.',
  },
  {
    q: 'Is my information kept confidential?',
    a: 'Yes. Your personal details, university information and files are never shared with anyone.',
  },
  EXPERT_CALL.en.faq,
  PAYMENT.en.faq,
];

export default function ContactInfo() {
  return (
    <>
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[1000px] mx-auto px-4 text-gray-700 text-[17px] leading-relaxed">
          <h2 className="text-2xl md:text-3xl font-extrabold text-navy tracking-tight mb-6">What happens after you contact us</h2>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-6">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-black">{i + 1}</span>
                <span>
                  <span className="block text-lg font-extrabold text-navy mb-1">{s.title}</span>
                  <span className="block text-[15px] text-gray-600">{s.text}</span>
                </span>
              </li>
            ))}
          </ol>

          <h2 className="mt-14 text-2xl md:text-3xl font-extrabold text-navy tracking-tight mb-6">Which contact option suits you</h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {OPTIONS.map((o) => (
              <li key={o.title} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                {o.icon === 'wa' ? (
                  <WhatsAppIcon size={36} className="w-9 h-9 mb-3" />
                ) : (
                  <o.icon className="w-9 h-9 mb-3 text-primary" />
                )}
                <span className="block text-lg font-extrabold text-navy mb-1">{o.title}</span>
                <span className="block text-[15px] text-gray-600">{o.text}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-2xl border border-gray-100 bg-gray-50 p-6">
            <h2 className="text-lg font-extrabold text-navy mb-2">UK contact details</h2>
            <p className="text-[15px] text-gray-600">
              FIZ Business Solutions<br />
              {UK_ADDRESS_LINE}<br />
              Phone: <a href={UK_TEL_URL} className="font-bold text-navy hover:text-primary">{UK_PHONE_DISPLAY}</a>
            </p>
          </div>

          <h2 className="mt-14 text-2xl md:text-3xl font-extrabold text-navy tracking-tight mb-4">Students we support</h2>
          <p className="mb-4">
            Since 2015, FIZ Business Solutions (FIZBS) has supported more than 10,000 university students. Most are studying at UK universities or in Saudi Arabia and the Gulf, from undergraduate essays to Master&apos;s dissertations, MBA projects and PhD proposals, across 115+ subjects.
          </p>
          <ul className="flex flex-wrap gap-2.5">
            {[
              { label: 'Assignment Help UK', href: '/assignment-help-uk' },
              { label: 'Dissertation Help UK', href: '/dissertation-help-uk' },
              { label: 'Assignment Help Saudi Arabia', href: '/assignment-help-saudi-arabia' },
              { label: 'All Services', href: '/services' },
              { label: 'About FIZBS', href: '/about' },
              { label: 'Meet Our Team', href: '/our-team' },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-navy hover:border-primary hover:text-primary transition-colors">
                  {l.label} <ChevronRight className="w-3.5 h-3.5 text-primary" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FaqSection faqs={FAQS} title="Contact and Ordering Questions" className="bg-gray-50" />
    </>
  );
}
