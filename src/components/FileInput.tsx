'use client'

import React, { ChangeEvent, PropsWithChildren, CSSProperties } from 'react'
import { css } from '@styled-system/css'
import { useUserImageStore, useResultImageStore } from '@/store'

interface FileInputProps {
  inputId?: string
  style?: CSSProperties
  className?: string
  onUpload?: () => void
}

export const FileInput = ({
  inputId = 'image-file-input',
  onUpload,
  children,
  ...rest
}: PropsWithChildren<FileInputProps>) => {
  const { setUploadedFile, setUploadingStatus, isUploading } = useUserImageStore()
  const { resetResultImageStates } = useResultImageStore()

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (isUploading) return
    try {
      setUploadingStatus(true)
      const files = e.target.files as FileList
      if (!files.length) return

      resetResultImageStates() // reset previosus result
      setUploadedFile(files[0])
      onUpload?.()
    } catch (error) {
      console.debug('Upload error', error)
    } finally {
      setUploadingStatus(false)
    }
  }

  return (
    <label htmlFor={inputId} {...rest}>
      <input
        type="file"
        accept="image/jpg,image/jpeg,image/png,image/heic"
        id={inputId}
        onChange={onChange}
        className={fileInput}
        disabled={isUploading}
      />
      {children}
    </label>
  )
}

const fileInput = css({
  display: 'none',
})
