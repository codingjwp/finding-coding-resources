import styles from '@/styles//dashboards/skeleton.module.css'

export default function Loading() {
  return (
    <div className={styles.cover}>
      {[...Array(3)].map((_, bgIndex) => (
        <div key={bgIndex} className={styles.graphSkeleton}>
          {[...Array(9)].map((_, barIndex) => (
            <div
              key={barIndex}
              className={`${styles.graphBarSkeleton} ${styles.gradientAnimation}`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  )
}
