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
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const imageRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const containerEl = imageContainerRef.current
    const imgEls = imageRefs.current

    const getScrollConfig = (
      fromY: number,
      toY: number
    ): [
      { y: number },
      { y: number; scrollTrigger?: { trigger: HTMLDivElement; scrub: boolean } }
    ] => {
      return [
        {
          y: fromY,
        },
        {
          y: toY,
          scrollTrigger: {
            trigger: containerEl!,
            scrub: true,
          },
        },
      ]
    }

    gsap.fromTo(imgEls[0], ...getScrollConfig(200, 30))
    gsap.fromTo(imgEls[1], ...getScrollConfig(-200, -30))
    gsap.fromTo(imgEls[2], ...getScrollConfig(20, -160))
  }, [])

  return (
    <div className={container}>
      <div className={promoImgGroup} ref={imageContainerRef}>
        {Array.from(Array(3)).map((_, i) => (
          <div className={promoImgWrapper} key={i}>
            <div
              ref={(el: HTMLDivElement) => (imageRefs.current[i] = el)}
              className={promoImg}
              style={{
                backgroundImage: `url(/images/effects/${styleInfo?.promotion?.srcPrefix}-${
                  i + 1
                }.png)`,
              }}
            ></div>
          </div>
        ))}
      </div>
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
          TRY NOW
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

const promoImgGroup = css({
  h: '410px',
  rounded: '20px',
  overflow: 'hidden',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '40px',
  md: {
    w: '617px',
    maxW: '60%',
    order: 1,
  },
})

const promoImgWrapper = css({
  w: '265px',
  h: '800px',
  flexShrink: 0,
  transform: 'rotate(15deg)',
})

const promoImg = css({
  w: '100%',
  h: '100%',
  bg: 'no-repeat center / contain',
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
  fontSize: '17px',
  lineHeight: '28px',
  color: '#60606C',
  md: {
    maxW: '467px',
  },
})

const tryButton = css({
  p: '16px 32px',
  mt: '16px',
  flexShrink: 0,
})
