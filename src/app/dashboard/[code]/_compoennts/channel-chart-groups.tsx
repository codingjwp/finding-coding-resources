import styles from '@/styles/dashboardPage.module.css'
import BarGraph from '@/components/bargraph'
import { ErrorMsg, VideosInfo } from 'APITypes'
import ChannelYoutube from './channel-youtube'

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

export default async function ChannelChartGroups({ id }: { id: string }) {
  const { view, rating, latest } = await getBarChart(id)

  return (
    <>
      <section className={styles.dashboardBarChart}>
        <BarGraph titie="조회순" barData={view} />
        <BarGraph titie="추천순" barData={rating} />
        <BarGraph titie="댓글순" barData={latest} />
      </section>
      <section className={styles.dashboardVideo}>
        {latest?.videoInfo?.map((item, index) => {
          if (index > 2) return null
          return <ChannelYoutube key={item.videoId} videoId={item.videoId} />
        })}
      </section>
    </>
  )
}
