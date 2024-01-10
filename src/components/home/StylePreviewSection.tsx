'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
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
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const imgEl = imageRef.current
    gsap.fromTo(
      imgEl,
      {
        y: 100,
      },
      {
        y: -50,
        scrollTrigger: {
          trigger: imgEl,
          scrub: true,
        },
      }
    )
  }, [])

  return (
    <div className={container}>
      <div
        className={cx(thumbnail, 'thumbnail')}
        style={{ backgroundImage: `url('${styleInfo?.promotion?.src}')` }}
        ref={imageRef}
      ></div>
      <div className={titleWrapper}>
        <div className={title}>{styleInfo?.promotion?.title}</div>
        <div className={desc}>{styleInfo?.promotion?.description}</div>
        <FileInput
          className={cx(buttonRecipe({ theme: 'dark' }), tryButton)}
          key={styleInfo.id}
          inputId={`file-input-${styleInfo.id}`}
          onUpload={() => onUpload(styleInfo)}
          onClick={() => onClick(styleInfo.id)}
        >
          TRY THIS STYLE
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
    minH: '442px',
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
  fontWeight: '600',
  lineHeight: '1.2',
  color: '#484851',
  md: {
    maxW: '427px',
  },
})

const desc = css({
  fontSize: '18px',
  lineHeight: '24px',
  color: '#60606C',
  md: {
    maxW: '467px',
  },
})

const tryButton = css({
  w: '184px',
  h: '54px',
  mt: '16px',
  flexShrink: 0,
})
