import { ErrorMsg, VideosInfo } from 'APITypes'
import { Suspense } from 'react'
import ChannelChartSkeleton from '@/components/channel-chart-skeleton'
import ChannelChartGroups from '@/app/dashboard/[code]/_compoennts/channel-chart-groups'

async function getBarChart(id: string) {
  try {
    const res = await fetch(`${process.env.FETCH_URL!}/api/chart/${id}`)
    if (!res.ok) {
      const error = (await res.json()) as ErrorMsg
      throw error
    }
    const data = (await res.json()) as {
      view: VideosInfo
      rating: VideosInfo
      latest: VideosInfo
    }
    return data
  } catch (error: unknown) {
    throw error as Error
  }
}

export default async function ChannelChartPage({
  params,
}: {
  params: { code: string }
}) {
  const { view, rating, latest } = await getBarChart(params.code)

  return (
    <Suspense fallback={<ChannelChartSkeleton />}>
      <ChannelChartGroups view={view} rating={rating} latest={latest} />
    </Suspense>
  )
}
