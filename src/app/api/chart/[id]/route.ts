import { VideosInfo } from 'APITypes'

export const revalidate = 3600 * 24

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const res = await fetch(process.env.VIDEOS_URL!)

  if (!res.ok) {
    return Response.json({
      status: 400,
      error: { message: 'Failed to Dashboard Data.' },
    })
  }
  const data = (await res.json()) as {
    views: VideosInfo[]
    rating: VideosInfo[]
    latest: VideosInfo[]
  }
  const view = data.views.find((view) => view.channelId === params.id)
  const rating = data.rating.find((rating) => rating.channelId === params.id)
  const latest = data.latest.find((latest) => latest.channelId === params.id)

  return Response.json({ view, rating, latest })
}
