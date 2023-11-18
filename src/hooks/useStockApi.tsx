import { atom, selectorFamily, useRecoilState  } from 'recoil';
import { useQuery } from '@tanstack/react-query';

type StockInfoData = {
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
  like?: boolean
};

type PageNumData = {
  numOfRows: number;
  pageNo: number;
  totalCount: number;
  items: {
    item: StockInfoData[]
  }
}
type LikeList = string[];

export const stockInfoState = atom<StockInfoData[]>({
  key: 'stockInfoState',
  default: [],
})

export const stockInfoSelector = selectorFamily<StockInfoData[]>({
  key: 'stockInfoSelector',
  set: (info: StockInfoData[]) => ({set}, newValue) => {
    const likeList: LikeList = JSON.parse(localStorage.getItem('likes') as string);
    const newInfo = newValue.map((obj: StockInfoData) => {
      
      if (likeList) {
        if (likeList.includes())
      }
      return {...obj, like: false}
    })
  }
})

export async function stockList() {
  try {
    const response = await fetch('test.json');
    if (!response.ok) throw new Error(`Network Error ${response.status}`);
    const jsonRes = await response.json();
    const { numOfRows, pageNo, totalCount, items}: PageNumData = jsonRes.body;
    const item: StockInfoData[] = items?.item ?? [];
    return {numOfRows, pageNo, totalCount, stockList: item};
  }catch(e:unknown) {
    throw new Error(`Network Error ${((e)as Error).message}`);
  }
}

const useStockApi = (page: number) => {
  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ['stockApi'],
    queryFn: stockList
  });

}