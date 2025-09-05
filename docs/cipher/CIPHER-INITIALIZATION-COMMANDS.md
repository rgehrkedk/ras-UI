# Cipher MCP Initialization Commands for ras-UI Design System

## Initial Setup Commands

Copy and paste these commands one by one into the Cipher CLI to initialize your design system knowledge.

### 1. Set up project workspace

```
/workspace set ras-ui-design-system
```

```
/project set "ras-UI Design System"
```

### 2. Core Architecture Knowledge

```
/memory add "ras-UI is a modern design system built with: monorepo architecture using pnpm workspaces + Turbo, Style Dictionary with DTCG-compliant JSON tokens, vanilla-extract CSS-in-JS with zero runtime overhead, React Aria Components for accessibility-first development, multibrand support (default, vibrant, corporate brands), comprehensive testing with Vitest + React Testing Library + Storybook, and TypeScript throughout."
```

### 3. Multibrand System Knowledge

```
/memory add "The multibrand system uses dual switching: brand switching via data-brand='default|vibrant|corporate' affects visual identity (colors, personality), theme switching via data-theme='light|dark|hc-light|hc-dark' affects accessibility/context. Tokens are defined in packages/tokens/tokens/ (shared semantic) and packages/tokens/brands/ (brand-specific). Style Dictionary builds to CSS custom properties."
```

### 4. Component Development Patterns

```
/memory add "Components follow React Aria First philosophy: always check official React Aria docs first, use compound component pattern (like Sidebar.Header, Sidebar.Content), implement proper TypeScript interfaces, reset browser defaults, use semantic tokens only (never base tokens), include comprehensive Storybook stories, and maintain accessibility compliance."
```

### 5. Build Workflow Commands

```
/memory add "Essential commands: pnpm storybook (visual testing), pnpm health-check (comprehensive validation), pnpm tokens:all (builds main + brand tokens), pnpm type-check (TypeScript validation), pnpm lint (ESLint with MCP integration), pnpm test (unit tests), pnpm build (package building). Always run health-check before committing."
```

### 6. Recent Development Context

```
/memory add "Recently refactored Sidebar component using Composition Interface Pattern: moved from Object.assign to proper TypeScript interface, single import location at top of file, follows Dialog component pattern with both compound access (Sidebar.Header) and individual exports, uses SidebarCompound type for strong TypeScript support, maintains Context for state sharing across subcomponents."
```

### 7. Error Checking System

```
/memory add "Automated error checking system: scripts/check-errors.js provides comprehensive scanning (TypeScript, ESLint, build integrity, design tokens), scripts/monitor-diagnostics.js uses ESLint MCP integration, scripts/auto-fix-errors.js attempts automated fixes, pnpm health-check is mandatory before commits, errors categorized by type with fix suggestions."
```

### 8. vanilla-extract Styling Patterns

```
/memory add "vanilla-extract CSS-in-JS patterns: zero runtime overhead with build-time generation, use recipe() for component variants, globalStyle() for complex selectors, theme.* tokens for consistency, proper TypeScript integration, avoid CSS selector issues by using globalStyle for nth-child patterns, always test CSS builds with pnpm tokens:all."
```

### 9. React Aria Implementation Best Practices

```
/memory add "React Aria implementation: always consult official docs first, use exact component names and structure from docs, don't assume API similarity with other libraries, include proper ARIA attributes automatically handled, use Button components not div with onClick, implement OverlayArrow with proper SVG, test keyboard navigation and screen readers, isolate complex components into subfolders when debugging."
```

### 10. Storybook and Testing Strategy

```
/memory add "Storybook setup: brand switcher integrated for multibrand testing, stories use minimal complexity with component props not custom styling, visual regression testing with Playwright, isolated test stories for debugging, comprehensive controls for component properties, documentation includes usage examples and accessibility notes."
```

### 11. Ask Cipher to Analyze Current Codebase

```
Analyze the current ras-UI project structure and capture key patterns from the Sidebar component we just refactored using the Composition Interface Pattern.
```

### 12. Test Memory Retrieval

```
What are the key principles for implementing a new React Aria component in the ras-UI design system?
```

## Usage Notes

- Run these commands in the order shown
- Wait for each command to complete before running the next
- The `/memory add` commands will store knowledge for future retrieval
- The final commands test that the memory system is working properly
- Once initialized, Cipher will automatically capture new patterns as you develop

## Verification Commands

After initialization, test with these queries:

```
How do I build design tokens for all brands?
```

```
What's the process for creating a new compound component?
```

```
What commands should I run before committing code?
```
