# Netlify Setup with Supabase

## Quick Setup Steps

1. **Login to Netlify:**
   ```bash
   netlify login
   ```
   This will open a browser for authentication.

2. **Link your site:**
   ```bash
   netlify init
   ```
   - Choose "Create & configure a new site"
   - Choose a site name (or use default)
   - Your build command is already set: `npx prisma generate && npm run build`
   - Publish directory: `.next`

3. **Set up Supabase database:**
   - In Netlify dashboard, go to your site
   - Go to "Integrations" → "Supabase"
   - Connect your Supabase project
   - This will automatically add the `DATABASE_URL` environment variable

4. **Add other environment variables:**
   ```bash
   netlify env:set NEXTAUTH_SECRET "your-random-secret-here"
   netlify env:set NEXTAUTH_URL "https://your-site-name.netlify.app"
   netlify env:set RSS_FEED_URL "https://anchor.fm/s/d89491c4/podcast/rss"
   netlify env:set YOUTUBE_API_KEY "your-youtube-api-key"
   netlify env:set NEXT_PUBLIC_BASE_URL "https://your-site-name.netlify.app"
   ```

5. **Run database migrations:**
   ```bash
   # Set DATABASE_URL temporarily
   export DATABASE_URL="your-supabase-connection-string"
   npx prisma migrate deploy
   ```

6. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

## Alternative: Use Netlify UI

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect GitHub and select `laibelb/krazy`
4. In Site settings → Integrations → Supabase, connect your Supabase project
5. Go to Site settings → Environment variables and add:
   - `NEXTAUTH_SECRET` (generate a random string)
   - `NEXTAUTH_URL` (your Netlify site URL)
   - `RSS_FEED_URL`
   - `YOUTUBE_API_KEY` (optional)
   - `NEXT_PUBLIC_BASE_URL` (your Netlify site URL)
6. Deploy!

