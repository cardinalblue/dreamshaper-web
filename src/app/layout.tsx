import type { Metadata } from 'next'
import '@/app/globals.css'

import RecoilProvider from './RecoilProvider'

export const metadata: Metadata = {
  title: 'Dreamshaper Demo Site',
  description: '',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RecoilProvider>{children}</RecoilProvider>
      </body>
    </html>
  )
}
