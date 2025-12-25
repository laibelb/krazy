import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Use SUPABASE_DATABASE_URL if DATABASE_URL is not set (for Netlify with Supabase)
const databaseUrl = process.env.DATABASE_URL || process.env.SUPABASE_DATABASE_URL

if (!databaseUrl) {
  console.warn('Warning: Neither DATABASE_URL nor SUPABASE_DATABASE_URL is set')
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

