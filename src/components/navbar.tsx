'use client'
import Icon from './icon'
import styles from '@/styles/navbar.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { NavigationTypes } from 'APITypes'

type NavbarProps = {
  title: string
  navGroups: NavigationTypes[]
}

export default function Navbar({ title, navGroups }: NavbarProps) {
  const [openMenu, setOpenMenu] = useState(false)
  const handleClickMenu = () => {
    setOpenMenu((prevOpen) => !prevOpen)
  }
  return (
    <nav className={`${styles.navbar} ${!openMenu && styles.navbarBaseHeight}`}>
      <button
        type="button"
        id="nav_hambuger"
        name="nav_hambuger"
        className={`${styles.iconSize} ${styles.navbarHambuger} ${openMenu && styles.navbarHambugerNone}`}
        onClick={handleClickMenu}
      >
        <span className={styles.hiddenHambuger}>대쉬보드 메뉴</span>
      </button>
      <h2
        className={`${styles.navbarTitle} ${styles.textTrans} ${!openMenu && styles.hidden}`}
      >
        <Icon
          name="chart"
          className={`${styles.navbarTitlePosition} ${styles.iconSize}`}
          childrenClassName={styles.navbarTitleIcon}
        >
          {title}
        </Icon>
        <button
          className={`${styles.navbarClose} ${styles.iconSize}`}
          type="button"
          id="nav_close"
          name="nav_close"
          onClick={handleClickMenu}
        >
          &times;
        </button>
      </h2>
      <ul
        className={`${styles.navbarList} ${styles.textTrans} ${!openMenu && styles.hidden}`}
      >
        {navGroups.map((navi) => {
          if (navi.customUrl === title || navi.title === title) return null
          return (
            <li key={navi.id}>
              <Image src={navi.url} width={32} height={32} alt={navi.title} />
              <Link href={navi.id}>
                {navi.customUrl === '' ? navi.title : navi.customUrl}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
