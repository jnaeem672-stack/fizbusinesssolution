import Link from 'next/link';
import { Instagram, Facebook, Mail, Landmark, ShieldCheck } from 'lucide-react';
import { SOCIAL_LINKS } from '@/constants/social';
import Logo from './Logo';
import WhatsAppLink from '@/components/ui/WhatsAppLink';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { buildWhatsAppUrl, WHATSAPP_NUMBER } from '@/constants/whatsapp';
import { CONTACT_EMAIL, MAILTO_URL } from '@/constants/contact';
import { AR_CITY_LINKS, AR_SERVICE_LINKS, AR_TECH_LINKS } from '@/constants/arLinks';
import { PAYMENT } from '@/constants/payment';

const AR_WHATSAPP_URL = buildWhatsAppUrl('مرحبًا FIZBS، أرغب في مناقشة واجبي.');

const COLUMNS = [
  { title: 'خدماتنا بالعربية', links: AR_SERVICE_LINKS },
  { title: 'برامج التصميم والهندسة والبرمجة', links: AR_TECH_LINKS },
  { title: 'ندعم الطلاب في مدن المملكة', links: AR_CITY_LINKS },
];

/** Footer for the Arabic pages: Arabic text and links to the Arabic pages */
const ArFooter = () => (
  <footer dir="rtl" lang="ar" className="bg-navy py-10 md:py-12 px-4 md:px-8 flex flex-col items-center text-white/50 text-[12px] shrink-0 border-t border-white/5 space-y-6">
    <div className="flex flex-col items-center gap-4">
      <Logo dark href="/ar" lang="ar" />
      <p className="text-center max-w-2xl leading-relaxed text-white/60">
        مساعدة في الواجبات الجامعية والرسائل العلمية والبحوث لطلاب السعودية والخليج وبريطانيا منذ عام 2015، مع خبراء متخصصين وأسعار واضحة ودعم عبر واتساب على مدار الساعة.
      </p>
      <p className="text-center max-w-md leading-relaxed">
        © {new Date().getFullYear()} FIZ Business Solutions. جميع الحقوق محفوظة.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 w-full max-w-5xl pt-2 text-[13px]">
      {COLUMNS.map((col) => (
        <div key={col.title}>
          <h2 className="text-white font-black text-[12px] mb-3">{col.title}</h2>
          <ul className="space-y-2">
            {col.links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-white/60 hover:text-white transition-colors">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div>
        <h2 className="text-white font-black text-[12px] mb-3">روابط مهمة</h2>
        <ul className="space-y-2">
          <li><Link href="/ar" className="text-white/60 hover:text-white transition-colors">الصفحة الرئيسية</Link></li>
          <li><Link href="/ar/blog" className="text-white/60 hover:text-white transition-colors">أدلة مجانية للطلاب</Link></li>
          <li><Link href="/ar/gpa-calculator" className="text-white/60 hover:text-white transition-colors">حساب المعدل التراكمي</Link></li>
          <li><Link href="/ar#quote" className="text-white/60 hover:text-white transition-colors">اعرف السعر</Link></li>
          <li><Link href="/" hrefLang="en" className="text-white/60 hover:text-white transition-colors">English website</Link></li>
        </ul>
      </div>
    </div>

    <div className="w-full max-w-3xl flex flex-wrap items-center justify-center gap-3 py-4 border-y border-white/10">
      <span className="text-white font-black text-[12px]">طرق الدفع</span>
      {PAYMENT.ar.methods.map((m) => (
        <span key={m.code} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-navy text-xs font-black whitespace-nowrap">
          <Landmark className="w-4 h-4 text-primary" /> {m.title} · {m.currency}
        </span>
      ))}
      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-bold whitespace-nowrap">
        <ShieldCheck className="w-4 h-4 text-primary" /> {PAYMENT.ar.split}
      </span>
    </div>

    <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-8 w-full max-w-lg">
      <WhatsAppLink href={AR_WHATSAPP_URL} className="flex items-center gap-2 text-white/70 font-bold hover:text-[#25D366] transition-colors text-center">
        <WhatsAppIcon size={16} className="w-4 h-4" />
        واتساب: <span dir="ltr">{WHATSAPP_NUMBER}</span>
      </WhatsAppLink>
      <a href={MAILTO_URL} className="flex items-center gap-2 text-white/70 font-bold hover:text-primary transition-colors text-center break-all">
        <Mail className="w-4 h-4 text-primary shrink-0" />
        <span dir="ltr">{CONTACT_EMAIL}</span>
      </a>
    </div>

    <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 pt-4 border-t border-white/5 w-full max-w-3xl text-[11px] font-bold [&>a]:inline-flex [&>a]:items-center [&>a]:min-h-6">
      <Link href="/ar" className="hover:text-white transition-colors">الرئيسية</Link>
      <Link href="/ar/blog" className="hover:text-white transition-colors">أدلة الطلاب</Link>
      <Link href="/terms" hrefLang="en" className="hover:text-white transition-colors">الشروط والأحكام (بالإنجليزية)</Link>
      <Link href="/privacy-policy" hrefLang="en" className="hover:text-white transition-colors">سياسة الخصوصية (بالإنجليزية)</Link>
    </div>

    <div className="flex gap-3">
      {SOCIAL_LINKS.map(({ label, href }) => {
        const Icon = label === 'Facebook' ? Facebook : Instagram;
        return (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`FIZBS على ${label}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-[#C9A227] hover:text-[#0B1D3A] transition-colors"
          >
            <Icon className="w-4 h-4" />
          </a>
        );
      })}
    </div>
  </footer>
);

export default ArFooter;
