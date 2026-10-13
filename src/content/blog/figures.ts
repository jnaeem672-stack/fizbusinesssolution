/**
 * Original diagrams for the English guides (static SVG files in /public/images/guides).
 * Each figure is shown inside the section whose H2 matches `section`, and is listed in the BlogPosting schema.
 */
export interface GuideFigure {
  /** Exact H2 heading of the section the figure belongs to */
  section: string;
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  /** top: under the H2; afterText: after the paragraphs; default: after the lists, before sub-sections and tips */
  position?: 'top' | 'afterText';
}

export const GUIDE_FIGURES: Record<string, GuideFigure[]> = {
  "how-to-write-a-dissertation": [
    {
      section: "Dissertation structure: chapter by chapter with word count shares",
      src: '/images/guides/dissertation-structure-word-count.svg',
      alt: "Bar chart of typical word count shares by chapter: introduction about 10%, literature review 20 to 30%, methodology 10 to 15%, findings 15 to 20%, discussion 20 to 25%, conclusion 5 to 10%.",
      caption: "Typical word count shares for each chapter of a 10,000-word dissertation.",
      width: 800,
      height: 660,
      position: 'afterText',
    },
  ],
  "gibbs-reflective-cycle-guide": [
    {
      section: "The six stages of the Gibbs reflective cycle explained",
      src: '/images/guides/gibbs-reflective-cycle.svg',
      alt: "Cycle diagram of Gibbs' six stages in order: Description, Feelings, Evaluation, Analysis, Conclusion and Action plan, with the question each stage answers.",
      caption: "The six stages of Gibbs' Reflective Cycle (Gibbs, 1988) and the question each one answers.",
      width: 800,
      height: 798,
      position: 'afterText',
    },
  ],
  "thematic-analysis-guide": [
    {
      section: "How to do thematic analysis: the six phases",
      src: '/images/guides/thematic-analysis-six-phases.svg',
      alt: "Six phases of thematic analysis in order: familiarise, generate initial codes, search for themes, review themes, define and name themes, produce the report. Researchers move back and forth between phases.",
      caption: "Braun and Clarke's six phases of thematic analysis. Expect to move back and forth between them.",
      width: 800,
      height: 728,
      position: 'afterText',
    },
  ],
  "which-statistical-test-spss": [
    {
      section: "Which statistical test should I use? The decision table",
      src: '/images/guides/which-statistical-test-decision-tree.svg',
      alt: "Decision tree: to compare groups use t-tests or ANOVA (Mann-Whitney U, Wilcoxon, Kruskal-Wallis or Friedman if assumptions fail); to test relationships use Pearson, Spearman or chi-square; to predict use linear or logistic regression.",
      caption: "Choosing a statistical test from your research question, with the non-parametric alternative in brackets.",
      width: 960,
      height: 850,
    },
  ],
  "uk-university-grading-system": [
    {
      section: "Undergraduate degree classifications and percentage bands",
      src: '/images/guides/uk-grade-bands.svg',
      alt: "UK grade bands: undergraduate First 70% and above, 2:1 60 to 69%, 2:2 50 to 59%, Third 40 to 49%, Fail below 40%. Master's Distinction 70% and above, Merit 60 to 69%, Pass 50 to 59%, Fail below 50%.",
      caption: "Typical UK grade bands for undergraduate honours degrees and taught Master's degrees.",
      width: 800,
      height: 472,
      position: 'afterText',
    },
  ],
  "swot-and-pestle-analysis-guide": [
    {
      section: "How SWOT and PESTLE link together",
      src: '/images/guides/swot-pestle-tows.svg',
      alt: "Flow diagram: internal analysis feeds strengths and weaknesses; external analysis using PESTLE and Five Forces feeds opportunities and threats; the SWOT feeds a TOWS matrix of strategic options, which are evaluated to make recommendations.",
      caption: "Internal and external analysis feed the SWOT, which then feeds the TOWS matrix and your recommendations.",
      width: 800,
      height: 676,
    },
  ],
  "how-to-structure-a-university-essay": [
    {
      section: "The basic university essay structure",
      src: '/images/guides/university-essay-structure.svg',
      alt: "Essay structure: introduction about 10% with context, thesis and outline; main body about 80% made of PEEL paragraphs (point, evidence, explanation, link); conclusion about 10%; then the reference list.",
      caption: "The three-part essay structure, with PEEL paragraphs in the main body.",
      width: 800,
      height: 810,
    },
  ],
  "how-to-write-a-research-question": [
    {
      section: "How to narrow a topic into a research question",
      src: '/images/guides/research-question-funnel.svg',
      alt: "Funnel diagram narrowing social media marketing to influencer marketing and young consumers, then to influencer credibility among Generation Z sustainable fashion consumers in the UK, ending in a focused research question.",
      caption: "Narrowing a broad topic into a focused research question, using the worked example from this guide.",
      width: 800,
      height: 668,
    },
  ],
  "how-to-write-a-business-report": [
    {
      section: "Standard business report format",
      src: '/images/guides/business-report-structure.svg',
      alt: "Business report order: title page, executive summary, contents, introduction, findings and analysis, conclusions, recommendations, references and appendices.",
      caption: "The usual order of a university business report.",
      width: 800,
      height: 658,
    },
  ],
  "how-to-write-a-literature-review": [
    {
      section: "What is a literature review and what is it for?",
      src: '/images/guides/literature-review-process.svg',
      alt: "Six steps: search databases, build a keyword strategy, screen sources, organise them in a synthesis matrix, choose a structure, and write critically to identify the research gap.",
      caption: "The six steps covered in this guide, from searching databases to writing critically.",
      width: 800,
      height: 728,
    },
  ],
  "dissertation-methodology-guide": [
    {
      section: "What a dissertation methodology is and what it must do",
      src: '/images/guides/dissertation-methodology-decisions.svg',
      alt: "Methodology decisions in order, starting from the research question: philosophy, approach, design, sampling, data collection, data analysis, and approval and limitations, each justified against the research question.",
      caption: "The decisions your methodology chapter explains. Justify each one against your research question.",
      width: 800,
      height: 894,
    },
  ],
  "how-to-write-an-abstract": [
    {
      section: "The five-part abstract structure",
      src: '/images/guides/abstract-five-part-structure.svg',
      alt: "Five parts of an abstract in order: context, aim, method, findings, and conclusion and implications, with the most space given to method and findings.",
      caption: "Give one or two sentences to each part, with the most space for method and findings.",
      width: 800,
      height: 635,
    },
  ],
  "how-to-write-a-case-study-analysis": [
    {
      section: "Step 1: Read the case and the brief carefully",
      src: '/images/guides/case-study-analysis-steps.svg',
      alt: "Five steps of a case study analysis: read the case and brief, identify key issues, apply theory, generate and evaluate options, and recommend with an implementation plan.",
      caption: "The five steps of a case study analysis covered in this guide.",
      width: 800,
      height: 635,
      position: 'top',
    },
  ],
  "harvard-referencing-guide": [
    {
      section: "Harvard reference list format: the general rules",
      src: '/images/guides/harvard-book-reference-anatomy.svg',
      alt: "Labelled Harvard book reference: Author, A. (2020) Title of book. 3rd edn. Publisher. Surname then initials, year in round brackets, title in italics, edition if not the first, then publisher. In-text: (Author, 2020).",
      caption: "Each part of a Harvard book reference, with the matching in-text citation.",
      width: 900,
      height: 478,
    },
  ],
  "apa-referencing-guide": [
    {
      section: "APA reference list format",
      src: '/images/guides/apa-journal-reference-anatomy.svg',
      alt: "Labelled APA 7 journal reference: Braun, V., & Clarke, V. (2006). Using thematic analysis in psychology. Qualitative Research in Psychology, 3(2), 77-101, followed by the DOI link.",
      caption: "Each part of an APA 7 journal reference, using Braun and Clarke (2006) as the example.",
      width: 900,
      height: 834,
    },
  ],
  "how-to-write-a-research-proposal": [
    {
      section: "Research proposal structure: section by section",
      src: '/images/guides/research-proposal-structure.svg',
      alt: "The usual order of a research proposal: title, introduction and background, research problem, aim, objectives and questions, literature review, methodology, approval and consent, timeline and references.",
      caption: "The usual order of sections in a research proposal. Check your university template for its exact headings.",
      width: 800,
      height: 967,
      position: 'afterText',
    },
  ],
  "quantitative-vs-qualitative-research": [
    {
      section: "Quantitative vs qualitative: the key differences",
      src: '/images/guides/quantitative-vs-qualitative.svg',
      alt: "Comparison table: quantitative research asks how much or to what extent, uses numbers, larger samples, surveys and statistics, and gives generalisable patterns; qualitative research asks how and why, uses words, smaller purposive samples, interviews and thematic coding, and gives deep understanding of a context.",
      caption: "How quantitative and qualitative research differ, from the questions they ask to the results they give.",
      width: 800,
      height: 676,
      position: 'top',
    },
  ],
};
