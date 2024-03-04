import { Suspense } from 'react'
import ChannelChartSkeleton from '@/components/channel-chart-skeleton'
import ChannelInfoSkeleton from '@/components/channel-info-skeleton'
import ChannelInfo from './_compoennts/channel-info'
import ChannelChartGroups from './_compoennts/channel-chart-groups'

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
