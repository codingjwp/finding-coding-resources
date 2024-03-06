import { ChannelsInfo } from 'APITypes'
import styles from '@/styles/dashboards/channel-info.module.css'
import Avatar from '@/components/avatar'
import TotalStatistics from '@/app/dashboard/[code]/_compoennts/total-statistics'
import Description from '@/app/dashboard/[code]/_compoennts/description'

export default function ChannelInfo({
  mainDescription,
}: {
  mainDescription: ChannelsInfo
}) {
  return (
    <section className={styles.infoContainer}>
      {mainDescription && (
        <>
          <Avatar
            type="title"
            avatarImg={{
              url: mainDescription.thumbnails.default.url,
              width: 64,
              height: 64,
              alt: mainDescription.title,
            }}
            naming={mainDescription.customUrl || '@userNotFound'}
          />
          <TotalStatistics {...mainDescription.statistics} />
          <Description
            title={mainDescription.title}
            publishedAt={mainDescription.publishedAt}
            description={mainDescription.description}
          />
        </>
      )}
    </section>
  )
}
