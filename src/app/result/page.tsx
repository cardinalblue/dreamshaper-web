'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { css } from '@styled-system/css'
import { useUserImageStore, useResultImageStore } from '@/store'
import { ampEnterTransferResultPage } from '@/utils/eventTracking'
import { ResultControls } from '@/components/result/Controls'
import { ResultImage } from '@/components/result/Image'
import { StyleSelector } from '@/components/result/StyleSelector'
import { TryAgainSection } from '@/components/result/TryAgainSection'
import { PromptPanel } from '@/components/result/PromptPanel'

export default function Result() {
  const { selectedStyle, uploadedFile, originalImageSrc, resetUserImageStates } =
    useUserImageStore()
  const {
    isResultFailed,
    resetResultImageStates,
    getImageData,
    handleStyleTransfer,
    computed: { resultImageSrc },
  } = useResultImageStore()

  const abortController = useRef<AbortController | null>(null)
  const isLeaveWithoutResult = useRef(false)

  const router = useRouter()

  const applyStyleTransfer = (image = originalImageSrc) => {
    if (!image || !selectedStyle) {
      return
    }
    abortController.current = new AbortController()
    handleStyleTransfer(image, selectedStyle, abortController.current.signal)
  }

  const initProcessImage = async () => {
    if (resultImageSrc) {
      return // show result directly
    }
    // process pending image
    const image = await getImageData(uploadedFile!)
    if (image) {
      applyStyleTransfer(image)
    }
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

  if (!uploadedFile) {
    return null
  }

  return (
    <div className={container}>
      <div className={inner}>
        <ResultControls />
        <div className={content}>
          <StyleSelector />
          <div className={resultWrapper}>
            <div className={card}>{isResultFailed ? <TryAgainSection /> : <ResultImage />}</div>
            <PromptPanel />
          </div>
        </div>
      </div>
    </div>
  )
}

const container = css({
  bgColor: '#E8E4D7',
})

const inner = css({
  maxW: '1280px',
  minH: '100dvh',
  m: '0 auto',
  p: '32px 24px',

  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  md: {
    h: '100dvh',
    p: '24px 72px',
  },
})

const content = css({
  display: 'flex',
  flexDirection: 'column-reverse',
  gap: '24px',
  overflow: 'hidden',
  md: {
    flexDirection: 'row',
    gap: '40px',
  },
})

const resultWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',
  md: {
    flex: 1,
  },
})

const card = css({
  w: '100%',
  h: '471px',
  bgColor: '#FBFBF9',
  rounded: '25px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  p: '24px 24px',
  md: {
    flex: 1,
    h: '0', // trick to make flex item grow
    maxH: '720px',
  },
})
