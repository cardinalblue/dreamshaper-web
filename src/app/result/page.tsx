'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { css, cva } from '@styled-system/css'
import Image from 'next/image'
import {
  getImageDimensionsFromBase64,
  fileToBase64,
  processHeicFile,
  compressImage,
  handlePngImageBackground,
} from '@/utils/imageHelper'
import { useUserImageStore } from '@/store'
import { HomeIcon } from '@/components/icons/HomeIcon'
import { DownloadIcon } from '@/components/icons/DownloadIcon'

export default function Result() {
  const {
    selectedStyle,
    resultImageSrc,
    uploadedFile,
    setResultImageSrc,
    setOriginalImageData,
    originalImageSrc,
    originalImageDimensions,
    resetUserImageStates,
  } = useUserImageStore()
  const [isImageProcessing, setIsImageProcessing] = useState(false)
  const [isTransferring, setIsTransferring] = useState(false)
  const [isError, setIsError] = useState(false)

  const router = useRouter()

  const handleStyleTransfer = async (image: string) => {
    try {
      setIsTransferring(true)
      const config = selectedStyle?.config ?? {}
      const initial_image_b64 = image ?? ''
      const res = await fetch('/api/style-transfer', {
        method: 'POST',
        body: JSON.stringify({ instances: [{ initial_image_b64, config }] }),
      })
      const data = await res.json()
      const newImage = data.predictions[0].stylized_image_b64
      setResultImageSrc(newImage)
    } catch (error) {
      console.debug('error', error)
      setIsError(true)
    } finally {
      setIsTransferring(false)
    }
  }

  const onGoBack = () => {
    router.push('/')
  }

  const onSave = () => {
    const link = document.createElement('a')
    link.href = resultImageSrc
    const fileName = uploadedFile?.name.split('.').slice(0, -1).join('.')
    const type = uploadedFile?.type.split('/')[1]
    link.download = `${fileName}_${selectedStyle?.id}.${type}`
    link.click()
  }

  const getImageData = async () => {
    if (!uploadedFile) return
    try {
      setIsImageProcessing(true)
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
      setIsImageProcessing(false)
    }
  }

  const isLoading = useMemo(() => {
    return isImageProcessing || isTransferring
  }, [isImageProcessing, isTransferring])

  const imageSrc = useMemo(() => {
    if (!originalImageSrc && !resultImageSrc) return null
    return isTransferring ? originalImageSrc : resultImageSrc
  }, [isTransferring, originalImageSrc, resultImageSrc])

  useEffect(() => {
    return () => {
      if (isError) resetUserImageStates()
    }
  }, [isError, resetUserImageStates])

  const init = async () => {
    if (uploadedFile && !resultImageSrc) {
      const image = await getImageData()
      if (image) handleStyleTransfer(image)
    } else {
      router.push('/')
    }
  }

  useEffect(() => {
    init()
  }, [])

  if (!uploadedFile) return null

  return (
    <div className={container}>
      <div className={card}>
        <div className={styleName}>{selectedStyle?.name}</div>
        <div className={buttonGroup}>
          {!isError && (
            <div
              onClick={() => {
                if (isLoading || !resultImageSrc) return
                onSave()
              }}
              data-disabled={isLoading || !resultImageSrc ? 'true' : null}
              className={css(buttonRecipe.raw({ theme: 'dark' }))}
            >
              <DownloadIcon />
              <div className={buttonText}>Download</div>
            </div>
          )}
          <div onClick={onGoBack} className={css(buttonRecipe.raw({ theme: 'light' }))}>
            <HomeIcon />
            <div className={buttonText}>Try another style</div>
          </div>
        </div>

        <div className={resultWrapper}>
          {isError ? (
            <div className={errorText}>Sorry, upload failed, please try again</div>
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
              {isLoading && <div className={loadingMask} />}
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

const buttonGroup = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '12px',
})

const buttonRecipe = cva({
  base: {
    w: '48px',
    h: '48px',
    p: '12px',
    cursor: 'pointer',
    rounded: '14px',
    fontSize: '18px',
    fontWeight: 'bold',
    lineHeight: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s',
    userSelect: 'none',
    md: {
      w: 'auto',
      h: 'auto',
      p: '14px 24px',
    },
    '& > svg': {
      flexShrink: 0,
    },
  },
  variants: {
    theme: {
      light: {
        color: '#484851',
        bgColor: '#E2DECF',
        _hover: {
          bgColor: '#D9D2BF',
        },
      },
      dark: {
        color: '#FAFAFA',
        bgColor: '#3C3C44',
        '&:not([data-disabled]):hover': {
          bgColor: '#60606C',
        },
        _disabled: {
          cursor: 'not-allowed',
          bgColor: '#AEAEB7',
        },
      },
    },
  },
})

const buttonText = css({
  display: 'none',
  md: {
    display: 'block',
  },
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
})
