// Centralised customer-feedback data for the homepage "What Our Customers Say" section.
//
// Integrity rules this file follows (see the reviews-section brief):
//  - Each real review is stored ONCE with a stable `id` and its translations.
//    A translation is never a second record and never inflates any count.
//  - Only `publishable: true` records are rendered. Owner-relayed summaries
//    and entries missing attribution/permission/original text stay here as
//    unpublished records (publishable: false) so the data is documented but
//    not shown.
//  - `rating` is null unless an explicit customer rating exists for that exact
//    review. None of the current reviews carry an explicit rating, so no stars
//    are shown anywhere. We do NOT derive a rating from positive wording and do
//    NOT add Review/AggregateRating structured data.
//  - Private (WhatsApp) feedback uses anonymous attribution describing only the
//    work topic (taken from the customer's own words) — never invented names,
//    universities, countries, dates or "verified" badges, and never a name
//    borrowed from the contacts list.
//  - Google entries keep the original English wording verbatim (including any
//    typo) and link to the contributor profile, labelled accurately as a
//    profile (not a direct link to the specific review).

export type ReviewLocale = 'en' | 'ar';
export type ReviewSource = 'whatsapp' | 'google';
export type ReviewContentType = 'written' | 'summary';

export interface LocalizedText {
  en: string;
  ar: string;
}

export interface Review {
  /** Stable, unique identifier. One review = one id, regardless of language. */
  id: string;
  /** Language the customer actually wrote/spoke in. */
  originalLanguage: ReviewLocale;
  /** Verbatim text in `originalLanguage`. */
  originalText: string;
  /** Faithful translations into other languages (no added praise or claims). */
  translations: Partial<Record<ReviewLocale, string>>;
  /** Anonymous work-topic label (private feedback) or documented public name. */
  displayName: LocalizedText;
  /** True when no public name + publication permission is documented. */
  anonymous: boolean;
  source: ReviewSource;
  /** Link to the source where one can be shown accurately, else null. */
  sourceUrl: string | null;
  /** Accurate, honest label for the source line. */
  sourceLabel: LocalizedText;
  /** Explicit customer rating for THIS review, or null. Null => no stars. */
  rating: number | null;
  /** 'written' = genuine customer wording; 'summary' = owner-relayed summary. */
  contentType: ReviewContentType;
  /** Only publishable records are rendered. */
  publishable: boolean;
}

export const REVIEWS: Review[] = [
  {
    id: 'wa-general-support',
    originalLanguage: 'ar',
    originalText:
      'أنا سعيد جدًا بخدماتكم. كان العمل واضحًا ومنظمًا بشكل جيد، وأُعدّ بعناية. أقدّر دعمكم والجهد الذي بذلتموه في الإجابة عن أسئلتي. أنتم تقومون بعمل رائع. شكرًا لكم!',
    translations: {
      en: 'I am very happy with your services. The work was clear and well organised, and carefully prepared. I appreciate your support and the effort you made in answering my questions. You do wonderful work. Thank you!',
    },
    displayName: { en: 'General academic support', ar: 'دعم أكاديمي عام' },
    anonymous: true,
    source: 'whatsapp',
    sourceUrl: null,
    sourceLabel: {
      en: 'Private feedback shared with our team',
      ar: 'ملاحظات خاصة تمت مشاركتها مع فريقنا',
    },
    rating: null,
    contentType: 'written',
    publishable: true,
  },
  {
    // The wording below incorporates the owner's clarification of the original
    // message, so it is genuine customer feedback but not presented as an
    // untouched, word-for-word quotation (the UI uses no "exact text" claim).
    id: 'wa-marketing-mix',
    originalLanguage: 'ar',
    originalText:
      'شكرًا لكم على مساعدتي في قسم المزيج التسويقي من واجبي الدراسي في التسويق. ساعدني شرحكم على فهم الأخطاء التي كنت أقع فيها. كما أقدّر إتاحة الفرصة لي لطرح أسئلة إضافية.',
    translations: {
      en: 'Thank you for helping me with the marketing-mix section of my marketing assignment. Your explanation helped me understand the mistakes I was making. I also appreciate being given the chance to ask additional questions.',
    },
    displayName: { en: 'Marketing assignment', ar: 'واجب التسويق' },
    anonymous: true,
    source: 'whatsapp',
    sourceUrl: null,
    sourceLabel: {
      en: 'Private feedback shared with our team',
      ar: 'ملاحظات خاصة تمت مشاركتها مع فريقنا',
    },
    rating: null,
    contentType: 'written',
    publishable: true,
  },
  {
    id: 'wa-python-code',
    originalLanguage: 'ar',
    originalText:
      'شكرًا لكم على إكمال الكود بلغة بايثون. لقد راجعته، وأنا سعيد بالنتيجة. كان توفّر الكود كاملًا وجاهزًا مساعدة كبيرة لي. أقدّر جهودكم كثيرًا!',
    translations: {
      en: 'Thank you for completing the Python code. I have reviewed it, and I am happy with the result. Having the code complete and ready was a great help to me. I appreciate your efforts very much!',
    },
    displayName: { en: 'Python programming', ar: 'برمجة بايثون' },
    anonymous: true,
    source: 'whatsapp',
    sourceUrl: null,
    sourceLabel: {
      en: 'Private feedback shared with our team',
      ar: 'ملاحظات خاصة تمت مشاركتها مع فريقنا',
    },
    rating: null,
    contentType: 'written',
    publishable: true,
  },
  {
    id: 'wa-supply-chain-tsmc',
    originalLanguage: 'ar',
    originalText:
      'شكرًا لكم على تجهيز تقريري عن سلسلة التوريد لشركة TSMC خلال وقت قصير جدًا. كنت قلقًا بشأن الموعد النهائي، لكنني تمكنت من تسليمه في الوقت المحدد. أنا سعيد جدًا بمساعدتكم!',
    translations: {
      en: 'Thank you for preparing my supply-chain report on TSMC in a very short time. I was worried about the deadline, but I was able to submit it on time. I am very happy with your help!',
    },
    displayName: { en: 'Supply-chain report', ar: 'تقرير سلسلة التوريد' },
    anonymous: true,
    source: 'whatsapp',
    sourceUrl: null,
    sourceLabel: {
      en: 'Private feedback shared with our team',
      ar: 'ملاحظات خاصة تمت مشاركتها مع فريقنا',
    },
    rating: null,
    contentType: 'written',
    publishable: true,
  },
  {
    // One review even though a friend is mentioned — not split into two.
    id: 'wa-revised-recommendations',
    originalLanguage: 'ar',
    originalText:
      'شكرًا لكم على تحديث التوصيات. أنا سعيد جدًا بالنسخة المعدّلة. تواصلت معكم أنا وصديقي معًا، وأقدّر الجهد الذي بذلتموه في عملي.',
    translations: {
      en: 'Thank you for updating the recommendations. I am very happy with the revised version. My friend and I contacted you together, and I appreciate the effort you put into my work.',
    },
    displayName: { en: 'Revised recommendations', ar: 'مراجعة التوصيات' },
    anonymous: true,
    source: 'whatsapp',
    sourceUrl: null,
    sourceLabel: {
      en: 'Private feedback shared with our team',
      ar: 'ملاحظات خاصة تمت مشاركتها مع فريقنا',
    },
    rating: null,
    contentType: 'written',
    publishable: true,
  },
  {
    id: 'google-shayan-kamran',
    originalLanguage: 'en',
    // Verbatim from Google, including the original spelling.
    originalText: 'Your work is really facinating',
    translations: {
      ar: 'عملكم رائع حقًا',
    },
    displayName: { en: 'Shayan Kamran', ar: 'Shayan Kamran' },
    anonymous: false,
    source: 'google',
    sourceUrl: 'https://www.google.com/maps/contrib/112118814912334090394/reviews?hl=en-GB',
    sourceLabel: {
      en: 'Review on Google — contributor profile',
      ar: 'مراجعة على Google — الملف التعريفي للمراجع',
    },
    rating: null,
    contentType: 'written',
    publishable: true,
  },
  {
    id: 'google-ahmad-ali',
    originalLanguage: 'en',
    // Verbatim from Google, including the original lower-casing.
    originalText:
      'Thanks for your academic help and i am also attaching my results. i am really satisfied from your services.',
    translations: {
      ar: 'شكرًا لكم على مساعدتكم الأكاديمية، وأرفق لكم أيضًا نتائجي. أنا راضٍ جدًا عن خدماتكم.',
    },
    displayName: { en: 'Ahmad Ali', ar: 'Ahmad Ali' },
    anonymous: false,
    source: 'google',
    sourceUrl: 'https://www.google.com/maps/contrib/102348736703046610927/reviews?hl=en-GB',
    sourceLabel: {
      en: 'Review on Google — contributor profile',
      ar: 'مراجعة على Google — الملف التعريفي للمراجع',
    },
    rating: null,
    contentType: 'written',
    publishable: true,
  },

  // ---------------------------------------------------------------------------
  // Owner-relayed summaries (section 6). NOT verbatim customer text, so these
  // are kept UNPUBLISHED. originalText is a plain summary (no quotation marks,
  // no "exact words" claim). They are documented here only; nothing is rendered
  // and no quotations are fabricated from them.
  // ---------------------------------------------------------------------------
  {
    id: 'summary-dissertation-journey',
    originalLanguage: 'en',
    originalText: 'Owner-relayed: satisfaction with the dissertation journey.',
    translations: {},
    displayName: { en: 'Unpublished summary', ar: 'ملخص غير منشور' },
    anonymous: true,
    source: 'whatsapp',
    sourceUrl: null,
    sourceLabel: { en: 'Owner-relayed summary', ar: 'ملخص مُبلَّغ من المالك' },
    rating: null,
    contentType: 'summary',
    publishable: false,
  },
  {
    id: 'summary-degree-recommend-brother',
    originalLanguage: 'en',
    originalText:
      'Owner-relayed: appreciation for support during a degree and intention to recommend the service to a brother.',
    translations: {},
    displayName: { en: 'Unpublished summary', ar: 'ملخص غير منشور' },
    anonymous: true,
    source: 'whatsapp',
    sourceUrl: null,
    sourceLabel: { en: 'Owner-relayed summary', ar: 'ملخص مُبلَّغ من المالك' },
    rating: null,
    contentType: 'summary',
    publishable: false,
  },
  {
    id: 'summary-dissertation-work',
    originalLanguage: 'en',
    originalText: 'Owner-relayed: satisfaction with dissertation work.',
    translations: {},
    displayName: { en: 'Unpublished summary', ar: 'ملخص غير منشور' },
    anonymous: true,
    source: 'whatsapp',
    sourceUrl: null,
    sourceLabel: { en: 'Owner-relayed summary', ar: 'ملخص مُبلَّغ من المالك' },
    rating: null,
    contentType: 'summary',
    publishable: false,
  },
  {
    id: 'summary-3dsmax-classmates',
    originalLanguage: 'en',
    originalText:
      'Owner-relayed: satisfaction with 3ds Max work and intention to tell classmates.',
    translations: {},
    displayName: { en: 'Unpublished summary', ar: 'ملخص غير منشور' },
    anonymous: true,
    source: 'whatsapp',
    sourceUrl: null,
    sourceLabel: { en: 'Owner-relayed summary', ar: 'ملخص مُبلَّغ من المالك' },
    rating: null,
    contentType: 'summary',
    publishable: false,
  },
  {
    id: 'summary-trustpilot-two-reviews',
    originalLanguage: 'en',
    originalText:
      'Owner-relayed: two positive Trustpilot reviews praising the service, team, commitment and agreed delivery dates. Historical screenshot; not reproduced verbatim.',
    translations: {},
    displayName: { en: 'Unpublished summary', ar: 'ملخص غير منشور' },
    anonymous: true,
    source: 'whatsapp',
    sourceUrl: null,
    sourceLabel: { en: 'Owner-relayed summary', ar: 'ملخص مُبلَّغ من المالك' },
    rating: null,
    contentType: 'summary',
    publishable: false,
  },
];

/** Resolve the display text for a review in the requested locale, or null. */
export function reviewText(review: Review, locale: ReviewLocale): string | null {
  if (review.originalLanguage === locale) return review.originalText;
  return review.translations[locale] ?? null;
}

/** True when the text shown in `locale` is a translation, not the original. */
export function isTranslated(review: Review, locale: ReviewLocale): boolean {
  return review.originalLanguage !== locale;
}

/** Publishable reviews that actually have text available in the given locale. */
export function getPublishableReviews(locale: ReviewLocale): Review[] {
  return REVIEWS.filter((r) => r.publishable && reviewText(r, locale) !== null);
}
