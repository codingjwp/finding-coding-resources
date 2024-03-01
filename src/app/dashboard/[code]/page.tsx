import { ErrorMsg, ChannelsInfo, VideosInfo } from 'APITypes'
import Image from 'next/image'
import styles from '@/styles/dashboardPage.module.css'
import BarGraph from '@/components/bargraph'

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
    <>
      <section className={styles.dashboardSection}>
        {mainDescription && (
          <>
            <div className={`${styles.dashboardCover} ${styles.itemPadding}`}>
              <Image
                className={styles.coverImage}
                src={mainDescription.thumbnails.default.url}
                width={64}
                height={64}
                alt={mainDescription.title}
              />
              <h3 className={styles.coverUser}>
                {mainDescription.customUrl || '@userNotFound'}
              </h3>
            </div>
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
      <section className={styles.dashboardBarChart}>
        <BarGraph titie="조회순" barData={view} />
        <BarGraph titie="추천순" barData={rating} />
        <BarGraph titie="댓글순" barData={latest} />
      </section>
    </>
  )
}
