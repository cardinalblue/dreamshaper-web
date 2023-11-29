import * as amplitude from '@amplitude/analytics-browser'

export const initAmplitude = () => {
  const API_KEY =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
      ? process.env.NEXT_PUBLIC_AMPLITUDE_KEY
      : process.env.NEXT_PUBLIC_TESTING_AMPLITUDE_KEY
  amplitude.init(API_KEY ?? '', undefined, {
    logLevel: amplitude.Types.LogLevel.Warn,
    defaultTracking: {
      sessions: true,
    },
  })
}
