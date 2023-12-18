'use client'

import { useEffect, useRef } from 'react'
import Script from 'next/script'
import { usePathname } from 'next/navigation'
import * as gtag from '@/utils/gtag'

export const GoogleAnalytics = () => {
  const pathname = usePathname() // Get current route
  // Save pathname on component mount into a ref
  const savedPathNameRef = useRef(pathname)

  // WORKAROUND: router.events is removed in Next.js app router, so we can't use that to track route changes
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      return
    }

    const handleRouteChange = (url: URL) => {
      gtag.pageview(url)
    }

    if (savedPathNameRef.current !== pathname) {
      handleRouteChange(new URL(pathname, window.location.origin))
      // Update ref
      savedPathNameRef.current = pathname
    }
  }, [pathname])

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`} />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${gtag.GA_TRACKING_ID}');
        `}
      </Script>
    </>
  )
}
