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
            <div className={title}>Try our New App</div>
            <div className={appName}>SnapJoy</div>
            <div className={desc}>Snap, edit, and joy - SnapJoy for free. Get it today!</div>
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
  fontSize: '24px',
  fontWeight: '700',
})

const appName = css({
  mt: '-10px',
  fontSize: '54px',
  fontFamily: 'Delicious Sans',
})

const desc = css({
  maxW: '300px',
  mt: '17px',
  fontSize: '17px',
  lineHeight: '28px',
})

const appButton = css({
  display: 'inline-block',
  mt: '38px',
})
