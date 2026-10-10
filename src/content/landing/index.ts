import type { LandingContent } from './types';
import { assignmentHelpUk } from './assignment-help-uk';
import { dissertationHelpUk } from './dissertation-help-uk';
import { mbaAssignmentHelp } from './mba-assignment-help';
import { assignmentHelpSaudiArabia } from './assignment-help-saudi-arabia';
import { arAssignmentHelpSaudiArabia } from './ar-assignment-help-saudi-arabia';
import { researchProposalHelp } from './research-proposal-help';
import { spssHelp } from './spss-help';
import { phdAdmissionScholarshipHelp } from './phd-admission-scholarship-help';
import { arPhdAdmissionScholarshipHelp } from './ar-phd-admission-scholarship-help';
import { assignmentHelpLondon } from './assignment-help-london';
import { assignmentHelpManchester } from './assignment-help-manchester';
import { assignmentHelpBirmingham } from './assignment-help-birmingham';
import { assignmentHelpRiyadh } from './assignment-help-riyadh';
import { assignmentHelpJeddah } from './assignment-help-jeddah';
import { assignmentHelpDammam } from './assignment-help-dammam';
import { essayHelp } from './essay-help';
import { courseworkReportHelp } from './coursework-report-help';
import { caseStudyHelp } from './case-study-help';
import { presentationHelp } from './presentation-help';
import { proofreadingEditingServices } from './proofreading-editing-services';
import { referencingHelp } from './referencing-help';
import { draftReviewFeedback } from './draft-review-feedback';
import { thesisHelp } from './thesis-help';
import { literatureReviewHelp } from './literature-review-help';
import { researchMethodologyHelp } from './research-methodology-help';
import { dataAnalysisHelp } from './data-analysis-help';
import { excelDataAnalysisHelp } from './excel-data-analysis-help';
import { nvivoThematicAnalysisHelp } from './nvivo-thematic-analysis-help';
import { pythonStataHelp } from './python-stata-help';
import { businessManagementAssignmentHelp } from './business-management-assignment-help';
import { marketingAssignmentHelp } from './marketing-assignment-help';
import { financeAccountingAssignmentHelp } from './finance-accounting-assignment-help';
import { healthcareNursingAssignmentHelp } from './healthcare-nursing-assignment-help';
import { lawAssignmentHelp } from './law-assignment-help';
import { computingItAssignmentHelp } from './computing-it-assignment-help';
import { engineeringAssignmentHelp } from './engineering-assignment-help';
import { arAssignmentHelpRiyadh } from './ar-assignment-help-riyadh';
import { arAssignmentHelpJeddah } from './ar-assignment-help-jeddah';
import { arAssignmentHelpDammam } from './ar-assignment-help-dammam';
import { arDissertationHelpSaudiArabia } from './ar-dissertation-help-saudi-arabia';

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
  essayHelp,
  courseworkReportHelp,
  caseStudyHelp,
  presentationHelp,
  proofreadingEditingServices,
  referencingHelp,
  draftReviewFeedback,
  thesisHelp,
  literatureReviewHelp,
  researchMethodologyHelp,
  dataAnalysisHelp,
  excelDataAnalysisHelp,
  nvivoThematicAnalysisHelp,
  pythonStataHelp,
  businessManagementAssignmentHelp,
  marketingAssignmentHelp,
  financeAccountingAssignmentHelp,
  healthcareNursingAssignmentHelp,
  lawAssignmentHelp,
  computingItAssignmentHelp,
  engineeringAssignmentHelp,
];

/** Arabic landing pages, served at /ar/{slug} */
export const AR_LANDING_PAGES: LandingContent[] = [
  arAssignmentHelpSaudiArabia,
  arDissertationHelpSaudiArabia,
  arAssignmentHelpRiyadh,
  arAssignmentHelpJeddah,
  arAssignmentHelpDammam,
  arPhdAdmissionScholarshipHelp,
];

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
