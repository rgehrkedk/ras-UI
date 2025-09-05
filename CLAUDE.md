# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ras-UI Design System

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
- **Cipher MCP**: Memory layer that auto-captures and retrieves coding patterns, design system knowledge, and React Aria implementations across sessions

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

### 1.1. Cipher MCP Memory Layer (NEW)

**⚠️ MEMORY LAYER AVAILABLE**: Cipher MCP provides persistent memory across coding sessions, specifically configured for ras-UI design system development.

**Key Features:**

- **Auto-captures** design system patterns, React Aria implementations, and Style Dictionary workflows
- **Auto-retrieves** relevant memories based on current development context
- **Persistent memory** across Claude Code sessions and IDE switches
- **Team sharing** capabilities for design system knowledge
- **Semantic search** for design system concepts and patterns

**Memory Categories Configured:**

- Design tokens and Style Dictionary patterns
- React Aria Components implementation best practices
- vanilla-extract CSS-in-JS styling techniques
- Multibrand architecture and theme switching
- Build automation and error checking workflows
- Accessibility patterns and WCAG compliance
- Storybook stories and component documentation
- Testing strategies for design systems

**Configuration Files:**

- `memAgent/cipher.yml` - Main configuration optimized for design system work
- `.env` - API keys for LLM providers (OpenAI/Anthropic)
- `CIPHER-SETUP.md` - Complete setup instructions

**Setup Status:**
✅ Cipher MCP installed globally  
✅ Claude Code MCP server configured  
✅ Project-specific configuration created  
⚠️ **USER ACTION REQUIRED**: Add API keys to `.env` file and restart Claude Code

**ALWAYS leverage Cipher MCP for:**

- Remembering complex multibrand token relationships
- Recalling React Aria component implementation patterns
- Retrieving Style Dictionary build workflows
- Accessing team knowledge about design system architecture
- Maintaining context across long development sessions

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

# Apps development (NEW)
pnpm showcase            # Clean ras-UI showcase app (port 3001)
pnpm reference           # sporty-book reference app (port 5174)

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

# Health check (comprehensive validation)
pnpm health-check
```

**Code Quality:**

- ESLint config supports TypeScript type checking
- Zero TypeScript errors required
- All components must have tests
- Storybook stories required for all components
- Visual regression tests with Playwright for UI consistency

### 6. Automated Error Checking System

**⚠️ CRITICAL**: Use automated error checking proactively to catch issues early in development.

**Available Commands:**

```bash
# Comprehensive system health check
pnpm health-check

# Full error scan (TypeScript, ESLint, build, tokens)
pnpm check-errors

# Continuous monitoring with file watching
pnpm check-errors:watch

# IDE diagnostics monitoring (uses ESLint MCP reports)
pnpm monitor-diagnostics

# Automated error fixing workflow
pnpm auto-fix
```

**Error Detection Capabilities:**

1. **TypeScript Compilation**: Validates all packages for TypeScript errors
2. **ESLint Analysis**: Integrates with ESLint MCP and workspace linting
3. **Build Integrity**: Checks critical build artifacts exist
4. **Design Token Validation**: Ensures Style Dictionary builds successfully
5. **MCP IDE Integration**: Uses `mcp__ide__getDiagnostics` for real-time diagnostics

**Workflow Integration:**

- **ALWAYS run `pnpm health-check`** before committing changes
- Use `pnpm check-errors:watch` during active development
- Run `pnpm auto-fix` to attempt automated fixes for common issues
- Monitor `scripts/diagnostics-report.json` for error history and trends

**Error Reporting:**

- Errors are categorized by type (TypeScript, ESLint, Build, Design Tokens)
- Critical issues in core component files are highlighted
- Automated fix suggestions provided for each error type
- Historical error tracking with timestamps and patterns

**Manual Intervention Required For:**

- TypeScript declaration issues (create .d.ts files)
- Complex ESLint errors that can't be auto-fixed
- Build configuration problems
- Style Dictionary configuration errors

## React Aria First Development Philosophy

**⚠️ CRITICAL MINDSET**: Always approach component development with "React Aria First" thinking. This has been learned through extensive debugging and ensures accessibility, proper behavior, and maintainability.

### Core Principles

**1. Always Check Official Documentation First**

```bash
# Before implementing ANY React Aria component, consult:
https://react-spectrum.adobe.com/react-aria/ComponentName.html
```

**WRONG Approach:**

```typescript
// Guessing the API based on other libraries
<AriaTooltipTrigger>
  <button>Trigger</button>
  <AriaTooltip>{content}</AriaTooltip>
</AriaTooltipTrigger>
```

**RIGHT Approach:**

```typescript
// Following exact React Aria documentation
<TooltipTrigger>
  <Button>Trigger</Button>
  <Tooltip>
    <OverlayArrow><svg>...</svg></OverlayArrow>
    {content}
  </Tooltip>
</TooltipTrigger>
```

**2. Component Isolation Strategy**

When complex components have behavioral issues (like SidebarToggle stretching), immediately isolate into subfolders:

```
Component/
├── Component.tsx           # Main container only
├── Component.css.ts       # Container styles only
├── index.ts              # All exports
├── SubComponent1/
│   ├── SubComponent1.tsx
│   ├── SubComponent1.css.ts
│   └── index.ts
└── SubComponent2/
    ├── SubComponent2.tsx
    ├── SubComponent2.css.ts
    └── index.ts
```

**Benefits:**

- Easier debugging of individual component issues
- Cleaner separation of concerns
- Reduced CSS conflicts and inheritance issues
- Better maintainability and testing

**3. Browser Default Style Reset**

**⚠️ CRITICAL**: Always reset browser default styles for interactive elements:

```typescript
// Button components MUST include comprehensive resets
const buttonReset = {
  // Reset all button defaults
  margin: 0,
  padding: 0,
  border: "none",
  background: "none",
  font: "inherit",
  lineHeight: "normal",
  textAlign: "center",
  textDecoration: "none",

  // Prevent flex stretching
  flexShrink: 0,
  flexGrow: 0,
  flexBasis: "auto",

  // Box model control
  boxSizing: "border-box",
};
```

**Common Browser Default Issues:**

- `<button>` elements have default padding, margins, and `box-sizing`
- `<ul>` elements have `padding-inline-start: 40px` by default
- Form elements inherit font properties inconsistently
- Flex containers can cause unexpected stretching

**4. CSS Layering and Z-Index Management**

```typescript
// Established z-index scale for ras-UI
const zIndexScale = {
  base: 0, // Normal document flow
  sidebar: 20, // Floating sidebar
  sidebarToggle: 21, // Above sidebar
  tooltip: 50, // Above all interactive elements
  modal: 100, // Above everything else
};
```

**5. Testing Strategy for Complex Components**

When components don't work:

1. **Isolate the component** - Create isolated test stories
2. **Test basic functionality** - Start with simplest use case
3. **Add complexity gradually** - Build up to real-world scenarios
4. **Check React Aria docs** - Ensure correct API usage
5. **Verify CSS inheritance** - Check for conflicting styles

**Example: Tooltip Debugging Pattern**

```typescript
// Create isolated test story matching exact use case
export const SidebarIconTest: Story = {
  render: () => (
    <Tooltip content="Home" placement="right" delay={100}>
      <button type="button" aria-label="Home">
        <Icon name="home" />
      </button>
    </Tooltip>
  )
};
```

### Development Workflow with React Aria

**Step 1: Plan with React Aria in Mind**

- Check if React Aria has a component for the use case
- Read the documentation thoroughly
- Understand the accessibility requirements

**Step 2: Implement Following Exact Patterns**

- Use exact component names and structure from docs
- Don't assume API similarity with other libraries
- Include all required props and accessibility attributes

**Step 3: Style with Design System Tokens**

- Use semantic tokens only (never base tokens)
- Apply proper CSS resets for browser defaults
- Consider z-index layering for floating elements

**Step 4: Test Thoroughly**

- Create isolated Storybook stories
- Test keyboard navigation and screen readers
- Verify behavior across different browsers
- Test in context of the full application

**Step 5: Document Learnings**

- Update this CLAUDE.md with new patterns discovered
- Document any React Aria quirks or gotchas
- Share component isolation strategies that worked

### Common React Aria Gotchas Learned

1. **TooltipTrigger vs AriaTooltipTrigger** - Use `TooltipTrigger` from react-aria-components
2. **OverlayArrow requires SVG** - Don't use div elements, use proper SVG as documented
3. **Focus management is automatic** - Don't override React Aria's focus behavior
4. **Proper semantic HTML required** - Use Button components, not div with onClick
5. **ARIA attributes are handled** - Don't add redundant ARIA, trust React Aria

### Debugging Checklist

When React Aria components don't work:

- [ ] Are you using the correct component names from the docs?
- [ ] Is the component structure exactly as documented?
- [ ] Are you passing all required props?
- [ ] Is the trigger element properly focusable?
- [ ] Are there CSS conflicts with browser defaults?
- [ ] Is the z-index appropriate for floating elements?
- [ ] Have you tested with keyboard navigation?

## File Structure

```
ras-UI/
├── scripts/              # Automated error checking and monitoring tools
│   ├── check-errors.js          # Comprehensive error scanning system
│   ├── monitor-diagnostics.js   # IDE diagnostics monitoring with MCP integration
│   ├── auto-fix-errors.js       # Automated error fixing workflow
│   └── diagnostics-report.json  # Historical error tracking and patterns
├── apps/                 # Application implementations using ras-UI
│   └── ras-ui-showcase/  # Clean showcase app demonstrating all components
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
│   ├── sporty-book/      # Reference app for extracting real-world patterns
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

### Cipher MCP Memory Layer Issues

```bash
# Check if Cipher MCP is running
cipher --mode mcp --help

# Test basic Cipher functionality
cipher --version

# Check MCP server configuration
python3 -c "
import json
with open('/Users/rasmus/.claude.json', 'r') as f:
    data = json.load(f)
project = '/Users/rasmus/Downloads/Projects/ras-UI'
print(json.dumps(data['projects'][project]['mcpServers'], indent=2))
"
```

**Common Cipher MCP Issues:**

- **Memory not capturing**: Ensure `.env` file exists with valid API keys
- **MCP server not connecting**: Restart Claude Code completely after configuration changes
- **No memory retrieval**: Check that `memAgent/cipher.yml` exists and is properly configured
- **API quota exceeded**: Verify your OpenAI/Anthropic API key has sufficient credits
- **File watching not working**: Ensure file patterns in `cipher.yml` match your development workflow

**Cipher MCP Setup Verification:**

- ✅ Global installation: `which cipher` should return `/opt/homebrew/bin/cipher`
- ✅ MCP configuration: Check Claude Code settings include Cipher server
- ✅ Project configuration: `memAgent/cipher.yml` exists with ras-UI specific settings
- ✅ Environment setup: `.env` file contains valid API keys
- ✅ Memory activation: Restart Claude Code after all configuration changes

## Process Improvements Based on Feedback

**Previous Issues Identified:**

1. ❌ Not utilizing agents when relevant → ✅ Use Task tool with agents for complex searches
2. ❌ Not utilizing MCP helpers → ✅ Use ESLint MCP and IDE diagnostics proactively
3. ❌ Looping with Style Dictionary → ✅ Test builds immediately, understand token flow
4. ❌ No status updates during sprint → ✅ Use TodoWrite tool consistently
5. ❌ No visual localhost testing → ✅ Always involve user for Storybook testing
6. ❌ No proactive error detection → ✅ Automated error checking system implemented

**Automated Error Checking Integration:**

- **Before Any Development Session**: Run `pnpm health-check` to ensure clean starting state
- **During Active Development**: Use `pnpm check-errors:watch` for continuous monitoring
- **Before Committing Changes**: MANDATORY `pnpm health-check` to catch issues early
- **Post-Error Detection**: Use `pnpm auto-fix` for automated resolution attempts
- **Complex Issues**: Consult `scripts/diagnostics-report.json` for error patterns and history

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

_This CLAUDE.md file should be updated as the project evolves. Always refer to this file before starting significant development work._
