'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './UniversityStrip.module.css';
import { universityLogos } from '@/data/universityLogos';
import TrustBadges from '@/components/TrustBadges';

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

function Row({ items, label, reverse, rtl = false }: { items: Uni[]; label: string; reverse?: boolean; rtl?: boolean }) {
  const [paused, setPaused] = useState(false);
  return (
    <div>
      <button type="button" className={styles.pause} aria-pressed={paused}
        aria-label={`${rtl ? "إيقاف التمرير مؤقتًا" : "Pause scrolling"}: ${label}`}
        onClick={() => setPaused(!paused)}>
        {paused ? (rtl ? "استئناف التمرير" : "Resume scrolling") : (rtl ? "إيقاف التمرير" : "Pause scrolling")}
      </button>
    <div className={styles.viewport} tabIndex={0} role="region" aria-label={label} dir="ltr">
      <div className={`${styles.track} ${reverse ? styles.reverse : ''}`} style={{ animationPlayState: paused ? 'paused' : undefined }}>
        {[false, true].map((duplicate) => (
          <ul className={styles.group} key={String(duplicate)} aria-hidden={duplicate || undefined}>
            {items.map((uni) => {
              const logo = universityLogos[uni.short];
              return (
                <li key={uni.short} className={styles.card}>
                  <span className={`${styles.logo} ${logo.dark ? styles.dark : ''}`}>
                    <Image src={logo.src} alt="" width={logo.width} height={logo.height}
                      className={styles.artwork} unoptimized loading="lazy" />
                  </span>
                  <span className="text-sm font-bold text-navy whitespace-nowrap">{uni.name}</span>
                </li>
              );
            })}
          </ul>
        ))}
      </div>
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
        <TrustBadges locale={rtl ? 'ar' : 'en'} />
        <div className="text-center mb-6">
          <p className="text-lg md:text-xl font-black text-navy" dir={rtl ? 'rtl' : undefined}>{title}</p>
          <p className="text-sm text-gray-500 mt-1" dir={rtl ? 'rtl' : undefined}>{subtitle}</p>
        </div>
        <div className="space-y-4">
          <Row items={UK} rtl={rtl} label={rtl ? "جامعات المملكة المتحدة" : "UK universities"} />
          <Row items={SAUDI} rtl={rtl} label={rtl ? "جامعات المملكة العربية السعودية" : "Saudi Arabian universities"} reverse />
        </div>
        <p className="text-center text-[10px] text-gray-500 mt-5">
          {note}
        </p>
      </div>
    </section>
  );
}
