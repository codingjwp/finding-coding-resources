import { VideosInfo } from 'APITypes'
import StatisticsGroups from '@/app/dashboard/[code]/_compoennts/statistics-groups'
import VideoGroups from '@/app/dashboard/[code]/_compoennts/video-groups'

export default function ChannelStatisticsVideo({
  view,
  rating,
  latest,
}: {
  view: VideosInfo
  rating: VideosInfo
  latest: VideosInfo
}) {
  return (
    <>
      <StatisticsGroups view={view} rating={rating} latest={latest} />
      <VideoGroups latest={latest} />
    </>
  )
}
