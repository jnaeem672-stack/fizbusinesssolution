import type { Metadata } from 'next';
import ContactPage from '@/components/pages/ContactPage';

export const metadata: Metadata = {
  title: { absolute: 'Contact FIZBS | Assignment & Dissertation Help' },
  description: 'Contact FIZBS for assignment help, dissertation help, research proposal help and proofreading. Get a free quote on WhatsApp 24/7.',
  alternates: { canonical: 'https://fizbusinessolutions.com/contact' },
};

export default function Page() {
  return (
    <ContactPage />
  );
}
