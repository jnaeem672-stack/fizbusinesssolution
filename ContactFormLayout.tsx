'use client';

import { motion } from 'framer-motion';
import { Mail, ArrowRight, Paperclip, CheckCircle2 } from 'lucide-react';
import SupportRequestForm from '@/components/SupportRequestForm';
import SectionHeader from '@/components/ui/SectionHeader';
import WhatsAppLink from '@/components/ui/WhatsAppLink';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { WHATSAPP_URL, WHATSAPP_NUMBER } from '@/constants/whatsapp';
import { CONTACT_EMAIL, MAILTO_URL } from '@/constants/contact';

const principles = [
  'Share your subject, word count and deadline',
  'Attach your assignment brief or marking criteria if you have it',
  'Get a clear price and 10% off your first order',
];

export default function ContactFormLayout() {
  return (
    <section id="support-form" className="scroll-mt-[110px] py-12 md:py-16 bg-gray-50">
      <div className="max-w-site mx-auto px-4">
        <SectionHeader
          title="Get a Free Quote"
          subtitle="Contact us by form, WhatsApp or email for assignment help, dissertation help, proofreading and research proposal help."
          className="mb-10 md:mb-12"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          <div className="space-y-4 md:space-y-6 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 md:p-8 flex flex-col"
            >
              <div className="flex items-center gap-4 mb-4">
                <WhatsAppIcon size={56} className="w-14 h-14" />
                <div>
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest">Quick Discussion</p>
                  <h3 className="text-xl font-black text-navy">Chat on WhatsApp</h3>
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-2 leading-relaxed">
                The fastest way to get a price. Send your subject, word count and deadline and our team will reply quickly, 24/7.
              </p>
              <p className="text-navy font-bold text-sm mb-5">{WHATSAPP_NUMBER}</p>
              <WhatsAppLink
                href={WHATSAPP_URL}
                aria-label="Open WhatsApp chat"
                className="inline-flex items-center justify-center gap-2 w-full py-3 border border-gray-200 text-navy font-black text-xs uppercase tracking-widest rounded-xl hover:border-[#25D366] hover:text-[#25D366] transition-all"
              >
                Open WhatsApp Chat
                <ArrowRight className="w-4 h-4" />
              </WhatsAppLink>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 md:p-8 flex flex-col"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-navy flex items-center justify-center text-white shadow-lg">
                  <Mail className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest">Detailed Inquiries</p>
                  <h3 className="text-xl font-black text-navy">Send an Email</h3>
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-2 leading-relaxed">
                Best for detailed requirements. Include your brief, word count, deadline and any files or marking criteria.
              </p>
              <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
                <Paperclip className="w-4 h-4 text-primary shrink-0" />
                Attach your assignment brief, guidelines or draft
              </div>
              <p className="text-navy font-bold text-sm mb-5 break-all">{CONTACT_EMAIL}</p>
              <a
                href={MAILTO_URL}
                className="inline-flex items-center justify-center gap-2 w-full py-4 bg-primary text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-primary/25 hover:brightness-110 transition-all"
              >
                <Mail className="w-5 h-5" />
                Send Email
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 }}
              className="bg-navy rounded-2xl p-6 md:p-8 text-white relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C41E3A_1px,transparent_1px)] [background-size:20px_20px]" />
              <div className="relative z-10">
                <h4 className="font-black text-lg mb-4">Before you contact us</h4>
                <ul className="space-y-3">
                  {principles.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white/80">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-1 lg:order-2 lg:sticky lg:top-[120px]"
          >
            <SupportRequestForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
