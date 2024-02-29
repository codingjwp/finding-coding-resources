import { ErrorMsg, ChannelsInfo, VideosInfo } from 'APITypes'

export const revalidate = 0

type DashboardParams = {
  params: {
    code: string
  }
}

async function getDashBoard(id: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/channel/${id}`)
    if (!res.ok) {
      const error = (await res.json()) as ErrorMsg
      throw error
    }
    const data = (await res.json()) as {
      mainDescription: ChannelsInfo
      view: VideosInfo
      rating: VideosInfo
      latest: VideosInfo
    }
    return data
  } catch (error: unknown) {
    throw error as Error
  }
}

export default async function DashBoardPage({ params }: DashboardParams) {
  const { mainDescription, view, rating, latest } = await getDashBoard(
    params.code,
  )
  return (
    <section style={{ color: 'white', fontSize: '2rem' }}>
      {JSON.stringify(mainDescription)}
    </section>
  )
}
