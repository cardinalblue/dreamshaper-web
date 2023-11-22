'use client'

import React, { ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { compressImage, fileToBase64 } from '@/utils/imageHelper'
import { css } from '@styled-system/css'
import { useUserImageStore } from '@/store'

interface StylePreviewCardProps {
  styleInfo: {
    id: string
    name: string
    src: string
    config: Record<string, any>
  }
  style?: React.CSSProperties
}

export const StylePreviewCard = ({ styleInfo, style }: StylePreviewCardProps) => {
  const { setUploadedImage, setSelectedStyle } = useUserImageStore()
  const router = useRouter()

  const onUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList
    if (!files.length) return
    let file = files[0]
    if (file.type === 'image/heic') {
      // convert heic to jpeg
      const heic2any = require('heic2any') // loaded on client side only
      const outputBlob = (await heic2any({
        blob: new Blob([file], { type: file.type }),
        toType: 'image/jpeg',
        quality: 1,
      })) as Blob
      file = new File([outputBlob], file.name, {
        type: outputBlob.type,
        lastModified: Date.now(),
      })
    }
    // compress image if size > 1MB
    if (file.size > 1024 * 1024) {
      file = await compressImage(file)
    }
    setSelectedStyle(styleInfo)
    setUploadedImage({
      uploadedFile: file,
      originalImage: await fileToBase64(file),
    })
    router.push('/result')
  }

  return (
    <div className={container} style={{ ...style }}>
      <div className={imageBox} style={{ backgroundImage: `url('${styleInfo.src}')` }}></div>
      <div className={titleWrapper}>
        <div className={title}>{styleInfo.name}</div>
        <input
          type="file"
          accept="image/jpg,image/jpeg,image/png,image/heic"
          id={`file-input-${styleInfo.id}`}
          onChange={onUpload}
          className={fileInput}
        />
        <label htmlFor={`file-input-${styleInfo.id}`} className={tryButton}>
          try
        </label>
      </div>
    </div>
  )
}

const container = css({
  h: '420px',
  p: '16px',
  rounded: '25px',
  bg: '#ECE9DF',
  boxShadow: '0px 10px 50px 0px rgba(7, 23, 35, 0.15)',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  md: {
    maxW: '357px',
  },
})

const imageBox = css({
  w: '100%',
  h: '320px',
  rounded: '25px',
  bg: 'no-repeat center / cover',
})

const titleWrapper = css({
  w: '100%',
  flex: 1,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontWeight: 'bold',
})

const title = css({
  ml: '16px',
  fontSize: '20px',
  fontWeight: '600',
  lineHeight: 'normal',
  color: '#484851',
})

const fileInput = css({
  display: 'none',
})

const tryButton = css({
  w: '82px',
  h: '50px',
  flexShrink: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  rounded: '14px',
  bg: 'linear-gradient(94deg, #4D6639 -48.91%, #758369 140.64%, #687C57 140.66%)',
  fontSize: '18px',
  textTransform: 'uppercase',
  color: '#FAFAFA',
  cursor: 'pointer',
})
