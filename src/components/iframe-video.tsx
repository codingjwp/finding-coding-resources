import styles from '@/styles/iframe-video.module.css'

type IframeVideoProps = {
  videoId: string
}

export default function IframeVideo({ videoId }: IframeVideoProps) {
  return (
    <div className={styles.ifranmeContainer}>
      <iframe
        className={styles.ifranmeVideo}
        src={`${process.env.YOUTUBE_IFRAME_URL!}${videoId}`}
        title="YouTube video player"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      />
    </div>
  )
}
