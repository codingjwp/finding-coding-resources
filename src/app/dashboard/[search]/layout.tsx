import { ReactNode } from 'react'
import Navbar from '@/components/navbar'
import type { Metadata } from 'next'
import styles from '@/styles/dashboardPage.module.css'

export function generateMetadata({
  params,
}: {
  params: { search: string }
}): Metadata {
  const dashboard = params.search.toUpperCase()
  return {
    title: `${dashboard} | Dashboard`,
  }
}

export default function DashboardLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { search: string }
}) {
  return (
    <main className={styles.dashboardLayout}>
      <Navbar params={params.search} />
      {children}
    </main>
  )
}
