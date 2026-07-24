'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  SUPPORT_FORM_HASH,
  scrollToSupportForm,
  shouldScrollToSupportForm,
} from '@/constants/supportNavigation';

export function useSupportFormScroll() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (shouldScrollToSupportForm(searchParams) || window.location.hash === SUPPORT_FORM_HASH) {
      setTimeout(() => scrollToSupportForm(), 150);
    }
  }, [searchParams]);
}
