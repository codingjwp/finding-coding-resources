import { ReactNode, MouseEvent, TouchEvent } from 'react';
import svg from '../assets/iconSprites.svg';
import styles from './buttons.module.css';
import cn from 'classnames';

type SvgItemProps = {
  size: 24 | 48;
  names: 'btn-add' | 'btn-check' | 'btn-filter' | 'btn-home' | 'btn-news' | 'btn-search' | 'btn-like';
}
type ButtonProps = {
  labelPosition: "bottom" | "right" | "none";
  children: ReactNode;
}
type ClickType = {
  label?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  onTouchStart?: (e: TouchEvent<HTMLButtonElement>) => void;
  onTouchEnd?: (e: TouchEvent<HTMLButtonElement>) => void;
}

const SvgItem = ({size, names}: SvgItemProps) => {
  return (
    <svg width={size} height={size} viewBox='0 0 24 24'>
      <use href={`${svg}#${names}`} />
    </svg>
  )
}
const BtnCover = ({label, labelPosition, onClick, onTouchStart, onTouchEnd,  children}: ButtonProps & ClickType ) => {
  const positions = cn(
    styles.btn,
    { [styles.btn_botton]: labelPosition === 'bottom',
      [styles.btn_right]: labelPosition === 'right',
      [styles.btn_none]: labelPosition === 'none'})
  return (
    <button className={positions} type='button' onClick={onClick} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      {children}
      <span>{label}</span>
    </button>
  )
}

const BtnCheck = ({label, onClick, onTouchStart, onTouchEnd}: ClickType) => {
  return (
    <BtnCover label={label} labelPosition='right' onClick={onClick} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <SvgItem names='btn-check' size={24} />
    </BtnCover>
  )
}
const BtnFilter = ({onClick, onTouchStart, onTouchEnd}: ClickType) => { 
  return (
    <BtnCover label='Filter' labelPosition='none' onClick={onClick} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <SvgItem names='btn-filter' size={24} />
    </BtnCover>
  )
}

const BtnNews = ({onClick, onTouchStart, onTouchEnd}: ClickType) => { 
  return (
    <BtnCover label='News' labelPosition='none' onClick={onClick} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <SvgItem names='btn-news' size={24} />
    </BtnCover>
  )
}
const BtnSearch = ({onClick, onTouchStart, onTouchEnd}: ClickType) => { 
  return (
    <BtnCover label='Search' labelPosition='none' onClick={onClick} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <SvgItem names='btn-search' size={24} />
    </BtnCover>
  )
}
const BtnLike = ({onClick, onTouchStart, onTouchEnd}: ClickType) => {
  return (
    <BtnCover label='Like' labelPosition='none' onClick={onClick} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <SvgItem names='btn-like' size={24} />
    </BtnCover>
  )
}
const BtnAdd = ({onClick, onTouchStart, onTouchEnd}: ClickType) => {
  return (
    <BtnCover label='Menu' labelPosition='none' onClick={onClick} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <SvgItem names='btn-add' size={48} />
    </BtnCover>
  )
}
const BtnBigHome = ({onClick, onTouchStart, onTouchEnd}: ClickType) => { 
  return (
    <BtnCover label='Home' labelPosition='bottom' onClick={onClick} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <SvgItem names='btn-home' size={48} />
    </BtnCover>
  )
}
const BtnBigLike = ({onClick, onTouchStart, onTouchEnd}: ClickType) => {
  return (
    <BtnCover label='Like' labelPosition='bottom' onClick={onClick} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <SvgItem names='btn-like' size={48} />
    </BtnCover>
  )
}
const BtnBigNews = ({onClick, onTouchStart, onTouchEnd}: ClickType) => { 
  return (
    <BtnCover label='News' labelPosition='bottom' onClick={onClick} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <SvgItem names='btn-news' size={48} />
    </BtnCover>
  )
}

export const Icon = {
  Check: BtnCheck,
  Filter: BtnFilter,
  News: BtnNews,
  Search: BtnSearch,
  Like: BtnLike,
}

export const Nav = {
  Menu: BtnAdd,
  Home: BtnBigHome,
  Like: BtnBigLike,
  News: BtnBigNews,
}