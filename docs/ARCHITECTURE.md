# Architecture Overview

This monorepo hosts the ras‑UI design system with multiple packages and shared tooling.

## Packages

- `packages/react`: Core React components built with React Aria Components and vanilla‑extract.
- `packages/tokens`: DTCG tokens, brand + theme layers, and generated CSS variables.
- `packages/docs` (if present): Storybook configuration and docs site.
- `apps/*`: Example or reference apps consuming the design system.

## Key Technologies

- React Aria Components for state, a11y, and keyboard interactions.
- vanilla‑extract for type‑safe styling and token integration.
- DTCG tokens compiled to CSS custom properties via Style Dictionary.
- Vitest for tests, CSF3 Storybook for stories.

## Theming & Brands

- Brands: `default`, `vibrant`, `corporate`.
- Themes: `light`, `dark`, `hc-light`, `hc-dark`.
- Switching is attribute‑driven via `data-brand` / `data-theme`.

## File Layout (React package)

```
packages/react/src/components/
  ComponentName/
    ComponentName.tsx
    ComponentName.css.ts
    ComponentName.stories.tsx
    ComponentName.test.tsx
    index.ts
```

## Tokens → Theme

Tokens are compiled to `@ras-ui/tokens` CSS. Components use `packages/react/src/styles/theme.css.ts` to reference CSS variables (e.g., `theme.color.border.focus`).

## Build & Checks

- Preflight: `pnpm preflight` runs build, type‑check, lint, and tests.
- Tokens: `pnpm tokens:all` rebuilds brand+theme outputs.
