'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { css } from '@styled-system/css'
import Image from 'next/image'
import {
  getImageDimensionsFromBase64,
  fileToBase64,
  processHeicFile,
  compressImage,
  handlePngImageBackground,
} from '@/utils/imageHelper'
import { useUserImageStore, useResultImageStore } from '@/store'
import { ResultControls } from '@/components/ResultControls'
import { ampEnterTransferResultPage, ampShowTransferResult } from '@/utils/eventTracking'

export default function Result() {
  const {
    selectedStyle,
    uploadedFile,
    setOriginalImageData,
    originalImageSrc,
    originalImageDimensions,
    resetUserImageStates,
  } = useUserImageStore()
  const {
    resultImageSrc,
    isImageTransferring,
    isResultFailed,
    setResultImageSrc,
    setImageFormattingStatus,
    setImageTransferringStatus,
    setResultFailedStatus,
    resetResultImageStates,
  } = useResultImageStore()
  const isImageLoading = useResultImageStore((state) => state.computed.isImageLoading)

  const abortController = useRef<AbortController | null>(null)
  const isLeaveWithoutResult = useRef(false)

  const router = useRouter()

  const handleStyleTransfer = async (image: string) => {
    if (!selectedStyle) return
    try {
      setImageTransferringStatus(true)
      const config = selectedStyle.config ?? {}
      const initial_image_b64 = image ?? ''
      const res = await fetch('/api/style-transfer', {
        method: 'POST',
        body: JSON.stringify({ instances: [{ initial_image_b64, config }] }),
        signal: abortController.current?.signal,
      })
      const data = await res.json()
      const newImage = data.predictions[0].stylized_image_b64
      setResultImageSrc(newImage)
      ampShowTransferResult(selectedStyle.id)
    } catch (error) {
      console.debug('transfer error', error)
      setResultFailedStatus(true)
    } finally {
      setImageTransferringStatus(false)
    }
  }

  const getImageData = async () => {
    if (!uploadedFile) return
    try {
      setImageFormattingStatus(true)
      let file = uploadedFile
      if (file.type === 'image/heic') {
        file = await processHeicFile(file)
      }
      // compress image if size > 1MB
      if (file.size > 1024 * 1024) {
        file = await compressImage(file)
      } else if (file.type === 'image/png') {
        // make sure png image has white background
        file = await handlePngImageBackground(file)
      }
      const base64Image = await fileToBase64(file)
      const size = await getImageDimensionsFromBase64(base64Image)
      setOriginalImageData({
        originalImageSrc: base64Image,
        originalImageDimensions: size,
      })
      return base64Image
    } catch (error) {
      console.debug('Image processing error', error)
    } finally {
      setImageFormattingStatus(false)
    }
  }

  useEffect(() => {
    isLeaveWithoutResult.current = !resultImageSrc
  }, [resultImageSrc])

  const imageSrc = useMemo(() => {
    if (!originalImageSrc && !resultImageSrc) return null
    return isImageTransferring ? originalImageSrc : resultImageSrc
  }, [isImageTransferring, originalImageSrc, resultImageSrc])

  const initProcessImage = async () => {
    if (resultImageSrc) return // show result directly
    // process pending image
    abortController.current = new AbortController()
    const image = await getImageData()
    if (image) handleStyleTransfer(image)
  }

  useEffect(() => {
    if (uploadedFile && selectedStyle) {
      initProcessImage()
      ampEnterTransferResultPage(selectedStyle.id)
    }
  }, [uploadedFile, selectedStyle])

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
        <div className={styleName}>{selectedStyle?.name}</div>
        <ResultControls />
        <div className={resultWrapper}>
          {isResultFailed ? (
            <div className={errorText}>Image processing failed. Please try a different image.</div>
          ) : (
            <div
              className={imageFrame}
              style={
                {
                  '--image-width': originalImageDimensions.width,
                  '--image-height': originalImageDimensions.height,
                  ...(!originalImageSrc && {
                    // placeholder
                    width: '100%',
                    height: '100%',
                  }),
                } as React.CSSProperties
              }
            >
              {!!imageSrc && (
                <Image
                  src={imageSrc}
                  alt=""
                  width={originalImageDimensions.width}
                  height={originalImageDimensions.height}
                  className={imageEl}
                />
              )}
              {isImageLoading && <div className={loadingMask} />}
            </div>
          )}
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
  w: '100%',
  h: '471px',
  p: '24px',
  bgColor: '#F5F4EF',
  boxShadow: '5px 10px 20px 0px rgba(52, 52, 52, 0.15)',
  rounded: '25px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',
  md: {
    w: '648px',
    h: '656px',
  },
})

const styleName = css({
  fontSize: '32px',
  fontWeight: 'bold',
  lineHeight: 'normal',
  color: '#484851',
})

const resultWrapper = css({
  w: '100%',
  flexGrow: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
})

const imageFrame = css({
  maxW: '100%',
  maxH: '100%',
  aspectRatio: 'var(--image-width) / var(--image-height)',
  position: 'relative',
  rounded: '10px',
  overflow: 'hidden',
})

const imageEl = css({
  maxW: '100%',
  maxH: '100%',
})

const loadingMask = css({
  position: 'absolute',
  top: 0,
  left: 0,
  w: '100%',
  h: '100%',
  bg: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  _before: {
    content: '""',
    w: '36px',
    h: '36px',
    border: '5px solid #F5F4EF',
    rounded: '50%',
    borderTopColor: 'transparent',
    animation: 'loadingSpin 0.8s linear infinite',
  },
})

const errorText = css({
  fontSize: '18px',
  fontWeight: '600',
  textAlign: 'center',
})
