import type { BlogPost } from './types';

export const howToWriteADissertationFindingsChapterPost: BlogPost = {
  slug: 'how-to-write-a-dissertation-findings-chapter',
  locale: 'en',
  title: 'How to Write a Dissertation Findings Chapter (Quantitative and Qualitative)',
  metaTitle: 'How to Write a Dissertation Findings Chapter',
  metaDescription:
    'How to write a dissertation findings chapter: structure, reporting quantitative and qualitative results, tables, quotes and the mistakes to avoid.',
  keywords: [
    'dissertation findings chapter',
    'how to write findings in a dissertation',
    'results chapter dissertation',
    'findings chapter example',
    'presenting qualitative findings',
    'reporting statistical results APA',
  ],
  category: 'Dissertation',
  excerpt:
    'The findings chapter reports what your research found, clearly and objectively. Here is a simple structure, how to present statistics and themes, examples of good reporting and a checklist.',
  published: '2026-10-15',
  intro: [
    'After months of planning and data collection, the findings chapter is where you finally show what your research found. It should be one of the clearest chapters in your dissertation: organised around your research questions, accurate in every number and quote, and free of the interpretation that belongs in the discussion.',
    'Many students find this chapter harder than expected. Quantitative researchers are tempted to paste in every table from SPSS, and qualitative researchers are tempted to fill pages with long quotes. Both make the chapter harder to read and hide the results that matter.',
    'This guide explains what the findings chapter is for, gives you a clear structure, shows how to report statistics and themes with examples, and ends with the common mistakes and a checklist.',
  ],
  sections: [
    {
      heading: 'What the findings chapter is for',
      paragraphs: [
        'The findings chapter presents the results of your analysis objectively. It answers the question "what did I find?" for each research question or theme, and leaves "what does it mean?" to the discussion chapter.',
      ],
      bullets: [
        'Report the results that answer your research questions',
        'Organise them in a logical order, usually by research question or theme',
        'Support each result with evidence: statistics, tables, figures or quotes',
        'Include results that did not support your expectations',
        'Keep interpretation and comparison with the literature for the discussion',
      ],
      tip: 'A quick test for every paragraph: if it explains why a result happened or compares it with other studies, it probably belongs in the discussion chapter.',
    },
    {
      heading: 'Findings or results: what should you call it?',
      paragraphs: [
        'Quantitative dissertations usually call this chapter "Results", and qualitative dissertations usually call it "Findings". Some departments ask for a combined "Findings and Discussion" chapter, especially for qualitative studies. Follow your handbook, and if a combined chapter is allowed, still keep a clear line between reporting a result and interpreting it.',
      ],
    },
    {
      heading: 'Findings chapter structure',
      paragraphs: ['Most findings chapters follow this order. Adapt it to your design and your department guidance.'],
      steps: [
        'Introduction: restate your aims or research questions in a sentence or two and explain how the chapter is organised.',
        'Sample or participants: report your response rate and sample characteristics, or give a short table describing your interview participants.',
        'Data preparation: briefly note how the data were cleaned, how missing data were handled and, for scales, reliability checks such as Cronbach\'s alpha.',
        'Main findings: present the results for each research question or theme in turn, with the evidence for each.',
        'Additional findings: report other results that are relevant, including unexpected ones.',
        'Summary: list the key results in a short paragraph that leads into the discussion.',
      ],
    },
    {
      heading: 'How to present quantitative results',
      paragraphs: [
        'Start with descriptive statistics, such as means, standard deviations and frequencies, and then move to the inferential tests that answer your research questions. For each test, say what was tested, report the statistics in the style your department uses, and state the result in plain words.',
        'An illustrative example in APA style, from an invented study: "Participants who worked flexibly reported higher job satisfaction (M = 3.92, SD = 0.61) than those who did not (M = 3.48, SD = 0.72), t(148) = 4.02, p < .001, d = 0.66."',
      ],
      bullets: [
        'Report effect sizes, not only p values, so the reader can judge how large a difference or relationship is',
        'Report non-significant results too, in the same way as significant ones',
        'Use tables for many numbers and the text for the key ones; do not repeat every value from a table in a sentence',
        'Keep decimal places consistent, usually two, and three for p values',
        'Put full SPSS output in an appendix if your department wants it, never as screenshots in the chapter',
      ],
    },
    {
      heading: 'How to present qualitative findings',
      paragraphs: [
        'Organise qualitative findings by theme. For each theme, give it a clear name, explain what it captures, and support it with short quotes from different participants. Show how the theme answers your research question rather than retelling every interview.',
        'An illustrative example from an invented nursing study: "Protected time. Participants described preceptorship as valuable only when meetings were protected from ward pressures. As one nurse explained, \'When my meetings were cancelled, I felt I was just another pair of hands\' (P4). Most participants described similar experiences during periods of short staffing."',
      ],
      bullets: [
        'Use short quotes of one to three lines, and longer ones only when they add something essential',
        'Draw quotes from several participants, not the same two or three',
        'Use codes such as P4 or Nurse 3 and remove details that could identify anyone',
        'Show variation within a theme, including participants who saw things differently',
        'A table or thematic map of themes and sub-themes helps the reader follow the chapter',
      ],
    },
    {
      heading: 'Tables, figures and quotes: the basics',
      bullets: [
        'Number every table and figure and give it a clear title',
        'Refer to each table or figure in the text before it appears',
        'Format tables cleanly in your required style instead of copying SPSS output',
        'Choose the simplest chart that shows the result, such as a bar chart for comparing groups',
        'Introduce each quote and explain briefly what it shows',
      ],
    },
    {
      heading: 'How long should the findings chapter be?',
      paragraphs: [
        'In many dissertations the findings chapter takes around 15 to 20% of the total word count, which is roughly 1,500 to 2,000 words in a 10,000-word dissertation. Quantitative chapters are often shorter in words but include more tables, while qualitative chapters need more space for themes and quotes. Always follow your department guidance.',
      ],
    },
    {
      heading: 'Common findings chapter mistakes',
      bullets: [
        'Interpreting results or comparing them with the literature instead of reporting them',
        'Pasting raw SPSS output or NVivo screenshots into the chapter',
        'Reporting every analysis you ran, including ones that do not relate to your research questions',
        'Leaving out results that did not support your hypotheses',
        'Long strings of quotes with no explanation of what they show',
        'Describing your method again in detail, which belongs in the methodology chapter',
        'Inconsistent numbers between the text, tables and abstract',
      ],
    },
    {
      heading: 'Findings chapter checklist',
      bullets: [
        'Every research question or objective has a clear answer in the chapter',
        'The chapter follows a logical order that you explain in the introduction',
        'Sample or participant details are reported',
        'Statistics are reported completely and consistently, with effect sizes',
        'Themes are named, explained and supported with varied, anonymised quotes',
        'Tables and figures are numbered, titled and referred to in the text',
        'Interpretation is saved for the discussion chapter',
      ],
    },
  ],
  faqs: [
    {
      q: 'What is the difference between findings and discussion?',
      a: 'The findings chapter reports what you found, objectively. The discussion chapter interprets those results, compares them with the literature and explains what they mean for theory and practice.',
    },
    {
      q: 'Can I combine the findings and discussion chapters?',
      a: 'Some departments allow or expect a combined chapter, especially for qualitative research. Check your handbook and agree the structure with your supervisor.',
    },
    {
      q: 'Should I include SPSS output in my dissertation?',
      a: 'Not in the findings chapter. Report the key statistics in formatted tables and text. If your department wants the full output, put it in an appendix.',
    },
    {
      q: 'How many quotes should I use for each theme?',
      a: 'There is no fixed number, but two to four short quotes from different participants is common. Choose quotes that show the theme clearly and explain what each one shows.',
    },
    {
      q: 'What tense should I use in the findings chapter?',
      a: 'Use the past tense to report what you found, for example "participants reported" or "the analysis showed", and the present tense to refer to tables and figures, for example "Table 2 shows".',
    },
  ],
  relatedServices: ['data-analysis-help', 'spss-help', 'nvivo-thematic-analysis-help', 'dissertation-help-uk'],
};
