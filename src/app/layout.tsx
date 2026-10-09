import Script from "next/script";
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import localFont from 'next/font/local';
import './globals.css';
import Providers from '@/components/Providers';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import FloatingDiscount from '@/components/FloatingDiscount';
import CookieConsent from '@/components/CookieConsent';
import ScrollToTopButton from '@/components/ScrollToTopButton';

// Self-hosted heading font (was a render-blocking Google Fonts @import)
const jakarta = localFont({
  src: '../fonts/plus-jakarta-sans-latin.woff2',
  weight: '200 800',
  display: 'swap',
  variable: '--font-jakarta',
});

export const metadata: Metadata = {
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
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'FIZ Business Solutions',
              url: 'https://fizbusinessolutions.com',
              logo: 'https://fizbusinessolutions.com/apple-icon',
              description: 'Assignment help and dissertation help for students in the UK and Saudi Arabia since 2015.',
              foundingDate: '2015',
              founder: [
                { '@type': 'Person', name: 'Sajjad Akbar Ali' },
                { '@type': 'Person', name: 'Fawad Hussain Khan' },
              ],
              areaServed: ['United Kingdom', 'Saudi Arabia', 'United Arab Emirates'],
              priceRange: '£20 - £350',
              serviceType: [
                'Assignment help',
                'Dissertation help',
                'Essay help',
                'Research proposal help',
                'Thesis help',
                'Data analysis help',
                'Proofreading and editing',
                'Referencing help',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+971543800388',
                contactType: 'customer support',
                availableLanguage: 'English',
              },
            }),
          }}
        />
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
          <Footer />
          <ScrollToTopButton />
          <FloatingDiscount />
          <FloatingWhatsApp />
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}
