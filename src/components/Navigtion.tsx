import styles from './navigation.module.css';
import cn from 'classnames';
import { Nav } from '../components/Buttons';
import { useState, TouchEvent } from 'react';


const Navigtion = () => {
  // const targetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => setIsOpen(prev => !prev);
  const handleTouchColor = (e: TouchEvent<HTMLButtonElement>) => {
    (e.currentTarget.querySelector('svg') as SVGSVGElement).style.fill = "#6114de";
    (e.currentTarget.querySelector('span') as HTMLSpanElement).style.color = "#6114de";
  }
  const handleTouchEndColor = (e: TouchEvent<HTMLButtonElement>) => {
    (e.currentTarget.querySelector('svg') as SVGSVGElement).style.fill = "#fafafa";
    (e.currentTarget.querySelector('span') as HTMLSpanElement).style.color = "#fafafa";
  }

  return (
    <>
      <div  className={cn(styles.navigation, {[styles.menu]: isOpen})}>
        <div className={cn(styles.list, {[styles.show]: isOpen})}>
          <Nav.Home onClick={handleIsOpen} onTouchStart={handleTouchColor} onTouchEnd={handleTouchEndColor} />
          <Nav.Like onClick={handleIsOpen} onTouchStart={handleTouchColor} onTouchEnd={handleTouchEndColor} />
          <Nav.News onClick={handleIsOpen} onTouchStart={handleTouchColor} onTouchEnd={handleTouchEndColor} />
        </div>
        <Nav.Menu onClick={handleIsOpen}/>
      </div>
      <div className={cn({[styles.show_cover]: isOpen})} onClick={handleIsOpen}></div>
    </>
  )
}

export default Navigtion;