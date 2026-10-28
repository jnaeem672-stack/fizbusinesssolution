import type { BlogPost } from './types';
import { howToWriteADissertationPost } from './how-to-write-a-dissertation';
import { dissertationMethodologyGuidePost } from './dissertation-methodology-guide';
import { harvardReferencingGuidePost } from './harvard-referencing-guide';
import { howToWriteALiteratureReviewPost } from './how-to-write-a-literature-review';
import { ukUniversityGradingSystemPost } from './uk-university-grading-system';
import { howToEmailAPhdSupervisorPost } from './how-to-email-a-phd-supervisor';
import { whichStatisticalTestSpssPost } from './which-statistical-test-spss';
import { gibbsReflectiveCycleGuidePost } from './gibbs-reflective-cycle-guide';
import { arHowToWriteAResearchProposalPost } from './ar-how-to-write-a-research-proposal';
import { arApaReferencingGuidePost } from './ar-apa-referencing-guide';
import { humanVsAiAcademicWritingPost } from './human-vs-ai-academic-writing';
import { howToStructureAUniversityEssayPost } from './how-to-structure-a-university-essay';
import { howToWriteAResearchQuestionPost } from './how-to-write-a-research-question';
import { thematicAnalysisGuidePost } from './thematic-analysis-guide';
import { swotAndPestleAnalysisGuidePost } from './swot-and-pestle-analysis-guide';
import { businessDissertationTopicsPost } from './business-dissertation-topics';
import { howToParaphraseAndAvoidPlagiarismPost } from './how-to-paraphrase-and-avoid-plagiarism';
import { arHumanVsAiAcademicWritingPost } from './ar-human-vs-ai-academic-writing';
import { arQuantitativeVsQualitativeResearchPost } from './ar-quantitative-vs-qualitative-research';
import { howToWriteADissertationIntroductionPost } from './how-to-write-a-dissertation-introduction';
import { howToWriteADissertationConclusionPost } from './how-to-write-a-dissertation-conclusion';
import { howToWriteAnAbstractPost } from './how-to-write-an-abstract';
import { howToWriteABusinessReportPost } from './how-to-write-a-business-report';
import { howToWriteACaseStudyAnalysisPost } from './how-to-write-a-case-study-analysis';
import { apaReferencingGuidePost } from './apa-referencing-guide';
import { oscolaReferencingGuidePost } from './oscola-referencing-guide';
import { ukMastersPersonalStatementPost } from './uk-masters-personal-statement';
import { arTheoreticalFrameworkAndLiteratureReviewPost } from './ar-theoretical-framework-and-literature-review';
import { arHowToWriteAnAbstractPost } from './ar-how-to-write-an-abstract';
import { arHowToChooseAThesisTitlePost } from './ar-how-to-choose-a-thesis-title';
import { arMastersGraduationProjectUmmAlQuraPost } from './ar-masters-graduation-project-umm-al-qura';
import { arGraduationProjectGuidePost } from './ar-graduation-project-guide';
import { arHowToWriteAResearchIntroductionPost } from './ar-how-to-write-a-research-introduction';
import { arThesisCoverPageAndDedicationPost } from './ar-thesis-cover-page-and-dedication';
import { arWhatIsAnAssignmentPost } from './ar-what-is-an-assignment';
import { arHowToWriteAResearchConclusionPost } from './ar-how-to-write-a-research-conclusion';
import { arScientificResearchStepsPost } from './ar-scientific-research-steps';
import { arQuestionnaireGuidePost } from './ar-how-to-make-a-questionnaire';
import { hrmDissertationTopicsPost } from './hrm-dissertation-topics';
import { marketingDissertationTopicsPost } from './marketing-dissertation-topics';
import { financeAccountingDissertationTopicsPost } from './finance-accounting-dissertation-topics';
import { nursingHealthcareDissertationTopicsPost } from './nursing-healthcare-dissertation-topics';
import { educationDissertationTopicsPost } from './education-dissertation-topics';
import { computerScienceDissertationTopicsPost } from './computer-science-dissertation-topics';
import { howToWriteAResearchProposalPost } from './how-to-write-a-research-proposal';
import { quantitativeVsQualitativeResearchPost } from './quantitative-vs-qualitative-research';
import { howToWriteADissertationDiscussionPost } from './how-to-write-a-dissertation-discussion';
import { primaryVsSecondaryResearchPost } from './primary-vs-secondary-research';

export type { BlogPost } from './types';

/** English posts, newest/most important first. Served at /blog/{slug} */
export const EN_POSTS: BlogPost[] = [
  humanVsAiAcademicWritingPost,
  howToWriteADissertationPost,
  businessDissertationTopicsPost,
  howToWriteALiteratureReviewPost,
  howToWriteAResearchProposalPost,
  dissertationMethodologyGuidePost,
  quantitativeVsQualitativeResearchPost,
  primaryVsSecondaryResearchPost,
  harvardReferencingGuidePost,
  whichStatisticalTestSpssPost,
  ukUniversityGradingSystemPost,
  howToEmailAPhdSupervisorPost,
  gibbsReflectiveCycleGuidePost,
  howToStructureAUniversityEssayPost,
  howToWriteAResearchQuestionPost,
  thematicAnalysisGuidePost,
  swotAndPestleAnalysisGuidePost,
  howToParaphraseAndAvoidPlagiarismPost,
  howToWriteADissertationIntroductionPost,
  howToWriteADissertationDiscussionPost,
  howToWriteADissertationConclusionPost,
  howToWriteAnAbstractPost,
  apaReferencingGuidePost,
  howToWriteABusinessReportPost,
  howToWriteACaseStudyAnalysisPost,
  ukMastersPersonalStatementPost,
  hrmDissertationTopicsPost,
  marketingDissertationTopicsPost,
  financeAccountingDissertationTopicsPost,
  nursingHealthcareDissertationTopicsPost,
  educationDissertationTopicsPost,
  computerScienceDissertationTopicsPost,
  oscolaReferencingGuidePost,
];

/** Arabic posts. Served at /ar/blog/{slug} */
export const AR_POSTS: BlogPost[] = [
  arHumanVsAiAcademicWritingPost,
  arHowToWriteAResearchProposalPost,
  arQuantitativeVsQualitativeResearchPost,
  arApaReferencingGuidePost,
  arTheoreticalFrameworkAndLiteratureReviewPost,
  arHowToWriteAnAbstractPost,
  arHowToChooseAThesisTitlePost,
  arMastersGraduationProjectUmmAlQuraPost,
  arGraduationProjectGuidePost,
  arHowToWriteAResearchIntroductionPost,
  arThesisCoverPageAndDedicationPost,
  arWhatIsAnAssignmentPost,
  arHowToWriteAResearchConclusionPost,
  arScientificResearchStepsPost,
  arQuestionnaireGuidePost,
];

export function getPost(slug: string, locale: 'en' | 'ar' = 'en'): BlogPost | undefined {
  return (locale === 'ar' ? AR_POSTS : EN_POSTS).find((p) => p.slug === slug);
}

export function postPath(post: Pick<BlogPost, 'slug' | 'locale'>): string {
  return post.locale === 'ar' ? `/ar/blog/${post.slug}` : `/blog/${post.slug}`;
}

/** Anchor id for a section heading (English slugs, numbered ids for Arabic) */
export function sectionId(heading: string, index: number, locale: 'en' | 'ar'): string {
  const id = heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return locale === 'en' && id ? id : `section-${index + 1}`;
}

/** Rough reading time in minutes */
export function readingMinutes(post: BlogPost): number {
  const text = [
    ...post.intro,
    ...post.sections.flatMap((s) => [
      s.heading,
      ...(s.paragraphs ?? []),
      ...(s.bullets ?? []),
      ...(s.steps ?? []),
      s.tip ?? '',
      ...(s.subsections ?? []).flatMap((sub) => [sub.heading, ...(sub.paragraphs ?? []), ...(sub.bullets ?? [])]),
    ]),
    ...post.faqs.flatMap((f) => [f.q, f.a]),
  ].join(' ');
  return Math.max(3, Math.round(text.split(/\s+/).length / 220));
}

/** Guides that list a given landing page slug in their relatedServices (for "Free guides" links on service pages) */
export function guidesForService(slug: string, locale: 'en' | 'ar' = 'en', limit = 4): BlogPost[] {
  const list = locale === 'ar' ? AR_POSTS : EN_POSTS;
  return list.filter((p) => p.relatedServices.includes(slug)).slice(0, limit);
}
