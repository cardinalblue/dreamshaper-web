'use client'

import { useRouter } from 'next/navigation'
import { css, cx } from '@styled-system/css'
import { useUserImageStore } from '@/store'
import { buttonRecipe } from '@/components/Button'
import { FooterTextStar } from '@/components/icons/FooterTextStar'
import { FooterTextUnderline } from '@/components/icons/FooterTextUnderline'
import { FooterStartedButtonIcon } from '@/components/icons/FooterStartedButtonIcon'
import { FileInput } from '@/components/FileInput'
import { IOSButton } from '@/components/IOSButton'
import { DEFAULT_STYLE } from '@/utils/styleList'
import { StyleModelType } from '@/utils/types'

export const Footer = () => {
  const router = useRouter()
  const { setSelectedStyle } = useUserImageStore()

  const onUpload = (styleInfo: StyleModelType) => {
    setSelectedStyle(styleInfo)
    router.push('/result')
  }

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
                  magic
                  <div className={underlineIconWrapper}>
                    <FooterTextUnderline />
                  </div>
                </span>{' '}
                starts now
              </div>
              <div className={starIconWrapper}>
                <FooterTextStar />
              </div>
            </div>
            <FileInput
              className={cx(buttonRecipe({ theme: 'light' }), startButton)}
              key={DEFAULT_STYLE.id}
              inputId={`file-input-${DEFAULT_STYLE.id}`}
              onUpload={() => onUpload(DEFAULT_STYLE)}
            >
              <FooterStartedButtonIcon />
              Get Started
            </FileInput>
          </div>

          <div className={linkWrapper}>
            <div className={linkTitle}>Get Out App</div>
            <IOSButton imgSrc="/images/footer_ios_button.png" imgWidth={112} imgHeight={33} />
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
  p: '60px 30px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  md: {
    alignItems: 'stretch',
    p: '68px 72px 66px',
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
  bottom: '-6px',
  left: '-30px',
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
