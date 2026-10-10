import type { BlogPost } from './types';

export const dissertationMethodologyGuidePost: BlogPost = {
  slug: "dissertation-methodology-guide",
  locale: "en",
  title: "How to Write a Dissertation Methodology (With Examples)",
  metaTitle: "How to Write a Dissertation Methodology (With Examples)",
  metaDescription: "A practical dissertation methodology guide: research onion, design, qual vs quant, sampling, data collection, analysis, ethics and a worked example.",
  keywords: [
    "dissertation methodology",
    "how to write a methodology",
    "research onion",
    "methodology chapter example",
    "qualitative vs quantitative research",
    "research methodology dissertation UK"
  ],
  category: "Dissertation",
  excerpt: "Learn how to write a dissertation methodology that markers trust: research philosophy and the research onion, design, sampling, data collection, analysis, ethics, limitations and a worked example paragraph.",
  published: "2026-10-10",
  intro: [
    "The dissertation methodology chapter explains how you carried out your research and, more importantly, why you made each choice. It is often the chapter students find hardest to start, because it asks you to use unfamiliar terms like ontology, epistemology and abductive reasoning. Yet it is also one of the most predictable chapters to write once you understand what markers are looking for.",
    "This guide takes you through every part of a strong dissertation methodology in the order most UK markers expect: research philosophy and approach (using Saunders' research onion), research design, qualitative, quantitative and mixed methods, sampling, data collection, data analysis, research ethics and limitations. It finishes with a sample methodology paragraph you can adapt and the common mistakes that lose marks."
  ],
  sections: [
    {
      heading: "What a dissertation methodology is and what it must do",
      paragraphs: [
        "Your methodology is the bridge between your research question and your findings. A reader should be able to understand exactly what you did, judge whether it was appropriate, and in principle repeat or evaluate it. In a typical 10,000-word dissertation it is around 1,000 to 1,500 words (roughly 10 to 15% of the total), though your department may set its own guidance.",
        "The key word is justification. Describing your method ('I used interviews') earns few marks. Explaining why interviews were the best way to answer your question, with reference to methods literature, is what moves a chapter into the higher grade bands."
      ],
      bullets: [
        "Restate your research question and objectives so the reader can judge fit.",
        "Explain your philosophy and approach.",
        "Describe and justify your design, sample, data collection and analysis.",
        "Show how you handled research ethics.",
        "Acknowledge limitations honestly and explain how you reduced them."
      ]
    },
    {
      heading: "Research philosophy and approach: Saunders' research onion",
      paragraphs: [
        "Many UK business and social science departments expect students to structure their methodology using the research onion from Saunders, Lewis and Thornhill's Research Methods for Business Students. The onion presents research decisions as layers, working from the outside (your beliefs about knowledge) to the centre (the practical techniques you use). Writing your chapter layer by layer gives it a clear, logical shape."
      ],
      subsections: [
        {
          heading: "The layers of the research onion",
          bullets: [
            "Research philosophy: your assumptions about reality and knowledge, for example positivism, interpretivism, critical realism or pragmatism.",
            "Approach to theory development: deductive (testing existing theory), inductive (building theory from data) or abductive (moving between the two).",
            "Methodological choice: mono method, multi-method or mixed methods, qualitative or quantitative.",
            "Research strategy: for example survey, experiment, case study, ethnography, action research, grounded theory or archival research.",
            "Time horizon: cross-sectional (one point in time) or longitudinal (over a period).",
            "Techniques and procedures: how you actually collect and analyse data."
          ]
        },
        {
          heading: "Matching philosophy and approach",
          paragraphs: [
            "Positivism usually pairs with a deductive approach and quantitative data: you test hypotheses with measurable variables. Interpretivism usually pairs with an inductive approach and qualitative data: you explore how people experience and make sense of something. Pragmatism focuses on what works best to answer the question and often supports mixed methods. Choose one main philosophy and explain why it suits your question, rather than listing every option."
          ]
        }
      ],
      tip: "Students in health, education or psychology may be asked to use a different framework. Check your handbook and use the language your department prefers."
    },
    {
      heading: "Research design: qualitative, quantitative or mixed methods",
      paragraphs: [
        "Your research design is the overall plan for answering your question. The biggest decision is whether your data will be qualitative, quantitative or a combination."
      ],
      subsections: [
        {
          heading: "Quantitative research",
          paragraphs: [
            "Collects numerical data to measure, compare or test relationships, for example a questionnaire with Likert scale items analysed in SPSS. It suits questions that start with 'how much', 'how many' or 'is there a relationship between'. Strengths include generalisability and objectivity; the weakness is limited depth about why people think or act as they do."
          ]
        },
        {
          heading: "Qualitative research",
          paragraphs: [
            "Collects words, observations or documents to explore meanings and experiences, for example semi-structured interviews analysed thematically. It suits 'how' and 'why' questions. It offers rich depth but uses smaller samples, so findings are not usually statistically generalisable."
          ]
        },
        {
          heading: "Mixed methods",
          paragraphs: [
            "Combines both, for example a survey followed by interviews that explain the survey results. It can give a fuller picture but takes more time and needs clear justification for how the two parts connect. For a time-limited undergraduate dissertation, a single well-executed method is often the safer choice."
          ]
        }
      ]
    },
    {
      heading: "Sampling: choosing who or what to study",
      paragraphs: [
        "Explain your target population, your sampling technique, your sample size and how you recruited participants. Then justify each choice."
      ],
      bullets: [
        "Probability sampling (random, stratified, systematic, cluster): every member of the population has a known chance of selection. Best for quantitative studies aiming to generalise.",
        "Non-probability sampling (purposive, convenience, snowball, quota): participants are chosen for relevance or accessibility. Common in qualitative and student research.",
        "Sample size: for surveys, explain how you reached your number and what it allows you to claim. For interviews, many student projects use a modest number of participants and justify it by depth of data or by reaching saturation, where new interviews add little new information.",
        "Inclusion and exclusion criteria: state who was eligible and why."
      ],
      tip: "Be honest if you used convenience sampling, such as classmates or contacts. Acknowledge the bias it may introduce and explain what you did to reduce it. Markers value transparency over pretending the sample is perfect."
    },
    {
      heading: "Data collection methods",
      paragraphs: [
        "Describe exactly how data were gathered, with enough detail that someone else could repeat the process. Include instruments in your appendices, such as your questionnaire or interview guide."
      ],
      bullets: [
        "Questionnaires: platform used, number and type of questions, whether items were adapted from published scales, how you piloted it and how long it was open.",
        "Interviews: structured, semi-structured or unstructured, length, format (in person or online), recording and transcription.",
        "Focus groups: group size, how discussions were moderated and recorded.",
        "Observation: setting, duration, what was recorded and your role as observer.",
        "Secondary data: source (for example company reports, government datasets or published databases), time period covered and why the data are reliable."
      ]
    },
    {
      heading: "Data analysis: explaining how you made sense of the data",
      paragraphs: [
        "State which analysis technique you used, the software (if any), and why the technique fits your data and question."
      ],
      subsections: [
        {
          heading: "Quantitative analysis",
          bullets: [
            "Descriptive statistics: means, frequencies, standard deviations.",
            "Reliability testing, such as Cronbach's alpha for multi-item scales.",
            "Inferential tests: t-tests, ANOVA, chi-square, correlation or regression, depending on your variables and hypotheses.",
            "Software such as SPSS, Excel, R or Stata."
          ]
        },
        {
          heading: "Qualitative analysis",
          bullets: [
            "Thematic analysis, often following Braun and Clarke (2006), 'Using thematic analysis in psychology', Qualitative Research in Psychology, with its six phases from familiarisation to writing up.",
            "Content analysis, narrative analysis, discourse analysis or grounded theory coding, where appropriate.",
            "Software such as NVivo, or manual coding in a spreadsheet, explained clearly either way."
          ]
        }
      ]
    },
    {
      heading: "Research ethics and limitations",
      paragraphs: [
        "Almost every UK university requires ethics approval for research involving human participants, and some require it for secondary data too. Explain which approval you obtained (without naming individual reviewers) and how you protected participants."
      ],
      bullets: [
        "Informed consent: participant information sheet and consent form, included in the appendices.",
        "Voluntary participation and the right to withdraw, with a clear withdrawal deadline.",
        "Anonymity and confidentiality: how identities were removed or pseudonyms used.",
        "Data protection: secure storage, who had access and when data will be deleted, in line with UK GDPR and your university's policy.",
        "Avoiding harm: how you handled sensitive topics or vulnerable groups.",
        "Limitations: sample size, sampling bias, self-reported data, a single organisation or country, time constraints, or researcher bias in interpretation. For each, say how you reduced its impact."
      ]
    },
    {
      heading: "Sample dissertation methodology paragraph",
      paragraphs: [
        "Below is an example for a qualitative business dissertation exploring how small UK retailers use Instagram to build customer loyalty. Adapt the content to your own study and support each choice with methods literature from your reading list."
      ],
      tip: "Example: 'This study adopts an interpretivist philosophy, as it seeks to understand how owners of small UK fashion retailers perceive and use Instagram to build customer loyalty, rather than to measure the effect of specific variables. Consistent with this, an inductive approach was taken, allowing themes to emerge from participants' accounts. A qualitative, cross-sectional design was used, with data collected through eight semi-structured online interviews, each lasting between 30 and 45 minutes. Participants were selected through purposive sampling, with inclusion criteria requiring that each business had fewer than 50 employees and had used Instagram for marketing for at least one year. Interviews were recorded with consent, transcribed and analysed using Braun and Clarke's (2006) six-phase thematic analysis. Ethics approval was obtained from the university before data collection, and all participants were given pseudonyms. The small sample means findings cannot be generalised to all UK retailers; however, the depth of the data provides valuable insight into the practices and reasoning of owner-managers.'"
    },
    {
      heading: "Common dissertation methodology mistakes",
      bullets: [
        "Describing methods without justifying why they suit the research question.",
        "Listing every research philosophy instead of choosing and defending one.",
        "Claiming a positivist philosophy while using a small qualitative sample, or other mismatches between layers.",
        "Writing in the future tense left over from the proposal ('I will interview...') instead of the past tense.",
        "Too little detail on sampling, recruitment or analysis for the reader to judge quality.",
        "No reference to methods literature, so choices appear arbitrary.",
        "Treating ethics as a single sentence instead of explaining consent, anonymity and data storage.",
        "Hiding limitations, or listing them without explaining their effect on the findings.",
        "Forgetting to include questionnaires, interview guides and consent forms in the appendices."
      ]
    },
    {
      heading: "Need help with your dissertation methodology?",
      paragraphs: [
        "If you are unsure which philosophy, design or analysis technique fits your question, FIZBS experts can help. Our team holds Master's and PhD qualifications and has supported students since 2015, including more than 350 research projects, with support for SPSS, NVivo and thematic analysis.",
        "Message us on WhatsApp 24/7 or book a WhatsApp call with an expert to talk through your methodology before you commit. Dissertation support is £30 per 1,000 words, capped at £350 for any dissertation, and everything is 100% confidential."
      ]
    }
  ],
  faqs: [
    {
      q: "What should be included in a dissertation methodology?",
      a: "A dissertation methodology usually covers your research philosophy, approach, design, sampling, data collection methods, data analysis techniques, research ethics and limitations. Each choice should be justified in relation to your research question."
    },
    {
      q: "How long should a dissertation methodology be?",
      a: "As a general guide, the methodology is around 10 to 15% of the total word count, so about 1,000 to 1,500 words in a 10,000-word dissertation. Always follow any breakdown given in your module handbook."
    },
    {
      q: "Should a dissertation methodology be written in the past or future tense?",
      a: "In the final dissertation, write it in the past tense because you are describing research you have completed. The future tense belongs in your research proposal."
    },
    {
      q: "What is the research onion?",
      a: "The research onion is a model from Saunders, Lewis and Thornhill's Research Methods for Business Students. It shows research decisions as layers: philosophy, approach to theory development, methodological choice, strategy, time horizon, and techniques and procedures."
    },
    {
      q: "What is the difference between methodology and methods?",
      a: "Methods are the specific tools you use, such as surveys or interviews. Methodology is the wider reasoning behind those tools, including your philosophy, approach and the justification for why the methods suit your research question."
    },
    {
      q: "Can I use secondary data in my dissertation methodology?",
      a: "Yes, many dissertations use secondary data such as published datasets, company reports or existing studies. You still need to explain where the data came from, why they are reliable and relevant, and how you analysed them."
    }
  ],
  relatedServices: [
    "research-methodology-help",
    "dissertation-help-uk",
    "spss-help",
    "nvivo-thematic-analysis-help"
  ]
};
