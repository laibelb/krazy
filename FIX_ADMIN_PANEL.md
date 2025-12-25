# Fix Admin Panel Internal Error

The admin panel is showing an internal error, which is likely due to one of these issues:

## Common Causes:

1. **Database not connected** - DATABASE_URL not set or incorrect
2. **Database tables don't exist** - Migrations haven't been run
3. **Prisma Client not generated** - Need to run `prisma generate`
4. **No admin user exists** - Need to create an admin user

## Fix Steps:

### 1. Check Database Connection

Make sure `DATABASE_URL` is set in your environment:
- **Local**: Check your `.env` file
- **Netlify**: Go to Site settings → Environment variables

### 2. Run Database Migrations

```bash
# Make sure DATABASE_URL is set
npx prisma generate
npx prisma migrate deploy
```

Or if you're setting up for the first time:
```bash
npx prisma migrate dev --name init
```

### 3. Create Admin User

```bash
npm run create-admin your-email@example.com your-password
```

### 4. Check Error Messages

The improved error handling will now show:
- "Database not configured" - DATABASE_URL is missing
- "Database connection error" - Can't connect to database
- "Invalid credentials" - Wrong email/password

### 5. For Netlify Deployment:

1. Make sure Supabase is connected in Netlify Integrations
2. Verify DATABASE_URL is set automatically
3. Run migrations on your production database:
   ```bash
   # Set DATABASE_URL to your Supabase connection string
   export DATABASE_URL="your-supabase-connection-string"
   npx prisma migrate deploy
   ```
4. Create admin user (you may need to do this via a script or directly in the database)

### 6. Test Database Connection

You can test if your database is working:
```bash
npx prisma studio
```

This will open a GUI to view your database. If it doesn't open, your DATABASE_URL is likely incorrect.

## Still Having Issues?

Check the browser console and server logs for detailed error messages. The improved error handling will show more specific errors now.

