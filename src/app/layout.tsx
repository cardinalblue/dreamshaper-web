import type { Metadata } from 'next'
import '@/app/globals.css'
import { Amplitude } from '@/components/providers/Amplitude'
import { GoogleAnalytics } from '@/components/providers/GoogleAnalytics'

export const metadata: Metadata = {
  title: 'Image Style Transfer',
  description: '',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <GoogleAnalytics />
      <body>
        {children}
        <Amplitude />
      </body>
    </html>
  )
}
