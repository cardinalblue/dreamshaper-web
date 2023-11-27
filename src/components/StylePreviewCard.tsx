'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { css, cx } from '@styled-system/css'
import { useUserImageStore } from '@/store'
import { FileInput } from '@/components/FileInput'

interface StylePreviewCardProps {
  styleInfo: {
    id: string
    name: string
    src: string
    config: Record<string, any>
  }
  style?: React.CSSProperties
}

export const StylePreviewCard = ({ styleInfo, style }: StylePreviewCardProps) => {
  const { setSelectedStyle } = useUserImageStore()

  const router = useRouter()

  return (
    <FileInput
      inputId={`file-input-${styleInfo.id}`}
      className={container}
      style={{ ...style }}
      onUpload={() => {
        setSelectedStyle(styleInfo)
        router.push('/result')
      }}
    >
      <div className={thumbnailWrapper}>
        <div
          className={cx(thumbnail, 'thumbnail')}
          style={{ backgroundImage: `url('${styleInfo.src}')` }}
        ></div>
      </div>
      <div className={titleWrapper}>
        <div className={title}>{styleInfo.name}</div>
        <div className={tryButton}>try</div>
      </div>
    </FileInput>
  )
}

const container = css({
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
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  rounded: '14px',
  bgColor: '#3C3C44',
  fontSize: '18px',
  textTransform: 'uppercase',
  color: '#FAFAFA',
  cursor: 'pointer',
  transition: 'all 0.2s',
  _hover: {
    bgColor: '#60606C',
  },
})
