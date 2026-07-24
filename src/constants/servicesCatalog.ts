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
    title: 'Academic Skills & Feedback',
    services: [
      { id: 1, name: 'Academic Writing Coaching', desc: 'Learn how to build clear arguments, paragraphs, introductions, discussions, and conclusions.', areas: 'Writing Skills' },
      { id: 2, name: 'Assessment Brief Guidance', desc: 'Understand command words, marking criteria, learning outcomes, and assessment expectations.', areas: 'Planning' },
      { id: 3, name: 'Draft Review & Developmental Feedback', desc: 'Receive comments on structure, logic, evidence, critical analysis, and revision priorities in your own draft.', areas: 'Draft Feedback' },
      { id: 4, name: 'Proofreading & Language Editing', desc: 'Improve grammar, punctuation, spelling, readability, and consistency without replacing authorship.', areas: 'Language' },
      { id: 5, name: 'Referencing Support', desc: 'Learn citation principles and improve consistency in Harvard, APA, IEEE, OSCOLA, and other styles.', areas: 'Referencing' },
      { id: 6, name: 'Critical Reading & Source Evaluation', desc: 'Develop skills for judging credibility, relevance, methodology, limitations, and evidence quality.', areas: 'Critical Skills' },
      { id: 7, name: 'Study Skills & Time Management', desc: 'Build practical routines for reading, note-taking, planning, revision, and managing deadlines.', areas: 'Study Skills' },
      { id: 8, name: 'Presentation Coaching', desc: 'Improve slide structure, visual clarity, speaker notes, timing, and delivery practice.', areas: 'Presentations' },
    ],
  },
  {
    title: 'Research & Data Skills',
    services: [
      { id: 9, name: 'Dissertation Coaching', desc: 'Guidance on research focus, questions, literature, methodology, chapter planning, and supervision preparation.', areas: 'Dissertation' },
      { id: 10, name: 'Research Proposal Coaching', desc: 'Develop a feasible topic, rationale, objectives, research questions, method, ethics, and timeline.', areas: 'Research Design' },
      { id: 11, name: 'Literature Review Guidance', desc: 'Learn search strategies, screening, literature matrices, synthesis, thematic organisation, and gap identification.', areas: 'Literature Review' },
      { id: 12, name: 'Qualitative Research Tutoring', desc: 'Understand interviews, focus groups, sampling, ethics, coding, reflexivity, and qualitative quality criteria.', areas: 'Qualitative' },
      { id: 13, name: 'Quantitative Research Tutoring', desc: 'Learn variables, hypotheses, sampling, measurement, statistical tests, assumptions, and interpretation.', areas: 'Quantitative' },
      { id: 14, name: 'Mixed-Methods Guidance', desc: 'Evaluate when and how qualitative and quantitative approaches can be integrated coherently.', areas: 'Mixed Methods' },
      { id: 15, name: 'Thematic Analysis Tutoring', desc: 'Develop coding, theme construction, review, naming, interpretation, and transparent reporting skills.', areas: 'Analysis' },
      { id: 16, name: 'SPSS Tutoring', desc: 'Guided practice in data preparation, descriptive statistics, tests, outputs, and interpretation.', areas: 'SPSS' },
      { id: 17, name: 'Excel Data Analysis Tutoring', desc: 'Learn data cleaning, formulas, pivot tables, charts, descriptive analysis, and reporting.', areas: 'Excel' },
      { id: 18, name: 'NVivo Tutoring', desc: 'Learn project setup, coding, memos, queries, theme development, and evidence organisation.', areas: 'NVivo' },
      { id: 19, name: 'Python Data Analysis Tutoring', desc: 'Guided learning in data preparation, analysis, visualisation, and interpretation using Python.', areas: 'Python' },
    ],
  },
  {
    title: 'Subject & Professional Learning',
    services: [
      { id: 20, name: 'Business & Management Tutoring', desc: 'Support with business concepts, strategy models, organisational analysis, and evidence-based application.', areas: 'Business' },
      { id: 21, name: 'Marketing & Strategy Tutoring', desc: 'Understand consumer behaviour, market analysis, segmentation, positioning, strategy, and evaluation.', areas: 'Marketing' },
      { id: 22, name: 'Finance & Accounting Concepts', desc: 'Guidance on financial statements, ratios, valuation, budgeting, investment appraisal, and interpretation.', areas: 'Finance' },
      { id: 23, name: 'Public Health & Healthcare Study Support', desc: 'Develop understanding of evidence appraisal, health frameworks, policy analysis, and research methods.', areas: 'Health' },
      { id: 24, name: 'Law Study Skills & OSCOLA', desc: 'Learn case reading, issue identification, legal reasoning, authority use, and OSCOLA referencing.', areas: 'Law' },
      { id: 25, name: 'Computing & Technology Tutoring', desc: 'Support with concepts, project planning, documentation, data, systems analysis, and technical communication.', areas: 'Computing' },
      { id: 26, name: 'Engineering Problem-Solving Guidance', desc: 'Develop structured approaches to technical problems, calculations, assumptions, and report presentation.', areas: 'Engineering' },
      { id: 27, name: 'Professional Business Writing', desc: 'Legitimate support for reports, proposals, website copy, presentations, and non-assessed professional documents.', areas: 'Professional' },
    ],
  },
];

export const ALL_SERVICES: ServiceItem[] = SERVICE_CATEGORIES.flatMap((category) => category.services);

export const MEGA_MENU_CATEGORIES = SERVICE_CATEGORIES.map((category) => ({
  title: category.title,
  links: category.services.map((service) => service.name),
}));
