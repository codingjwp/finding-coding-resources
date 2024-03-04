import Link from 'next/link'
import styles from '@/styles/notfound.module.css'

export default function NotFound() {
  return (
    <div className={styles.notfoundWrapper}>
      <div className={styles.notfoundCover}>
        <h2>404</h2>
        <p>Not Found Page</p>
      </div>
      <Link href="/" className={styles.notfoundLink}>
        Return Home
      </Link>
    </div>
  )
}
