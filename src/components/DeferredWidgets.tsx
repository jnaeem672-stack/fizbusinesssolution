'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { afterFirstPaint } from '@/lib/afterFirstPaint';

// Floating buttons and the cookie notice render nothing in the server HTML and appear after a delay anyway,
// so their code loads after the first paint (T7, 25 Oct 2026). They behave exactly as before once loaded.
const ScrollToTopButton = dynamic(() => import('@/components/ScrollToTopButton'), { ssr: false });
const FloatingDiscount = dynamic(() => import('@/components/FloatingDiscount'), { ssr: false });
const FloatingWhatsApp = dynamic(() => import('@/components/FloatingWhatsApp'), { ssr: false });
const CookieConsent = dynamic(() => import('@/components/CookieConsent'), { ssr: false });

export default function DeferredWidgets() {
  const [ready, setReady] = useState(false);

  useEffect(() => afterFirstPaint(() => setReady(true), 600), []);

  if (!ready) return null;
  return (
    <>
      <ScrollToTopButton />
      <FloatingDiscount />
      <FloatingWhatsApp />
      <CookieConsent />
    </>
  );
}
