import { WHATSAPP_NUMBER } from '@/constants/whatsapp';
import { CONTACT_EMAIL } from '@/constants/contact';

const FACTS: [string, string][] = [
  ['Business name', 'FIZ Business Solutions (FIZBS)'],
  ['Founded', '2015'],
  ['Founders', 'Sajjad Akbar Ali (MBA) and Fawad Hussain Khan (MPhil Mass Communication)'],
  ['What we do', 'Assignment, dissertation, research proposal, data analysis, proofreading and referencing support'],
  ['Students supported', '10,000+'],
  ['Research projects', '350+'],
  ['Subjects covered', '115+'],
  ['Where we work', 'Online, for students in the UK, Saudi Arabia and the Gulf'],
  ['Prices', 'Assignments from £20 per 1,000 words; dissertations £30 per 1,000 words; proofreading from £12 per 1,000 words'],
  ['First order', '10% off'],
  ['Payment', '50% to start and 50% on completion, by UK bank transfer (GBP) or Saudi bank transfer (SAR)'],
  ['Contact', `WhatsApp ${WHATSAPP_NUMBER} (24/7) or ${CONTACT_EMAIL}`],
  ['Free tools', 'Degree classification calculator, Harvard referencing generator and word counter'],
];

/** Plain, quotable facts about FIZBS (useful for readers, search engines and AI assistants). */
export default function KeyFacts() {
  return (
    <section className="py-16 md:py-20 bg-white" aria-labelledby="key-facts">
      <div className="max-w-[900px] mx-auto px-4">
        <h2 id="key-facts" className="text-2xl md:text-3xl font-extrabold text-navy tracking-tight mb-6">FIZBS at a glance</h2>
        <dl className="overflow-hidden rounded-2xl border border-gray-200 divide-y divide-gray-100">
          {FACTS.map(([k, v]) => (
            <div key={k} className="grid grid-cols-1 sm:grid-cols-[200px_minmax(0,1fr)] gap-1 sm:gap-4 px-5 py-3.5 even:bg-gray-50">
              <dt className="text-sm font-black text-navy">{k}</dt>
              <dd className="text-[15px] text-gray-700">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
