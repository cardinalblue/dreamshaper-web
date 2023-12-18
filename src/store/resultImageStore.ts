import { create } from 'zustand'
import {
  getImageDimensionsFromBase64,
  fileToBase64,
  processHeicFile,
  compressImage,
  handlePngImageBackground,
} from '@/utils/imageHelper'
import { useUserImageStore } from './userImageStore'
import { StyleModelType } from '@/utils/types'
import { ampShowTransferResult } from '@/utils/eventTracking'
import { IMAGE_MAX_SIZE } from '@/utils/constants'

type State = {
  resultImageSrcList: Record<string, string> // base64 string
  isResultFailed: boolean
  isImageFormatting: boolean
  isImageTransferring: boolean
}

type Actions = {
  setResultFailedStatus: (status: boolean) => void
  setImageFormattingStatus: (status: boolean) => void
  setImageTransferringStatus: (status: boolean) => void
  setResultImageSrc: (styleId: string, src: string) => void
  resetResultImageStates: () => void

  getImageData: (file: File) => Promise<string | undefined>
  handleStyleTransfer: (image: string, style: StyleModelType, signal?: AbortSignal) => Promise<void>
}

type Computed = {
  computed: {
    isImageLoading: boolean
    resultImageSrc: string
  }
}

const initialState: State = {
  resultImageSrcList: {},
  isResultFailed: false,
  isImageFormatting: false,
  isImageTransferring: false,
}

export const useResultImageStore = create<State & Actions & Computed>((set, get) => ({
  ...initialState,

  setResultFailedStatus: (isResultFailed) => set({ isResultFailed }),
  setImageFormattingStatus: (isImageFormatting) => set({ isImageFormatting }),
  setImageTransferringStatus: (isImageTransferring) => set({ isImageTransferring }),
  setResultImageSrc: (styleId, src) =>
    set((state) => ({ resultImageSrcList: { ...state.resultImageSrcList, [styleId]: src } })),
  resetResultImageStates: () => set(initialState),

  getImageData: async (file: File) => {
    const { setOriginalImageData } = useUserImageStore.getState()
    if (!file) return
    try {
      get().setImageFormattingStatus(true)
      if (file.type === 'image/heic') {
        file = await processHeicFile(file)
      }
      // compress image if size > 1MB
      if (file.size > IMAGE_MAX_SIZE) {
        file = await compressImage(file)
      } else if (file.type === 'image/png') {
        // make sure png image has white background
        file = await handlePngImageBackground(file)
      }
      const base64Image = await fileToBase64(file)
      const size = await getImageDimensionsFromBase64(base64Image)
      setOriginalImageData({
        originalImageSrc: base64Image,
        originalImageDimensions: size,
      })
      return base64Image
    } catch (error) {
      console.debug('Image processing error', error)
      get().setResultFailedStatus(true)
    } finally {
      get().setImageFormattingStatus(false)
    }
  },

  handleStyleTransfer: async (image: string, style: StyleModelType, signal?: AbortSignal) => {
    if (get().resultImageSrcList[style.id]) return

    try {
      get().setImageTransferringStatus(true)
      const config = style.config
      const initial_image_b64 = image ?? ''
      const res = await fetch('/api/style-transfer', {
        method: 'POST',
        body: JSON.stringify({ input: { initial_image_b64, config } }),
        signal,
      })
      const data = await res.json()
      const newImage = data.output.stylized_image_b64
      get().setResultImageSrc(style.id, newImage)
      ampShowTransferResult(style.id)
    } catch (error) {
      console.debug('transfer error', error)
      get().setResultFailedStatus(true)
    } finally {
      get().setImageTransferringStatus(false)
    }
  },

  computed: {
    get isImageLoading() {
      return get().isImageFormatting || get().isImageTransferring
    },
    get resultImageSrc() {
      const { selectedStyle } = useUserImageStore.getState()
      if (!selectedStyle?.id) return ''
      return get().resultImageSrcList[selectedStyle.id] ?? ''
    },
  },
}))
