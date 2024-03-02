import { Suspense } from 'react'
import ChartSkeleton from '@/components/chart-skeleton'
import ChannelInfo from './channel_info'
import ChartGroups from './chart-groups'

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
        <ChartGroups id={params.code} />
      </Suspense>
    </>
  )
}
