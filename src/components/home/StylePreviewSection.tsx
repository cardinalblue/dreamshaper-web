'use client'

import React from 'react'
import { css, cx } from '@styled-system/css'
import { buttonRecipe } from '@/components/Button'
import { FileInput } from '@/components/FileInput'
import { StyleModelType } from '@/utils/types'

interface StylePreviewSectionProps {
  styleInfo: StyleModelType
  onUpload: (styleInfo: StyleModelType) => void
  onClick: (id: string) => void
}

export const StylePreviewSection = ({ styleInfo, onUpload, onClick }: StylePreviewSectionProps) => {
  return (
    <div className={container}>
      <div
        className={cx(thumbnail, 'thumbnail')}
        style={{ backgroundImage: `url('${styleInfo.src}')` }}
      ></div>
      <div className={titleWrapper}>
        <div className={title}>{styleInfo.name}</div>
        <div className={desc}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac est libero.
        </div>
        <FileInput
          key={styleInfo.id}
          inputId={`file-input-${styleInfo.id}`}
          onUpload={() => onUpload(styleInfo)}
          onClick={() => onClick(styleInfo.id)}
        >
          <div className={cx(buttonRecipe({ theme: 'dark' }), tryButton)}>TRY THIS STYLE</div>
        </FileInput>
      </div>
    </div>
  )
}

const container = css({
  w: '100%',
  p: '16px 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  md: {
    h: '442px',
    flexDirection: 'row',
    alignItems: 'center',
  },
})

const thumbnail = css({
  h: '410px',
  bg: 'no-repeat center / cover',
  rounded: '20px',
  md: {
    w: '617px',
    maxW: '60%',
    order: 1,
  },
})

const titleWrapper = css({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  md: {
    py: '16px',
  },
})

const title = css({
  fontSize: '32px',
  fontWeight: '700',
  lineHeight: 'normal',
  color: '#484851',
})

const desc = css({
  color: '#60606C',
  md: {
    maxW: '340px',
  },
})

const tryButton = css({
  w: '184px',
  h: '54px',
  mt: '16px',
  flexShrink: 0,
})
