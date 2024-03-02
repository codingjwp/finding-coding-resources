import styles from '@/styles/chart-skeleton.module.css'

export default function ChartSkeleton() {
  return (
    <div className={styles.cover}>
      {[...Array(3)].map((_, bgIndex) => (
        <div key={bgIndex} className={styles.graphSkeleton}>
          {[...Array(9)].map((_, barIndex) => (
            <div key={barIndex} className={styles.graphBarSkeleton}></div>
          ))}
        </div>
      ))}
    </div>
  )
}
