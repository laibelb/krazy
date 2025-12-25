# GitHub Repository Setup Guide

Follow these steps to create a GitHub repository and push your project:

## Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Fill in:
   - **Repository name**: `rabbikraz` (or your preferred name)
   - **Description**: "Rabbi Kraz website with admin panel and YouTube integration"
   - **Visibility**: Choose **Public** (so others can download) or **Private**
   - **DO NOT** check "Initialize with README" (we already have files)
4. Click **"Create repository"**

## Step 2: Initialize Git and Push to GitHub

Run these commands in your terminal (PowerShell) from the project directory:

```powershell
# Navigate to your project
cd c:\Users\laibe\Downloads\rabbikraz

# Initialize git repository
git init

# Add all files (except those in .gitignore)
git add .

# Create initial commit
git commit -m "Initial commit: Rabbi Kraz website with admin panel"

# Add the GitHub repository as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/rabbikraz.git

# Rename default branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 3: Create a README for Others

The repository should have a README.md file. Let me create one for you that explains how to set up the project.

## Important Notes:

- **Never commit `.env` file** - It contains sensitive API keys and secrets
- The `.gitignore` file is already set up to exclude:
  - `.env` files
  - `node_modules/`
  - Database files (`dev.db`)
  - Build files (`.next/`)
  - Other sensitive files

## For Others to Download:

Once pushed, others can download your project by:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/rabbikraz.git
   cd rabbikraz
   ```

2. **Or download as ZIP:**
   - Go to your repository on GitHub
   - Click the green **"Code"** button
   - Select **"Download ZIP"**

## Updating the Repository Later:

When you make changes and want to push updates:

```powershell
git add .
git commit -m "Description of your changes"
git push
```

