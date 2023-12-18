'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { css } from '@styled-system/css'
import { useUserImageStore, useResultImageStore } from '@/store'
import { ResultControls } from '@/components/result/Controls'
import { ResultImage } from '@/components/result/Image'
import { StyleSelector } from '@/components/result/StyleSelector'
import { FileInput } from '@/components/FileInput'
import { TryAgainIcon } from '@/components/icons/TryAgainIcon'
import { Button } from '@/components/Button'
import { ampEnterTransferResultPage } from '@/utils/eventTracking'

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
      <ResultControls />
      <div className={content}>
        <StyleSelector />

        <div className={card}>
          {isResultFailed ? (
            <div className={errorContent}>
              <FileInput>
                <Button theme="dark" content="icon">
                  <TryAgainIcon />
                  <div className="text">Try again</div>
                </Button>
              </FileInput>
              <div className={errorText}>
                Image processing failed. Please try a different image.
              </div>
            </div>
          ) : (
            <ResultImage />
          )}
        </div>
      </div>
    </div>
  )
}

const container = css({
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
    h: 'auto',
    maxH: '720px',
  },
})

const errorContent = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',
})

const errorText = css({
  fontSize: '18px',
  fontWeight: '600',
})
