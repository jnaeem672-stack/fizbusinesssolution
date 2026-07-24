import { ImageResponse } from 'next/og';
import { LogoMarkSvg } from '@/lib/brand/LogoMarkSvg';
import { BRAND_COLORS } from '@/lib/brand/logoAssets';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: BRAND_COLORS.white,
          padding: 24,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <LogoMarkSvg size={96} capSize={56} dotSize={28} borderRadius={20} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', letterSpacing: '-0.05em' }}>
              <span style={{ color: BRAND_COLORS.primary, fontSize: 52, fontWeight: 900 }}>Fiz</span>
              <span style={{ color: BRAND_COLORS.navy, fontSize: 52, fontWeight: 900 }}>BS</span>
            </div>
            <span
              style={{
                color: '#94a3b8',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                marginTop: -4,
              }}
            >
              Learning & Research Support
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
