#!/bin/bash

# ras-UI GitHub Secrets Setup
# This script automatically configures GitHub secrets for Vercel deployment

set -e

echo "🔐 GitHub Secrets Setup for Vercel Deployment"
echo "=============================================="
echo ""

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo "📥 Installing GitHub CLI..."
    if command -v brew &> /dev/null; then
        brew install gh
    elif command -v apt-get &> /dev/null; then
        sudo apt-get update && sudo apt-get install gh
    else
        echo "❌ Please install GitHub CLI manually:"
        echo "   Visit: https://cli.github.com/"
        exit 1
    fi
fi

# Check if Vercel CLI is installed and user is logged in
if ! command -v vercel &> /dev/null; then
    echo "❌ Error: Vercel CLI not found. Install with: npm install -g vercel"
    exit 1
fi

if ! vercel whoami &> /dev/null; then
    echo "❌ Error: Not logged in to Vercel. Run: vercel login"
    exit 1
fi

# Check GitHub authentication
if ! gh auth status &> /dev/null; then
    echo "🔑 Authenticating with GitHub..."
    gh auth login
fi

echo "✅ GitHub CLI authenticated"
echo ""

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: Not in a git repository. Run this from the project root."
    exit 1
fi

# Get repository info
REPO=$(gh repo view --json nameWithOwner -q '.nameWithOwner')
echo "📁 Repository: $REPO"
echo ""

# Deploy the project first if not already deployed
if [ ! -f "packages/docs/storybook-static/.vercel/project.json" ]; then
    echo "🚀 Deploying project to get Vercel IDs..."
    echo "   (This is needed to get the project and org IDs)"
    echo ""
    
    # Build and deploy
    pnpm build-storybook
    cd packages/docs/storybook-static
    vercel --yes
    cd ../../..
fi

# Get Vercel project info
PROJECT_JSON="packages/docs/storybook-static/.vercel/project.json"
if [ ! -f "$PROJECT_JSON" ]; then
    echo "❌ Error: Could not find .vercel/project.json"
    echo "   Please run 'pnpm deploy-storybook' first"
    exit 1
fi

PROJECT_ID=$(cat "$PROJECT_JSON" | grep -o '"projectId":"[^"]*' | cut -d'"' -f4)
ORG_ID=$(cat "$PROJECT_JSON" | grep -o '"orgId":"[^"]*' | cut -d'"' -f4)

echo "🆔 Found Vercel Project ID: $PROJECT_ID"
echo "🏢 Found Vercel Org ID: $ORG_ID"
echo ""

# Generate Vercel token programmatically (this requires user input)
echo "🔑 Vercel Token Setup"
echo "===================="
echo "We need to create a Vercel API token for GitHub Actions."
echo ""
echo "Option 1: Create token manually (recommended)"
echo "  1. Visit: https://vercel.com/account/tokens"
echo "  2. Click 'Create Token'"
echo "  3. Name: 'GitHub Actions - ras-UI'"
echo "  4. Copy the token and paste it below"
echo ""
echo "Option 2: Use existing token"
echo "  If you already have a token, paste it below"
echo ""

read -s -p "🔑 Enter your Vercel token: " VERCEL_TOKEN
echo ""

if [ -z "$VERCEL_TOKEN" ]; then
    echo "❌ Error: No token provided"
    exit 1
fi

# Validate token by testing it
echo "🔍 Validating Vercel token..."
if ! VERCEL_TOKEN="$VERCEL_TOKEN" vercel teams ls &> /dev/null; then
    echo "❌ Error: Invalid Vercel token"
    exit 1
fi

echo "✅ Vercel token validated"
echo ""

# Set GitHub secrets
echo "📝 Setting GitHub repository secrets..."

gh secret set VERCEL_TOKEN --body "$VERCEL_TOKEN"
echo "✅ Set VERCEL_TOKEN"

gh secret set VERCEL_ORG_ID --body "$ORG_ID"
echo "✅ Set VERCEL_ORG_ID: $ORG_ID"

gh secret set VERCEL_PROJECT_ID --body "$PROJECT_ID"
echo "✅ Set VERCEL_PROJECT_ID: $PROJECT_ID"

echo ""
echo "🎉 GitHub Secrets Configuration Complete!"
echo "========================================"
echo ""
echo "✅ All secrets have been set in repository: $REPO"
echo ""
echo "🚀 Your GitHub Actions workflows will now:"
echo "   • Deploy to production on push to main"
echo "   • Create preview deployments for pull requests"
echo "   • Comment preview URLs on pull requests"
echo ""
echo "📋 Next steps:"
echo "   1. Push changes to main branch to trigger deployment"
echo "   2. Create a pull request to test preview deployments"
echo "   3. Check GitHub Actions tab for deployment status"
echo ""
echo "🌐 Current deployment URL:"
echo "   https://$(cat "$PROJECT_JSON" | grep -o '"name":"[^"]*' | cut -d'"' -f4).vercel.app"
echo ""

# Offer to trigger a test deployment
read -p "🧪 Would you like to trigger a test deployment now? (y/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "🚀 Triggering test deployment..."
    
    # Create a simple commit to trigger deployment
    echo "# Test deployment - $(date)" >> .github-deployment-test.tmp
    git add .github-deployment-test.tmp
    git commit -m "test: trigger GitHub Actions deployment

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"
    
    echo "📤 Pushing to trigger GitHub Actions..."
    git push
    
    # Clean up
    rm .github-deployment-test.tmp
    git add .github-deployment-test.tmp
    git commit -m "cleanup: remove test deployment file

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"
    git push
    
    echo ""
    echo "✅ Test deployment triggered!"
    echo "   Check: https://github.com/$REPO/actions"
    echo ""
fi

echo "🎊 Setup complete! Your Storybook CI/CD is now fully automated."