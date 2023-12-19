import { create } from 'zustand'

type State = {
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
}

type Actions = {
  setSelectedStyle: (selectedStyle: State['selectedStyle']) => void
  setUploadingStatus: (isUploading: boolean) => void
  setUploadedFile: (file: State['uploadedFile']) => void
  setOriginalImageData: (state: {
    originalImageSrc: string
    originalImageDimensions: State['originalImageDimensions']
  }) => void
  resetUserImageStates: () => void
}

const initialState: State = {
  selectedStyle: null,
  uploadedFile: null,
  isUploading: false,
  originalImageSrc: '',
  originalImageDimensions: { width: 0, height: 0 },
}

export const useUserImageStore = create<State & Actions>((set) => ({
  ...initialState,

  setSelectedStyle: (selectedStyle) => set({ selectedStyle }),
  setUploadingStatus: (isUploading) => set({ isUploading }),
  setUploadedFile: (uploadedFile) =>
    set({
      uploadedFile,
      // reset image data
      originalImageSrc: '',
      originalImageDimensions: { width: 0, height: 0 },
    }),
  setOriginalImageData: ({ originalImageSrc, originalImageDimensions }) =>
    set({ originalImageSrc, originalImageDimensions }),
  resetUserImageStates: () => set(initialState),
}))
