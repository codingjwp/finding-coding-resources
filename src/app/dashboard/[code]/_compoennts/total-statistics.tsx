import styles from '@/styles/dashboards/total-statistics.module.css'
type SatisticsProps = {
  viewCount: string
  subscriberCount: string
  videoCount: string
}

export default function TotalStatistics({
  viewCount,
  subscriberCount,
  videoCount,
}: SatisticsProps) {
  const numberCommaFormeter = (number: number) => {
    return number.toLocaleString('ko-Kr')
  }

  return (
    <table className={styles.totalTable}>
      <thead className={styles.totalTableHeader}>
        <tr>
          <th>구독자</th>
          <th>총 시청수</th>
          <th>총 동영상수</th>
        </tr>
      </thead>
      <tbody className={styles.totalTableBody}>
        <tr>
          <td>{numberCommaFormeter(+subscriberCount)}</td>
          <td>{numberCommaFormeter(+viewCount)}</td>
          <td>{numberCommaFormeter(+videoCount)}</td>
        </tr>
      </tbody>
    </table>
  )
}
