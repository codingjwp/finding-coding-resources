import { ChannelsInfo, VideosInfo } from 'APITypes'

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const [res1, res2] = await Promise.all([
    fetch(process.env.CHANNEL_URL!),
    fetch(process.env.VIDEOS_URL!),
  ])

  if (!res1.ok || !res2.ok) {
    return Response.json({
      status: 400,
      error: {
        message: 'Failed to Dashboard Data.',
      },
    })
  }
  const [data1, data2] = await Promise.all<
    [
      Promise<{ channels: ChannelsInfo[] }>,
      Promise<{
        views: VideosInfo[]
        rating: VideosInfo[]
        latest: VideosInfo[]
      }>,
    ]
  >([res1.json(), res2.json()])
  const mainDescription = data1.channels.find(
    (channel) => channel.id === params.id,
  )
  const view = data2.views.find((view) => view.channelId === params.id)
  const rating = data2.rating.find((rating) => rating.channelId === params.id)
  const latest = data2.latest.find((latest) => latest.channelId === params.id)

  return Response.json({ mainDescription, view, rating, latest })
}
