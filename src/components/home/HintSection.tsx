'use client'

import { css } from '@styled-system/css'
import { ArrowDownIcon } from '@/components/icons/ArrowDownIcon'

export const HintSection = () => {
  return (
    <div className={container}>
      <div className={title}>A new way to collect your moments</div>
      <div className={desc}>
        You can effortlessly transfer, enhance, and manage your images like never before. Experience
        joyful moments with Photstyle.ai now
      </div>
      <div className={iconWrapper}>
        <ArrowDownIcon />
      </div>
    </div>
  )
}

const container = css({
  maxW: '579px',
  m: '0 auto',
  pt: '64px',
  pb: '40px',
  px: '24px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
  textAlign: 'center',
  lineHeight: '1.25',
})

const title = css({
  color: '#303036',
  fontSize: '32px',
  fontWeight: '600',
})

const desc = css({
  color: '#787887',
})

const iconWrapper = css({
  mt: '8px',
  display: 'flex',
  justifyContent: 'center',
})
