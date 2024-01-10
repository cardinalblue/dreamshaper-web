'use client'

import { css } from '@styled-system/css'
import { FileInput } from '@/components/FileInput'
import { TryAgainIcon } from '@/components/icons/TryAgainIcon'
import { Button } from '@/components/Button'

export const TryAgainSection = () => {
  return (
    <div className={errorContent}>
      <FileInput>
        <Button theme="dark" content="icon">
          <TryAgainIcon />
          <div className="text">Try again</div>
        </Button>
      </FileInput>
      <div className={errorText}>Image processing failed. Please try a different image.</div>
    </div>
  )
}

const errorContent = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',
})

const errorText = css({
  fontSize: '18px',
  fontWeight: '600',
})
