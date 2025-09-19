
export const GA_MEASUREMENT_ID = 'G-MT3LG8V1N2';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL) => {
  if (typeof window.gtag !== 'function') {
    return;
  }
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
type GTagEvent = {
  action: string;
  category: string;
  label: string;
  value: number;
};

export const logGtagEvent = (
  action: string,
  params?: Record<string, any>
) => {
  if (typeof window.gtag !== 'function') {
    return;
  }
  window.gtag('event', action, params);
};
