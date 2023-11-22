'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { css, cva } from '@styled-system/css'
import Image from 'next/image'
import { getImageDimensions } from '@/utils/imageHelper'
import { useUserImageStore } from '@/store'
import { HomeIcon } from '@/components/icons/HomeIcon'
import { DownloadIcon } from '@/components/icons/DownloadIcon'

export default function Result() {
  const { selectedStyle, originalImage, resultImage, uploadedFile, setResultImage } =
    useUserImageStore()
  const [isLoading, setIsLoading] = useState(false)
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })

  const router = useRouter()

  const handleStyleTransfer = async () => {
    try {
      setIsLoading(true)
      const config = selectedStyle?.config ?? {}
      const initial_image_b64 = originalImage ?? ''
      const res = await fetch('/api/style-transfer', {
        method: 'POST',
        body: JSON.stringify({ instances: [{ initial_image_b64, config }] }),
      })
      const data = await res.json()
      const newImage = data.predictions[0].stylized_image_b64
      setResultImage(newImage)
    } catch (error) {
      console.debug('error', error)
    } finally {
      setIsLoading(false)
    }
  }

  const onGoBack = () => {
    router.push('/')
  }

  const onSave = () => {
    if (isLoading) return
    const link = document.createElement('a')
    link.href = resultImage
    const fileName = uploadedFile?.name.split('.').slice(0, -1).join('.')
    const type = uploadedFile?.type.split('/')[1]
    link.download = `${fileName}_${selectedStyle?.id}.${type}`
    link.click()
  }

  const initImageSize = async (image: string) => {
    const size = await getImageDimensions(image)
    setImageSize(size)
  }

  useEffect(() => {
    if (originalImage) {
      initImageSize(originalImage)
      if (!resultImage) {
        handleStyleTransfer()
      }
    } else {
      router.push('/')
    }
  }, [])

  if (!originalImage) return null

  return (
    <div className={container}>
      <div className={card}>
        <div className={styleName}>{selectedStyle?.name}</div>
        <div className={buttonGroup}>
          <div
            onClick={onSave}
            data-disabled={isLoading || !resultImage ? 'true' : null}
            className={css(buttonRecipe.raw({ theme: 'dark' }))}
          >
            <DownloadIcon />
            <div className={buttonText}>Download</div>
          </div>
          <div onClick={onGoBack} className={css(buttonRecipe.raw({ theme: 'light' }))}>
            <HomeIcon />
            <div className={buttonText}>Try another style</div>
          </div>
        </div>

        <div className={resultWrapper}>
          <div
            className={imageFrame}
            style={
              {
                '--image-width': imageSize.width,
                '--image-height': imageSize.height,
              } as React.CSSProperties
            }
          >
            <Image
              src={isLoading ? originalImage ?? '' : resultImage}
              alt=""
              width={imageSize.width}
              height={imageSize.height}
              className={imageEl}
            />
            {isLoading && <div className={loadingMask} />}
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
          bgColor: '#3C3C444D',
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
  flex: 1,
  w: '100%',
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
  bg: 'rgba(255, 255, 255, 0.6)',
  _before: {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    w: '30px',
    h: '30px',
    border: '3px solid #000',
    rounded: '50%',
    borderTopColor: 'transparent',
    animation: 'loadingSpin 0.8s linear infinite',
  },
})
