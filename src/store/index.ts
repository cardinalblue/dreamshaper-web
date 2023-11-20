import { create } from 'zustand'

interface UserImageState {
  styleInfo: {
    id: string
    name: string
    src: string
    config: Record<string, any>
  } | null
  uploadedImage: string // base64
  setUserImage: (state: {
    styleInfo: UserImageState['styleInfo']
    uploadedImage: UserImageState['uploadedImage']
  }) => void
  resetUserImage: () => void
}

export const useUserImageStore = create<UserImageState>((set) => ({
  styleInfo: null,
  uploadedImage: '',
  setUserImage: ({ styleInfo, uploadedImage }) => set({ styleInfo, uploadedImage }),
  resetUserImage: () => set({ styleInfo: null, uploadedImage: '' }),
}))
