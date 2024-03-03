import styles from '@/styles/channel-youtube.module.css'

type ChannelYoutubeProps = {
  videoId: string
}

export default function ChannelYoutube({ videoId }: ChannelYoutubeProps) {
  return (
    <div className={styles.youtubeContainer}>
      <iframe
        className={styles.youtubeVideo}
        src={`${process.env.YOUTUBE_IFRAME_URL}${videoId}`}
        title="YouTube video player"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      />
    </div>
  )
}
