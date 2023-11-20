import { create } from 'zustand'

interface UserImageState {
  styleInfo: {
    id: string
    name: string
    src: string
    config: Record<string, any>
  } | null
  file: File | null
  base64Image: string // base64 string
  setUserImage: (state: {
    styleInfo: UserImageState['styleInfo']
    file: UserImageState['file']
    base64Image: UserImageState['base64Image']
  }) => void
  resetUserImage: () => void
}

export const useUserImageStore = create<UserImageState>((set) => ({
  styleInfo: null,
  file: null,
  base64Image: '',
  setUserImage: ({ styleInfo, file, base64Image }) => set({ styleInfo, file, base64Image }),
  resetUserImage: () => set({ styleInfo: null, file: null, base64Image: '' }),
}))
