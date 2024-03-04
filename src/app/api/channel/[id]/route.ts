import { ChannelsInfo } from 'APITypes'

export const revalidate = 3600 * 24

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const res = await fetch(process.env.CHANNEL_URL!)

  if (!res.ok) {
    return Response.json({
      status: 400,
      error: {
        message: 'Failed to Dashboard Data.',
      },
    })
  }
  const data1 = (await res.json()) as { channels: ChannelsInfo[] }

  const mainDescription = data1.channels.find(
    (channel) => channel.id === params.id,
  )

  return Response.json({ mainDescription })
}
