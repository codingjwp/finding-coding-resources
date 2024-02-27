'use client'

import { logoNames } from '@/utils/logoName'
import Icon from '@/components/icon'
import styles from '@/styles/navbar.module.css'
import Link from 'next/link'
import { useState } from 'react'

type NavbarProps = {
  params: string
}

export default function Navbar({ params }: NavbarProps) {
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
          {params}
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
        {logoNames.map((item) => {
          if (item === params) return null
          return (
            <li key={item}>
              <Link href={item}>{item}</Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
