type ChannelSatisticsProps = {
  viewCount: string
  subscriberCount: string
  videoCount: string
}

export default function ChannelSatistics({
  viewCount,
  subscriberCount,
  videoCount,
}: ChannelSatisticsProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>구독자</th>
          <th>총 시청수</th>
          <th>총 동영상수</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{subscriberCount}</td>
          <td>{viewCount}</td>
          <td>{videoCount}</td>
        </tr>
      </tbody>
    </table>
  )
}
