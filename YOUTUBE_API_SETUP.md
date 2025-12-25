# YouTube API Setup for Playlists

To enable the playlists page, you need to set up a YouTube Data API key:

1. **Get a YouTube API Key:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the "YouTube Data API v3"
   - Go to "Credentials" → "Create Credentials" → "API Key"
   - Copy your API key

2. **Add to .env file:**
   ```
   YOUTUBE_API_KEY=your-actual-api-key-here
   ```

3. **Restart your dev server:**
   ```bash
   npm run dev
   ```

The playlists page will automatically fetch all playlists from the Rabbi Kraz YouTube channel.

