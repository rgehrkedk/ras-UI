#!/bin/bash

# ras-UI Storybook Deployment Script
# This script builds and deploys the Storybook to Vercel

set -e  # Exit on any error

echo "🚀 ras-UI Storybook Deployment"
echo "================================"

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "packages/docs" ]; then
    echo "❌ Error: Run this script from the project root directory"
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Error: Vercel CLI not found. Install with: npm install -g vercel"
    exit 1
fi

# Check if user is logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please log in to Vercel first:"
    echo "   vercel login"
    exit 1
fi

echo "📦 Building design tokens..."
pnpm tokens:all

echo "🏗️ Building Storybook..."
pnpm build-storybook

echo "✅ Build completed successfully!"

# Check if build output exists
if [ ! -d "packages/docs/storybook-static" ]; then
    echo "❌ Error: Storybook build failed - output directory not found"
    exit 1
fi

echo "🌐 Deploying to Vercel..."

# Deploy to Vercel
cd packages/docs/storybook-static
vercel --yes

echo ""
echo "✅ Deployment completed!"
echo ""
echo "🔗 Your Storybook is now live!"
echo "   • Check your Vercel dashboard for the URL"
echo "   • Set up custom domain if needed: vercel domains add yourdomain.com"
echo "   • Configure GitHub integration for automatic deployments"
echo ""
echo "📋 Next steps:"
echo "   1. Visit your Vercel dashboard to see the deployment"
echo "   2. Set up GitHub integration for automatic deployments"
echo "   3. Configure custom domain (optional)"
echo ""