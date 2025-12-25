import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

interface PlatformLinksProps {
  links: {
    youtube?: string | null
    youtubeMusic?: string | null
    spotify?: string | null
    apple?: string | null
    amazon?: string | null
    pocket?: string | null
    twentyFourSix?: string | null
    castbox?: string | null
  }
  title: string
}

const platforms = [
  { key: 'youtube', label: 'YouTube', color: '#FF0000' },
  { key: 'youtubeMusic', label: 'YouTube Music', color: '#FF0000' },
  { key: 'spotify', label: 'Spotify', color: '#1DB954' },
  { key: 'apple', label: 'Apple Podcasts', color: '#872EC4' },
  { key: 'amazon', label: 'Amazon Music', color: '#00A8E1' },
  { key: 'pocket', label: 'Pocket Casts', color: '#F43E37' },
  { key: 'twentyFourSix', label: '24Six', color: '#000000' },
  { key: 'castbox', label: 'Castbox', color: '#FF7700' },
]

export default function PlatformLinks({ links, title }: PlatformLinksProps) {
  const availablePlatforms = platforms.filter(
    (platform) => links[platform.key as keyof typeof links]
  )

  if (availablePlatforms.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No platform links available.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {availablePlatforms.map((platform) => {
        const url = links[platform.key as keyof typeof links]
        if (!url) return null

        return (
          <a
            key={platform.key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-lg transition-all hover:bg-gray-50 group"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
              style={{
                backgroundColor: `${platform.color}15`,
                color: platform.color,
              }}
            >
              <ExternalLink className="w-5 h-5" />
            </div>
            <span className="font-medium text-gray-700 group-hover:text-primary transition-colors">
              {platform.label}
            </span>
            <ExternalLink className="w-4 h-4 text-gray-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        )
      })}
    </div>
  )
}

