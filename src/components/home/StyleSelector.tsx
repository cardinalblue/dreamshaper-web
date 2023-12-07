'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { css } from '@styled-system/css'
import { useUserImageStore } from '@/store'
import { ampClickStyleButton } from '@/utils/eventTracking'
import { STYLE_LIST } from '@/utils/styleList'
import { FileInput } from '@/components/FileInput'
import { StylePreviewCard } from './StylePreviewCard'

export const HomepageStyleSelector = () => {
  const { setSelectedStyle } = useUserImageStore()
  const router = useRouter()

  return (
    <div className={listWrapper}>
      {STYLE_LIST.map((styleInfo) => (
        <FileInput
          key={styleInfo.id}
          inputId={`file-input-${styleInfo.id}`}
          onUpload={() => {
            setSelectedStyle(styleInfo)
            router.push('/result')
          }}
          onClick={() => {
            ampClickStyleButton(styleInfo.id)
          }}
        >
          <StylePreviewCard styleInfo={styleInfo} />
        </FileInput>
      ))}
    </div>
  )
}

const listWrapper = css({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '32px',
  justifyContent: 'center',
  md: {
    gridTemplateColumns: 'repeat(2, minmax(0, 357px))',
  },
  xl: {
    gridTemplateColumns: 'repeat(3, minmax(0, 357px))',
  },
})
