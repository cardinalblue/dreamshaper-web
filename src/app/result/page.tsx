'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useRecoilState } from 'recoil'
import { uploadedDataState } from '@/app/RecoilProvider'
import { css } from '@styled-system/css'
import { STYLE_LIST } from '@/utils/constants'

export default function Result() {
  const [uploadedData, setUploadedData] = useRecoilState(uploadedDataState)
  const [isLoading, setIsLoading] = useState(false)
  const [resultImage, setResultImage] = useState('')

  const router = useRouter()

  const handleStyleTransfer = async () => {
    try {
      setIsLoading(true)
      const config = STYLE_LIST.find((el) => el.id === uploadedData?.styleId)?.config ?? {}
      const initial_image_b64 = uploadedData?.base64 ?? ''
      const res = await fetch('/api/style-transfer', {
        method: 'POST',
        body: JSON.stringify({ instances: [{ initial_image_b64, config }] }),
      })
      const data = await res.json()
      const newImage = data.predictions[0].stylized_image_b64
      setResultImage(newImage)
    } catch (error) {
      console.debug('error', error)
    } finally {
      setIsLoading(false)
    }
  }

  const onGoBack = () => {
    router.push('/')
  }

  useEffect(() => {
    if (uploadedData) {
      handleStyleTransfer()
    }
    return () => {
      setUploadedData(null) // reset
    }
  }, [])

  return (
    <div className={container}>
      <div onClick={onGoBack} style={{ cursor: 'pointer' }}>
        Back
      </div>
      <div className={resultSection}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className={imageBox} style={{ backgroundImage: `url(${resultImage})` }}></div>
        )}
      </div>
    </div>
  )
}

const container = css({
  minH: '100vh',
  color: '#FAFAFA',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8',
})

const resultSection = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const imageBox = css({
  width: '500px',
  height: '500px',
  bg: 'no-repeat center / contain',
})
