// Setup script to ensure DATABASE_URL is set from Supabase extension variables
// This runs before Prisma commands during build

console.log('🔍 Checking for database connection string...')

// Log all Supabase-related env vars (without values for security)
const supabaseVars = Object.keys(process.env).filter(k => 
  k.includes('SUPABASE') || k.includes('DATABASE') || k.includes('POSTGRES')
)
console.log('📋 Available env vars:', supabaseVars.join(', ') || 'none')

// Check if SUPABASE_DATABASE_URL is a PostgreSQL connection string
let dbUrl = process.env.SUPABASE_DATABASE_URL

// If SUPABASE_DATABASE_URL exists but doesn't start with postgresql://, it might be the project URL
// In that case, we need to get the actual connection string from Supabase
if (dbUrl && !dbUrl.startsWith('postgresql://') && !dbUrl.startsWith('postgres://')) {
  console.warn('⚠️  SUPABASE_DATABASE_URL is not a PostgreSQL connection string')
  console.warn('⚠️  It appears to be:', dbUrl.substring(0, 50) + '...')
  console.warn('⚠️  You need to get the actual PostgreSQL connection string from Supabase')
  dbUrl = null
}

// Check other possible variables
if (!dbUrl || !dbUrl.startsWith('postgres')) {
  const possibleVars = [
    'DATABASE_URL',
    'POSTGRES_URL',
    'POSTGRES_PRISMA_URL',
    'POSTGRES_URL_NON_POOLING',
    'SUPABASE_POSTGRES_URL'
  ]
  
  for (const varName of possibleVars) {
    if (process.env[varName] && process.env[varName].startsWith('postgres')) {
      dbUrl = process.env[varName]
      console.log(`✅ Found PostgreSQL connection string in ${varName}`)
      break
    }
  }
}

// Set DATABASE_URL if we found a valid connection string
if (dbUrl && dbUrl.startsWith('postgres')) {
  if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = dbUrl
    console.log('✅ Set DATABASE_URL')
  }
  
  // Fix Supabase pooler connection string format
  let url = process.env.DATABASE_URL
  
  // For pooler connections, the username should be just 'postgres', not 'postgres.PROJECT_REF'
  // Fix the username format if it's wrong
  if (url.includes(':6543') && url.includes('postgres.')) {
    // Replace postgres.PROJECT_REF with just postgres for pooler
    url = url.replace(/postgres\.[^:]+:/, 'postgres:')
    console.log('✅ Fixed pooler username format')
  }
  
  const params = []
  
  // Add pgbouncer=true for pooler connections (port 6543)
  if (url.includes(':6543') && !url.includes('pgbouncer=')) {
    params.push('pgbouncer=true')
  }
  
  // Add SSL mode for Supabase
  if ((url.includes('supabase.co') || url.includes('supabase.com')) && !url.includes('sslmode=')) {
    params.push('sslmode=require')
  }
  
  if (params.length > 0) {
    const separator = url.includes('?') ? '&' : '?'
    url = `${url}${separator}${params.join('&')}`
    console.log('✅ Added parameters to DATABASE_URL:', params.join(', '))
  }
  
  process.env.DATABASE_URL = url
  console.log('✅ DATABASE_URL is configured')
} else {
  console.error('❌ No valid PostgreSQL connection string found!')
  console.error('❌ SUPABASE_DATABASE_URL from Netlify extension might be the project URL, not the connection string')
  console.error('❌ You need to get the PostgreSQL connection string from Supabase dashboard')
  console.error('❌ Go to Supabase → Settings → Database → Connection string (Session mode)')
  console.warn('⚠️  Build will continue but migrations will be skipped')
}

