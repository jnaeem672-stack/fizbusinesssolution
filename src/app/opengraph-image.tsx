import { ImageResponse } from 'next/og';
import { LogoMarkSvg } from '@/lib/brand/LogoMarkSvg';
import { BRAND_COLORS } from '@/lib/brand/logoAssets';

export const alt = 'FIZBS: Assignment & Dissertation Help UK & Saudi Arabia';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: `linear-gradient(135deg, ${BRAND_COLORS.navy} 0%, #1a2f5e 100%)`,
          padding: 64,
          color: BRAND_COLORS.white,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <LogoMarkSvg size={84} capSize={50} dotSize={24} borderRadius={20} />
          <div style={{ display: 'flex', fontSize: 52, fontWeight: 900, letterSpacing: '-0.04em' }}>
            <span style={{ color: BRAND_COLORS.primary }}>FIZ</span>
            <span>BS</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 68, fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.03em' }}>
            Assignment & Dissertation Help
          </div>
          <div style={{ display: 'flex', fontSize: 68, fontWeight: 900, lineHeight: 1.08, color: '#E0BC4A' }}>
            UK & Saudi Arabia
          </div>
          <div style={{ display: 'flex', fontSize: 30, marginTop: 24, color: 'rgba(255,255,255,0.75)' }}>
            From £20 per 1,000 words  |  Qualified experts  |  24/7 WhatsApp
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              display: 'flex',
              background: BRAND_COLORS.primary,
              borderRadius: 999,
              padding: '12px 28px',
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            10% OFF your first order
          </div>
          <div style={{ display: 'flex', fontSize: 26, color: 'rgba(255,255,255,0.6)' }}>
            Since 2015  |  10,000+ students  |  fizbusinessolutions.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
