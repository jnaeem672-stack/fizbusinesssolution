/**
 * Free student tools at /tools/{slug}. Each tool page combines an interactive tool (client component)
 * with guide content, FAQs (FAQPage schema) and links to related services and guides.
 */
export type ToolId = 'degree-classification-calculator' | 'harvard-referencing-generator' | 'apa-referencing-generator' | 'oscola-referencing-generator' | 'word-counter';

export interface ToolSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  steps?: string[];
  table?: { caption: string; head: string[]; rows: string[][] };
}

export interface ToolContent {
  slug: ToolId;
  /** Short name for cards, breadcrumbs and links */
  name: string;
  /** Browser/Google title (absolute, max ~60 characters) */
  metaTitle: string;
  /** Google description, 140-155 characters */
  metaDescription: string;
  h1: string;
  subtitle: string;
  /** One-line card description on the tools hub */
  cardText: string;
  sections: ToolSection[];
  faqs: { q: string; a: string }[];
  /** Landing page slugs that should link to this tool, and that this tool links to */
  services: string[];
  /** Blog guide slugs to recommend */
  guides: string[];
  /** Extra landing pages that show this tool in their Free Student Tools box (not listed on the tool page) */
  showOn?: string[];
  /** Guides that carry an in-article box linking to this tool */
  promotedIn?: string[];
  /** ISO date the tool or its page last changed meaningfully (sitemap lastmod) */
  updated?: string;
  whatsappMessage: string;
}

const UK_CITIES = ['birmingham', 'bradford', 'bristol', 'glasgow', 'leeds', 'liverpool', 'london', 'luton', 'manchester'].map((c) => `assignment-help-${c}`);
const SAUDI_PAGES = ['saudi-arabia', 'riyadh', 'jeddah', 'dammam', 'makkah'].map((c) => `assignment-help-${c}`);

/** Guides where an in-article box points students to the referencing generators */
const REFERENCING_GUIDES = [
  'harvard-referencing-guide', 'apa-referencing-guide', 'how-to-paraphrase-and-avoid-plagiarism', 'how-to-write-a-literature-review',
  'how-to-write-a-dissertation', 'how-to-write-a-dissertation-introduction', 'how-to-write-a-dissertation-discussion', 'how-to-write-a-dissertation-conclusion',
  'dissertation-methodology-guide', 'how-to-write-a-research-proposal', 'how-to-structure-a-university-essay', 'how-to-write-a-business-report',
  'how-to-write-a-case-study-analysis', 'gibbs-reflective-cycle-guide', 'swot-and-pestle-analysis-guide', 'thematic-analysis-guide',
  'primary-vs-secondary-research', 'quantitative-vs-qualitative-research', 'human-vs-ai-academic-writing',
];

const PAGES_TABLE_WORDS = [500, 750, 1000, 1500, 2000, 2500, 3000, 4000, 5000, 8000, 10000, 12000, 15000];
const pages = (words: number, perPage: number) => {
  const p = Math.round((words / perPage) * 2) / 2;
  return p % 1 === 0 ? String(p) : p.toFixed(1);
};

export const TOOLS: ToolContent[] = [
  {
    slug: 'degree-classification-calculator',
    name: 'Degree Classification Calculator',
    metaTitle: 'University Grade Calculator UK | Degree Classification',
    metaDescription:
      'Free university grade calculator for UK degrees. Enter module marks and year weightings to see your First, 2:1 or 2:2 and the average you need next.',
    h1: 'University Grade Calculator: UK Degree Classification',
    subtitle:
      "Work out your university grade and degree classification from your module marks, see how close you are to the next band, and find the average you need in your remaining modules. Works for undergraduate honours degrees and Master's degrees.",
    cardText: 'See your First, 2:1, 2:2 or Master\'s grade, and the marks you need in your remaining modules.',
    sections: [
      {
        heading: 'How UK degree classifications are worked out',
        paragraphs: [
          'Most UK universities mark each module out of 100. Each module carries a number of credits, usually 15, 20, 30 or 40, and a full year of undergraduate study is normally worth 120 credits. Your average for a year is weighted by credits, so a 40-credit dissertation counts twice as much as a 20-credit module.',
          'Your final classification then combines the averages of the years that count. In England, Wales and Northern Ireland, most three-year degrees use only the second and final years, with the final year weighted more heavily. Four-year degrees in Scotland usually base the classification on the two honours years (Years 3 and 4). The first year normally has to be passed but does not count towards the final mark, although some universities do include it.',
          'This calculator applies those steps for you: it averages your module marks by credits within each year, applies your year weightings, and compares the result with the usual UK grade bands.',
        ],
        table: {
          caption: 'Common UK grade bands',
          head: ['Average mark', 'Undergraduate honours', "Taught Master's"],
          rows: [
            ['70 and above', 'First Class (1st)', 'Distinction'],
            ['60 to 69', 'Upper Second Class (2:1)', 'Merit'],
            ['50 to 59', 'Lower Second Class (2:2)', 'Pass'],
            ['40 to 49', 'Third Class (3rd)', 'Fail at most universities'],
            ['Below 40', 'Fail or an ordinary (non-honours) degree', 'Fail'],
          ],
        },
      },
      {
        heading: "Master's degree classification in the UK",
        paragraphs: [
          "Taught Master's degrees such as an MSc, MA or MBA are not classified as a First or a 2:1. Most UK universities award them as a Distinction, a Merit or a Pass, based on your credit-weighted average across all modules, including the dissertation.",
          "A full taught Master's is usually worth 180 credits (90 ECTS credits), and the dissertation or final project is often 60 of those credits, so it has a big effect on your final average. Students who leave early may receive a Postgraduate Diploma (usually 120 credits) or a Postgraduate Certificate (usually 60 credits).",
        ],
        bullets: [
          'Distinction: usually an overall average of 70 or above',
          'Merit: usually 60 to 69',
          'Pass: usually 50 to 59',
          'Some universities also set a minimum dissertation mark for a Distinction or a Merit',
          "Choose \"Master's\" in the calculator above to see your grade and the marks you need",
        ],
      },
      {
        heading: 'Common year weightings',
        paragraphs: [
          'Universities publish their weighting in their academic regulations, usually in a section called "degree classification" or "award rules". Common patterns include:',
        ],
        bullets: [
          'Second year 50%, final year 50%',
          'Second year 40%, final year 60%',
          'Second year 33%, final year 67% (a 1:2 ratio)',
          'Second year 25%, final year 75% (a 1:3 ratio)',
          'Second year 20%, final year 80%',
          'Final year only (100%)',
          'Scottish honours degrees: often based on Years 3 and 4',
        ],
      },
      {
        heading: 'Borderline marks, rounding and other rules',
        paragraphs: [
          'Your average is not always the end of the story. Many universities round averages, so 69.5 may become 70. Many also have a borderline zone, often one or two marks below a boundary, where the exam board looks at how many of your credits were in the higher band. Some universities discount your lowest-scoring credits, or calculate your result in two different ways and award the better one.',
          "Master's degrees can have extra conditions too. For example, some universities require a dissertation mark of 70 or more for a Distinction, even if your overall average is above 70. The result here is a guide based on the numbers you enter, and your official result always follows your own university's regulations.",
        ],
      },
      {
        heading: 'How to use this calculator',
        steps: [
          'Choose undergraduate or Master\'s.',
          'For an undergraduate degree, pick your university\'s year weighting, or enter your own.',
          'Add each module with its credits and mark. Leave the mark empty for modules you have not finished yet.',
          'Check the total credits for each year (usually 120 for undergraduate years and 180 for a Master\'s).',
          'Read your current classification and the average you need in your remaining credits for each band.',
        ],
      },
      {
        heading: 'If the next band looks hard to reach',
        paragraphs: [
          'Seeing the average you need can be motivating, or worrying. The modules with the most credits left, usually the dissertation or final project, give you the most room to move your average, so it is worth planning those carefully and starting early.',
          "Read your marking criteria and past feedback, and look for the points that come up again and again: structure, critical analysis and referencing are the most common. If you would like an expert to look at a draft before you submit it, our Master's and PhD-qualified team can give clear, practical feedback from £20 per 1,000 words.",
        ],
      },
    ],
    faqs: [
      {
        q: 'How do I calculate my university grade?',
        a: "Multiply each module mark by its credits, add the results and divide by the total credits for that year. Then combine the year averages using your university's weighting, for example 40% for second year and 60% for final year. The university grade calculator above does both steps for you.",
      },
      {
        q: 'What percentage is a First in the UK?',
        a: 'At most UK universities, a First Class degree needs an overall weighted average of 70% or above. A 2:1 is usually 60 to 69%, a 2:2 is 50 to 59% and a Third is 40 to 49%.',
      },
      {
        q: 'Does first year count towards my degree?',
        a: 'At most universities in England, Wales and Northern Ireland, first year has to be passed but does not count towards your final classification. Some universities do give it a small weighting, so check your academic regulations.',
      },
      {
        q: 'How is a 2:1 calculated?',
        a: 'Your module marks are averaged by credits for each year that counts, then the year averages are combined using your university\'s weighting. If that final average is between 60 and 69, the result is usually a 2:1, subject to any borderline or rounding rules.',
      },
      {
        q: 'What is a borderline degree classification?',
        a: 'Many universities treat an average just below a boundary, often within one or two marks, as borderline. The exam board may then award the higher class if, for example, most of your credits are in the higher band.',
      },
      {
        q: "How are Master's degrees graded in the UK?",
        a: "Taught Master's degrees are usually awarded with Distinction (70% and above), Merit (60 to 69%) or Pass (50 to 59%). Some universities also set a minimum dissertation mark for a Distinction or Merit.",
      },
      {
        q: "What is a Merit in a UK Master's degree?",
        a: "A Merit is usually awarded for an overall Master's average of 60 to 69%. It sits above a Pass (50 to 59%) and below a Distinction (70% and above).",
      },
      {
        q: "How many credits is a UK Master's degree?",
        a: "A taught Master's is usually 180 credits, equal to 90 ECTS credits. The dissertation or final project often accounts for 60 of them.",
      },
      {
        q: 'Will this calculator match my official result?',
        a: 'It calculates your result from the marks, credits and weightings you enter. Your official result follows your university\'s regulations, which may include rounding, borderline rules or discounted credits.',
      },
      {
        q: 'Is my data saved or sent anywhere?',
        a: 'No. The calculation runs in your browser and your marks are not sent to us or stored on our servers.',
      },
    ],
    services: ['dissertation-help-uk', 'assignment-help-uk', 'draft-review-feedback', 'essay-help', 'assignment-help-glasgow', 'assignment-help-london'],
    guides: ['uk-university-grading-system', 'how-to-write-a-dissertation', 'how-to-structure-a-university-essay'],
    updated: '2026-10-21',
    whatsappMessage: 'Hello FIZBS, I would like to discuss my assignment.',
  },
  {
    slug: 'harvard-referencing-generator',
    name: 'Harvard Referencing Generator',
    metaTitle: 'Free Harvard Reference Generator | Harvard Referencing Tool',
    metaDescription:
      'Free Harvard reference generator in Cite Them Right style. Paste a DOI, ISBN or link for references, in-text citations and a sorted reference list.',
    h1: 'Free Harvard Referencing Generator',
    subtitle:
      'A free Harvard reference generator, citation maker and bibliography tool in the Cite Them Right style. Paste a DOI, ISBN or web link, or search by title, and the details fill in for you. Reference 10 types of source, from books and journal articles to newspapers, theses and lecture slides, keep a project for each assignment, and download your list as a Word file or copy it straight into your document, italics included.',
    cardText: 'Autocite by DOI, ISBN or link. Harvard references for 10 source types, saved in projects, with Word, RIS and BibTeX downloads.',
    sections: [
      {
        heading: 'How to use the Harvard referencing generator',
        steps: [
          'Choose what you are citing (Website, Book, Journal or More), then paste a DOI, ISBN or web link into the search bar, or type the title, and select Search.',
          'Check the details that fill in against your source, especially the capitalisation of the title, the year and the edition. If nothing is found, select Manual and fill in the details yourself.',
          'Select Save to project. Your reference list shows each reference as it will look in your document, sorted A to Z, and every reference has buttons to edit it, copy it or copy its in-text citation.',
          'Start a new project for each assignment. You can switch between Harvard and APA 7 at any time, and the whole list changes style.',
          'Select Download References for a Word file with a hanging indent, or an RIS or BibTeX file for Zotero, EndNote, Mendeley or Overleaf. You can also copy the list, or share it with a link.',
        ],
      },
      {
        heading: 'Harvard reference formats used by this tool',
        paragraphs: [
          'The generator follows the Cite Them Right version of Harvard, which many UK universities use as their standard. Titles shown in italics below are italic in your reference.',
        ],
        bullets: [
          'Book: Surname, Initial. (Year) Title of book. Edition. Publisher.',
          "Chapter in an edited book: Surname, Initial. (Year) 'Title of chapter', in Editor, Initial. (ed.) Title of book. Publisher, pp. first-last.",
          "Journal article: Surname, Initial. (Year) 'Title of article', Journal Name, Volume(Issue), pp. first-last. Available at: DOI.",
          'Website: Author or Organisation (Year) Title of web page. Available at: URL (Accessed: date).',
          'Report: Organisation (Year) Title of report. Publisher. Available at: URL (Accessed: date).',
          "Newspaper or magazine article: Surname, Initial. (Year) 'Title of article', Newspaper Name, Day Month, p. page. Available at: URL (Accessed: date).",
          'Thesis or dissertation: Surname, Initial. (Year) Title of thesis. PhD thesis. University. Available at: URL (Accessed: date).',
          'Video: Creator or Channel (Year) Title of video. Available at: URL (Accessed: date).',
          "Conference paper: Surname, Initial. (Year) 'Title of paper', in Editor, Initial. (ed.) Title of proceedings. Publisher, pp. first-last.",
          "Lecture or slides: Surname, Initial. (Year) 'Title' [PowerPoint presentation]. Module code: Module title. University. Available at: URL (Accessed: date).",
        ],
      },
      {
        heading: 'Autocite: Harvard references from a DOI, ISBN or link',
        paragraphs: [
          'Typing every detail by hand is slow and easy to get wrong, so the generator can look a source up for you. Paste a DOI for a journal article or book chapter, an ISBN for a book, or the link to a web page, news article or YouTube video. You can also type a title and choose the right match from the results.',
          'Journal articles, chapters and conference papers come from Crossref and DataCite, the official DOI registries. Books come from Open Library and Google Books. For web pages, our server reads the page once and picks out the title, author, date and site name that the publisher has added for search engines and social media.',
          'The details are only as good as the records behind them. Some publishers store titles in capital letters, some web pages hide the author or date, and a few sites block automatic reading. Always compare the reference with your source, use the Sentence case button if a title comes in with capitals on every word, and fill in anything that is missing.',
        ],
      },
      {
        heading: 'Harvard in-text citations',
        paragraphs: [
          'Every reference in your list needs at least one matching citation in your text, and every citation needs a matching reference. The generator gives you both forms:',
        ],
        bullets: [
          'Parenthetical: (Smith, 2021) at the end of the sentence',
          'Narrative: Smith (2021) argues that...',
          'Two authors: (Smith and Jones, 2021)',
          'Three authors: (Smith, Jones and Patel, 2021)',
          'Four or more authors: (Smith et al., 2021)',
          'Direct quotes need a page number: (Smith, 2021, p. 45)',
          'No date: (Organisation Name, no date)',
        ],
      },
      {
        heading: 'Common Harvard referencing mistakes',
        bullets: [
          'Citations in the text that do not appear in the reference list, or the other way round',
          'Using first names instead of initials in the reference list',
          'Forgetting the accessed date for websites and online reports',
          'Mixing styles, for example APA punctuation in a Harvard list',
          'Listing references by date or in the order used instead of alphabetically by surname',
          'Missing page numbers for direct quotations',
        ],
      },
      {
        heading: 'Harvard reference generator, citation generator or referencing tool?',
        paragraphs: [
          'Students search for this kind of tool under many names: a Harvard reference generator, a Harvard style referencing generator, a Harvard citation generator, a Harvard referencing website or tool, a referencer or a bibliography maker. They all mean the same thing. This generator creates both parts you need: the in-text citation, such as (Smith, 2021), and the full reference for the list at the end of your work.',
          'A reference list contains only the sources you cited in your text. A bibliography usually also includes sources you read but did not cite. Most UK universities ask for a reference list, but some modules ask for a bibliography as well. You can use the generator for both: add every source you consulted, then remove the ones you did not cite if your handbook asks for a reference list only.',
        ],
      },
      {
        heading: 'University versions of Harvard: Cite Them Right, Leeds Harvard and others',
        paragraphs: [
          "This generator follows Cite Them Right Harvard, the version most UK universities use. Some universities publish their own version instead, such as Leeds Harvard at the University of Leeds, and others adapt Harvard for particular departments. The core idea is the same everywhere, author and year in the text and an alphabetical list at the end, but small details differ. If your university uses its own version, generate the reference here, then check these points against your library guide:",
        ],
        bullets: [
          'Whether the year goes in brackets, for example (2021), or without them',
          'Whether the place of publication is included before the publisher',
          'How many authors you list in the text before using et al.',
          'How online sources are shown, for example "Available at:" or "Available from:" and the format of the accessed date',
          'Whether titles are in italics or another format',
        ],
      },
      {
        heading: 'Harvard is not one single style',
        paragraphs: [
          "There is no single official Harvard style. Universities publish their own versions, and details such as the use of 'et al.', the place of publication or the accessed date for DOIs can differ. Always compare the output with your module handbook or library guide, and follow your university where it differs.",
          'If you would like an expert to check a full reference list or correct citations throughout a draft, our referencing help covers Harvard, APA, OSCOLA, MLA and IEEE.',
        ],
      },
    ],
    faqs: [
      {
        q: 'What is Harvard referencing?',
        a: "Harvard is an author-date referencing style. You cite the author's surname and the year in your text, for example (Smith, 2021), and give the full details of each source in an alphabetical reference list at the end.",
      },
      {
        q: 'Which version of Harvard does this generator use?',
        a: 'It follows the Cite Them Right version of Harvard, which is widely used by UK universities. Check your module handbook, because some universities use their own variation.',
      },
      {
        q: 'Is this a Harvard citation generator or a bibliography maker?',
        a: 'Both. It creates the in-text citation and the full reference for each source, and builds an alphabetical list you can use as a reference list or a bibliography.',
      },
      {
        q: 'Can I use it for Leeds Harvard?',
        a: 'The generator follows Cite Them Right Harvard. Leeds Harvard, used at the University of Leeds, differs in some details, so generate your reference here and then check it against the Leeds library guide, adjusting points such as brackets, place of publication and online source format.',
      },
      {
        q: 'What is the difference between a reference list and a bibliography?',
        a: 'A reference list includes only the sources you cited in your work. A bibliography usually also lists sources you read for background but did not cite. Follow your module handbook on which one to include.',
      },
      {
        q: 'Do I need an accessed date?',
        a: 'Yes for websites and other online sources found by a URL. A DOI is a permanent link, so when you use a DOI the generator leaves out the accessed date, as Cite Them Right does.',
      },
      {
        q: 'How do I reference a source with no author?',
        a: 'If an organisation published it, use the organisation as the author. If there is genuinely no author, leave the author empty and the generator will start the reference with the title.',
      },
      {
        q: 'What if there is no date?',
        a: "Look carefully first, for example for a 'last updated' date. If there is genuinely no date, tick 'No date' and the generator will write (no date) in the reference and the citation.",
      },
      {
        q: 'When should I use et al.?',
        a: "In the Cite Them Right version of Harvard, use the first author's surname followed by et al. in your citation when there are four or more authors. The reference list here includes all authors.",
      },
      {
        q: 'Can it create a Harvard reference from a DOI, ISBN or link?',
        a: 'Yes. Paste a DOI, an ISBN or a web link into the search bar, or type the title, and the generator fills in the details from Crossref, DataCite, Open Library, Google Books or the web page itself. Check the details against your source before you save the reference, because records are sometimes incomplete.',
      },
      {
        q: 'Which sources can I reference?',
        a: 'Books, chapters in edited books, journal articles, websites, newspaper and magazine articles, reports, theses and dissertations, videos, conference papers, and lectures or slides from your course. You can also paste a reference you already have as pre-formatted text.',
      },
      {
        q: 'Can I switch my reference list from Harvard to APA?',
        a: 'Yes. Use the style menu above your list. Every reference in the project is rewritten in the style you choose, so you can move between Harvard and APA 7 without typing anything again.',
      },
      {
        q: 'Can I download my Harvard reference list as a Word document?',
        a: 'Yes. Select Download References and choose Word document. The file has the heading Reference list, a hanging indent and the font and size you picked. You can also download a plain text file, or an RIS or BibTeX file for Zotero, EndNote, Mendeley or Overleaf.',
      },
      {
        q: 'Can I keep separate reference lists for different assignments?',
        a: 'Yes. Select Start new project for each essay, report or dissertation. Your projects stay in this browser, and you can rename or delete them at any time. To keep a copy elsewhere, download the list or use Share to create a link.',
      },
      {
        q: 'Is the generator free?',
        a: 'Yes. It is free to use and needs no sign-up, and your projects are saved in your own browser only. When you search for a source, the DOI, ISBN, title or link you enter is sent to the lookup services named above, or to our server to read a web page, so that the details can be filled in. Share links carry the list inside the link itself, so nothing is stored on our server.',
      },
    ],
    services: ['referencing-help', 'essay-help', 'proofreading-editing-services', 'literature-review-help'],
    guides: ['harvard-referencing-guide', 'apa-referencing-guide', 'how-to-paraphrase-and-avoid-plagiarism'],
    showOn: [
      ...UK_CITIES, 'assignment-help-uk', 'dissertation-help-uk', 'assignment-help-uae', 'assignment-help-dubai',
      'coursework-report-help', 'business-management-assignment-help', 'mba-assignment-help', 'research-proposal-help', 'case-study-help',
      'cipd-assignment-help', 'cmi-assignment-help', 'hnd-hnc-assignment-help', 'othm-athe-assignment-help', 'marketing-assignment-help', 'hrm-assignment-help',
    ],
    promotedIn: REFERENCING_GUIDES,
    updated: '2026-10-23',
    whatsappMessage: 'Hello FIZBS, I would like to discuss my assignment.',
  },
  {
    slug: 'apa-referencing-generator',
    name: 'APA Referencing Generator',
    metaTitle: 'Free APA 7 Referencing Generator | Books, Journals, Web',
    metaDescription:
      'Free APA 7th edition referencing generator with autocite. Paste a DOI, ISBN or link, or fill in the form, for references and in-text citations in seconds.',
    h1: 'Free APA Referencing Generator (7th Edition)',
    subtitle:
      'Create APA 7 references and in-text citations in seconds. Paste a DOI, ISBN or web link, or search by title, and the details fill in for you. Reference 10 types of source, from books and journal articles to newspapers, theses and videos, keep a project for each assignment, and download your list as a Word file or copy it straight into your document, italics included.',
    cardText: 'Autocite by DOI, ISBN or link. APA 7 references for 10 source types, saved in projects, with Word, RIS and BibTeX downloads.',
    sections: [
      {
        heading: 'How to use the APA referencing generator',
        steps: [
          'Choose what you are citing (Website, Book, Journal or More), then paste a DOI, ISBN or web link into the search bar, or type the title, and select Search.',
          'Check the details that fill in against your source. APA titles need sentence case, so use the Sentence case button if a title comes in with capitals on every word. If nothing is found, select Manual and fill in the details yourself.',
          'Select Save to project. Your References page shows each reference with a hanging indent and double spacing, sorted A to Z, and every reference has buttons to edit it, copy it or copy its in-text citation.',
          'Start a new project for each assignment. You can switch between APA 7 and Harvard at any time, and the whole list changes style.',
          'Select Download References for a Word file in APA format, or an RIS or BibTeX file for Zotero, EndNote, Mendeley or Overleaf. You can also copy the list, or share it with a link.',
        ],
      },
      {
        heading: 'APA 7 reference formats used by this tool',
        paragraphs: [
          'Book, report and web page titles, journal names and journal volume numbers are italic in your reference. The generator adds the italics for you.',
        ],
        bullets: [
          'Book: Author, A. A. (Year). Title of book (2nd ed.). Publisher. https://doi.org/xxxx',
          'Chapter in an edited book: Author, A. A. (Year). Title of chapter. In E. E. Editor (Ed.), Title of book (pp. first-last). Publisher.',
          'Journal article: Author, A. A., & Author, B. B. (Year). Title of article. Journal Name, Volume(Issue), first-last. https://doi.org/xxxx',
          'Web page: Author or Organisation. (Year). Title of page. Website Name. URL',
          'Report: Organisation. (Year). Title of report. Publisher. URL',
          'Newspaper article: Author, A. A. (Year, Month Day). Title of article. Newspaper Name. URL',
          'Thesis or dissertation: Author, A. A. (Year). Title of thesis [Doctoral dissertation, University]. Database or Repository. URL',
          'Video: Author or Channel. (Year, Month Day). Title of video [Video]. YouTube. URL',
          'Conference paper in proceedings: Author, A. A. (Year). Title of paper. In E. E. Editor (Ed.), Title of proceedings (pp. first-last). Publisher. https://doi.org/xxxx',
          'Lecture slides: Lecturer, A. A. (Year, Month Day). Title of slides [PowerPoint slides]. University or Course Website. URL',
        ],
      },
      {
        heading: 'Autocite: APA references from a DOI, ISBN or link',
        paragraphs: [
          'APA 7 asks for a DOI wherever a source has one, and a DOI is also the quickest way to build the reference. Paste it into the search bar and the generator fills in the authors, year, title, journal, volume, issue and pages. An ISBN works the same way for books, and a link works for web pages, news articles and YouTube videos. You can also type a title and choose the right match from the results.',
          'Journal articles, chapters and conference papers come from Crossref and DataCite, the official DOI registries. Books come from Open Library and Google Books. For web pages, our server reads the page once and picks out the title, author, date and site name.',
          'Records are not always complete or in APA format. Titles often arrive in title case, so convert them to sentence case and check proper nouns, and add any missing date or author before you use the reference.',
        ],
      },
      {
        heading: 'APA in-text citations',
        paragraphs: [
          'Every reference in your list needs at least one matching citation in your text, and every citation needs a matching reference. The generator gives you both forms:',
        ],
        bullets: [
          'One author: (Smith, 2021) in brackets, or Smith (2021) in a sentence',
          'Two authors: (Smith & Jones, 2021) in brackets, but Smith and Jones (2021) in a sentence',
          'Three or more authors: (Smith et al., 2021), from the very first citation',
          'Group author: (World Health Organization, 2023)',
          'Direct quotes need a page number: (Smith, 2021, p. 45)',
          'No date: (Smith, n.d.)',
        ],
      },
      {
        heading: 'APA 7 compared with APA 6',
        paragraphs: ['If your older notes or a senior student\'s work use APA 6, these are the changes that catch most people out:'],
        bullets: [
          'The place of publication is no longer included for books',
          'Up to 20 authors are listed in the reference list, instead of 7',
          'et al. is used from the first citation for three or more authors',
          'DOIs are written as links, for example https://doi.org/10.1191/1478088706qp063oa',
          '"Retrieved from" is only used when a retrieval date is needed',
        ],
      },
      {
        heading: 'Common APA referencing mistakes',
        bullets: [
          'Using title case for book and article titles instead of sentence case',
          'Forgetting the ampersand (&) before the last author in the reference list',
          'Writing "and" inside brackets, or "&" in the running text',
          'Leaving out the italics on the journal name and volume number',
          'Adding "Retrieved from" or an access date when it is not needed',
          'Mixing APA and Harvard punctuation in the same reference list',
        ],
      },
      {
        heading: 'Check your course guidance',
        paragraphs: [
          'Some departments ask for small changes to APA, for example in how they want secondary sources, lecture slides or unpublished material referenced. Always compare the output with your module handbook or library guide, and follow your department where it differs.',
          'If you would like an expert to check a full reference list or correct citations throughout a draft, our referencing help covers APA, Harvard, OSCOLA, MLA and IEEE.',
        ],
      },
    ],
    faqs: [
      {
        q: 'What is APA referencing?',
        a: 'APA is an author-date style from the American Psychological Association, widely used in psychology, education, nursing, business and the social sciences. You cite the surname and year in your text and list the full details of each source alphabetically at the end.',
      },
      {
        q: 'Does this generator use APA 7?',
        a: 'Yes. It follows the rules of the 7th edition of the APA Publication Manual, including up to 20 authors in the reference list, et al. for three or more authors in citations, and DOIs written as links.',
      },
      {
        q: 'Will the generator change my titles to sentence case?',
        a: 'Only when you ask it to. Titles are kept as you type them or as the publisher records them, which is often title case. Select Sentence case above the title box to convert one, then check proper nouns such as place, company and theory names. Keep journal names in title case, as they appear on the journal.',
      },
      {
        q: 'Do I need a retrieval date for a website?',
        a: 'Usually not. APA 7 only asks for a retrieval date for pages that are designed to change over time and are not archived. For most web pages, the URL is enough.',
      },
      {
        q: 'When do I use et al. in APA?',
        a: 'From the first citation whenever a source has three or more authors, for example (Smith et al., 2021). The reference list itself includes up to 20 authors.',
      },
      {
        q: 'How do I reference a source with no author?',
        a: 'If an organisation published it, use the organisation as the author. If there is genuinely no author, leave the author empty: the title moves to the start of the reference and is used in the in-text citation.',
      },
      {
        q: 'Can it create an APA reference from a DOI?',
        a: 'Yes. Paste the DOI, or a link that contains it, into the search bar. The generator looks it up in Crossref or DataCite and fills in the details, with the DOI written as a link at the end of the reference as APA 7 requires.',
      },
      {
        q: 'Which sources can I reference?',
        a: 'Books, chapters in edited books, journal articles, web pages, newspaper and magazine articles, reports, theses and dissertations, videos, conference papers, and lecture slides or notes.',
      },
      {
        q: 'Can I download my APA reference list as a Word document?',
        a: 'Yes. Select Download References and choose Word document. The file has the heading References centred in bold, double spacing and a hanging indent, in the font and size you picked. RIS and BibTeX downloads are there for reference managers.',
      },
      {
        q: 'Is the generator free?',
        a: 'Yes. It is free to use and needs no sign-up, and your projects are saved in your own browser only. When you search for a source, the DOI, ISBN, title or link you enter is sent to the lookup services named above, or to our server to read a web page, so that the details can be filled in. Share links carry the list inside the link itself, so nothing is stored on our server.',
      },
    ],
    services: ['referencing-help', 'psychology-assignment-help', 'healthcare-nursing-assignment-help', 'education-assignment-help'],
    guides: ['apa-referencing-guide', 'harvard-referencing-guide', 'how-to-write-a-literature-review'],
    showOn: [...SAUDI_PAGES, 'assignment-help-usa', 'assignment-help-uae', 'assignment-help-leeds', 'dissertation-help-uk', 'thesis-help', 'research-methodology-help', 'spss-help', 'data-analysis-help', 'nvivo-thematic-analysis-help'],
    promotedIn: REFERENCING_GUIDES,
    updated: '2026-10-23',
    whatsappMessage: 'Hello FIZBS, I would like to discuss my assignment.',
  },
  {
    slug: 'oscola-referencing-generator',
    name: 'OSCOLA Referencing Generator',
    metaTitle: 'Free OSCOLA Referencing Generator (5th Edition, 2026)',
    metaDescription:
      'Free OSCOLA referencing generator for the 5th edition: footnotes, later footnotes without ibid, tables of cases and legislation, and a bibliography.',
    h1: 'Free OSCOLA Referencing Generator (5th Edition)',
    subtitle:
      'Create OSCOLA footnotes for cases, Acts, statutory instruments, EU law, ECHR judgments, books, journal articles, websites and more, following the 5th edition published by the Oxford Law Faculty in March 2026. Each source gives you the first footnote, the short form for later footnotes and the entry for your Table of Cases, Table of Legislation or Bibliography, and your list is sorted for you.',
    cardText: 'OSCOLA 5th edition footnotes for cases, legislation, books and articles, with tables of cases and legislation and a bibliography.',
    sections: [
      {
        heading: 'How to use the OSCOLA referencing generator',
        steps: [
          'Choose what you are citing: a UK case, an Act, a statutory instrument, EU legislation, an EU or ECHR case, or a book, chapter, journal article, website, newspaper article, thesis or report.',
          'Fill in the details. For books, articles and websites you can paste an ISBN, DOI or link and the details fill in for you. Select Show an example to see what each box should contain.',
          'Copy the footnote into your work. The preview also shows the short form for later footnotes, such as Corr (n 1), because the 5th edition of OSCOLA no longer uses ibid.',
          'Select Add to my list. Cases go into the Table of Cases, legislation into the Table of Legislation and secondary sources into the Bibliography, each sorted as OSCOLA requires.',
          'Copy the whole list or download it as a Word file. Your list is saved in this browser only.',
        ],
      },
      {
        heading: 'What changed in the 5th edition of OSCOLA',
        paragraphs: [
          'The Oxford Law Faculty published the 5th edition of OSCOLA in March 2026, replacing the 4th edition from 2012. If your module handbook or older online tools still show the 4th edition, these are the changes most likely to affect your footnotes:',
        ],
        bullets: [
          'No ibid: later footnotes use a short form with a cross-reference, for example Stevens (n 1) 110, and Latin terms such as supra and op cit are no longer used.',
          "Court identifiers: KBD for King's Bench Division judgments from 9 September 2022, QBD before that date.",
          'Neutral citations: do not use neutral citations created later for cases decided before 2001.',
          'EU court cases: cited with the European Case Law Identifier (ECLI), for example EU:C:2005:446, instead of a report reference.',
          'ECHR cases: cited by application number, for example App No 8139/09, with the date of the judgment.',
          'Websites and blogs: use a persistent link (such as Perma.cc) or a DOI where available. Otherwise give the URL and the date you accessed it.',
          'Theses: the title is now in italics. Command papers from 2019 onwards use the CP prefix.',
          'New guidance on social media, podcasts, generative AI and international law sources.',
        ],
      },
      {
        heading: 'OSCOLA footnote formats used by this tool',
        paragraphs: ['These examples come from the formats in the 5th edition. Case names, book titles and thesis titles are in italics in your footnotes.'],
        table: {
          caption: 'OSCOLA 5th edition footnote examples',
          head: ['Source', 'Footnote example'],
          rows: [
            ['UK case', 'Corr v IBC Vehicles Ltd [2008] UKHL 13, [2008] 1 AC 884.'],
            ['Case before 2001', 'Donoghue v Stevenson [1932] AC 562 (HL).'],
            ['Act', 'Human Rights Act 1998, s 2.'],
            ['Statutory instrument', 'Eggs and Chicks (England) Regulations 2009, SI 2009/2163, reg 7(2).'],
            ['EU court case', 'Case C-403/03 Schempp v Finanzamt EU:C:2005:446 [19].'],
            ['Book', 'HLA Hart, The Concept of Law (2nd edn, Clarendon Press 1994) 135.'],
            ['Journal article', "JAG Griffith, 'The Common Law and the Political Constitution' (2001) 117 LQR 42, 64."],
            ['Report', 'Law Commission, The Illegality Defence (Law Com No 320, 2010) para 3.12.'],
          ],
        },
      },
      {
        heading: 'Footnotes, later footnotes and the bibliography',
        paragraphs: [
          'OSCOLA is a footnote style. Put a footnote marker at the end of the sentence, after the punctuation, and give the full citation in the first footnote for each source. Every footnote ends with a full stop.',
          'When you cite the same source again, use a short form and the number of the footnote with the full citation, for example Corr (n 3) [12] for a case or Hart (n 5) 140 for a book. Legislation is usually cited in full again, or by a short form you defined in the first footnote, such as HRA 1998.',
          'At the end of your work, a Table of Cases and a Table of Legislation list the primary sources, and the Bibliography lists books, articles and other secondary sources. In the bibliography the surname comes first, followed by initials without full stops, for example Hart HLA, and entries do not end with a full stop.',
        ],
      },
      {
        heading: 'Tables of cases and legislation',
        bullets: [
          'Case names are not in italics in the Table of Cases.',
          "Cases are listed by the first significant word, so Re Farquar's Estate is listed as Farquar's Estate, Re.",
          'UK, EU and ECHR cases are listed in separate sections when you cite more than a few.',
          'Statutes come first in the Table of Legislation, then statutory instruments, then EU legislation.',
          'Your law school may ask you to add the page numbers where each source appears. Add these in Word once your work is finished.',
        ],
      },
      {
        heading: 'Common OSCOLA mistakes',
        bullets: [
          'Using ibid, which the 5th edition no longer allows',
          'Missing pinpoints for quotations: a paragraph in square brackets, for example [24], or a page number',
          'Putting a comma before the year of an Act (Human Rights Act, 1998 is wrong)',
          'Using p or pp before page numbers, which OSCOLA does not use',
          'Listing cases or legislation in the bibliography instead of the tables',
          'Using full stops in abbreviations and initials, such as H.L.A. Hart or L.Q.R.',
        ],
      },
      {
        heading: 'Check your law school handbook',
        paragraphs: [
          'Most UK law schools use OSCOLA, but some ask students to keep using the 4th edition for a while, and some add their own rules, for example on page numbers in tables. Follow your handbook where it differs from this tool. Irish law schools may use OSCOLA Ireland, which is a separate adaptation.',
          'If you would like an expert to check every footnote in a law essay, problem question or dissertation, our referencing help and law assignment help cover OSCOLA in full.',
        ],
      },
    ],
    faqs: [
      {
        q: 'What is OSCOLA referencing?',
        a: 'OSCOLA is the Oxford University Standard for Citation of Legal Authorities. It is a footnote referencing style used by most UK law schools and many law journals. Each source is cited in a footnote, and the work ends with tables of cases and legislation and a bibliography.',
      },
      {
        q: 'Which edition of OSCOLA does this generator use?',
        a: 'It follows the 5th edition, published by the Oxford Law Faculty in March 2026. If your law school still asks for the 4th edition, check the main differences listed on this page, especially ibid, which the 4th edition allowed.',
      },
      {
        q: 'Does OSCOLA still use ibid?',
        a: 'No. The 5th edition removed ibid and other Latin terms such as supra and op cit. For a later footnote, use a short form with the number of the earlier footnote, for example Stevens (n 1) 110.',
      },
      {
        q: 'How do I cite a case in OSCOLA?',
        a: 'Give the case name in italics, the neutral citation if there is one, then the best law report, for example Corr v IBC Vehicles Ltd [2008] UKHL 13, [2008] 1 AC 884. For cases before 2001, add the court in brackets after the report, for example Donoghue v Stevenson [1932] AC 562 (HL).',
      },
      {
        q: 'How do I cite an Act of Parliament in OSCOLA?',
        a: 'Give the short title and the year with no comma between them, then a comma and the section, for example Human Rights Act 1998, s 2. Use ss for more than one section. Titles of Acts are not in italics.',
      },
      {
        q: 'Does OSCOLA need a bibliography?',
        a: 'Usually yes, for longer work such as dissertations, and many modules ask for one in essays too. The bibliography lists secondary sources only. Cases and legislation go in separate tables. Check your module handbook.',
      },
      {
        q: 'Do OSCOLA footnotes end with a full stop?',
        a: 'Yes. Every footnote ends with a full stop. Entries in the bibliography and the tables do not.',
      },
      {
        q: 'How do I reference a website in OSCOLA?',
        a: "Give the author, the title in single quotation marks, the website name and date in brackets, and a persistent link or DOI if there is one. Otherwise give the URL in angle brackets and the date you accessed it, for example <https://www.gov.uk/...> accessed 28 October 2026.",
      },
      {
        q: 'Can it fill in the details automatically?',
        a: 'Yes for books, chapters, journal articles, websites, newspaper articles and reports: paste an ISBN, DOI or link, or type a title. Cases and legislation are typed in, because their citations need to match the law report or the official title exactly.',
      },
      {
        q: 'Is the OSCOLA generator free?',
        a: 'Yes. It is free and needs no sign-up. Your list is saved in your own browser only. When you search for a source, the ISBN, DOI, title or link you enter is sent to the lookup services or to our server to read the page, so that the details can be filled in.',
      },
    ],
    services: ['law-assignment-help', 'referencing-help'],
    guides: ['how-to-structure-a-university-essay', 'how-to-paraphrase-and-avoid-plagiarism', 'how-to-write-a-dissertation'],
    showOn: ['assignment-help-uk', 'dissertation-help-uk', 'essay-help', 'proofreading-editing-services', 'literature-review-help'],
    updated: '2026-10-28',
    whatsappMessage: 'Hello FIZBS, I would like to discuss my assignment.',
  },
  {
    slug: 'word-counter',
    name: 'Word Counter and Pages Converter',
    metaTitle: 'Word Counter and Words to Pages Converter | Free Tool',
    metaDescription:
      'Free word counter for essays and assignments: count words, characters and sentences, exclude your reference list, and see how many pages your text fills.',
    h1: 'Word Counter and Words to Pages Converter',
    subtitle:
      'Paste your essay or assignment to count words, characters, sentences and paragraphs. Leave out your reference list in one click, and see how many pages your word count fills at different line spacings.',
    cardText: 'Count words and characters, exclude your reference list, and convert words to pages.',
    sections: [
      {
        heading: 'How many pages is my word count?',
        paragraphs: [
          'The number of pages depends on the font, font size, margins and line spacing. The table below assumes an A4 page with standard 2.54 cm margins and a 12 point font such as Times New Roman or an 11 point font such as Arial. Headings, tables and short paragraphs will add pages, so treat these figures as estimates.',
        ],
        table: {
          caption: 'Words to pages (A4, 12 pt)',
          head: ['Words', 'Single spaced', '1.5 spaced', 'Double spaced'],
          rows: PAGES_TABLE_WORDS.map((w) => [w.toLocaleString('en-GB'), pages(w, 500), pages(w, 333), pages(w, 250)]),
        },
      },
      {
        heading: 'What counts towards your word count?',
        paragraphs: [
          'Most UK universities set their own word count rules, so check your module handbook first. As a general pattern:',
        ],
        bullets: [
          'The main text, headings and quotations usually count',
          'In-text citations usually count, although some departments exclude them',
          'The reference list or bibliography usually does not count',
          'Appendices, the title page and the contents page usually do not count',
          'Tables and figures vary: some count them, some do not',
          'Many universities allow a margin of around 10% over or under the limit, while others apply a penalty for any overrun',
        ],
      },
      {
        heading: 'Why counts differ between tools',
        paragraphs: [
          'Word processors and online counters do not always agree. Differences usually come from hyphenated words, numbers, symbols, web addresses and text in footnotes or text boxes. This counter treats a word as any group of characters between spaces that contains a letter or a number, which closely matches Microsoft Word for most academic text.',
          "If your university uses a specific tool, such as Word's own count, use that for the final check before you submit.",
        ],
      },
      {
        heading: 'Typical word counts for UK assignments',
        paragraphs: [
          'Lengths vary by university, subject and level, but these ranges are common:',
        ],
        bullets: [
          'Undergraduate essays and reports: 1,500 to 3,000 words',
          "Master's assignments: 2,500 to 5,000 words",
          'Reflective reports: 1,000 to 2,500 words',
          'Undergraduate dissertations: 8,000 to 12,000 words',
          "Master's dissertations: 12,000 to 20,000 words",
          'A presentation script: about 130 words per minute of speaking',
        ],
      },
      {
        heading: 'Getting to the right length',
        paragraphs: [
          'If you are over the limit, cut repetition first: summaries that restate earlier sections, long quotations and descriptive background usually go before analysis. If you are under, add depth rather than padding: more evidence, a counter-argument, or a closer link between theory and your example.',
          'Our proofreading and draft feedback services can help you tighten a draft that is too long or strengthen one that is too thin, from £12 per 1,000 words for proofreading.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How many pages is 1,000 words?',
        a: 'About 2 pages single spaced, 3 pages at 1.5 spacing, or 4 pages double spaced, on A4 with a 12 point font and standard margins.',
      },
      {
        q: 'How many pages is 2,000 words?',
        a: 'About 4 pages single spaced, 6 pages at 1.5 spacing, or 8 pages double spaced, on A4 with a 12 point font and standard margins.',
      },
      {
        q: 'How many pages is 3,000 words?',
        a: 'About 6 pages single spaced, 9 pages at 1.5 spacing, or 12 pages double spaced, on A4 with a 12 point font and standard margins.',
      },
      {
        q: 'Does the reference list count towards the word count?',
        a: "At most UK universities the reference list does not count. Tick 'Exclude reference list' and the counter will stop counting at a heading called References, Reference List or Bibliography.",
      },
      {
        q: 'Do in-text citations count towards the word count?',
        a: 'Usually yes, but some departments exclude them. Check your module handbook or ask your tutor.',
      },
      {
        q: 'What is the 10% word count rule?',
        a: 'Many UK universities allow you to go up to around 10% over or under the stated word count without a penalty. Others apply penalties for any overrun, so check your own assessment rules.',
      },
      {
        q: 'Is my text saved or uploaded?',
        a: 'No. Your text is counted in your browser and is never sent to us or stored on our servers.',
      },
    ],
    services: ['essay-help', 'proofreading-editing-services', 'coursework-report-help', 'draft-review-feedback'],
    guides: ['how-to-structure-a-university-essay', 'how-to-write-a-business-report', 'how-to-write-an-abstract'],
    whatsappMessage: 'Hello FIZBS, I would like to discuss my assignment.',
  },
];

export const TOOLS_PATH = '/tools';

export function getTool(slug: string): ToolContent | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function toolPath(tool: Pick<ToolContent, 'slug'>): string {
  return `${TOOLS_PATH}/${tool.slug}`;
}

/** Tools that are relevant to a landing page (for the "Free Student Tools" box on service pages) */
export function toolsForService(slug: string): ToolContent[] {
  return TOOLS.filter((t) => t.services.includes(slug) || t.showOn?.includes(slug));
}
