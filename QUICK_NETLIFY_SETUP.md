# Quick Netlify Setup Guide

You're already logged in! ✅

## Option 1: If you already have a Netlify site

1. **Link to existing site:**
   ```powershell
   netlify link
   ```
   - Select your existing site from the list

2. **Connect Supabase:**
   - Go to https://app.netlify.com
   - Select your site
   - Go to **Integrations** → **Supabase**
   - Connect your Supabase project (this automatically adds DATABASE_URL)

3. **Set environment variables:**
   ```powershell
   netlify env:set NEXTAUTH_SECRET "generate-a-random-string-here"
   netlify env:set NEXTAUTH_URL "https://your-site-name.netlify.app"
   netlify env:set RSS_FEED_URL "https://anchor.fm/s/d89491c4/podcast/rss"
   netlify env:set YOUTUBE_API_KEY "your-youtube-api-key"
   netlify env:set NEXT_PUBLIC_BASE_URL "https://your-site-name.netlify.app"
   ```

4. **Deploy:**
   ```powershell
   netlify deploy --prod
   ```

## Option 2: Create a new site

1. **Create new site:**
   ```powershell
   netlify init
   ```
   - Select: **"Create & configure a new project"**
   - Choose a site name (or press Enter for default)
   - Build command: `npx prisma generate && npm run build` (already set)
   - Publish directory: `.next` (already set)

2. **Connect Supabase:**
   - Go to https://app.netlify.com
   - Select your new site
   - Go to **Integrations** → **Supabase**
   - Connect your Supabase project

3. **Set environment variables** (same as Option 1, step 3)

4. **Deploy** (same as Option 1, step 4)

## After deployment:

1. **Run database migrations:**
   - Get your Supabase connection string from Supabase dashboard
   - Run: `npx prisma migrate deploy` (you may need to set DATABASE_URL temporarily)

2. **Create admin user:**
   - Once deployed, you can create an admin user via the admin panel

## Need help?

- Check `NETLIFY_SETUP.md` for detailed instructions
- Run `netlify help` for all available commands

