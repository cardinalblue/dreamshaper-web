'use client'

import { STYLE_LIST } from '@/utils/styleList'
import { StylePreviewCard } from './StylePreviewCard'
import { css } from '@styled-system/css'
import { useResultImageStore, useUserImageStore } from '@/store'

export const StyleSelector = () => {
  const isImageLoading = useResultImageStore((state) => state.computed.isImageLoading)
  const { selectedStyle, setSelectedStyle } = useUserImageStore()

  return (
    <div className={container}>
      {STYLE_LIST.map((styleInfo) => (
        <StylePreviewCard
          key={styleInfo.id}
          styleInfo={styleInfo}
          disabled={isImageLoading}
          active={selectedStyle?.id === styleInfo.id}
          onClick={() => setSelectedStyle(styleInfo)}
        />
      ))}
    </div>
  )
}

const container = css({
  p: '24px',
  flexShrink: 0,
  display: 'flex',
  gap: '16px',
  bgColor: '#ECE9DF',
  overflow: 'auto',
  scrollBehavior: 'smooth',
  md: {
    w: '214px',
    h: '100%',
    flexDirection: 'column',
  },
})
