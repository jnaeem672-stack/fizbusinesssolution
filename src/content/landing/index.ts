import type { LandingContent } from './types';
import { assignmentHelpUk } from './assignment-help-uk';
import { dissertationHelpUk } from './dissertation-help-uk';
import { mbaAssignmentHelp } from './mba-assignment-help';
import { assignmentHelpSaudiArabia } from './assignment-help-saudi-arabia';
import { arAssignmentHelpSaudiArabia } from './ar-assignment-help-saudi-arabia';
import { researchProposalHelp } from './research-proposal-help';
import { spssHelp } from './spss-help';
import { phdAdmissionScholarshipHelp } from './phd-admission-scholarship-help';
import { assignmentHelpLondon } from './assignment-help-london';
import { assignmentHelpManchester } from './assignment-help-manchester';
import { assignmentHelpBirmingham } from './assignment-help-birmingham';
import { assignmentHelpRiyadh } from './assignment-help-riyadh';
import { assignmentHelpJeddah } from './assignment-help-jeddah';
import { assignmentHelpDammam } from './assignment-help-dammam';

export type { LandingContent } from './types';

export const SITE_URL = 'https://fizbusinessolutions.com';

/** English landing pages, served at /{slug} */
export const EN_LANDING_PAGES: LandingContent[] = [
  assignmentHelpUk,
  dissertationHelpUk,
  mbaAssignmentHelp,
  assignmentHelpSaudiArabia,
  researchProposalHelp,
  spssHelp,
  phdAdmissionScholarshipHelp,
  assignmentHelpLondon,
  assignmentHelpManchester,
  assignmentHelpBirmingham,
  assignmentHelpRiyadh,
  assignmentHelpJeddah,
  assignmentHelpDammam,
];

/** Arabic landing pages, served at /ar/{slug} */
export const AR_LANDING_PAGES: LandingContent[] = [arAssignmentHelpSaudiArabia];

export function getLandingPage(slug: string, locale: 'en' | 'ar' = 'en'): LandingContent | undefined {
  const list = locale === 'ar' ? AR_LANDING_PAGES : EN_LANDING_PAGES;
  return list.find((page) => page.slug === slug);
}

export function landingPath(page: Pick<LandingContent, 'slug' | 'locale'>): string {
  return page.locale === 'ar' ? `/ar/${page.slug}` : `/${page.slug}`;
}

/** Short link label, e.g. "Assignment Help UK" from "Assignment Help UK | Expert Support from £20" */
export function landingLabel(page: LandingContent): string {
  return page.metaTitle.split('|')[0].trim();
}

export const SERVICE_LINKS: { label: string; href: string }[] = [
  { label: 'Assignment Help UK', href: '/assignment-help-uk' },
  { label: 'Dissertation Help UK', href: '/dissertation-help-uk' },
  { label: 'MBA Assignment Help', href: '/mba-assignment-help' },
  { label: 'Assignment Help Saudi Arabia', href: '/assignment-help-saudi-arabia' },
  { label: 'Research Proposal Help', href: '/research-proposal-help' },
  { label: 'SPSS Help', href: '/spss-help' },
  { label: 'PhD Admission & Scholarship Help', href: '/phd-admission-scholarship-help' },
  { label: 'مساعدة في الواجبات الجامعية', href: '/ar/assignment-help-saudi-arabia' },
];

export const CITY_LINKS: { label: string; href: string }[] = [
  { label: 'Assignment Help London', href: '/assignment-help-london' },
  { label: 'Assignment Help Manchester', href: '/assignment-help-manchester' },
  { label: 'Assignment Help Birmingham', href: '/assignment-help-birmingham' },
  { label: 'Assignment Help Riyadh', href: '/assignment-help-riyadh' },
  { label: 'Assignment Help Jeddah', href: '/assignment-help-jeddah' },
  { label: 'Assignment Help Dammam', href: '/assignment-help-dammam' },
];
