import { ErrorMsg, ChannelsInfo } from 'APITypes'
import { Suspense } from 'react'
import ChannelInfoSkeleton from '@/components/channel-info-skeleton'
import ChannelInfo from '@/app/dashboard/[code]/_compoennts/channel-info'
import { notFound } from 'next/navigation'

async function getDashBoard(id: string) {
  try {
    const res = await fetch(`${process.env.FETCH_URL!}/api/channel/${id}`)
    if (!res.ok) {
      if (res.status === 404) {
        notFound()
      }
      const error = (await res.json()) as ErrorMsg
      throw error
    }
    const data = (await res.json()) as { mainDescription: ChannelsInfo }
    return data
  } catch (error: unknown) {
    throw error as Error
  }
}

export default async function ChannelInfoPage({
  params,
}: {
  params: { code: string }
}) {
  const { mainDescription } = await getDashBoard(params.code)

  return (
    <Suspense fallback={<ChannelInfoSkeleton />}>
      <ChannelInfo mainDescription={mainDescription} />
    </Suspense>
  )
}
