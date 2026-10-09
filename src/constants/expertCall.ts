import type { FaqItem } from '@/components/FaqSection';
import { buildWhatsAppUrl } from '@/constants/whatsapp';

/** "Talk to an expert on a WhatsApp call" feature. Calls are in English for now. */
export const EXPERT_CALL = {
  en: {
    chip: 'Talk to an Expert on a WhatsApp Call',
    eyebrow: 'Unique to FIZBS',
    title: 'Talk to an Expert on a WhatsApp Call',
    text: 'Not sure what your assessment is really asking for? Book a WhatsApp call with a subject expert before you order. We go through your brief, marking criteria and word count together, so everything is clear from day one.',
    points: [
      'Discuss your brief and marking criteria',
      'Clear up any confusion before you order',
      'Book a time that suits you (UK or Saudi time)',
      'Calls are in English',
    ],
    cta: 'Book a WhatsApp Call',
    sideCta: 'Book a Call With an Expert',
    note: 'Send us a message and we will arrange a call time with the right expert.',
    message: "Hello FIZBS! I'd like to book a WhatsApp call with an expert to discuss my assessment.\nSubject: \nPreferred call time: ",
    faq: {
      q: 'Can I speak to an expert before I order?',
      a: 'Yes. You can book a WhatsApp call with a subject expert to discuss your brief, marking criteria and deadline before you place an order. Calls are in English. Message us on WhatsApp with your subject and a time that suits you (UK or Saudi time) and we will arrange it.',
    } as FaqItem,
  },
  ar: {
    chip: 'تحدث مع خبير عبر مكالمة واتساب',
    eyebrow: 'ميزة خاصة من FIZBS',
    title: 'تحدث مع خبير عبر مكالمة واتساب',
    text: 'هل تحتاج إلى فهم متطلبات واجبك بشكل أوضح؟ احجز مكالمة واتساب مع خبير في تخصصك قبل الطلب، لنراجع معًا التعليمات ومعايير التقييم وعدد الكلمات.',
    points: [
      'مناقشة التعليمات ومعايير التقييم',
      'توضيح أي استفسار قبل الطلب',
      'اختر الوقت المناسب لك (بتوقيت السعودية أو بريطانيا)',
      'المكالمات حاليًا باللغة الإنجليزية',
    ],
    cta: 'احجز مكالمة واتساب',
    sideCta: 'احجز مكالمة مع خبير',
    note: 'أرسل لنا رسالة وسنرتب موعد المكالمة مع الخبير المناسب.',
    message: 'مرحبًا FIZBS! أرغب في حجز مكالمة واتساب مع خبير لمناقشة واجبي (باللغة الإنجليزية).\nالتخصص: \nالوقت المناسب: ',
    faq: {
      q: 'هل يمكنني التحدث مع خبير قبل الطلب؟',
      a: 'نعم. يمكنك حجز مكالمة واتساب مع خبير في تخصصك لمناقشة التعليمات ومعايير التقييم والموعد النهائي قبل الطلب. المكالمات حاليًا باللغة الإنجليزية. أرسل لنا تخصصك والوقت المناسب لك وسنرتب المكالمة.',
    } as FaqItem,
  },
} as const;

export const expertCallUrl = (locale: 'en' | 'ar' = 'en') => buildWhatsAppUrl(EXPERT_CALL[locale].message);
