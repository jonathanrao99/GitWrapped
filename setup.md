# Quick Setup Guide

## Step 1: Create GitHub Personal Access Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a name like "GitWrapped"
4. Select these scopes:
   - ✅ `read:user`
   - ✅ `read:email` 
   - ✅ `read:org`
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again!)

## Step 2: Create Environment File

1. Copy the example file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and replace the placeholder:
   ```
   NEXT_PUBLIC_GITHUB_TOKEN=ghp_your_actual_token_here
   ```

## Step 3: Run the Application

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000)

## Troubleshooting

### Still getting 401 errors?
- Make sure you copied the entire token (it starts with `ghp_`)
- Check that the token hasn't expired
- Verify the scopes are correct

### User not found?
- Try with a known public GitHub username like "octocat"
- Make sure the username is spelled correctly

### Need help?
Check the main README.md for more detailed instructions. 