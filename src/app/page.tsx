import styles from '@/styles/rootPage.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { BannerTypes, ErrorMsg } from 'APITypes'

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

export default async function Home() {
  const banners = await getBanners()
  return (
    <main className={styles.rootMain}>
      {banners &&
          banners.map((banner) => {
            return (
              <Link
                className={styles.rootMainBanner}
                key={banner.id}
                href={`/dashboard/${banner.id}`}
              >
                <Image
                  className={styles.bannerImage}
                  src={banner.url}
                  width={Number(banner.width)}
                  height={Number(banner.height)}
                  alt={banner.title}
                  priority={true}
                />
                <span className={styles.rootMainContext}>{banner.title}</span>
              </Link>
            )
          })}
    </main>
  )
}
