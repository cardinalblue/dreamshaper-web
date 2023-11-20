'use client'

import React from 'react'
import { RecoilRoot, atom } from 'recoil'

export interface UploadedDataType {
  styleInfo: {
    id: string
    name: string
    src: string
    config: Record<string, any>
  }
  base64: string
}

export const uploadedDataState = atom<UploadedDataType | null>({
  key: 'UploadedData',
  default: null,
})

function RecoilProvider({ children }: { children: React.ReactNode }) {
  return <RecoilRoot>{children}</RecoilRoot>
}

export default RecoilProvider
