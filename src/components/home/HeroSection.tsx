'use client'

import { css } from '@styled-system/css'
import { Button } from '@/components/Button'

export const HeroSection = () => {
  return (
    <div className={container}>
      <div className={titleWrapper}>
        <div className={title}>
          <div>Turn your image into</div>
          <div className={magicalText}>magical</div>
        </div>
        <div className={subtitle}>Just choose the style, upload your photo, and there you go.</div>
        <Button theme="highlight" className={tryButton}>
          TRY NOW
        </Button>
      </div>
      <div className={visual}></div>
    </div>
  )
}

const container = css({
  h: '360px',
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
  display: 'none',
  w: '1009px',
  h: '500px',
  marginLeft: '-50px',
  bg: 'url(/images/hero_visual.png) no-repeat center / contain',
  flexShrink: 0,
  maskImage: 'linear-gradient(to right, transparent 7%, black 27%)',
  md: {
    display: 'block',
  },
})

const titleWrapper = css({
  w: '100%',
  color: '#171314',
})

const title = css({
  fontSize: '40px',
  fontWeight: '600',
  textTransform: 'capitalize',
  lineHeight: '104%',
  letterSpacing: '1.2px',
  whiteSpace: 'nowrap',
  md: {
    w: '430px',
  },
})

const magicalText = css({
  width: '329px',
  height: '88px',
  ml: '-29px',
  fontSize: '0px',
  bg: 'url(/images/header_magical.png) no-repeat center / contain',
})

const subtitle = css({
  mt: '20px',
  fontSize: '20px',
  lineHeight: '28px',
  color: '#484851',
  md: {
    w: '292px',
  },
})

const tryButton = css({
  w: '148px',
  h: '50px',
  mt: '30px',
})
