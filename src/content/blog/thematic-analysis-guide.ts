import type { BlogPost } from './types';

export const thematicAnalysisGuidePost: BlogPost = {
  slug: "thematic-analysis-guide",
  locale: "en",
  title: "Thematic Analysis: A Step-by-Step Guide Using Braun and Clarke (With Example)",
  metaTitle: "Thematic Analysis: Braun and Clarke Step-by-Step Guide",
  metaDescription: "Learn how to do thematic analysis using Braun and Clarke's six phases, with a coding example, codebook template, NVivo tips and how to write up findings.",
  keywords: [
    "thematic analysis",
    "Braun and Clarke thematic analysis",
    "how to do thematic analysis",
    "six phases of thematic analysis",
    "reflexive thematic analysis",
    "thematic analysis example",
    "qualitative coding example",
    "thematic analysis findings chapter"
  ],
  category: "Research Methods",
  excerpt: "A practical walkthrough of Braun and Clarke's six phases of thematic analysis, with a worked coding example, a codebook template, NVivo tips and advice on writing your findings chapter.",
  published: "2026-10-10",
  intro: [
    "Thematic analysis is the most widely used method for analysing qualitative data in student dissertations. If you have interview transcripts, focus group recordings or open-ended survey answers, there is a good chance your supervisor has told you to \"use Braun and Clarke\". The problem is that many students read the famous six phases, open their transcripts and still have no idea what to actually do on Monday morning.",
    "This guide explains how to do thematic analysis step by step, using the framework set out by Virginia Braun and Victoria Clarke in their 2006 paper \"Using thematic analysis in psychology\" (Qualitative Research in Psychology). You will see a worked coding example from a short interview extract, a simple codebook template, tips for doing it in NVivo, how to write your findings chapter with quotes, and the mistakes that cost students marks."
  ],
  sections: [
    {
      heading: "What is thematic analysis?",
      paragraphs: [
        "Thematic analysis is a method for identifying, analysing and reporting patterns of meaning (themes) across a qualitative dataset. A theme is not just a topic you asked about. It captures something important about the data in relation to your research question and represents a patterned response or meaning across several participants.",
        "Its main strength is flexibility: it is not tied to one theoretical position. That flexibility is also why examiners look closely at your analytic decisions, so be clear about these choices before coding and state them in your methodology chapter."
      ],
      bullets: [
        "Inductive or deductive: will codes come from the data (bottom up) or from an existing theory (top down)? Many projects mix both and say so.",
        "Semantic or latent: will you code what participants explicitly say, or the assumptions beneath it?",
        "Whole dataset or one aspect: a rich overall description, or a detailed account of one part linked to a specific question?"
      ]
    },
    {
      heading: "A note on reflexive thematic analysis",
      paragraphs: [
        "In their later writing, Braun and Clarke have described their approach as reflexive thematic analysis. The idea is that themes do not \"emerge\" from the data on their own; they are actively created by the researcher through engagement with the data, shaped by the researcher's perspective, theory and questions. Your subjectivity is treated as a resource rather than a problem to be removed.",
        "In practice, you do not need inter-rater reliability scores, because reflexive TA does not aim for one \"correct\" coding. Instead, keep a reflexive journal, explain how your background may have shaped your interpretation, and avoid saying \"themes emerged\". Braun and Clarke also renamed some phases in later work (for example, generating rather than searching for themes), so if you use the reflexive approach, read their more recent guidance and cite it accurately alongside the 2006 paper."
      ],
      tip: "Some programmes are happy with the original 2006 phases; others expect you to engage with the reflexive approach. If in doubt, ask your supervisor."
    },
    {
      heading: "How to do thematic analysis: the six phases",
      paragraphs: [
        "Braun and Clarke describe six phases. They are not a rigid linear checklist: you will move back and forth between them. Treat them as a guide to what good analysis involves."
      ],
      subsections: [
        {
          heading: "Phase 1: Familiarising yourself with the data",
          paragraphs: [
            "Transcribe your interviews (or check automated transcripts against the audio), then read every transcript at least twice, noting anything interesting, surprising or repeated. You are not coding yet; you are immersing yourself in the data."
          ]
        },
        {
          heading: "Phase 2: Generating initial codes",
          paragraphs: [
            "Work systematically through the whole dataset and label segments of text that relate to your research question. A code is a short, specific label for one idea, such as \"workload pressure from deadlines\" or \"manager as buffer\". Code everything potentially relevant, keep a little surrounding context, and allow one extract to have more than one code."
          ]
        },
        {
          heading: "Phase 3: Searching for (generating) themes",
          paragraphs: [
            "Look across your codes and group those that share a central idea. Some codes will become themes, some will become sub-themes, and some will be set aside. A visual map or table helps here. Ask: what is the shared meaning that links these codes, and how does it help answer my research question?"
          ]
        },
        {
          heading: "Phase 4: Reviewing themes",
          paragraphs: [
            "Check your candidate themes at two levels. First, do the coded extracts for each theme form a coherent pattern? Second, do the themes tell a convincing story about the whole dataset? Expect to merge, split or discard themes; one that is really a list of unrelated points needs rethinking."
          ]
        },
        {
          heading: "Phase 5: Defining and naming themes",
          paragraphs: [
            "Write a short definition for each theme explaining its core idea, what it includes and what it does not. Give it a concise, informative name. Good theme names often use an interpretive phrase or a short participant quote, such as \"Always on: the blurred line between work and home\", rather than a one-word topic label like \"Workload\"."
          ]
        },
        {
          heading: "Phase 6: Producing the report (writing up)",
          paragraphs: [
            "Write a clear, logical account of each theme, supported by vivid data extracts and connected to your research questions and the literature. Writing is part of the analysis: you will often refine themes as you write. See the findings chapter section below for structure."
          ]
        }
      ]
    },
    {
      heading: "Thematic analysis example: coding an interview extract",
      paragraphs: [
        "The extract below is invented purely for illustration. Imagine a study exploring how junior staff in a UK retail company experience hybrid working. Participant 4 (P4) says:",
        "\"Honestly, working from home sounded great at first, but now I feel like I'm never off. My manager messages at nine at night and I feel I have to answer, otherwise it looks like I'm not working. On office days it's actually easier because I can switch off on the train home. I also miss just asking someone a quick question. On Teams it feels like I'm bothering people.\"",
        "Here is how you might code it in Phase 2:"
      ],
      bullets: [
        "\"working from home sounded great at first\": initial positive expectations of hybrid work",
        "\"I feel like I'm never off\": inability to disconnect",
        "\"My manager messages at nine at night\": out-of-hours contact from manager",
        "\"otherwise it looks like I'm not working\": pressure to appear visible / proving productivity",
        "\"I can switch off on the train home\": commute as a boundary between work and home",
        "\"I miss just asking someone a quick question\": loss of informal support",
        "\"On Teams it feels like I'm bothering people\": reluctance to seek help online"
      ],
      tip: "Notice that the codes are more specific than the words \"stress\" or \"communication\". Specific codes make Phase 3 much easier, because you can see exactly how ideas connect across participants."
    },
    {
      heading: "From codes to themes: building a simple codebook",
      paragraphs: [
        "Suppose that after coding all 12 interviews in this illustrative study, similar codes appeared across many participants. In Phase 3 you might group them like this:"
      ],
      bullets: [
        "Candidate theme 1, \"Always on\": inability to disconnect; out-of-hours contact from manager; pressure to appear visible; commute as a boundary.",
        "Candidate theme 2, \"Asking feels like interrupting\": loss of informal support; reluctance to seek help online; learning by watching colleagues in the office."
      ],
      subsections: [
        {
          heading: "Codebook template",
          paragraphs: [
            "A codebook keeps your coding consistent and gives you an appendix that shows your audit trail. Create a table with these columns:"
          ],
          bullets: [
            "Code name (short label)",
            "Definition (what the code means in one or two sentences)",
            "When to use / when not to use (inclusion and exclusion notes)",
            "Example extract (a short quote, with participant ID)",
            "Linked theme or sub-theme",
            "Number of participants coded (useful for your own overview, though prevalence alone does not make something a theme)"
          ]
        }
      ],
      tip: "In reflexive TA the codebook records your evolving interpretation, so renaming or merging codes is fine. Just note what changed and why."
    },
    {
      heading: "Doing thematic analysis in NVivo",
      paragraphs: [
        "NVivo does not do the analysis for you, but it makes managing a large dataset easier. A simple workflow:"
      ],
      steps: [
        "Import your transcripts as Files and create a Case for each participant with attributes such as role or age group.",
        "Read each file and use memos or annotations for Phase 1 notes.",
        "Highlight text and code it to new Codes (called nodes in older versions). Keep names short and specific.",
        "Drag related codes under a parent code to build a hierarchy. Parent codes can act as candidate themes, child codes as the codes or sub-themes within them.",
        "Use coding queries, matrix coding (for example, codes by participant role) and the Codebook export to review themes and build your appendix, keeping a reflexive memo throughout."
      ],
      tip: "Avoid auto-coding and word frequency clouds as your main analysis. They can be useful for exploration, but examiners want to see interpretation, not word counts."
    },
    {
      heading: "How to write the thematic analysis findings chapter",
      paragraphs: [
        "A strong findings chapter reads like an argument, not a collection of quotes. Many UK universities expect findings and discussion in separate chapters, while others allow a combined chapter, so check your handbook."
      ],
      steps: [
        "Open with an overview: how many themes you developed, a thematic map or table showing themes and sub-themes, and how they relate to your research questions.",
        "Present one theme per subsection, using the theme name as the heading and starting with a short definition.",
        "For each point, make an analytic claim first, then support it with a short extract, then explain what the extract shows. A useful pattern is claim, evidence, interpretation.",
        "Use quotes from a range of participants, labelled consistently, for example (P4, retail assistant), and show variation within a theme, not just agreement.",
        "Link back to the literature, either in the same chapter or in your discussion, explaining where your findings support, extend or challenge previous research."
      ],
      tip: "Weak: \"P4 said: [long quote]. P7 said: [long quote].\" Stronger: \"Several participants described the commute as a psychological boundary that remote working removed. As P4 explained, 'on office days it's actually easier because I can switch off on the train home'. This suggests that...\""
    },
    {
      heading: "Rigour and trustworthiness in thematic analysis",
      paragraphs: [
        "Examiners want to see that your analysis is systematic and transparent. Many students frame this using Lincoln and Guba's (1985) trustworthiness criteria from Naturalistic Inquiry: credibility, transferability, dependability and confirmability. Whichever framework you use, practical strategies include:"
      ],
      bullets: [
        "An audit trail: your codebook, early and later thematic maps, and memos showing how themes changed.",
        "Reflexivity: a reflexive journal and a short positionality statement in your methodology.",
        "Thick description of your context and participants so readers can judge transferability.",
        "Discussion with your supervisor or peers as a way to challenge your interpretation (rather than to \"prove\" agreement).",
        "Honesty about limitations, such as sample size, recruitment method or your own role in the setting."
      ]
    },
    {
      heading: "Common thematic analysis mistakes to avoid",
      bullets: [
        "Using interview questions as themes. If your themes are \"Benefits\", \"Challenges\" and \"Recommendations\", you have probably summarised answers rather than analysed patterns.",
        "Too many themes. Three to six main themes is typical for a Master's dissertation; twelve thin themes suggests the analysis is unfinished.",
        "Quotes with no interpretation, or paragraphs of interpretation with no evidence.",
        "Not explaining your decisions (inductive or deductive, semantic or latent) in the methodology.",
        "Treating frequency as importance. A theme matters because of what it says about your research question, not only how many people mentioned it."
      ]
    },
    {
      heading: "Need help with your thematic analysis?",
      paragraphs: [
        "If you are stuck at the coding stage, unsure whether your themes hold together, or need guidance writing up your findings, FIZ Business Solutions (FIZBS) can help. Our experts hold Master's and PhD qualifications and have supported students with qualitative research and NVivo since 2015.",
        "You can message us on WhatsApp 24/7 or book a WhatsApp call with an expert before ordering. Dissertation support is charged at £30 per 1,000 words with a maximum of £350, there is 10% off your first order, and everything is 100% confidential."
      ]
    }
  ],
  faqs: [
    {
      q: "What are the six phases of Braun and Clarke thematic analysis?",
      a: "The six phases are: familiarising yourself with the data, generating initial codes, searching for (or generating) themes, reviewing themes, defining and naming themes, and producing the report. They are recursive, so you move back and forth between them rather than following them strictly in order."
    },
    {
      q: "How many themes should a thematic analysis have?",
      a: "There is no fixed number, but most student dissertations report around three to six main themes, sometimes with sub-themes. Fewer, well-developed themes are usually better than many thin ones. Base the number on what best answers your research question."
    },
    {
      q: "What is the difference between a code and a theme?",
      a: "A code is a short label for a single idea in a segment of data, such as \"out-of-hours contact from manager\". A theme is a broader pattern of shared meaning that brings several codes together and says something important about your research question, such as \"Always on: the blurred line between work and home\"."
    },
    {
      q: "Is thematic analysis inductive or deductive?",
      a: "It can be either. Inductive thematic analysis builds codes from the data itself, while deductive analysis codes against an existing theory or framework. Many dissertations combine both. State your approach clearly in your methodology and explain why it suits your research question."
    },
    {
      q: "How many interviews do I need for thematic analysis?",
      a: "It depends on your level of study, research question and university guidance. Many undergraduate and Master's projects use somewhere between 6 and 15 interviews, but you should justify your sample in relation to your aims and the richness of the data rather than relying on a fixed number."
    },
    {
      q: "Do I need NVivo to do thematic analysis?",
      a: "No. You can do thematic analysis with Word, Excel or printed transcripts and highlighters. NVivo helps you organise codes, retrieve extracts and keep an audit trail on larger datasets, but the quality of the analysis depends on your interpretation, not the software."
    }
  ],
  relatedServices: ["nvivo-thematic-analysis-help", "data-analysis-help", "dissertation-help-uk", "research-methodology-help"]
};
