'use client';

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react';
import { WHATSAPP_URL } from '@/constants/whatsapp';

type WhatsAppLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'rel'> & {
  href?: string;
  children: ReactNode;
};

/** Plain anchor with direct wa.me link — reliable in new tabs and on mobile */
export default function WhatsAppLink({
  href = WHATSAPP_URL,
  children,
  onClick,
  ...props
}: WhatsAppLinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Google Ads conversion: WhatsApp click
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof gtag === 'function') {
      gtag('event', 'conversion', {
        send_to: 'AW-18496017210/cE7MCJO6oJIdELqmy_NE',
        value: 1.0,
        currency: 'PKR',
      });
    }
    onClick?.(e);
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
