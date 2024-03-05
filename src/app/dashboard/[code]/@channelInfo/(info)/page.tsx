import { ErrorMsg, ChannelsInfo } from 'APITypes'
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
      throw new Error(error.message)
    }
    const data = (await res.json()) as { mainDescription: ChannelsInfo }
    return data
  } catch (error: unknown) {
    throw new Error((error as Error).message)
  }
}

export default async function Page({ params }: { params: { code: string } }) {
  const { mainDescription } = await getDashBoard(params.code)

  return <ChannelInfo mainDescription={mainDescription} />
}
