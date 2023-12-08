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
  p: '4px 4px 16px 4px',
  flexShrink: 0,
  display: 'flex',
  gap: '16px',
  overflowX: 'auto',
  overflowY: 'hidden',
  scrollBehavior: 'smooth',
  md: {
    h: '100%',
    p: '4px 16px 4px 4px',
    flexDirection: 'column',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
})
