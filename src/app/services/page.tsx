import type { Metadata } from 'next';
import ServicesPage from '@/components/pages/ServicesPage';

export const metadata: Metadata = {
  title: 'Assignment Help, Dissertation Help & Proofreading Services',
  description: 'All FIZBS services: assignment help, essay help, dissertation and thesis help, research proposal help, SPSS and NVivo data analysis, proofreading and referencing for UK and Saudi students.',
  alternates: { canonical: 'https://fizbusinessolutions.com/services' },
};

export default function Page() {
  return (
    <ServicesPage />
  );
}
