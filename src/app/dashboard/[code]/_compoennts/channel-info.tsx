import { ErrorMsg, ChannelsInfo } from 'APITypes'
import styles from '@/styles/dashboardPage.module.css'
import Avatar from '@/components/avatar'
import ChannelSatistics from './channel-statistics'
import ChannelDescription from './channel-description'

async function getDashBoard(id: string) {
  try {
    const res = await fetch(`${process.env.FETCH_URL!}/api/channel/${id}`)
    if (!res.ok) {
      const error = (await res.json()) as ErrorMsg
      throw error
    }
    const data = (await res.json()) as { mainDescription: ChannelsInfo }
    return data
  } catch (error: unknown) {
    throw error as Error
  }
}

export default async function ChannelInfo({ id }: { id: string }) {
  const { mainDescription } = await getDashBoard(id)
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
