import type { Metadata } from 'next';
import PrivacyPolicyPage from '@/components/pages/PrivacyPolicyPage';

export const metadata: Metadata = {
  title: 'Privacy Policy | FizBussinessSolution',
  description:
    'Read how FizBussinessSolution collects, uses, and protects your personal information when you use our academic writing services.',
  alternates: { canonical: 'https://fizbussinesssolution.com/privacy-policy' },
};

export default function Page() {
  return <PrivacyPolicyPage />;
}
