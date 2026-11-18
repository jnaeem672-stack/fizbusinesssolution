'use client';

import { useEffect, useRef } from 'react';

type Props = {
  /** Trustpilot TrustBox template id (chooses the widget layout) */
  templateId: string;
  /** Widget height, e.g. "24px" (micro) or "130px" (mini) */
  height?: string;
  theme?: 'light' | 'dark';
  /** BCP-47 locale for the widget text */
  locale?: string;
  className?: string;
};

type TrustpilotApi = { loadFromElement: (el: HTMLElement | null, async?: boolean) => void };

/**
 * Trustpilot TrustBox widget (shows the live TrustScore and review count).
 * The bootstrap script is loaded once in RootDocument and scans for .trustpilot-widget
 * elements on load; the effect below re-hydrates this instance after client-side navigation.
 * businessUnitId is the FIZBS Trustpilot profile for fizbusinessolutions.com.
 */
export default function TrustpilotWidget({
  templateId,
  height = '20px',
  theme = 'light',
  locale = 'en-GB',
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tp = (window as unknown as { Trustpilot?: TrustpilotApi }).Trustpilot;
    if (tp && ref.current) tp.loadFromElement(ref.current, true);
  }, []);

  return (
    <div
      ref={ref}
      className={`trustpilot-widget${className ? ` ${className}` : ''}`}
      data-locale={locale}
      data-template-id={templateId}
      data-businessunit-id="6ae3967e6be2cea2d39e825e"
      data-style-height={height}
      data-style-width="100%"
      data-theme={theme}
    >
      <a href="https://www.trustpilot.com/review/fizbusinessolutions.com" target="_blank" rel="noopener noreferrer">
        Trustpilot
      </a>
    </div>
  );
}

/** TrustBox template ids (public, same for every Trustpilot account) */
export const TRUSTPILOT_TEMPLATES = {
  microCombo: '5419b6ffb0d04a076446a9af',
  mini: '53aa8807dec7e10d38f59f32',
  horizontal: '5406e65db0d04a09e042d5fc',
} as const;
