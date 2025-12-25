# Simple Steps - Do These 3 Things

## Step 1: Run Migrations
```bash
netlify env:get DATABASE_URL
```
Copy that URL, then:
```bash
$env:DATABASE_URL="paste-the-url-here"
npx prisma migrate deploy
```

## Step 2: Create Admin User
```bash
$env:DATABASE_URL="paste-the-url-here"
node create-admin-netlify.js your-email@example.com your-password
```

## Step 3: Deploy
```bash
git add .
git commit -m "Ready for deployment"
git push
```

Done! Your admin panel should work at: https://your-site.netlify.app/admin

