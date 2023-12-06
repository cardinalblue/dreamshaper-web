'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { css } from '@styled-system/css'
import { useUserImageStore, useResultImageStore } from '@/store'
import { ResultControls } from '@/components/result/Controls'
import { ResultImage } from '@/components/result/Image'
import { StyleSelector } from '@/components/result/StyleSelector'
import { ampEnterTransferResultPage } from '@/utils/eventTracking'

export default function Result() {
  const { selectedStyle, uploadedFile, originalImageSrc, setSelectedStyle, resetUserImageStates } =
    useUserImageStore()

  const {
    resultImageSrc,
    isResultFailed,
    resetResultImageStates,
    getImageData,
    handleStyleTransfer,
  } = useResultImageStore()

  const abortController = useRef<AbortController | null>(null)
  const isLeaveWithoutResult = useRef(false)

  const router = useRouter()

  const applyStyleTransfer = ({ image = originalImageSrc, style = selectedStyle }) => {
    if (!image || !style) return
    if (style) setSelectedStyle(style)
    abortController.current = new AbortController()
    handleStyleTransfer(image, style, abortController.current.signal)
  }

  const initProcessImage = async () => {
    if (resultImageSrc) return // show result directly
    // process pending image
    const image = await getImageData(uploadedFile!)
    if (image) applyStyleTransfer({ image })
  }

  useEffect(() => {
    if (uploadedFile && selectedStyle) {
      initProcessImage()
      ampEnterTransferResultPage(selectedStyle.id)
    }
  }, [uploadedFile, selectedStyle])

  useEffect(() => {
    isLeaveWithoutResult.current = !resultImageSrc
  }, [resultImageSrc])

  useEffect(() => {
    // no uploaded file, go back to homepage
    if (!uploadedFile) {
      router.push('/')
      return
    }

    return () => {
      abortController.current?.abort()
      // clear all data if no result, don't let user go back to the error state
      if (isLeaveWithoutResult.current) {
        resetUserImageStates()
        resetResultImageStates()
      }
    }
  }, [])

  if (!uploadedFile) return null

  return (
    <div className={container}>
      <div className={card}>
        <StyleSelector onApply={(style) => applyStyleTransfer({ style })} />
        <div className={resultSection}>
          <div className={styleName}>{selectedStyle?.name}</div>
          <ResultControls />
          <div className={resultImageWrapper}>
            {isResultFailed ? (
              <div className={errorText}>
                Image processing failed. Please try a different image.
              </div>
            ) : (
              <ResultImage />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const container = css({
  minH: '100vh',
  p: '32px 24px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  md: {
    p: '32px 72px',
  },
})

const card = css({
  minH: '471px',
  bgColor: '#F5F4EF',
  boxShadow: '5px 10px 20px 0px rgba(52, 52, 52, 0.15)',
  rounded: '25px',
  display: 'flex',
  // flexDirection: 'column-reverse',
  overflow: 'hidden',
  md: {
    w: '648px',
    h: '656px',
    // flexDirection: 'row',
  },
})

const resultSection = css({
  p: '24px 24px',
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',
})

const styleName = css({
  fontSize: '32px',
  fontWeight: 'bold',
  lineHeight: 'normal',
  color: '#484851',
})

const resultImageWrapper = css({
  w: '100%',
  flexGrow: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
})

const errorText = css({
  fontSize: '18px',
  fontWeight: '600',
  textAlign: 'center',
})
