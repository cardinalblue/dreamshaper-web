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
          <div className={title}>PIC MAGIC</div>
          <div className={subtitle}>
            Turn your photos from ordinary to extraordinary with our platform{"'"}s limitless
            creative options.
            <br />
            Easily experiment with various styles in just a few clicks.
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
  p: '32px',
})

const navbar = css({
  maxW: '1136px',
  h: '54px',
  m: '0 auto',
  p: '0 44px',
  bg: 'rgba(239, 236, 224, 0.70)',
  boxShadow: '0px 10px 25px 0px rgba(7, 23, 35, 0.15)',
  backdropFilter: 'blur(2.5px)',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
})

const logo = css({
  w: '216px',
  h: '44px',
  bg: '#9CA991',
  borderRadius: '10px',
})

const main = css({
  maxW: '1136px',
  h: '550px',
  m: '0 auto',
  display: 'flex',
  alignItems: 'center',
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
})

const subtitle = css({
  lineHeight: '28px',
})

const listWrapper = css({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '32px',
})
