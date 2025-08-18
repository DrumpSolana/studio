
export {};

declare global {
  interface Window {
    gtag?: (
      event: 'config',
      measurementId: string,
      config: Record<string, any>
    ) => void;
    gtag?: (event: 'event', action: string, params: Record<string, any>) => void;
  }
}
