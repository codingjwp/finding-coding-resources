import styles from '@/styles/dashboards/description.module.css'

type DescriptionProps = {
  title: string
  publishedAt: string
  description: string
}

export default function Description({
  title,
  publishedAt,
  description,
}: DescriptionProps) {
  function dateFommater(date: string) {
    const localDate = new Date(date)
    return localDate.toLocaleDateString('ko-Kr')
  }

  return (
    <article className={styles.descriptionContainer}>
      <strong className={styles.descriptionTitle}>{title}</strong>
      <p>
        생성일자 : <time>{dateFommater(publishedAt)}</time>
      </p>
      <details>
        <summary>채널설명</summary>
        <pre className={styles.descriptionDetail}>
          {description === '' ? '채널 설명이 존재하지 않습니다.' : description}
        </pre>
      </details>
    </article>
  )
}
