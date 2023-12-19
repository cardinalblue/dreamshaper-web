'use client'

import { css } from '@styled-system/css'
import { useEffect } from 'react'
import { HomepageStyleSelector } from '@/components/home/StyleSelector'
import { TitleDecoIcon } from '@/components/icons/TitleDecoIcon'
import { ampEnterStyleListPage } from '@/utils/eventTracking'

export default function Home() {
  useEffect(() => {
    ampEnterStyleListPage()
  }, [])

  return (
    <div className={container}>
      <div className={navbar}>
        <div className={logo}></div>
      </div>
      <div className={main}>
        <div className={titleWrapper}>
          <div className={title}>
            <div>Turn your image</div>
            <div>
              into magical <TitleDecoIcon />
            </div>
          </div>
          <div className={subtitle}>
            Just choose the style, upload your photo, and there you go.
          </div>
        </div>
        <div className={visual}></div>
      </div>
      <HomepageStyleSelector />
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
  h: '360px',
  m: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  md: {
    h: '550px',
  },
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
  w: '100%',
  color: '#484851',
})

const title = css({
  fontSize: '42px',
  fontFamily: 'Recoleta',
  fontWeight: '500',
  textTransform: 'capitalize',
  lineHeight: '100px',
  letterSpacing: '-1px',
  whiteSpace: 'nowrap',
  md: {
    w: '516px',
    fontSize: '72px',
  },
  '& > div:first-child': {
    mb: '-30px',
  },
  '& > div:last-child': {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
})

const subtitle = css({
  fontSize: '20px',
  lineHeight: '28px',
  md: {
    w: '390px',
  },
})
