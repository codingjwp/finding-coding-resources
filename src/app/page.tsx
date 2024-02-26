import Icon, { IconNames } from '@/components/icon'
import styles from '@/styles/rootPage.module.css'
import Link from 'next/link'

const logoNames = [
  'html-logo',
  'css-logo',
  'js-logo',
  'ts-logo',
  'react-logo',
  'angular-logo',
  'vue-logo',
  'svelte-logo',
  'next-logo',
  'nuxt-logo',
  'redux-logo',
  'recoil-logo',
]

export default function Home() {
  return (
    <main className={styles.rootMain}>
      {logoNames.map((item) => {
        const title = item.split('-')
        return (
          <Link
            key={item}
            className={styles.rootMainLink}
            href={`/dashboard/${title[0]}`}
          >
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
