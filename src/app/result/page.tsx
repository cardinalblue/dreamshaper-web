'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { css } from '@styled-system/css'
import {
  getImageDimensionsFromBase64,
  fileToBase64,
  processHeicFile,
  compressImage,
  handlePngImageBackground,
} from '@/utils/imageHelper'
import { useUserImageStore, useResultImageStore } from '@/store'
import { ResultControls } from '@/components/ResultControls'
import { ResultImage } from '@/components/ResultImage'
import { ampEnterTransferResultPage, ampShowTransferResult } from '@/utils/eventTracking'

export default function Result() {
  const { selectedStyle, uploadedFile, setOriginalImageData, resetUserImageStates } =
    useUserImageStore()

  const {
    resultImageSrc,
    isResultFailed,
    setResultImageSrc,
    setImageFormattingStatus,
    setImageTransferringStatus,
    setResultFailedStatus,
    resetResultImageStates,
  } = useResultImageStore()

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
        body: JSON.stringify({ input: { initial_image_b64, config } }),
        signal: abortController.current?.signal,
      })
      const data = await res.json()
      const newImage = data.output.stylized_image_b64
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
            <ResultImage />
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

const errorText = css({
  fontSize: '18px',
  fontWeight: '600',
  textAlign: 'center',
})
