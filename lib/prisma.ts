import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Use SUPABASE_DATABASE_URL if DATABASE_URL is not set (for Netlify with Supabase)
const databaseUrl = process.env.DATABASE_URL || process.env.SUPABASE_DATABASE_URL

if (!databaseUrl) {
  console.error('ERROR: Neither DATABASE_URL nor SUPABASE_DATABASE_URL is set')
} else {
  // Set DATABASE_URL for Prisma if we're using SUPABASE_DATABASE_URL
  if (process.env.SUPABASE_DATABASE_URL && !process.env.DATABASE_URL) {
    process.env.DATABASE_URL = process.env.SUPABASE_DATABASE_URL
  }
}

// Prisma will automatically read DATABASE_URL from process.env
export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

