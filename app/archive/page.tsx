import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { formatDate, formatDuration } from '@/lib/utils'
import Header from '@/components/Header'
import PlayButton from '@/components/PlayButton'
import { Calendar, Clock, Info } from 'lucide-react'

export const revalidate = 60

async function getAllShiurim() {
  return prisma.shiur.findMany({
    orderBy: { pubDate: 'desc' },
    include: {
      platformLinks: true,
    },
  })
}

export default async function ArchivePage() {
  const shiurim = await getAllShiurim()

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-semibold text-primary mb-2">
            All Shiurim
          </h1>
          <p className="text-muted-foreground">
            Browse all {shiurim.length} shiurim
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shiurim.map((shiur) => (
            <div
              key={shiur.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden flex flex-col h-full group"
            >
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-serif text-xl font-semibold text-primary line-clamp-2 group-hover:text-secondary transition-colors">
                    <Link href={`/shiur/${shiur.id}`}>{shiur.title}</Link>
                  </h3>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatDate(shiur.pubDate)}</span>
                  </div>
                  {shiur.duration && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{formatDuration(shiur.duration)}</span>
                    </div>
                  )}
                </div>
                {shiur.blurb && (
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">
                    {shiur.blurb}
                  </p>
                )}
                <div className="flex items-center justify-between pt-4 mt-auto border-t border-gray-50">
                  <PlayButton shiur={shiur} />
                  <Link
                    className="flex items-center gap-1 text-sm text-secondary hover:text-primary font-medium"
                    href={`/shiur/${shiur.id}`}
                  >
                    Details <Info className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

