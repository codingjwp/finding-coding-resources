import { SVGProps } from 'react'

export type IconNames =
  | 'svelte'
  | 'nuxt'
  | 'recoil'
  | 'react'
  | 'redux'
  | 'vue'
  | 'next'
  | 'css'
  | 'javascript'
  | 'typescript'
  | 'angular'
  | 'html'
  | 'chart'

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
      <span className={childrenClassName}>
        <Icon name={name} className={className} />
        {children}
      </span>
    )
  }

  return (
    <svg {...props} className={className}>
      <use href={`/sprite_logo.svg#${name}`}></use>
    </svg>
  )
}
