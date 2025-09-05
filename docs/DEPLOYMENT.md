# Storybook Deployment Guide

This document outlines how to set up and deploy the ras-UI Storybook to Vercel using both CLI and automated CI/CD approaches.

## Overview

The Storybook is automatically deployed to Vercel when changes are pushed to the main branch or when pull requests are created that affect:

- `packages/docs/**` (Storybook configuration)
- `packages/react/src/**` (React components)
- `packages/tokens/**` (Design tokens)

## 🚀 Quick Start with CLI

### Option 1: One-Command Deployment

```bash
# Authenticate with Vercel (first time only)
vercel login

# Deploy Storybook
pnpm deploy-storybook
```

### Option 2: Manual Steps

```bash
# 1. Build the project
pnpm build-storybook

# 2. Deploy to Vercel
cd packages/docs/storybook-static
vercel --yes
```

## Setup Requirements

### 1. Vercel Project Setup

1. **Create a Vercel account** and connect your GitHub repository
2. **Import the project** in Vercel dashboard
3. **Configure the project settings**:
   - Framework Preset: `Other`
   - Root Directory: `./`
   - Build Command: `pnpm build-storybook`
   - Output Directory: `packages/docs/storybook-static`
   - Install Command: `pnpm install --frozen-lockfile`

### 2. GitHub Secrets Configuration

Add the following secrets to your GitHub repository settings:

```
VERCEL_TOKEN         # Vercel API token (Account Settings > Tokens)
VERCEL_ORG_ID        # Vercel organization ID (Team Settings > General)
VERCEL_PROJECT_ID    # Vercel project ID (Project Settings > General)
```

To find these values:

- **VERCEL_TOKEN**: Go to Vercel Account Settings > Tokens > Create Token
- **VERCEL_ORG_ID**: Found in Team Settings > General or in `.vercel/project.json` after linking
- **VERCEL_PROJECT_ID**: Found in Project Settings > General or in `.vercel/project.json` after linking

### 3. Environment Variables (Optional)

If needed, you can set environment variables in Vercel dashboard:

- `NODE_ENV=production` (automatically set)
- Any custom environment variables for your Storybook

## Deployment Process

### Automatic Deployment

1. **Push to main branch**: Triggers production deployment
2. **Create pull request**: Triggers preview deployment
3. **GitHub Actions** run quality checks and deploy to Vercel
4. **Preview URLs** are automatically commented on pull requests

### Manual Deployment

```bash
# Build locally
pnpm build-storybook

# Preview locally
pnpm preview-storybook

# Deploy using Vercel CLI (if configured)
vercel --prod
```

## Build Process

The build process includes:

1. **Install dependencies** with pnpm
2. **Build design tokens** (`pnpm tokens:all`)
3. **Type checking** (`pnpm type-check`)
4. **Linting** (`pnpm lint`)
5. **Build Storybook** (`pnpm build-storybook`)
6. **Deploy to Vercel**

## File Structure

```
ras-UI/
├── .github/workflows/
│   ├── deploy-storybook.yml    # Deployment workflow
│   └── storybook-quality.yml   # Quality checks
├── packages/docs/
│   ├── .storybook/             # Storybook configuration
│   ├── storybook-static/       # Build output (generated)
│   └── package.json
├── vercel.json                 # Vercel configuration
└── DEPLOYMENT.md              # This file
```

## Configuration Files

### vercel.json

- Defines build commands and output directory
- Configures caching and rewrites
- Sets up ignore patterns for efficient builds

### .github/workflows/deploy-storybook.yml

- Handles automatic deployment on push/PR
- Runs on Ubuntu with Node.js 18
- Uses pnpm for dependency management

### .github/workflows/storybook-quality.yml

- Runs quality checks before deployment
- Verifies build integrity
- Uploads artifacts on failure for debugging

## Optimization Features

- **Code splitting**: Vendor and Storybook chunks separated
- **Caching**: Static assets cached for 1 year
- **Quiet builds**: Reduced console output for cleaner logs
- **Path-based triggers**: Only builds when relevant files change

## Troubleshooting

### Build Failures

1. **Check GitHub Actions logs** for detailed error messages
2. **Run locally** to reproduce issues:
   ```bash
   pnpm install
   pnpm tokens:all
   pnpm build-storybook
   ```
3. **Verify dependencies** are correctly installed
4. **Check token generation** if styling issues occur

### Deployment Issues

1. **Verify Vercel secrets** are correctly set
2. **Check Vercel project configuration**
3. **Review build logs** in Vercel dashboard
4. **Test preview deployment** with a pull request

### Performance Issues

1. **Analyze bundle size** with `pnpm build:analyze`
2. **Review chunk splitting** configuration
3. **Check for large dependencies** in node_modules
4. **Optimize image assets** if applicable

## URLs

- **Production**: `https://ras-ui-storybook.vercel.app`
- **Preview**: `https://ras-ui-storybook-git-[branch]-[team].vercel.app`

## Support

For deployment issues:

1. Check GitHub Actions logs
2. Review Vercel dashboard
3. Consult this documentation
4. Create an issue in the repository
