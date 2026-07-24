import type { Metadata } from 'next';
import PrivacyPolicyPage from '@/components/pages/PrivacyPolicyPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read how FIZ Business Solutions collects, uses, stores, and protects personal information and permitted learning materials.',
  alternates: { canonical: 'https://fizbusinesssolutions.com/privacy-policy' },
};

export default function Page() {
  return <PrivacyPolicyPage />;
}
