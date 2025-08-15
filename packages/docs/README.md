# ras-UI Storybook Documentation

This package contains the Storybook documentation for the ras-UI design system.

## 🚀 Quick Start

```bash
# Development mode
pnpm storybook

# Build for production
pnpm build

# Preview built Storybook
pnpm preview
```

## 📦 What's Included

- **Component Documentation**: Interactive stories for all design system components
- **Design Token Examples**: Visual representation of colors, spacing, typography
- **Brand Themes**: Switch between Default, Vibrant, and Corporate brands
- **Theme Switching**: Light, Dark, High Contrast Light, and High Contrast Dark themes
- **Accessibility Tools**: Built-in a11y addon for testing accessibility

## 🌟 Features

### Brand & Theme Support
- **Brands**: Default, Vibrant, Corporate with unique styling
- **Themes**: Light, Dark, High Contrast variants
- **Live Switching**: Toggle brands and themes in the toolbar

### Component Stories
All components include:
- Basic usage examples
- Props documentation
- Interactive controls
- Accessibility testing
- Brand comparison views

### Design Token Documentation
- Color palettes with WCAG contrast ratios
- Spacing scale visualization
- Typography specimens
- Component-specific tokens

## 🔧 Configuration

### Main Configuration
Located in `.storybook/main.ts`:
- Story glob patterns
- Addon configuration
- Vite build optimizations
- TypeScript setup

### Preview Configuration
Located in `.storybook/preview.tsx`:
- Global decorators for theme/brand switching
- Viewport configurations
- Background options
- Docs theme settings

## 🚀 Deployment

This Storybook is automatically deployed to Vercel:

- **Production**: Deployed on push to main branch
- **Preview**: Deployed on pull requests
- **URL**: `https://ras-ui-storybook.vercel.app`

See [DEPLOYMENT.md](../../DEPLOYMENT.md) for complete setup instructions.

## 📁 Structure

```
docs/
├── .storybook/              # Storybook configuration
│   ├── main.ts              # Main configuration
│   ├── preview.tsx          # Preview configuration
│   ├── theme.ts             # Custom Storybook theme
│   └── *.js                 # Accessibility utilities
├── stories/                 # Additional MDX documentation
├── storybook-static/        # Built output (generated)
└── package.json
```

## 🛠 Development

### Adding New Stories
1. Create `*.stories.tsx` files in component directories
2. Follow existing patterns for consistency
3. Include accessibility tests
4. Add brand showcase for themeable components

### Custom Documentation
- Add MDX files to `stories/` directory
- Use Storybook's Doc Blocks for rich documentation
- Include interactive examples

### Accessibility Testing
- Use the a11y addon for automated testing
- Test with screen readers
- Verify keyboard navigation
- Check color contrast ratios

## 🔍 Troubleshooting

### Build Issues
```bash
# Clean build
rm -rf storybook-static node_modules
pnpm install
pnpm build
```

### Development Server Issues
```bash
# Clear cache and restart
rm -rf node_modules/.cache
pnpm storybook
```

### Theme/Brand Not Working
- Check that `data-theme` and `data-brand` attributes are applied
- Verify design tokens are built: `pnpm tokens:all`
- Check browser console for CSS loading errors