export const IMAGE_MAX_SIZE = 1024 * 1024 // 1MB

export const IOS_APP_LINK =
  'https://apps.apple.com/tw/app/snapjoy-ai-christmas-camera/id6474116921?l=en-GB'

export const STYLE_TRANSFER_MAX_INPUT_SIZE = 768
export const STYLE_TRANSFER_DEFAULT_CONFIG = {
  prompt: '',
  negative_prompt:
    'blurry, abstract, disfigured, deformed, cartoon, animated, toy, figure, framed, 3d, badly drawn hands, nude, cartoon, bad art, poorly drawn, extra limb, close up, b&w, weird colors, watermark, blur haze',
  num_inference_steps: 8,
  strength: 0.8,
  guidance_scale: 10,
  max_dim_of_input: STYLE_TRANSFER_MAX_INPUT_SIZE,
  controlnet_conditioning_scale: 1,
  face_mask_threshold: 0.98,
}
