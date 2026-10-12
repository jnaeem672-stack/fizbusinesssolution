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
import { cipdAssignmentHelp } from './cipd-assignment-help';
import { hndHncAssignmentHelp } from './hnd-hnc-assignment-help';
import { cmiAssignmentHelp } from './cmi-assignment-help';
import { othmAtheAssignmentHelp } from './othm-athe-assignment-help';
import { assignmentHelpLeeds } from './assignment-help-leeds';
import { assignmentHelpGlasgow } from './assignment-help-glasgow';
import { assignmentHelpEdinburgh } from './assignment-help-edinburgh';
import { assignmentHelpNottingham } from './assignment-help-nottingham';
import { assignmentHelpSheffield } from './assignment-help-sheffield';
import { assignmentHelpLiverpool } from './assignment-help-liverpool';
import { hrmAssignmentHelp } from './hrm-assignment-help';
import { economicsAssignmentHelp } from './economics-assignment-help';
import { psychologyAssignmentHelp } from './psychology-assignment-help';
import { educationAssignmentHelp } from './education-assignment-help';
import { projectManagementAssignmentHelp } from './project-management-assignment-help';
import { supplyChainLogisticsAssignmentHelp } from './supply-chain-logistics-assignment-help';

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
  assignmentHelpLeeds,
  assignmentHelpGlasgow,
  assignmentHelpEdinburgh,
  assignmentHelpNottingham,
  assignmentHelpSheffield,
  assignmentHelpLiverpool,
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
  hrmAssignmentHelp,
  economicsAssignmentHelp,
  psychologyAssignmentHelp,
  educationAssignmentHelp,
  projectManagementAssignmentHelp,
  supplyChainLogisticsAssignmentHelp,
  cipdAssignmentHelp,
  hndHncAssignmentHelp,
  cmiAssignmentHelp,
  othmAtheAssignmentHelp,
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

export const QUALIFICATION_LINKS: { label: string; href: string }[] = [
  { label: 'CIPD Assignment Help', href: '/cipd-assignment-help' },
  { label: 'HND & HNC Assignment Help', href: '/hnd-hnc-assignment-help' },
  { label: 'CMI Assignment Help', href: '/cmi-assignment-help' },
  { label: 'OTHM & ATHE Assignment Help', href: '/othm-athe-assignment-help' },
];

export const CITY_LINKS: { label: string; href: string }[] = [
  { label: 'Assignment Help London', href: '/assignment-help-london' },
  { label: 'Assignment Help Manchester', href: '/assignment-help-manchester' },
  { label: 'Assignment Help Birmingham', href: '/assignment-help-birmingham' },
  { label: 'Assignment Help Leeds', href: '/assignment-help-leeds' },
  { label: 'Assignment Help Glasgow', href: '/assignment-help-glasgow' },
  { label: 'Assignment Help Edinburgh', href: '/assignment-help-edinburgh' },
  { label: 'Assignment Help Nottingham', href: '/assignment-help-nottingham' },
  { label: 'Assignment Help Sheffield', href: '/assignment-help-sheffield' },
  { label: 'Assignment Help Liverpool', href: '/assignment-help-liverpool' },
  { label: 'Assignment Help Riyadh', href: '/assignment-help-riyadh' },
  { label: 'Assignment Help Jeddah', href: '/assignment-help-jeddah' },
  { label: 'Assignment Help Dammam', href: '/assignment-help-dammam' },
];

export const SUBJECT_LINKS: { label: string; href: string }[] = [
  { label: 'Business & Management', href: '/business-management-assignment-help' },
  { label: 'MBA', href: '/mba-assignment-help' },
  { label: 'Marketing', href: '/marketing-assignment-help' },
  { label: 'Finance & Accounting', href: '/finance-accounting-assignment-help' },
  { label: 'HRM', href: '/hrm-assignment-help' },
  { label: 'Economics', href: '/economics-assignment-help' },
  { label: 'Project Management', href: '/project-management-assignment-help' },
  { label: 'Supply Chain & Logistics', href: '/supply-chain-logistics-assignment-help' },
  { label: 'Healthcare & Nursing', href: '/healthcare-nursing-assignment-help' },
  { label: 'Psychology', href: '/psychology-assignment-help' },
  { label: 'Education', href: '/education-assignment-help' },
  { label: 'Law', href: '/law-assignment-help' },
  { label: 'Computing & IT', href: '/computing-it-assignment-help' },
  { label: 'Engineering', href: '/engineering-assignment-help' },
];

const SAUDI_CITY_HREFS = ['/assignment-help-riyadh', '/assignment-help-jeddah', '/assignment-help-dammam'];
export const UK_CITY_LINKS = CITY_LINKS.filter((l) => !SAUDI_CITY_HREFS.includes(l.href));
export const SAUDI_CITY_LINKS = CITY_LINKS.filter((l) => SAUDI_CITY_HREFS.includes(l.href));

const QUALIFICATION_GROUP_PAGES = [
  'assignment-help-uk',
  'business-management-assignment-help',
  'mba-assignment-help',
  'healthcare-nursing-assignment-help',
  'computing-it-assignment-help',
  'engineering-assignment-help',
  'coursework-report-help',
  ...QUALIFICATION_LINKS.map((l) => l.href.slice(1)),
];

/** Groups of internal links shown inside the content of an English landing page */
export function linkGroupsForPage(slug: string): { title: string; links: { label: string; href: string }[] }[] {
  const self = `/${slug}`;
  const groups: { title: string; links: { label: string; href: string }[] }[] = [];
  const isUkCity = UK_CITY_LINKS.some((l) => l.href === self);
  const isSaudiCity = SAUDI_CITY_LINKS.some((l) => l.href === self);
  if (isUkCity || slug === 'assignment-help-uk' || slug === 'dissertation-help-uk') {
    groups.push({ title: 'We support students across the UK', links: UK_CITY_LINKS.filter((l) => l.href !== self) });
  }
  if (isSaudiCity || slug === 'assignment-help-saudi-arabia') {
    groups.push({ title: 'We support students across Saudi Arabia', links: SAUDI_CITY_LINKS.filter((l) => l.href !== self) });
  }
  if (SUBJECT_LINKS.some((l) => l.href === self)) {
    groups.push({ title: 'Other subjects we support', links: SUBJECT_LINKS.filter((l) => l.href !== self) });
  }
  if (QUALIFICATION_GROUP_PAGES.includes(slug)) {
    groups.push({ title: 'Professional and vocational qualifications', links: QUALIFICATION_LINKS.filter((l) => l.href !== self) });
  }
  return groups.filter((g) => g.links.length > 0);
}
