'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { logAnalyticsEvent } from '@/lib/firebase';

export default function FirebaseAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    logAnalyticsEvent('page_view', {
      page_location: url,
      page_path: pathname,
    });
  }, [pathname, searchParams]);

  return null;
}
