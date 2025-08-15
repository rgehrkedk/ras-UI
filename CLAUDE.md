# CLAUDE.md - ras-UI Design System

This file contains essential information for Claude to work effectively on the ras-UI design system project.

## Project Overview

**ras-UI** is a modern, accessible design system built with:
- **Monorepo Architecture**: pnpm workspaces + Turbo for build orchestration
- **Design Tokens**: Style Dictionary with DTCG-compliant JSON tokens + multibrand support
- **Styling**: vanilla-extract CSS-in-JS with zero runtime overhead
- **Components**: React Aria Components for accessibility-first development
- **Multibrand System**: 3 brands (default, vibrant, corporate) with theme combinations
- **Testing**: Vitest + React Testing Library + Storybook
- **Build Tools**: TypeScript, ESLint, tsup for packaging

## Critical Workflow Requirements

### 1. ALWAYS Use Available MCPs and Agents

**MCP Tools Available:**
- **ESLint MCP**: Automatically generates `eslint-report.json` and provides real-time diagnostics via `mcp__ide__getDiagnostics`
- **IDE MCP**: Provides language diagnostics and code intelligence
- **Jupyter MCP**: For code execution and testing (if applicable)

**When to Use Task Tool with Agents:**
- **general-purpose agent**: For complex searches, multi-step tasks, or when you need multiple rounds of file exploration
- **Use agents proactively** instead of manual grep/find commands for open-ended searches

**Example - WRONG approach:**
```
Let me search for Style Dictionary files...
*manually runs multiple grep commands*
*manually reads files one by one*
```

**Example - CORRECT approach:**
```
I'll use the general-purpose agent to search for and understand the Style Dictionary implementation across the codebase.
*uses Task tool with general-purpose agent*
```

### 2. Style Dictionary Integration (CRITICAL)

**⚠️ IMPORTANT**: This project uses Style Dictionary for Figma-to-code token workflow with **multibrand support**. Any changes must preserve this integration.

**Current Setup:**
- Tokens defined in `/packages/tokens/tokens/` as DTCG JSON (shared semantic tokens)
- Brand-specific tokens in `/packages/tokens/brands/` with `default/`, `vibrant/`, `corporate/` directories
- Style Dictionary builds to multiple outputs:
  - `/packages/tokens/dist/tokens.css` and `/packages/tokens/dist/tokens.ts` (main tokens)
  - `/packages/tokens/dist/brands/` (brand-specific CSS files)
  - `/packages/tokens/dist/brands.css` (combined brands CSS)
- React components use CSS custom properties populated by Style Dictionary
- **Dual switching system**: 
  - Brand switching: `[data-brand="default|vibrant|corporate"]`
  - Theme switching: `[data-theme="light|dark|hc-light|hc-dark"]`
  - Combined: `[data-brand="vibrant"][data-theme="dark"]`

**NEVER:**
- Hardcode token values in component CSS
- Break the CSS custom property chain from Style Dictionary
- Modify brand token structure without understanding all brand implications
- Skip building brands when making brand-specific changes

**ALWAYS:**
- Test token changes with `pnpm tokens:all` to build both main tokens and brands
- Verify CSS custom properties are properly generated for all brands
- Check that both brand and theme switching work correctly
- Update semantic tokens in `tokens/semantic.json` for shared values
- Update brand-specific tokens in `brands/{brand}/core.json` and `brands/{brand}/components.json`

### 3. User Involvement and Testing

**ALWAYS involve the user for:**
- Visual localhost testing (`pnpm dev` for Storybook at http://localhost:6006)
- Design decisions and component behavior
- Token changes that affect visual appearance
- Breaking changes or major refactoring

**Testing Commands:**
```bash
# Start Storybook for visual testing (includes brand switcher)
pnpm storybook

# Run all tests
pnpm test

# Run visual regression tests (Playwright)
pnpm test:visual

# Type checking
pnpm type-check

# Linting (uses ESLint MCP)
pnpm lint

# Build all packages
pnpm build

# Token build commands
pnpm tokens              # Build main tokens only
pnpm tokens:brands       # Build brand-specific tokens only  
pnpm tokens:all          # Build both main tokens and all brands

# Token development with watch mode
cd packages/tokens && npm run dev
```

### 4. Status Updates and Communication

**ALWAYS:**
- Use TodoWrite tool for any multi-step tasks (3+ steps)
- Update todo status in real-time as work progresses
- Mark todos as completed immediately after finishing
- Provide status updates during long-running tasks

**Example:**
```
*Creates todo list at start*
*Marks first item as in_progress before starting*
*Updates to completed and moves to next item*
*Provides regular status updates to user*
```

### 5. Development Standards

**Required Commands to Run After Changes:**
```bash
# ESLint (check MCP diagnostics first)
pnpm lint

# Type checking
pnpm type-check

# Build to verify no breaking changes
pnpm build
```

**Code Quality:**
- ESLint config supports TypeScript type checking
- Zero TypeScript errors required
- All components must have tests
- Storybook stories required for all components
- Visual regression tests with Playwright for UI consistency

## File Structure

```
ras-UI/
├── packages/
│   ├── tokens/           # Style Dictionary design tokens with multibrand support
│   │   ├── tokens/       # DTCG JSON shared semantic tokens
│   │   │   ├── core.json        # Base tokens (spacing, typography, elevation)
│   │   │   ├── semantic.json    # Semantic color tokens (theme-aware)
│   │   │   └── components.json  # Component tokens (shared across brands)
│   │   ├── brands/       # Brand-specific token definitions
│   │   │   ├── default/         # Default brand (blue-based)
│   │   │   │   ├── core.json    # Brand colors and overrides
│   │   │   │   └── components.json # Brand component tokens
│   │   │   ├── vibrant/         # Vibrant brand (purple/pink-based)
│   │   │   │   ├── core.json
│   │   │   │   └── components.json
│   │   │   └── corporate/       # Corporate brand (teal/slate-based)
│   │   │       ├── core.json
│   │   │       └── components.json
│   │   ├── dist/         # Generated CSS and TypeScript
│   │   │   ├── tokens.css       # Main semantic tokens
│   │   │   ├── tokens.ts        # TypeScript token exports
│   │   │   ├── brands/          # Brand-specific CSS files
│   │   │   │   ├── default/tokens.css
│   │   │   │   ├── vibrant/tokens.css
│   │   │   │   └── corporate/tokens.css
│   │   │   └── brands.css       # Combined brands CSS
│   │   ├── build-brands.js      # Custom brand build script
│   │   ├── style-dictionary.config.js
│   │   └── src/index.ts         # Brand switching utilities
│   ├── react/            # React component library
│   │   ├── src/
│   │   │   ├── components/    # Button, Input, Dialog
│   │   │   ├── styles/        # vanilla-extract theme/recipes
│   │   │   └── utils/         # Theme & brand utilities
│   │   └── eslint-report.json # ESLint MCP output
│   └── docs/             # Storybook documentation with brand switcher
├── eslint.config.js      # Root ESLint config (flat config format)
├── tsconfig.json         # Root TypeScript config (project references)
└── turbo.json           # Build orchestration
```

## Multibrand System Architecture

### Brands vs Themes - Key Concepts

**Brands** (Visual Identity):
- **Purpose**: Different visual identities/personalities for the same design system
- **Available Brands**: `default` (blue), `vibrant` (purple/pink), `corporate` (teal/slate)
- **Scope**: Changes brand colors, component styling preferences, shadows, border radius
- **Selector**: `[data-brand="default|vibrant|corporate"]`
- **Examples**: Primary color, secondary palette, design system personality

**Themes** (Accessibility/Context):
- **Purpose**: Light/dark modes and high contrast variants for accessibility
- **Available Themes**: `light`, `dark`, `hc-light`, `hc-dark`
- **Scope**: Changes semantic color mappings for different lighting/contrast needs
- **Selector**: `[data-theme="light|dark|hc-light|hc-dark"]`
- **Examples**: Surface colors, text contrast, focus indicators

**Combined Usage**: `[data-brand="vibrant"][data-theme="dark"]` combines purple brand with dark theme

### Brand Development Workflow

**Adding a New Brand:**
1. Create new directory in `/packages/tokens/brands/newbrand/`
2. Add `core.json` with brand-specific base tokens
3. Add `components.json` with brand-specific component tokens
4. Run `pnpm tokens:brands` to build
5. Add brand to TypeScript types in `src/index.ts`
6. Test in Storybook with brand switcher

**Modifying Existing Brands:**
1. Edit brand files in `/packages/tokens/brands/{brand}/`
2. Run `pnpm tokens:all` to rebuild both main tokens and brands
3. Test all theme combinations for the modified brand
4. Verify component stories show expected changes

## Common Issues and Solutions

### Style Dictionary Not Building
```bash
cd packages/tokens
npm run build        # Main tokens only
npm run build:brands # Brands only  
npm run build:all    # Both main and brands
# Check that dist/tokens.css, dist/brands.css, and brand CSS files are generated
```

### Brand-Specific Issues
```bash
# Brands not generating
cd packages/tokens && npm run build:brands
# Check dist/brands/ directory has all brand CSS files

# Brand switching not working
# Verify data-brand attribute is set correctly in DOM
# Check that dist/brands.css is imported in your application
# Ensure CSS custom properties are resolving correctly
```

### ESLint Errors
- Check `mcp__ide__getDiagnostics` first
- Review `packages/react/eslint-report.json`
- ESLint config includes TypeScript type checking

### Build Failures
- Run `pnpm type-check` to isolate TypeScript issues
- Check that all package dependencies are built (`pnpm build`)
- Verify Style Dictionary output is generated correctly
- For brand issues, run `pnpm tokens:all` to ensure all brands are built

### Brand/Theme Switching Issues
- Verify CSS custom properties in `tokens.css` and `brands.css`
- Check `[data-brand]` and `[data-theme]` selectors in generated CSS
- Test with brand/theme utility functions: `setBrand()`, `setTheme()`
- Ensure both `tokens.css` and `brands.css` are loaded in your application

## Process Improvements Based on Feedback

**Previous Issues Identified:**
1. ❌ Not utilizing agents when relevant → ✅ Use Task tool with agents for complex searches
2. ❌ Not utilizing MCP helpers → ✅ Use ESLint MCP and IDE diagnostics proactively  
3. ❌ Looping with Style Dictionary → ✅ Test builds immediately, understand token flow
4. ❌ No status updates during sprint → ✅ Use TodoWrite tool consistently
5. ❌ No visual localhost testing → ✅ Always involve user for Storybook testing

## Release and Version Management

**Changesets Integration:**
```bash
# Add a changeset (describes changes for next release)
pnpm changeset

# Bump versions based on changesets
pnpm version-packages

# Publish packages to npm
pnpm release
```

**Release Process:**
1. Create changesets for all changes during development
2. Use semantic versioning (major.minor.patch)
3. Generate changelogs automatically
4. Coordinate releases across all packages in the monorepo

## Next Steps and Planned Features

**Immediate Priorities:**
- Sprint 2 planning with additional components
- Performance optimization and bundle analysis
- Accessibility audit and improvements
- Enhanced Figma integration workflow

**For Future Development:**
- Icon system integration
- Motion and animation tokens
- Advanced theming capabilities
- Documentation site (separate from Storybook)

## Contact and Collaboration

**For Design Token Changes:**
- Always coordinate with Figma designers
- Test token exports from Figma before implementing
- Verify semantic token mappings are correct

**For Component Development:**
- Use React Aria Components as base
- Follow existing patterns in Button/Input/Dialog
- Ensure accessibility compliance across all brands and themes
- Add comprehensive tests and Storybook stories
- Test component behavior with all brand combinations
- Use brand-aware CSS custom properties (never hardcode brand values)

**For Multibrand Development:**
- Test changes across all 3 brands (default, vibrant, corporate)
- Verify both light and dark themes work with each brand
- Use Storybook brand switcher for visual validation
- Update brand-specific tokens in appropriate brand directories
- Always run `pnpm tokens:all` when modifying brand tokens

---

*This CLAUDE.md file should be updated as the project evolves. Always refer to this file before starting significant development work.*