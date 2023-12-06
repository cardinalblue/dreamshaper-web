import * as amplitude from '@amplitude/analytics-browser'

export const ampEnterStyleListPage = () => {
  amplitude.track('viewed_style_list_page')
}

export const ampClickStyleButton = (style: string) => {
  amplitude.track('clicked_style_button', { style })
}

export const ampEnterTransferResultPage = (style: string) => {
  amplitude.track('viewed_style_result_page', { style })
}

export const ampShowTransferResult = (style: string) => {
  amplitude.track('completed_style_result_image', { style })
}

export const ampDownloadTransferResult = (style: string) => {
  amplitude.track('clicked_style_result_download_button', { style })
}

export const ampClickTryAnotherStyle = () => {
  amplitude.track('clicked_try_another_style_button')
}
