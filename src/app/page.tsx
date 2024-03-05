import styles from '@/styles/rootPage.module.css'
import { BannerTypes, ErrorMsg } from 'APITypes'
import Avatar from '@/components/avatar'

async function getBanners() {
  try {
    const res = await fetch(`${process.env.FETCH_URL!}/api/banner`)
    if (!res.ok) {
      const error = (await res.json()) as ErrorMsg
      throw new Error(error.message)
    }
    const data = (await res.json()) as BannerTypes[]
    return data
  } catch (error: unknown) {
    throw new Error((error as Error).message)
  }
}

export default async function Page() {
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
