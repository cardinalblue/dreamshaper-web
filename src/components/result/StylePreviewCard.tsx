'use client'

import React, { useEffect } from 'react'
import { css, cx, cva } from '@styled-system/css'
import { StyleModelType } from '@/utils/types'

interface StylePreviewCardProps {
  styleInfo: StyleModelType
  disabled?: boolean
  active?: boolean
  onClick: () => void
}

export const StylePreviewCard = ({
  styleInfo,
  disabled,
  active,
  onClick,
}: StylePreviewCardProps) => {
  const cardRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.innerWidth >= 768 && active) {
      cardRef.current?.scrollIntoView({ block: 'center', inline: 'center' })
    }
  }, [active])

  return (
    <div
      ref={cardRef}
      className={container({ active })}
      data-disabled={disabled ? 'true' : null}
      onClick={() => {
        if (disabled) {
          return
        }
        onClick()
        // scroll to top on mobile
        if (window.innerWidth < 768) {
          window.scrollTo(0, 0)
        }
      }}
    >
      <div className={thumbnailWrapper}>
        <div
          className={cx(thumbnail, 'thumbnail')}
          style={{ backgroundImage: `url('${styleInfo.src}')` }}
        ></div>
      </div>
      <div className={title}>{styleInfo.name}</div>
    </div>
  )
}

const container = cva({
  base: {
    w: '166px',
    h: '186px',
    p: '8px',
    flexShrink: 0,
    position: 'relative',
    rounded: '15px',
    bg: '#FBFBF9',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    cursor: 'pointer',

    '&:not([data-disabled]):hover': {
      '& .thumbnail': {
        transform: 'scale(1.03)',
      },
      '&:before': {
        opacity: 1,
        transform: 'translate(-50%, -50%) scale(1)',
      },
    },
    _disabled: {
      cursor: 'not-allowed',
    },
    // frame
    _before: {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%) scale(1.02)',
      w: 'calc(100% + 8px)',
      h: 'calc(100% + 8px)',
      rounded: '18px',
      border: '2px solid #484851',
      opacity: 0,
      transition: 'all 0.2s',
      pointerEvents: 'none',
      willChange: 'opacity, transform',
    },
  },
  variants: {
    active: {
      true: {
        _before: {
          opacity: 1,
          transform: 'translate(-50%, -50%) scale(1)',
        },
      },
    },
  },
})

const thumbnailWrapper = css({
  h: '140px',
  rounded: '8px',
  overflow: 'hidden',
})

const thumbnail = css({
  w: '100%',
  h: '100%',
  bg: 'no-repeat center / cover',
  transition: 'all 0.3s',
  willChange: 'transform',
})

const title = css({
  p: '0 9px',
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: 'normal',
  color: '#484851',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})
