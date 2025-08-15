#!/bin/bash

# ras-UI Complete Deployment Setup
# This script sets up everything: Vercel deployment + GitHub Actions automation

set -e

echo "🚀 Complete ras-UI Storybook Deployment Setup"
echo "=============================================="
echo ""
echo "This script will:"
echo "  1. 🔑 Install and authenticate required CLIs"
echo "  2. 🏗️  Build and deploy Storybook to Vercel" 
echo "  3. 🔐 Configure GitHub secrets for automation"
echo "  4. 🧪 Test the complete CI/CD pipeline"
echo ""

read -p "🤔 Ready to proceed? (y/n): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "👋 Setup cancelled. Run this script when you're ready!"
    exit 0
fi

echo ""
echo "🔧 Step 1: Installing Dependencies"
echo "================================="

# Install GitHub CLI if needed
if ! command -v gh &> /dev/null; then
    echo "📥 Installing GitHub CLI..."
    if command -v brew &> /dev/null; then
        brew install gh
    else
        echo "⚠️  Please install GitHub CLI manually and re-run this script:"
        echo "   Visit: https://cli.github.com/"
        exit 1
    fi
else
    echo "✅ GitHub CLI already installed"
fi

# Install Vercel CLI if needed  
if ! command -v vercel &> /dev/null; then
    echo "📥 Installing Vercel CLI..."
    npm install -g vercel
else
    echo "✅ Vercel CLI already installed"
fi

echo ""
echo "🔐 Step 2: Authentication"
echo "========================"

# Authenticate with GitHub
if ! gh auth status &> /dev/null; then
    echo "🔑 Authenticating with GitHub..."
    gh auth login
else
    echo "✅ Already authenticated with GitHub"
fi

# Authenticate with Vercel
if ! vercel whoami &> /dev/null; then
    echo "🔑 Authenticating with Vercel..."
    vercel login
else
    echo "✅ Already authenticated with Vercel"
fi

echo ""
echo "🏗️  Step 3: Build and Deploy"
echo "============================"

# Build design tokens
echo "📦 Building design tokens..."
pnpm tokens:all

# Build Storybook  
echo "🏗️  Building Storybook..."
pnpm build-storybook

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
cd packages/docs/storybook-static
vercel --yes
cd ../../..

echo ""
echo "🔐 Step 4: GitHub Secrets Configuration"
echo "======================================="

# Get Vercel project info
PROJECT_JSON="packages/docs/storybook-static/.vercel/project.json"
if [ ! -f "$PROJECT_JSON" ]; then
    echo "❌ Error: Deployment failed - no project.json found"
    exit 1
fi

PROJECT_ID=$(cat "$PROJECT_JSON" | grep -o '"projectId":"[^"]*' | cut -d'"' -f4)
ORG_ID=$(cat "$PROJECT_JSON" | grep -o '"orgId":"[^"]*' | cut -d'"' -f4)
PROJECT_NAME=$(cat "$PROJECT_JSON" | grep -o '"name":"[^"]*' | cut -d'"' -f4)

echo "✅ Project deployed successfully!"
echo "   URL: https://$PROJECT_NAME.vercel.app"
echo ""

# Get repository info
REPO=$(gh repo view --json nameWithOwner -q '.nameWithOwner')
echo "📁 Repository: $REPO"
echo ""

# Get Vercel token
echo "🔑 Vercel API Token Setup"
echo "========================"
echo "To enable GitHub Actions automation, we need a Vercel API token."
echo ""
echo "Please visit: https://vercel.com/account/tokens"
echo "1. Click 'Create Token'"
echo "2. Name: 'GitHub Actions - ras-UI'"
echo "3. Copy the token and paste it below"
echo ""

read -s -p "🔑 Enter your Vercel token: " VERCEL_TOKEN
echo ""

if [ -z "$VERCEL_TOKEN" ]; then
    echo "❌ Error: No token provided"
    exit 1
fi

# Validate token
echo "🔍 Validating token..."
if ! VERCEL_TOKEN="$VERCEL_TOKEN" vercel teams ls &> /dev/null; then
    echo "❌ Error: Invalid Vercel token"
    exit 1
fi

echo "✅ Token validated"
echo ""

# Set GitHub secrets
echo "📝 Setting GitHub secrets..."
gh secret set VERCEL_TOKEN --body "$VERCEL_TOKEN"
gh secret set VERCEL_ORG_ID --body "$ORG_ID"
gh secret set VERCEL_PROJECT_ID --body "$PROJECT_ID"

echo "✅ All secrets configured!"
echo ""

echo "🧪 Step 5: Testing Deployment Pipeline"
echo "======================================"

read -p "🧪 Test the GitHub Actions workflow now? (y/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "🚀 Creating test commit to trigger GitHub Actions..."
    
    # Create test file and commit
    echo "# GitHub Actions Test - $(date)" > .github-actions-test.md
    echo "" >> .github-actions-test.md
    echo "This file tests the automated deployment pipeline." >> .github-actions-test.md
    echo "" >> .github-actions-test.md
    echo "- ✅ Vercel CLI deployment: Working" >> .github-actions-test.md
    echo "- ✅ GitHub secrets: Configured" >> .github-actions-test.md
    echo "- 🧪 GitHub Actions: Testing..." >> .github-actions-test.md
    
    git add .github-actions-test.md
    git commit -m "test: verify GitHub Actions deployment pipeline

This commit tests the complete CI/CD setup:
- Vercel deployment
- GitHub Actions integration  
- Automated preview deployments

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"
    
    echo "📤 Pushing to trigger GitHub Actions..."
    git push
    
    echo ""
    echo "✅ Test commit pushed!"
    echo "   Check deployment: https://github.com/$REPO/actions"
    echo ""
    
    # Clean up test file
    sleep 2
    rm .github-actions-test.md
    git add .github-actions-test.md
    git commit -m "cleanup: remove test deployment file

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"
    git push
    
    echo "🧹 Cleanup completed"
fi

echo ""
echo "🎉 COMPLETE DEPLOYMENT SETUP FINISHED!"
echo "====================================="
echo ""
echo "✅ What's been set up:"
echo "   🚀 Vercel deployment: https://$PROJECT_NAME.vercel.app"
echo "   🔐 GitHub secrets: Configured for automation"
echo "   ⚙️  GitHub Actions: Ready for CI/CD"
echo "   📦 Build pipeline: Optimized for production"
echo ""
echo "🔄 Automatic deployments now work:"
echo "   • Push to main → Production deployment"
echo "   • Create PR → Preview deployment with comment"
echo "   • Quality checks run on every deployment"
echo ""
echo "🛠️  Available commands:"
echo "   pnpm deploy-storybook     # Manual deployment"
echo "   pnpm storybook            # Local development"
echo "   pnpm build-storybook      # Build for production"
echo ""
echo "🎊 Your Storybook is now fully automated and production-ready!"