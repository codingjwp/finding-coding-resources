import { ReactNode } from 'react'
import styles from '@/styles/dashboardPage.module.css'

export function generateMetadata() {
  return {
    title: 'Channels | Dashboard',
  }
}

export default async function Layout({
  children,
  channelInfo,
  channelChart,
}: {
  children: ReactNode
  channelInfo: ReactNode
  channelChart: ReactNode
}) {
  return (
    <main className={styles.dashboardLayout}>
      {children}
      {channelInfo}
      {channelChart}
    </main>
  )
}
