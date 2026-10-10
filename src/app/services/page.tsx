import type { Metadata } from 'next';
import ServicesPage from '@/components/pages/ServicesPage';

export const metadata: Metadata = {
  title: { absolute: 'Assignment, Dissertation & Proofreading Services | FIZBS' },
  description: 'FIZBS services: assignment, essay, dissertation and research proposal help, SPSS and NVivo analysis, proofreading and referencing for UK and Saudi students.',
  alternates: { canonical: 'https://fizbusinessolutions.com/services' },
};

export default function Page() {
  return (
    <ServicesPage />
  );
}
