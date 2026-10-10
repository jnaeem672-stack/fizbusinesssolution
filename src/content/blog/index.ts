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

export type { BlogPost } from './types';

/** English posts, newest/most important first. Served at /blog/{slug} */
export const EN_POSTS: BlogPost[] = [
  howToWriteADissertationPost,
  howToWriteALiteratureReviewPost,
  dissertationMethodologyGuidePost,
  harvardReferencingGuidePost,
  whichStatisticalTestSpssPost,
  ukUniversityGradingSystemPost,
  howToEmailAPhdSupervisorPost,
  gibbsReflectiveCycleGuidePost,
];

/** Arabic posts. Served at /ar/blog/{slug} */
export const AR_POSTS: BlogPost[] = [arHowToWriteAResearchProposalPost, arApaReferencingGuidePost];

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
