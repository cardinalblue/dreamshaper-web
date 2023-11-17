'use client'

import React, { ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useSetRecoilState } from 'recoil'
import { uploadedDataState } from '@/app/RecoilProvider'
import { compressImage, fileToBase64 } from '@/utils/imageHelper'
import { css } from '@styled-system/css'

interface StylePreviewSectionProps {
  id: string
  name: string
  columnCount: number
}

export const StylePreviewSection = ({ id, name, columnCount }: StylePreviewSectionProps) => {
  const setUploadedData = useSetRecoilState(uploadedDataState)
  const router = useRouter()

  const onUpload = async (e: ChangeEvent<HTMLInputElement>, styleId: string) => {
    const files = e.target.files as FileList
    if (!files.length) return
    const file = await compressImage(files[0])
    setUploadedData({
      styleId,
      base64: await fileToBase64(file),
    })
    router.push('/result')
  }

  return (
    <div className={container} style={{ width: `${(1 / columnCount) * 100 - 2}%` }}>
      <div className={imageBox}></div>
      <div className={titleWrapper}>
        <div className={title}>{name}</div>
        <input
          type="file"
          accept="image/jpg,image/jpeg,image/png,image/heic"
          id={`file-input-${id}`}
          onChange={(e) => onUpload(e, id)}
          className={fileInput}
        />
        <label htmlFor={`file-input-${id}`} className={tryButton}>
          try
        </label>
      </div>
    </div>
  )
}

const container = css({
  maxW: '357px',
  h: '418px',
  p: '4',
  rounded: '3xl',
  bg: 'rgba(220, 212, 203, 0.40)',
  boxShadow: '0px 10px 50px 0px rgba(7, 23, 35, 0.30)',
  backdropFilter: 'blur(5px)',
  display: 'flex',
  flexDirection: 'column',
  gap: '3',
})

const imageBox = css({
  w: '100%',
  h: '320px',
  rounded: '25px',
  bg: 'gray.100',
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
  color: '#484851',
})

const fileInput = css({
  display: 'none',
})

const tryButton = css({
  w: '82px',
  h: '50px',
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