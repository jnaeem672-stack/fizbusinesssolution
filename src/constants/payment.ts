/** Payment policy shown across the site. Keep in sync with how FIZBS actually takes payment. */
export const PAYMENT = {
  en: {
    methods: [
      { code: 'UK', title: 'UK Bank Transfer', currency: 'GBP', desc: 'For students in the UK and worldwide. Pay from any UK or international bank.' },
      { code: 'KSA', title: 'Saudi Bank Transfer', currency: 'SAR', desc: 'For students in Saudi Arabia. Pay in riyals with a fast local transfer from your banking app.' },
    ],
    method: 'UK & Saudi Bank Transfer',
    split: '50% to start · 50% on completion',
    section: {
      badge: 'Simple Payment',
      title: 'Pay Half Now, Half on Completion',
      subtitle: 'No full payment upfront. Start with 50% and pay the rest only when your work is completed.',
      steps: [
        { pct: '50%', title: 'Pay 50% to start', desc: 'Confirm your quote and pay half by bank transfer. Your expert starts straight away.' },
        { pct: '✓', title: 'Your expert works', desc: 'Get regular updates on WhatsApp and share any extra requirements along the way.' },
        { pct: '50%', title: 'Pay 50% on completion', desc: 'Pay the remaining half once your work is completed.' },
      ],
      note: 'Account details are shared securely on WhatsApp after you confirm your quote.',
    },
    faq: {
      q: 'How do I pay for assignment or dissertation help?',
      a: 'You can pay by bank transfer to our UK account in GBP or, if you are in Saudi Arabia, to our Saudi account in SAR. You pay 50% to start and the remaining 50% when your work is completed. We share the account details on WhatsApp once you confirm your quote.',
    },
  },
  ar: {
    methods: [
      { code: 'KSA', title: 'تحويل بنكي داخل السعودية', currency: 'ريال', desc: 'للطلاب في السعودية. ادفع بالريال عبر تحويل محلي سريع من تطبيق البنك.' },
      { code: 'UK', title: 'تحويل بنكي إلى بريطانيا', currency: 'جنيه إسترليني', desc: 'للطلاب في بريطانيا وأي دولة أخرى. ادفع من أي بنك بريطاني أو دولي.' },
    ],
    method: 'تحويل بنكي داخل السعودية أو إلى بريطانيا',
    split: '50% مقدمًا · 50% عند الانتهاء',
    section: {
      badge: 'دفع سهل',
      title: 'ادفع النصف الآن والنصف عند الانتهاء',
      subtitle: 'لا داعي لدفع المبلغ كاملًا مقدمًا. ابدأ بدفع 50% وادفع الباقي فقط عند الانتهاء من العمل.',
      steps: [
        { pct: '50%', title: 'ادفع 50% للبدء', desc: 'أكّد عرض السعر وادفع النصف عبر تحويل بنكي، ويبدأ الخبير العمل فورًا.' },
        { pct: '✓', title: 'الخبير يعمل على طلبك', desc: 'تصلك تحديثات منتظمة عبر واتساب ويمكنك مشاركة أي متطلبات إضافية.' },
        { pct: '50%', title: 'ادفع 50% عند الانتهاء', desc: 'ادفع النصف المتبقي بعد الانتهاء من العمل.' },
      ],
      note: 'نرسل لك تفاصيل الحساب بشكل آمن عبر واتساب بعد تأكيد عرض السعر.',
    },
    faq: {
      q: 'كيف أدفع مقابل المساعدة في الواجب أو الرسالة العلمية؟',
      a: 'يمكنك الدفع عبر تحويل بنكي محلي إلى حسابنا في السعودية بالريال، أو إلى حسابنا في المملكة المتحدة بالجنيه الإسترليني. تدفع 50% للبدء و50% المتبقية عند الانتهاء من العمل، ونرسل لك تفاصيل الحساب عبر واتساب بعد تأكيد عرض السعر.',
    },
  },
} as const;
