'use client'

import styles from '@/styles/tabmenu.module.css'

type TabmenuProps = {
  menuList: string[]
  checkType: string
  onSelect: (checkType: string) => void
}

export default function Tabmenu({
  menuList,
  checkType,
  onSelect,
}: TabmenuProps) {
  return (
    <menu className={styles.tabmenu}>
      {menuList.map((item) => (
        <li key={item}>
          <button
            type="button"
            className={checkType === item ? styles.selectTabmenu : undefined}
            onClick={() => onSelect(item)}
          >
            {item}
          </button>
        </li>
      ))}
    </menu>
  )
}
