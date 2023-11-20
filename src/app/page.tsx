'use client'

import { css } from '@styled-system/css'
import { StylePreviewSection } from '@/components/StylePreviewSection'
import { STYLE_LIST } from '@/utils/constants'
import { useEffect, useState } from 'react'

export default function Home() {
  const [columnCount, setColumnCount] = useState(3)

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
          <div className={title}>Style Transfer</div>
          <div className={subtitle}>
            Turn your image into something magical with ease.
            <br />
            Just choose the style, upload your photo, and there you go.
          </div>
        </div>
        <div className={visual}></div>
      </div>
      <div className={listWrapper}>
        {STYLE_LIST.map((style) => (
          <StylePreviewSection key={style.id} styleInfo={style} columnCount={columnCount} />
        ))}
      </div>
    </div>
  )
}

const container = css({
  maxW: '1280px',
  p: '16px 72px 32px',
  m: '0 auto',
})

const navbar = css({
  h: '54px',
  m: '0 auto',
  p: '0 44px',
  bgColor: '#F3F0E8',
  boxShadow: '0px 10px 25px 0px rgba(7, 23, 35, 0.10)',
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
  w: '640px',
  h: '500px',
  bg: 'url(/images/hero_visual.png) no-repeat center / contain',
})

const titleWrapper = css({
  w: '457px',
  color: '#484851',
})

const title = css({
  fontSize: '80px',
  fontWeight: '500',
  lineHeight: '100px',
  letterSpacing: '2px',
})

const subtitle = css({
  fontSize: '18px',
  lineHeight: '28px',
})

const listWrapper = css({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '32px',
})
