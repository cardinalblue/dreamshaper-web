import { cva } from '@styled-system/css'
import { styled } from '@styled-system/jsx'

export const buttonRecipe = cva({
  base: {
    width: 'fit-content',
    rounded: '14px',
    lineHeight: '1.2',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    flexShrink: 0,

    transition: 'all 0.2s',
    userSelect: 'none',
    cursor: 'pointer',
  },
  variants: {
    theme: {
      light: {
        color: '#FAFAFA',
        bgColor: '#CFA258',
        _hover: {
          bgColor: '#C58C2F',
        },
      },
      dark: {
        color: '#FAFAFA',
        bgColor: '#3C3C44',
        '&:not([data-disabled]):hover': {
          bgColor: '#60606C',
        },
        _disabled: {
          cursor: 'not-allowed',
          bgColor: '#AEAEB7',
        },
      },
    },
    size: {
      sm: {
        p: '8px 18px',
        fontSize: '16px',
        fontWeight: '600',
      },
      md: {
        p: '14px 24px',
        fontSize: '18px',
        fontWeight: 'bold',
      },
    },
    content: {
      icon: {
        w: '48px',
        h: '48px',
        md: {
          w: 'auto',
          h: 'auto',
          p: '14px 24px',
        },
        '& > svg': {
          flexShrink: 0,
        },
        '& .text': {
          display: 'none',
          md: {
            display: 'block',
          },
        },
      },
    },
  },
  defaultVariants: {
    theme: 'light',
    size: 'md',
  },
})

export const Button = styled('div', buttonRecipe)
