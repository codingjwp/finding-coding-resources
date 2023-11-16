
import { ReactNode } from 'react'
import { RecoilRoot, atom, } from 'recoil'

export type ToastStateProps = {
  isOpen: boolean,
  context: string,
  timer: number
}

export const toastState = atom<ToastStateProps>({
  key: 'toastState',
  default: {
    isOpen: false,
    context: '',
    timer: 0
  }
})

type ReactChildren = {
  children: ReactNode
}

const RecoilProvider = ({children}: ReactChildren) => {
  return (
    <RecoilRoot>
      {children}
    </RecoilRoot>
  )
}

export default RecoilProvider;