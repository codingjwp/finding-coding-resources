import { ReactNode } from 'react'
import Navbar from '@/components/navbar'
import styles from '@/styles/dashboardPage.module.css'
import { ErrorMsg, NavigationTypes } from 'APITypes'

export function generateMetadata() {
  return {
    title: 'Channels | Dashboard',
  }
}

async function getNavi() {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}api/navi`)
    if (!res.ok) {
      const error = (await res.json()) as ErrorMsg
      throw error
    }
    const data = (await res.json()) as NavigationTypes[]
    return data
  } catch (error: unknown) {
    throw error as Error
  }
}

export default async function DashboardLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { code: string }
}) {
  const navis = await getNavi()
  const channel = navis.find((navi) => navi.id === params.code)
  return (
    <main className={styles.dashboardLayout}>
      <Navbar
        title={channel!.customUrl === '' ? channel!.title : channel!.customUrl}
        navGroups={navis}
      />
      {children}
    </main>
  )
}
