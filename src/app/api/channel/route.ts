type ErrorTypes = {
  error: {
    code: string
    message: string
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const res = await fetch('', {
    headers: {
      'Content-type': 'applicationjson',
    },
  })
  if (!res.ok) {
    const { error } = (await res.json()) as ErrorTypes
    throw error
  }
  const data = await res.json()
}
