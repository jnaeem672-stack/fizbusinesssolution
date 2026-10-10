import type { BlogPost } from './types';

export const howToWriteALiteratureReviewPost: BlogPost = {
  slug: "how-to-write-a-literature-review",
  locale: "en",
  title: "How to Write a Literature Review: Structure, Examples and Tips",
  metaTitle: "How to Write a Literature Review: Structure and Tips",
  metaDescription: "Learn how to write a literature review step by step: database searches, screening, a synthesis matrix, structure options and finding your research gap.",
  keywords: [
    "how to write a literature review",
    "literature review structure",
    "literature review example",
    "synthesis matrix",
    "thematic literature review",
    "research gap",
    "literature review for dissertation"
  ],
  category: "Dissertation",
  excerpt: "A practical, step-by-step guide to searching, screening, synthesising and structuring a literature review, with example sentences for critical analysis and tips for identifying your research gap.",
  published: "2026-10-10",
  intro: [
    "Knowing how to write a literature review is one of the most important skills in a dissertation, thesis or research proposal. A literature review is not a list of summaries. It is a critical, organised discussion of what is already known about your topic, where researchers agree and disagree, and what is still missing. That missing piece, the research gap, is what justifies your own study.",
    "This guide walks you through the full process: searching databases, choosing keywords, screening sources, organising your reading in a synthesis matrix, choosing a structure, writing critically and identifying the gap. The same approach works for undergraduate dissertations, Master's projects and standalone literature review assignments."
  ],
  sections: [
    {
      heading: "What is a literature review and what is it for?",
      paragraphs: [
        "A literature review surveys published research on a defined topic and evaluates it. In a dissertation, it usually sits after the introduction and before the methodology chapter, and it does several jobs at once."
      ],
      bullets: [
        "Shows your marker that you understand the key theories, debates and studies in your field.",
        "Explains the concepts and theoretical framework your own research will use.",
        "Compares and evaluates previous studies rather than simply describing them.",
        "Identifies a gap, weakness or unresolved question in the existing research.",
        "Justifies your research questions and, often, your choice of methods."
      ],
      tip: "Before you start, write your research question or aim on a sticky note. Every source you include should help answer the question: what does this tell me about my topic?"
    },
    {
      heading: "Step 1: Search the right databases",
      paragraphs: [
        "Google Scholar is a useful starting point, but it should not be your only source. Your university library gives you access to subject databases that return more relevant, peer-reviewed results and let you filter by date, document type and subject."
      ],
      bullets: [
        "Multidisciplinary: Scopus, Web of Science, JSTOR, ProQuest and your library's own search tool.",
        "Business and management: Business Source Complete (EBSCO), Emerald Insight and ProQuest's business collections.",
        "Health and nursing: PubMed/MEDLINE, CINAHL and the Cochrane Library.",
        "Psychology and education: PsycINFO and ERIC.",
        "Grey literature: government reports, industry bodies and theses, which can be useful context, though they are usually not peer reviewed."
      ],
      tip: "Use the 'cited by' link in Google Scholar and the reference list of a strong recent article to trace key studies backwards and forwards. This is often faster than keyword searching alone."
    },
    {
      heading: "Step 2: Build a keyword search strategy",
      paragraphs: [
        "Break your research question into two or three main concepts, then list synonyms and related terms for each one. Combine them using Boolean operators. For example, a study on remote work and employee wellbeing might use the concepts 'remote work', 'wellbeing' and 'employees'."
      ],
      bullets: [
        "AND narrows your search: \"remote work\" AND wellbeing.",
        "OR broadens it with synonyms: (\"remote work\" OR teleworking OR \"working from home\").",
        "NOT excludes terms, but use it carefully as it can remove relevant papers.",
        "Quotation marks search for an exact phrase: \"employee engagement\".",
        "An asterisk truncates a word in most databases: employ* finds employee, employees, employer and employment.",
        "Keep a simple search log (database, date, search string, number of results). It makes your methodology easier to write and lets you repeat searches later."
      ]
    },
    {
      heading: "Step 3: Screen and select your sources",
      paragraphs: [
        "Your searches will usually return far more results than you can read. Screening helps you narrow them down in a consistent, defensible way. Decide your inclusion and exclusion criteria before you start, for example publication date range, language, peer-reviewed status, geographical context or population studied."
      ],
      steps: [
        "Remove duplicates found across different databases.",
        "Screen titles and abstracts against your criteria and remove clearly irrelevant papers.",
        "Read the full text of the remaining papers and decide which to include, noting a brief reason for each exclusion.",
        "Check the quality of each included study: is the method appropriate, the sample adequate and the conclusion supported by the data?",
        "Add key papers found by following reference lists and citations."
      ],
      tip: "If you are writing a systematic review, your university will probably expect a PRISMA flow diagram showing how many records were identified, screened, excluded and included. For a standard dissertation review, a short paragraph explaining your search and criteria is usually enough."
    },
    {
      heading: "Step 4: Organise your reading with a synthesis matrix",
      paragraphs: [
        "A synthesis matrix is a table that helps you see connections between sources. Instead of making separate notes on each paper, you record each source in a row and the main themes or variables in columns. Patterns, agreements and contradictions then become visible, which is exactly what you need to write critically.",
        "A simple matrix might use these columns:"
      ],
      bullets: [
        "Author and year",
        "Aim or research question",
        "Context and sample (country, sector, participants)",
        "Method (survey, interviews, experiment, case study, review)",
        "Key findings",
        "Theme 1, Theme 2, Theme 3 (what the source says about each)",
        "Strengths and limitations",
        "Relevance to your study"
      ],
      tip: "You can build a synthesis matrix in Excel, Google Sheets or a table in Word. Reference managers such as Zotero or Mendeley are useful alongside it for storing PDFs and generating citations."
    },
    {
      heading: "Step 5: Choose a literature review structure",
      paragraphs: [
        "Like any academic chapter, a literature review has an introduction, a main body and a conclusion. The introduction states the scope and how the chapter is organised. The conclusion summarises the key points and states the gap. The real choice is how to organise the main body."
      ],
      subsections: [
        {
          heading: "Thematic structure",
          paragraphs: [
            "The body is divided into themes or debates, each with its own subheading. This is the most common and usually the most effective structure because it pushes you to compare sources. For example, a review on remote work might use sections on productivity, wellbeing and isolation, and management and trust."
          ]
        },
        {
          heading: "Chronological structure",
          paragraphs: [
            "Sources are discussed in the order the field developed, showing how thinking has changed over time. This works when there are clear turning points, such as a new policy or technology. Avoid turning it into a timeline of summaries: explain why ideas changed and what that means."
          ]
        },
        {
          heading: "Methodological structure",
          paragraphs: [
            "Studies are grouped by research approach, for example quantitative surveys, qualitative interviews and mixed methods. This is useful when different methods have produced different findings, or when you need to justify your own choice of method."
          ]
        },
        {
          heading: "Theoretical structure",
          paragraphs: [
            "Sections are organised around competing theories or models, often leading to the framework you will adopt. Many reviews combine approaches, such as a thematic body with a short theoretical section at the start."
          ]
        }
      ]
    },
    {
      heading: "Step 6: Write critically, not descriptively",
      paragraphs: [
        "The most common feedback on literature reviews is 'too descriptive'. Critical writing means comparing sources, evaluating their quality and explaining what they mean for your topic. A useful rule is that each paragraph should be built around a point you are making, not around a single author.",
        "A descriptive sentence: Smith (2020) studied remote workers and found higher productivity. A critical version: While Smith (2020) reports higher productivity among remote workers, the study relied on self-reported data from a single technology firm, which limits how far the findings can be applied to other sectors."
      ],
      subsections: [
        {
          heading: "Example sentences for comparing sources",
          bullets: [
            "Several studies agree that... (Author, Year; Author, Year).",
            "This finding is consistent with / contradicts the work of...",
            "In contrast to earlier research, more recent studies suggest...",
            "Although both studies examine..., they reach different conclusions because..."
          ]
        },
        {
          heading: "Example sentences for evaluating sources",
          bullets: [
            "However, the small sample size limits the generalisability of these findings.",
            "A strength of this study is its longitudinal design, which allows...",
            "This conclusion should be treated with caution, as the data were collected...",
            "The model has been criticised for overlooking..."
          ]
        },
        {
          heading: "Example sentences for synthesising and linking to your study",
          bullets: [
            "Taken together, these studies suggest that...",
            "Overall, the evidence points to..., although questions remain about...",
            "This debate is particularly relevant to the present study because..."
          ]
        }
      ]
    },
    {
      heading: "Step 7: Identify and state the research gap",
      paragraphs: [
        "The research gap is the link between your literature review and your own study. It shows what existing research has not yet answered and why your project is worth doing. Gaps usually emerge from your synthesis matrix when you notice what is missing or inconsistent."
      ],
      bullets: [
        "Contextual gap: the topic is well studied in one country, sector or population but not another.",
        "Methodological gap: most studies use one method, such as surveys, so an in-depth qualitative study could add something new.",
        "Theoretical gap: a theory has not been applied or tested in a particular setting.",
        "Conflicting evidence: studies disagree and the reasons are unclear.",
        "Time gap: the evidence is dated and conditions have changed, for example after new regulations or technology."
      ],
      tip: "Example: 'While existing research has examined remote work and wellbeing in large technology firms, little attention has been given to small and medium-sized enterprises. This study addresses that gap by...' Be specific, and avoid claiming that 'no research exists' unless your searches genuinely support that."
    },
    {
      heading: "Common literature review mistakes to avoid",
      bullets: [
        "Writing one paragraph per source, which produces a list of summaries rather than an argument.",
        "Including sources that are not relevant to your research question just to increase the count.",
        "Relying heavily on old or non-academic sources when recent peer-reviewed work is available.",
        "Describing findings without evaluating the methods or limitations behind them.",
        "Using too many long quotations instead of paraphrasing and analysing.",
        "Forgetting to explain how the reviewed literature connects to your own study.",
        "Leaving the research gap vague or failing to state it clearly at the end of the chapter.",
        "Inconsistent or incomplete referencing, especially when combining notes from many sources."
      ],
      paragraphs: [
        "If you are struggling to move from summary to synthesis, the FIZBS literature review team can review a draft and show you where to strengthen comparison and critical analysis."
      ]
    },
    {
      heading: "Need help with your literature review?",
      paragraphs: [
        "A good literature review takes time: searching, reading, organising and rewriting until the argument is clear. If you need expert guidance, FIZBS has supported students since 2015 with dissertations and research projects across more than 115 subjects, especially business, management and MBA topics. Our experts hold Master's and PhD qualifications and can help with search strategies, structure, critical writing and referencing.",
        "Dissertation support is priced at £30 per 1,000 words, with a maximum of £350 for any dissertation. You can message us on WhatsApp 24/7 or book a call with an expert before ordering to discuss your topic."
      ]
    }
  ],
  faqs: [
    {
      q: "What are the 5 parts of a literature review?",
      a: "There is no fixed formula, but most literature reviews include an introduction setting out the scope, a main body organised by themes, debates or methods, critical evaluation of the studies, a synthesis of what the evidence shows, and a conclusion stating the research gap and how your study addresses it."
    },
    {
      q: "How long should a literature review be?",
      a: "It depends on your level and word limit. In many dissertations, the literature review is one of the longest chapters. Check your module handbook or ask your supervisor, as departments often give guidance on how the word count should be divided between chapters."
    },
    {
      q: "How many sources should a literature review have?",
      a: "There is no universal number. It depends on your level, topic and word count. Focus on covering the key theories, the most relevant recent studies and any major debates. Your supervisor or marking criteria may give a guide figure."
    },
    {
      q: "What is the difference between a literature review and an annotated bibliography?",
      a: "An annotated bibliography summarises and comments on each source separately. A literature review combines sources into a connected argument, comparing them by theme and identifying a gap. Notes from an annotated bibliography can be a useful starting point for a review."
    },
    {
      q: "Can I use first person in a literature review?",
      a: "Some departments accept limited first person, for example 'In this chapter, I examine...', while others prefer an impersonal style. Check your handbook. Whichever you use, keep the focus on the evidence rather than personal opinion."
    },
    {
      q: "How recent should sources in a literature review be?",
      a: "Many tutors expect most sources to be from roughly the last five to ten years, especially in fast-moving fields, but key theories and landmark studies can be older. Use older work for foundations and recent work to show the current state of research."
    }
  ],
  relatedServices: ["literature-review-help", "dissertation-help-uk", "research-proposal-help", "referencing-help"]
};
