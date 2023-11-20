'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { css, cva } from '@styled-system/css'
import Image from 'next/image'
import { getImageDimensions } from '@/utils/imageHelper'
import { useUserImageStore } from '@/store'
import { HomeIcon } from '@/components/icons/HomeIcon'
import { DownloadIcon } from '@/components/icons/DownloadIcon'

const MAX_IMAGE_SIZE = 800

export default function Result() {
  const { styleInfo, originalImage, resultImage, uploadedFile, setResultImage } =
    useUserImageStore()
  const [isLoading, setIsLoading] = useState(false)
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })

  const router = useRouter()

  const handleStyleTransfer = async () => {
    try {
      setIsLoading(true)
      const config = styleInfo?.config ?? {}
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
    link.download = `${fileName}_${styleInfo?.id}.${type}`
    link.click()
  }

  const initImageSize = async (image: string) => {
    const size = await getImageDimensions(image)
    const currentMaxSize = Math.max(size.width, size.height)
    if (currentMaxSize > MAX_IMAGE_SIZE) {
      const ratio = MAX_IMAGE_SIZE / currentMaxSize
      size.width = size.width * ratio
      size.height = size.height * ratio
    }
    setImageSize(size)
  }

  useEffect(() => {
    if (originalImage && !resultImage) {
      initImageSize(originalImage)
      handleStyleTransfer()
    }
  }, [])

  return (
    <div className={container}>
      <div className={card}>
        <div className={styleName}>{styleInfo?.name}</div>
        <div className={buttonGroup}>
          <div
            onClick={onSave}
            data-disabled={isLoading ? 'true' : null}
            className={css(buttonRecipe.raw({ theme: 'dark' }))}
          >
            <DownloadIcon />
            Download
          </div>
          <div onClick={onGoBack} className={css(buttonRecipe.raw({ theme: 'light' }))}>
            <HomeIcon />
            Try another style
          </div>
        </div>

        {originalImage && imageSize.width && (
          <div className={resultImageWrapper} style={{ ...imageSize }}>
            <Image
              src={isLoading ? originalImage ?? '' : resultImage}
              alt=""
              width={imageSize.width}
              height={imageSize.height}
              style={{ transition: 'all 0.3s' }}
            />
            {isLoading && <div className={loadingMask} />}
          </div>
        )}
      </div>
    </div>
  )
}

const container = css({
  minH: '100vh',
  maxW: '1280px',
  m: '0 auto',
  p: '24px 72px 32px 72px',
})

const card = css({
  maxW: '848px',
  p: '24px',
  m: '0 auto',
  bgColor: '#F5F1EA',
  boxShadow: '5px 10px 20px 0px rgba(52, 52, 52, 0.15)',
  rounded: '25px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',
})

const styleName = css({
  fontSize: '32px',
  fontWeight: 'bold',
  color: '#484851',
})

const buttonGroup = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '12px',
})

const buttonRecipe = cva({
  base: {
    cursor: 'pointer',
    p: '14px 24px',
    rounded: '14px',
    fontSize: '18px',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s',
  },
  variants: {
    theme: {
      light: {
        color: '#484851',
        bgColor: '#D9D2BF',
      },
      dark: {
        color: '#FAFAFA',
        bg: 'linear-gradient(94deg, #4D6639 -48.91%, #758369 140.64%, #687C57 140.66%)',
        _disabled: {
          cursor: 'not-allowed',
          // opacity 0.3
          bg: 'linear-gradient(94deg, #4D66394d -48.91%, #7583694d 140.64%, #687C574d 140.66%)',
        },
      },
    },
  },
})

const resultImageWrapper = css({
  m: '0 auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  rounded: '20px',
  overflow: 'hidden',
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
