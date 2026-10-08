'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, BookOpenCheck, Lock } from 'lucide-react';
import SupportRequestForm from '@/components/SupportRequestForm';
import SectionHeader from '@/components/ui/SectionHeader';

const principles = [
  { icon: BookOpenCheck, text: 'Expert help and feedback that preserve student authorship' },
  { icon: CheckCircle2, text: 'Every request is reviewed for academic-integrity risks' },
  { icon: Lock, text: 'Your information and learning materials are handled carefully' },
];

export default function SupportRequestSection() {
  return (
    <section
      id="support-form"
      className="relative bg-gray-50 pt-4 pb-20 md:pb-28 scroll-mt-[110px]"
    >
      <div className="max-w-site mx-auto px-4">
        <SectionHeader
          title="Request Ethical Learning Support"
          subtitle="Tell us what you want to understand, practise, or improve. We will recommend a suitable form of academic help, feedback, or tutoring."
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
                <h3 className="text-2xl font-bold mb-4">What We Can Do</h3>
                <ul className="space-y-4">
                  {[
                    'Explain academic concepts and assessment expectations',
                    'Review student-written drafts and provide developmental feedback',
                    'Teach research methods, referencing, and data-analysis skills',
                    'Proofread within the rules of your institution',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/80 text-sm leading-relaxed">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 pt-6 border-t border-white/10">
                  <h4 className="font-bold text-white mb-3">What We Will Not Do</h4>
                  <p className="text-white/65 text-sm leading-relaxed">
                    We do not write assignments or dissertations for submission, take tests, impersonate students, invent references or data, conceal plagiarism, or guarantee grades.
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
