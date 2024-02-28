declare module 'APITypes' {
  export type ChannelsInfo = {
    id: string
    title: string
    description: string
    customUrl: string
    publishedAt: string
    thumbnails: {
      default: {
        url: string
        width: number
        height: number
      }
      medium: {
        url: string
        width: number
        height: number
      }
    }
    statistics: {
      viewCount: string
      subscriberCount: string
      videoCount: string
    }
  }
  export type VideosInfo = {
    channelId: string
    videoInfo: {
      videoId: string
      statistics: {
        viewCount: string
        likeCount: string
        favoriteCount: string
        commentCount: string
      }
    }[]
  }
}
