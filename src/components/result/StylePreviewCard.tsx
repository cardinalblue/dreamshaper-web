'use client'

import React from 'react'
import { css, cx } from '@styled-system/css'
import { Button } from '@/components/Button'
import { StyleModelProps } from '@/utils/types'

interface StylePreviewCardProps {
  styleInfo: StyleModelProps
  onClick: () => void
}

export const StylePreviewCard = ({ styleInfo, onClick }: StylePreviewCardProps) => {
  return (
    <div className={container} onClick={onClick}>
      <div className={thumbnailWrapper}>
        <div
          className={cx(thumbnail, 'thumbnail')}
          style={{ backgroundImage: `url('${styleInfo.src}')` }}
        ></div>
      </div>
      <div className={title}>{styleInfo.name}</div>
    </div>
  )
}

const container = css({
  w: '166px',
  h: '186px',
  p: '8px',
  flexShrink: 0,
  rounded: '15px',
  bg: '#FBFBF9',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  cursor: 'pointer',
  _hover: {
    '& .thumbnail': {
      transform: 'scale(1.03)',
    },
  },
})

const thumbnailWrapper = css({
  h: '140px',
  rounded: '8px',
  overflow: 'hidden',
})

const thumbnail = css({
  w: '100%',
  h: '100%',
  bg: 'no-repeat center / cover',
  transition: 'all 0.3s',
})

const title = css({
  p: '0 9px',
  fontWeight: '600',
  lineHeight: 'normal',
  color: '#484851',
  whiteSpace: 'nowrap',
})
