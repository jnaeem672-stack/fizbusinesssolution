export type TeamIcon = 'research' | 'media' | 'calculator' | 'chart';

export interface TeamMember {
  name: string;
  initials: string;
  role: string;
  qualification: string;
  highlights: string[];
  bio: string;
  icon: TeamIcon;
  /** Tailwind gradient classes for the avatar */
  gradient: string;
  group: 'founders' | 'senior' | 'academic';
}

/** Real FIZBS team members, as provided by the founders. Do not add people who do not work with FIZBS. */
export const TEAM: TeamMember[] = [
  {
    name: 'Sajjad Akbar Ali',
    initials: 'SA',
    role: 'Co-Founder',
    qualification: 'MBA',
    highlights: ['Professional researcher since 2015', '20 published articles', 'Research & academic writing'],
    bio: 'Sajjad has worked as a professional researcher since 2015 and co-founded FIZ Business Solutions to give students clear, reliable academic support. With an MBA and 20 published articles, he brings hands-on research experience to research proposals, dissertations, articles and proofreading.',
    icon: 'research',
    gradient: 'from-[#C41E3A] to-[#e8455f]',
    group: 'founders',
  },
  {
    name: 'Fawad Hussain Khan',
    initials: 'FK',
    role: 'Co-Founder',
    qualification: 'MPhil Mass Communication',
    highlights: ['MPhil in Mass Communication', 'Co-founder of FIZBS', 'Communication & media studies'],
    bio: 'Fawad co-founded FIZ Business Solutions and holds an MPhil in Mass Communication. He brings a strong background in communication and media studies to the FIZBS team.',
    icon: 'media',
    gradient: 'from-[#0f1f3d] to-[#2d4a8a]',
    group: 'founders',
  },
  {
    name: 'Abdul Rehman',
    initials: 'AR',
    role: 'Senior Finance & Accounting Expert',
    qualification: 'Chartered Accountant (CA)',
    highlights: ['Chartered Accountant (CA)', '10 years with FIZBS', 'Finance, accounting & auditing'],
    bio: 'Abdul Rehman is a Chartered Accountant who has worked with FIZBS for 10 years. He supports finance and accounting work such as financial statements, ratio analysis, auditing, taxation and investment appraisal for Bachelor’s, Master’s and MBA students.',
    icon: 'calculator',
    gradient: 'from-[#0f7a3d] to-[#14a352]',
    group: 'senior',
  },
  {
    name: 'Naeem',
    initials: 'N',
    role: 'Business Assignment Specialist',
    qualification: 'MPhil Accounting & Finance',
    highlights: ['MPhil Accounting & Finance', 'Business assignments'],
    bio: 'Naeem holds an MPhil in Accounting and Finance and supports students with business, finance and accounting assignments.',
    icon: 'chart',
    gradient: 'from-[#7c3aed] to-[#a855f7]',
    group: 'academic',
  },
  {
    name: 'Hadia',
    initials: 'H',
    role: 'Business Assignment Specialist',
    qualification: 'MPhil Accounting & Finance',
    highlights: ['MPhil Accounting & Finance', 'Business assignments'],
    bio: 'Hadia holds an MPhil in Accounting and Finance and supports students with business, finance and accounting assignments.',
    icon: 'chart',
    gradient: 'from-[#db2777] to-[#f472b6]',
    group: 'academic',
  },
  {
    name: 'Hafiza Ayesha',
    initials: 'HA',
    role: 'Business Assignment Specialist',
    qualification: 'MPhil Accounting & Finance',
    highlights: ['MPhil Accounting & Finance', 'Business assignments'],
    bio: 'Hafiza Ayesha holds an MPhil in Accounting and Finance and supports students with business, finance and accounting assignments.',
    icon: 'chart',
    gradient: 'from-[#ea580c] to-[#fb923c]',
    group: 'academic',
  },
];
