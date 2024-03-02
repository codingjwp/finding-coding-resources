import styles from '@/styles/rootPage.module.css'
import { BannerTypes, ErrorMsg } from 'APITypes'
import Avatar from '@/components/avatar'

export const revalidate = 0

async function getBanners() {
  try {
    const res = await fetch('http://localhost:3000/api/banner')
    if (!res.ok) {
      const error = (await res.json()) as ErrorMsg
      throw error
    }
    const data = (await res.json()) as BannerTypes[]
    return data
  } catch (error: unknown) {
    throw error as Error
  }
}

export default async function RootPage() {
  const banners = await getBanners()
  return (
    <main className={styles.rootMain}>
      {banners &&
        banners.map((banner) => (
          <Avatar
            key={banner.id}
            type="banner"
            avatarImg={{
              url: banner.url,
              width: +banner.width,
              height: +banner.height,
              alt: banner.title,
            }}
            href={`/dashboard/${banner.id}`}
            naming={banner.title}
          />
        ))}
    </main>
  )
}
