import { STYLE_TRANSFER_MAX_INPUT_SIZE } from './constants'

export const STYLE_LIST_HIGHLIGHT = [
  {
    id: 'watercolor',
    name: 'Watercolor',
    src: '/images/effects/watercolor.png',
    promotion: {
      title: 'Make your family portrait even more special',
      description:
        'Turn family photos into heirloom-quality watercolor art, infusing warmth and timeless beauty into every memory.',
      srcPrefix: 'watercolor-promo',
    },
    config: {
      prompt:
        'highly detailed watercolor painting, clean brush stroke in beautiful colors, illustration',
      negative_prompt:
        'blurry, abstract, disfigured, deformed, cartoon, animated, toy, figure, framed, 3d, badly drawn hands, nude, cartoon, bad art, poorly drawn, extra limb, close up, b&w, weird colors, watermark, blur haze',
      num_inference_steps: 8,
      strength: 0.8,
      guidance_scale: 10,
      max_dim_of_input: STYLE_TRANSFER_MAX_INPUT_SIZE,
      controlnet_conditioning_scale: 1,
      face_mask_threshold: 0.98,
    },
  },
]

export const STYLE_LIST_REST = [
  {
    id: 'posterize',
    name: 'Posterize',
    src: '/images/effects/posterize.png',
    config: {
      prompt:
        'concept art, digital artwork, illustrative, painterly, matte painting, highly detailed',
      negative_prompt:
        'blurry, abstract, disfigured, deformed, cartoon, animated, toy, figure, framed, 3d, badly drawn hands, nude, cartoon, bad art, poorly drawn, extra limb, close up, weird colors, watermark, blur haze, red face, red cheek, white face',
      num_inference_steps: 8,
      strength: 0.8,
      guidance_scale: 10,
      max_dim_of_input: STYLE_TRANSFER_MAX_INPUT_SIZE,
      controlnet_conditioning_scale: 1,
      face_mask_threshold: 0.98,
    },
  },
  {
    id: 'cartoon',
    name: 'Cartoon',
    src: '/images/effects/cartoon.png',
    config: {
      prompt: 'cartoon artwork, anime style++, key visual, vibrant, studio anime, highly detailed',
      negative_prompt:
        'blurry, abstract, disfigured, deformed, toy, figure, framed, 3d, badly drawn hands, nude, bad art, poorly drawn, extra limb, close up, weird colors, watermark, blur haze, white face, red lip, red face, red cheek',
      num_inference_steps: 8,
      strength: 0.9,
      guidance_scale: 10,
      max_dim_of_input: STYLE_TRANSFER_MAX_INPUT_SIZE,
      controlnet_conditioning_scale: 1,
      face_mask_threshold: 0.98,
    },
  },
  {
    id: 'impressionism',
    name: 'Impressionism',
    src: '/images/effects/impressionism.png',
    config: {
      prompt: "acrylic painting style, Van Gogh's painting",
      negative_prompt:
        'blurry, abstract, disfigured, deformed, cartoon, animated, toy, figure, framed, 3d, badly drawn hands, nude, cartoon, bad art, poorly drawn, extra limb, close up, weird colors, watermark, blur haze, red face, red cheek, white face',
      num_inference_steps: 8,
      strength: 0.9,
      guidance_scale: 10,
      max_dim_of_input: STYLE_TRANSFER_MAX_INPUT_SIZE,
      controlnet_conditioning_scale: 1,
      face_mask_threshold: 0.98,
    },
  },
  {
    id: 'digital-painting',
    name: 'Digital Painting',
    src: '/images/effects/digital-painting.png',
    config: {
      prompt:
        'concept art, digital artwork, illustrative, painterly, matte painting, highly detailed',
      negative_prompt:
        'blurry, abstract, disfigured, deformed, cartoon, animated, toy, figure, framed, 3d, badly drawn hands, nude, cartoon, bad art, poorly drawn, extra limb, close up, weird colors, watermark, blur haze, red face, red cheek, white face',
      num_inference_steps: 8,
      strength: 0.8,
      guidance_scale: 10,
      max_dim_of_input: STYLE_TRANSFER_MAX_INPUT_SIZE,
      controlnet_conditioning_scale: 1,
      face_mask_threshold: 0.98,
    },
  },
  {
    id: 'neon',
    name: 'Neon',
    src: '/images/effects/neon.png',
    config: {
      prompt: 'neon lighting, late night street light',
      negative_prompt:
        'blurry, abstract, disfigured, deformed, cartoon, animated, toy, figure, framed, 3d, badly drawn hands, nude, cartoon, bad art, poorly drawn, extra limb, close up, weird colors, watermark, blur haze, white face, red lip, red face, red cheek',
      num_inference_steps: 8,
      strength: 0.9,
      guidance_scale: 10,
      max_dim_of_input: STYLE_TRANSFER_MAX_INPUT_SIZE,
      controlnet_conditioning_scale: 1,
      face_mask_threshold: 0.98,
    },
  },
  {
    id: 'pencil-sketching',
    name: 'Sketching',
    src: '/images/effects/pencil-sketching.png',
    config: {
      prompt:
        'Sketch by black charcoal pencil sketching+++, thick and rough black and white lines and contours, noticeable charcoal marks, with Mad Charcoal style, black and white photo',
      negative_prompt:
        'blurry, abstract, disfigured, deformed, cartoon, animated, toy, figure, framed, 3d, badly drawn hands, nude, cartoon, bad art, poorly drawn, extra limb, close up, weird colors, watermark, blur haze',
      num_inference_steps: 8,
      strength: 1,
      guidance_scale: 10,
      max_dim_of_input: STYLE_TRANSFER_MAX_INPUT_SIZE,
      controlnet_conditioning_scale: 1,
      face_mask_threshold: 0.98,
    },
  },
  {
    id: 'glowing-lights',
    name: 'Glowing Lights',
    src: '/images/effects/glowing-lights.png',
    config: {
      prompt:
        'Santa card, beautiful acrylic painting, festive Christmas market at night, colorful stalls, carousel lights, holiday shopping, market magic, little snow, fairy tale town, Christmas Town hall with lights, less snowing, holiday festival, watercolor splash',
      negative_prompt:
        'blurry, abstract, disfigured, deformed, cartoon, animated, toy, figure, framed, 3d, badly drawn hands, nude, cartoon, bad art, poorly drawn, extra limb, close up, weird colors, watermark, blur haze, red face, red cheek, white face',
      num_inference_steps: 12,
      strength: 0.9,
      guidance_scale: 10,
      max_dim_of_input: STYLE_TRANSFER_MAX_INPUT_SIZE,
      controlnet_conditioning_scale: 0.8,
      face_mask_threshold: 0.98,
    },
  },
  {
    id: 'silent-night',
    name: 'Silent Night',
    src: '/images/effects/silent-night.png',
    config: {
      prompt:
        'watercolor, Christmas in starry night, moonlit magic, star shinny, Christmas enchantment, fairy magical, beautiful lights, stars in the late night sky',
      negative_prompt:
        'blurry, abstract, disfigured, deformed, cartoon, animated, toy, figure, framed, 3d, badly drawn hands, nude, cartoon, bad art, poorly drawn, extra limb, close up, weird colors, watermark, blur haze, red face, red cheek, white face',
      num_inference_steps: 8,
      strength: 1,
      guidance_scale: 6,
      max_dim_of_input: STYLE_TRANSFER_MAX_INPUT_SIZE,
      controlnet_conditioning_scale: 0.8,
      face_mask_threshold: 0.98,
    },
  },
  {
    id: 'celebration',
    name: 'Celebration',
    src: '/images/effects/celebration.png',
    config: {
      prompt:
        'glitter, sparkles, confetti, kira kira, shinny spark, celebration, glimmer, glare effect',
      negative_prompt:
        'blurry, abstract, disfigured, deformed, cartoon, animated, toy, figure,framed, 3d, badly drawn hands, nude, cartoon, bad art, poorly drawn, extra limb,close up, weird colors, watermark, blur haze, red face, red cheek, white face',
      num_inference_steps: 8,
      strength: 0.8,
      guidance_scale: 10,
      max_dim_of_input: STYLE_TRANSFER_MAX_INPUT_SIZE,
      controlnet_conditioning_scale: 1,
      face_mask_threshold: 0.98,
    },
  },
]

export const DEFAULT_STYLE = STYLE_LIST_HIGHLIGHT[0]
