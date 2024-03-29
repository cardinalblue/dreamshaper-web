'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { css, cx } from '@styled-system/css'
import { useUserImageStore } from '@/store'
import { buttonRecipe } from '@/components/Button'
import { FileInput } from '@/components/FileInput'
import { IOSButton } from '@/components/IOSButton'
import { DEFAULT_STYLE } from '@/utils/styleList'
import { StyleModelType } from '@/utils/types'

gsap.registerPlugin(ScrollTrigger) // init ScrollTrigger

export const HeroSection = () => {
  const router = useRouter()
  const { setSelectedStyle } = useUserImageStore()
  const titleRef = useRef<HTMLDivElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)

  const onUpload = (styleInfo: StyleModelType) => {
    setSelectedStyle(styleInfo)
    router.push('/result')
  }

  useEffect(() => {
    // title
    const titleEl = titleRef.current
    gsap.fromTo(titleEl, { y: 100, opacity: 0 }, { y: 0, opacity: 1 })
    // visual
    const isMobileSize = window.innerWidth < 768
    if (!isMobileSize) {
      const visualEl = visualRef.current
      gsap.to(visualEl, {
        x: -50,
        scrollTrigger: {
          trigger: visualEl,
          start: 'top top',
          scrub: true,
        },
      })
    }
  }, [])

  return (
    <div className={container}>
      <div className={titleWrapper}>
        <div className={title} ref={titleRef}>
          <div>Turn Your Photos Into</div>
          <div className={magicalText}>magic</div>
        </div>
        <div className={subtitle}>
          Simply pick the style, upload your photo, and get a creative masterpiece.
        </div>
        <div className={buttonGroup}>
          <FileInput
            className={cx(buttonRecipe({ theme: 'light' }), tryButton)}
            key={DEFAULT_STYLE.id}
            inputId={`file-input-${DEFAULT_STYLE.id}`}
            onUpload={() => onUpload(DEFAULT_STYLE)}
          >
            TRY NOW
          </FileInput>
          <IOSButton imgSrc="/images/hero_ios_button.png" imgWidth={203} imgHeight={54} />
        </div>
      </div>
      <div className={visual} ref={visualRef}></div>
    </div>
  )
}

const container = css({
  position: 'relative',
  h: '645px',
  px: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  md: {
    h: '500px',
    p: '0',
    pl: '72px',
  },
})

const visual = css({
  position: 'absolute',
  top: '25px',
  left: '50%',
  transform: 'translateX(-50%)',
  w: '823px',
  h: '451px',
  bg: 'url(/images/hero_visual_mobile_1.png) no-repeat center / contain',
  flexShrink: 0,
  zIndex: -1,
  // deco image
  _after: {
    content: '""',
    position: 'absolute',
    top: '55%',
    left: '75%',
    w: '132px',
    h: '132px',
    bg: 'url(/images/hero_visual_mobile_2.png) no-repeat center / contain',
    pointerEvents: 'none',
    zIndex: 1,
  },
  md: {
    w: '946px',
    h: '500px',
    top: 'auto',
    left: '500px',
    marginLeft: '-50px',
    transform: 'none',
    bg: 'url(/images/hero_visual.png) no-repeat center / contain',
    _after: {
      display: 'none',
    },
  },
})

const titleWrapper = css({
  w: '100%',
  mt: 'auto',
  mb: '65px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: '#171314',
  md: {
    m: '0',
    alignItems: 'flex-start',
  },
})

const title = css({
  fontSize: '28px',
  fontWeight: '600',
  lineHeight: '1.2',
  letterSpacing: '1.2px',
  whiteSpace: 'nowrap',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  opacity: 0, // for gsap init animation
  md: {
    w: '430px',
    alignItems: 'flex-start',
  },
})

const magicalText = css({
  width: '319px',
  height: '177px',
  ml: '-15px',
  my: '-30px',
  fontSize: '0px',
  bg: 'url(/images/header_magical.png) no-repeat center / contain',
})

const subtitle = css({
  maxW: '360px',
  fontSize: '17px',
  lineHeight: '28px',
  color: '#484851',
  md: {
    mt: '20px',
  },
})

const buttonGroup = css({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  mt: '27px',
  md: {
    mt: '30px',
  },
})

const tryButton = css({
  p: '16px 32px',
})
