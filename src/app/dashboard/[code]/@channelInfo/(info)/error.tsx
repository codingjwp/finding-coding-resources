'use client'
import styles from '@/styles/errors.module.css'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className={styles.errorContainer}>
      <h2>Error</h2>
      <p>{error.message}</p>
    </div>
  )
}
