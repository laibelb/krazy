import Image from 'next/image'
import Link from 'next/link'

const platforms = [
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/channel/UCMrMvXraTLhAtpb0JZQOKhQ',
    logo: '/logos/youtube.svg',
  },
  {
    name: 'YouTube Music',
    url: 'https://music.youtube.com/playlist?list=PLFjvIKKaTDH85ZHMy4LsIxVydbTSL8kbt',
    logo: '/logos/youtubemusic.svg',
  },
  {
    name: 'Spotify',
    url: 'https://open.spotify.com/show/6ZbhpCYBCqSZGOgQb1BwFz',
    logo: '/logos/spotify.svg',
  },
  {
    name: 'Apple Podcasts',
    url: 'https://podcasts.apple.com/us/podcast/rabbi-krazs-shiurim/id1701685139',
    logo: '/logos/applepodcasts.svg',
  },
  {
    name: 'Amazon Music',
    url: 'https://music.amazon.com/podcasts/f0e647ec-80d9-4224-961c-a7c1f9c52a1e/rabbi-krazs-shiurim',
    logo: '/logos/amazonmusic.svg',
  },
  {
    name: 'Pocket Casts',
    url: 'https://pca.st/74lg0vrl',
    logo: '/logos/pocketcasts.svg',
  },
  {
    name: '24Six',
    url: 'https://24six.app/preview/podcast/collection/11014/rabbi-krazs-shiurim',
    logo: '/logos/24six.svg',
  },
  {
    name: 'Castbox',
    url: 'https://castbox.fm/channel/Rabbi-Krazs-Shiurim-id5574479',
    logo: '/logos/castbox.svg',
  },
]

export default function PlatformGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto my-12 px-4">
      {platforms.map((platform) => (
        <Link
          key={platform.name}
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all border border-gray-100 group text-center h-full"
        >
          <div className="mb-4 h-12 w-12 relative flex items-center justify-center">
            <img
              src={platform.logo}
              alt={`${platform.name} logo`}
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-medium text-gray-700 group-hover:text-primary transition-colors">
            {platform.name}
          </span>
        </Link>
      ))}
    </div>
  )
}

