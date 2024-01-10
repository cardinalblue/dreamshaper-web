'use client'

import { useRef } from 'react'
import { STYLE_LIST_HIGHLIGHT, STYLE_LIST_REST } from '@/utils/styleList'
import { StylePreviewCard } from './StylePreviewCard'
import { css, cva } from '@styled-system/css'
import { useResultImageStore, useUserImageStore } from '@/store'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

export const StyleSelector = () => {
  const {
    computed: { isImageLoading },
  } = useResultImageStore()
  const { selectedStyle, setSelectedStyle } = useUserImageStore()

  // handling scroll shadow
  const listStartRef = useRef<HTMLDivElement>(null)
  const listEndRef = useRef<HTMLDivElement>(null)
  const isListStartIntersecting = useIntersectionObserver({ ref: listStartRef })
  const isListEndIntersecting = useIntersectionObserver({ ref: listEndRef })

  return (
    <div
      className={container({
        scrollHintStart: !isListStartIntersecting,
        scrollHintEnd: !isListEndIntersecting,
      })}
    >
      <div className={listWrapper}>
        <div data-list-start ref={listStartRef}></div>
        <div className={listInner}>
          {[...STYLE_LIST_HIGHLIGHT, ...STYLE_LIST_REST].map((styleInfo) => (
            <StylePreviewCard
              key={styleInfo.id}
              styleInfo={styleInfo}
              disabled={isImageLoading}
              active={selectedStyle?.id === styleInfo.id}
              onClick={() => setSelectedStyle(styleInfo)}
            />
          ))}
        </div>
        <div data-list-end ref={listEndRef}></div>
      </div>
    </div>
  )
}

const scrollHintStyle = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  w: 30,
  zIndex: 1,
  pointerEvents: 'none',
  transition: 'all 0.2s',
  opacity: 0,
  willChange: 'opacity',
}

const scrollHintMdStyle = {
  top: 'auto',
  bottom: 'auto',
  w: 'auto',

  left: 0,
  right: 0,
  h: 30,
}

const container = cva({
  base: {
    flexShrink: 0,
    position: 'relative',
    overflow: 'hidden',
    // start shadow
    _before: {
      content: '""',
      ...scrollHintStyle,
      left: 0,
      bgImage: 'linear-gradient(90deg, #E8E4D7, #fff0)',
      md: {
        ...scrollHintMdStyle,
        top: 0,
        bgImage: 'linear-gradient(#E8E4D7, #fff0)',
      },
    },
    // end shadow
    _after: {
      content: '""',
      ...scrollHintStyle,
      right: 0,
      bgImage: 'linear-gradient(270deg, #E8E4D7, #fff0)',
      md: {
        ...scrollHintMdStyle,
        bottom: 0,
        bgImage: 'linear-gradient(0deg, #E8E4D7, #fff0)',
      },
    },
  },
  variants: {
    scrollHintStart: {
      true: {
        _before: {
          opacity: 1,
        },
      },
    },
    scrollHintEnd: {
      true: {
        _after: {
          opacity: 1,
        },
      },
    },
  },
})

const listWrapper = css({
  p: '4px 4px 16px 4px',
  display: 'flex',
  overflowX: 'auto',
  overflowY: 'hidden',
  scrollBehavior: 'smooth',
  md: {
    h: '100%',
    p: '4px 16px 4px 4px',
    overflowX: 'hidden',
    overflowY: 'auto',
    flexDirection: 'column',
  },
})

const listInner = css({
  display: 'flex',
  gap: '16px',
  md: {
    flexDirection: 'column',
  },
})
