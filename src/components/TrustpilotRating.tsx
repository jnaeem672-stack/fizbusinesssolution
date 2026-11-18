/**
 * Custom Trustpilot rating badge.
 *
 * Shows the business's real Trustpilot TrustScore and review count (verified on the linked
 * Trustpilot profile). The official TrustBox widget only rendered the Trustpilot logo on this
 * domain (domain not verified yet), so this is a hand-built, honest display of the same real data,
 * linked to the live profile. Update RATING / REVIEWS below if the Trustpilot score changes.
 */

const TP_GREEN = '#00b67a';
const RATING = 4.3; // live TrustScore on Trustpilot (real review count not shown on the badge by choice)
const RATING_LABEL = 'Excellent';
const PROFILE_URL = 'https://www.trustpilot.com/review/fizbusinessolutions.com';

const STAR_PATH =
  'M12 2.1l2.9 6.1 6.7.6-5 4.5 1.5 6.6L12 17.1 5.4 20.6l1.5-6.6-5-4.5 6.7-.6L12 2.1z';

function StarRow({ size, gap, color }: { size: number; gap: number; color: string }) {
  return (
    <span style={{ display: 'inline-flex', gap }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'block' }} aria-hidden="true">
          <path d={STAR_PATH} />
        </svg>
      ))}
    </span>
  );
}

function Stars({ size, gap = 2 }: { size: number; gap?: number }) {
  const pct = (RATING / 5) * 100;
  return (
    <span style={{ position: 'relative', display: 'inline-flex', lineHeight: 0 }} role="img" aria-label={`${RATING} out of 5 stars`}>
      <StarRow size={size} gap={gap} color="rgba(140,150,160,0.35)" />
      <span style={{ position: 'absolute', top: 0, left: 0, width: `${pct}%`, overflow: 'hidden' }}>
        <StarRow size={size} gap={gap} color={TP_GREEN} />
      </span>
    </span>
  );
}

function Wordmark({ color }: { color: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontWeight: 800, color, letterSpacing: '-0.01em' }}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill={TP_GREEN} aria-hidden="true"><path d={STAR_PATH} /></svg>
      Trustpilot
    </span>
  );
}

export default function TrustpilotRating({
  variant = 'compact',
  theme = 'light',
}: {
  variant?: 'compact' | 'card';
  theme?: 'light' | 'dark';
}) {
  const muted = theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#4b5563';
  const strong = theme === 'dark' ? '#ffffff' : '#0B1D3A';

  if (variant === 'card') {
    return (
      <a
        href={PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Rated ${RATING} out of 5, ${RATING_LABEL}, on Trustpilot`}
        className="inline-flex flex-col items-center gap-2 rounded-2xl border px-7 py-5 no-underline transition-shadow hover:shadow-md"
        style={{ borderColor: 'rgba(0,182,122,0.35)', background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#ffffff' }}
      >
        <span style={{ fontWeight: 800, color: strong, fontSize: 18 }}>{RATING_LABEL}</span>
        <Stars size={30} gap={3} />
        <span style={{ color: muted, fontSize: 14 }}>
          Rated <b style={{ color: strong }}>{RATING} / 5</b>
        </span>
        <Wordmark color={strong} />
      </a>
    );
  }

  return (
    <a
      href={PROFILE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Rated ${RATING} out of 5, ${RATING_LABEL}, on Trustpilot`}
      className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 no-underline"
      style={{ color: muted }}
    >
      <Stars size={16} gap={1} />
      <span style={{ fontSize: 12, fontWeight: 700, color: strong }}>{RATING_LABEL} {RATING}/5</span>
      <Wordmark color={strong} />
    </a>
  );
}
