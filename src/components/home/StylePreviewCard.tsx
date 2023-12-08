'use client'

import React from 'react'
import { css, cx } from '@styled-system/css'
import { Button } from '@/components/Button'
import { StyleModelType } from '@/utils/types'

interface StylePreviewCardProps {
  styleInfo: StyleModelType
}

export const StylePreviewCard = ({ styleInfo }: StylePreviewCardProps) => {
  return (
    <div className={container}>
      <div className={thumbnailWrapper}>
        <div
          className={cx(thumbnail, 'thumbnail')}
          style={{ backgroundImage: `url('${styleInfo.src}')` }}
        ></div>
      </div>
      <div className={titleWrapper}>
        <div className={title}>{styleInfo.name}</div>
        <Button theme="dark" className={tryButton}>
          try
        </Button>
      </div>
    </div>
  )
}

const container = css({
  w: '100%',
  h: '420px',
  p: '16px',
  rounded: '25px',
  bg: '#ECE9DF',
  boxShadow: '0px 10px 50px 0px rgba(7, 23, 35, 0.15)',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  cursor: 'pointer',
  _hover: {
    '& .thumbnail': {
      transform: 'scale(1.03)',
    },
  },
  md: {
    maxW: '357px',
  },
})

const thumbnailWrapper = css({
  w: '100%',
  h: '320px',
  rounded: '25px',
  overflow: 'hidden',
})

const thumbnail = css({
  w: '100%',
  h: '100%',
  bg: 'no-repeat center / cover',
  transition: 'all 0.3s',
  willChange: 'transform',
})

const titleWrapper = css({
  w: '100%',
  flex: 1,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontWeight: 'bold',
})

const title = css({
  ml: '16px',
  fontSize: '20px',
  fontWeight: '600',
  lineHeight: 'normal',
  color: '#484851',
})

const tryButton = css({
  w: '82px',
  h: '50px',
  flexShrink: 0,
  textTransform: 'uppercase',
})
