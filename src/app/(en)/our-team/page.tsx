import type { Metadata } from 'next';
import OurTeamPage from '@/components/pages/OurTeamPage';

export const metadata: Metadata = {
  title: { absolute: 'Our Team: Founders & Specialists | FIZBS' },
  description:
    'Meet the FIZBS team: co-founders Sajjad Akbar Ali (MBA, researcher since 2015) and Fawad Hussain Khan (MPhil), with a Chartered Accountant and specialists.',
  alternates: { canonical: 'https://fizbusinessolutions.com/our-team' },
};

export default function Page() {
  return <OurTeamPage />;
}
