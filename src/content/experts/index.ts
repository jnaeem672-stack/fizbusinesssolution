import type { ExpertArticle } from './types';
import { TEAM, SPECIALIST_GROUPS, type TeamIcon } from '@/content/team';
import { article as sajjadAkbarAli } from './sajjad-akbar-ali';
import { article as fawadHussainKhan } from './fawad-hussain-khan';
import { article as abdulRehman } from './abdul-rehman';
import { article as naeem } from './naeem';
import { article as hadia } from './hadia';
import { article as hafizaAyesha } from './hafiza-ayesha';
import { article as ahmedK } from './ahmed-k';
import { article as saraM } from './sara-m';
import { article as danielR } from './daniel-r';
import { article as oliverT } from './oliver-t';
import { article as nadiaS } from './nadia-s';
import { article as jamesP } from './james-p';
import { article as arjunS } from './arjun-s';
import { article as priyaD } from './priya-d';
import { article as hannahB } from './hannah-b';
import { article as hassanR } from './hassan-r';
import { article as rohanM } from './rohan-m';
import { article as lukasW } from './lukas-w';
import { article as omarF } from './omar-f';
import { article as ethanJ } from './ethan-j';
import { article as sameerA } from './sameer-a';
import { article as mayaC } from './maya-c';
import { article as farhanA } from './farhan-a';
import { article as kavyaR } from './kavya-r';
import { article as claraV } from './clara-v';
import { article as ayeshaH } from './ayesha-h';
import { article as emiliaK } from './emilia-k';
import { article as sophiaL } from './sophia-l';
import { article as leilaN } from './leila-n';
import { article as meeraK } from './meera-k';

export type { ExpertArticle } from './types';

export interface ExpertProfile {
  slug: string;
  name: string;
  initials: string;
  gradient: string;
  icon: TeamIcon;
  title: string;
  qualification: string;
  university?: string;
  year?: number;
  experience?: string;
  languages?: string;
  highlights: string[];
  group: string;
  article: ExpertArticle;
}

const ARTICLES: Record<string, ExpertArticle> = {
  'sajjad-akbar-ali': sajjadAkbarAli,
  'fawad-hussain-khan': fawadHussainKhan,
  'abdul-rehman': abdulRehman,
  'naeem': naeem,
  'hadia': hadia,
  'hafiza-ayesha': hafizaAyesha,
  'ahmed-k': ahmedK,
  'sara-m': saraM,
  'daniel-r': danielR,
  'oliver-t': oliverT,
  'nadia-s': nadiaS,
  'james-p': jamesP,
  'arjun-s': arjunS,
  'priya-d': priyaD,
  'hannah-b': hannahB,
  'hassan-r': hassanR,
  'rohan-m': rohanM,
  'lukas-w': lukasW,
  'omar-f': omarF,
  'ethan-j': ethanJ,
  'sameer-a': sameerA,
  'maya-c': mayaC,
  'farhan-a': farhanA,
  'kavya-r': kavyaR,
  'clara-v': claraV,
  'ayesha-h': ayeshaH,
  'emilia-k': emiliaK,
  'sophia-l': sophiaL,
  'leila-n': leilaN,
  'meera-k': meeraK,
};

export const expertSlug = (name: string) => name.toLowerCase().replace(/\./g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const initialsOf = (name: string) =>
  name.replace(/\./g, '').split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

export const EXPERTS: ExpertProfile[] = [
  ...TEAM.map((m) => ({
    slug: expertSlug(m.name),
    name: m.name,
    initials: m.initials,
    gradient: m.gradient,
    icon: m.icon,
    title: m.role,
    qualification: m.qualification,
    highlights: m.highlights,
    group: m.group === 'founders' ? 'Founders' : 'Business & Finance Team',
    article: ARTICLES[expertSlug(m.name)],
  })),
  ...SPECIALIST_GROUPS.flatMap((g) =>
    g.members.map((m) => ({
      slug: expertSlug(m.name),
      name: m.name,
      initials: initialsOf(m.name),
      gradient: g.gradient,
      icon: g.icon,
      title: m.expertise,
      qualification: m.qualification,
      university: m.university,
      year: m.year,
      experience: m.experience,
      languages: m.languages,
      highlights: [m.qualification, `${m.experience} of experience`, m.languages],
      group: g.title,
      article: ARTICLES[expertSlug(m.name)],
    }))
  ),
].filter((e) => Boolean(e.article));

export const getExpert = (slug: string) => EXPERTS.find((e) => e.slug === slug);
