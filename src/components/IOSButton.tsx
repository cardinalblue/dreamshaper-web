'use client'

import Image from 'next/image'
import { css, cx } from '@styled-system/css'
import { IOS_APP_LINK } from '@/utils/constants'

interface IOSButtonProps {
  imgSrc: string
  imgWidth: number
  imgHeight: number
  className?: string
  withoutLink?: boolean
}

export const IOSButton = ({
  imgSrc,
  imgWidth,
  imgHeight,
  className,
  withoutLink = false,
}: IOSButtonProps) => {
  const AppImage = () => (
    <Image src={imgSrc} width={imgWidth} height={imgHeight} alt="snapjoy_app" unoptimized />
  )

  if (withoutLink) {
    return (
      <span className={cx(iosButton, className)}>
        <AppImage />
      </span>
    )
  }

  return (
    <a href={IOS_APP_LINK} target="_blank" rel="noopener" className={cx(iosButton, className)}>
      <AppImage />
    </a>
  )
}

const iosButton = css({
  position: 'relative',
  overflow: 'hidden',
  _hover: {
    _before: {
      animation: 'buttonShiny 0.5s linear',
    },
  },
  _before: {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    w: '100%',
    h: '100%',
    bg: 'linear-gradient(135deg, #0000 40%, #fff 50%, #0000 55%) no-repeat 0 0 / 300% 200%',
    opacity: 0.6,
  },
})
