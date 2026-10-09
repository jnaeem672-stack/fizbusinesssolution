'use client';

import { useEffect } from 'react';
import {
  SUPPORT_FORM_HASH,
  scrollToSupportForm,
  shouldScrollToSupportForm,
} from '@/constants/supportNavigation';

/**
 * Scrolls to the support form when the URL asks for it (?support / #support-form).
 * Reads window.location on mount instead of useSearchParams, so pages stay fully
 * server-rendered (useSearchParams forced the whole page to render in the browser).
 */
export function useSupportFormScroll() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (shouldScrollToSupportForm(params) || window.location.hash === SUPPORT_FORM_HASH) {
      setTimeout(() => scrollToSupportForm(), 150);
    }
  }, []);
}
