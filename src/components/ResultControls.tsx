'use client'

import { useRouter } from 'next/navigation'
import { css } from '@styled-system/css'
import { useUserImageStore, useResultImageStore } from '@/store'
import { FileInput } from '@/components/FileInput'
import { Button } from '@/components/Button'
import { HomeIcon } from '@/components/icons/HomeIcon'
import { DownloadIcon } from '@/components/icons/DownloadIcon'
import { TryAgainIcon } from '@/components/icons/TryAgainIcon'
import { ampDownloadTransferResult } from '@/utils/eventTracking'

export default function ResultControls() {
  const { selectedStyle, uploadedFile } = useUserImageStore()
  const { resultImageSrc, isResultFailed } = useResultImageStore()

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
    ampDownloadTransferResult()
  }

  return (
    <div className={buttonGroup}>
      {isResultFailed ? (
        <FileInput>
          <Button theme="dark" content="icon">
            <TryAgainIcon />
            <div className="text">Try again</div>
          </Button>
        </FileInput>
      ) : (
        <Button
          theme="dark"
          content="icon"
          data-disabled={!resultImageSrc ? 'true' : null}
          onClick={() => {
            if (!resultImageSrc) return
            onSave()
          }}
        >
          <DownloadIcon />
          <div className="text">Download</div>
        </Button>
      )}
      <Button onClick={onGoBack} theme="light" content="icon">
        <HomeIcon />
        <div className="text">Try another style</div>
      </Button>
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
