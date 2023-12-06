'use client'

import { useRef } from 'react'
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
  const listRef = useRef<HTMLDivElement>(null)

  return (
    <div className={container} ref={listRef}>
      {STYLE_LIST.map((styleInfo) => (
        <StylePreviewCard
          key={styleInfo.id}
          styleInfo={styleInfo}
          disabled={isImageLoading}
          active={selectedStyle?.id === styleInfo.id}
          onClick={() => {
            onApply(styleInfo)
            listRef.current?.scrollTo({ top: 0, left: 0 })
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
