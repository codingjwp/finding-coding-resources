import { SVGProps } from 'react'

export type IconNames = 'loading' | 'chart'

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
  if (name === 'chart') {
    return (
      <svg {...props} className={className} viewBox="0 -960 960 960">
        <path d="M640-160v-280h160v280H640Zm-240 0v-640h160v640H400Zm-240 0v-440h160v440H160Z" />
      </svg>
    )
  }
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 24"
    >
      <rect width={8} height={24} />
      <rect width={8} height={24} x="12" />
      <rect width={8} height={24} x="24" />
    </svg>
  )
}
