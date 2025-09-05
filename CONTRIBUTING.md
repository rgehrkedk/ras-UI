# Contributing to ras‑UI

Thanks for helping improve the design system! This guide explains how to set up your environment, the workflow we follow, and expectations for changes.

## Prerequisites

- Node.js ≥ 18
- pnpm ≥ 8
- macOS/Linux/WSL recommended

## Quick Start

```bash
pnpm install
pnpm preflight   # build, type-check, lint, tests
pnpm storybook   # run Storybook (packages/docs)
```

Useful scripts:

- `pnpm preflight` – build + type-check + lint + tests (React package)
- `pnpm component-map` – print a JSON map of components → files/exports
- `pnpm scaffold:component ComponentName` – scaffold a new component (tsx/css.ts/story/test)
- `pnpm tokens:all` – rebuild design tokens and brand/theme CSS
- `pnpm -C packages/react type-check` – type-check React package only

## Repo Overview

- React components: `packages/react`
- Tokens & brands: `packages/tokens`
- Example apps / docs: `apps/*`, `packages/docs` (if present)

See also:

- `docs/ARCHITECTURE.md` – packages and build graph
- `docs/COMPONENT-GUIDELINES.md` – implementation, stories, tests, tokens
- `docs/AGENTS.md` – how our coding agents collaborate here
- `docs/TASKS.md` – backlog and priorities

## Workflow

1. Create a branch: `feature/xyz`, `fix/abc`, or `docs/xyz`
2. Run `pnpm preflight` before and after your change
3. Write/adjust stories (CSF3) and tests (Vitest)
4. Use design tokens (no hardcoded colors/radii) and React Aria Components
5. Open a PR with a clear summary and checklist (below)

### New Component

```bash
pnpm scaffold:component MyComponent
# Implement .tsx, hook up tokens and a11y, then:
pnpm preflight
```

### Tokens

If your change needs new tokens, add them under `packages/tokens/tokens/*` and run `pnpm tokens:all`. Reference them via `packages/react/src/styles/theme.css.ts` (CSS variables).

## Coding Standards (short)

- Accessibility first: keyboard, focus ring, ARIA via React Aria Components
- Styling: vanilla‑extract; use `recipes` for variants; avoid inline styles in components
- Tokens: semantic first (`theme.*`), no hardcoded values
- Stories: CSF3 with Controls; include docs description and “When to use” guidance when relevant
- Tests: Vitest + Testing Library with user interactions; keep fast and focused

## Commit & PRs

- Conventional Commits preferred (Commitizen is configured: `pnpm commit`)
- Include a small summary of what and why; link issues if applicable
- PR Checklist:
  - [ ] Accessibility reviewed (keyboard, focus, ARIA)
  - [ ] Tokens used (no hardcoded colors/radii)
  - [ ] Variants + defaults covered
  - [ ] Stories updated with docs
  - [ ] Tests added/updated
  - [ ] `pnpm preflight` passes

## Questions

Open a discussion or tag maintainers in your PR. For architectural decisions, see `docs/ARCHITECTURE.md`. For component specifics, see `docs/COMPONENT-GUIDELINES.md`.
