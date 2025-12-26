// Setup script to ensure DATABASE_URL is set from Supabase extension variables
// This runs before Prisma commands during build

// Netlify Supabase extension provides SUPABASE_DATABASE_URL
if (!process.env.DATABASE_URL && process.env.SUPABASE_DATABASE_URL) {
  process.env.DATABASE_URL = process.env.SUPABASE_DATABASE_URL
  console.log('✅ Set DATABASE_URL from SUPABASE_DATABASE_URL')
}

// Add SSL requirement for Supabase connections if needed
if (process.env.DATABASE_URL) {
  const dbUrl = process.env.DATABASE_URL
  if ((dbUrl.includes('supabase.co') || dbUrl.includes('supabase.com')) && !dbUrl.includes('sslmode=')) {
    const separator = dbUrl.includes('?') ? '&' : '?'
    process.env.DATABASE_URL = `${dbUrl}${separator}sslmode=require`
    console.log('✅ Added SSL mode to DATABASE_URL')
  }
}

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is not set and SUPABASE_DATABASE_URL is not available')
  process.exit(1)
}

console.log('✅ DATABASE_URL is configured')

