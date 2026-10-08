'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import SubmitButton from './ui/SubmitButton';
import FileUploadZone from './support/FileUploadZone';
import { useFileUpload } from '@/hooks/useFileUpload';
import { sendSupportRequestEmail } from '@/utils/api';
import { countries, supportTypes, educationLevels } from '@/constants/supportOptions';
import type { SupportRequestFormData } from '@/types';

const inputClasses =
  'bg-[#fce4ec] border border-[#f8bbd9] p-[10px_14px] rounded-[6px] text-[14px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all w-full text-navy placeholder:text-gray-400';
const labelClasses = 'block text-primary font-semibold text-[11px] uppercase mb-2 tracking-[1px]';

const SupportRequestForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<SupportRequestFormData>({
    defaultValues: { academicIntegrityConfirmed: false },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { uploadedFiles, uploadingFiles, handleFileChange, removeFile, clearFiles, maxFiles } = useFileUpload();

  const onSubmit = async (data: SupportRequestFormData) => {
    setIsSubmitting(true);
    try {
      await sendSupportRequestEmail({ ...data, uploadedFiles });

      // Google Ads conversion: Support request submitted
      const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
      if (typeof gtag === 'function') {
        gtag('set', 'user_data', {
          email: data.email,
          phone_number: `${data.countryCode ?? ''}${data.phone}`.replace(/[^\d+]/g, ''),
        });
        gtag('event', 'conversion', {
          send_to: 'AW-18496017210/YWTRCIiLnJIdELqmy_NE',
          value: 1.0,
          currency: 'PKR',
        });
      }

      toast.success('Request received! We will contact you on WhatsApp shortly.');
      reset();
      clearFiles();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to submit request.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-xl p-5 md:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.12)]">
      <div className="mb-5 text-center">
        <h2 className="text-xl font-black text-navy mb-1 uppercase tracking-tight">Get a Free Quote</h2>
        <div className="w-12 h-1 bg-primary mx-auto" />
        <p className="text-gray-500 text-xs mt-2">Takes 30 seconds. We reply on WhatsApp quickly.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>Full Name *</label>
            <input {...register('fullName', { required: true })} type="text" placeholder="Enter your name" className={inputClasses} />
          </div>
          <div>
            <label className={labelClasses}>Email Address *</label>
            <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} type="email" placeholder="Enter your email" className={inputClasses} />
          </div>

          <div className="flex gap-2">
            <div className="w-20 sm:w-24">
              <label className={labelClasses}>Code</label>
              <select {...register('countryCode')} className={inputClasses} defaultValue="+44">
                {countries.map((c) => (
                  <option key={`${c.name}-${c.code}`} value={c.code}>{c.code}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className={labelClasses}>WhatsApp *</label>
              <input {...register('phone', { required: true })} type="tel" placeholder="Phone number" className={inputClasses} />
            </div>
          </div>
          <div>
            <label className={labelClasses}>Level</label>
            <select {...register('educationLevel')} className={inputClasses} defaultValue="Undergraduate">
              {educationLevels.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClasses}>Service *</label>
            <select {...register('supportType', { required: true })} className={inputClasses} defaultValue="">
              <option value="">Select service</option>
              {supportTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClasses}>Deadline</label>
            <input {...register('preferredDate')} type="date" className={inputClasses} />
          </div>

          <div className="col-span-full">
            <label className={labelClasses}>Tell us briefly what you need *</label>
            <textarea
              {...register('supportTopic', { required: true })}
              placeholder="e.g. 3,000-word business report, Harvard referencing, need feedback on my draft"
              className={`${inputClasses} h-20 resize-none`}
            />
          </div>
        </div>

        <details className="group rounded-lg border border-dashed border-[#f8bbd9] p-3">
          <summary className="cursor-pointer text-[12px] font-semibold text-primary list-none flex items-center justify-between">
            📎 Attach brief or draft (optional)
            <span className="text-gray-400 group-open:rotate-180 transition-transform">▾</span>
          </summary>
          <div className="mt-3">
            <FileUploadZone
              uploadedFiles={uploadedFiles}
              uploadingFiles={uploadingFiles}
              onFileChange={handleFileChange}
              onRemove={removeFile}
              maxFiles={maxFiles}
            />
          </div>
        </details>

        <label className="flex items-start gap-2 text-[11px] text-gray-600 leading-relaxed">
          <input
            {...register('academicIntegrityConfirmed', { required: true })}
            type="checkbox"
            className="mt-0.5 h-4 w-4 accent-primary shrink-0"
          />
          <span>I agree to the terms and academic integrity policy.</span>
        </label>
        {errors.academicIntegrityConfirmed && (
          <p className="text-xs text-primary font-semibold">Please tick the box to continue.</p>
        )}

        <SubmitButton
          isSubmitting={isSubmitting}
          label="Get My Free Quote"
          loadingLabel="Submitting..."
          variant="navy"
          className="mt-2 rounded-lg text-base font-semibold normal-case tracking-normal"
        />
      </form>
    </div>
  );
};

export default SupportRequestForm;
