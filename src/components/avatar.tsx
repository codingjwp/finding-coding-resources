import Image from 'next/image'
import Link from 'next/link'

type AvatarProps = {
  type: 'banner' | 'link' | 'title'
  avatarImg: {
    url: string
    width: number
    height: number
    alt: string
  }
  naming?: string
  href?: string
}

export default function Avatar({ type, avatarImg, naming, href }: AvatarProps) {
  if (type === 'link' || type === 'banner') {
    return (
      <Link
        href={{
          pathname: href!,
          query: { chart: 'bar' },
        }}
        scroll={false}
      >
        <Image
          src={avatarImg.url}
          width={avatarImg.width}
          height={avatarImg.height}
          alt={avatarImg.alt}
          priority={type === 'banner' && true}
        />
        {type === 'banner' ? <span>{naming}</span> : naming}
      </Link>
    )
  }

  return (
    <div>
      <Image
        src={avatarImg.url}
        width={avatarImg.width}
        height={avatarImg.height}
        alt={avatarImg.alt}
      />
      <h3>{naming}</h3>
    </div>
  )
}
