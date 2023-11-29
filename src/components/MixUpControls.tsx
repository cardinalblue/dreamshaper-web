import { css } from '@styled-system/css'
import { STYLE_LIST } from '@/utils/styleList'
import { useResultImageStore } from '@/store'

interface MixUpControlsProps {
  handleStyleTransfer: (image: string, style: (typeof STYLE_LIST)[0]) => void
}

export const MixUpControls = ({ handleStyleTransfer }: MixUpControlsProps) => {
  const { resultImageSrc } = useResultImageStore()

  return (
    <div className={container}>
      {STYLE_LIST.map((styleInfo) => (
        <div
          key={styleInfo.id}
          className={styleTag}
          onClick={() => handleStyleTransfer(resultImageSrc, styleInfo)}
        >
          {styleInfo.name}
        </div>
      ))}
    </div>
  )
}

const container = css({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '12px',
})

const styleTag = css({
  rounded: '12px',
  p: '4px 12px',
  bgColor: '#E2DECF',
  cursor: 'pointer',
})
