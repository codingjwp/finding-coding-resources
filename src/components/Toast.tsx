import { useRecoilState } from 'recoil'
import { toastState } from "../utils/RecoilProvider";
import styles from './toast.module.css';
import cn from 'classnames';
import { useEffect, useState } from 'react';

const Toast = () => {
  const [info, setInfo] = useRecoilState(toastState);
  const [timeId, setTimeId] = useState(0);
  useEffect(() => {
    if (info.timer > 0) {
      const id =  setTimeout(
        () => setInfo(prev => { return {...prev, isOpen: false, timer: 0}}) , info.timer)
        setTimeId(id);
    }
    return () => {
      if (timeId > 0) clearTimeout(timeId);
    }
  }, [info.timer])

  return (
    <div tabIndex={-1} className={cn(styles.toast, {[styles.open]: info.isOpen})}>
      <p className={styles.toast_context}>{info.context}</p>
    </div>
  )
}

export default Toast;