
import { ReactNode } from 'react'
import { RecoilRoot, atom, } from 'recoil'

type ToastStateProps = {
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

export type StockInfoData = {
  basDt: string;  // 개시일자
  srtnCd: string; // 코드
  itmsNm: string; // 종목명
  mrktCtg: string; // 시장구분
  vs: string; // 전일 대비
  fltRt: string; // 등락율
  clpr: string; // 종가
  mkp: string; // 시가
  hipr: string; // 고가
  lopr: string; // 저가
  trqu: string; // 거래량
  trPrc: string; // 거래대금
  mrktTotAmt: string; // 시가총액
};

export const stockInfoState = atom<StockInfoData[]>({
  key: 'stockInfoState',
  default: [],
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