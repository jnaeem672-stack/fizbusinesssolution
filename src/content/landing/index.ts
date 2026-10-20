import type { LandingContent } from './types';
import { AR_CITY_LINKS, AR_SERVICE_LINKS, AR_TECH_LINKS, SAUDI_CITY_SLUGS } from '@/constants/arLinks';
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
import { assignmentHelpBristol } from './assignment-help-bristol';
import { assignmentHelpNewcastle } from './assignment-help-newcastle';
import { assignmentHelpLeicester } from './assignment-help-leicester';
import { assignmentHelpCoventry } from './assignment-help-coventry';
import { assignmentHelpCardiff } from './assignment-help-cardiff';
import { assignmentHelpSouthampton } from './assignment-help-southampton';
import { assignmentHelpNorthampton } from './assignment-help-northampton';
import { assignmentHelpPortsmouth } from './assignment-help-portsmouth';
import { assignmentHelpHull } from './assignment-help-hull';
import { assignmentHelpSunderland } from './assignment-help-sunderland';
import { assignmentHelpMiddlesbrough } from './assignment-help-middlesbrough';
import { assignmentHelpLuton } from './assignment-help-luton';
import { assignmentHelpBradford } from './assignment-help-bradford';
import { assignmentHelpDerby } from './assignment-help-derby';
import { assignmentHelpWolverhampton } from './assignment-help-wolverhampton';
import { assignmentHelpOxford } from './assignment-help-oxford';
import { hrmAssignmentHelp } from './hrm-assignment-help';
import { economicsAssignmentHelp } from './economics-assignment-help';
import { psychologyAssignmentHelp } from './psychology-assignment-help';
import { educationAssignmentHelp } from './education-assignment-help';
import { projectManagementAssignmentHelp } from './project-management-assignment-help';
import { supplyChainLogisticsAssignmentHelp } from './supply-chain-logistics-assignment-help';
import { assignmentHelpMakkah } from './assignment-help-makkah';
import { assignmentHelpMadinah } from './assignment-help-madinah';
import { assignmentHelpAbha } from './assignment-help-abha';
import { assignmentHelpTaif } from './assignment-help-taif';
import { assignmentHelpQassim } from './assignment-help-qassim';
import { assignmentHelpTabuk } from './assignment-help-tabuk';
import { assignmentHelpUae } from './assignment-help-uae';
import { assignmentHelpUsa } from './assignment-help-usa';
import { assignmentHelpDubai } from './assignment-help-dubai';
import { assignmentHelpAbuDhabi } from './assignment-help-abu-dhabi';
import { arAssignmentHelpMakkah } from './ar-assignment-help-makkah';
import { arAssignmentHelpMadinah } from './ar-assignment-help-madinah';
import { arAssignmentHelpAbha } from './ar-assignment-help-abha';
import { arAssignmentHelpTaif } from './ar-assignment-help-taif';
import { arAssignmentHelpQassim } from './ar-assignment-help-qassim';
import { arAssignmentHelpTabuk } from './ar-assignment-help-tabuk';
import { arResearchProposalHelp } from './ar-research-proposal-help';
import { arSpssHelp } from './ar-spss-help';
import { arMbaAssignmentHelp } from './ar-mba-assignment-help';
import { arThesisHelp } from './ar-thesis-help';
import { ar3dsMaxDesignHelp } from './ar-3ds-max-design-help';
import { arAutocadHelp } from './ar-autocad-help';
import { arSolidworksHelp } from './ar-solidworks-help';
import { arProgrammingHelp } from './ar-programming-help';

export type { LandingContent } from './types';
export { AR_CITY_LINKS, AR_SERVICE_LINKS, AR_TECH_LINKS } from '@/constants/arLinks';

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
  assignmentHelpBristol,
  assignmentHelpNewcastle,
  assignmentHelpLeicester,
  assignmentHelpCoventry,
  assignmentHelpCardiff,
  assignmentHelpSouthampton,
  assignmentHelpNorthampton,
  assignmentHelpPortsmouth,
  assignmentHelpHull,
  assignmentHelpSunderland,
  assignmentHelpMiddlesbrough,
  assignmentHelpLuton,
  assignmentHelpBradford,
  assignmentHelpDerby,
  assignmentHelpWolverhampton,
  assignmentHelpOxford,
  assignmentHelpRiyadh,
  assignmentHelpJeddah,
  assignmentHelpDammam,
  assignmentHelpMakkah,
  assignmentHelpMadinah,
  assignmentHelpAbha,
  assignmentHelpTaif,
  assignmentHelpQassim,
  assignmentHelpTabuk,
  assignmentHelpUae,
  assignmentHelpDubai,
  assignmentHelpAbuDhabi,
  assignmentHelpUsa,
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
  arAssignmentHelpMakkah,
  arAssignmentHelpMadinah,
  arAssignmentHelpAbha,
  arAssignmentHelpTaif,
  arAssignmentHelpQassim,
  arAssignmentHelpTabuk,
  arMbaAssignmentHelp,
  arResearchProposalHelp,
  arThesisHelp,
  arSpssHelp,
  arPhdAdmissionScholarshipHelp,
  ar3dsMaxDesignHelp,
  arAutocadHelp,
  arSolidworksHelp,
  arProgrammingHelp,
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
  { label: 'Assignment Help UAE', href: '/assignment-help-uae' },
  { label: 'Assignment Help USA', href: '/assignment-help-usa' },
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
  { label: 'Assignment Help Bristol', href: '/assignment-help-bristol' },
  { label: 'Assignment Help Newcastle', href: '/assignment-help-newcastle' },
  { label: 'Assignment Help Leicester', href: '/assignment-help-leicester' },
  { label: 'Assignment Help Coventry', href: '/assignment-help-coventry' },
  { label: 'Assignment Help Cardiff', href: '/assignment-help-cardiff' },
  { label: 'Assignment Help Southampton', href: '/assignment-help-southampton' },
  { label: 'Assignment Help Northampton', href: '/assignment-help-northampton' },
  { label: 'Assignment Help Portsmouth', href: '/assignment-help-portsmouth' },
  { label: 'Assignment Help Hull', href: '/assignment-help-hull' },
  { label: 'Assignment Help Sunderland', href: '/assignment-help-sunderland' },
  { label: 'Assignment Help Middlesbrough', href: '/assignment-help-middlesbrough' },
  { label: 'Assignment Help Luton', href: '/assignment-help-luton' },
  { label: 'Assignment Help Bradford', href: '/assignment-help-bradford' },
  { label: 'Assignment Help Derby', href: '/assignment-help-derby' },
  { label: 'Assignment Help Wolverhampton', href: '/assignment-help-wolverhampton' },
  { label: 'Assignment Help Oxford', href: '/assignment-help-oxford' },
  { label: 'Assignment Help Riyadh', href: '/assignment-help-riyadh' },
  { label: 'Assignment Help Jeddah', href: '/assignment-help-jeddah' },
  { label: 'Assignment Help Dammam', href: '/assignment-help-dammam' },
  { label: 'Assignment Help Makkah', href: '/assignment-help-makkah' },
  { label: 'Assignment Help Madinah', href: '/assignment-help-madinah' },
  { label: 'Assignment Help Abha', href: '/assignment-help-abha' },
  { label: 'Assignment Help Taif', href: '/assignment-help-taif' },
  { label: 'Assignment Help Qassim', href: '/assignment-help-qassim' },
  { label: 'Assignment Help Tabuk', href: '/assignment-help-tabuk' },
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

const SAUDI_CITY_HREFS = SAUDI_CITY_SLUGS.map((slug) => `/${slug}`);
/** UAE pages (hub first) */
export const UAE_LINKS: { label: string; href: string }[] = [
  { label: 'Assignment Help UAE', href: '/assignment-help-uae' },
  { label: 'Assignment Help Dubai', href: '/assignment-help-dubai' },
  { label: 'Assignment Help Abu Dhabi', href: '/assignment-help-abu-dhabi' },
];
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

/** Groups of internal links shown inside the content of an Arabic landing page */
function arLinkGroupsForPage(slug: string): { title: string; links: { label: string; href: string }[] }[] {
  const self = `/ar/${slug}`;
  const groups: { title: string; links: { label: string; href: string }[] }[] = [];
  if (SAUDI_CITY_SLUGS.includes(slug) || slug === 'assignment-help-saudi-arabia') {
    groups.push({ title: 'ندعم الطلاب في مدن المملكة', links: AR_CITY_LINKS.filter((l) => l.href !== self) });
  }
  groups.push({ title: 'برامج التصميم والهندسة والبرمجة', links: AR_TECH_LINKS.filter((l) => l.href !== self) });
  groups.push({ title: 'خدمات أخرى بالعربية', links: AR_SERVICE_LINKS.filter((l) => l.href !== self) });
  return groups.filter((g) => g.links.length > 0);
}

/** Groups of internal links shown inside the content of a landing page */
export function linkGroupsForPage(slug: string, locale: 'en' | 'ar' = 'en'): { title: string; links: { label: string; href: string }[] }[] {
  if (locale === 'ar') return arLinkGroupsForPage(slug);
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
  if (UAE_LINKS.some((l) => l.href === self)) {
    groups.push({ title: 'We support students across the UAE', links: UAE_LINKS.filter((l) => l.href !== self) });
    groups.push({ title: 'We also support students in Saudi Arabia', links: SAUDI_CITY_LINKS.slice(0, 3) });
  }
  if (slug === 'assignment-help-usa') {
    groups.push({
      title: 'We also support students in the UK, Saudi Arabia and the UAE',
      links: [
        { label: 'Assignment Help UK', href: '/assignment-help-uk' },
        { label: 'Assignment Help Saudi Arabia', href: '/assignment-help-saudi-arabia' },
        { label: 'Assignment Help UAE', href: '/assignment-help-uae' },
      ],
    });
  }
  if (SUBJECT_LINKS.some((l) => l.href === self)) {
    groups.push({ title: 'Other subjects we support', links: SUBJECT_LINKS.filter((l) => l.href !== self) });
  }
  if (QUALIFICATION_GROUP_PAGES.includes(slug)) {
    groups.push({ title: 'Professional and vocational qualifications', links: QUALIFICATION_LINKS.filter((l) => l.href !== self) });
  }
  return groups.filter((g) => g.links.length > 0);
}
