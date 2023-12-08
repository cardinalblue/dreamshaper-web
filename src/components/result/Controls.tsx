'use client'

import { useRouter } from 'next/navigation'
import { css } from '@styled-system/css'
import { useUserImageStore, useResultImageStore } from '@/store'
import { FileInput } from '@/components/FileInput'
import { Button } from '@/components/Button'
import { HomeIcon } from '@/components/icons/HomeIcon'
import { DownloadIcon } from '@/components/icons/DownloadIcon'
import { TryAgainIcon } from '@/components/icons/TryAgainIcon'
import { ampDownloadTransferResult, ampClickTryAnotherStyle } from '@/utils/eventTracking'

export const ResultControls = () => {
  const { selectedStyle, uploadedFile } = useUserImageStore()
  const { isResultFailed } = useResultImageStore()
  const resultImageSrc = useResultImageStore((state) => state.computed.resultImageSrc)

  const router = useRouter()

  const onGoBack = () => {
    ampClickTryAnotherStyle()
    router.push('/')
  }

  const onSave = () => {
    if (!resultImageSrc || !uploadedFile || !selectedStyle) return

    const link = document.createElement('a')
    link.href = resultImageSrc
    const fileName = uploadedFile.name.split('.').slice(0, -1).join('.')
    const type = uploadedFile.type.split('/')[1]
    link.download = `${fileName}_${selectedStyle.id}.${type}`
    link.click()
    ampDownloadTransferResult(selectedStyle.id)
  }

  return (
    <div className={buttonGroup}>
      <Button onClick={onGoBack} theme="light" content="icon">
        <HomeIcon />
        <div className="text">Home</div>
      </Button>

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
    </div>
  )
}

const buttonGroup = css({
  w: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '12px',
})
