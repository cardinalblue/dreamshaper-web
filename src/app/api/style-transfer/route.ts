import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const result = await fetch(
    'https://us-central1-ai-prediction-proxy-ym7mfxvq5a-uc.a.run.app/vertex_ai/630699660901613568',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  )
  if (result.status === 200) {
    // If success, send back the url for the new multiplayer project
    const data = await result.json()
    return Response.json(data)
  } else {
    throw Error(result.statusText)
  }
}
