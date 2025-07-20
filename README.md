# GitWrapped

A Next.js application that generates GitHub contribution statistics and visualizations similar to Spotify Wrapped. Get your personalized GitHub year-in-review with detailed statistics, contribution graphs, and streak analysis.

## Features

- **GitHub Statistics**: Followers, repositories, pull requests, issues, commits, and more
- **Contribution Analysis**: Current and longest streaks with detailed date ranges
- **Visual Contribution Graph**: GitHub-style contribution calendar visualization
- **Modern UI**: Beautiful, responsive interface with animations
- **Real-time Data**: Fetches live data from GitHub's GraphQL API

## Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- GitHub Personal Access Token

## Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gitwrapped
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up GitHub Personal Access Token**
   
   You need a GitHub Personal Access Token to access the GitHub API:
   
   - Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
   - Click "Generate new token (classic)"
   - Give it a name like "GitWrapped"
   - Select these scopes:
     - `read:user`
     - `read:email` 
     - `read:org`
   - Copy the generated token

4. **Create environment file**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your GitHub token:
   ```
   NEXT_PUBLIC_GITHUB_TOKEN=your_github_personal_access_token_here
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. Enter a GitHub username in the input field
2. Click the arrow button or press Enter
3. Wait for the data to load
4. View the generated statistics and contribution graph

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Recoil
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **API**: GitHub GraphQL API

## Project Structure

```
gitwrapped/
├── actions/           # API calls and data fetching
├── app/              # Next.js app router pages
├── components/       # React components
│   ├── Github/      # GitHub-related components
│   ├── Input/       # Form components
│   └── ui/          # Reusable UI components
├── hooks/           # Custom React hooks
├── Recoil/          # State management
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
└── public/          # Static assets
```

## Troubleshooting

### 401 Unauthorized Error
- Make sure you've set the `NEXT_PUBLIC_GITHUB_TOKEN` environment variable
- Verify your GitHub token has the correct scopes
- Check that the token hasn't expired

### User Not Found Error
- Verify the GitHub username is correct
- Check that the user has a public profile
- Ensure the user exists on GitHub

### No Contributions Found
- The user might not have any contributions in the current year
- Check if the user has any public repositories or activity

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [GitHub GraphQL API](https://docs.github.com/en/graphql)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Recoil](https://recoiljs.org/docs/introduction/getting-started)
