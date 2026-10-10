import type { BlogPost } from './types';

export const apaReferencingGuidePost: BlogPost = {
  slug: 'apa-referencing-guide',
  locale: 'en',
  title: 'APA 7th Edition Referencing Guide: In-Text Citations and Reference List Examples',
  metaTitle: 'APA 7th Edition Referencing Guide (With Examples)',
  metaDescription:
    'A clear APA 7th edition referencing guide: in-text citations, et al., quotes, secondary sources and reference list examples for books, journals and websites.',
  keywords: [
    'APA referencing guide',
    'APA 7th edition',
    'APA in-text citation',
    'APA reference list examples',
    'APA vs Harvard',
  ],
  category: 'Referencing',
  excerpt:
    'Everything students need for APA 7: in-text citations, et al. rules, direct quotes, secondary sources and reference list formats for books, journal articles, websites and reports.',
  published: '2026-10-10',
  intro: [
    'APA style is used widely in psychology, education, nursing, health sciences, business and the social sciences, both in the UK and at many Saudi universities that teach in English. The current version is the 7th edition of the Publication Manual of the American Psychological Association, published in 2020. This APA referencing guide explains the rules students use most often, with patterns you can copy.',
    'APA is an author-date system. You cite the author and year in the text, and give full details in an alphabetical reference list at the end. It looks similar to Harvard, but the punctuation and some rules differ, so it pays to be precise.',
    'Note on formatting: in APA, book titles, journal names and journal volume numbers are written in italics. This page cannot show italics inside the examples, so we mark where italics belong.',
  ],
  sections: [
    {
      heading: 'APA in-text citations: the basics',
      paragraphs: [
        'There are two ways to cite in the text. A parenthetical citation puts the author and year in brackets: (Smith, 2021). A narrative citation makes the author part of your sentence: Smith (2021) argued that...',
        'Use the author\'s surname only, followed by the year of publication. Separate them with a comma in parenthetical citations.',
      ],
    },
    {
      heading: 'Citing one, two, three or more authors',
      bullets: [
        'One author: (Ahmed, 2022) or Ahmed (2022).',
        'Two authors: (Ahmed & Clarke, 2022) in brackets; Ahmed and Clarke (2022) in a sentence. Use "&" inside brackets and "and" in running text.',
        'Three or more authors: (Ahmed et al., 2022) from the first citation. This is a change from the 6th edition.',
        'Group author: (World Health Organization [WHO], 2023) the first time, then (WHO, 2023) afterwards, if the abbreviation is well known.',
        'No date: (Ahmed, n.d.).',
        'Several sources at once: (Ahmed, 2022; Clarke & Patel, 2019), in alphabetical order separated by semicolons.',
      ],
    },
    {
      heading: 'Direct quotations and page numbers',
      paragraphs: [
        'When you quote directly, include a page number: (Ahmed, 2022, p. 14) or for a range (Ahmed, 2022, pp. 14–15). For sources without page numbers, such as many webpages, use a paragraph number: (Ahmed, 2022, para. 3).',
        'Quotations of fewer than 40 words go in double quotation marks within your sentence. Quotations of 40 words or more become a block quotation: a new indented paragraph without quotation marks, followed by the citation.',
      ],
      tip: 'Most markers prefer paraphrasing to quoting. Use direct quotes sparingly, for definitions or particularly powerful wording.',
    },
    {
      heading: 'Secondary sources ("as cited in")',
      paragraphs: [
        'If you read about a study in another author\'s work and could not access the original, cite it as a secondary source: (Brown, 2010, as cited in Ahmed, 2022). Only the source you actually read (Ahmed, 2022) goes in your reference list. Use secondary citations sparingly and find the original where possible.',
      ],
    },
    {
      heading: 'APA reference list format',
      bullets: [
        'Title the page "References", centred and in bold.',
        'List entries alphabetically by the first author\'s surname.',
        'Use a hanging indent (the second and later lines indented) and double spacing.',
        'Use initials for first names: Ahmed, S. A.',
        'List up to 20 authors in the reference list, with "&" before the last.',
        'Use sentence case for titles of articles and books (only the first word, the first word after a colon and proper nouns capitalised).',
        'Use title case for journal names.',
        'Include a DOI as a full link (https://doi.org/...) whenever one exists.',
      ],
    },
    {
      heading: 'Reference list examples by source type',
      subsections: [
        {
          heading: 'Book',
          paragraphs: [
            'Pattern: Author, A. A. (Year). Title of book in italics: Subtitle in sentence case (edition if not first). Publisher. https://doi.org/xxxx (if available)',
            'APA 7 no longer includes the publisher location.',
          ],
        },
        {
          heading: 'Chapter in an edited book',
          paragraphs: [
            'Pattern: Author, A. A. (Year). Title of chapter. In E. E. Editor (Ed.), Title of book in italics (pp. xx–xx). Publisher.',
            'Use (Eds.) for more than one editor.',
          ],
        },
        {
          heading: 'Journal article',
          paragraphs: [
            'Pattern: Author, A. A., & Author, B. B. (Year). Title of article. Journal Name in italics, volume in italics(issue), page range. https://doi.org/xxxx',
            'Real example: Braun, V., & Clarke, V. (2006). Using thematic analysis in psychology. Qualitative Research in Psychology, 3(2), 77–101. https://doi.org/10.1191/1478088706qp063oa (the journal name and the volume number 3 are italic).',
          ],
        },
        {
          heading: 'Webpage',
          paragraphs: [
            'Pattern: Author or Organisation. (Year, Month Day). Title of page in italics. Site Name. URL',
            'If the author and the site name are the same, leave out the site name. If there is no date, use (n.d.).',
          ],
        },
        {
          heading: 'Report by an organisation',
          paragraphs: ['Pattern: Organisation Name. (Year). Title of report in italics. URL'],
        },
        {
          heading: 'The APA manual itself',
          paragraphs: [
            'American Psychological Association. (2020). Publication manual of the American Psychological Association (7th ed.). https://doi.org/10.1037/0000165-000 (the title is italic).',
          ],
        },
      ],
    },
    {
      heading: 'APA vs Harvard: key differences',
      bullets: [
        'In-text: APA uses a comma between author and year (Ahmed, 2022); many Harvard versions do not (Ahmed 2022).',
        'APA uses "&" in brackets and "et al." from three authors; Harvard rules for et al. vary by university.',
        'Reference list: APA puts the year in brackets after the authors; Harvard (Cite Them Right) usually does not.',
        'APA uses sentence case for article and book titles; Harvard versions vary.',
        'APA 7 removes publisher location; some Harvard versions still include it.',
      ],
      paragraphs: ['Always follow the exact style your module asks for, and do not mix the two.'],
    },
    {
      heading: "Citing other common sources in APA",
      subsections: [
        {
          heading: "Lecture slides or module materials",
          paragraphs: ["Many universities prefer you to cite the original sources mentioned in lectures rather than the slides themselves. If you must cite slides, a common pattern is: Lecturer, A. A. (Year, Month Day). Title of slides in italics [Lecture slides]. Learning platform name. URL. Check your module guidance, as some departments do not accept slides as sources."],
        },
        {
          heading: "Government and legal documents",
          paragraphs: ["Treat a government department or agency as a group author, for example Department for Education. (Year). Title in italics. URL. For legislation, APA has specific legal formats, and UK law students usually use OSCOLA instead of APA."],
        },
        {
          heading: "Generative AI tools",
          paragraphs: ["APA has published guidance on citing generative AI tools, treating the company that created the tool as the author. Before using any AI tool, check whether your university allows it for the assessment and how any use must be acknowledged. Never cite a source that an AI tool suggested without finding and reading the original, as AI tools can produce references that do not exist."],
        },
      ],
    },
    {
      heading: "Formatting an APA paper: quick checklist",
      bullets: [
        "Use a clear, readable font such as 11-point Calibri or Arial, or 12-point Times New Roman, unless your module specifies otherwise.",
        "Double-space the text, including the reference list.",
        "Use 2.54 cm (1 inch) margins on all sides.",
        "Indent the first line of each paragraph by 1.27 cm (0.5 inch).",
        "Use APA heading levels: Level 1 centred and bold, Level 2 left-aligned and bold, Level 3 left-aligned, bold and italic.",
        "Number tables and figures in bold (Table 1, Figure 1) with an italic title underneath.",
        "Student papers usually need a title page with title, name, course, instructor and date, unless your university says otherwise.",
      ],
    },
    {
      heading: 'Common APA mistakes',
      bullets: [
        'Using "and" instead of "&" inside brackets, or the reverse.',
        'Listing all authors in text instead of using et al. for three or more.',
        'Forgetting page numbers for direct quotes.',
        'Missing DOIs, or writing them as "doi:" instead of a full https link.',
        'Title case for article titles instead of sentence case.',
        'In-text citations that do not appear in the reference list, or the reverse.',
        'Inconsistent formatting across the list.',
      ],
    },
    {
      heading: 'Need help with APA referencing?',
      paragraphs: [
        'Referencing errors are one of the easiest ways to lose marks, and also one of the easiest to fix. FIZBS experts can check your in-text citations and reference list against APA 7 as part of our proofreading and editing service, from £12 per 1,000 words, or help with the full assignment from £20 per 1,000 words. Message us on WhatsApp 24/7; new customers get 10% off.',
      ],
    },
  ],
  faqs: [
    {
      q: 'What is the APA 7th edition?',
      a: 'It is the current version of the American Psychological Association\'s style guide, published in 2020. It sets the rules for citations, references and paper formatting.',
    },
    {
      q: 'When do I use et al. in APA 7?',
      a: 'For sources with three or more authors, use the first author\'s surname followed by et al. from the very first in-text citation, for example (Ahmed et al., 2022).',
    },
    {
      q: 'Do I need page numbers in APA citations?',
      a: 'You need them for direct quotations. For paraphrasing they are optional but encouraged when referring to a specific part of a long work.',
    },
    {
      q: 'How do I cite a website with no date in APA?',
      a: 'Use n.d. in place of the year, for example (World Health Organization, n.d.), and n.d. in the reference list entry.',
    },
    {
      q: 'Does APA 7 include the publisher location?',
      a: 'No. APA 7 removed the publisher location from book references. Include only the publisher name.',
    },
    {
      q: 'Is APA the same as Harvard referencing?',
      a: 'Both are author-date styles, but they differ in punctuation, et al. rules and reference list formatting. Use the style your university or module specifies.',
    },
  ],
  relatedServices: ['referencing-help', 'proofreading-editing-services', 'essay-help'],
};
