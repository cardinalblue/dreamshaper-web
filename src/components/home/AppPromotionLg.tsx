'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { css, cx } from '@styled-system/css'
import { IOSButton } from '@/components/IOSButton'

export const AppPromotionLg = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const deco1Ref = useRef<HTMLDivElement>(null)
  const deco2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const containerEl = containerRef.current
    const deco1El = deco1Ref.current
    const deco2El = deco2Ref.current
    gsap.from(deco1El, {
      y: 200,
      scrollTrigger: {
        trigger: containerEl,
        scrub: true,
        end: 'center center',
      },
    })
    gsap.from(deco2El, {
      y: -200,
      scrollTrigger: {
        trigger: containerEl,
        scrub: true,
        end: 'center center',
      },
    })
  }, [])

  return (
    <div className={container} ref={containerRef}>
      <div className={cx(decoImg, decoImgLeft)} ref={deco1Ref}></div>
      <div className={content}>
        <div className={appIcon}></div>
        <div className={title}>Try our New App</div>
        <div className={appName}>SnapJoy</div>
        <div className={desc}>
          Just take a snapshot, and transform
          <br />
          your day into a magical story or moment
        </div>
        <IOSButton
          imgSrc="/images/hero_ios_button.png"
          imgWidth={188}
          imgHeight={50}
          className={appButton}
        />
      </div>
      <div className={cx(decoImg, decoImgRight)} ref={deco2Ref}></div>
    </div>
  )
}

const container = css({
  position: 'relative',
  h: '500px',
  bg: 'url(/images/app_bg_lg.png) no-repeat left center / cover',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  overflow: 'hidden',
})

const content = css({
  flexShrink: 0,
  mx: '36px',
  color: '#4D3E2C',
  lineHeight: '1.2',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',

  md: {
    ml: '52px',
    mr: '30px',
  },
})

const appIcon = css({
  w: '100px',
  h: '100px',
  mb: '32px',
  bg: 'url(/images/snapjoy_app_icon.png) no-repeat center / contain',
  rounded: '20px',
  boxShadow: '5px 10px 10px 0px rgba(52, 52, 52, 0.25)',
})

const title = css({
  fontSize: '24px',
  fontWeight: '700',
})

const appName = css({
  mt: '-12px',
  fontSize: '64px',
  fontFamily: 'Delicious Sans',
})

const desc = css({
  maxW: '333px',
  mt: '32px',
  fontSize: '17px',
  lineHeight: '28px',
})

const appButton = css({
  display: 'inline-block',
  mt: '44px',
})

const decoImg = css({
  w: '500px',
  h: '620px',
  flexShrink: 0,
})

const decoImgLeft = css({
  bg: 'url(/images/app_demo_1.png) no-repeat center / contain',
})

const decoImgRight = css({
  bg: 'url(/images/app_demo_2.png) no-repeat center / contain',
})
