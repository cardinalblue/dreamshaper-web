export const STYLE_LIST = [
  {
    id: 'watercolor',
    name: 'Watercolor',
    config: {
      prompt:
        'highly detailed watercolor painting, clean brush stroke in beautiful colors, illustration, digital art, concept art, paint on canvas, masterpiece, extreme high quality, sharp focus, professional, 4k, max detail, highres, high detail, smooth, aesthetic, extremely detailed, 8k, uhd',
      negative_prompt:
        'blurry, abstract, disfigured, deformed, cartoon, animated, toy, figure, framed, 3d, badly drawn hands, nude, cartoon, bad art, poorly drawn, extra limb, close up, b&w, weird colors, watermark, blur haze',
      num_inference_steps: 8,
      strength: 0.5,
      guidance_scale: 10,
      max_dim_of_input: 768,
      controlnet_conditioning_scale: 1,
      face_mask_threshold: 0.98,
    },
  },
  {
    id: 'neon_light',
    name: 'Neon Light',
    config: {
      prompt: 'neon lighting, late night street light',
      negative_prompt:
        'blurry, abstract, disfigured, deformed, cartoon, animated, toy, figure, framed, 3d, badly drawn hands, nude, cartoon, bad art, poorly drawn, extra limb, close up, weird colors, watermark, blur haze, white face, red lip, red face, red cheek',
      num_inference_steps: 8,
      strength: 0.9,
      guidance_scale: 10,
    },
  },
  {
    id: 'pencil_sketching',
    name: 'Pencil Sketching',
    config: {
      prompt: 'pencil sketching, black and white, sketch by 6B pencil',
      negative_prompt:
        'blurry, abstract, disfigured, deformed, cartoon, animated, toy, figure, framed, 3d, badly drawn hands, nude, cartoon, bad art, poorly drawn, extra limb, close up, weird colors, watermark, blur haze',
      num_inference_steps: 8,
      strength: 0.9,
      guidance_scale: 10,
    },
  },
  {
    id: 'cg_digital_painting',
    name: 'CG Digital Painting',
    config: {
      prompt:
        'extremely high quality digital painting, illustration, famous artwork from artstation, concept art for video games',
      negative_prompt:
        'blurry, abstract, disfigured, deformed, cartoon, animated, toy, figure, framed, 3d, badly drawn hands, nude, cartoon, bad art, poorly drawn, extra limb, close up, weird colors, watermark, blur haze, red face, red cheek, white face',
      num_inference_steps: 8,
      strength: 0.9,
      guidance_scale: 10,
    },
  },
  {
    id: 'vector',
    name: 'Vector',
    config: {
      prompt: 'vector art, flat color, high quality illustration',
      negative_prompt:
        'blurry, abstract, disfigured, deformed, cartoon, animated, toy, figure, framed, 3d, badly drawn hands, nude, cartoon, bad art, poorly drawn, extra limb, close up, weird colors, watermark, blur haze, red face, red cheek, white face',
      num_inference_steps: 8,
      strength: 0.9,
      guidance_scale: 10,
    },
  },
  {
    id: 'christmas_vibes',
    name: 'Christmas Vibes',
    config: {
      prompt:
        'extremely high quality digital painting, illustration, famous artwork from artstation, concept art for video games',
      negative_prompt:
        'blurry, abstract, disfigured, deformed, cartoon, animated, toy, figure, framed, 3d, badly drawn hands, nude, cartoon, bad art, poorly drawn, extra limb, close up, weird colors, watermark, blur haze, red face, red cheek, white face',
      num_inference_steps: 8,
      strength: 0.9,
      guidance_scale: 10,
    },
  },
]
