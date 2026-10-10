'use client';

import MarqueeBanner from '@/components/MarqueeBanner';
import Navbar from '@/components/Navbar';

/** Fixed header (offer bar + WhatsApp Order + nav) that stays on screen on every page. */
export default function SiteHeader() {
  return (
    <>
      <header className="fixed top-0 inset-x-0 z-[10005] w-full">
        <MarqueeBanner />
        <Navbar />
      </header>
      {/* Spacer so page content starts below the fixed header (40px bar + 70px nav) */}
      <div aria-hidden="true" className="h-[110px] shrink-0" />
    </>
  );
}
