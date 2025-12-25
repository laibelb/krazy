# Netlify Setup Script
# Run this script to set up your Netlify deployment

Write-Host "Setting up Netlify deployment..." -ForegroundColor Green

# Check if already linked
$linked = netlify status 2>&1
if ($linked -match "linked to a project") {
    Write-Host "Site is already linked!" -ForegroundColor Yellow
    netlify status
    exit
}

Write-Host "`nPlease choose an option:" -ForegroundColor Cyan
Write-Host "1. Create a new Netlify site"
Write-Host "2. Link to an existing Netlify site"
Write-Host "`nFor option 1, run: netlify init" -ForegroundColor Yellow
Write-Host "Then select: 'Create & configure a new project'" -ForegroundColor Yellow
Write-Host "`nFor option 2, run: netlify link" -ForegroundColor Yellow
Write-Host "Then select your existing site" -ForegroundColor Yellow

Write-Host "`nAfter linking, you'll need to:" -ForegroundColor Cyan
Write-Host "1. Connect Supabase in Netlify dashboard (Integrations -> Supabase)"
Write-Host "2. Set environment variables (see NETLIFY_SETUP.md)"
Write-Host "3. Run: netlify deploy --prod" -ForegroundColor Green

