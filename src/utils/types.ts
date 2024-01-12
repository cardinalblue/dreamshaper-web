export type StyleModelType = {
  id: string
  name: string
  src: string
  promotion?: {
    title: string
    description: string
    srcPrefix: string
  }
  config: Record<string, any>
}
