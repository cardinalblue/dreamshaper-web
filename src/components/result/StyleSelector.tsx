'use client'

import { STYLE_LIST } from '@/utils/styleList'
import { StylePreviewCard } from './StylePreviewCard'
import { css } from '@styled-system/css'
import { StyleModelType } from '@/utils/types'
import { useResultImageStore, useUserImageStore } from '@/store'

interface StyleSelectorProps {
  onApply: (styleInfo: StyleModelType) => void
}

export const StyleSelector = ({ onApply }: StyleSelectorProps) => {
  const isImageLoading = useResultImageStore((state) => state.computed.isImageLoading)
  const { selectedStyle } = useUserImageStore()

  return (
    <div className={container}>
      {STYLE_LIST.map((styleInfo) => (
        <StylePreviewCard
          key={styleInfo.id}
          styleInfo={styleInfo}
          disabled={isImageLoading}
          active={selectedStyle?.id === styleInfo.id}
          onClick={() => {
            onApply(styleInfo)
          }}
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
