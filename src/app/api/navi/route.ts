import { ChannelsInfo } from 'APITypes'

export async function GET() {
  const response = await fetch(process.env.CHANNEL_URL!)
  if (!response.ok) {
    return Response.json({
      status: 400,
      error: {
        message: 'Failed to Channel Data. ',
      },
    })
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
  return Response.json(data)
}
