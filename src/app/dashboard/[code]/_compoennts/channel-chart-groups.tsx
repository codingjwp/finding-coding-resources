import { VideosInfo } from 'APITypes'
import styles from '@/styles/dashboardPage.module.css'
import BarGraph from '@/components/bargraph'
import ChannelYoutube from '@/app/dashboard/[code]/_compoennts/channel-youtube'

export default async function ChannelChartGroups({
  view,
  rating,
  latest,
}: {
  view: VideosInfo
  rating: VideosInfo
  latest: VideosInfo
}) {
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
