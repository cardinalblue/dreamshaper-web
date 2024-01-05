'use client'

import React from 'react'
import { css, cx } from '@styled-system/css'
import { Button } from '@/components/Button'
import { FileInput } from '@/components/FileInput'
import { StyleModelType } from '@/utils/types'

interface StylePreviewCardProps {
  styleInfo: StyleModelType
  onUpload: (styleInfo: StyleModelType) => void
  onClick: (id: string) => void
}

export const StylePreviewCard = ({ styleInfo, onUpload, onClick }: StylePreviewCardProps) => {
  return (
    <FileInput
      key={styleInfo.id}
      inputId={`file-input-${styleInfo.id}`}
      onUpload={() => onUpload(styleInfo)}
      onClick={() => onClick(styleInfo.id)}
    >
      <div className={container}>
        <div className={thumbnailWrapper}>
          <div
            className={cx(thumbnail, 'thumbnail')}
            style={{ backgroundImage: `url('${styleInfo.src}')` }}
          ></div>
        </div>
        <div className={titleWrapper}>
          <div className={title}>{styleInfo.name}</div>
          <Button theme="dark">TRY</Button>
        </div>
      </div>
    </FileInput>
  )
}

const container = css({
  w: '100%',
  h: '355px',
  rounded: '25px',
  bg: '#FBFAF8',
  boxShadow: '0px 10px 50px 0px rgba(7, 23, 35, 0.15)',

  display: 'flex',
  flexDirection: 'column',
  gap: '16px',

  cursor: 'pointer',
  overflow: 'hidden',
  _hover: {
    '& .thumbnail': {
      transform: 'scale(1.03)',
    },
  },
})

const thumbnailWrapper = css({
  w: '100%',
  h: '283px',
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
  px: '24px 16px',
  pb: '16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontWeight: 'bold',
})

const title = css({
  fontSize: '22px',
  fontWeight: '600',
  lineHeight: '1.2',
  color: '#484851',
})
