import { Suspense } from 'react'
import ChartSkeleton from '@/components/chart-skeleton'
import ChannelInfo from './components/channel-info'
import ChannelChartGroups from './components/channel-chart-groups'

export const revalidate = 0

type DashboardParams = {
  params: {
    code: string
  }
}

export default function DashBoardPage({ params }: DashboardParams) {
  return (
    <>
      <ChannelInfo id={params.code} />
      <Suspense fallback={<ChartSkeleton />}>
        <ChannelChartGroups id={params.code} />
      </Suspense>
    </>
  )
}
