'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import SubmitButton from './ui/SubmitButton';
import FormSectionTitle from './support/FormSectionTitle';
import FileUploadZone from './support/FileUploadZone';
import { useFileUpload } from '@/hooks/useFileUpload';
import { sendSupportRequestEmail } from '@/utils/api';
import {
  countries,
  supportTypes,
  educationLevels,
  documentLengthOptions,
  referenceOptions,
} from '@/constants/supportOptions';
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
      toast.success('Support request submitted. Check your email for confirmation.');
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
    <div className="w-full bg-white rounded-xl p-5 md:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.12)] max-h-[85vh] lg:max-h-[90vh] overflow-y-auto">
      <div className="mb-5 text-center">
        <h2 className="text-xl font-black text-navy mb-1 uppercase tracking-tight">Request Learning Support</h2>
        <div className="w-12 h-1 bg-primary mx-auto" />
        <p className="text-gray-500 text-xs mt-2">Tell us what you want to learn or improve</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormSectionTitle>Contact Details</FormSectionTitle>

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
            <label className={labelClasses}>Study Country</label>
            <select {...register('studyCountry')} className={inputClasses} defaultValue="">
              <option value="">Select country</option>
              {countries.map((c) => (
                <option key={c.name} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          <FormSectionTitle>Learning Support Details</FormSectionTitle>

          <div className="col-span-full">
            <label className={labelClasses}>What do you need help understanding or improving? *</label>
            <input
              {...register('supportTopic', { required: true })}
              type="text"
              placeholder="e.g. structuring a literature review or interpreting SPSS output"
              className={inputClasses}
            />
          </div>

          <div>
            <label className={labelClasses}>Support Type *</label>
            <select {...register('supportType', { required: true })} className={inputClasses} defaultValue="">
              <option value="">Select support type</option>
              {supportTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClasses}>Education Level</label>
            <select {...register('educationLevel')} className={inputClasses} defaultValue="Undergraduate">
              {educationLevels.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClasses}>Department</label>
            <input {...register('department')} type="text" placeholder="e.g. Business School" className={inputClasses} />
          </div>
          <div>
            <label className={labelClasses}>Subject</label>
            <input {...register('subject')} type="text" placeholder="Subject or module" className={inputClasses} />
          </div>

          <div>
            <label className={labelClasses}>Preferred Support Date</label>
            <input {...register('preferredDate')} type="datetime-local" className={inputClasses} />
          </div>
          <div>
            <label className={labelClasses}>Document Length</label>
            <select {...register('documentLength')} className={inputClasses} defaultValue="Not applicable">
              {documentLengthOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="col-span-full">
            <label className={labelClasses}>Referencing Style</label>
            <select {...register('references')} className={inputClasses} defaultValue="Not applicable">
              {referenceOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={labelClasses}>What have you completed so far?</label>
          <textarea
            {...register('currentProgress')}
            placeholder="Briefly describe your own work, draft, reading, analysis, or tutor feedback so far."
            className={`${inputClasses} h-24 resize-none`}
          />
        </div>

        <div>
          <label className={labelClasses}>Learning Goals or Questions</label>
          <textarea
            {...register('learningGoals')}
            placeholder="Explain what you want to understand, practise, or improve."
            className={`${inputClasses} h-24 resize-none`}
          />
        </div>

        <div>
          <label className={labelClasses}>Your Draft or Supporting Files (Max {maxFiles})</label>
          <FileUploadZone
            uploadedFiles={uploadedFiles}
            uploadingFiles={uploadingFiles}
            onFileChange={handleFileChange}
            onRemove={removeFile}
            maxFiles={maxFiles}
          />
          <p className="mt-2 text-[11px] text-gray-500 leading-relaxed">
            Upload only materials you are permitted to share. Do not upload account credentials, live examination materials, or confidential participant data.
          </p>
        </div>

        <label className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-700 leading-relaxed">
          <input
            {...register('academicIntegrityConfirmed', { required: true })}
            type="checkbox"
            className="mt-1 h-4 w-4 accent-primary shrink-0"
          />
          <span>
            I confirm that I am requesting educational support and will not submit another person&apos;s work as my own. I understand that FIZ does not write assessed work, take examinations, fabricate data, or guarantee grades.
          </span>
        </label>
        {errors.academicIntegrityConfirmed && (
          <p className="text-xs text-primary font-semibold">You must confirm the academic-integrity statement.</p>
        )}

        <SubmitButton
          isSubmitting={isSubmitting}
          label="Submit Support Request"
          loadingLabel="Submitting..."
          variant="navy"
          className="mt-4 rounded-lg text-base font-semibold normal-case tracking-normal"
        />
      </form>
    </div>
  );
};

export default SupportRequestForm;
