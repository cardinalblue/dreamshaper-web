'use client'

import { css } from '@styled-system/css'
import { StylePreviewSection } from '@/components/StylePreviewSection'
import { STYLE_LIST } from '@/utils/constants'

export default function Home() {
  return (
    <div className={container}>
      <div className={listWrapper}>
        {STYLE_LIST.map((el) => (
          <StylePreviewSection key={el.id} id={el.id} name={el.name} />
        ))}
      </div>
    </div>
  )
}

const container = css({
  p: '32px 72px 72px',
})

const listWrapper = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '32px',
})
