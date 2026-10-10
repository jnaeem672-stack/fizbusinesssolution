import type { Metadata } from 'next';
import HomePage from '@/components/pages/HomePage';

export const metadata: Metadata = {
  title: { absolute: 'Assignment Help & Dissertation Help UK & Saudi Arabia | FIZBS' },
  description:
    'Assignment and dissertation help for UK and Saudi students from qualified experts. Instant price from £20 per 1,000 words and 10% off your first order.',
  alternates: {
    canonical: 'https://fizbusinessolutions.com/',
    languages: { 'en-GB': 'https://fizbusinessolutions.com/', 'ar-SA': 'https://fizbusinessolutions.com/ar' },
  },
  openGraph: {
    title: 'Assignment Help & Dissertation Help UK & Saudi Arabia | FIZBS',
    description:
      'Expert assignment and dissertation help from qualified subject specialists. Instant price, 10% off your first order and 24/7 WhatsApp support.',
    url: 'https://fizbusinessolutions.com',
  },
};

export default function Page() {
  return (
    <HomePage />
  );
}
