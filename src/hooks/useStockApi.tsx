import { atom, selectorFamily, useSetRecoilState  } from 'recoil';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

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
type FilterData = 'ALL' | 'KOSPI' | 'KOSDAQ' | 'KODEX' ;
type LikeType = 'BASE' | 'LIKE';

export const stockInfoState = atom<StockInfoData[]>({
  key: 'stockInfoState',
  default: [],
})
export const filterData = atom<FilterData>({
  key: 'filterState',
  default: 'ALL',
})

export const filterStockInfo = selectorFamily<StockInfoData[], LikeType>({
  key: 'filterStockInfo',
  get: (isLike) => ({get}) => {
    const infos = get(stockInfoState);
    const filters = get(filterData);
    const newInfo = infos.filter((info: StockInfoData) => {
      if (filters === 'ALL' && isLike === 'LIKE') return info.like === true;
      else if (filters !== 'ALL' && isLike === 'BASE') return info.mrktCtg === filters;
      else if (filters !== 'ALL' && isLike === 'LIKE') return info.mrktCtg === filters && info.like === true;
      return true;
    })
    return newInfo;
  }
})

export async function stockList(page: number) {
  try {
    const response = await fetch('test.json');
    if (!response.ok) throw new Error(`Network Error ${response.status}`);
    const jsonRes = await response.json();
    const { numOfRows, pageNo, totalCount, items }: PageNumData = jsonRes.body;
    const item: StockInfoData[] = items?.item ?? [];
    return { numOfRows, pageNo, totalCount, item };
  }catch(e:unknown) {
    throw new Error(`Network Error ${((e)as Error).message}`);
  }
}

const useStockInfoApi = (page: number) => {
  const setStockInfo = useSetRecoilState(stockInfoState);

  const { error, isLoading } = useQuery({
    queryKey: ['stockAPI'],
    queryFn: async () => {
      const data = await stockList(page);
      setStockInfo(data.item);
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10
  });
  return {isLoading, error}
}