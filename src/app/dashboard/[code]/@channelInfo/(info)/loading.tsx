import styles from '@/styles/skeleton.module.css'

export default function Loading() {
  return (
    <div className={styles.skeletonWrapper}>
      <div className={styles.avatarWrapper}>
        <div className={`${styles.avatar} ${styles.gradientAnimation}`}></div>
        <div className={`${styles.username} ${styles.gradientAnimation}`}></div>
      </div>
      <div className={styles.statisicsWrapper}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`${styles.statisics} ${styles.gradientAnimation}`}
          ></div>
        ))}
      </div>
      <div className={styles.descriptionWrapper}>
        <div className={`${styles.title} ${styles.gradientAnimation}`}></div>
        <div className={`${styles.publishedAt}`}>
          <div className={styles.gradientAnimation}></div>
          <div className={styles.gradientAnimation}></div>
        </div>
        <div className={`${styles.detail} ${styles.gradientAnimation}`}></div>
      </div>
    </div>
  )
}
