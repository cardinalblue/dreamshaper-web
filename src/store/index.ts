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
  originalImage: string // base64 string
  resultImage: string // base64 string

  setSelectedStyle: (selectedStyle: UserImageState['selectedStyle']) => void
  setUploadedImage: (state: {
    uploadedFile: UserImageState['uploadedFile']
    originalImage: string
  }) => void
  setResultImage: (resultImage: string) => void
  resetUserImageData: () => void
  setUploadStatus: (isUploading: boolean) => void
}

export const useUserImageStore = create<UserImageState>((set) => ({
  selectedStyle: null,
  uploadedFile: null,
  isUploading: false,
  originalImage: '',
  resultImage: '',
  setSelectedStyle: (selectedStyle) => set({ selectedStyle }),
  setUploadedImage: ({ uploadedFile, originalImage }) =>
    set({ uploadedFile, originalImage, resultImage: '' }),
  setResultImage: (resultImage) => set({ resultImage }),
  resetUserImageData: () =>
    set({ selectedStyle: null, uploadedFile: null, originalImage: '', resultImage: '' }),
  setUploadStatus: (isUploading) => set({ isUploading }),
}))
