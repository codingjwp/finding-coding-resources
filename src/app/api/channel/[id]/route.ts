import { ChannelsInfo } from 'APITypes'
import { NextResponse } from 'next/server'

export const revalidate = 3600 * 24

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const res = await fetch(process.env.CHANNEL_URL!)

  if (!res.ok) {
    return NextResponse.json(
      { message: 'Failed to Dashboard Channel Info Data.' },
      { status: 400 },
    )
  }
  const data1 = (await res.json()) as { channels: ChannelsInfo[] }

  const mainDescription = data1.channels.find(
    (channel) => channel.id === params.id,
  )
  if (!mainDescription) {
    return NextResponse.json({ message: 'Not Found Page' }, { status: 404 })
  }

  return NextResponse.json({ mainDescription })
}
