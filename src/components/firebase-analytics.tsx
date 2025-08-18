'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { analytics } from '@/lib/firebase';
import { logEvent } from 'firebase/analytics';

export default function FirebaseAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const initializeAnalytics = async () => {
      const analyticsInstance = await analytics;
      if (analyticsInstance) {
        const url = `${pathname}?${searchParams}`;
        logEvent(analyticsInstance, 'page_view', {
          page_location: url,
          page_path: pathname,
        });
      }
    };
    initializeAnalytics();
  }, [pathname, searchParams]);

  return null;
}
