type Uni = { name: string; short: string };

const UK: Uni[] = [
  { name: 'University of Oxford', short: 'OX' },
  { name: 'University of Cambridge', short: 'CAM' },
  { name: 'Imperial College London', short: 'ICL' },
  { name: 'University College London', short: 'UCL' },
  { name: "King's College London", short: 'KCL' },
  { name: 'London School of Economics', short: 'LSE' },
  { name: 'University of Edinburgh', short: 'ED' },
  { name: 'University of Manchester', short: 'MAN' },
  { name: 'University of Birmingham', short: 'BHM' },
  { name: 'University of Leeds', short: 'LDS' },
  { name: 'University of Bristol', short: 'BRS' },
  { name: 'University of Warwick', short: 'WAR' },
  { name: 'University of Glasgow', short: 'GLA' },
  { name: 'University of Nottingham', short: 'NOT' },
  { name: 'University of Sheffield', short: 'SHF' },
  { name: 'Newcastle University', short: 'NCL' },
  { name: 'Birkbeck, University of London', short: 'BBK' },
  { name: 'University of Bradford', short: 'BRD' },
  { name: 'Liverpool John Moores University', short: 'LJMU' },
  { name: 'Manchester Metropolitan University', short: 'MMU' },
  { name: 'De Montfort University', short: 'DMU' },
  { name: 'Coventry University', short: 'COV' },
];

const SAUDI: Uni[] = [
  { name: 'King Saud University', short: 'KSU' },
  { name: 'King Abdulaziz University', short: 'KAU' },
  { name: 'King Fahd University of Petroleum & Minerals', short: 'KFUPM' },
  { name: 'King Abdullah University of Science & Technology', short: 'KAUST' },
  { name: 'Princess Nourah bint Abdulrahman University', short: 'PNU' },
  { name: 'Imam Abdulrahman Bin Faisal University', short: 'IAU' },
  { name: 'Imam Mohammad Ibn Saud Islamic University', short: 'IMSIU' },
  { name: 'Umm Al-Qura University', short: 'UQU' },
  { name: 'King Khalid University', short: 'KKU' },
  { name: 'Qassim University', short: 'QU' },
  { name: 'Taibah University', short: 'TU' },
  { name: 'Prince Sultan University', short: 'PSU' },
  { name: 'Alfaisal University', short: 'AU' },
  { name: 'Effat University', short: 'EU' },
  { name: 'Dar Al-Hekma University', short: 'DAH' },
  { name: 'Jazan University', short: 'JU' },
  { name: 'Taif University', short: 'TAIF' },
  { name: 'University of Tabuk', short: 'UT' },
  { name: 'University of Hail', short: 'UOH' },
  { name: 'Najran University', short: 'NU' },
  { name: 'Majmaah University', short: 'MU' },
  { name: 'King Saud bin Abdulaziz University for Health Sciences', short: 'KSAU' },
];

function Row({ items, flag, reverse }: { items: Uni[]; flag: string; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <div
        className="animate-marquee gap-4 w-max py-1"
        style={{ animationDuration: '70s', animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {doubled.map((uni, i) => (
          <div
            key={`${uni.short}-${i}`}
            className="flex items-center gap-3 pl-2 pr-5 py-2 rounded-xl border border-gray-200 bg-white shadow-sm shrink-0"
          >
            <span className="relative flex items-center justify-center w-11 h-11 rounded-full bg-navy text-white text-[10px] font-black tracking-tight ring-2 ring-primary/30">
              {uni.short}
              <span className="absolute -bottom-1 -right-1 text-sm leading-none">{flag}</span>
            </span>
            <span className="text-sm font-bold text-navy whitespace-nowrap">{uni.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function UniversityStrip({
  title = 'Supporting Students from Leading Universities',
  subtitle = 'UK 🇬🇧 & Saudi Arabia 🇸🇦 · 10,000+ students since 2015',
  note = 'University names shown for reference only. FIZBS is independent and not affiliated with these institutions.',
  rtl = false,
}: { title?: string; subtitle?: string; note?: string; rtl?: boolean } = {}) {
  return (
    <section className="bg-gray-50 border-y border-gray-100 py-10">
      <div className="max-w-site mx-auto px-4">
        <div className="text-center mb-6">
          <p className="text-lg md:text-xl font-black text-navy" dir={rtl ? 'rtl' : undefined}>{title}</p>
          <p className="text-sm text-gray-500 mt-1" dir={rtl ? 'rtl' : undefined}>{subtitle}</p>
        </div>
        <div className="space-y-4">
          <Row items={UK} flag="🇬🇧" />
          <Row items={SAUDI} flag="🇸🇦" reverse />
        </div>
        <p className="text-center text-[10px] text-gray-400 mt-5">
          {note}
        </p>
      </div>
    </section>
  );
}
