import type { Metadata } from 'next'
import '@/app/globals.css'
import { Amplitude } from '@/components/providers/Amplitude'
import { GoogleAnalytics } from '@/components/providers/GoogleAnalytics'

const TITLE = 'AI Photo Style Transformer | Free & Easy-to-Use'
const DESCRIPTION =
  'Instantly elevate your photos with our AI style transfer - a free online tool for magical image transformations. Experience the art of AI-driven photo styling in seconds.'
const SITE_URL = `https://${
  (process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production' && process.env.NEXT_PUBLIC_VERCEL_URL) ||
  'www.photostyle.ai'
}`
const IMAGE_URL = `${SITE_URL}/og_image.png`

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
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [IMAGE_URL],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#CFA258" />
      <meta name="msapplication-TileColor" content="#CFA258" />
      <meta name="theme-color" content="#ffffff" />
      <GoogleAnalytics />
      <body>
        {children}
        <Amplitude />
      </body>
    </html>
  )
}
