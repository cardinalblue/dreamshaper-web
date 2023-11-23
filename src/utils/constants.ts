const MAX_INPUT_SIZE = 768

export const STYLE_LIST = [
  {
    id: 'watercolor',
    name: 'Watercolor',
    src: '/images/watercolor.png',
    config: {
      prompt:
        'highly detailed watercolor painting, clean brush stroke in beautiful colors, illustration, digital art, concept art, paint on canvas, masterpiece, extreme high quality, sharp focus, professional, 4k, max detail, highres, high detail, smooth, aesthetic, extremely detailed, 8k, uhd',
      negative_prompt:
        'blurry, abstract, disfigured, deformed, cartoon, animated, toy, figure, framed, 3d, badly drawn hands, nude, cartoon, bad art, poorly drawn, extra limb, close up, b&w, weird colors, watermark, blur haze',
      num_inference_steps: 8,
      strength: 0.5,
      guidance_scale: 10,
      max_dim_of_input: MAX_INPUT_SIZE,
      controlnet_conditioning_scale: 1,
      face_mask_threshold: 0.98,
    },
  },
  {
    id: 'neon_light',
    name: 'Neon Light',
    src: '/images/neon_light.png',
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
    id: 'pencil_sketching',
    name: 'Pencil Sketching',
    src: '/images/pencil_sketching.png',
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
  {
    id: 'cg_digital_painting',
    name: 'CG Digital Painting',
    src: '/images/cg_digital_painting.png',
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
    id: 'vector',
    name: 'Vector',
    src: '/images/vector.png',
    config: {
      prompt: 'vector art, flat color, high quality illustration',
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
    id: 'christmas_vibes',
    name: 'Christmas Vibes',
    src: '/images/christmas_vibes.png',
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
    id: 'impressionism',
    name: 'Impressionism',
    src: '/images/christmas_vibes.png',
    config: {
      prompt: "acrylic painting style,  Van Gogh's painting",
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
    id: 'cartoon',
    name: 'Cartoon',
    src: '/images/christmas_vibes.png',
    config: {
      prompt: 'cartoon artwork, anime style++, key visual, vibrant, studio anime,  highly detailed',
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
    id: 'celebration',
    name: 'Celebration',
    src: '/images/christmas_vibes.png',
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
    id: 'color_festival',
    name: 'Color Festival',
    src: '/images/christmas_vibes.png',
    config: {
      prompt:
        'psychedelic color, vibrant color, super colorful tone, beautiful pastel coloring, colorful ink, coloring ink leaks from edge, pastel dreaming coloring',
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
]
