import { useState } from 'react';
import styles from './stockInfo.module.css';
import cn from 'classnames';
import { useSetRecoilState } from 'recoil';
import { toastState } from '../utils/RecoilProvider';

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
};

type HasLike = {
  srtnCd: string;
  like: boolean;
}

const StockInfo = (props: StockInfoData) => {
  const setToast = useSetRecoilState(toastState);
  const likes: HasLike[] = JSON.parse(localStorage.getItem('likes') as string);
  const hasLike: HasLike[] = likes?.filter((like: HasLike) => like.srtnCd === props.srtnCd) ?? null;
  const [isLike, setIsLike] = useState<boolean>(hasLike?.length > 0 ? hasLike[0].like : false);
  const lowTosameTohight = (comp: number, prevClpr:number = +props.clpr - +props.vs) => {
    return {
      [styles.high]: prevClpr < comp,
      [styles.same]: prevClpr === comp,
      [styles.low]: prevClpr > comp
    }
  }
  const handleClickLike = () => {
    const getLikesObject: HasLike[] = JSON.parse(localStorage.getItem('likes') as string);
    const likeObject: HasLike[] = getLikesObject?.filter((like: HasLike) => like.srtnCd === props.srtnCd) ?? null;
    if (getLikesObject) {
      if (likeObject?.length === 0) localStorage.setItem('likes', JSON.stringify([
        ...getLikesObject,
        {srtnCd: props.srtnCd, like: !isLike}
      ]))
      else localStorage.setItem('likes', JSON.stringify([
        ...(getLikesObject.filter((like: HasLike) => like.srtnCd !== props.srtnCd)),
        {srtnCd: props.srtnCd, like: !isLike}
      ]))
    } else {
      localStorage.setItem('likes', JSON.stringify([{srtnCd: props.srtnCd, like: !isLike}]));
    }
    setToast({
      isOpen: true,
      context: isLike ? "관심종목에서 삭제하였습니다" : "관심종목에 추가하였습니다.",
      timer: 1500});
    setIsLike(prev => !prev);
  }
  const numberCommaConvert = 
    (value:number, divide:number = 1) =>
    `${Math.floor(value / divide).toLocaleString('en')} ${divide === 1000000 
      ? '백만' : divide === 100000000 ? '억' : '' }`
  return (
    <section className={styles.info}>
      <div className={styles.title}>
        <div className={styles.top}>
          <div className={styles.company}>
            <span>{props.itmsNm}</span>
            <span>{props.srtnCd}</span>
            <span>{props.mrktCtg}</span>
            <span>{props.basDt} (기준)</span>
          </div>
          <div>
            <button className={cn(styles.sprite_img, styles.news)}>
              <span className={styles.hidden_text}>news</span>
            </button>
            <button className={cn(styles.sprite_img, {
              [styles.unlike]: !isLike,
              [styles.like]: isLike})} onClick={handleClickLike}>
              <span className={styles.hidden_text}>like</span>
            </button>
          </div>
        </div>
        <div className={styles.lower}>
          <div className={styles.price}>
            <p className={cn(lowTosameTohight(+props.vs, 0))}>{numberCommaConvert(+props.clpr)}</p> 
            <p>
              <em className={cn(styles.price_vs, lowTosameTohight(+props.vs, 0))}>{numberCommaConvert(Math.abs(+props.vs))}</em> | <em className={cn(lowTosameTohight(+props.vs, 0))}>{+props.fltRt}%</em>
            </p>
          </div>
          <div className={styles.quote}>
            <div className={styles.stock_price}>
              <span className={cn(styles.mkp, lowTosameTohight(+props.mkp))}>{numberCommaConvert(+props.mkp)}</span>
              <span className={cn(styles.lopr, lowTosameTohight(+props.lopr))}>{numberCommaConvert(+props.lopr)}</span>
              <span className={cn(styles.hipr, lowTosameTohight(+props.hipr))}>{numberCommaConvert(+props.hipr)}</span>
            </div>
            <div className={styles.stock_total}>
              <span className={styles.trqu}>{numberCommaConvert(+props.trqu)}</span>
              <span className={styles.tr_prc}>{numberCommaConvert(+props.trPrc, 1000000)}</span>
              <span className={styles.mrkt_tot_amt}>{numberCommaConvert(+props.mrktTotAmt, 100000000)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StockInfo;