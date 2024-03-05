import { ErrorMsg, VideosInfo } from 'APITypes'
import ChannelChartGroups from '@/app/dashboard/[code]/_compoennts/channel-chart-groups'

async function getBarChart(id: string) {
  try {
    const res = await fetch(`${process.env.FETCH_URL!}/api/chart/${id}`)
    if (!res.ok) {
      const error = (await res.json()) as ErrorMsg
      throw new Error(error.message)
    }
    const data = (await res.json()) as {
      view: VideosInfo
      rating: VideosInfo
      latest: VideosInfo
    }
    return data
  } catch (error: unknown) {
    throw new Error((error as Error).message)
  }
}

export default async function Page({ params }: { params: { code: string } }) {
  const { view, rating, latest } = await getBarChart(params.code)

  return <ChannelChartGroups view={view} rating={rating} latest={latest} />
}
