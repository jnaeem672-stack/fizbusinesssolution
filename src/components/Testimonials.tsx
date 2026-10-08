'use client';

import { UserRoundCheck, Clock, ShieldCheck, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import SectionHeader from './ui/SectionHeader';

const promises = [
  {
    title: 'Qualified Subject Experts',
    desc: "Every request is matched with a Master's or PhD-qualified specialist in your subject.",
    icon: UserRoundCheck,
  },
  {
    title: 'On-Time Delivery',
    desc: 'We plan around your deadline and keep you updated on WhatsApp at every stage.',
    icon: Clock,
  },
  {
    title: '24/7 WhatsApp Support',
    desc: 'Questions at any hour? Message us on WhatsApp and our team will reply quickly.',
    icon: MessageCircle,
  },
  {
    title: '100% Confidential',
    desc: 'Your name, university and files are kept private and never shared with anyone.',
    icon: ShieldCheck,
  },
];

const Testimonials = () => (
  <section className="py-20 md:py-28 bg-white">
    <div className="max-w-site mx-auto px-4">
      <SectionHeader
        title="Our Promise to You"
        subtitle="Reliable, affordable assignment help you can trust, from your first message to your deadline."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {promises.map(({ title, desc, icon: Icon }) => (
          <article key={title} className="p-7 md:p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:border-primary/30 transition-colors h-full">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-navy mb-3">{title}</h3>
            <p className="text-gray-600 leading-relaxed text-sm">{desc}</p>
          </article>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link href="#quote" className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:brightness-110 transition-all">
          Get Your Instant Price
        </Link>
      </div>
    </div>
  </section>
);

export default Testimonials;
