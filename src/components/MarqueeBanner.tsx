'use client';

import { useEffect, useRef, useState } from 'react';
import { QrCode, X } from 'lucide-react';
import WhatsAppLink from '@/components/ui/WhatsAppLink';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { buildWhatsAppUrl, WHATSAPP_NUMBER } from '@/constants/whatsapp';

const ORDER_URL = buildWhatsAppUrl("Hello FIZBS! I'd like to place an order.\nSubject: \nWord count: \nDeadline: ");

const MarqueeBanner = () => {
  const text =
    '🎁 First Order? Get Up To 10% OFF | 📞 Talk to an Expert on a WhatsApp Call | Assignment Help | Dissertation Help | Research Proposal Help | Proofreading & Editing | Harvard, APA & OSCOLA Referencing | 24/7 WhatsApp Support | ';
  const [showQr, setShowQr] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showQr) return;
    const close = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setShowQr(false);
    };
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setShowQr(false);
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', esc);
    };
  }, [showQr]);

  return (
    <div className="relative bg-primary h-[40px] flex items-center border-b border-white/10 shrink-0">
      <div className="flex-1 min-w-0 overflow-hidden h-full flex items-center">
        <div className="animate-marquee">
          <span className="text-white text-[13px] font-medium px-4 flex items-center">{text + text + text + text}</span>
        </div>
      </div>

      <div ref={boxRef} className="relative shrink-0 flex items-center gap-1.5 sm:gap-2 pl-2 pr-2 sm:pr-4 h-full bg-primary shadow-[-12px_0_12px_-4px_rgba(196,30,58,1)]">
        <WhatsAppLink
          href={ORDER_URL}
          aria-label="Order on WhatsApp"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-navy text-[11px] sm:text-xs font-black whitespace-nowrap hover:scale-[1.03] transition-transform"
        >
          <WhatsAppIcon size={15} className="w-[15px] h-[15px]" />
          <span>WhatsApp Order</span>
        </WhatsAppLink>
        <button
          type="button"
          onClick={() => setShowQr((v) => !v)}
          aria-expanded={showQr}
          aria-label="Show WhatsApp QR code"
          className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-white/40 text-white text-xs font-black whitespace-nowrap hover:bg-white/10"
        >
          <QrCode className="w-4 h-4" /> Scan QR
        </button>

        {showQr && (
          <div className="absolute right-2 sm:right-4 top-[46px] z-[1100] w-[260px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 text-center">
            <button
              type="button"
              onClick={() => setShowQr(false)}
              aria-label="Close"
              className="absolute top-2 right-2 p-1 rounded-full text-gray-400 hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </button>
            <p className="text-navy font-black text-sm mb-1">Scan to order on WhatsApp</p>
            <p className="text-gray-500 text-xs mb-3">Open your phone camera and point it at the code</p>
            <img src="/whatsapp-qr.png" alt="WhatsApp QR code to order from FIZBS" width={200} height={200} className="mx-auto rounded-lg" />
            <p className="text-navy font-bold text-sm mt-3">{WHATSAPP_NUMBER}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarqueeBanner;
