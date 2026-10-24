'use client';

import { useState, useId } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import SubmitButton from './ui/SubmitButton';
import FileUploadZone from './support/FileUploadZone';
import { useFileUpload } from '@/hooks/useFileUpload';
import { sendSupportRequestEmail } from '@/utils/api';
import { getLeadSource } from '@/lib/leadSource';
import { countries, supportTypes, educationLevels } from '@/constants/supportOptions';
import type { SupportRequestFormData } from '@/types';

const inputClasses =
  'bg-[#FBF6E6] border border-[#E9DCAE] px-3 py-2 md:p-[10px_14px] rounded-[6px] text-base md:text-[14px] min-w-0 max-w-full outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all w-full text-navy placeholder:text-gray-400';
// A field with a problem gets a red border and a short message under it, so the visitor sees why the form did not send
const fieldClasses = (bad: boolean) => (bad ? inputClasses.replace('border-[#E9DCAE]', 'border-red-500') : inputClasses);
const FieldError = ({ id, text }: { id: string; text?: string }) =>
  text ? <p id={id} role="alert" className="mt-1 text-[11px] font-semibold text-red-600">{text}</p> : null;
const labelClasses = 'block text-primary font-semibold text-[10px] md:text-[11px] uppercase mb-1 md:mb-2 tracking-[1px]';

const TEXT = {
  en: {
    success: 'Request received! We will contact you on WhatsApp shortly.',
    title: 'Get a Free Quote',
    sub: 'Takes 30 seconds. We reply on WhatsApp quickly.',
    name: 'Full Name *', namePh: 'Enter your name',
    email: 'Email Address *', emailPh: 'Enter your email',
    code: 'Code', whatsapp: 'WhatsApp *', phonePh: 'Phone number',
    level: 'Level', service: 'Service *', selectService: 'Select service', deadline: 'Deadline',
    need: 'Tell us briefly what you need *',
    needPh: 'e.g. 3,000-word business report, Harvard referencing, need feedback on my draft',
    attach: '📎 Attach brief or draft (optional)',
    agree: 'I agree to the terms and privacy policy.',
    tick: 'Please tick the box to continue.',
    required: 'Please fill in this field.', badEmail: 'Please enter a valid email address.',
    submit: 'Get My Free Quote', submitting: 'Submitting...',
  },
  ar: {
    success: 'تم استلام طلبك! سنتواصل معك عبر واتساب قريبًا.',
    title: 'احصل على عرض سعر مجاني',
    sub: 'يستغرق 30 ثانية فقط. نرد بسرعة عبر واتساب.',
    name: 'الاسم الكامل *', namePh: 'اكتب اسمك',
    email: 'البريد الإلكتروني *', emailPh: 'اكتب بريدك الإلكتروني',
    code: 'الرمز', whatsapp: 'واتساب *', phonePh: 'رقم الجوال',
    level: 'المرحلة', service: 'الخدمة *', selectService: 'اختر الخدمة', deadline: 'الموعد النهائي',
    need: 'أخبرنا باختصار بما تحتاجه *',
    needPh: 'مثال: تقرير أعمال 3,000 كلمة، توثيق Harvard، أحتاج ملاحظات على مسودتي',
    attach: '📎 أرفق المتطلبات أو المسودة (اختياري)',
    agree: 'أوافق على الشروط وسياسة الخصوصية.',
    tick: 'يرجى تحديد المربع للمتابعة.',
    required: 'يرجى تعبئة هذا الحقل.', badEmail: 'يرجى كتابة بريد إلكتروني صحيح.',
    submit: 'احصل على السعر مجانًا', submitting: 'جارٍ الإرسال...',
  },
} as const;

const AR_SERVICE_LABELS: Record<string, string> = {
  'Assignment Help': 'المساعدة في الواجبات',
  'Essay Help': 'المساعدة في المقالات',
  'Dissertation Help': 'المساعدة في الرسائل العلمية',
  'Thesis Help': 'المساعدة في رسالة الماجستير والدكتوراه',
  'Research Proposal Help': 'المساعدة في مقترح البحث',
  'Literature Review Help': 'المساعدة في مراجعة الأدبيات',
  'Case Study / Report Help': 'المساعدة في دراسة الحالة والتقارير',
  'Data Analysis Help (SPSS, Excel, NVivo)': 'تحليل البيانات (SPSS وExcel وNVivo)',
  'Proofreading & Editing': 'التدقيق اللغوي والتحرير',
  'Referencing Help': 'المساعدة في التوثيق والمراجع',
  'Presentation Help': 'المساعدة في العروض التقديمية',
  'PhD Admission & Scholarship Help': 'المساعدة في قبول الدكتوراه والمنح',
  Other: 'أخرى',
};

const AR_LEVEL_LABELS: Record<string, string> = {
  College: 'كلية / دبلوم',
  Undergraduate: 'بكالوريوس',
  Postgraduate: 'دراسات عليا (ماجستير / MBA)',
  Doctoral: 'دكتوراه',
  Professional: 'مهني',
  Other: 'أخرى',
};

const SupportRequestForm = ({ locale = 'en' }: { locale?: 'en' | 'ar' } = {}) => {
  const t = TEXT[locale];
  const isAr = locale === 'ar';
  const { register, handleSubmit, reset, formState: { errors } } = useForm<SupportRequestFormData>({
    defaultValues: { academicIntegrityConfirmed: false },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { uploadedFiles, uploadingFiles, handleFileChange, removeFile, clearFiles, maxFiles } = useFileUpload();

  const onSubmit = async (data: SupportRequestFormData) => {
    setIsSubmitting(true);
    try {
      await sendSupportRequestEmail({ ...data, uploadedFiles, leadSource: getLeadSource() });

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

      toast.success(t.success);
      reset();
      clearFiles();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to submit request.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const uid = useId();
  // Props for a required field: red border, aria-invalid and a message linked with aria-describedby
  const errorFor = (name: 'fullName' | 'email' | 'phone' | 'supportType' | 'supportTopic') => {
    const err = errors[name];
    const text = err ? (name === 'email' && err.type === 'pattern' ? t.badEmail : t.required) : undefined;
    return { bad: Boolean(err), text, id: `${uid}-${name}-error` };
  };
  const nameErr = errorFor('fullName');
  const emailErr = errorFor('email');
  const phoneErr = errorFor('phone');
  const serviceErr = errorFor('supportType');
  const needErr = errorFor('supportTopic');

  return (
    <div className="w-full bg-white rounded-xl p-4 md:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.12)]" dir={isAr ? 'rtl' : undefined}>
      <div className="mb-3 md:mb-5 text-center">
        <h2 className="text-xl font-black text-navy mb-1 uppercase tracking-tight">{t.title}</h2>
        <div className="w-12 h-1 bg-primary mx-auto" />
        <p className="text-gray-500 text-xs mt-2">{t.sub}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 md:space-y-4">
        <div className="grid grid-cols-2 gap-x-2 gap-y-3 md:gap-4">
          <div>
            <label htmlFor={`${uid}-name`} className={labelClasses}>{t.name}</label>
            <input id={`${uid}-name`} {...register('fullName', { required: true })} type="text" placeholder={t.namePh} className={fieldClasses(nameErr.bad)} aria-invalid={nameErr.bad} aria-describedby={nameErr.text ? nameErr.id : undefined} />
            <FieldError id={nameErr.id} text={nameErr.text} />
          </div>
          <div>
            <label htmlFor={`${uid}-email`} className={labelClasses}>{t.email}</label>
            <input id={`${uid}-email`} {...register('email', { required: true, pattern: /^\S+@\S+$/i })} type="email" placeholder={t.emailPh} className={fieldClasses(emailErr.bad)} aria-invalid={emailErr.bad} aria-describedby={emailErr.text ? emailErr.id : undefined} />
            <FieldError id={emailErr.id} text={emailErr.text} />
          </div>

          <div className="col-span-2 md:col-span-1 flex gap-2">
            <div className="w-20 sm:w-24 shrink-0">
              <label htmlFor={`${uid}-code`} className={labelClasses}>{t.code}</label>
              <select id={`${uid}-code`} {...register('countryCode')} className={inputClasses} defaultValue="+44">
                {countries.map((c) => (
                  <option key={`${c.name}-${c.code}`} value={c.code}>{c.code}</option>
                ))}
              </select>
            </div>
            <div className="flex-1 min-w-0">
              <label htmlFor={`${uid}-phone`} className={labelClasses}>{t.whatsapp}</label>
              <input id={`${uid}-phone`} {...register('phone', { required: true })} type="tel" placeholder={t.phonePh} className={fieldClasses(phoneErr.bad)} aria-invalid={phoneErr.bad} aria-describedby={phoneErr.text ? phoneErr.id : undefined} />
              <FieldError id={phoneErr.id} text={phoneErr.text} />
            </div>
          </div>

          <div className="col-span-2 md:col-span-1">
            <label htmlFor={`${uid}-service`} className={labelClasses}>{t.service}</label>
            <select id={`${uid}-service`} {...register('supportType', { required: true })} className={fieldClasses(serviceErr.bad)} defaultValue="" aria-invalid={serviceErr.bad} aria-describedby={serviceErr.text ? serviceErr.id : undefined}>
              <option value="">{t.selectService}</option>
              {supportTypes.map((type) => (
                <option key={type} value={type}>{isAr ? AR_SERVICE_LABELS[type] ?? type : type}</option>
              ))}
            </select>
            <FieldError id={serviceErr.id} text={serviceErr.text} />
          </div>
          <div>
            <label htmlFor={`${uid}-level`} className={labelClasses}>{t.level}</label>
            <select id={`${uid}-level`} {...register('educationLevel')} className={inputClasses} defaultValue="Undergraduate">
              {educationLevels.map((level) => (
                <option key={level} value={level}>{isAr ? AR_LEVEL_LABELS[level] ?? level : level}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor={`${uid}-deadline`} className={labelClasses}>{t.deadline}</label>
            <input id={`${uid}-deadline`} {...register('preferredDate')} type="date" className={`${inputClasses} block appearance-none h-[42px] md:h-auto`} />
          </div>

          <div className="col-span-2">
            <label htmlFor={`${uid}-need`} className={labelClasses}>{t.need}</label>
            <textarea
              id={`${uid}-need`} {...register('supportTopic', { required: true })}
              placeholder={t.needPh}
              className={`${fieldClasses(needErr.bad)} h-16 md:h-20 resize-none`}
              aria-invalid={needErr.bad}
              aria-describedby={needErr.text ? needErr.id : undefined}
            />
            <FieldError id={needErr.id} text={needErr.text} />
          </div>
        </div>

        <details className="group rounded-lg border border-dashed border-[#E9DCAE] p-3">
          <summary className="cursor-pointer text-[12px] font-semibold text-primary list-none flex items-center justify-between">
            {t.attach}
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
          <span>{t.agree}</span>
        </label>
        {errors.academicIntegrityConfirmed && (
          <p role="alert" className="text-xs text-red-600 font-semibold">{t.tick}</p>
        )}

        <SubmitButton
          isSubmitting={isSubmitting}
          label={t.submit}
          loadingLabel={t.submitting}
          variant="navy"
          className="mt-2 rounded-lg text-base font-semibold normal-case tracking-normal"
        />
      </form>
    </div>
  );
};

export default SupportRequestForm;
