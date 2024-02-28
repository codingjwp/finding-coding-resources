import { ReactNode } from 'react'
import Navbar from '@/components/navbar'
import type { Metadata } from 'next'
import styles from '@/styles/dashboardPage.module.css'

export function generateMetadata({
  params,
}: {
  params: { code: string }
}): Metadata {
  const dashboard = params.code.toUpperCase()
  return {
    title: `${dashboard} | Dashboard`,
  }
}

export default function DashboardLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { code: string }
}) {
  return (
    <main className={styles.dashboardLayout}>
      <Navbar params={params.code} />
      {children}
    </main>
  )
}
