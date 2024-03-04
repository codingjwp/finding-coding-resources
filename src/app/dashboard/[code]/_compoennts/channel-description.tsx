import styles from '@/styles/dashboardPage.module.css'

type ChannelDescriptionProps = {
  title: string
  publishedAt: string
  description: string
}

export default function ChannelDescription({
  title,
  publishedAt,
  description,
}: ChannelDescriptionProps) {
  function dateFommater(date: string) {
    const localDate = new Date(date)
    return localDate.toLocaleDateString('ko-Kr')
  }

  return (
    <article className={`${styles.dashboardDescription} ${styles.itemPadding}`}>
      <strong className={styles.descriptionTitle}>{title}</strong>
      <p>
        생성일자 : <time>{dateFommater(publishedAt)}</time>
      </p>
      <details>
        <summary>채널설명</summary>
        <pre className={`${styles.descriptionDetail}`}>
          {description === '' ? '채널 설명이 존재하지 않습니다.' : description}
        </pre>
      </details>
    </article>
  )
}
