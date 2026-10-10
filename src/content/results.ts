/**
 * Real student results, shared by students. Every image in /public/results is cropped,
 * has names, IDs, university details, module codes and Turnitin data removed, and carries
 * a FIZBS watermark. Captions must match the screenshot exactly. Never add a result
 * that is not a real screenshot.
 */
export interface StudentResult {
  id: string;
  image: string;
  width: number;
  height: number;
  /** Headline grade, exactly as shown on the screenshot */
  grade: string;
  /** Highest single mark on the screenshot, used for sorting and the 70+ badge */
  best: number;
  /** Type of work, in plain words */
  work: string;
  /** Extra detail visible on the screenshot */
  detail: string;
  /** Only when the screenshot itself states the level */
  level?: string;
}

export const STUDENT_RESULTS: StudentResult[] = [
  {
    id: 'result-07',
    image: '/results/result-07.webp',
    width: 900,
    height: 282,
    grade: '84.5 (A2)',
    best: 84.5,
    work: 'MSc Information Technology modules',
    detail: 'Information Systems Analysis and Design 84.5, IT Strategy and Management 67, Enterprise Architecture 58.',
    level: 'MSc (Postgraduate)',
  },
  {
    id: 'result-09',
    image: '/results/result-09.webp',
    width: 911,
    height: 302,
    grade: '80',
    best: 80,
    work: 'Financial management assignment',
    detail: 'Assignment graded 80.',
  },
  {
    id: 'result-11',
    image: '/results/result-11.webp',
    width: 900,
    height: 880,
    grade: '79',
    best: 79,
    work: 'Finance assignment',
    detail: 'Element 1 submission, graded 79.',
  },
  {
    id: 'result-03',
    image: '/results/result-03.webp',
    width: 1490,
    height: 490,
    grade: '74/100',
    best: 74,
    work: 'Individual case study report',
    detail: 'Summative individual case study report, 74 out of 100.',
  },
  {
    id: 'result-02',
    image: '/results/result-02.webp',
    width: 1512,
    height: 559,
    grade: '73/100',
    best: 73,
    work: 'Individual report (3,500 words)',
    detail: 'Summative individual report, 73 out of 100.',
  },
  {
    id: 'result-10',
    image: '/results/result-10.webp',
    width: 1860,
    height: 581,
    grade: '73/100',
    best: 73,
    work: 'Poster assessment',
    detail: 'Assessment 1 poster, 73 out of 100.',
  },
  {
    id: 'result-04',
    image: '/results/result-04.webp',
    width: 900,
    height: 1724,
    grade: 'Up to 72',
    best: 72,
    work: 'MBA modules and MBA project',
    detail: 'Seven Level 7 modules from 57 to 72, including the MBA Project at 62 (indicative).',
    level: 'MBA (Level 7)',
  },
  {
    id: 'result-05',
    image: '/results/result-05.webp',
    width: 918,
    height: 1099,
    grade: '70%',
    best: 70,
    work: 'Dissertation and research proposal',
    detail: 'Dissertation 70%, research proposal 69%.',
  },
  {
    id: 'result-01',
    image: '/results/result-01.webp',
    width: 947,
    height: 1182,
    grade: '70/100',
    best: 70,
    work: 'International business assignment',
    detail: 'Assignment submission, 70 points out of 100.',
  },
  {
    id: 'result-08',
    image: '/results/result-08.webp',
    width: 900,
    height: 710,
    grade: '66',
    best: 66,
    work: 'Research project (15,000 words)',
    detail: 'Research project 66, research proposal (1,500 words) 60.',
  },
  {
    id: 'result-06',
    image: '/results/result-06.webp',
    width: 900,
    height: 529,
    grade: '66%',
    best: 66,
    work: '4,000-word individual report',
    detail: 'Innovation Management and Entrepreneurship, 66%.',
  },
];

export const RESULTS_HIGHEST = Math.max(...STUDENT_RESULTS.map((r) => r.best));
