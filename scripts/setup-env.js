// Setup script to ensure DATABASE_URL is set from Supabase extension variables
// This runs before Prisma commands during build

console.log('🔍 Auto-configuring database connection from Supabase extension...')

// Log all Supabase-related env vars (without values for security)
const supabaseVars = Object.keys(process.env).filter(k => 
  k.includes('SUPABASE') || k.includes('DATABASE') || k.includes('POSTGRES')
)
console.log('📋 Available env vars:', supabaseVars.join(', ') || 'none')

let dbUrl = null

// First, check if we already have a valid PostgreSQL connection string
const existingDbUrl = process.env.DATABASE_URL
if (existingDbUrl && existingDbUrl.startsWith('postgres')) {
  dbUrl = existingDbUrl
  console.log('✅ Using existing DATABASE_URL')
} else {
  // Check other possible variables that might have connection strings
  const possibleVars = [
    'POSTGRES_URL',
    'POSTGRES_PRISMA_URL',
    'POSTGRES_URL_NON_POOLING',
    'SUPABASE_POSTGRES_URL',
    'SUPABASE_DATABASE_URL'
  ]
  
  for (const varName of possibleVars) {
    if (process.env[varName] && process.env[varName].startsWith('postgres')) {
      dbUrl = process.env[varName]
      console.log(`✅ Found PostgreSQL connection string in ${varName}`)
      break
    }
  }
  
  // If SUPABASE_DATABASE_URL is the project URL (not a connection string), construct it
  const supabaseProjectUrl = process.env.SUPABASE_DATABASE_URL
  if (!dbUrl && supabaseProjectUrl && !supabaseProjectUrl.startsWith('postgres')) {
    console.log('🔧 Constructing connection string from Supabase project URL...')
    
    // Extract project ID from URL like https://xkvfpsycjfkfoivmfwxd.supabase.co
    const projectMatch = supabaseProjectUrl.match(/https?:\/\/([^.]+)\.supabase\.co/)
    if (projectMatch) {
      const projectId = projectMatch[1]
      console.log(`✅ Extracted project ID: ${projectId}`)
      
      // Try to extract password from existing DATABASE_URL if it exists
      let password = null
      if (existingDbUrl) {
        const passwordMatch = existingDbUrl.match(/postgres(?:ql)?:\/\/[^:]+:([^@]+)@/)
        if (passwordMatch) {
          password = passwordMatch[1]
          console.log('✅ Extracted password from existing DATABASE_URL')
        }
      }
      
      // If we have password, construct pooler connection string
      if (password) {
        // Use pooler connection (port 6543) with correct username format: postgres.PROJECT_REF
        // Try multiple regions - start with us-east-1, fallback to others
        const regions = ['us-east-1', 'us-west-1', 'eu-west-1', 'ap-southeast-1']
        // Use the first region for now - if it fails, we'll know from the error
        dbUrl = `postgresql://postgres.${projectId}:${password}@aws-0-us-east-1.pooler.supabase.com:6543/postgres`
        console.log('✅ Constructed pooler connection string with project reference in username')
      } else {
        console.warn('⚠️  Password not found - cannot auto-construct connection string')
        console.warn('⚠️  Please set DATABASE_URL manually in Netlify environment variables')
      }
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
  
  // For Supabase pooler, username MUST be postgres.PROJECT_REF, not just postgres
  // Extract project ID from URL if we have SUPABASE_DATABASE_URL
  if (url.includes(':6543') && !url.includes('postgres.')) {
    const supabaseUrl = process.env.SUPABASE_DATABASE_URL
    if (supabaseUrl) {
      const projectMatch = supabaseUrl.match(/https?:\/\/([^.]+)\.supabase\.co/)
      if (projectMatch) {
        const projectId = projectMatch[1]
        // Fix username to include project reference
        url = url.replace(/postgresql:\/\/postgres:/, `postgresql://postgres.${projectId}:`)
        console.log('✅ Fixed pooler username to include project reference')
      }
    }
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

