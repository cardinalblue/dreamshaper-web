'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { css } from '@styled-system/css'
import Image from 'next/image'
import { getImageDimensions } from '@/utils/imageHelper'
import { useUserImageStore } from '@/store'

export default function Result() {
  const { styleInfo, uploadedImage, resetUserImage } = useUserImageStore()
  const [isLoading, setIsLoading] = useState(false)
  const [resultImage, setResultImage] = useState('')
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })

  const router = useRouter()

  const handleStyleTransfer = async () => {
    try {
      setIsLoading(true)
      const config = styleInfo?.config ?? {}
      const initial_image_b64 = uploadedImage ?? ''
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

  const initImageSize = async (image: string) => {
    const size = await getImageDimensions(image)
    const currentMaxSize = Math.max(size.width, size.height)
    const maxSize = 500
    if (currentMaxSize > maxSize) {
      const ratio = maxSize / currentMaxSize
      size.width = size.width * ratio
      size.height = size.height * ratio
    }
    setImageSize(size)
  }

  useEffect(() => {
    if (uploadedImage && styleInfo) {
      initImageSize(uploadedImage)
      handleStyleTransfer()
    }
    return () => {
      resetUserImage()
    }
  }, [])

  return (
    <div className={container}>
      <div className={navbar}>
        <div className={logo}></div>
      </div>
      <div className={header}>
        <div className={styleName} onClick={handleStyleTransfer}>
          {styleInfo?.name}
        </div>
        <div onClick={onGoBack} className={button}>
          Try another style
        </div>
      </div>

      {uploadedImage && imageSize.width && (
        <div className={resultImageWrapper} style={{ ...imageSize }}>
          <Image
            src={isLoading ? uploadedImage ?? '' : resultImage}
            alt=""
            width={imageSize.width}
            height={imageSize.height}
            style={{ transition: 'all 0.3s' }}
          />
          {isLoading && <div className={loadingMask} />}
        </div>
      )}
    </div>
  )
}

const container = css({
  minH: '100vh',
  maxW: '1136px',
  m: '0 auto',
  p: '24px 32px 32px 32px',
})

const navbar = css({
  display: 'flex',
  alignItems: 'center',
})

const logo = css({
  w: '216px',
  h: '44px',
  bg: '#9CA991',
  borderRadius: '10px',
})

const header = css({
  mt: '32px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const styleName = css({
  fontSize: '36px',
  fontWeight: 'bold',
  color: '#484851',
})

const button = css({
  cursor: 'pointer',
  p: '12px 32px',
  color: '#FAFAFA',
  bg: 'linear-gradient(94deg, #F08A41 -48.91%, #E57748 138.69%)',
  borderRadius: '14px',
  fontWeight: 'bold',
})

const resultImageWrapper = css({
  m: '32px auto 0 auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  borderRadius: '14px',
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
    borderRadius: '50%',
    borderTopColor: 'transparent',
    animation: 'loadingSpin 0.8s linear infinite',
  },
})
