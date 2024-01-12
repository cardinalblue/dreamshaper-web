'use client'

import { useEffect, useMemo, useState } from 'react'
import { css, cx } from '@styled-system/css'
import * as Slider from '@radix-ui/react-slider'
import { useUserImageStore, useResultImageStore } from '@/store'
import { Button } from '@/components/Button'
import { AccordionArrowIcon } from '@/components/icons/AccordionArrowIcon'
import { STYLE_TRANSFER_DEFAULT_CONFIG } from '@/utils/constants'

export const PromptPanel = () => {
  const [inputText, setInputText] = useState('')
  const [strength, setStrength] = useState(STYLE_TRANSFER_DEFAULT_CONFIG.strength)
  const [isAccordionOpen, setIsAccordionOpen] = useState(false)
  const [contentHeight, setContentHeight] = useState(0)
  const [isMobileLayout, setIsMobileLayout] = useState(false)

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

  const updateContentHeight = () => {
    const contentEl = document.getElementById('prompt-panel-content')
    if (contentEl) {
      setContentHeight(contentEl.clientHeight)
    }
  }

  const onToggleAccordion = () => {
    if (!isMobileLayout) {
      return
    }
    setIsAccordionOpen((prev) => {
      const next = !prev
      if (next) {
        updateContentHeight()
      } else {
        setContentHeight(0)
      }
      return next
    })
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobileLayout(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className={container}>
      <div
        className={cx(title, accordionTrigger)}
        data-accordion-status={isAccordionOpen ? 'open' : 'close'}
        onClick={onToggleAccordion}
      >
        Style Prompt
        {isMobileLayout && <AccordionArrowIcon />}
      </div>
      <div className={contentOuter} style={{ height: isMobileLayout ? contentHeight : 'auto' }}>
        <div className={content} id="prompt-panel-content">
          <textarea
            className={textareaStyle}
            cols={30}
            rows={3}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          ></textarea>
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
      </div>
    </div>
  )
}

const container = css({
  w: '100%',
  p: '12px 20px',
  bgColor: '#FBFBF9',
  rounded: '20px',

  md: {
    p: '16px 20px',
  },
})

const contentOuter = css({
  overflow: 'hidden',
  transition: 'all 0.3s',
})

const content = css({
  display: 'flex',
  flexDirection: 'column',
})

const title = css({
  fontWeight: 600,
  mb: '6px',
})

const accordionTrigger = css({
  mb: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: 'all 0.3s',
  cursor: 'pointer',
  '& svg': {
    transition: 'all 0.3s',
  },
  "&[data-accordion-status='open']": {
    mb: '6px',
    '& svg': {
      transform: 'rotate(180deg)',
    },
  },
  md: {
    mb: '6px',
    cursor: 'default',
  },
})

const textareaStyle = css({
  display: 'block',
  minH: '100px',
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

  md: {
    minH: 'auto',
  },
})

const controls = css({
  w: '100%',
  mt: '12px',
  pb: '5px',
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
  boxShadow: '0 0 5px #777',
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
