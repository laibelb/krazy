import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Netlify Supabase extension provides SUPABASE_DATABASE_URL
// Ensure DATABASE_URL is set - check multiple Supabase env var names
if (!process.env.DATABASE_URL) {
  if (process.env.SUPABASE_DATABASE_URL) {
    process.env.DATABASE_URL = process.env.SUPABASE_DATABASE_URL
  } else if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    // Construct from Supabase URL and service role key if needed
    // This is a fallback - the extension should provide SUPABASE_DATABASE_URL
  }
}

// Add SSL requirement for Supabase connections
const databaseUrl = process.env.DATABASE_URL
if (databaseUrl && (databaseUrl.includes('supabase.co') || databaseUrl.includes('supabase.com')) && !databaseUrl.includes('sslmode=')) {
  const separator = databaseUrl.includes('?') ? '&' : '?'
  process.env.DATABASE_URL = `${databaseUrl}${separator}sslmode=require`
}

// Prisma automatically reads DATABASE_URL from process.env
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

