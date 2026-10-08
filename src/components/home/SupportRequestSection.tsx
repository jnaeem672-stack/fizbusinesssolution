'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, BookOpenCheck, Lock } from 'lucide-react';
import SupportRequestForm from '@/components/SupportRequestForm';
import SectionHeader from '@/components/ui/SectionHeader';

const principles = [
  { icon: BookOpenCheck, text: "Qualified Master's and PhD subject experts" },
  { icon: CheckCircle2, text: 'On-time delivery with updates on WhatsApp' },
  { icon: Lock, text: '100% confidential: your details are never shared' },
];

export default function SupportRequestSection() {
  return (
    <section
      id="support-form"
      className="relative bg-gray-50 pt-4 pb-20 md:pb-28 scroll-mt-[110px]"
    >
      <div className="max-w-site mx-auto px-4">
        <SectionHeader
          badge="Free Quote"
          title="Get Assignment & Dissertation Help"
          subtitle="Tell us your subject, word count and deadline. We will reply with a clear price and match you with the right expert."
          className="mb-10 md:mb-14"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-navy rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C41E3A_1px,transparent_1px)] [background-size:20px_20px]" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">What You Get</h3>
                <ul className="space-y-4">
                  {[
                    'Expert help with assignments, essays, reports and case studies',
                    'Dissertation, thesis and research proposal help',
                    'SPSS, Excel, NVivo and Python data analysis help',
                    'Proofreading, editing and Harvard, APA & OSCOLA referencing',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/80 text-sm leading-relaxed">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 pt-6 border-t border-white/10">
                  <h4 className="font-bold text-white mb-3">🎁 First Order Offer</h4>
                  <p className="text-white/65 text-sm leading-relaxed">
                    Get up to 10% off your first order. Assignment help from £20 per 1,000 words, and a maximum of £350 for any dissertation.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {principles.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-3 px-5 py-3.5 bg-white rounded-xl border border-gray-100 shadow-sm"
                >
                  <Icon className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm font-medium text-navy">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <SupportRequestForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
