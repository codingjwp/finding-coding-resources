import { FormEvent } from "react"
import RadioGroups from "./components/RadioGroups"
import StockInfo from "./components/StockInfo"
import Navigtion from './components/Navigtion'

const lists = [
  { label: "전체", value: "ALL" },
  { label: "코스피", value: "KOSPI"},
  { label: "코스닥", value: "KOSDAQ"},
  { label: "코스넥", value: "KONEX"}
]

const items =  [     {
  "basDt": "20231113",
  "srtnCd": "900110",
  "isinCd": "HK0000057197",
  "itmsNm": "이스트아시아홀딩스",
  "mrktCtg": "KOSDAQ",
  "clpr": "120",
  "vs": "0",
  "fltRt": "0",
  "mkp": "121",
  "hipr": "122",
  "lopr": "120",
  "trqu": "1876294",
  "trPrc": "225767554",
  "lstgStCnt": "291932050",
  "mrktTotAmt": "35031846000"
},
{
  "basDt": "20231113",
  "srtnCd": "900270",
  "isinCd": "HK0000214814",
  "itmsNm": "헝셩그룹",
  "mrktCtg": "KOSDAQ",
  "clpr": "219",
  "vs": "-3",
  "fltRt": "-1.35",
  "mkp": "223",
  "hipr": "223",
  "lopr": "218",
  "trqu": "368805",
  "trPrc": "81500195",
  "lstgStCnt": "85682000",
  "mrktTotAmt": "18764358000"
},
{
  "basDt": "20231113",
  "srtnCd": "900260",
  "isinCd": "HK0000295359",
  "itmsNm": "로스웰",
  "mrktCtg": "KOSDAQ",
  "clpr": "733",
  "vs": "-6",
  "fltRt": "-.81",
  "mkp": "733",
  "hipr": "739",
  "lopr": "727",
  "trqu": "30812",
  "trPrc": "22566108",
  "lstgStCnt": "36031288",
  "mrktTotAmt": "26410934104"
},
{
  "basDt": "20231113",
  "srtnCd": "900290",
  "isinCd": "HK0000307485",
  "itmsNm": "GRT",
  "mrktCtg": "KOSDAQ",
  "clpr": "2670",
  "vs": "-35",
  "fltRt": "-1.29",
  "mkp": "2775",
  "hipr": "2780",
  "lopr": "2580",
  "trqu": "44665",
  "trPrc": "118778290",
  "lstgStCnt": "67375000",
  "mrktTotAmt": "179891250000"
},
{
  "basDt": "20231113",
  "srtnCd": "900300",
  "isinCd": "HK0000312568",
  "itmsNm": "오가닉티코스메틱",
  "mrktCtg": "KOSDAQ",
  "clpr": "137",
  "vs": "-4",
  "fltRt": "-2.84",
  "mkp": "142",
  "hipr": "143",
  "lopr": "136",
  "trqu": "866147",
  "trPrc": "119666536",
  "lstgStCnt": "245263481",
  "mrktTotAmt": "33601096897"
},
{
  "basDt": "20231113",
  "srtnCd": "900310",
  "isinCd": "HK0000341732",
  "itmsNm": "컬러레이",
  "mrktCtg": "KOSDAQ",
  "clpr": "886",
  "vs": "-23",
  "fltRt": "-2.53",
  "mkp": "910",
  "hipr": "917",
  "lopr": "881",
  "trqu": "299229",
  "trPrc": "267995399",
  "lstgStCnt": "64041675",
  "mrktTotAmt": "56740924050"
}]

function App() {

  const test =(e:FormEvent) => {
    e.preventDefault();
  }
  return (
    <>
      <RadioGroups name="stock_group" lists={lists} onSubmit={test}/>
      {items.map(item => <StockInfo key={item.srtnCd} {...item} />)}
      <Navigtion />
    </>
  )
}

export default App
