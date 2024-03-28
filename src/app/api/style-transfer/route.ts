import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_HOPTER_URL}/api/v1/services/style-transfer-explorer/predictions`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_HOPTER_API_KEY}`,
      },
      body: JSON.stringify(body),
    }
  )
  if (result.status === 200) {
    const data = await result.json()
    return NextResponse.json(data)
  } else {
    const errorMessage = await result.text()
    return NextResponse.json(errorMessage, { status: result.status })
  }
}
