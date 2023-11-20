import { FormEvent, useEffect } from "react"
import RadioGroups from "./components/RadioGroups"
import StockInfo from "./components/StockInfo"
import Navigtion from './components/Navigtion'
import { stockInfoState } from "./utils/RecoilProvider";
import { useRecoilState } from "recoil";

const lists = [
  { label: "전체", value: "ALL" },
  { label: "코스피", value: "KOSPI"},
  { label: "코스닥", value: "KOSDAQ"},
  { label: "코스넥", value: "KONEX"}
]

function App() {
  const [stockInfo, setStockInfo] = useRecoilState(stockInfoState);
  useEffect(() => {
    // setStockInfo(items);
  }, [setStockInfo])
  const test =(e:FormEvent) => {
    e.preventDefault();
  }
  return (
    <>
      <RadioGroups name="stock_group" lists={lists} onSubmit={test}/>
      {stockInfo.length > 0 && stockInfo.map(item => <StockInfo key={item.srtnCd} {...item} />)}
      <Navigtion />
    </>
  )
}

export default App
