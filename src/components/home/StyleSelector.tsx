'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { css, cx } from '@styled-system/css'
import { useUserImageStore } from '@/store'
import { ampClickStyleButton } from '@/utils/eventTracking'
import { STYLE_LIST_HIGHLIGHT, STYLE_LIST_REST } from '@/utils/styleList'
import { StyleModelType } from '@/utils/types'
import { ShowcaseArrowIcon } from '@/components/icons/ShowcaseArrowIcon'
import { StylePreviewCard } from './StylePreviewCard'
import { StylePreviewSection } from './StylePreviewSection'

export const HomepageStyleSelector = () => {
  const { setSelectedStyle } = useUserImageStore()
  const router = useRouter()
  const [coundInOnePage, setCountInOnePage] = useState(3)
  const [currentPage, setCurrentPage] = useState(1) // start with 1
  const [scrollOffset, setScrollOffset] = useState(0)

  const pageRefs = useRef<HTMLElement[]>([])

  const totalPage = useMemo(() => {
    return Math.ceil(STYLE_LIST_REST.length / coundInOnePage)
  }, [coundInOnePage])

  const onPageChange = (page = currentPage) => {
    setCurrentPage(page)
    const pageDom = pageRefs.current[page - 1]
    setScrollOffset(pageDom.offsetLeft)
  }

  const onUpload = (styleInfo: StyleModelType) => {
    setSelectedStyle(styleInfo)
    router.push('/result')
  }

  const onTryButtonClick = (id: string) => {
    ampClickStyleButton(id)
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setCountInOnePage(3)
      } else if (window.innerWidth >= 768) {
        setCountInOnePage(4)
      } else {
        setCountInOnePage(2)
      }
      onPageChange()
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className={container}>
      <div className={promotionWrapper}>
        {STYLE_LIST_HIGHLIGHT.map((styleInfo) => (
          <StylePreviewSection
            key={styleInfo.id}
            styleInfo={styleInfo}
            onUpload={onUpload}
            onClick={onTryButtonClick}
          />
        ))}
      </div>
      <div className={listWrapper}>
        {currentPage !== 1 && (
          <div className={cx(arrowArea, leftArrow)}>
            <div className={arrowButton} onClick={() => onPageChange(currentPage - 1)}>
              <ShowcaseArrowIcon />
            </div>
          </div>
        )}
        <div className={pageWrapper}>
          <div
            className={fullList}
            style={{
              width: `${totalPage * 100}%`,
              transform: `translateX(-${scrollOffset}px)`,
            }}
          >
            {Array.from(Array(totalPage)).map((_, index) => (
              <div
                key={index}
                className={listPage}
                style={{ width: `calc(${100 / totalPage}% - 50px)` }}
                ref={(el: HTMLDivElement) => (pageRefs.current[index] = el)}
              >
                {STYLE_LIST_REST.slice(index * coundInOnePage, (index + 1) * coundInOnePage).map(
                  (styleInfo) => (
                    <StylePreviewCard
                      key={styleInfo.id}
                      styleInfo={styleInfo}
                      onUpload={onUpload}
                      onClick={onTryButtonClick}
                    />
                  )
                )}
              </div>
            ))}
          </div>
        </div>
        {currentPage !== totalPage && (
          <div className={cx(arrowArea, rightArrow)}>
            <div className={arrowButton} onClick={() => onPageChange(currentPage + 1)}>
              <ShowcaseArrowIcon />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const container = css({
  position: 'relative',
  py: '44px 100px',
  px: '32px',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: '44px',
  zIndex: 1,

  // wave bg
  _before: {
    content: '""',
    position: 'absolute',
    bottom: '-42px',
    left: 0,
    right: 0,
    height: '626px',
    bg: 'url(/images/wave_bg.png) no-repeat bottom center / contain',
    pointerEvents: 'none',
    zIndex: -1,
    transform: 'translate3d(0,0,0)', // fix safari bug
  },

  md: {
    px: '72px',
  },
})

const promotionWrapper = css({})

const listWrapper = css({
  position: 'relative',
  mx: '-32px', // make it full width
  md: {
    mx: 'auto',
    ml: '-15px', // offset the padding
  },
})

const pageWrapper = css({
  w: '100%',
  p: '15px',
  pb: '25px',
  overflow: 'hidden',
})

const fullList = css({
  display: 'flex',
  gap: '32px',
  transition: 'all 0.5s',
})

const listPage = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(1, minmax(0, 100%))',
  gridAutoRows: '1fr',
  flexWrap: 'wrap',
  gap: '32px',
  md: {
    gridTemplateColumns: 'repeat(2, minmax(0, 100%))',
  },
  lg: {
    gridTemplateColumns: 'repeat(3, minmax(0, 340px))',
  },
})

const arrowArea = css({
  position: 'absolute',
  top: '0',
  height: '100%',
  zIndex: 1,

  display: 'flex',
  alignItems: 'center',
  '& svg': {
    cursor: 'pointer',
  },
})

const arrowButton = css({
  w: '54px',
  h: '54px',
  rounded: '50%',
  color: '#F0ECE3',
  bgColor: '#303036',
  border: '3px solid',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const leftArrow = css({
  left: 0,
  transform: 'translateX(10%)',
  '& svg': {
    transform: 'rotate(180deg)',
  },
  md: {
    transform: 'translateX(-50%)',
  },
})

const rightArrow = css({
  right: 0,
  transform: 'translateX(-10%)',
  md: {
    transform: 'translateX(50%)',
  },
  lg: {
    bgImage: 'linear-gradient(to left, #faf6ec 40%, #0000)',
  },
})
