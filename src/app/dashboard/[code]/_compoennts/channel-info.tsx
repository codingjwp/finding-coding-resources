import { ChannelsInfo } from 'APITypes'
import styles from '@/styles/dashboardPage.module.css'
import Avatar from '@/components/avatar'
import ChannelSatistics from './channel-statistics'
import ChannelDescription from './channel-description'

export default async function ChannelInfo({
  mainDescription,
}: {
  mainDescription: ChannelsInfo
}) {
  return (
    <section className={styles.dashboardSection}>
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
          <ChannelSatistics {...mainDescription.statistics} />
          <ChannelDescription
            title={mainDescription.title}
            publishedAt={mainDescription.publishedAt}
            description={mainDescription.description}
          />
        </>
      )}
    </section>
  )
}
