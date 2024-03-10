'use client'

import { VideosInfo } from 'APITypes'
import styles from '@/styles/dashboards/statistics-video.module.css'
import BarGraph from '@/components/bargraph'
import LineGraph from '@/components/linegraph'
import Tabmenu from '@/components/tabmenu'
import { notFound, usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

type StatisticsGroups = {
  view: VideosInfo
  rating: VideosInfo
  latest: VideosInfo
}

export default function StatisticsGroups({
  view,
  rating,
  latest,
}: StatisticsGroups) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  let type = searchParams.get('chart')

  const handleChangeQueryString = (checkType: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('chart', checkType)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  if (!type) {
    handleChangeQueryString('bar')
    type = 'bar'
  } else {
    if (type !== 'bar' && type !== 'line') {
      notFound()
    }
  }

  const barChart = (
    <section className={styles.chartGroups}>
      <BarGraph titie="조회순" barData={view} />
      <BarGraph titie="추천순" barData={rating} />
      <BarGraph titie="댓글순" barData={latest} />
    </section>
  )
  const lineChart = (
    <section className={styles.chartGroups}>
      <LineGraph titie="조회순" lineData={view} />
      <LineGraph titie="추천순" lineData={rating} />
      <LineGraph titie="댓글순" lineData={latest} />
    </section>
  )

  return (
    <>
      <Tabmenu
        menuList={['bar', 'line']}
        onSelect={handleChangeQueryString}
        checkType={type}
      />
      {type === 'bar' && barChart}
      {type === 'line' && lineChart}
    </>
  )
}
