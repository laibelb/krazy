// Setup script to ensure DATABASE_URL is set from Supabase extension variables
// This runs before Prisma commands during build

// Check all possible Supabase environment variable names
const possibleVars = [
  'SUPABASE_DATABASE_URL',
  'DATABASE_URL',
  'POSTGRES_URL',
  'POSTGRES_PRISMA_URL',
  'POSTGRES_URL_NON_POOLING'
]

let dbUrl = null
for (const varName of possibleVars) {
  if (process.env[varName]) {
    dbUrl = process.env[varName]
    console.log(`✅ Found database URL in ${varName}`)
    break
  }
}

// Set DATABASE_URL if we found a database URL
if (dbUrl && !process.env.DATABASE_URL) {
  process.env.DATABASE_URL = dbUrl
  console.log('✅ Set DATABASE_URL')
}

// Add SSL requirement for Supabase connections if needed
if (process.env.DATABASE_URL) {
  const url = process.env.DATABASE_URL
  if ((url.includes('supabase.co') || url.includes('supabase.com')) && !url.includes('sslmode=')) {
    const separator = url.includes('?') ? '&' : '?'
    process.env.DATABASE_URL = `${url}${separator}sslmode=require`
    console.log('✅ Added SSL mode to DATABASE_URL')
  }
  console.log('✅ DATABASE_URL is configured')
} else {
  console.warn('⚠️  DATABASE_URL not found - migrations will be skipped')
  console.warn('Available env vars:', Object.keys(process.env).filter(k => k.includes('SUPABASE') || k.includes('DATABASE') || k.includes('POSTGRES')).join(', ') || 'none')
}

