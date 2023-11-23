import { create } from 'zustand'

interface UserImageState {
  selectedStyle: {
    id: string
    name: string
    src: string
    config: Record<string, any>
  } | null
  isUploading: boolean
  uploadedFile: File | null
  originalImageSrc: string // base64 string
  originalImageDimensions: {
    width: number
    height: number
  }
  resultImageSrc: string // base64 string
  setSelectedStyle: (selectedStyle: UserImageState['selectedStyle']) => void
  setUploadStatus: (isUploading: boolean) => void
  setUploadedFile: (file: UserImageState['uploadedFile']) => void
  setOriginalImageData: (state: {
    originalImageSrc: string
    originalImageDimensions: UserImageState['originalImageDimensions']
  }) => void
  setResultImageSrc: (resultImageSrc: string) => void
}

export const useUserImageStore = create<UserImageState>((set) => ({
  selectedStyle: null,
  uploadedFile: null,
  isUploading: false,
  originalImageSrc: '',
  originalImageDimensions: { width: 0, height: 0 },
  resultImageSrc: '',
  setSelectedStyle: (selectedStyle) => set({ selectedStyle }),
  setUploadStatus: (isUploading) => set({ isUploading }),
  setUploadedFile: (uploadedFile) =>
    set({
      uploadedFile,
      // reset image data
      originalImageSrc: '',
      originalImageDimensions: { width: 0, height: 0 },
      resultImageSrc: '',
    }),
  setOriginalImageData: ({ originalImageSrc, originalImageDimensions }) =>
    set({ originalImageSrc, originalImageDimensions }),
  setResultImageSrc: (resultImageSrc) => set({ resultImageSrc }),
}))
