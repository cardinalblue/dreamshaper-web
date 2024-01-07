'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { css } from '@styled-system/css'
import { useUserImageStore } from '@/store'
import { ampClickStyleButton } from '@/utils/eventTracking'
import { STYLE_LIST_HIGHLIGHT, STYLE_LIST_REST } from '@/utils/styleList'
import { StylePreviewCard } from './StylePreviewCard'
import { StylePreviewSection } from './StylePreviewSection'
import { StyleModelType } from '@/utils/types'

export const HomepageStyleSelector = () => {
  const { setSelectedStyle } = useUserImageStore()
  const router = useRouter()

  const onUpload = (styleInfo: StyleModelType) => {
    setSelectedStyle(styleInfo)
    router.push('/result')
  }

  const onTryButtonClick = (id: string) => {
    ampClickStyleButton(id)
  }

  return (
    <div className={container}>
      <div className={promotionWrapper}>
        {STYLE_LIST_HIGHLIGHT.map((styleInfo) => (
          <StylePreviewSection
            key={styleInfo.id}
            styleInfo={styleInfo}
            onUpload={onUpload}
            onClick={onTryButtonClick}
          />
        ))}
      </div>
      <div className={listWrapper}>
        {STYLE_LIST_REST.map((styleInfo) => (
          <StylePreviewCard
            key={styleInfo.id}
            styleInfo={styleInfo}
            onUpload={onUpload}
            onClick={onTryButtonClick}
          />
        ))}
      </div>
    </div>
  )
}

const container = css({
  position: 'relative',
  py: '44px 60px',
  px: '32px',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: '24px',
  zIndex: 1,

  // wave bg
  _before: {
    content: '""',
    position: 'absolute',
    bottom: '-45px',
    left: 0,
    right: 0,
    height: '1016px',
    bg: 'url(/images/wave_bg.png) no-repeat bottom center / contain',
    pointerEvents: 'none',
    zIndex: -1,
  },

  md: {
    px: '72px',
  },
})

const promotionWrapper = css({})

const listWrapper = css({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '32px',
  justifyContent: 'center',
  md: {
    gridTemplateColumns: 'repeat(2, minmax(0, 100%))',
  },
  xl: {
    gridTemplateColumns: 'repeat(3, minmax(0, 350px))',
  },
})
