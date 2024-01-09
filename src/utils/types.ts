export type StyleModelType = {
  id: string
  name: string
  src: string
  promotion?: {
    title: string
    description: string
    src: string
  }
  config: Record<string, any>
}
