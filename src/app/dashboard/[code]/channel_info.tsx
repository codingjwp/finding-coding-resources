import { ErrorMsg, ChannelsInfo } from 'APITypes'
import Image from 'next/image'
import styles from '@/styles/dashboardPage.module.css'
import Avatar from '@/components/avatar'

async function getDashBoard(id: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/channel/${id}`)
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
  function dateFommater(date: string) {
    const localDate = new Date(date)
    return localDate.toLocaleDateString('ko-Kr')
  }

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
          <article
            className={`${styles.dashboardDescription} ${styles.itemPadding}`}
          >
            <strong className={styles.descriptionTitle}>
              {mainDescription.title}
            </strong>
            <p>
              생성일자 :{' '}
              <time>{dateFommater(mainDescription.publishedAt)}</time>
            </p>
            <details>
              <summary>채널설명</summary>
              <pre className={`${styles.descriptionDetail}`}>
                {mainDescription.description}
              </pre>
            </details>
          </article>
        </>
      )}
    </section>
  )
}
