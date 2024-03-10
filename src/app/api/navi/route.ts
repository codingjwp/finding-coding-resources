import { ChannelsInfo } from 'APITypes'
import { NextResponse } from 'next/server'

export const revalidate = 3600 * 24

export async function GET() {
  const response = await fetch(process.env.CHANNEL_URL!)
  if (!response.ok) {
    return NextResponse.json(
      { message: 'Failed to Navigation Data. ' },
      { status: 400 },
    )
  }
  const { channels } = (await response.json()) as { channels: ChannelsInfo[] }
  const data = channels.map((channel) => {
    return {
      id: channel.id,
      title: channel.title,
      customUrl: channel.customUrl,
      url: channel.thumbnails.default.url,
      width: channel.thumbnails.default.width,
      height: channel.thumbnails.default.height,
    }
  })
  return NextResponse.json(data)
}
