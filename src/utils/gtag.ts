declare global {
  interface Window {
    gtag?: any
  }
}

export const GA_TRACKING_ID =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? process.env.NEXT_PUBLIC_GA_TRACKING_ID
    : process.env.NEXT_PUBLIC_TESTING_GA_TRACKING_ID

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL): void => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = (action: string, params?: Record<string, any>) => {
  window.gtag('event', action, params)
}
