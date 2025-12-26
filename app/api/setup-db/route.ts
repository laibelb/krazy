import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export const dynamic = 'force-dynamic'

/**
 * One-time database setup endpoint
 * Call this once after deployment to set up your database schema
 * 
 * Usage: GET https://your-site.netlify.app/api/setup-db
 */
export async function GET() {
  try {
    const prisma = new PrismaClient()
    
    // Try to connect and create tables if they don't exist
    // This will create the schema based on your Prisma schema
    await prisma.$connect()
    
    // Test query to ensure tables exist
    await prisma.user.findFirst()
    
    await prisma.$disconnect()
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database schema is set up correctly' 
    })
  } catch (error: any) {
    // If tables don't exist, we need to push the schema
    if (error.code === 'P2021' || error.message?.includes('does not exist')) {
      try {
        const { execSync } = require('child_process')
        execSync('npx prisma db push', { stdio: 'inherit' })
        return NextResponse.json({ 
          success: true, 
          message: 'Database schema has been created' 
        })
      } catch (pushError: any) {
        return NextResponse.json({ 
          success: false, 
          error: 'Failed to set up database schema',
          details: pushError.message 
        }, { status: 500 })
      }
    }
    
    return NextResponse.json({ 
      success: false, 
      error: 'Database connection error',
      details: error.message 
    }, { status: 500 })
  }
}

