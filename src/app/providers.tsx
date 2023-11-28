'use client'

import { initAmplitude } from '@/utils/eventTracking'
import { useEffect } from 'react'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // initialze amplitude
    initAmplitude()
  }, [])

  return <>{children}</>
}
