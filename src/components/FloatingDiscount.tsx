'use client';

import { useEffect, useState, type MouseEvent } from 'react';
import { usePathname } from 'next/navigation';
import { Gift } from 'lucide-react';

/** Floating "first order discount" button, bottom-left (WhatsApp sits bottom-right). Opens the price calculator. */
export default function FloatingDiscount() {
  const pathname = usePathname() || '/';
  const isAr = pathname === '/ar' || pathname.startsWith('/ar/');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(t);
  }, []);

  const fallback = isAr ? '/ar#quote' : '/#quote';

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const calc = document.getElementById('quote');
    if (calc) {
      e.preventDefault();
      calc.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `${window.location.pathname}#quote`);
    }
  };

  return (
    <a
      href={fallback}
      onClick={handleClick}
      aria-label={isAr ? 'خصم حتى 10% على أول طلب' : 'Get up to 10% off your first order'}
      className={`group fixed z-[9997] left-4 sm:left-6 bottom-[5.25rem] sm:bottom-6 flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 rounded-full bg-gradient-to-r from-primary to-[#e8455f] text-white shadow-xl shadow-primary/40 ring-2 ring-white hover:scale-105 active:scale-95 transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <span className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-primary shadow-inner">
        <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-30" />
        <Gift className="relative w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform" strokeWidth={2.4} />
      </span>
      <span className="flex flex-col leading-none" dir={isAr ? 'rtl' : undefined}>
        <span className="text-[15px] sm:text-base font-black tracking-tight">{isAr ? 'خصم حتى 10%' : 'Up to 10% OFF'}</span>
        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white/85 mt-1">
          {isAr ? 'على أول طلب' : 'First Order'}
        </span>
      </span>
    </a>
  );
}
