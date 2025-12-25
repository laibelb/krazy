# Setup Guide

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and set:
   - `DATABASE_URL="file:./dev.db"` (or your database URL)
   - `NEXTAUTH_SECRET` - Generate a random string (e.g., `openssl rand -base64 32`)
   - `RSS_FEED_URL` - Your RSS feed URL (e.g., `https://anchor.fm/s/d89491c4/podcast/rss`)

3. **Initialize the database:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Create an admin user:**
   ```bash
   npm run create-admin admin@example.com your-secure-password
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Access the site:**
   - Homepage: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin

## Platform Logos

Copy the platform logos from the old site to `public/logos/`:
- `youtube.svg`
- `youtubemusic.svg`
- `spotify.svg`
- `applepodcasts.svg`
- `amazonmusic.svg`
- `pocketcasts.svg`
- `24six.svg`
- `castbox.svg`

## First Time Setup

1. Login to the admin panel at `/admin`
2. Click "Sync RSS" to fetch all shiurim from your RSS feed
3. Edit each shiur to add:
   - Blurb (short description)
   - Source document link
   - Platform links (YouTube, Spotify, etc.)

## Features

### Admin Panel
- **Sync RSS**: Automatically fetch new shiurim from RSS feed
- **Edit Shiurim**: Update title, description, blurb, source doc, and platform links
- **Add New**: Manually add shiurim
- **Delete**: Remove shiurim

### Audio Player
- Play/pause controls
- Skip forward/backward (10 seconds)
- Volume control
- Playback speed (0.75x, 1x, 1.25x, 1.5x, 2x)
- Progress bar with seeking

### Platform Links
Support for:
- YouTube
- YouTube Music
- Spotify
- Apple Podcasts
- Amazon Music
- Pocket Casts
- 24Six
- Castbox

## Database

The app uses SQLite by default (good for development). For production, consider using PostgreSQL:

1. Update `DATABASE_URL` in `.env`:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
   ```

2. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

3. Run migrations:
   ```bash
   npx prisma migrate dev
   ```

## Troubleshooting

### Database errors
- Make sure you've run `npx prisma generate` and `npx prisma db push`
- Check that `DATABASE_URL` is set correctly in `.env`

### RSS sync not working
- Verify `RSS_FEED_URL` is correct in `.env`
- Check that the RSS feed is publicly accessible
- Look at the browser console and server logs for errors

### Admin login not working
- Make sure you've created an admin user with `npm run create-admin`
- Check that cookies are enabled in your browser
- Verify the password is correct

## Production Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import to Vercel
3. Add environment variables:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `RSS_FEED_URL`
4. Deploy!

### Other Platforms

- Set up a PostgreSQL database
- Update `DATABASE_URL`
- Run `npx prisma migrate deploy`
- Set all environment variables
- Build and deploy: `npm run build && npm start`

