import { CheckCircle2, PhoneCall } from 'lucide-react';
import WhatsAppLink from '@/components/ui/WhatsAppLink';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { EXPERT_CALL, expertCallUrl } from '@/constants/expertCall';

/** Original illustration: an expert with a headset on a WhatsApp call, in FIZBS brand colours. */
function CallIllustration() {
  return (
    <svg viewBox="0 0 420 360" className="w-full h-auto max-w-[440px]" role="img" aria-label="Expert on a WhatsApp call">
      <defs>
        <linearGradient id="ec-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0f1f3d" />
          <stop offset="1" stopColor="#2d4a8a" />
        </linearGradient>
        <linearGradient id="ec-shirt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C41E3A" />
          <stop offset="1" stopColor="#9b1730" />
        </linearGradient>
      </defs>
      <circle cx="200" cy="190" r="150" fill="url(#ec-bg)" />
      <circle cx="200" cy="190" r="150" fill="none" stroke="#C41E3A" strokeOpacity=".35" strokeWidth="2" strokeDasharray="6 10" />
      {/* body */}
      <path d="M95 340c8-62 52-96 105-96s97 34 105 96z" fill="url(#ec-shirt)" />
      <path d="M178 246l22 30 22-30" fill="none" stroke="#fff" strokeWidth="5" strokeLinejoin="round" />
      {/* neck + head */}
      <rect x="184" y="214" width="32" height="34" rx="10" fill="#e8b48f" />
      <ellipse cx="200" cy="170" rx="50" ry="56" fill="#f2c4a0" />
      <path d="M150 166c-4-44 22-70 52-70s54 22 50 66c-8-22-24-34-50-36-26 2-44 16-52 40z" fill="#1f2937" />
      <circle cx="182" cy="176" r="5" fill="#1f2937" />
      <circle cx="218" cy="176" r="5" fill="#1f2937" />
      <path d="M186 198q14 12 28 0" fill="none" stroke="#9b1730" strokeWidth="4" strokeLinecap="round" />
      {/* headset */}
      <path d="M142 172c0-40 26-68 58-68s58 28 58 68" fill="none" stroke="#111827" strokeWidth="9" strokeLinecap="round" />
      <rect x="132" y="160" width="20" height="36" rx="9" fill="#111827" />
      <rect x="248" y="160" width="20" height="36" rx="9" fill="#111827" />
      <path d="M142 194c0 22 14 32 38 30" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" />
      <circle cx="184" cy="224" r="7" fill="#111827" />
      {/* WhatsApp bubble */}
      <g transform="translate(286 52)">
        <path d="M44 0a44 44 0 0 0-38 66L0 88l23-6A44 44 0 1 0 44 0z" fill="#25D366" />
        <path d="M30 26c2-3 5-3 6 0l4 9c1 2 0 4-2 5l-3 3c3 7 9 13 16 16l3-3c1-2 3-3 5-2l9 4c3 1 3 4 0 6-4 5-10 6-16 4-13-5-22-14-27-27-2-6-1-12 5-15z" fill="#fff" />
      </g>
      {/* chat bubble */}
      <g transform="translate(24 70)">
        <rect width="118" height="58" rx="16" fill="#fff" />
        <path d="M86 58l14 16 2-16z" fill="#fff" />
        <rect x="16" y="16" width="70" height="8" rx="4" fill="#0f1f3d" />
        <rect x="16" y="32" width="86" height="8" rx="4" fill="#C41E3A" fillOpacity=".7" />
      </g>
      {/* sound waves */}
      <path d="M300 186q12 14 0 28M314 176q22 24 0 48" fill="none" stroke="#25D366" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export default function ExpertCallSection({
  locale = 'en',
  className = 'bg-white',
}: {
  locale?: 'en' | 'ar';
  className?: string;
}) {
  const c = EXPERT_CALL[locale];
  const isAr = locale === 'ar';

  return (
    <section id="expert-call" className={`py-16 md:py-24 overflow-hidden ${className}`} dir={isAr ? 'rtl' : undefined}>
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="order-2 lg:order-1 flex justify-center">
          <CallIllustration />
        </div>
        <div className="order-1 lg:order-2">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#25D366]/10 text-[#128C4A] text-xs font-black uppercase tracking-widest mb-4">
            <PhoneCall className="w-4 h-4" /> {c.eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy tracking-tight mb-4">{c.title}</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">{c.text}</p>
          <ul className="space-y-3 mb-8">
            {c.points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-navy font-semibold">
                <CheckCircle2 className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" /> {p}
              </li>
            ))}
          </ul>
          <WhatsAppLink
            href={expertCallUrl(locale)}
            aria-label={c.cta}
            className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-[#25D366] text-white font-bold rounded-xl text-lg shadow-xl shadow-[#25D366]/30 hover:brightness-105 hover:scale-[1.02] transition-all"
          >
            <WhatsAppIcon size={26} className="w-6 h-6 !text-white" /> {c.cta}
          </WhatsAppLink>
          <p className="text-gray-500 text-sm mt-3">{c.note}</p>
        </div>
      </div>
    </section>
  );
}
