import Script from "next/script";
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import Providers from '@/components/Providers';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import CookieConsent from '@/components/CookieConsent';
import ScrollToTopButton from '@/components/ScrollToTopButton';

export const metadata: Metadata = {
  metadataBase: new URL('https://fizbusinesssolutions.com'),
  title: {
    default: 'Ethical Academic Coaching & Research Support | FIZ Business Solutions',
    template: '%s | FIZ Business Solutions',
  },
  description:
    'Ethical academic coaching, research-methods tutoring, draft feedback, proofreading, referencing support, data-analysis tutoring, and professional communication support.',
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
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'FIZ Business Solutions',
              url: 'https://fizbusinesssolutions.com',
              logo: 'https://fizbusinesssolutions.com/apple-icon',
              description: 'Ethical academic coaching, research guidance, proofreading, developmental feedback, and professional communication support.',
              serviceType: [
                'Academic coaching',
                'Research methods tutoring',
                'Draft feedback',
                'Proofreading',
                'Referencing support',
                'Data analysis tutoring',
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
          <FloatingWhatsApp />
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}
