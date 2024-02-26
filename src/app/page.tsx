import Icon, { IconNames } from '@/components/icon'
import styles from '@/styles/rootPage.module.css'
import Link from 'next/link'
import { logoNames } from '@/utils/logoName'

export default function Home() {
  return (
    <main className={styles.rootMain}>
      {logoNames.map((item) => {
        const title = item.split('-')
        return (
          <Link key={item} href={`/dashboard/${title[0]}`}>
            <Icon
              name={item as IconNames}
              className={styles.bannerIcon}
              childrenClassName={styles.rootMainBanner}
            >
              {title[0]}
            </Icon>
          </Link>
        )
      })}
      ;
    </main>
  )
}
