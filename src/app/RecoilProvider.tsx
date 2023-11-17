'use client'

import React from 'react'
import { RecoilRoot, atom } from 'recoil'

export interface UploadedDataType {
  styleId: string
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
