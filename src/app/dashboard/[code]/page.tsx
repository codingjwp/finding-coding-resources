import { ErrorMsg, NavigationTypes } from 'APITypes'
import Navbar from '@/components/navbar'

async function getNavi() {
  try {
    const res = await fetch(`${process.env.FETCH_URL!}/api/navi`)
    if (!res.ok) {
      const error = (await res.json()) as ErrorMsg
      throw error
    }
    const data = (await res.json()) as NavigationTypes[]
    return data
  } catch (error: unknown) {
    throw error as Error
  }
}

export default async function DashBoardPage({
  params,
}: {
  params: { code: string }
}) {
  const navis = await getNavi()
  const channel = navis.find((navi) => navi.id === params.code)
  return (
    <Navbar
      title={
        channel?.customUrl === ''
          ? channel?.title || 'notfound'
          : channel?.customUrl || 'notfound'
      }
      navGroups={navis}
    />
  )
}
