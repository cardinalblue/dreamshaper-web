'use client'

import Image from 'next/image'
import { css, cx } from '@styled-system/css'
import { buttonRecipe } from '@/components/Button'
import { FooterTextStar } from '@/components/icons/FooterTextStar'
import { FooterTextUnderline } from '@/components/icons/FooterTextUnderline'
import { FooterStartedButtonIcon } from '@/components/icons/FooterStartedButtonIcon'
import { IOS_APP_LINK } from '@/utils/constants'

export const Footer = () => {
  return (
    <div className={container}>
      <div className={inner}>
        <div className={logo}></div>

        <div className={content}>
          <div className={introWrapper}>
            <div className={intro}>
              <div>Snap your moment</div>
              <div>
                and{' '}
                <span className={highlightText}>
                  turn magic
                  <div className={underlineIconWrapper}>
                    <FooterTextUnderline />
                  </div>
                </span>{' '}
                on
              </div>
              <div className={starIconWrapper}>
                <FooterTextStar />
              </div>
            </div>
            <div className={cx(buttonRecipe({ theme: 'light' }), startButton)}>
              <FooterStartedButtonIcon />
              Get Started
            </div>
          </div>

          <div className={linkWrapper}>
            <div className={linkTitle}>Get Out App</div>
            <a href={IOS_APP_LINK} target="_blank">
              <Image
                src="/images/ios_app_button.png"
                width={120}
                height={40}
                alt="snapjoy_app"
                unoptimized
              />
            </a>
          </div>
        </div>
        <div className={divider}></div>
        <div className={copyright}>@2023 Photostyle.ai</div>
      </div>
    </div>
  )
}

const container = css({
  color: '#FAFAFA',
  bgColor: '#242429',
})

const inner = css({
  maxW: '1280px',
  m: '0 auto',
  p: '68px 72px 66px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  md: {
    alignItems: 'stretch',
  },
})

const logo = css({
  w: '220px',
  h: '32px',
  mb: '58px',
  bg: 'url(/images/logo_light.png) no-repeat center / contain',
})

const content = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '80px',
  md: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: '24px',
  },
})

const introWrapper = css({
  h: '170px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  md: {
    alignItems: 'flex-start',
  },
})

const intro = css({
  position: 'relative',
  fontSize: '28px',
  fontWeight: '600',
  lineHeight: '1.2',
})

const highlightText = css({
  position: 'relative',
  zIndex: 1,
})

const underlineIconWrapper = css({
  position: 'absolute',
  bottom: '-5px',
  left: '0',
  zIndex: -1,
})

const starIconWrapper = css({
  position: 'absolute',
  right: '-35px',
  bottom: '0',
})

const linkWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  alignItems: 'center',
  md: {
    alignItems: 'flex-start',
  },
})

const linkTitle = css({
  color: '#DEA84D',
  lineHeight: '1.2',
  fontWeight: '600',
})

const startButton = css({
  p: '12px 44px',
  bgColor: '#D29D44',
  gap: '12px',
})

const divider = css({
  w: '100%',
  h: '1px',
  mt: '80px',
  mb: '32px',
  bgColor: '#FFFFFF',
  opacity: 0.1,
  md: {
    mt: '55px',
  },
})

const copyright = css({
  textAlign: 'center',
  lineHeight: '1.2',
})
