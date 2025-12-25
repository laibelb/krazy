import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Use SUPABASE_DATABASE_URL if DATABASE_URL is not set (for Netlify with Supabase)
const databaseUrl = process.env.DATABASE_URL || process.env.SUPABASE_DATABASE_URL

if (!databaseUrl) {
  console.error('ERROR: Neither DATABASE_URL nor SUPABASE_DATABASE_URL is set')
}

// Create Prisma client - it will use DATABASE_URL from environment automatically
// Only override if we have a specific URL to use
export const prisma = globalForPrisma.prisma ?? (databaseUrl 
  ? new PrismaClient({
      datasources: {
        db: {
          url: databaseUrl,
        },
      },
    })
  : new PrismaClient()
)

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

