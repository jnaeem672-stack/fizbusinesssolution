import { ShieldCheck, UserCheck, BookMarked, Clock3, Award, Wallet, type LucideIcon } from 'lucide-react';

type Badge = { icon: LucideIcon; label: string; sub: string };

/** Only promises FIZBS already makes elsewhere on the site. */
const BADGES: Record<'en' | 'ar', Badge[]> = {
  en: [
    { icon: ShieldCheck, label: '100% Confidential', sub: 'Your details stay private' },
    { icon: UserCheck, label: 'Real Human Experts', sub: "Master's & PhD qualified" },
    { icon: BookMarked, label: 'Proper Referencing', sub: 'Harvard, APA & OSCOLA' },
    { icon: Clock3, label: '24/7 Available', sub: 'Support on WhatsApp' },
    { icon: Award, label: 'Trusted Since 2015', sub: '10,000+ students helped' },
    { icon: Wallet, label: 'Pay 50% to Start', sub: 'Rest on completion' },
  ],
  ar: [
    { icon: ShieldCheck, label: 'سرية تامة 100%', sub: 'بياناتك محمية' },
    { icon: UserCheck, label: 'خبراء حقيقيون', sub: 'حملة ماجستير ودكتوراه' },
    { icon: BookMarked, label: 'توثيق صحيح', sub: 'Harvard وAPA وOSCOLA' },
    { icon: Clock3, label: 'متاحون 24/7', sub: 'دعم عبر واتساب' },
    { icon: Award, label: 'منذ 2015', sub: '+10,000 طالب' },
    { icon: Wallet, label: 'ادفع 50% للبدء', sub: 'والباقي عند التسليم' },
  ],
};

export default function TrustBadges({ locale = 'en' }: { locale?: 'en' | 'ar' }) {
  const isAr = locale === 'ar';
  return (
    <ul
      dir={isAr ? 'rtl' : undefined}
      aria-label={isAr ? 'لماذا FIZBS' : 'Why students trust FIZBS'}
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-10"
    >
      {BADGES[locale].map(({ icon: Icon, label, sub }) => (
        <li
          key={label}
          className="group relative flex flex-col items-center text-center gap-2.5 px-3 pt-5 pb-4 rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:border-primary/30 transition-all duration-300"
        >
          <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-navy via-primary to-navy opacity-80" />
          <span className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-navy to-navy-light shadow-lg shadow-navy/20 group-hover:from-primary group-hover:to-[#E0BC4A] transition-colors duration-300">
            <Icon className="w-6 h-6 text-white" strokeWidth={2.2} />
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary ring-2 ring-white" />
          </span>
          <span className="text-[13px] md:text-sm font-extrabold text-navy leading-tight">{label}</span>
          <span className="text-[11px] text-gray-500 leading-snug">{sub}</span>
        </li>
      ))}
    </ul>
  );
}
