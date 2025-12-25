# Rabbi Kraz Website

A modern Next.js website for Rabbi Kraz with admin panel, RSS feed integration, and YouTube playlist/video management.

## Features

- 🎙️ **RSS Feed Integration** - Automatically syncs shiurim from RSS feed
- 🎵 **Audio Player** - Custom audio player with playback controls and speed options
- 📄 **Source Sheet Viewer** - Embedded PDF/Document viewer for source sheets
- 🎬 **YouTube Integration** - Displays playlists and videos from YouTube channel
- 👨‍💼 **Admin Panel** - Manage shiurim, update titles, blurbs, links, and source documents
- 📱 **Mobile Responsive** - Fully responsive design for all devices
- 🎨 **Modern UI** - Clean, professional design matching rabbikraz.com

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Prisma** - Database ORM with SQLite
- **Tailwind CSS** - Utility-first CSS framework
- **YouTube Data API v3** - For playlist and video integration

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- YouTube API key (for playlists/videos pages)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/laibelb/krazy.git
   cd krazy
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   RSS_FEED_URL=https://anchor.fm/s/d89491c4/podcast/rss
   YOUTUBE_API_KEY=your-youtube-api-key-here
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Set up the database:**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. **Create an admin user:**
   ```bash
   npm run create-admin
   ```
   Follow the prompts to enter email and password.

6. **Run the development server:**
   ```bash
   npm run dev
   ```

7. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## YouTube API Setup

To enable the playlists and videos pages, you need a YouTube Data API key:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the "YouTube Data API v3"
4. Go to "Credentials" → "Create Credentials" → "API Key"
5. Copy your API key and add it to `.env` as `YOUTUBE_API_KEY`

## Admin Panel

Access the admin panel at `/admin` and log in with your admin credentials.

### Features:
- **RSS Sync** - Sync shiurim from RSS feed
- **Edit Shiurim** - Update title, blurb, description, source document, and platform links
- **Delete Shiurim** - Remove shiurim from the database
- **Platform Links** - Manage links to YouTube, Spotify, Apple Podcasts, Amazon, Pocket Casts, 24Six, Castbox, and YouTube Music

## Project Structure

```
rabbikraz/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   ├── shiur/             # Individual shiur pages
│   ├── playlists/         # YouTube playlists page
│   ├── videos/            # YouTube videos page
│   └── ...
├── components/            # React components
├── lib/                   # Utility functions
├── prisma/                # Prisma schema
└── public/                # Static assets
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run create-admin` - Create admin user
- `npx prisma studio` - Open Prisma Studio (database GUI)

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | SQLite database path | Yes |
| `NEXTAUTH_URL` | Base URL for authentication | Yes |
| `NEXTAUTH_SECRET` | Secret key for JWT tokens | Yes |
| `RSS_FEED_URL` | RSS feed URL for shiurim | Yes |
| `YOUTUBE_API_KEY` | YouTube Data API key | Optional (for playlists/videos) |
| `NEXT_PUBLIC_BASE_URL` | Public base URL | Optional |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Support

For issues or questions, please contact the repository owner.
