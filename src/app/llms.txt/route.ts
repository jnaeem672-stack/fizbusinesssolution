import { EN_LANDING_PAGES, AR_LANDING_PAGES, SITE_URL, landingLabel, landingPath } from '@/content/landing';
import { EN_POSTS, AR_POSTS, postPath } from '@/content/blog';
import { TOOLS, toolPath } from '@/content/tools';

export const dynamic = 'force-static';

/** llms.txt: a plain summary of the site for AI assistants (https://llmstxt.org) */
export function GET() {
  const line = (title: string, path: string, note: string) => `- [${title}](${SITE_URL}${path}): ${note}`;
  const body = [
    '# FIZ Business Solutions (FIZBS)',
    '',
    '> Online assignment, dissertation and research help for university students in the UK, Saudi Arabia and the Gulf since 2015. Master\'s and PhD-qualified experts give guidance, feedback, proofreading and data analysis support across 115+ subjects.',
    '',
    '## Key facts',
    '- Founded: 2015. Founders: Sajjad Akbar Ali (MBA) and Fawad Hussain Khan (MPhil Mass Communication)',
    '- 10,000+ students supported, 350+ research projects, 115+ subjects',
    '- Prices: assignments from £20 per 1,000 words; dissertations £30 per 1,000 words with a maximum of £350; proofreading from £12 per 1,000 words; 10% off the first order',
    '- Payment: 50% to start and 50% on completion, by UK bank transfer (GBP) or Saudi bank transfer (SAR)',
    '- Contact: WhatsApp +971 54 380 0388 (24/7); website form at ' + SITE_URL + '/contact',
    '- Policy: students must submit their own work; see ' + SITE_URL + '/academic-integrity',
    '',
    '## Services',
    ...EN_LANDING_PAGES.map((p) => line(landingLabel(p), landingPath(p), p.metaDescription)),
    '',
    '## Free student tools',
    ...TOOLS.map((t) => line(t.name, toolPath(t), t.metaDescription)),
    '',
    '## Student guides',
    ...EN_POSTS.map((p) => line(p.title, postPath(p), p.metaDescription)),
    '',
    '## Arabic pages',
    ...AR_LANDING_PAGES.map((p) => line(landingLabel(p), landingPath(p), p.metaDescription)),
    ...AR_POSTS.map((p) => line(p.title, postPath(p), p.metaDescription)),
    '',
    '## About',
    line('About FIZBS', '/about', 'Company background, key facts and how support works'),
    line('Our Team', '/our-team', 'Founders and subject specialists'),
    line('Work samples', '/samples', 'Example work by FIZBS experts, for reference only'),
    line('Student results', '/results', 'Real grade screenshots shared by students, with personal details removed'),
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
