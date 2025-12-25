# GitHub Authentication Setup

Your Git is configured with username `laibelb`. To push to GitHub, you need to authenticate.

## Option 1: Personal Access Token (Recommended)

1. **Create a Personal Access Token:**
   - Go to GitHub.com → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Click "Generate new token (classic)"
   - Give it a name (e.g., "krazy-repo")
   - Select scopes: Check `repo` (full control of private repositories)
   - Click "Generate token"
   - **Copy the token immediately** (you won't see it again!)

2. **Use the token when pushing:**
   - When Git asks for password, paste your token instead
   - Username: `laibelb`
   - Password: `your-personal-access-token`

## Option 2: GitHub CLI (gh)

1. **Install GitHub CLI:**
   ```powershell
   winget install --id GitHub.cli
   ```

2. **Authenticate:**
   ```powershell
   gh auth login
   ```
   - Follow the prompts
   - Select GitHub.com
   - Choose your preferred authentication method

3. **Configure Git to use GitHub CLI:**
   ```powershell
   gh auth setup-git
   ```

## Option 3: SSH Key (Advanced)

1. Generate SSH key:
   ```powershell
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

2. Add to GitHub:
   - Copy `~/.ssh/id_ed25519.pub`
   - GitHub → Settings → SSH and GPG keys → New SSH key

3. Change remote to SSH:
   ```powershell
   git remote set-url origin git@github.com:laibelb/krazy.git
   ```

## Test Your Connection

After setting up authentication, test it:
```powershell
git push
```

If you see authentication errors, make sure:
- Your token has `repo` permissions
- You're using the token as the password (not your GitHub password)
- The remote URL is correct: `https://github.com/laibelb/krazy.git`

