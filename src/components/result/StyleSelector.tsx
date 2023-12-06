'use client'

import { STYLE_LIST } from '@/utils/styleList'
import { StylePreviewCard } from './StylePreviewCard'
import { css } from '@styled-system/css'
import { useUserImageStore } from '@/store'

export const StyleSelector = () => {
  const { setSelectedStyle } = useUserImageStore()

  return (
    <div className={container}>
      {STYLE_LIST.map((styleInfo) => (
        <StylePreviewCard
          key={styleInfo.id}
          styleInfo={styleInfo}
          onClick={() => {
            // setSelectedStyle(styleInfo)
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
  md: {
    w: '214px',
    h: '100%',
    flexDirection: 'column',
  },
})
