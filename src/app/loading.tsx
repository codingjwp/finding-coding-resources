import styles from '@/styles/rootLoading.module.css'
import Icon from '@/components/icon'
export default function Loading() {
  return (
    <div className={styles.loadingWrapper}>
      <Icon name="loading" className={styles.loading} />
    </div>
  )
}
