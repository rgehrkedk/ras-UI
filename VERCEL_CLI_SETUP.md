# Vercel CLI Deployment Setup

I've set up the Vercel CLI deployment for your Storybook. Here's how to complete the deployment:

## 🔐 Authentication Required

Since I can't authenticate on your behalf, you'll need to run these commands:

### 1. Login to Vercel
```bash
vercel login
```
This will open your browser for authentication.

### 2. Deploy the Storybook
```bash
# Navigate to the project root
cd /Users/rasmus/Downloads/Projects/ras-UI

# Build Storybook first
pnpm build-storybook

# Deploy using Vercel CLI
cd packages/docs/storybook-static
vercel --yes
```

### 3. Configure Project Settings
When prompted during deployment:
- **Project name**: `ras-ui-storybook` (or your preferred name)
- **Link to existing project**: Choose "No" for new project
- **Directory**: Current directory (should be auto-detected)
- **Production deployment**: Choose "Yes"

## 🚀 Alternative: One-Command Deployment

You can also deploy from the root directory with:
```bash
vercel --cwd packages/docs/storybook-static --yes
```

## ⚙️ Post-Deployment Configuration

After the initial deployment, you can configure:

### Set Build Command (Optional)
```bash
vercel env add BUILD_COMMAND
# Value: pnpm build-storybook
```

### Set Output Directory
```bash
vercel env add OUTPUT_DIRECTORY  
# Value: packages/docs/storybook-static
```

### Set Custom Domain (Optional)
```bash
vercel domains add yourdomain.com
vercel alias set <deployment-url> yourdomain.com
```

## 📋 What I've Already Set Up

✅ **Vercel Configuration**: `vercel.json` in project root
✅ **GitHub Actions**: Automated deployment workflows  
✅ **Build Optimization**: Production-ready Storybook build
✅ **Quality Checks**: Linting and type checking in CI

## 🔄 Automated Future Deployments

Once you connect to GitHub (optional):
```bash
vercel --prod  # Deploy production
vercel        # Deploy preview
```

Or use the GitHub integration:
- Push to main → Production deployment
- Create PR → Preview deployment

## 🌐 Expected Results

After deployment, you'll get:
- **Preview URL**: `https://ras-ui-storybook-<hash>.vercel.app`
- **Production URL**: `https://ras-ui-storybook.vercel.app` (if you set it as production)
- **Dashboard**: Access via [vercel.com/dashboard](https://vercel.com/dashboard)

## 🛠 Troubleshooting

### Build Issues
```bash
# Test local build first
pnpm build-storybook
cd packages/docs/storybook-static
npx http-server . -p 8080
```

### Authentication Issues
```bash
vercel logout
vercel login
```

### Project Configuration
```bash
vercel project ls              # List projects
vercel env ls                  # List environment variables
vercel domains ls              # List domains
```

## 📊 Deployment Info

**Build Command**: `pnpm build-storybook`
**Output Directory**: `packages/docs/storybook-static`
**Framework**: Static Site
**Node.js Version**: 18.x

Ready to deploy! Run `vercel login` and then `vercel --yes` to get started. 🚀