'use client'

import { useRef } from 'react'
import { css, cva } from '@styled-system/css'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

export const Navbar = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isAtTheTop = useIntersectionObserver({ ref })

  return (
    <>
      <div ref={ref}></div>
      <div className={navbar({ showShadow: !isAtTheTop })}>
        <div className={logo}></div>
      </div>
    </>
  )
}

const navbar = cva({
  base: {
    position: 'fixed',
    top: 0,
    w: '100%',
    h: '64px',
    m: '0 auto',
    py: '12px',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    bgColor: '#faf6ec',
    zIndex: 10,
    transition: 'all 0.2s',
    willChange: 'box-shadow',
  },
  variants: {
    showShadow: {
      true: {
        boxShadow: '0px 10px 20px 0px rgba(52, 52, 52, 0.10)',
      },
    },
  },
})

const logo = css({
  w: '220px',
  h: '32px',
  bg: 'url(/images/logo.png) no-repeat center / contain',
})
