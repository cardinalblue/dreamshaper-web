'use client'

import { useEffect, useMemo, useState } from 'react'
import { css } from '@styled-system/css'
import * as Slider from '@radix-ui/react-slider'
import { useUserImageStore, useResultImageStore } from '@/store'
import { Button } from '@/components/Button'
import { STYLE_TRANSFER_DEFAULT_CONFIG } from '@/utils/constants'

export const PromptPanel = () => {
  const [inputText, setInputText] = useState('')
  const [strength, setStrength] = useState(STYLE_TRANSFER_DEFAULT_CONFIG.strength)
  const { selectedStyle, setSelectedStyle } = useUserImageStore()
  const {
    computed: { isImageLoading },
  } = useResultImageStore()

  const hasConfigChanged = useMemo(() => {
    const isInputDiff = inputText.trim() !== selectedStyle?.config?.prompt.trim()
    const isStrengthDiff = strength !== selectedStyle?.config?.strength
    return isInputDiff || isStrengthDiff
  }, [inputText, strength, selectedStyle])

  const onGenerate = () => {
    if (!hasConfigChanged || isImageLoading) {
      return
    }
    const customConfig = {
      id: `custom-${Date.now()}`,
      name: '',
      src: '',
      config: {
        ...STYLE_TRANSFER_DEFAULT_CONFIG,
        prompt: inputText,
        strength,
      },
    }
    setSelectedStyle(customConfig)
  }

  useEffect(() => {
    if (selectedStyle) {
      if (selectedStyle?.config?.prompt) {
        setInputText(selectedStyle.config.prompt)
      }
      if (selectedStyle?.config?.strength) {
        setStrength(selectedStyle.config.strength)
      }
    }
  }, [selectedStyle])

  return (
    <div className={container}>
      <div className={textareaSection}>
        <div className={title}>Style Prompt</div>
        <textarea
          className={textareaStyle}
          cols={30}
          rows={3}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></textarea>
      </div>
      <div className={controls}>
        <div className={sliderSection}>
          <div className={title}>Style Strength</div>
          <div className={sliderWrapper}>
            <Slider.Root
              className={SliderRoot}
              defaultValue={[strength]}
              max={1}
              min={0.3}
              step={0.1}
              value={[strength]}
              onValueChange={(val) => setStrength(val[0])}
            >
              <Slider.Track className={SliderTrack}>
                <Slider.Range className={SliderRange} />
              </Slider.Track>
              <Slider.Thumb className={SliderThumb} aria-label="Volume" />
            </Slider.Root>
            <span>{strength * 100}%</span>
          </div>
        </div>
        <Button
          theme="dark"
          size="sm"
          onClick={onGenerate}
          data-disabled={!hasConfigChanged || isImageLoading ? true : null}
        >
          Generate
        </Button>
      </div>
    </div>
  )
}

const container = css({
  w: '100%',
  h: '260px',
  p: '12px 20px',
  bgColor: '#FBFBF9',
  rounded: '20px',

  display: 'flex',
  flexDirection: 'column',
  gap: '12px',

  md: {
    h: '220px',
    p: '16px 20px',
  },
})

const textareaSection = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  overflow: 'hidden',
})

const title = css({
  fontWeight: 600,
})

const textareaStyle = css({
  w: '100%',
  h: '100%',
  p: '6px 8px',
  bgColor: '#EBEBEB',
  rounded: '8px',
  resize: 'none',
  _focusVisible: {
    outline: 'none',
  },
  '&::-webkit-scrollbar': {
    width: '6px',
    height: '6px',
    bgColor: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    bgColor: '#bbb',
    rounded: '10px',
  },
})

const controls = css({
  w: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
  md: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
})

// slider
const sliderSection = css({
  w: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
})

const sliderWrapper = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
})

const SliderRoot = css({
  flex: 1,
  h: '20px',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',

  userSelect: 'none',
  touchAction: 'none',
  md: {
    maxW: '200px',
  },
})

const SliderTrack = css({
  h: '3px',
  position: 'relative',
  flexGrow: 1,
  rounded: '9999px',
  bgColor: '#aaa',
})

const SliderRange = css({
  position: 'absolute',
  bgColor: '#000',
  rounded: '9999px',
  height: '100%',
})

const SliderThumb = css({
  display: 'block',
  w: '20px',
  h: '20px',
  bgColor: '#fff',
  boxShadow: '0 2px 10px #777',
  rounded: '10px',
  cursor: 'grab',
  _hover: {
    bgColor: 'fff',
  },
  _focus: {
    outline: 'none',
    boxShadow: '0 0 0 5px #cfcfcf97',
    cursor: 'grabbing',
  },
})
