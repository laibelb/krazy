import Header from '@/components/Header'
import { ExternalLink, Play, Clock, Eye, Calendar } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export const revalidate = 3600 // Revalidate every hour

async function getVideos() {
  try {
    const YOUTUBE_CHANNEL_ID = 'UCMrMvXraTLhAtpb0JZQOKhQ'
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY

    if (!YOUTUBE_API_KEY || YOUTUBE_API_KEY === 'your-youtube-api-key-here') {
      return []
    }

    // Get the channel's uploads playlist ID
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${YOUTUBE_CHANNEL_ID}&key=${YOUTUBE_API_KEY}`,
      { next: { revalidate: 3600 } }
    )

    if (!channelResponse.ok) {
      return []
    }

    const channelData = await channelResponse.json()
    const uploadsPlaylistId = channelData.items[0]?.contentDetails?.relatedPlaylists?.uploads

    if (!uploadsPlaylistId) {
      return []
    }

    // Get videos from the uploads playlist
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=50&key=${YOUTUBE_API_KEY}`,
      { next: { revalidate: 3600 } }
    )

    if (!videosResponse.ok) {
      return []
    }

    const videosData = await videosResponse.json()
    const videoIds = videosData.items.map((item: any) => item.contentDetails.videoId).join(',')

    // Get detailed video information
    const videoDetailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`,
      { next: { revalidate: 3600 } }
    )

    if (!videoDetailsResponse.ok) {
      return []
    }

    const videoDetailsData = await videoDetailsResponse.json()

    // Filter out shorts and format videos
    const videos = videoDetailsData.items
      .filter((video: any) => {
        const duration = video.contentDetails.duration
        const title = video.snippet.title.toLowerCase()
        
        // Parse duration
        const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
        const hours = parseInt(match[1] || '0')
        const minutes = parseInt(match[2] || '0')
        const seconds = parseInt(match[3] || '0')
        const totalSeconds = hours * 3600 + minutes * 60 + seconds
        
        // Exclude shorts: less than 60 seconds OR has #shorts in title
        return totalSeconds >= 60 && !title.includes('#shorts') && !title.includes('shorts')
      })
      .map((video: any) => {
        const duration = video.contentDetails.duration
        const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
        const hours = parseInt(match[1] || '0')
        const minutes = parseInt(match[2] || '0')
        const seconds = parseInt(match[3] || '0')
        
        let durationStr = ''
        if (hours > 0) {
          durationStr = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        } else {
          durationStr = `${minutes}:${seconds.toString().padStart(2, '0')}`
        }

        return {
          id: video.id,
          title: video.snippet.title,
          description: video.snippet.description,
          thumbnail: video.snippet.thumbnails?.high?.url || video.snippet.thumbnails?.medium?.url || video.snippet.thumbnails?.default?.url,
          publishedAt: video.snippet.publishedAt,
          duration: durationStr,
          viewCount: parseInt(video.statistics?.viewCount || '0'),
          videoUrl: `https://www.youtube.com/watch?v=${video.id}`,
        }
      })
      .sort((a: any, b: any) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

    return videos
  } catch (error) {
    console.error('Error fetching videos:', error)
    return []
  }
}

function formatViewCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`
  }
  return count.toString()
}

export default async function VideosPage() {
  const videos = await getVideos()

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-2">
            Videos
          </h1>
          <p className="text-muted-foreground">
            Watch shiurim on YouTube ({videos.length} videos)
          </p>
        </div>

        {videos.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 text-center">
            <p className="text-gray-600 mb-4">No videos available at the moment.</p>
            <a
              href="https://www.youtube.com/@RabbiKraz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              View videos on YouTube
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video: any) => (
              <a
                key={video.id}
                href={video.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden flex flex-col h-full group"
              >
                <div className="relative aspect-video bg-gray-200 overflow-hidden">
                  {video.thumbnail ? (
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <Play className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-3">
                      <Play className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {video.duration}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-serif text-xl font-semibold text-primary mb-2 line-clamp-2 group-hover:text-secondary transition-colors">
                    {video.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(video.publishedAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{formatViewCount(video.viewCount)} views</span>
                    </div>
                  </div>
                  {video.description && (
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-1">
                      {video.description}
                    </p>
                  )}
                  <div className="flex items-center justify-end pt-4 mt-auto border-t border-gray-50">
                    <span className="text-xs text-primary font-medium flex items-center gap-1 group-hover:text-secondary transition-colors">
                      Watch on YouTube
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
