import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, Calculator, BookOpen } from 'lucide-react';
import WhatsAppLink from '@/components/ui/WhatsAppLink';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { buildWhatsAppUrl } from '@/constants/whatsapp';
import { AR_SERVICE_LINKS } from '@/constants/arLinks';

export const AR_NOT_FOUND_METADATA: Metadata = {
  title: { absolute: 'الصفحة غير موجودة | FIZBS' },
  robots: { index: false, follow: true },
};

const AR_WHATSAPP_URL = buildWhatsAppUrl('مرحبًا FIZBS! وصلت إلى صفحة غير موجودة وأحتاج إلى مساعدة.');

/** Arabic 404 for /ar/*: keeps the visitor in the Arabic site with services, price and WhatsApp */
export default function ArNotFoundPage() {
  return (
    <main lang="ar" dir="rtl" className="bg-gray-50">
      <section className="relative overflow-hidden bg-navy">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-light" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C9A227_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 py-16 md:py-24 text-center">
          <p className="text-7xl md:text-8xl font-black text-primary mb-4">404</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">لم نجد هذه الصفحة</h1>
          <p className="text-gray-300 text-lg mb-8">
            ربما تغيّر الرابط أو كُتب بشكل غير صحيح. ما زال بإمكانك الحصول على مساعدة من خبرائنا في الواجبات والرسائل العلمية والبحوث.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
            <a href="/ar#quote" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary font-bold rounded-xl shadow-xl">
              <Calculator className="w-5 h-5" /> اعرف السعر الآن
            </a>
            <WhatsAppLink
              href={AR_WHATSAPP_URL}
              aria-label="تواصل عبر واتساب"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-navy font-bold rounded-xl shadow-xl"
            >
              <WhatsAppIcon size={24} className="w-6 h-6" /> تواصل عبر واتساب
            </WhatsAppLink>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl border border-gray-100 p-7">
            <h2 className="text-xl font-extrabold text-navy mb-4">خدماتنا بالعربية</h2>
            <ul className="space-y-2.5">
              {AR_SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-primary">
                    <ArrowLeft className="w-4 h-4 text-primary" /> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-3xl border border-gray-100 p-7">
            <h2 className="text-xl font-extrabold text-navy mb-4">روابط مفيدة</h2>
            <ul className="space-y-2.5 text-sm font-bold text-gray-600">
              <li><Link href="/ar" className="hover:text-primary">الصفحة الرئيسية</Link></li>
              <li><Link href="/ar/blog" className="inline-flex items-center gap-2 hover:text-primary"><BookOpen className="w-4 h-4 text-primary" /> أدلة مجانية للطلاب</Link></li>
              <li><Link href="/ar/gpa-calculator" className="hover:text-primary">حاسبة المعدل الجامعي</Link></li>
              <li><Link href="/" lang="en" dir="ltr" className="hover:text-primary">English</Link></li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
