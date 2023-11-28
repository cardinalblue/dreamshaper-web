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

export const ampEnterStyleListPage = () => {
  amplitude.track('viewed_style_list_page')
}

export const ampClickStyleButton = (style: string) => {
  amplitude.track('clicked_style_button', { style })
}

export const ampEnterTransferResultPage = () => {
  amplitude.track('viewed_style_result_page')
}

export const ampShowTransferResult = (style: string) => {
  amplitude.track('completed_style_result_image', { style })
}

export const ampDownloadTransferResult = () => {
  amplitude.track('clicked_style_result_download_button')
}
