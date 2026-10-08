'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import FormField from '../ui/FormField';
import SubmitButton from '../ui/SubmitButton';
import { sendContactEmail } from '@/utils/api';
import type { ContactFormData } from '@/types';

const ContactForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await sendContactEmail(data);
      toast.success('Message sent! Check your inbox for confirmation.');
      reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to send message.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 md:p-10 lg:p-12 rounded-3xl shadow-xl shadow-gray-200/60 border border-gray-100 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <h2 className="text-2xl md:text-3xl font-black text-navy mb-2 relative">General Questions &amp; Inquiries</h2>
      <p className="text-gray-500 text-sm mb-8 relative">
        Ask about payments, pricing, deadlines or anything else. For a price, use the quote form above or message us on WhatsApp.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField<ContactFormData>
          label="Name *"
          name="name"
          placeholder="Your Full Name"
          register={register}
          errors={errors}
          rules={{
            required: 'Full name is required',
            minLength: { value: 2, message: 'Name must be at least 2 characters' },
          }}
        />
        <FormField<ContactFormData>
          label="Email *"
          name="email"
          type="email"
          placeholder="Your Email Address"
          register={register}
          errors={errors}
          rules={{
            required: 'Email address is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Please enter a valid email address',
            },
          }}
        />
        <FormField<ContactFormData>
          label="Subject *"
          name="subject"
          placeholder="How can we help you?"
          register={register}
          errors={errors}
          colSpan="md:col-span-2"
          rules={{
            required: 'Message subject is required',
            minLength: { value: 5, message: 'Subject should be more descriptive' },
          }}
        />
        <FormField<ContactFormData>
          label="Message *"
          name="message"
          type="textarea"
          placeholder="Write your message here..."
          register={register}
          errors={errors}
          colSpan="md:col-span-2"
          rows={6}
          rules={{
            required: 'Message content is required',
            minLength: { value: 10, message: 'Please provide more details' },
          }}
        />
        <div className="md:col-span-2">
          <SubmitButton
            isSubmitting={isSubmitting}
            label="Send Message"
            loadingLabel="Sending..."
            icon={Send}
          />
        </div>
      </form>
    </motion.div>
  );
};

export default ContactForm;
