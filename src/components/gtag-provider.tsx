
'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, type PropsWithChildren } from 'react';
import { pageview } from '@/lib/gtag';

export default function GtagProvider({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      pageview(new URL(pathname, window.location.origin));
    }
  }, [pathname, searchParams]);

  return children;
}
