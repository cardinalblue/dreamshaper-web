import { create } from 'zustand'

interface UserImageState {
  styleInfo: {
    id: string
    name: string
    src: string
    config: Record<string, any>
  } | null
  uploadedFile: File | null
  originalImage: string // base64 string
  resultImage: string // base64 string
  setSelectedStyle: (styleInfo: UserImageState['styleInfo']) => void
  setUploadedImage: (state: {
    uploadedFile: UserImageState['uploadedFile']
    originalImage: UserImageState['originalImage']
  }) => void
  setResultImage: (resultImage: UserImageState['resultImage']) => void
  resetUserImageData: () => void
}

export const useUserImageStore = create<UserImageState>((set) => ({
  styleInfo: null,
  uploadedFile: null,
  originalImage: '',
  resultImage: '',
  setSelectedStyle: (styleInfo) => set({ styleInfo }),
  setUploadedImage: ({ uploadedFile, originalImage }) =>
    set({ uploadedFile, originalImage, resultImage: '' }),
  setResultImage: (resultImage) => set({ resultImage }),
  resetUserImageData: () =>
    set({ styleInfo: null, uploadedFile: null, originalImage: '', resultImage: '' }),
}))
