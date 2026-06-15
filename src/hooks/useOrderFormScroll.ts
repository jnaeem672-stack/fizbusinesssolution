'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ORDER_FORM_HASH, scrollToOrderForm, shouldScrollToOrderForm } from '@/constants/orderNavigation';

export function useOrderFormScroll() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (shouldScrollToOrderForm(searchParams) || window.location.hash === ORDER_FORM_HASH) {
      setTimeout(() => scrollToOrderForm(), 150);
    }
  }, [searchParams]);
}
