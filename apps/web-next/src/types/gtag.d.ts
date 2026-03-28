type GtagCommand = 'config' | 'event' | 'set' | 'js' | 'get' | 'consent';

interface GtagEventParams {
  [key: string]: string | number | boolean | undefined;
}

declare global {
  interface Window {
    gtag?: (
      command: GtagCommand,
      targetOrAction: string | Date,
      params?: GtagEventParams | Date
    ) => void;
  }
}

export {};
