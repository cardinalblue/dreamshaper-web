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
  w: '679px',
  h: '333px',
  bg: 'url(/images/hero_visual_mobile_1.png) no-repeat center / contain',
  flexShrink: 0,
  zIndex: -1,
  // mask
  _before: {
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: 0,
    w: '100%',
    h: '60%',
    bgImage: 'linear-gradient(to top, #faf6ec 20%, transparent)',
    pointerEvents: 'none',
  },
  // deco image
  _after: {
    content: '""',
    position: 'absolute',
    bottom: '-30px',
    right: 0,
    w: '161px',
    h: '161px',
    bg: 'url(/images/hero_visual_mobile_2.png) no-repeat center / contain',
    pointerEvents: 'none',
  },
  md: {
    w: '1009px',
    h: '500px',
    top: 'auto',
    left: '500px',
    marginLeft: '-50px',
    transform: 'none',
    bg: 'url(/images/hero_visual.png) no-repeat center / contain',
    _before: {
      w: '30%',
      h: '100%',
      bgImage: 'linear-gradient(to right, #faf6ec 30%, transparent)',
    },
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
  textTransform: 'capitalize',
  lineHeight: '104%',
  letterSpacing: '1.2px',
  whiteSpace: 'nowrap',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  md: {
    w: '430px',
    alignItems: 'flex-start',
    fontSize: '40px',
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
  maxW: '292px',
  mt: '12px',
  fontSize: '20px',
  lineHeight: '28px',
  color: '#484851',
  md: {
    mt: '20px',
  },
})

const tryButton = css({
  w: '148px',
  h: '50px',
  mt: '27px',
  md: {
    mt: '30px',
  },
})
