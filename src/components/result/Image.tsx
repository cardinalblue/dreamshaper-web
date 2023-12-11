import { useMemo } from 'react'
import { css } from '@styled-system/css'
import Image from 'next/image'
import { useUserImageStore, useResultImageStore } from '@/store'

export const ResultImage = () => {
  const { originalImageDimensions, originalImageSrc } = useUserImageStore()
  const { resultImageSrc } = useResultImageStore()

  const isImageLoading = useResultImageStore((state) => state.computed.isImageLoading)

  const imageSrc = useMemo(() => {
    return resultImageSrc || originalImageSrc || null
  }, [originalImageSrc, resultImageSrc])

  return (
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
          unoptimized
        />
      )}
      {isImageLoading && <div className={loadingMask} />}
    </div>
  )
}

const imageFrame = css({
  maxW: '100%',
  maxH: '100%',
  aspectRatio: 'var(--image-width) / var(--image-height)',
  position: 'relative',
  rounded: '10px',
  overflow: 'hidden',
})

const imageEl = css({
  display: 'block',
  w: '100%',
  h: '100%',
  objectFit: 'contain',
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