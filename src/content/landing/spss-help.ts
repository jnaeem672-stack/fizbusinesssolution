import type { LandingContent } from './types';

export const spssHelp: LandingContent = {
  slug: 'spss-help',
  locale: 'en',
  metaTitle: 'SPSS Help | Data Analysis Support for Students',
  metaDescription:
    'SPSS help for dissertations and assignments: tests, tables and clear interpretation of your own data. Expert support 24/7 on WhatsApp. Get your price now.',
  keywords: [
    'SPSS help',
    'SPSS data analysis help',
    'SPSS assignment help',
    'statistics help for dissertation',
    'NVivo help',
    'Excel data analysis help',
  ],
  badge: 'Data Analysis Support',
  h1: 'SPSS Help to Analyse and Interpret Your Data',
  heroSubtitle:
    'Expert guidance on choosing the right tests, running them correctly and explaining your results clearly, for assignments, dissertations and research projects.',
  highlights: ['SPSS, Excel and NVivo', 'APA-style tables', '24/7 WhatsApp support', '100% confidential'],
  intro: [
    "SPSS help from FIZ Business Solutions (FIZBS) is for students who have collected their data and now feel stuck. You may not be sure which test fits your research question, how to read the output, or how to write up what the numbers actually mean.",
    'Our experts work with the data you have gathered through your own surveys, experiments or secondary sources. They help you prepare it, run appropriate analysis and interpret the results so you understand every step and can explain it in your own write-up.',
    'Since 2015 we have supported more than 10,000 students and completed over 350 research projects, many of them involving quantitative or qualitative analysis. Whether your project is a short module assignment or a full dissertation, the same careful approach applies.',
  ],
  sections: [
    {
      heading: 'What our SPSS data analysis help covers',
      paragraphs: [
        "Your request is handled by an expert with a Master's or PhD who is comfortable with research methods and statistics. They look at your research questions, hypotheses and dataset before recommending an approach, and they explain the reasoning behind each choice in plain language.",
      ],
      bullets: [
        'Data cleaning, coding and checking for missing values',
        'Descriptive statistics: means, standard deviations, frequencies and crosstabs',
        'Independent and paired samples t-tests',
        'One-way ANOVA and related comparisons',
        'Chi-square tests for categorical data',
        'Correlation and linear or multiple regression',
        "Reliability testing with Cronbach's alpha",
        'Charts and APA-style tables ready to include in your chapter',
      ],
    },
    {
      heading: 'Choosing the right statistical test',
      paragraphs: [
        'The right test depends on your research question (comparing groups or looking at relationships?), your variable types (categorical, ordinal or continuous) and how many groups or measurements are involved. Here are the tests students use most often.',
      ],
      bullets: [
        'Independent samples t-test: compares the mean of a continuous variable between two separate groups, such as job satisfaction scores for male and female employees.',
        'Paired samples t-test: compares two measurements from the same participants, such as scores before and after a training programme.',
        'One-way ANOVA: compares means across three or more independent groups, such as satisfaction across three departments. If the result is significant, post hoc tests (for example Tukey) show which groups differ.',
        'Chi-square test of independence: tests whether two categorical variables are associated, such as gender and preferred shopping channel.',
        "Pearson correlation: measures the strength and direction of a linear relationship between two continuous variables. Spearman's rho is used for ordinal data or when assumptions are not met.",
        'Linear and multiple regression: tests how well one or more predictors explain an outcome, such as whether pay, workload and recognition predict employee engagement.',
        'Non-parametric alternatives: Mann-Whitney U (instead of an independent t-test), Wilcoxon signed-rank (instead of a paired t-test) and Kruskal-Wallis (instead of one-way ANOVA).',
      ],
    },
    {
      heading: 'Checking assumptions before you report results',
      paragraphs: [
        'Every parametric test rests on assumptions, and markers expect you to show that you checked them. Your expert checks the relevant assumptions, explains the output and tells you what to do if one is violated, such as switching to a non-parametric test or using a corrected result.',
      ],
      bullets: [
        'Normality: Shapiro-Wilk tests, histograms and Q-Q plots, interpreted with your sample size in mind.',
        "Homogeneity of variance: Levene's test, which SPSS reports with the independent t-test. If it is significant, you report the \"equal variances not assumed\" row, or Welch's test for ANOVA.",
        'Outliers: boxplots and standardised scores to spot extreme values and decide how to handle them.',
        'Expected cell counts for chi-square: when too many expected counts fall below 5, Fisher\'s exact test may be more appropriate.',
        'Regression checks: linearity, homoscedasticity in residual plots, multicollinearity using VIF and tolerance values, and independence of errors using the Durbin-Watson statistic.',
      ],
    },
    {
      heading: 'Reporting SPSS results in APA style',
      paragraphs: [
        'SPSS output is not written for a reader. A good findings chapter turns it into short, precise statements that give the test statistic, degrees of freedom, p value and an effect size, followed by a plain-English sentence explaining what the result means for your hypothesis.',
        'In APA 7th edition, statistical symbols such as t, F, p and r are italicised, p values are given exactly to two or three decimal places (or as p < .001 when very small), and values that cannot exceed 1, such as p and r, are written without a leading zero.',
      ],
      bullets: [
        't-test: t(58) = 2.45, p = .017, d = 0.63',
        'ANOVA: F(2, 87) = 4.12, p = .019, η² = .09',
        'Chi-square: χ²(1, N = 120) = 6.30, p = .012',
        'Correlation: r(98) = .42, p < .001',
        'Regression: report R², the overall F test and each predictor\'s coefficient (B or β), its t value and p value, usually in a table',
      ],
    },
    {
      heading: 'Common SPSS mistakes to avoid',
      paragraphs: [
        'Many issues markers comment on come from small slips in preparing data or describing output, not advanced statistics. Check for these before you submit.',
      ],
      bullets: [
        'Reporting "p = .000": SPSS rounds very small values, so report p < .001 instead.',
        'Forgetting to define missing value codes, so a code like 99 is treated as a real answer and distorts your means.',
        'Not reverse-coding negatively worded items before combining a scale or calculating Cronbach\'s alpha.',
        'Running several t-tests instead of one ANOVA, which increases the chance of a false positive result.',
        'Claiming that a correlation proves one variable causes another.',
        'Reporting significance without an effect size, so the reader cannot judge how meaningful the result is.',
        'Pasting raw SPSS output into the chapter instead of formatted tables with a written interpretation.',
        'Saying a hypothesis is "proven" rather than supported or not supported by the data.',
      ],
    },
    {
      heading: 'Beyond SPSS: Excel, NVivo, Stata and Python',
      paragraphs: [
        'Not every project uses SPSS. Our Excel data analysis help is popular for business and finance modules that need pivot tables, summary statistics and clear charts.',
        'If you are working on a mixed methods project, we can support both sides: statistical analysis of your survey data and thematic analysis of your interviews, presented in a way that brings the two strands together in your discussion.',
        'For qualitative research, our NVivo help supports thematic analysis of interview or focus group transcripts, from coding through to developing and presenting themes. We also support analysis in Stata and Python where your course requires them.',
      ],
    },
    {
      heading: 'Statistics help for your dissertation',
      paragraphs: [
        'Statistics help for dissertation students often makes the biggest difference in the methodology and findings chapters. A sound analysis plan keeps your results aligned with your research aims and makes your discussion much easier to write.',
        'Your expert can explain why a particular test suits your data, what assumptions need checking and how to report results in a clear, academic way. The aim is for you to feel confident discussing your analysis with your supervisor.',
        "If your results are not what you expected, that is not a failure. Non-significant findings are still findings, and your expert can help you interpret them honestly and discuss possible reasons in light of the literature.",
      ],
    },
    {
      heading: 'Common problems our SPSS help solves',
      paragraphs: [
        'Students usually contact us when something in their analysis does not feel right. Often the issue is not the software itself but knowing which option to choose and how to explain the output.',
      ],
      bullets: [
        'Variables coded inconsistently or entered in the wrong format',
        'Confusing output tables full of values you are unsure how to report',
        'Results that do not seem to match your hypotheses and need careful interpretation',
        'Feedback from a supervisor asking for clearer reporting of statistics',
      ],
    },
    {
      heading: 'What to send us for SPSS help',
      paragraphs: [
        'The more context your expert has, the faster they can recommend the right analysis. Before you get in touch, try to gather the following. If something is missing, send what you have and we will tell you what else is needed.',
      ],
      bullets: [
        'Your data file: an SPSS .sav file, or an Excel or CSV file if you have not imported it yet',
        'Your questionnaire or data collection tool, including where each scale came from',
        'Your research questions and hypotheses, even if they are still in draft form',
        'The assignment brief, marking criteria and any word count for the findings section',
        'Your methodology chapter or proposal, if you have one, so the analysis matches what you planned',
        'Any supervisor feedback and your deadline',
      ],
    },
    {
      heading: 'How it works',
      paragraphs: [
        'Getting SPSS help is simple, and you can start the conversation from your phone at any time of day.',
      ],
      bullets: [
        'Share your brief: send your task or research questions, your dataset or questionnaire, and your deadline on WhatsApp or through our website.',
        'Get your price: receive a quote based on your requirements, with 10% off your first order.',
        'Get expert help: a data analysis specialist works on your request, with 24/7 WhatsApp support if you have questions along the way.',
      ],
    },
    {
      heading: 'Pricing for SPSS and data analysis support',
      paragraphs: [
        'SPSS assignment help follows our standard assignment pricing from £20 per 1,000 words. Analysis within a dissertation is charged at £30 per 1,000 words, with a maximum of £350 for any dissertation.',
        "Deadlines of 3 to 6 days add 25% and deadlines within 48 hours add 50%. New customers get 10% off, orders of 8,000+ words get 10% off and orders of 15,000+ words get 15% off. Discounts don't stack. You can check prices instantly with the calculator on our homepage.",
      ],
    },
    {
      heading: 'Why students choose FIZBS for data analysis',
      bullets: [
        'More than 10 years of experience supporting university students',
        '350+ research projects completed across many subjects',
        "Master's and PhD-qualified experts in research methods",
        'Support for SPSS, Excel, NVivo, Stata and Python',
        "SPSS help for Bachelor's, Master's, MBA and PhD students in the UK, Saudi Arabia and the Gulf",
        '100% confidential: your data and files are never shared',
      ],
    },
  ],
  faqs: [
    {
      q: 'Can someone help me with SPSS analysis for my dissertation?',
      a: 'Yes. Our SPSS help covers dissertation analysis from data cleaning to interpretation. We work with the data you have collected and help you understand and report your results.',
    },
    {
      q: 'Which statistical test should I use in SPSS?',
      a: 'It depends on your research question, your variables and how your data is measured. Your expert reviews these and explains which test fits, such as a t-test, ANOVA, chi-square or regression.',
    },
    {
      q: 'How much does SPSS data analysis help cost?',
      a: 'Assignment-level analysis starts from £20 per 1,000 words, and dissertation support is £30 per 1,000 words with a £350 maximum. Short deadlines add 25% or 50%.',
    },
    {
      q: "How do I calculate Cronbach's alpha in SPSS?",
      a: "Cronbach's alpha is run through the reliability analysis option in SPSS. Our experts can run it on your scale items and explain what the result means for your questionnaire.",
    },
    {
      q: 'Do you offer NVivo help for qualitative research?',
      a: 'Yes. We support NVivo for thematic analysis, including coding your transcripts, grouping codes into themes and presenting them clearly.',
    },
    {
      q: 'Can you help with Excel data analysis for an assignment?',
      a: 'Yes. Our Excel data analysis help covers summary statistics, pivot tables, charts and interpreting results for business, finance and other modules.',
    },
    {
      q: 'Can you create APA-style tables from my SPSS output?',
      a: 'Yes. We help turn SPSS output into clear APA-style tables and charts, along with an explanation of what each result shows.',
    },
    {
      q: 'What should I do if my data is not normally distributed?',
      a: 'It depends on your sample size and how far the data departs from normality. Options include using a non-parametric test such as Mann-Whitney U or Kruskal-Wallis, or transforming the variable. Your expert explains which option suits your data and how to justify it.',
    },
    {
      q: 'Can I send my data in Excel instead of an SPSS file?',
      a: 'Yes. Excel and CSV files can be imported into SPSS. Please include your questionnaire too, so variables can be labelled and coded correctly before analysis.',
    },
  ],
  ctaTitle: 'Get help with your data analysis today',
  ctaText:
    'Share your research questions and dataset on WhatsApp to get a quote. New customers receive 10% off their first order.',
  whatsappMessage: 'Hello FIZBS! I need SPSS help with my data analysis. Tests needed: , Deadline: ',
  related: [
    'dissertation-help-uk',
    'research-proposal-help',
    'mba-assignment-help',
    'assignment-help-uk',
  ],
};
