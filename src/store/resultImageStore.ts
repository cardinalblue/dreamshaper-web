import { create } from 'zustand'

type State = {
  resultImageSrc: string // base64 string
  isResultFailed: boolean
  isImageFormatting: boolean
  isImageTransferring: boolean
}

type Actions = {
  setResultFailedStatus: (status: boolean) => void
  setImageFormattingStatus: (status: boolean) => void
  setImageTransferringStatus: (status: boolean) => void
  setResultImageSrc: (resultImageSrc: string) => void
  resetResultImageStates: () => void
}

type Computed = {
  computed: {
    isImageLoading: boolean
  }
}

const initialState: State = {
  resultImageSrc: '',
  isResultFailed: false,
  isImageFormatting: false,
  isImageTransferring: false,
}

export const useResultImageStore = create<State & Actions & Computed>((set, get) => ({
  ...initialState,

  setResultFailedStatus: (isResultFailed) => set({ isResultFailed }),
  setImageFormattingStatus: (isImageFormatting) => set({ isImageFormatting }),
  setImageTransferringStatus: (isImageTransferring) => set({ isImageTransferring }),
  setResultImageSrc: (resultImageSrc) => set({ resultImageSrc }),
  resetResultImageStates: () => set(initialState),

  computed: {
    get isImageLoading() {
      return get().isImageFormatting || get().isImageTransferring
    },
  },
}))
