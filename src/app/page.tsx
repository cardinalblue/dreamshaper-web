'use client'

import { css } from '@styled-system/css'
import { useEffect } from 'react'
import { HomepageStyleSelector } from '@/components/home/StyleSelector'
import { ampEnterStyleListPage } from '@/utils/eventTracking'
import { Navbar } from '@/components/home/Navbar'
import { HeroSection } from '@/components/home/HeroSection'
import { AppPromotionSm } from '@/components/home/AppPromotionSm'
import { AppPromotionLg } from '@/components/home/AppPromotionLg'
import { HintSection } from '@/components/home/HintSection'
import { Footer } from '@/components/home/Footer'

export default function Home() {
  useEffect(() => {
    ampEnterStyleListPage()
  }, [])

  return (
    <>
      <Navbar />
      <div className={container}>
        <HeroSection />
        <AppPromotionSm />
        <HintSection />
        <HomepageStyleSelector />
        <AppPromotionLg />
        <Footer />
      </div>
    </>
  )
}

const container = css({
  maxW: '1280px',
  mx: 'auto',
  pt: '64px', // navbar height
})
