'use client'
import styles from '@/styles/navbar.module.css'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className={`${styles.navbar} ${styles.errorContiner}`}>
      <h2>Error</h2>
      <p>{error.message}</p>
      <div className={styles.resetContainer}>
        <button type="button" title="navi_reset" onClick={reset}>
          Try agin
        </button>
      </div>
    </div>
  )
}
