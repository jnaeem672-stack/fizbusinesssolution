import type { Sample, SampleCategory, SampleCategoryId } from './types';
import { suncrestHotelsDatabaseProjectSample } from './suncrest-hotels-database-project';

export type { Sample, SampleCategory, SampleCategoryId, SampleBlock, SampleSection } from './types';

/** Sample categories, in display order. Add a sample to any category by setting `category`. */
export const SAMPLE_CATEGORIES: SampleCategory[] = [
  {
    id: 'assignments-essays',
    label: 'Assignments & Essays',
    description: 'Essays, coursework and written assignments for UK and Saudi universities.',
    service: 'essay-help',
  },
  {
    id: 'reports-case-studies',
    label: 'Reports & Case Studies',
    description: 'Business reports, case study analysis, SWOT and PESTLE work.',
    service: 'case-study-help',
  },
  {
    id: 'dissertations-theses',
    label: 'Dissertations & Theses',
    description: 'Dissertation chapters, literature reviews, methodology and full theses.',
    service: 'dissertation-help-uk',
  },
  {
    id: 'research-proposals',
    label: 'Research & PhD Proposals',
    description: "Master's and PhD research proposals with clear aims, questions and methods.",
    service: 'research-proposal-help',
  },
  {
    id: 'data-analysis',
    label: 'Data Analysis',
    description: 'SPSS, Excel, NVivo and statistics work with results explained in plain English.',
    service: 'data-analysis-help',
  },
  {
    id: 'computing-it',
    label: 'Computing, IT & Databases',
    description: 'Database design, SQL, programming and technical computing reports.',
    service: 'computing-it-assignment-help',
  },
  {
    id: 'proofreading-editing',
    label: 'Proofreading & Editing',
    description: 'Before and after examples of academic proofreading and editing.',
    service: 'proofreading-editing-services',
  },
];

/** All published samples, newest first. Served at /samples/{slug} */
export const SAMPLES: Sample[] = [suncrestHotelsDatabaseProjectSample];

export function getSample(slug: string): Sample | undefined {
  return SAMPLES.find((s) => s.slug === slug);
}

export function getSampleCategory(id: SampleCategoryId): SampleCategory {
  return SAMPLE_CATEGORIES.find((c) => c.id === id) ?? SAMPLE_CATEGORIES[0];
}

export function samplePath(sample: Pick<Sample, 'slug'>): string {
  return `/samples/${sample.slug}`;
}

/** Samples linked to a service landing page (by related service or category service) */
export function samplesForService(slug: string, limit = 3): Sample[] {
  return SAMPLES.filter(
    (s) => s.relatedServices.includes(slug) || getSampleCategory(s.category).service === slug,
  ).slice(0, limit);
}

/** Anchor id for a sample section heading */
export function sampleSectionId(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}
