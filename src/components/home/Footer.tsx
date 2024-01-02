'use client'

import { css } from '@styled-system/css'

export const Footer = () => {
  return (
    <div className={container}>
      <div className={inner}></div>
    </div>
  )
}

const container = css({
  bgColor: '#242429',
  height: '500px',
})

const inner = css({
  maxW: '1280px',
  m: '0 auto',
})
