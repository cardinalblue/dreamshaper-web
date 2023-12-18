export const compressImage = (file: File, quality: number = 0.5, maxSize = 1080): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const img = new Image()
      img.src = reader.result as string
      img.onload = () => {
        // resize image first
        let width = img.naturalWidth || img.width
        let height = img.naturalHeight || img.height
        // set max width or height to maxSize
        const currentMaxSize = Math.max(width, height)
        if (currentMaxSize > maxSize) {
          const ratio = maxSize / currentMaxSize
          width = width * ratio
          height = height * ratio
        }
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        // add white bg to canvas
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, width, height)
        ctx.drawImage(img, 0, 0, width, height)
        canvas.toBlob(
          (blob) => {
            const newFile = new File([blob as Blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            })
            resolve(newFile)
          },
          'image/jpeg',
          quality
        )
      }
      img.onerror = (error) => {
        reject(error)
      }
    }
  })
}

export const addWhiteBgToPngImage = (file: File): Promise<File> => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const img = new Image()
      img.src = reader.result as string
      img.onload = () => {
        const width = img.naturalWidth || img.width
        const height = img.naturalHeight || img.height
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        // add white bg to canvas
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, width, height)
        ctx.drawImage(img, 0, 0, width, height)
        canvas.toBlob((blob) => {
          const newFile = new File([blob as Blob], file.name, {
            type: 'image/jpeg', // convert to jpeg cause the file size is smaller
            lastModified: Date.now(),
          })
          resolve(newFile)
        }, 'image/jpeg')
      }
    }
  })
}

export const processHeicFile = async (file: File) => {
  const heic2any = require('heic2any') // loaded on client side only
  const outputBlob = (await heic2any({
    blob: new Blob([file], { type: file.type }),
    toType: 'image/jpeg',
    quality: 1,
  })) as Blob
  return new File([outputBlob], file.name, {
    type: outputBlob.type,
    lastModified: Date.now(),
  })
}

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
    reader.onabort = (error) => reject(error)
  })
}

export const getImageDimensionsFromBase64 = (
  base64: string
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = base64
    img.onload = () => {
      const width = img.naturalWidth || img.width
      const height = img.naturalHeight || img.height
      resolve({ width, height })
    }
  })
}
