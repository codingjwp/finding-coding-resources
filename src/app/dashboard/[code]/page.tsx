import { ErrorMsg, ChannelsInfo, VideosInfo } from 'APITypes'
import Image from 'next/image'
import styles from '@/styles/dashboardPage.module.css'

export const revalidate = 0

type DashboardParams = {
  params: {
    code: string
  }
}

async function getDashBoard(id: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/channel/${id}`)
    if (!res.ok) {
      const error = (await res.json()) as ErrorMsg
      throw error
    }
    const data = (await res.json()) as {
      mainDescription: ChannelsInfo
      view: VideosInfo
      rating: VideosInfo
      latest: VideosInfo
    }
    return data
  } catch (error: unknown) {
    throw error as Error
  }
}

function dateFommater(date: string) {
  const localDate = new Date(date)
  return localDate.toLocaleDateString('ko-Kr')
}

export default async function DashBoardPage({ params }: DashboardParams) {
  const { mainDescription, view, rating, latest } = await getDashBoard(
    params.code,
  )
  return (
    <section className={styles.dashboardSection}>
      {mainDescription && (
        <>
          <div className={`${styles.dashboardCover} ${styles.itemPadding}`}>
            <Image
              className={styles.dashboardImage}
              src={mainDescription.thumbnails.default.url}
              width={64}
              height={64}
              alt={mainDescription.title}
            />
            <h3>{mainDescription.customUrl || '@userNotFound'}</h3>
          </div>
          <article className={`${styles.dashboardMain} ${styles.itemPadding}`}>
            <strong className={styles.dashboardTitle}>
              {mainDescription.title}
            </strong>
            <p>
              생성일자 :{' '}
              <time>{dateFommater(mainDescription.publishedAt)}</time>
            </p>
            <details>
              <summary>채널설명</summary>
              <pre className={`${styles.dashboardDescript}`}>
                {mainDescription.description}
              </pre>
            </details>
          </article>
        </>
      )}
    </section>
  )
}
