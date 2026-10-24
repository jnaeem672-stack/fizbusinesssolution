import type { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, ChevronLeft } from 'lucide-react';
import ArGpaCalculator from '@/components/tools/ArGpaCalculator';
import FaqSection from '@/components/FaqSection';
import { SITE_URL } from '@/content/landing';
import { AR_GPA_FAQS, GPA_BANDS, SAUDI_GRADES } from '@/content/arGpa';
import { AR_SHARE_IMAGE } from '@/components/RootDocument';

const URL = `${SITE_URL}/ar/gpa-calculator`;
const TITLE = 'حساب المعدل التراكمي والجامعي من 5 ومن 4 | FIZBS';
const DESCRIPTION =
  'حاسبة المعدل الجامعي والتراكمي مجانًا من 5 ومن 4 حسب نظام الجامعات السعودية: أدخل الساعات والتقديرات واعرف معدلك وتقديرك والمعدل المطلوب لرفعه.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: ['حساب المعدل', 'حساب المعدل التراكمي', 'حساب المعدل الجامعي', 'حساب المعدل التراكمي من 5', 'حساب المعدل التراكمي من 4', 'حاسبة المعدل'],
  alternates: { canonical: URL, languages: { 'ar-SA': URL } },
  openGraph: {
    images: [AR_SHARE_IMAGE],
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    locale: 'ar_SA',
    type: 'website',
  },
};

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'حاسبة المعدل التراكمي والجامعي',
    url: URL,
    inLanguage: 'ar',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Any',
    description: DESCRIPTION,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'SAR' },
    provider: { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: 'FIZ Business Solutions', url: SITE_URL },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: `${SITE_URL}/ar` },
      { '@type': 'ListItem', position: 2, name: 'حساب المعدل', item: URL },
    ],
  },
];

const h2 = 'text-2xl md:text-3xl font-extrabold text-navy mb-4';
const p = 'text-gray-700 leading-loose text-[17px]';

export default function Page() {
  return (
    <main lang="ar" dir="rtl" className="bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="relative overflow-hidden bg-navy">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C9A227_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative max-w-[1100px] mx-auto px-4 pt-8 pb-14 md:pb-16">
          <nav aria-label="مسار التنقل" className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/ar" className="hover:text-white">الرئيسية</Link>
            <ChevronLeft className="w-4 h-4" />
            <span className="text-white/90">حساب المعدل</span>
          </nav>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-white text-xs font-black mb-5">
            <Calculator className="w-4 h-4" /> أداة مجانية
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-[1.3] mb-4">حساب المعدل التراكمي والجامعي من 5 ومن 4</h1>
          <p className="text-gray-300 text-lg max-w-3xl leading-loose">
            احسب معدلك الفصلي ومعدلك التراكمي حسب نظام الجامعات السعودية، واعرف تقديرك العام، والمعدل الذي تحتاجه هذا الفصل لتصل إلى الهدف الذي تريده. الحساب فوري ومجاني ولا يحتاج إلى تسجيل.
          </p>
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-4 -mt-8 relative z-10">
        <ArGpaCalculator />
      </section>

      <div className="max-w-[900px] mx-auto px-4 py-14 space-y-14">
        <section>
          <h2 className={h2}>طريقة استخدام حاسبة المعدل</h2>
          <ol className="space-y-3">
            {[
              'اختر نظام المعدل في جامعتك: من 5 أو من 4.',
              'أدخل عدد ساعات كل مقرر وتقديرك فيه، وأضف مقررات أكثر عند الحاجة.',
              'ستظهر لك مباشرة نتيجة المعدل الفصلي وتقديره.',
              'لحساب المعدل التراكمي، أدخل معدلك التراكمي السابق وعدد ساعاتك المجتازة.',
              'إذا أردت معرفة ما تحتاجه لرفع معدلك، أدخل المعدل التراكمي الذي تستهدفه.',
            ].map((step, i) => (
              <li key={step} className="flex gap-3">
                <span className="shrink-0 w-8 h-8 rounded-full bg-navy text-white text-sm font-black flex items-center justify-center">{i + 1}</span>
                <span className={p}>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className={h2}>جدول التقديرات ونقاطها في الجامعات السعودية</h2>
          <p className={`${p} mb-5`}>
            تستخدم أغلب الجامعات السعودية الجدول التالي لتحويل الدرجة المئوية إلى تقدير ونقاط. تحقق دائمًا من لائحة جامعتك، فقد تختلف بعض التفاصيل.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
            <table className="w-full text-center text-[15px]">
              <caption className="sr-only">جدول التقديرات ونقاطها من 5 ومن 4</caption>
              <thead className="bg-navy text-white">
                <tr>
                  <th className="px-3 py-3 font-black">الدرجة</th>
                  <th className="px-3 py-3 font-black">رمز التقدير</th>
                  <th className="px-3 py-3 font-black">التقدير</th>
                  <th className="px-3 py-3 font-black">النقاط من 5</th>
                  <th className="px-3 py-3 font-black">النقاط من 4</th>
                </tr>
              </thead>
              <tbody>
                {SAUDI_GRADES.map((g) => (
                  <tr key={g.letter} className="border-t border-gray-100 even:bg-gray-50">
                    <td className="px-3 py-2.5">{g.range}</td>
                    <td className="px-3 py-2.5 font-black" dir="ltr">{g.letter}</td>
                    <td className="px-3 py-2.5">{g.label}</td>
                    <td className="px-3 py-2.5">{g.p5.toFixed(2)}</td>
                    <td className="px-3 py-2.5">{g.p4.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className={h2}>طريقة حساب المعدل الفصلي (مع مثال)</h2>
          <p className={p}>
            المعدل الفصلي هو متوسط نقاطك في الفصل موزونًا بعدد ساعات كل مقرر. اضرب نقاط تقدير كل مقرر في عدد ساعاته لتحصل على نقاط المقرر، ثم اجمع نقاط المقررات كلها واقسمها على مجموع الساعات.
          </p>
          <div className="mt-5 rounded-2xl bg-white border border-gray-200 p-5 space-y-2 text-[16px] text-navy">
            <p className="font-black">مثال من 5:</p>
            <p>مقرر 3 ساعات بتقدير A: ‏3 × 4.75 = 14.25 نقطة</p>
            <p>مقرر 4 ساعات بتقدير B+: ‏4 × 4.50 = 18 نقطة</p>
            <p>مقرر ساعتان بتقدير C: ‏2 × 3.00 = 6 نقاط</p>
            <p className="font-black pt-1">المعدل الفصلي = (14.25 + 18 + 6) ÷ 9 = 38.25 ÷ 9 = 4.25 من 5، بتقدير جيد جدًا</p>
            <p className="text-gray-600 pt-1">والمثال نفسه في نظام 4 نقاط: (11.25 + 14 + 4) ÷ 9 = 3.25 من 4، بتقدير جيد جدًا أيضًا.</p>
          </div>
        </section>

        <section>
          <h2 className={h2}>طريقة حساب المعدل التراكمي</h2>
          <p className={p}>
            المعدل التراكمي يجمع كل الفصول التي درستها. احسب نقاطك السابقة بضرب معدلك التراكمي في ساعاتك المجتازة، ثم أضف إليها نقاط الفصل الجديد، واقسم المجموع على مجموع الساعات كلها.
          </p>
          <div className="mt-5 rounded-2xl bg-white border border-gray-200 p-5 space-y-2 text-[16px] text-navy">
            <p className="font-black">مثال:</p>
            <p>معدلك التراكمي السابق 4.10 على 60 ساعة: ‏4.10 × 60 = 246 نقطة</p>
            <p>نقاط الفصل الحالي من المثال السابق: 38.25 نقطة على 9 ساعات</p>
            <p className="font-black pt-1">المعدل التراكمي الجديد = (246 + 38.25) ÷ (60 + 9) = 284.25 ÷ 69 = 4.12 من 5</p>
          </div>
          <p className={`${p} mt-4`}>
            لاحظ أن الفصل الجيد يرفع المعدل التراكمي ببطء إذا كانت ساعاتك السابقة كثيرة، لذلك تزداد أهمية المقررات ذات الساعات الكثيرة كلما تقدمت في دراستك.
          </p>
        </section>

        <section>
          <h2 className={h2}>التقدير العام حسب المعدل التراكمي</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {([5, 4] as const).map((s) => (
              <div key={s} className="rounded-2xl bg-white border border-gray-200 p-5">
                <p className="font-black text-navy mb-3">نظام {s} نقاط</p>
                <ul className="space-y-2 text-[16px] text-gray-700">
                  {GPA_BANDS[s].map((b) => (
                    <li key={b.label} className="flex justify-between gap-3">
                      <span className="font-bold text-navy">{b.label}</span>
                      <span>{b.range}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className={`${p} mt-4`}>
            وتمنح كثير من الجامعات مرتبة الشرف الأولى لمعدل 4.75 فأعلى من 5 (3.75 من 4)، والثانية لمعدل من 4.25 إلى أقل من 4.75 من 5، بشروط تحددها لائحة كل جامعة، مثل عدم الرسوب في أي مقرر.
          </p>
        </section>

        <section>
          <h2 className={h2}>كيف ترفع معدلك التراكمي؟</h2>
          <ul className="space-y-3">
            {[
              'ابدأ بالمقررات ذات الساعات الكثيرة، فهي الأكثر تأثيرًا في معدلك.',
              'اقرأ وصف كل واجب ومعايير تقييمه قبل البدء، فكثير من الدرجات تضيع بسبب معيار لم يُلتفت إليه.',
              'وزّع الواجبات والبحوث على الفصل بدل تأجيلها إلى الأسبوع الأخير.',
              'استفد من ملاحظات الأساتذة على الواجبات السابقة، فهي تتكرر غالبًا في الواجبات التالية.',
              'اطلب المساعدة مبكرًا في المقرر الذي تجد فيه صعوبة، قبل أن يؤثر على معدلك.',
            ].map((tip) => (
              <li key={tip} className="flex gap-3">
                <span className="mt-2.5 w-2 h-2 rounded-full bg-primary shrink-0" />
                <span className={p}>{tip}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-2xl bg-white border border-gray-200 p-5">
            <p className="text-[16px] text-gray-700 leading-loose">
              يقدم فريق FIZBS دعمًا أكاديميًا أونلاين لطلاب الجامعات في السعودية: شرح المقررات، وتنظيم الواجبات والبحوث، ومراجعة المسودات، والتحليل الإحصائي. تبدأ المساعدة في الواجبات من 100 ريال لكل 1,000 كلمة.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { label: 'المساعدة في الواجبات الجامعية', href: '/ar/assignment-help-saudi-arabia' },
                { label: 'المساعدة في خطة البحث', href: '/ar/research-proposal-help' },
                { label: 'التحليل الإحصائي SPSS', href: '/ar/spss-help' },
                { label: 'أدلة الطلاب', href: '/ar/blog' },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-bold text-navy hover:border-primary hover:text-primary transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>

      <FaqSection faqs={AR_GPA_FAQS} title="أسئلة شائعة عن حساب المعدل" badge="أسئلة شائعة" rtl className="bg-white" />
    </main>
  );
}
