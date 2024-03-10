import { ChannelsInfo } from 'APITypes'
import { NextResponse } from 'next/server'

export const revalidate = 3600 * 24

export async function GET() {
  const response = await fetch(process.env.CHANNEL_URL!)

  if (!response.ok) {
    return NextResponse.json(
      { message: 'Failed to Channel Banner Data. ' },
      { status: 400 },
    )
  }
  const { channels } = (await response.json()) as { channels: ChannelsInfo[] }
  const data = channels.map((channel) => {
    return {
      id: channel.id,
      title: channel.title,
      url: channel.thumbnails.medium.url,
      width: channel.thumbnails.medium.width,
      height: channel.thumbnails.medium.height,
    }
  })
  return NextResponse.json(data)
}
