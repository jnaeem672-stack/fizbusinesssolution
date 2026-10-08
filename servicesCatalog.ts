export interface ServiceItem {
  id: number;
  name: string;
  desc: string;
  areas: string;
}

export interface ServiceCategory {
  title: string;
  services: ServiceItem[];
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    title: 'Assignment & Writing Help',
    services: [
      { id: 1, name: 'Assignment Help', desc: 'Expert assignment help for essays, reports, case studies and coursework at UK and Saudi universities.', areas: 'Assignments' },
      { id: 2, name: 'Essay Help', desc: 'Well-structured, well-argued essays with strong evidence, critical analysis and correct referencing.', areas: 'Essays' },
      { id: 3, name: 'Coursework & Report Help', desc: 'Business reports, lab reports, reflective reports and coursework that meet your marking criteria.', areas: 'Coursework' },
      { id: 4, name: 'Case Study Help', desc: 'In-depth case study analysis using SWOT, PESTLE, Porter, Ansoff and other business models.', areas: 'Case Studies' },
      { id: 5, name: 'Proofreading & Editing', desc: 'Professional proofreading and editing for grammar, flow, clarity and academic tone.', areas: 'Proofreading' },
      { id: 6, name: 'Referencing Help', desc: 'Accurate Harvard, APA, MLA, IEEE and OSCOLA in-text citations and reference lists.', areas: 'Referencing' },
      { id: 7, name: 'Draft Review & Feedback', desc: 'Expert review of your draft with clear, practical improvements before you submit.', areas: 'Feedback' },
      { id: 8, name: 'Presentation Help', desc: 'Professional PowerPoint slides, speaker notes and structure for confident presentations.', areas: 'Presentations' },
    ],
  },
  {
    title: 'Dissertation & Research Help',
    services: [
      { id: 9, name: 'Dissertation Help', desc: "Complete dissertation help for Bachelor's, Master's and MBA students, from topic to final chapter.", areas: 'Dissertation' },
      { id: 10, name: 'Thesis Help', desc: 'PhD and Master\'s thesis help with research design, chapters, analysis and viva preparation.', areas: 'Thesis' },
      { id: 11, name: 'Research Proposal Help', desc: 'Strong research proposals with a clear topic, aims, research questions, methodology and timeline.', areas: 'Proposals' },
      { id: 12, name: 'Literature Review Help', desc: 'Critical, well-organised literature reviews that identify themes and research gaps.', areas: 'Literature Review' },
      { id: 13, name: 'Research Methodology Help', desc: 'Qualitative, quantitative and mixed-methods research design, sampling and data collection.', areas: 'Methodology' },
      { id: 14, name: 'Data Analysis Help', desc: 'Statistical and thematic analysis with clear tables, charts and interpretation of findings.', areas: 'Analysis' },
      { id: 15, name: 'SPSS Help', desc: 'SPSS data analysis: descriptive statistics, t-tests, ANOVA, regression, correlation and outputs.', areas: 'SPSS' },
      { id: 16, name: 'Excel Data Analysis Help', desc: 'Excel analysis with pivot tables, formulas, charts and financial modelling.', areas: 'Excel' },
      { id: 17, name: 'NVivo & Thematic Analysis Help', desc: 'Interview and focus group coding, themes and qualitative findings using NVivo.', areas: 'NVivo' },
      { id: 18, name: 'Python & Stata Help', desc: 'Data analysis and visualisation using Python, Stata and R for research projects.', areas: 'Python' },
      { id: 19, name: 'PhD Admission & Scholarship Help', desc: 'PhD research proposals, personal statements and applications for funded scholarships in the UK.', areas: 'PhD Admission' },
    ],
  },
  {
    title: 'Subject Help',
    services: [
      { id: 20, name: 'Business & Management Assignment Help', desc: 'Strategy, operations, HRM, leadership and international business assignments.', areas: 'Business' },
      { id: 21, name: 'MBA Assignment Help', desc: 'MBA assignments, case studies and dissertations for UK and Saudi Arabian business schools.', areas: 'MBA' },
      { id: 22, name: 'Marketing Assignment Help', desc: 'Marketing plans, consumer behaviour, digital marketing and brand strategy assignments.', areas: 'Marketing' },
      { id: 23, name: 'Finance & Accounting Assignment Help', desc: 'Financial statements, ratio analysis, valuation, auditing and investment appraisal.', areas: 'Finance' },
      { id: 24, name: 'Healthcare & Nursing Assignment Help', desc: 'Nursing, public health, health and social care and healthcare management assignments.', areas: 'Health' },
      { id: 25, name: 'Law Assignment Help', desc: 'Case analysis, legal essays, problem questions and accurate OSCOLA referencing.', areas: 'Law' },
      { id: 26, name: 'Computing & IT Assignment Help', desc: 'Computer science, IT, data science and cyber security assignments and reports.', areas: 'Computing' },
      { id: 27, name: 'Engineering Assignment Help', desc: 'Civil, mechanical, electrical and petroleum engineering assignments and technical reports.', areas: 'Engineering' },
    ],
  },
];

export const ALL_SERVICES: ServiceItem[] = SERVICE_CATEGORIES.flatMap((category) => category.services);

export const MEGA_MENU_CATEGORIES = SERVICE_CATEGORIES.map((category) => ({
  title: category.title,
  links: category.services.map((service) => service.name),
}));
