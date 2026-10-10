import type { BlogPost } from './types';

export const harvardReferencingGuidePost: BlogPost = {
  slug: "harvard-referencing-guide",
  locale: "en",
  title: "Harvard Referencing Guide: In-Text Citations and Reference List Examples",
  metaTitle: "Harvard Referencing Guide: Citations and Examples",
  metaDescription: "Harvard referencing guide with in-text citation rules and reference list examples for books, chapters, journals, websites and reports, plus common mistakes.",
  keywords: [
    "Harvard referencing guide",
    "Harvard referencing examples",
    "Harvard in-text citation",
    "Harvard reference list",
    "Cite Them Right Harvard",
    "how to reference a website Harvard",
    "Harvard referencing journal article"
  ],
  category: "Referencing",
  excerpt: "Everything you need to cite sources correctly in Harvard style: in-text citation rules, reference list patterns for every common source type, punctuation and the mistakes that cost marks.",
  published: "2026-10-10",
  intro: [
    "This Harvard referencing guide explains exactly how to cite sources in the text of your assignment and how to build a correct reference list at the end. Harvard is the most common referencing style at UK universities, especially in business, management, social sciences, education and health subjects, so getting it right is one of the easiest ways to protect your marks.",
    "One important point before we start: there is no single official version of Harvard. Each university publishes its own variation, and small details such as the use of brackets, commas, italics or 'et al.' can differ. The examples below follow the Cite Them Right style, which many UK universities use as their standard. Always check your module handbook or library guide, and if it says something different, follow your university."
  ],
  sections: [
    {
      heading: "What is Harvard referencing?",
      paragraphs: [
        "Harvard is an author-date system. Every time you use someone else's idea, data, argument or words, you place a short citation in your text giving the author's surname and the year of publication. The reader then finds the full details of that source in an alphabetical reference list at the end of your work.",
        "The two parts always work together. Every in-text citation must match an entry in your reference list, and every entry in your reference list must be cited somewhere in your text. If a source does not appear in your writing, it does not belong in the reference list."
      ],
      tip: "Reference as you write, not at the end. Adding a citation the moment you use a source takes seconds. Trying to trace an unreferenced quotation the night before the deadline can take hours."
    },
    {
      heading: "Harvard in-text citations: the basic rules",
      paragraphs: [
        "An in-text citation can be written in two ways. In a parenthetical citation, the author and year sit inside brackets, usually at the end of the sentence: (Surname, Year). In a narrative citation, the author's name is part of your sentence and only the year goes in brackets: Surname (Year) argues that..."
      ],
      subsections: [
        {
          heading: "One author",
          bullets: [
            "Parenthetical: Employee motivation is strongly linked to recognition (Smith, 2021).",
            "Narrative: Smith (2021) argues that employee motivation is strongly linked to recognition."
          ]
        },
        {
          heading: "Two or three authors",
          paragraphs: [
            "Name every author, joining the last two with 'and' (not '&' in Cite Them Right style)."
          ],
          bullets: [
            "Two authors: (Smith and Jones, 2020) or Smith and Jones (2020) found that...",
            "Three authors: (Smith, Jones and Patel, 2019) or Smith, Jones and Patel (2019) suggest that..."
          ]
        },
        {
          heading: "Four or more authors",
          paragraphs: [
            "Cite Them Right uses the first author's surname followed by 'et al.' (meaning 'and others') when a source has four or more authors. Some universities apply 'et al.' from three authors instead, so this is one of the details most worth checking in your handbook."
          ],
          bullets: [
            "(Khan et al., 2022)",
            "Khan et al. (2022) report that..."
          ]
        }
      ]
    },
    {
      heading: "Page numbers, quotations and multiple sources",
      paragraphs: [
        "Always give a page number when you quote directly, and many tutors also expect one when you paraphrase a specific point, table or figure. Use 'p.' for a single page and 'pp.' for a range."
      ],
      bullets: [
        "Short quotation: Leadership has been described as 'a process of influence' (Smith, 2021, p. 14).",
        "Page range: (Smith, 2021, pp. 14-16)",
        "Long quotations are usually set as an indented block without quotation marks; check your guide for the length.",
        "Several sources making the same point: (Jones, 2018; Patel, 2020; Smith, 2021). Separate them with semicolons and list them in date order or alphabetical order, whichever your handbook prefers, but be consistent.",
        "Same author, same year: add a lower-case letter, for example (Smith, 2021a) and (Smith, 2021b), and use the same letters in your reference list.",
        "Online sources with no page numbers: give a section heading or paragraph number if your guide allows it, or simply the author and year."
      ]
    },
    {
      heading: "Secondary citations, no date and organisations as authors",
      subsections: [
        {
          heading: "Secondary citation (a source cited in another source)",
          paragraphs: [
            "If you read about Brown's idea in a book by Green, but you did not read Brown's original work, you must make that clear. Write: Brown (2005, cited in Green, 2019) found that... or (Brown, 2005, cited in Green, 2019). In your reference list, include only Green (2019), because that is the source you actually read.",
            "Use secondary citations sparingly. Markers generally prefer that you find and read the original work wherever you can."
          ]
        },
        {
          heading: "No date",
          paragraphs: [
            "If a source genuinely has no publication date, write 'no date' in place of the year: (Organisation Name, no date). Before you do this, look carefully for a date at the bottom of web pages, on the copyright page, or in the document properties. A 'last updated' date usually counts."
          ]
        },
        {
          heading: "Organisation as author",
          paragraphs: [
            "Many reports and web pages are written by an organisation rather than a named person. Use the organisation's name as the author: (Department for Education, 2024) or (World Health Organization, 2023). If the organisation is usually known by an abbreviation, some guides let you give the full name the first time with the abbreviation in brackets, then use the abbreviation afterwards. Your reference list entry should still begin with the name exactly as it appears in your citation."
          ]
        }
      ]
    },
    {
      heading: "Harvard reference list format: the general rules",
      paragraphs: [
        "Your reference list starts on a new page with the heading 'Reference list' or 'References'. It contains the full details of every source you cited, arranged as follows."
      ],
      bullets: [
        "Alphabetical order by the first author's surname (or organisation name). Do not number the entries or split them by source type.",
        "Surname first, then initials: Smith, J. For several authors: Smith, J., Jones, K. and Patel, R.",
        "Year in round brackets straight after the author: Smith, J. (2021)",
        "The title of the main work (book, journal, report, website) is in italics. Article and chapter titles go in single quotation marks and are not italicised.",
        "Same author, several works: order by year, oldest first. Same author and year: 2021a, 2021b.",
        "Most universities ask for a hanging indent or single spacing between entries. Follow your handbook for layout."
      ],
      tip: "In the patterns below, italics cannot be shown in plain text, so remember: the book title, journal name, report title and web page title are italicised in your real reference list."
    },
    {
      heading: "Harvard referencing examples by source type",
      paragraphs: [
        "Use these patterns as templates. Replace each element with the details of your source, keeping the punctuation exactly as shown. The Cite Them Right style no longer requires the place of publication for books, but some university versions still include it (for example, London: Sage), so check which your course expects."
      ],
      subsections: [
        {
          heading: "Book",
          bullets: [
            "Pattern: Surname, Initial. (Year) Title of book. Edition (if not the first). Publisher.",
            "Generic example: Author, A. (2020) Title of book. 3rd edn. Publisher.",
            "Real example: Saunders, M., Lewis, P. and Thornhill, A. (2019) Research methods for business students. 8th edn. Pearson."
          ]
        },
        {
          heading: "Edited book",
          bullets: [
            "Pattern: Editor Surname, Initial. (ed.) (Year) Title of book. Publisher.",
            "Use (eds) for more than one editor: Editor, A. and Editor, B. (eds) (2018) Title of book. Publisher."
          ]
        },
        {
          heading: "Chapter in an edited book",
          bullets: [
            "Pattern: Chapter Author, Initial. (Year) 'Title of chapter', in Editor, Initial. (ed.) Title of book. Publisher, pp. first-last page.",
            "Generic example: Author, A. (2018) 'Title of chapter', in Editor, B. (ed.) Title of book. Publisher, pp. 45-67.",
            "In your text, cite the chapter author, not the editor: (Author, 2018)."
          ]
        },
        {
          heading: "Journal article",
          bullets: [
            "Pattern: Surname, Initial. (Year) 'Title of article', Journal Name, Volume(Issue), pp. first-last page. Available at: DOI or URL (Accessed: date).",
            "Real example: Braun, V. and Clarke, V. (2006) 'Using thematic analysis in psychology', Qualitative Research in Psychology, 3(2), pp. 77-101. Available at: https://doi.org/10.1191/1478088706qp063oa.",
            "Where a DOI is available, give it as a full https://doi.org/ link. Many Harvard versions do not require an accessed date for a DOI, but they do for a URL. Check your handbook."
          ]
        },
        {
          heading: "Website or web page",
          bullets: [
            "Pattern: Author or Organisation (Year) Title of web page. Available at: URL (Accessed: day month year).",
            "Generic example: Organisation Name (2024) Title of web page. Available at: https://www.example.org/page (Accessed: 10 October 2026).",
            "Use the date the page was published or last updated. The accessed date is the day you viewed it."
          ]
        },
        {
          heading: "Report (including government and company reports)",
          bullets: [
            "Pattern: Author or Organisation (Year) Title of report. Publisher (if different from the author). Available at: URL (Accessed: date).",
            "Generic example: Organisation Name (2023) Title of annual report 2023. Available at: https://www.example.org/report.pdf (Accessed: 10 October 2026).",
            "If the report has a series or report number, add it after the title."
          ]
        }
      ]
    },
    {
      heading: "Common Harvard referencing mistakes",
      paragraphs: [
        "These are the errors markers see most often. Each one is small, but together they can pull down the presentation and academic practice part of your grade."
      ],
      bullets: [
        "Citing in the text but forgetting the reference list entry, or the other way round.",
        "Putting first names or initials in the in-text citation: write (Smith, 2021), not (John Smith, 2021).",
        "Including the article title or URL in the in-text citation. The citation is only author, year and, if needed, page.",
        "Mixing styles, for example using '&' (APA) in some citations and 'and' in others, or switching between numbered and author-date references.",
        "Listing the editor instead of the chapter author when you used one chapter of an edited book.",
        "Referencing a website by its home page URL instead of the specific page you used.",
        "Missing page numbers for direct quotations.",
        "Citing the source you never read instead of using a secondary citation.",
        "Inconsistent punctuation and italics, often caused by copying references from Google Scholar or several different websites without checking them."
      ]
    },
    {
      heading: "Tools that make Harvard referencing easier",
      paragraphs: [
        "Reference management software can save hours on a long assignment or dissertation, but no tool is perfect. Always check every imported entry against your university's guide."
      ],
      bullets: [
        "Cite Them Right Online: many UK university libraries subscribe to it. Log in through your library to see examples for almost any source type.",
        "Zotero: free and open source. It captures details from web pages and databases and inserts citations into Word or Google Docs.",
        "Mendeley and EndNote: often supported by university libraries and useful for organising PDFs.",
        "Microsoft Word's built-in References tab: quick for short essays, but its Harvard style may not match your university's version exactly.",
        "Your library's own Harvard guide: the final authority for your course, so keep it open while you check your list."
      ]
    },
    {
      heading: "Quick Harvard referencing checklist",
      steps: [
        "Every quotation, paraphrase, statistic and idea from another source has an in-text citation.",
        "Every direct quotation has a page number.",
        "Every in-text citation matches a reference list entry with the same spelling and year.",
        "The reference list is alphabetical by surname, with no numbering or bullet points.",
        "Titles of books, journals, reports and web pages are italicised; article and chapter titles are in single quotation marks.",
        "Websites and online reports include 'Available at:' and an accessed date.",
        "Punctuation, 'and' versus '&', and 'et al.' rules are applied consistently and match your university's guide."
      ]
    },
    {
      heading: "Need help with your Harvard referencing?",
      paragraphs: [
        "If you are short on time or unsure whether your references meet your university's version of Harvard, FIZBS can help. Our experts, who hold Master's and PhD qualifications, check and correct in-text citations and reference lists in Harvard, APA, MLA, IEEE and OSCOLA, and explain the changes so you can apply them yourself next time.",
        "Proofreading and referencing support starts from £12 per 1,000 words, and you can message us on WhatsApp 24/7 to get a quick quote or ask a question before you order. Everything is kept 100% confidential."
      ]
    }
  ],
  faqs: [
    {
      q: "What is the correct format for Harvard referencing?",
      a: "Harvard is an author-date style. In the text you give the author's surname and year, for example (Smith, 2021), adding a page number for quotations. At the end you list every source alphabetically by surname with full details, such as Surname, Initial. (Year) Title. Publisher. The exact punctuation varies by university, so follow your own guide."
    },
    {
      q: "How do you cite a website in Harvard style?",
      a: "In the text, cite the author or organisation and year, for example (Organisation Name, 2024). In the reference list, write: Author or Organisation (Year) Title of web page. Available at: URL (Accessed: day month year). Use the specific page URL, not the home page."
    },
    {
      q: "When do you use et al. in Harvard referencing?",
      a: "In Cite Them Right Harvard, you use the first author's surname followed by et al. when a source has four or more authors, for example (Khan et al., 2022). Some universities use et al. from three authors, so check your handbook."
    },
    {
      q: "What is the difference between a reference list and a bibliography?",
      a: "A reference list includes only the sources you cited in your work. A bibliography may also include background sources you read but did not cite. Most UK assignments ask for a reference list, but some tutors want both."
    },
    {
      q: "How do you reference a source with no date in Harvard?",
      a: "Write 'no date' in place of the year, both in the text and in the reference list, for example (Organisation Name, no date). Check carefully for a 'last updated' or copyright date first, as these usually count as the publication date."
    },
    {
      q: "Is Harvard referencing the same at every university?",
      a: "No. Harvard is a family of similar styles rather than one fixed standard. Many UK universities follow Cite Them Right, but details such as place of publication, et al. rules and accessed dates can differ. Your university's library guide always takes priority."
    }
  ],
  relatedServices: ["referencing-help", "proofreading-editing-services", "essay-help", "assignment-help-uk"]
};
