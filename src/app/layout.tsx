import type { Metadata } from 'next'
import '@/app/globals.css'
import { Amplitude } from '@/components/providers/Amplitude'
import { GoogleAnalytics } from '@/components/providers/GoogleAnalytics'

const TITLE = 'AI Photo Style Transformer | Free & Easy-to-Use'
const DESCRIPTION =
  'Instantly elevate your photos with our AI style transfer - a free online tool for magical image transformations. Experience the art of AI-driven photo styling in seconds.'
const SITE_URL = 'https://photostyle.ai'
const IMAGE_URL = 'https://photostyle.ai/og.png'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: TITLE,
    images: [{ url: IMAGE_URL }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: TITLE,
    description: DESCRIPTION,
    images: [IMAGE_URL],
  },
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
