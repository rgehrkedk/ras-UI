# Codex Agent Guide

This repository is agent‑friendly. Follow these guidelines to work efficiently and safely.

## Goals

- Ship focused, incremental changes with strong a11y and token usage.
- Prefer React Aria Components, vanilla‑extract, and design tokens over ad‑hoc CSS.
- Keep stories and tests up to date with CSF3 + Vitest.

## Guardrails

- Do not introduce breaking API changes without explicit approval.
- Prefer semantic tokens over hardcoded colors and radii.
- Keep component structure consistent (see Component Guidelines).
- Avoid adding new dependencies unless discussed.

## Preferred Commands

- Root preflight: `pnpm preflight` (build, type‑check, lint, tests)
- React package type‑check: `pnpm -C packages/react type-check`
- Storybook (docs package): `pnpm storybook`
- Tokens rebuild: `pnpm tokens:all`

Note: workspace lint excludes the demo package `@ras-ui/sporty-book` (noisy, non-blocking).

## Workflow

1. Run `pnpm preflight` to start from a clean baseline.
2. For new components: `node scripts/scaffold-component.js MyComponent`.
3. Use `scripts/component-map.js` to discover components/exports quickly.
4. Update stories (CSF3) and tests (Vitest). Keep docs rich but concise.
5. Re‑run `pnpm preflight` and summarize changes clearly.
