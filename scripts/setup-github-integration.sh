#!/bin/bash

# ras-UI GitHub-Vercel Integration Setup
# This script helps you get the required tokens and IDs for GitHub Actions

set -e

echo "🔗 GitHub-Vercel Integration Setup"
echo "=================================="
echo ""

# Check if Vercel CLI is installed and user is logged in
if ! command -v vercel &> /dev/null; then
    echo "❌ Error: Vercel CLI not found. Install with: npm install -g vercel"
    exit 1
fi

if ! vercel whoami &> /dev/null; then
    echo "❌ Error: Not logged in to Vercel. Run: vercel login"
    exit 1
fi

echo "✅ Vercel CLI detected and authenticated"
echo ""

# Check if we're in a deployed project directory
if [ ! -f ".vercel/project.json" ]; then
    echo "⚠️  No .vercel/project.json found. Make sure you've deployed the project first:"
    echo "   pnpm deploy-storybook"
    echo ""
    echo "💡 If you've deployed but don't see the file, try running from:"
    echo "   cd packages/docs/storybook-static"
    echo "   vercel link"
    exit 1
fi

echo "📋 GitHub Secrets Required for Actions Integration:"
echo "=================================================="
echo ""

# Get project info from .vercel/project.json
if [ -f ".vercel/project.json" ]; then
    PROJECT_ID=$(cat .vercel/project.json | grep -o '"projectId":"[^"]*' | cut -d'"' -f4)
    ORG_ID=$(cat .vercel/project.json | grep -o '"orgId":"[^"]*' | cut -d'"' -f4)
    
    echo "🆔 VERCEL_PROJECT_ID:"
    echo "   ${PROJECT_ID}"
    echo ""
    
    echo "🏢 VERCEL_ORG_ID:"
    echo "   ${ORG_ID}"
    echo ""
else
    echo "❌ Could not read project.json file"
fi

echo "🔑 VERCEL_TOKEN:"
echo "   ⚠️  You need to generate this manually:"
echo "   1. Go to https://vercel.com/account/tokens"
echo "   2. Click 'Create Token'"
echo "   3. Name it 'GitHub Actions - ras-UI'"
echo "   4. Copy the generated token"
echo ""

echo "📝 How to Add These to GitHub:"
echo "=============================="
echo "1. Go to your GitHub repository"
echo "2. Click Settings > Secrets and variables > Actions"
echo "3. Add these three secrets:"
echo ""
echo "   Name: VERCEL_TOKEN"
echo "   Value: [token from step above]"
echo ""
echo "   Name: VERCEL_ORG_ID" 
echo "   Value: ${ORG_ID:-[from project.json]}"
echo ""
echo "   Name: VERCEL_PROJECT_ID"
echo "   Value: ${PROJECT_ID:-[from project.json]}"
echo ""

echo "🚀 Once Added:"
echo "=============="
echo "• Push to main branch → Production deployment"
echo "• Create pull request → Preview deployment"  
echo "• Automatic comments with preview URLs"
echo ""

echo "💡 Alternative: Use Vercel GitHub Integration"
echo "=============================================="
echo "Instead of manual tokens, you can:"
echo "1. Go to https://vercel.com/dashboard"
echo "2. Import your GitHub repository"
echo "3. Vercel will handle deployments automatically"
echo "4. No GitHub secrets needed!"
echo ""

# Check if user wants to set up Vercel GitHub integration
read -p "🤔 Would you like me to show you how to set up Vercel GitHub integration instead? (y/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "🔗 Vercel GitHub Integration Setup:"
    echo "================================="
    echo "1. Visit: https://vercel.com/new"
    echo "2. Click 'Import Git Repository'"
    echo "3. Select your ras-UI repository"
    echo "4. Configure these settings:"
    echo "   • Build Command: pnpm build-storybook"
    echo "   • Output Directory: packages/docs/storybook-static" 
    echo "   • Root Directory: ./ (project root)"
    echo "5. Click Deploy"
    echo ""
    echo "✅ This approach handles everything automatically!"
    echo "   • No GitHub secrets needed"
    echo "   • Automatic deployments"
    echo "   • Preview deployments for PRs"
    echo ""
fi

echo "🎉 Setup complete! Choose your preferred approach:"
echo "1. GitHub Actions (requires manual secrets)"
echo "2. Vercel GitHub Integration (fully automatic)"