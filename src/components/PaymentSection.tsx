import { Landmark, ShieldCheck, Lock, MessageCircle } from 'lucide-react';
import { PAYMENT } from '@/constants/payment';

function MethodBadge({ code }: { code: string }) {
  const isUk = code === 'UK';
  return (
    <span
      aria-hidden="true"
      className={`relative shrink-0 flex items-center justify-center w-16 h-16 rounded-2xl text-white font-black text-sm shadow-lg ${
        isUk ? 'bg-gradient-to-br from-[#1a2f5e] to-[#0f1f3d]' : 'bg-gradient-to-br from-[#0f7a3d] to-[#0b5a2d]'
      }`}
    >
      <Landmark className="w-7 h-7 opacity-25 absolute" />
      <span className="relative">{code}</span>
    </span>
  );
}

/** "Pay 50% now, 50% on completion" section with the accepted bank transfer methods. */
export default function PaymentSection({ locale = 'en', className = 'bg-white' }: { locale?: 'en' | 'ar'; className?: string }) {
  const p = PAYMENT[locale];
  const isAr = locale === 'ar';

  return (
    <section id="payment" className={`py-16 md:py-24 ${className}`} dir={isAr ? 'rtl' : undefined}>
      <div className="max-w-site mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 bg-primary/10 text-primary">
            <Lock className="w-3 h-3" /> {p.section.badge}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight mb-4">{p.section.title}</h2>
          <p className="max-w-2xl mx-auto text-gray-500 text-base md:text-lg leading-relaxed">{p.section.subtitle}</p>
          <div className="h-1 w-16 rounded-full bg-gradient-to-r from-primary to-[#E0BC4A] mt-6 mx-auto" />
        </div>

        {/* 50 / 50 journey */}
        <div className="relative max-w-5xl mx-auto mb-14">
          <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-1.5 rounded-full bg-gradient-to-r from-primary via-[#E0BC4A] to-primary opacity-30" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {p.section.steps.map((step, i) => (
              <div key={step.title} className="text-center">
                <div
                  className={`mx-auto mb-5 w-20 h-20 rounded-full flex items-center justify-center font-black text-xl shadow-xl ring-8 ${
                    i === 1 ? 'bg-white text-primary ring-primary/10 border-2 border-primary/20' : 'icon-gradient ring-primary/10'
                  }`}
                >
                  {step.pct}
                </div>
                <h3 className="text-navy font-extrabold text-lg mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {p.methods.map((m) => (
            <div
              key={m.code}
              className="group relative overflow-hidden flex items-start gap-5 p-6 md:p-7 rounded-3xl bg-white border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              <span className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors" />
              <MethodBadge code={m.code} />
              <div className="relative">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <h3 className="text-navy font-extrabold text-lg">{m.title}</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-navy text-white text-[11px] font-black">{m.currency}</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-gray-500">
          <span className="inline-flex items-center gap-2 font-bold text-navy">
            <ShieldCheck className="w-5 h-5 text-primary" /> {p.split}
          </span>
          <span className="hidden sm:inline text-gray-300">|</span>
          <span className="inline-flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-primary" /> {p.section.note}
          </span>
        </div>
      </div>
    </section>
  );
}
