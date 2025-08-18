
'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { logAnalyticsEvent, analytics } from '@/lib/firebase';

export default function FirebaseAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // This effect ensures analytics is initialized on the client side.
    // The logAnalyticsEvent function will handle the rest.
    analytics.then(instance => {
      if (!instance) {
        console.log("Analytics is not supported in this environment.");
      }
    });
  }, []);

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    logAnalyticsEvent('page_view', {
      page_location: url,
      page_path: pathname,
    });
  }, [pathname, searchParams]);

  return null;
}
