import type { BlogPost } from './types';

export const oscolaReferencingGuidePost: BlogPost = {
  slug: "oscola-referencing-guide",
  locale: "en",
  title: "OSCOLA Referencing Guide (5th Edition): Footnotes, Cases and Bibliography",
  metaTitle: "OSCOLA Referencing Guide (5th Edition, 2026)",
  metaDescription: "OSCOLA referencing guide for the 5th edition: footnotes without ibid, how to cite cases, legislation, EU and ECHR materials, books, journals and websites.",
  keywords: [
    "OSCOLA referencing",
    "OSCOLA referencing guide",
    "OSCOLA footnotes",
    "OSCOLA 5th edition",
    "OSCOLA bibliography",
    "how to reference a case in OSCOLA",
    "OSCOLA ibid",
    "OSCOLA citation examples"
  ],
  category: "Referencing",
  excerpt: "A plain-English OSCOLA guide for UK law students: how footnotes and short forms work in the 5th edition, how to cite cases, legislation, EU and ECHR materials, books, journals and websites, and the tables and bibliography your work needs.",
  published: "2026-10-28",
  intro: [
    "OSCOLA is the referencing style used by most law schools in the United Kingdom. It stands for the Oxford University Standard for the Citation of Legal Authorities, and unlike Harvard or APA it is a footnote style: you mark each source with a small number in your text and give the citation at the bottom of the page. This guide explains how OSCOLA works in practice, with examples for cases, legislation, EU and European Court of Human Rights materials, books, journal articles and websites, and how to build the tables and bibliography your assignment or dissertation needs.",
    "One point before we start. The Oxford Law Faculty published the 5th edition of OSCOLA in March 2026, replacing the 4th edition from 2012. Several rules changed, and the most important is that OSCOLA no longer uses 'ibid'. If your module handbook, an older textbook or an online tool still shows the 2012 rules, check the examples below against the current edition. Your own module handbook always takes priority, so follow it where it differs."
  ],
  sections: [
    {
      heading: "What is OSCOLA referencing?",
      paragraphs: [
        "OSCOLA is a footnote citation system designed for legal writing. Every time you refer to a case, a piece of legislation, a book, an article or any other source, you place a superscript number at the end of the sentence, after the full stop, and write the citation in a footnote at the foot of the page. The reader can then see exactly which authority supports each point without the citation interrupting your argument.",
        "At the end of your work you also provide, where required, a Table of Cases, a Table of Legislation and a Bibliography. These are ordered lists of everything you cited: cases and legislation in their tables, and secondary sources such as books, chapters and articles in the bibliography.",
        "OSCOLA does not use author-date citations in the text, so you will not see anything like (Smith 2021) in an OSCOLA essay. All of the citation work happens in the footnotes and the end tables."
      ]
    },
    {
      heading: "What changed in the 5th edition (2026)",
      paragraphs: [
        "If you learned OSCOLA from the 2012 edition, these are the changes most likely to affect your footnotes. The 5th edition keeps the overall structure, so most of what you already know still applies."
      ],
      bullets: [
        "No more ibid. Later references to a source already cited use a short form with a cross-reference, such as Corr (n 1) 110, rather than ibid. Latin terms such as supra and op cit are no longer used either.",
        "Court identifiers for the senior courts. Use KBD for King's Bench Division judgments from 9 September 2022, and QBD for Queen's Bench Division judgments before that date.",
        "EU court cases are cited with the European Case Law Identifier (ECLI), for example EU:C:2005:446, instead of a report reference.",
        "European Court of Human Rights cases are cited by application number, for example App No 8139/09, together with the date of the judgment.",
        "Websites and blogs should be cited with a persistent link, such as a Perma.cc link or a DOI, where one is available, rather than only a plain URL.",
        "Do not add a neutral citation to a case decided before 2001, because neutral citations did not exist then."
      ]
    },
    {
      heading: "Footnotes: the first citation and later references",
      paragraphs: [
        "The first time you cite a source, give the full citation in the footnote. After that, you do not repeat the whole citation. Instead you use a short form that points the reader back to the footnote where the source first appeared.",
        "The short form is usually the author's surname, or a shortened case name, followed by the footnote number in brackets with the letter n, and a page or paragraph if needed. For example, if HLA Hart's book was first cited in footnote 1, a later reference is Hart (n 1) 142. For a case first cited in footnote 3, a later reference is Corr (n 3) [15].",
        "Because the 5th edition has removed ibid, you use this short form even when the previous footnote cited the same source. This makes footnotes a little longer than under the old rules, but it is clearer for the reader and avoids the confusion that ibid could cause when footnotes were edited."
      ],
      table: {
        caption: "OSCOLA footnotes: first citation and short form",
        head: ["Situation", "What you write"],
        rows: [
          ["First citation of a book", "HLA Hart, The Concept of Law (2nd edn, Clarendon Press 1994) 135."],
          ["Later reference to that book", "Hart (n 1) 142."],
          ["First citation of a case", "Corr v IBC Vehicles Ltd [2008] UKHL 13, [2008] 1 AC 884."],
          ["Later reference to that case", "Corr (n 3) [15]."]
        ]
      }
    },
    {
      heading: "How to cite a case in OSCOLA",
      paragraphs: [
        "A case citation gives the case name in italics, then the citation. For cases from 2001 onwards, start with the neutral citation (the court's own reference, such as [2008] UKHL 13), then add a law report reference where one exists, such as [2008] 1 AC 884. You do not add brackets with the court at the end when there is a neutral citation, because the neutral citation already identifies the court.",
        "For cases decided before 2001 there is no neutral citation, so you give the law report reference and then the court in round brackets, for example Donoghue v Stevenson [1932] AC 562 (HL). To pinpoint a paragraph in a modern judgment, put the paragraph number in square brackets, such as [15]; to pinpoint a page in an older report, give the page number."
      ],
      table: {
        caption: "OSCOLA case citation examples",
        head: ["Type of case", "Example footnote"],
        rows: [
          ["Modern case (2001 onwards)", "Corr v IBC Vehicles Ltd [2008] UKHL 13, [2008] 1 AC 884."],
          ["Case before 2001", "Donoghue v Stevenson [1932] AC 562 (HL)."],
          ["Pinpoint to a paragraph", "R (Miller) v Prime Minister [2019] UKSC 41, [2020] AC 373 [50]."],
          ["EU court case (ECLI)", "Case C-403/03 Schempp v Finanzamt EU:C:2005:446 [19]."],
          ["ECHR case (application number)", "Gillan and Quinton v United Kingdom App No 4158/05 (ECtHR, 12 January 2010)."]
        ]
      }
    },
    {
      heading: "How to cite legislation",
      paragraphs: [
        "Acts of Parliament are cited by their short title and year, with no comma before the year, and you can pinpoint a section with the abbreviation s. For example, Human Rights Act 1998, s 2. For more than one section you use ss, as in ss 2 to 4.",
        "Statutory instruments are cited by name, year, the SI number, and the relevant regulation or article. For example, Eggs and Chicks (England) Regulations 2009, SI 2009/2163, reg 7(2). Once you have cited an Act or instrument in full, you can refer to it afterwards by a sensible short name if that helps the reader."
      ],
      table: {
        caption: "OSCOLA legislation citation examples",
        head: ["Type", "Example footnote"],
        rows: [
          ["Act of Parliament", "Human Rights Act 1998, s 2."],
          ["Several sections of an Act", "Equality Act 2010, ss 13 to 19."],
          ["Statutory instrument", "Eggs and Chicks (England) Regulations 2009, SI 2009/2163, reg 7(2)."]
        ]
      }
    },
    {
      heading: "How to cite EU and ECHR materials",
      paragraphs: [
        "For judgments of the Court of Justice of the European Union, the 5th edition uses the European Case Law Identifier (ECLI). Give the case number and case name, then the ECLI, and a pinpoint paragraph if needed, for example Case C-403/03 Schempp v Finanzamt EU:C:2005:446 [19].",
        "For EU legislation, cite the type of instrument, its title and its reference in the Official Journal, for example Council Directive 2000/78/EC. For judgments of the European Court of Human Rights, cite by application number with the court and the date, for example Gillan and Quinton v United Kingdom App No 4158/05 (ECtHR, 12 January 2010)."
      ]
    },
    {
      heading: "How to cite books, chapters and journal articles",
      paragraphs: [
        "For a book, give the author's name as it appears on the work, then the title in italics, and in round brackets the edition (if it is not the first), the publisher and the year, followed by a pinpoint page. For example, HLA Hart, The Concept of Law (2nd edn, Clarendon Press 1994) 135. When there are more than three authors, give the first author's name followed by 'and others'.",
        "For a chapter in an edited book, give the chapter author, the chapter title in single quotation marks, then 'in' and the editor, the book title in italics, and the publication details. For a journal article, give the author, the article title in single quotation marks, then the year, the volume, the name of the journal (abbreviated where there is a standard abbreviation), and the first page of the article."
      ],
      table: {
        caption: "OSCOLA secondary source examples",
        head: ["Source", "Example footnote"],
        rows: [
          ["Book", "HLA Hart, The Concept of Law (2nd edn, Clarendon Press 1994) 135."],
          ["Chapter in an edited book", "John Gardner, 'Legal Positivism' in Jules Coleman and Scott Shapiro (eds), The Oxford Handbook of Jurisprudence (OUP 2002) 168."],
          ["Journal article", "Paul Craig, 'Theory, Pure Theory and Values in Public Law' [2005] PL 440."]
        ]
      }
    },
    {
      heading: "How to cite websites, blogs and newspapers",
      paragraphs: [
        "For a website or blog, give the author (if there is one), the title of the page in single quotation marks, the name of the site, the date if available, and the link. The 5th edition asks you to use a persistent link, such as a Perma.cc link or a DOI, where one exists, and to add the date you accessed the page. For a newspaper article, give the author, the headline in single quotation marks, the newspaper name in italics, the place and date, and the link if you read it online.",
        "Because web pages change, the accessed date tells the reader when you saw the content. Always check that the link still works before you submit."
      ]
    },
    {
      heading: "Tables of Cases and Legislation, and the Bibliography",
      paragraphs: [
        "At the end of your work you list what you cited. The Table of Cases lists every case, usually alphabetically by the first party's name. The Table of Legislation lists every Act and statutory instrument. The Bibliography lists secondary sources such as books, chapters and articles, ordered alphabetically by the author's surname.",
        "There are two small differences between a footnote and a bibliography entry. In the bibliography, the author's name is inverted so the surname comes first, for example Hart HLA, and there is no full stop at the end of the entry. A footnote, by contrast, keeps the author's name in its normal order and ends with a full stop. For a work with no named author, the bibliography entry begins with a long dash in place of the name."
      ]
    },
    {
      heading: "Common OSCOLA mistakes",
      bullets: [
        "Still using ibid. The 5th edition has removed it; use a short form with (n X) instead.",
        "Adding a neutral citation to a pre-2001 case, which did not have one. Give the law report and the court in brackets instead.",
        "Putting the footnote number before the full stop. In OSCOLA the superscript number comes after the punctuation at the end of the sentence.",
        "Forgetting to italicise case names and the titles of books and journals.",
        "Ending a bibliography entry with a full stop, or leaving the author's name in normal order. In the bibliography the surname comes first and there is no closing full stop.",
        "Mixing OSCOLA with Harvard by adding author-date citations in the text. OSCOLA keeps all citations in the footnotes."
      ]
    },
    {
      heading: "Build your OSCOLA references the quick way",
      paragraphs: [
        "Typing footnotes, short forms and tables by hand is slow and easy to get wrong. Our free OSCOLA referencing generator follows the 5th edition: it gives you the first footnote, the short form for later footnotes, and the entry for your Table of Cases, Table of Legislation or Bibliography, and it sorts your list for you.",
        "If you would like a person to check your citations, our team supports law students with referencing, proofreading and feedback on written work. You remain the author of your assignment; we help you get the details right."
      ],
      links: [
        { label: "Free OSCOLA referencing generator", href: "/tools/oscola-referencing-generator" },
        { label: "Law assignment support", href: "/law-assignment-help" },
        { label: "Referencing help", href: "/referencing-help" }
      ]
    }
  ],
  faqs: [
    {
      q: "What is OSCOLA referencing?",
      a: "OSCOLA is the Oxford University Standard for the Citation of Legal Authorities, the footnote referencing style used by most UK law schools. You mark each source with a superscript number and give the citation in a footnote, then list cases, legislation and secondary sources in a Table of Cases, a Table of Legislation and a Bibliography."
    },
    {
      q: "Does OSCOLA still use ibid?",
      a: "No. The 5th edition, published in March 2026, removed ibid. For a source you have already cited, use a short form with a cross-reference instead, such as Corr (n 1) 110. Latin terms such as supra and op cit are no longer used either."
    },
    {
      q: "How do you cite a case in OSCOLA?",
      a: "Put the case name in italics, then the citation. For cases from 2001 onwards, give the neutral citation and a law report, for example Corr v IBC Vehicles Ltd [2008] UKHL 13, [2008] 1 AC 884. For cases before 2001, give the law report and the court in brackets, for example Donoghue v Stevenson [1932] AC 562 (HL)."
    },
    {
      q: "How do you write later footnotes in OSCOLA without ibid?",
      a: "Use a short form that points back to the footnote where the source first appeared: the author's surname or a shortened case name, then the footnote number with the letter n in brackets, and a pinpoint if needed, for example Hart (n 1) 142 or Corr (n 3) [15]."
    },
    {
      q: "What is the difference between a footnote and a bibliography entry in OSCOLA?",
      a: "A footnote keeps the author's name in normal order and ends with a full stop. A bibliography entry inverts the name so the surname comes first, for example Hart HLA, and has no full stop at the end. Cases and legislation go in their own tables, not the bibliography."
    },
    {
      q: "Is OSCOLA the same as Harvard referencing?",
      a: "No. Harvard is an author-date style that puts a short citation like (Smith, 2021) in the text. OSCOLA is a footnote style used for legal writing, where the citations sit in footnotes and in end tables, and there are no author-date citations in the text."
    }
  ],
  relatedServices: ["law-assignment-help", "referencing-help", "proofreading-editing-services", "dissertation-help-uk"],
  sources: [
    { label: "OSCOLA, 5th edition (Oxford Law Faculty, March 2026)", href: "https://www.law.ox.ac.uk/research-subject-groups/publications/oscola" }
  ]
};
