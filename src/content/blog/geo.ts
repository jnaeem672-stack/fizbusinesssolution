/**
 * Answer-first summaries and subject specialists for the English guides.
 * The quick answer is shown at the top of each guide and used as the BlogPosting "abstract", so search engines
 * and AI assistants can lift a short, accurate answer. The specialist is a real FIZBS team member in that subject
 * (shown as a contact, not as the author). `updated` is the date the guide content last changed.
 */
export interface GuideGeo {
  quickAnswer: string;
  specialist: string;
  updated: string;
}

export const GUIDE_GEO: Record<string, GuideGeo> = {
  'human-vs-ai-academic-writing': {
    quickAnswer:
      'AI tools can draft fluent text quickly, but they often produce generic arguments, shallow analysis and invented or inaccurate references. University markers reward critical thinking, accurate sources and your own voice, and most universities treat submitting AI-generated work as your own as academic misconduct. Use AI only in the ways your university allows, such as brainstorming, and write the assessed work yourself.',
    specialist: 'sajjad-akbar-ali',
    updated: '2026-10-12',
  },
  'how-to-write-a-dissertation': {
    quickAnswer:
      'To write a dissertation, choose a focused topic you can research, write a proposal, plan a realistic timeline, then draft the chapters: introduction (about 10%), literature review (20 to 30%), methodology (10 to 15%), findings (15 to 20%), discussion (20 to 25%) and conclusion (5 to 10%). Meet your supervisor regularly and leave time to edit and proofread.',
    specialist: 'sajjad-akbar-ali',
    updated: '2026-10-13',
  },
  'business-dissertation-topics': {
    quickAnswer:
      'A good business or MBA dissertation topic names a specific problem, a context such as a sector or country, and a group you can reach for data, for example hybrid working and engagement in UK professional services. This guide lists 50 researchable topics for 2026 across marketing, HRM, finance, strategy, operations, ESG, AI and Saudi Vision 2030.',
    specialist: 'ahmed-k',
    updated: '2026-10-12',
  },
  'how-to-write-a-literature-review': {
    quickAnswer:
      'To write a literature review, search academic databases with a clear keyword strategy, screen sources for relevance and quality, and organise them by theme in a synthesis matrix. Then write critically: compare and evaluate studies rather than summarising them one by one, and finish by stating the research gap your study addresses.',
    specialist: 'ayesha-h',
    updated: '2026-10-13',
  },
  'dissertation-methodology-guide': {
    quickAnswer:
      'A dissertation methodology explains and justifies how you did your research: your research philosophy and approach, your design (qualitative, quantitative or mixed), sampling, data collection, data analysis, research approval and limitations. Markers want each choice linked to your research question, not just described.',
    specialist: 'sajjad-akbar-ali',
    updated: '2026-10-13',
  },
  'harvard-referencing-guide': {
    quickAnswer:
      'Harvard is an author-date referencing style. In the text you cite the author and year, for example (Smith, 2021), adding a page number for direct quotes. At the end you list every source alphabetically by surname with full details. Many UK universities follow the Cite Them Right version, so check your handbook for small differences.',
    specialist: 'meera-k',
    updated: '2026-10-13',
  },
  'which-statistical-test-spss': {
    quickAnswer:
      'The right statistical test depends on your research question and your variable types. Use t-tests or ANOVA to compare group means, correlation or chi-square to test relationships, and regression to predict an outcome. If your data breaks the assumptions of these parametric tests, use a non-parametric alternative such as Mann-Whitney or Kruskal-Wallis.',
    specialist: 'hassan-r',
    updated: '2026-10-13',
  },
  'uk-university-grading-system': {
    quickAnswer:
      "At most UK universities, a First Class degree is 70% and above, a 2:1 is 60 to 69%, a 2:2 is 50 to 59% and a Third is 40 to 49%. Taught Master's degrees are usually graded Distinction (70% and above, the highest grade), Merit (60 to 69%) and Pass (50 to 59%), and the Master's pass mark is usually 50%, not 40%. Marks above 70 are reserved for excellent work.",
    specialist: 'sajjad-akbar-ali',
    updated: '2026-10-27',
  },
  'how-to-email-a-phd-supervisor': {
    quickAnswer:
      "Email a potential PhD supervisor with a clear subject line, a short introduction, why their research fits your idea, a brief outline of your proposed project and your relevant qualifications. Attach your CV and a short research outline, keep the body to roughly 200 to 350 words, and send one polite follow-up after about two weeks if you get no reply.",
    specialist: 'sajjad-akbar-ali',
    updated: '2026-10-21',
  },
  'gibbs-reflective-cycle-guide': {
    quickAnswer:
      "Gibbs' Reflective Cycle has six stages: Description, Feelings, Evaluation, Analysis, Conclusion and Action plan. Give the most words to Analysis, where you link the experience to theory and evidence, keep Description short, and finish with a specific action plan for next time.",
    specialist: 'ayesha-h',
    updated: '2026-10-13',
  },
  'how-to-structure-a-university-essay': {
    quickAnswer:
      'A university essay has an introduction with a clear thesis (about 10% of the words), body paragraphs that each make one point using the PEEL structure (point, evidence, explanation, link), and a conclusion that answers the question (about 10%). Plan before writing, and use critical analysis rather than description to reach the higher grade bands.',
    specialist: 'meera-k',
    updated: '2026-10-13',
  },
  'how-to-write-a-research-question': {
    quickAnswer:
      'A good research question is focused, researchable with the data you can get, and analytical, usually starting with "how", "why" or "to what extent". Narrow a broad topic by adding a specific relationship, a context and a population, and check it against the FINER criteria used on many research methods courses. Health and nursing students often use PICO.',
    specialist: 'sophia-l',
    updated: '2026-10-13',
  },
  'thematic-analysis-guide': {
    quickAnswer:
      "Braun and Clarke's thematic analysis has six phases: familiarise yourself with the data, generate initial codes, search for themes, review themes, define and name themes, and write the report. It suits interview and focus group data, and can be done by hand or in NVivo.",
    specialist: 'ayesha-h',
    updated: '2026-10-13',
  },
  'swot-and-pestle-analysis-guide': {
    quickAnswer:
      'PESTLE analyses the external environment (political, economic, social, technological, legal and environmental factors), while SWOT combines internal strengths and weaknesses with external opportunities and threats. In assignments, use PESTLE findings to inform the opportunities and threats in your SWOT, then turn the SWOT into strategy with a TOWS matrix.',
    specialist: 'ahmed-k',
    updated: '2026-10-13',
  },
  'how-to-paraphrase-and-avoid-plagiarism': {
    quickAnswer:
      'To paraphrase properly, read the source until you understand it, close it, write the idea in your own words and sentence structure, then compare with the original and add a citation. A paraphrase still needs a reference. Changing a few words in the original sentence is not paraphrasing and can count as plagiarism.',
    specialist: 'meera-k',
    updated: '2026-10-12',
  },
  'how-to-write-a-dissertation-introduction': {
    quickAnswer:
      'A dissertation introduction sets out the background and context, the problem your study addresses, why it matters, your aims, objectives and research questions, the scope of the study and a short outline of the chapters. It is usually about 10% of the total word count.',
    specialist: 'sajjad-akbar-ali',
    updated: '2026-10-12',
  },
  'how-to-write-a-dissertation-conclusion': {
    quickAnswer:
      'A dissertation conclusion summarises the findings against each objective, answers the research question directly, shows the contribution of the study, and gives practical recommendations, limitations and suggestions for future research. It should not introduce new data, and is usually 5 to 10% of the word count.',
    specialist: 'sajjad-akbar-ali',
    updated: '2026-10-12',
  },
  'how-to-write-an-abstract': {
    quickAnswer:
      'An abstract is a short summary of your whole study, usually 150 to 300 words. A simple five-part structure works well: the background, the aim, the method, the key findings and the conclusion or implications. Write it last, in the past tense for what you did, and stay within the word limit.',
    specialist: 'meera-k',
    updated: '2026-10-15',
  },
  'apa-referencing-guide': {
    quickAnswer:
      'APA 7th edition is an author-date style. In the text you cite the surname and year, for example (Smith, 2021), and use "et al." from three or more authors. The reference list is alphabetical, with the year in brackets after the authors and sentence case for article titles. Direct quotes need a page number.',
    specialist: 'emilia-k',
    updated: '2026-10-13',
  },
  'how-to-write-a-business-report': {
    quickAnswer:
      'A university business report usually has a title page, an executive summary, contents, an introduction, numbered sections of findings and analysis, conclusions, recommendations, references and appendices. Unlike an essay, it uses headings, tables and charts, and the executive summary gives the key findings and recommendations on one page.',
    specialist: 'james-p',
    updated: '2026-10-20',
  },
  'how-to-write-a-case-study-analysis': {
    quickAnswer:
      'To write a case study analysis, read the case and brief carefully, identify the key issues, analyse them with relevant theory and frameworks, generate and evaluate options against clear criteria, and finish with practical recommendations and an implementation plan. Support each point with evidence from the case.',
    specialist: 'james-p',
    updated: '2026-10-20',
  },
  'uk-masters-personal-statement': {
    quickAnswer:
      "A UK Master's personal statement is usually 500 to 1,000 words. Explain why you want this specific course, what has prepared you academically and professionally, what you will bring, and how the course fits your career goals. Use specific examples and follow each university's word or character limit.",
    specialist: 'sajjad-akbar-ali',
    updated: '2026-10-12',
  },
  'hrm-dissertation-topics': {
    quickAnswer:
      'A strong HRM dissertation topic names an HR issue, a sector and a group you can reach, for example line manager support and engagement among NHS nurses. This guide lists 40 HRM topics for 2026 across recruitment, wellbeing, hybrid work, reward, inclusion, AI in HR and Saudi Arabia, with the theories and methods that suit them.',
    specialist: 'nadia-s',
    updated: '2026-10-12',
  },
  'marketing-dissertation-topics': {
    quickAnswer:
      'The best marketing dissertation topics narrow a trend to a specific platform, product category and audience, for example paid partnership disclosure and trust in skincare influencers. This guide lists 40 topics for 2026 across social media, influencers, consumer behaviour, branding, sustainability, e-commerce and Saudi Arabia.',
    specialist: 'sara-m',
    updated: '2026-10-12',
  },
  'finance-accounting-dissertation-topics': {
    quickAnswer:
      'Good finance and accounting dissertation topics ask a measurable question with data you can access, such as ESG scores and firm value using annual reports. This guide lists 40 topics for 2026 across corporate finance, banking, Islamic finance, ESG, fintech, auditing and Saudi markets, plus methods and data sources.',
    specialist: 'abdul-rehman',
    updated: '2026-10-12',
  },
  'nursing-healthcare-dissertation-topics': {
    quickAnswer:
      'Many UK nursing dissertations are literature reviews built on a focused PICO question, such as whether hourly rounding reduces falls in older inpatients. This guide lists 40 nursing and healthcare topics for 2026 and explains how to search CINAHL and PubMed and appraise studies with CASP.',
    specialist: 'maya-c',
    updated: '2026-10-12',
  },
  'education-dissertation-topics': {
    quickAnswer:
      'A good education dissertation topic focuses on one practice, one group of learners or teachers and one outcome, such as retrieval practice in secondary science. This guide lists 40 education topics for 2026 across teaching, assessment, SEND, AI, higher education, early years and Saudi education, plus three worked dissertation examples with research questions, methods and chapter plans.',
    specialist: 'ayesha-h',
    updated: '2026-10-27',
  },
  'computer-science-dissertation-topics': {
    quickAnswer:
      'A good computer science dissertation has a clear problem, a project you can finish in time and a way to measure success, such as comparing model accuracy against a baseline. This guide lists 40 topics for 2026 across AI, cyber security, data science, software engineering, cloud, UX and Saudi digital services.',
    specialist: 'omar-f',
    updated: '2026-10-12',
  },
  'how-to-write-a-research-proposal': {
    quickAnswer:
      "A research proposal explains what you want to study, why it matters and how you will do it. Most include a title, background, research problem, aim, objectives and research questions, a short literature review, methodology, research approval and consent, a timeline and references. Master's proposals are often 1,000 to 3,000 words, and PhD proposals are commonly longer.",
    specialist: 'sajjad-akbar-ali',
    updated: '2026-10-13',
  },
  'quantitative-vs-qualitative-research': {
    quickAnswer:
      'Quantitative research collects numerical data, usually through surveys, experiments or existing datasets, and analyses it with statistics to measure and test relationships. Qualitative research collects words and observations, usually through interviews or focus groups, and analyses them for themes to understand experiences. Choose quantitative for how much or to what extent questions, and qualitative for how and why questions.',
    specialist: 'sophia-l',
    updated: '2026-10-21',
  },
  'how-to-write-a-dissertation-discussion': {
    quickAnswer:
      'The discussion chapter interprets your findings and explains what they mean. Briefly restate your aim, then for each key finding explain its meaning, compare it with the studies in your literature review, account for differences or surprises and set out the implications. Finish with the main limitations and a link to your conclusion. It is often about 20 to 25% of the word count.',
    specialist: 'sajjad-akbar-ali',
    updated: '2026-10-14',
  },
  'primary-vs-secondary-research': {
    quickAnswer:
      'The difference between primary and secondary research is who collected the data. Primary research means collecting new data yourself, for example through surveys, interviews or experiments. Secondary research uses data or studies that already exist, such as journal articles, government statistics or company reports. Primary data fits your question exactly but takes longer; secondary data is quicker and often larger but was collected for another purpose. Many dissertations combine both.',
    specialist: 'sophia-l',
    updated: '2026-10-21',
  },
};
