'use client'

import Image from 'next/image'
import { css, cx } from '@styled-system/css'
import { IOS_APP_LINK } from '@/utils/constants'

export const AppPromotionLg = () => {
  return (
    <div className={container}>
      <div className={cx(decoImg, decoImgLeft)}></div>
      <div className={content}>
        <div className={appIcon}></div>
        <div className={title}>Get the full app experience!</div>
        <div className={appName}>SnapJoy</div>
        <div className={desc}>Just snap your moment, select styles and there you go!</div>
        <a href={IOS_APP_LINK} target="_blank" rel="noopener" className={appButton}>
          <Image
            src="/images/hero_ios_button.png"
            width={188}
            height={50}
            alt="snapjoy_app"
            unoptimized
          />
        </a>
      </div>
      <div className={cx(decoImg, decoImgRight)}></div>
    </div>
  )
}

const container = css({
  position: 'relative',
  h: '620px',
  bg: 'url(/images/app_bg_lg.png) no-repeat left center / cover',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  overflow: 'hidden',
})

const content = css({
  flexShrink: 0,
  ml: '52px',
  mr: '30px',
  color: '#4D3E2C',
  lineHeight: '1.2',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
})

const appIcon = css({
  w: '100px',
  h: '100px',
  mb: '40px',
  bg: 'url(/images/snapjoy_app_icon.png) no-repeat center / contain',
  rounded: '20px',
  boxShadow: '5px 10px 10px 0px rgba(52, 52, 52, 0.25)',
})

const title = css({
  fontSize: '28px',
  fontWeight: '600',
})

const appName = css({
  mt: '-15px',
  fontSize: '80px',
  fontFamily: 'Delicious Sans',
})

const desc = css({
  maxW: '292px',
  my: '30px',
  fontSize: '20px',
  color: '#484851',
})

const appButton = css({
  display: 'inline-block',
  mt: '40px',
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