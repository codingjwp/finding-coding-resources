import { Suspense } from 'react'
import ChannelChartSkeleton from '@/components/channel-chart-skeleton'
import ChannelInfoSkeleton from '@/components/channel-info-skeleton'
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
      <Suspense fallback={<ChannelInfoSkeleton />}>
        <ChannelInfo id={params.code} />
      </Suspense>
      <Suspense fallback={<ChannelChartSkeleton />}>
        <ChannelChartGroups id={params.code} />
      </Suspense>
    </>
  )
}
