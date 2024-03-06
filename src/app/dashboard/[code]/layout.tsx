import { ReactNode } from 'react'
import styles from '@/styles/dashboards/dashboard.module.css'

export function generateMetadata() {
  return {
    title: 'Channels | Dashboard',
  }
}

export default async function Layout({
  children,
  info,
  statisticsVideo,
}: {
  children: ReactNode
  info: ReactNode
  statisticsVideo: ReactNode
}) {
  return (
    <main className={styles.dashboardContainer}>
      {children}
      {info}
      {statisticsVideo}
    </main>
  )
}
