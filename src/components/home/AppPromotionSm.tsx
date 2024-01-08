'use client'

import { css } from '@styled-system/css'
import { IOS_APP_LINK } from '@/utils/constants'
import { IOSButton } from '@/components/IOSButton'

export const AppPromotionSm = () => {
  return (
    <div className={container}>
      <a href={IOS_APP_LINK} target="_blank" rel="noopener">
        <div className={appBanner}>
          <div className={content}>
            <div className={title}>Get the full app experience!</div>
            <div className={appName}>SnapJoy</div>
            <div className={desc}>Download SnapJoy for free for editing on the go!</div>
            <IOSButton
              imgSrc="/images/hero_ios_button.png"
              imgWidth={188}
              imgHeight={50}
              className={appButton}
              withoutLink
            />
          </div>
        </div>
      </a>
    </div>
  )
}

const container = css({
  maxW: '1280px',
  h: '350px',
  px: '24px',
  mx: 'auto',
  my: '40px',
  md: {
    px: '72px',
  },
})

const appBanner = css({
  position: 'relative',
  h: '100%',
  bg: 'url(/images/app_bg_sm.png) no-repeat left center / cover',
  rounded: '20px',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const content = css({
  maxW: '80%',
  color: '#4D3E2C',
  lineHeight: '1.2',
  md: {
    position: 'absolute',
    top: '58px',
    left: '72px',
    maxW: 'none',
  },
})

const title = css({
  fontSize: '28px',
  fontWeight: '600',
})

const appName = css({
  mt: '-10px',
  fontSize: '60px',
  fontFamily: 'Delicious Sans',
})

const desc = css({
  maxW: '292px',
  mt: '10px',
  fontSize: '20px',
  color: '#484851',
})

const appButton = css({
  display: 'inline-block',
  mt: '38px',
})
