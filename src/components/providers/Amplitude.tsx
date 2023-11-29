'use client'

import { initAmplitude } from '@/utils/amplitude'
import { useEffect } from 'react'

export const Amplitude = () => {
  useEffect(() => {
    // initialze amplitude
    initAmplitude()
  }, [])

  return null
}
