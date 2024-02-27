import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/channel.module.css'

type ChannelProps = {
  title: string
  check: boolean
  url: string
  src: string
}

export default function Channel({ title, check, url, src }: ChannelProps) {
  return (
    <li className={styles.channel}>
      <Link className={`${styles.channelCover}`} href={url}>
        <Image
          className={`${styles.channelAvatar}  ${check && styles.avatarCheck}`}
          src={src}
          width={32}
          height={32}
          alt={title}
          loading="lazy"
        />
        <span className={styles.channelTitle}>{title}</span>
      </Link>
    </li>
  )
}
