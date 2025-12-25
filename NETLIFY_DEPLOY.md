# Deploying to Netlify

## Important Notes Before Deploying

⚠️ **SQLite won't work on Netlify** - Netlify uses serverless functions that don't support SQLite. You'll need to use a cloud database like:
- **PostgreSQL** (recommended): Supabase, Neon, Railway, or Vercel Postgres
- **MySQL**: PlanetScale
- **MongoDB**: MongoDB Atlas

## Step 1: Set Up a Cloud Database

### Option A: Supabase (Recommended - Free Tier Available)

1. Go to [supabase.com](https://supabase.com) and create an account
2. Create a new project
3. Go to Settings → Database
4. Copy the connection string (looks like: `postgresql://user:password@host:5432/dbname`)
5. Update your `.env` file with this connection string

### Option B: Neon (Free PostgreSQL)

1. Go to [neon.tech](https://neon.tech) and create an account
2. Create a new project
3. Copy the connection string
4. Update your `.env` file

## Step 2: Update Prisma Schema for PostgreSQL

Update `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Then run:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

## Step 3: Deploy to Netlify

### Method 1: Deploy via Netlify Dashboard

1. **Push your code to GitHub** (already done ✅)

2. **Go to Netlify:**
   - Visit [app.netlify.com](https://app.netlify.com)
   - Sign up or log in with GitHub

3. **Import your repository:**
   - Click "Add new site" → "Import an existing project"
   - Select "GitHub" and authorize Netlify
   - Find and select `laibelb/krazy`
   - Click "Import"

4. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `.next` (or leave default)
   - Netlify will auto-detect Next.js settings

5. **Add environment variables:**
   - Go to Site settings → Environment variables
   - Add all variables from your `.env` file:
     - `DATABASE_URL` - Your PostgreSQL connection string
     - `NEXTAUTH_SECRET` - Generate a random string
     - `NEXTAUTH_URL` - Your Netlify site URL (e.g., `https://your-site.netlify.app`)
     - `RSS_FEED_URL` - Your RSS feed URL
     - `YOUTUBE_API_KEY` - Your YouTube API key (optional)
     - `NEXT_PUBLIC_BASE_URL` - Your Netlify site URL

6. **Deploy:**
   - Click "Deploy site"
   - Wait for build to complete

### Method 2: Deploy via Netlify CLI

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify:**
   ```bash
   netlify login
   ```

3. **Initialize Netlify:**
   ```bash
   netlify init
   ```
   - Follow prompts to link to your site
   - Build command: `npm run build`
   - Publish directory: `.next`

4. **Set environment variables:**
   ```bash
   netlify env:set DATABASE_URL "your-postgresql-connection-string"
   netlify env:set NEXTAUTH_SECRET "your-secret-key"
   netlify env:set NEXTAUTH_URL "https://your-site.netlify.app"
   netlify env:set RSS_FEED_URL "your-rss-feed-url"
   netlify env:set YOUTUBE_API_KEY "your-youtube-api-key"
   netlify env:set NEXT_PUBLIC_BASE_URL "https://your-site.netlify.app"
   ```

5. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

## Step 4: Run Database Migrations

After deployment, you need to run migrations on your production database:

```bash
# Set your production DATABASE_URL
export DATABASE_URL="your-production-postgresql-connection-string"

# Run migrations
npx prisma migrate deploy
```

Or use Netlify's build command to run migrations automatically by updating `netlify.toml`:

```toml
[build]
  command = "npx prisma migrate deploy && npm run build"
```

## Step 5: Create Admin User

After deployment, create an admin user by running:

```bash
npm run create-admin
```

Or connect to your production database and create a user manually.

## Troubleshooting

### Build Fails
- Check build logs in Netlify dashboard
- Ensure all environment variables are set
- Verify database connection string is correct

### Database Connection Issues
- Make sure your database allows connections from Netlify's IPs
- Check if your database requires SSL (add `?sslmode=require` to connection string)

### Function Timeout
- Netlify functions have a 10-second timeout on free tier
- Consider upgrading or optimizing database queries

## Next Steps

- Set up a custom domain (optional)
- Configure automatic deployments from GitHub
- Set up monitoring and error tracking

