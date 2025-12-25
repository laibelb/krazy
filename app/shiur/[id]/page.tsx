import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { formatDate, formatDuration } from '@/lib/utils'
import Header from '@/components/Header'
import ShiurAudioPlayer from '@/components/ShiurAudioPlayer'
import PlatformLinks from '@/components/PlatformLinks'
import SourceSheetViewer from '@/components/SourceSheetViewer'

export const revalidate = 60

async function getShiur(id: string) {
  return prisma.shiur.findUnique({
    where: { id },
    include: {
      platformLinks: true,
    },
  })
}

export default async function ShiurPage({ params }: { params: { id: string } }) {
  const shiur = await getShiur(params.id)

  if (!shiur) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-4 md:py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4 md:mb-8 transition-colors"
        >
          ← Back to Shiurim
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Title and Blurb - At the Top */}
            <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 md:p-6 lg:p-10">
                <h1 className="font-serif text-2xl md:text-3xl lg:text-5xl font-bold text-primary mb-3 md:mb-4 leading-tight">
                  {shiur.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm text-muted-foreground mb-6 md:mb-8">
                  <span>{formatDate(shiur.pubDate)}</span>
                  {shiur.duration && (
                    <>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span>{formatDuration(shiur.duration)}</span>
                    </>
                  )}
                </div>

                {shiur.blurb && (
                  <div className="prose prose-sm md:prose-base prose-blue max-w-none mb-4 text-gray-700">
                    <p className="text-base md:text-lg leading-relaxed">{shiur.blurb}</p>
                  </div>
                )}

                {shiur.description && (
                  <div
                    className="prose prose-sm md:prose-base prose-blue max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{ __html: shiur.description }}
                  />
                )}
              </div>
            </article>

            {/* Audio Player */}
            <ShiurAudioPlayer shiur={shiur} />

            {/* Source Sheet - Embedded */}
            {shiur.sourceDoc && (
              <SourceSheetViewer sourceDoc={shiur.sourceDoc} title={shiur.title} />
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4 md:space-y-6">
            {shiur.platformLinks && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
                <h3 className="font-serif text-lg md:text-xl font-semibold text-primary mb-4">
                  Listen on Platform
                </h3>
                <PlatformLinks links={shiur.platformLinks} title={shiur.title} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

