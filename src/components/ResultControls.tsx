'use client'

import { useRouter } from 'next/navigation'
import { css, cva } from '@styled-system/css'
import { useUserImageStore, useResultImageStore } from '@/store'
import { HomeIcon } from '@/components/icons/HomeIcon'
import { DownloadIcon } from '@/components/icons/DownloadIcon'

export default function ResultControls() {
  const { selectedStyle, uploadedFile } = useUserImageStore()
  const { resultImageSrc, isResultFailed } = useResultImageStore()
  const isImageLoading = useResultImageStore((state) => state.computed.isImageLoading)

  const router = useRouter()

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

  return (
    <div className={buttonGroup}>
      {!isResultFailed && (
        <div
          onClick={() => {
            if (isImageLoading || !resultImageSrc) return
            onSave()
          }}
          data-disabled={isImageLoading || !resultImageSrc ? 'true' : null}
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
  )
}

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
