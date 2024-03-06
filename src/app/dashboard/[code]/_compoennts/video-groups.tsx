import { VideosInfo } from 'APITypes'
import styles from '@/styles/dashboards/statistics-video.module.css'
import IframeVideo from '@/components/iframe-video'

export default function VideoGroups({ latest }: { latest: VideosInfo }) {
  return (
    <section className={styles.youtubeVideo}>
      {latest?.videoInfo?.map((item, index) => {
        if (index > 2) return null
        return <IframeVideo key={item.videoId} videoId={item.videoId} />
      })}
    </section>
  )
}
