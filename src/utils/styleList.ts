const MAX_INPUT_SIZE = 768

export const STYLE_LIST_HIGHLIGHT = [
  {
    id: 'watercolor',
    name: 'Watercolor',
    src: '/images/effects/watercolor.png',
    promotion: {
      title: 'Make your family portrait even more special with AI watercolor style',
      description:
        'Transform your family portraits into timeless watercolor paintings with the magic of AI-style, bringing warmth and artistry to your cherished memories.',
      src: '/images/effects/watercolor-promo.png',
    },
    config: {
      prompt:
        'highly detailed watercolor painting, clean brush stroke in beautiful colors, illustration, digital art, concept art, paint on canvas, masterpiece, extreme high quality, sharp focus, professional, 4k, max detail, highres, high detail, smooth, aesthetic, extremely detailed, 8k, uhd',
      negative_prompt:
        'blurry, abstract, disfigured, deformed, cartoon, animated, toy, figure, framed, 3d, badly drawn hands, nude, cartoon, bad art, poorly drawn, extra limb, close up, b&w, weird colors, watermark, blur haze',
      num_inference_steps: 8,
      strength: 0.8,
      guidance_scale: 10,
      max_dim_of_input: MAX_INPUT_SIZE,
      controlnet_conditioning_scale: 1,
      face_mask_threshold: 0.98,
    },
  },
]

export const STYLE_LIST_REST = [
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
      max_dim_of_input: MAX_INPUT_SIZE,
      controlnet_conditioning_scale: 0.8,
      face_mask_threshold: 0.98,
    },
  },
  {
    id: 'holiday-outfit',
    name: 'Holiday Outfit',
    src: '/images/effects/holiday-outfit.png',
    config: {
      prompt: 'wearing red Christmas Santa hat, Elevated and elegant, stylish green jumper photo',
      negative_prompt:
        'blurry, abstract, disfigured, deformed, cartoon, animated, toy, figure, framed, 3d, badly drawn hands, nude, cartoon, bad art, poorly drawn, extra limb, close up, weird colors, watermark, blur haze, red face, red cheek, white face',
      num_inference_steps: 8,
      strength: 1,
      guidance_scale: 9,
      max_dim_of_input: MAX_INPUT_SIZE,
      controlnet_conditioning_scale: 1,
      face_mask_threshold: 0.98,
    },
  },
  {
    id: 'silent-night',
    name: 'Silent Night',
    src: '/images/effects/silent-night.png',
    config: {
      prompt:
        'Watercolor, Christmas in starry night, moonlight scene, faint, thin Christmas decorations, starry skies, night sky',
      negative_prompt:
        'blurry, abstract, disfigured, deformed, cartoon, animated, toy, figure, framed, 3d, badly drawn hands, nude, cartoon, bad art, poorly drawn, extra limb, close up, weird colors, watermark, blur haze, red face, red cheek, white face',
      num_inference_steps: 8,
      strength: 1,
      guidance_scale: 10,
      max_dim_of_input: MAX_INPUT_SIZE,
      controlnet_conditioning_scale: 1,
      face_mask_threshold: 0.98,
    },
  },

  {
    id: 'white-christmas',
    name: 'White Christmas',
    src: '/images/effects/white-christmas.png',
    config: {
      prompt: 'Winter snow, winter wonderland, snowflakes, white snow vibes, winter hues',
      negative_prompt:
        'blurry, abstract, disfigured, deformed, cartoon, animated, toy, figure, framed, 3d, badly drawn hands, nude, cartoon, bad art, poorly drawn, extra limb, close up, weird colors, watermark, blur haze, red face, red cheek, white face',
      num_inference_steps: 8,
      strength: 1,
      guidance_scale: 10,
      max_dim_of_input: MAX_INPUT_SIZE,
      controlnet_conditioning_scale: 1,
      face_mask_threshold: 0.98,
    },
  },
  {
    id: 'christmas-vibes',
    name: 'Xmas Vibes',
    src: '/images/effects/christmas-vibes.png',
    config: {
      prompt:
        'Acrylic painting style, Christmas vibes, Christmas scene, Christmas theme, Christmas lighting, Christmas decoration',
      negative_prompt:
        'blurry, abstract, disfigured, deformed, cartoon, animated, toy, figure, framed, 3d, badly drawn hands, nude, cartoon, bad art, poorly drawn, extra limb, close up, weird colors, watermark, blur haze, red face, red cheek, white face',
      num_inference_steps: 8,
      strength: 0.9,
      guidance_scale: 10,
      max_dim_of_input: MAX_INPUT_SIZE,
      controlnet_conditioning_scale: 1,
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
      max_dim_of_input: MAX_INPUT_SIZE,
      controlnet_conditioning_scale: 1,
      face_mask_threshold: 0.98,
    },
  },
  {
    id: 'posterize',
    name: 'Posterize',
    src: '/images/effects/posterize.png',
    config: {
      prompt: 'Vibrant, flat color, high quality poster art',
      negative_prompt:
        'blurry, abstract, disfigured, deformed, cartoon, animated, toy, figure, framed, 3d, badly drawn hands, nude, cartoon, bad art, poorly drawn, extra limb, close up, weird colors, watermark, blur haze, red face, red cheek, white face',
      num_inference_steps: 8,
      strength: 0.5,
      guidance_scale: 10,
      max_dim_of_input: MAX_INPUT_SIZE,
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
      max_dim_of_input: MAX_INPUT_SIZE,
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
      max_dim_of_input: MAX_INPUT_SIZE,
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
      max_dim_of_input: MAX_INPUT_SIZE,
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
      strength: 1,
      guidance_scale: 10,
      max_dim_of_input: MAX_INPUT_SIZE,
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
      max_dim_of_input: MAX_INPUT_SIZE,
      controlnet_conditioning_scale: 1,
      face_mask_threshold: 0.98,
    },
  },
  // {
  //   id: 'cartoon-highlight',
  //   name: 'Cartoon Highlight',
  //   src: '/images/effects/watercolor.png',
  //   config: {
  //     prompt:
  //       'vector art, flat color, high quality illustration, dynamic action, energetic character, cityscape background, cartoon FX elements, fiery explosion, colorful splash, electric flash, action lines, movement blur, clear outlines',
  //     negative_prompt:
  //       'blurry, abstract, disfigured, deformed, animated, toy, figure, framed, 3D, badly drawn hands, nude, bad art, poorly drawn, extra limb, close up, weird colors, watermark, blur haze, red face, red cheek, white face',
  //     num_inference_steps: 10,
  //     strength: 0.6,
  //     guidance_scale: 10,
  //     max_dim_of_input: MAX_INPUT_SIZE,
  //     controlnet_conditioning_scale: 1,
  //     face_mask_threshold: 0.98,
  //   },
  // },
  // {
  //   id: 'ancient',
  //   name: 'Ancient',
  //   src: '/images/effects/watercolor.png',
  //   config: {
  //     prompt:
  //       'Tarot style, mystical moonlight scenes, gorgeous mystical scene, exquisite decorative borders, elemental landscapes, gemstone palette, ancient gold style',
  //     negative_prompt:
  //       'blurry, abstract, disfigured, deformed, cartoon, animated, toy, figure,framed, 3d, badly drawn hands, nude, cartoon, bad art, poorly drawn, extra limb,close up, weird colors, watermark, blur haze, red face, red cheek, white face',
  //     num_inference_steps: 8,
  //     strength: 1,
  //     guidance_scale: 10,
  //     max_dim_of_input: MAX_INPUT_SIZE,
  //     controlnet_conditioning_scale: 1,
  //     face_mask_threshold: 0.98,
  //   },
  // },
  // {
  //   id: 'ukiyo-e',
  //   name: 'Ukiyo-e',
  //   src: '/images/effects/watercolor.png',
  //   config: {
  //     prompt: 'Ukiyo-e Japanese art, low contrast, woodblock prints, thin border',
  //     negative_prompt:
  //       'blurry, abstract, disfigured, deformed, cartoon, animated, toy, figure,framed, 3d, badly drawn hands, nude, cartoon, bad art, poorly drawn, extra limb,close up, weird colors, watermark, blur haze, red face, red cheek, white face',
  //     num_inference_steps: 8,
  //     strength: 1,
  //     guidance_scale: 10,
  //     max_dim_of_input: MAX_INPUT_SIZE,
  //     controlnet_conditioning_scale: 1,
  //     face_mask_threshold: 0.98,
  //   },
  // },
  // {
  //   id: 'andy-warhol',
  //   name: 'Andy Warhol',
  //   src: '/images/effects/watercolor.png',
  //   config: {
  //     prompt:
  //       'Andy Warhol style, pop art, strong bright colors, abstract expressionism, color blocks',
  //     negative_prompt:
  //       'blurry, abstract, disfigured, deformed, cartoon, animated, toy, figure,framed, 3d, badly drawn hands, nude, cartoon, bad art, poorly drawn, extra limb,close up, weird colors, watermark, blur haze, red face, red cheek, white face',
  //     num_inference_steps: 8,
  //     strength: 1,
  //     guidance_scale: 10,
  //     max_dim_of_input: MAX_INPUT_SIZE,
  //     controlnet_conditioning_scale: 1,
  //     face_mask_threshold: 0.98,
  //   },
  // },
  // {
  //   id: 'nostalgic',
  //   name: 'Nostalgic',
  //   src: '/images/effects/watercolor.png',
  //   config: {
  //     prompt:
  //       'nostalgic art, retro aesthetics, bright colors, oil painting, granulated, vintage, faded elegance',
  //     negative_prompt:
  //       'blurry, abstract, disfigured, deformed, cartoon, animated, toy, figure,framed, 3d, badly drawn hands, nude, cartoon, bad art, poorly drawn, extra limb,close up, weird colors, watermark, blur haze, red face, red cheek, white face',
  //     num_inference_steps: 8,
  //     strength: 1,
  //     guidance_scale: 10,
  //     max_dim_of_input: MAX_INPUT_SIZE,
  //     controlnet_conditioning_scale: 1,
  //     face_mask_threshold: 0.98,
  //   },
  // },
  // {
  //   id: 'color-festival',
  //   name: 'Color Festival',
  //   src: '/images/effects/watercolor.png',
  //   config: {
  //     prompt:
  //       'psychedelic color, vibrant color, super colorful tone, beautiful pastel coloring, colorful ink, coloring ink leaks from edge, pastel dreaming coloring',
  //     negative_prompt:
  //       'blurry, abstract, disfigured, deformed, cartoon, animated, toy, figure,framed, 3d, badly drawn hands, nude, cartoon, bad art, poorly drawn, extra limb,close up, weird colors, watermark, blur haze, red face, red cheek, white face',
  //     num_inference_steps: 8,
  //     strength: 1,
  //     guidance_scale: 10,
  //     max_dim_of_input: MAX_INPUT_SIZE,
  //     controlnet_conditioning_scale: 1,
  //     face_mask_threshold: 0.98,
  //   },
  // },
  // {
  //   id: 'vector',
  //   name: 'Vector',
  //   src: '/images/effects/watercolor.png',
  //   config: {
  //     prompt: 'vector art, flat color, high quality illustration',
  //     negative_prompt:
  //       'blurry, abstract, disfigured, deformed, cartoon, animated, toy, figure, framed, 3d, badly drawn hands, nude, cartoon, bad art, poorly drawn, extra limb, close up, weird colors, watermark, blur haze, red face, red cheek, white face',
  //     num_inference_steps: 8,
  //     strength: 0.9,
  //     guidance_scale: 10,
  //     max_dim_of_input: MAX_INPUT_SIZE,
  //     controlnet_conditioning_scale: 1,
  //     face_mask_threshold: 0.98,
  //   },
  // },
]
