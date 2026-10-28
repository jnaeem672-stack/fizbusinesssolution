import Script from "next/script";
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import localFont from 'next/font/local';
import Providers from '@/components/Providers';
import SiteHeader from '@/components/SiteHeader';
import DeferredWidgets from '@/components/DeferredWidgets';
import LeadSourceTracker from '@/components/LeadSourceTracker';
import { PERSON_PROFILES, SOCIAL_URLS } from '@/constants/social';
import { UK_ADDRESS, UK_PHONE_E164 } from '@/constants/contact';

// Self-hosted heading font (was a render-blocking Google Fonts @import)
const jakarta = localFont({
  src: '../fonts/plus-jakarta-sans-latin.woff2',
  weight: '200 800',
  display: 'swap',
  variable: '--font-jakarta',
});

// Arabic font (Cairo, OFL). The unicode-range limits it to Arabic letters, so English text
// keeps its current fonts. Not preloaded: English visitors never download it.
const cairoArabic = localFont({
  src: '../fonts/cairo-arabic-wght.woff2',
  weight: '200 1000',
  display: 'swap',
  variable: '--font-arabic',
  preload: false,
  adjustFontFallback: false,
  declarations: [
    { prop: 'unicode-range', value: 'U+0600-06FF, U+0750-077F, U+0870-088E, U+0890-0891, U+0897-08E1, U+08E3-08FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE70-FE74, U+FE76-FEFC' },
  ],
});

/** The default share image (app/opengraph-image.tsx) for pages that have no image of their own */
export const DEFAULT_SHARE_IMAGE = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: 'FIZBS: Assignment & Dissertation Help UK & Saudi Arabia',
  type: 'image/png',
};

/** Share image for the Arabic pages (public/og/ar-share.png; source in marketing/brand/og/ar-share.html) */
export const AR_SHARE_IMAGE = {
  url: '/og/ar-share.png',
  width: 1200,
  height: 630,
  alt: 'FIZBS: واجبك وبحثك ورسالتك مع خبير في تخصصك عبر واتساب',
  type: 'image/png',
};

/** Site-wide defaults; each page sets its own title, description and alternates on top */
export const SITE_METADATA: Metadata = {
  metadataBase: new URL('https://fizbusinessolutions.com'),
  title: {
    default: 'Assignment & Dissertation Help UK & Saudi Arabia | FIZ Business Solutions',
    template: '%s | FIZ Business Solutions',
  },
  description:
    'Assignment help and dissertation help for UK and Saudi Arabian university students. Essays, reports, research proposals, SPSS data analysis and proofreading from qualified experts. From £20 per 1,000 words, 10% off your first order.',
  keywords: [
    'assignment help',
    'assignment help UK',
    'dissertation help',
    'dissertation help UK',
    'assignment help Saudi Arabia',
    'MBA assignment help',
    'business assignment help',
    'essay help UK',
    'research proposal help',
    'thesis help',
    'SPSS help',
    'proofreading service UK',
  ],
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-icon', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'FIZ Business Solutions',
    // The default share image (app/opengraph-image.tsx). Named here because, with separate English and
    // Arabic root layouts, an image file at the top of app/ is no longer picked up by the pages by itself.
    images: [DEFAULT_SHARE_IMAGE],
  },
  twitter: { card: 'summary_large_image' },
};

/**
 * The whole HTML document, shared by the English root layout (app/(en)/layout.tsx), the Arabic root
 * layout (app/ar/layout.tsx) and the 404 page for unmatched addresses (app/global-not-found.tsx).
 * Each language has its own root layout so the server sends the right lang and dir in the first HTML.
 * The Google Ads tag, the consent defaults and the Ahrefs script below are the same for every page.
 */
export default function RootDocument({
  lang,
  footer,
  children,
  arabicFontVariable,
}: {
  lang: 'en' | 'ar';
  footer: ReactNode;
  children: ReactNode;
  /** The Arabic layout passes its preloaded Cairo font here (app/ar/fonts.ts) */
  arabicFontVariable?: string;
}) {
  return (
    <html
      lang={lang}
      dir={lang === 'ar' ? 'rtl' : undefined}
      className={`${jakarta.variable} ${arabicFontVariable ?? cairoArabic.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              '@id': 'https://fizbusinessolutions.com/#organization',
              name: 'FIZ Business Solutions',
              alternateName: ['FIZBS', 'FIZ Business Solution'],
              url: 'https://fizbusinessolutions.com',
              logo: 'https://fizbusinessolutions.com/apple-icon',
              description: 'Assignment and dissertation guidance for students in the UK, Saudi Arabia, the UAE and the USA, supporting students since 2015.',
              foundingDate: '2015',
              sameAs: SOCIAL_URLS,
              founder: [
                { '@type': 'Person', name: 'Sajjad Akbar Ali', jobTitle: 'Co-Founder', url: 'https://fizbusinessolutions.com/experts/sajjad-akbar-ali', sameAs: PERSON_PROFILES['sajjad-akbar-ali'] },
                { '@type': 'Person', name: 'Fawad Hussain Khan', jobTitle: 'Co-Founder', url: 'https://fizbusinessolutions.com/experts/fawad-hussain-khan' },
              ],
              email: 'info@fizbusinessolutions.com',
              knowsAbout: [
                'Business and management',
                'MBA',
                'Marketing',
                'Finance and accounting',
                'Human resource management',
                'Economics',
                'Healthcare and nursing',
                'Education',
                'Psychology',
                'Computing and IT',
                'Research methods',
                'SPSS and data analysis',
                'Harvard and APA referencing',
                'CIPD, CMI, HND and OTHM qualifications',
              ],
              areaServed: ['United Kingdom', 'Saudi Arabia', 'United Arab Emirates', 'United States'],
              address: {
                '@type': 'PostalAddress',
                streetAddress: UK_ADDRESS.street,
                addressLocality: UK_ADDRESS.locality,
                addressRegion: UK_ADDRESS.region,
                postalCode: UK_ADDRESS.postalCode,
                addressCountry: UK_ADDRESS.countryCode,
              },
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  telephone: UK_PHONE_E164,
                  contactType: 'customer support',
                  areaServed: 'GB',
                  availableLanguage: ['English'],
                },
                {
                  '@type': 'ContactPoint',
                  telephone: '+971543800388',
                  contactType: 'customer support',
                  availableLanguage: ['English', 'Arabic'],
                },
              ],
            }),
          }}
        />
        {/* Ahrefs Web Analytics: cookieless, no personal data. Separate from the Google Ads tag below. */}
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="TxLBMbGB1JMz1MncuJJ6UA" async></script>
      </head>
      <body className="antialiased">
        <Script
  src="https://www.googletagmanager.com/gtag/js?id=AW-18496017210"
  strategy="afterInteractive"
/>
<Script id="google-ads-tag" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;

    // Consent Mode: UK, EEA and Switzerland start as denied
    gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
      region: ['GB','CH','IS','LI','NO','AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE'],
      wait_for_update: 500
    });
    // Everywhere else starts as granted
    gtag('consent', 'default', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted'
    });

    // Apply the visitor's saved choice
    try {
      var choice = localStorage.getItem('cookie-consent');
      if (choice === 'accepted' || choice === 'declined') {
        var v = choice === 'accepted' ? 'granted' : 'denied';
        gtag('consent', 'update', {
          ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v
        });
      }
    } catch (e) {}

    gtag('js', new Date());
    gtag('config', 'AW-18496017210');
  `}
</Script>
        <Providers>
          <SiteHeader />
          {children}
          {footer}
          <DeferredWidgets />
          <LeadSourceTracker />
        </Providers>
      </body>
    </html>
  );
}
