import { ImageResponse } from 'next/og';
import { LogoMarkSvg } from '@/lib/brand/LogoMarkSvg';
import { BRAND_COLORS } from '@/lib/brand/logoAssets';

export const OG_SIZE = { width: 1200, height: 630 };

/** Branded 1200x630 share image (Latin text only: the default OG font has no Arabic glyphs). */
export function brandOgImage({ eyebrow, title, footer }: { eyebrow: string; title: string; footer: string }) {
  const fontSize = title.length > 80 ? 52 : title.length > 55 ? 60 : 68;
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: `linear-gradient(135deg, ${BRAND_COLORS.navy} 0%, #17325E 100%)`,
          padding: 64,
          color: '#ffffff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <LogoMarkSvg size={72} capSize={42} dotSize={20} borderRadius={18} />
            <div style={{ display: 'flex', fontSize: 46, fontWeight: 900, letterSpacing: '-0.04em' }}>
              <span style={{ color: BRAND_COLORS.primary }}>FIZ</span>
              <span>BS</span>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              background: BRAND_COLORS.primary,
              color: BRAND_COLORS.navy,
              borderRadius: 999,
              padding: '10px 24px',
              fontSize: 24,
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            {eyebrow}
          </div>
        </div>

        <div style={{ display: 'flex', fontSize, fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', maxWidth: 1060 }}>
          {title}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 26 }}>
          <div style={{ display: 'flex', color: '#E0BC4A', fontWeight: 800 }}>{footer}</div>
          <div style={{ display: 'flex', color: 'rgba(255,255,255,0.6)' }}>fizbusinessolutions.com</div>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
