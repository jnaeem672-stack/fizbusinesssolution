'use client';

import { useEffect } from 'react';
import { captureLeadSource } from '@/lib/leadSource';

/** Remembers how the visitor reached the site, so quote requests can show their source. Renders nothing. */
export default function LeadSourceTracker() {
  useEffect(() => {
    captureLeadSource();
  }, []);
  return null;
}
