import * as amplitude from '@amplitude/analytics-browser'
import * as gtag from './gtag'

export const ampEnterStyleListPage = () => {
  const eventName = 'viewed_style_list_page'
  amplitude.track(eventName)
  gtag.event(eventName)
}

export const ampClickStyleButton = (style: string) => {
  const eventName = 'clicked_style_button'
  amplitude.track(eventName, { style })
  gtag.event(eventName, { style })
}

export const ampEnterTransferResultPage = (style: string) => {
  const eventName = 'viewed_style_result_page'
  amplitude.track(eventName, { style })
  gtag.event(eventName, { style })
}

export const ampShowTransferResult = (style: string) => {
  const eventName = 'completed_style_result_image'
  amplitude.track(eventName, { style })
  gtag.event(eventName, { style })
}

export const ampDownloadTransferResult = (style: string) => {
  const eventName = 'clicked_style_result_download_button'
  amplitude.track(eventName, { style })
  gtag.event(eventName, { style })
}

export const ampClickTryAnotherStyle = () => {
  const eventName = 'clicked_try_another_style_button'
  amplitude.track(eventName)
  gtag.event(eventName)
}
