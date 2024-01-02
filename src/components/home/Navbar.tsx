'use client'

import { css } from '@styled-system/css'

export const Navbar = () => {
  return (
    <div className={navbar}>
      <div className={logo}></div>
    </div>
  )
}

const navbar = css({
  h: '64px',
  m: '0 auto',
  py: '12px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const logo = css({
  w: '221px',
  h: '33px',
  mt: '2px',
  bg: 'url(/images/logo.png) no-repeat center / contain',
})
