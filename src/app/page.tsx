'use client'

import { css } from '@styled-system/css'
import { STYLE_LIST } from '@/utils/constants'
import { useEffect, useState } from 'react'
import { StylePreviewCard } from '@/components/StylePreviewCard'
import { TitleDecoIcon } from '@/components/icons/TitleDecoIcon'

const LIST_GAP = 32

export default function Home() {
  const [columnCount, setColumnCount] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setColumnCount(1)
      } else if (window.innerWidth < 1200) {
        setColumnCount(2)
      } else {
        setColumnCount(3)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className={container}>
      <div className={navbar}>
        <div className={logo}></div>
      </div>
      <div className={main}>
        <div className={titleWrapper}>
          <div className={title}>
            <div className={titleFirstLine}>
              Style <TitleDecoIcon />
            </div>
            Transfer
          </div>
          <div className={subtitle}>
            Turn your image into something magical with ease.
            <br />
            Just choose the style, upload your photo, and there you go.
          </div>
        </div>
        <div className={visual}></div>
      </div>
      <div className={listWrapper}>
        {STYLE_LIST.map((styleInfo) => (
          <StylePreviewCard
            key={styleInfo.id}
            styleInfo={styleInfo}
            style={{ width: `calc((100% - ${(columnCount - 1) * LIST_GAP}px) / ${columnCount})` }}
          />
        ))}
      </div>
    </div>
  )
}

const container = css({
  maxW: '1280px',
  p: '16px 24px 32px',
  m: '0 auto',
  overflow: 'hidden',
  md: {
    p: '16px 72px 32px',
  },
})

const navbar = css({
  h: '54px',
  m: '0 auto',
  p: '0 44px',
  bgColor: '#F5F4EF',
  boxShadow: '0px 10px 25px 0px rgba(52, 52, 52, 0.10)',
  rounded: '12px',
  display: 'flex',
  alignItems: 'center',
})

const logo = css({
  w: '270px',
  h: '44px',
  bg: '#CFCBB7',
  rounded: '10px',
})

const main = css({
  h: '550px',
  m: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

const visual = css({
  display: 'none',
  w: '640px',
  h: '500px',
  bg: 'url(/images/hero_visual.png) no-repeat center / contain',
  flexShrink: 0,
  md: {
    display: 'block',
  },
})

const titleWrapper = css({
  color: '#484851',
  md: {
    w: '457px',
  },
})

const title = css({
  fontSize: '80px',
  fontFamily: 'Recoleta',
  fontWeight: '500',
  textTransform: 'uppercase',
  lineHeight: '100px',
  letterSpacing: '2px',
})

const titleFirstLine = css({
  mb: '-15px',
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
})

const subtitle = css({
  fontSize: '18px',
  lineHeight: '28px',
})

const listWrapper = css({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: `${LIST_GAP}px`,
})
