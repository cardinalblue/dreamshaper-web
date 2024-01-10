import Image from 'next/image'
import Lottie from 'react-lottie'
import { css, cx } from '@styled-system/css'
import { useUserImageStore, useResultImageStore } from '@/store'
import * as LoadingAnimation from '@/utils/lottie/magic_loading.json'

export const ResultImage = () => {
  const { originalImageDimensions, originalImageSrc, selectedStyle } = useUserImageStore()
  const {
    computed: { resultImageSrc, isImageLoading },
  } = useResultImageStore()

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
      {!!originalImageSrc && (
        <Image
          src={originalImageSrc}
          alt=""
          width={originalImageDimensions.width}
          height={originalImageDimensions.height}
          className={imageEl}
          unoptimized
        />
      )}
      {!!resultImageSrc && (
        <Image
          src={resultImageSrc}
          alt=""
          fill={true}
          className={cx(imageEl, resultImageSrc ? 'clip-in' : null)}
          unoptimized
          key={selectedStyle?.id}
        />
      )}
      {/* {isImageLoading && <div className={loadingMask} />} */}
      {isImageLoading && (
        <div className={loadingMask}>
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: LoadingAnimation,
            }}
          />
        </div>
      )}
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
  '&.clip-in': {
    animation: 'clipIn 0.5s ease-in-out',
  },
})

const loadingMask = css({
  position: 'absolute',
  top: 0,
  left: 0,
  w: '100%',
  h: '100%',
})
