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

export interface Specialist {
  name: string;
  qualification: string;
  university: string;
  year: number;
  expertise: string;
  experience: string;
  languages: string;
}

export interface SpecialistGroup {
  title: string;
  icon: TeamIcon;
  gradient: string;
  members: Specialist[];
}

/** Subject specialists, as provided by the founders (names shown with the members' agreement). */
export const SPECIALIST_GROUPS: SpecialistGroup[] = [
  {
    title: 'Business, Management & Marketing',
    icon: 'chart',
    gradient: 'from-[#C41E3A] to-[#e8455f]',
    members: [
      { name: 'Ahmed K.', qualification: 'MSc Management', university: 'University of Manchester, UK', year: 2012, expertise: 'Business Management, Strategy', experience: '10 years', languages: 'English, Urdu' },
      { name: 'Sara M.', qualification: 'PhD Marketing', university: 'University of Leeds, UK', year: 2016, expertise: 'Marketing, Consumer Behaviour', experience: '8 years', languages: 'English, Urdu' },
      { name: 'Daniel R.', qualification: 'MSc Finance', university: 'University of Warwick, UK', year: 2014, expertise: 'Finance, Investment Analysis', experience: '9 years', languages: 'English' },
      { name: 'Oliver T.', qualification: 'MSc Business Analytics', university: 'University of Southampton, UK', year: 2015, expertise: 'Business Analytics, Statistics', experience: '8 years', languages: 'English' },
      { name: 'Nadia S.', qualification: 'MSc Human Resource Management', university: 'University of Birmingham, UK', year: 2011, expertise: 'HRM, Organisational Behaviour', experience: '12 years', languages: 'English, Urdu' },
      { name: 'James P.', qualification: 'MBA', university: 'Boston University, USA', year: 2011, expertise: 'Business Strategy, Entrepreneurship', experience: '12 years', languages: 'English' },
      { name: 'Arjun S.', qualification: 'MBA', university: 'University of Delhi, India', year: 2012, expertise: 'Marketing, Business Planning', experience: '11 years', languages: 'English, Hindi' },
      { name: 'Priya D.', qualification: 'PhD Management', university: 'Indian Institute of Technology Delhi, India', year: 2016, expertise: 'Leadership, Organisational Studies', experience: '8 years', languages: 'English, Hindi' },
    ],
  },
  {
    title: 'Economics, Statistics & Data Analysis',
    icon: 'calculator',
    gradient: 'from-[#0f7a3d] to-[#14a352]',
    members: [
      { name: 'Hannah B.', qualification: 'PhD Economics', university: 'University of Mannheim, Germany', year: 2017, expertise: 'Economics, Econometrics', experience: '7 years', languages: 'English, German' },
      { name: 'Hassan R.', qualification: 'MSc Statistics', university: 'Texas A&M University, USA', year: 2014, expertise: 'Statistics, SPSS, Quantitative Analysis', experience: '9 years', languages: 'English, Urdu' },
      { name: 'Rohan M.', qualification: 'MSc Statistics', university: 'University of Mumbai, India', year: 2014, expertise: 'Statistics, Data Analysis, R', experience: '9 years', languages: 'English, Hindi, Marathi' },
    ],
  },
  {
    title: 'Computing & Data Science',
    icon: 'research',
    gradient: 'from-[#0f1f3d] to-[#2d4a8a]',
    members: [
      { name: 'Lukas W.', qualification: 'MSc Computer Science', university: 'Technical University of Munich, Germany', year: 2013, expertise: 'Programming, Software Engineering', experience: '10 years', languages: 'English, German' },
      { name: 'Omar F.', qualification: 'MSc Data Science', university: 'TU Dortmund University, Germany', year: 2018, expertise: 'Machine Learning, Python', experience: '6 years', languages: 'English, Arabic' },
      { name: 'Ethan J.', qualification: 'MSc Computer Science', university: 'University of Southern California, USA', year: 2013, expertise: 'Artificial Intelligence, Databases', experience: '10 years', languages: 'English' },
      { name: 'Sameer A.', qualification: 'MTech Computer Science', university: 'Indian Institute of Technology Bombay, India', year: 2015, expertise: 'Computing, Algorithms, Python', experience: '8 years', languages: 'English, Hindi, Urdu' },
    ],
  },
  {
    title: 'Science, Health & Engineering',
    icon: 'research',
    gradient: 'from-[#7c3aed] to-[#a855f7]',
    members: [
      { name: 'Maya C.', qualification: 'Master of Public Health', university: 'Emory University, USA', year: 2017, expertise: 'Public Health, Health Policy', experience: '7 years', languages: 'English, Hindi' },
      { name: 'Farhan A.', qualification: 'PhD Chemistry', university: 'Heidelberg University, Germany', year: 2015, expertise: 'Chemistry, Scientific Research', experience: '9 years', languages: 'English, Urdu' },
      { name: 'Kavya R.', qualification: 'PhD Biotechnology', university: 'Anna University, India', year: 2018, expertise: 'Biotechnology, Scientific Research', experience: '6 years', languages: 'English, Tamil' },
      { name: 'Clara V.', qualification: 'MSc Mechanical Engineering', university: 'RWTH Aachen University, Germany', year: 2012, expertise: 'Engineering, Technical Analysis', experience: '11 years', languages: 'English, German' },
    ],
  },
  {
    title: 'Social Sciences, Education & English',
    icon: 'media',
    gradient: 'from-[#ea580c] to-[#fb923c]',
    members: [
      { name: 'Ayesha H.', qualification: 'PhD Education', university: 'University of Nottingham, UK', year: 2018, expertise: 'Education, Qualitative Research', experience: '6 years', languages: 'English, Urdu' },
      { name: 'Emilia K.', qualification: 'MSc Psychology', university: 'University of Freiburg, Germany', year: 2010, expertise: 'Psychology, Research Methods', experience: '13 years', languages: 'English, German' },
      { name: 'Sophia L.', qualification: 'PhD Sociology', university: 'University of Michigan, USA', year: 2016, expertise: 'Sociology, Social Research', experience: '8 years', languages: 'English, Spanish' },
      { name: 'Leila N.', qualification: 'PhD Political Science', university: 'University of Wisconsin–Madison, USA', year: 2018, expertise: 'Politics, International Relations', experience: '6 years', languages: 'English, Arabic' },
      { name: 'Meera K.', qualification: 'MA English', university: 'Jawaharlal Nehru University, India', year: 2010, expertise: 'Literature, Editing, Communication', experience: '13 years', languages: 'English, Hindi' },
    ],
  },
];

export const SPECIALIST_COUNT = SPECIALIST_GROUPS.reduce((n, g) => n + g.members.length, 0);
