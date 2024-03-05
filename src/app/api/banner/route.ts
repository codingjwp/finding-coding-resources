import { ChannelsInfo } from 'APITypes'

export const revalidate = 3600 * 24

export async function GET() {
  const response = await fetch(process.env.CHANNEL_URL!)

  if (!response.ok) {
    return Response.json(
      { message: 'Failed to Channel Data. ' },
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
  return Response.json(data)
}
