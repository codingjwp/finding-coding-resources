import { SVGProps } from 'react'

export type IconNames =
  | 'svelte-logo'
  | 'nuxt-logo'
  | 'recoil-logo'
  | 'react-logo'
  | 'redux-logo'
  | 'vue-logo'
  | 'next-logo'
  | 'css-logo'
  | 'js-logo'
  | 'ts-logo'
  | 'angular-logo'
  | 'html-logo'

type IconProps = {
  name: IconNames
  childrenClassName?: string
} & SVGProps<SVGSVGElement>

export default function Icon({
  name,
  className,
  childrenClassName,
  children,
  ...props
}: IconProps) {
  if (children) {
    return (
      <span className={`${childrenClassName}`}>
        <Icon name={name} className={className} />
        {children}
      </span>
    )
  }

  return (
    <svg {...props} className={`${className}`}>
      <use href={`assets/sprite_logo.svg#${name}`}></use>
    </svg>
  )
}
