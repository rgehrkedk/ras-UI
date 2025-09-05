## Codex Backlog

Actionable, engineer‑level tasks for the Codex agent. Keep items small, scoped, and verifiable. Update status in PRs.

### Ready

- ESLint cleanup – @ras-ui/react
  - Fix remaining errors listed by `pnpm lint` (Avatar/Badge/Breadcrumbs/Sidebar/Tooltip/Table etc.).
  - Acceptance: `pnpm lint` returns 0 for @ras-ui/react (warnings allowed).

- Breadcrumbs refactor (hooks + types)
  - Remove unused `AriaBreadcrumbsProps`/`AriaBreadcrumbProps` if not used.
  - Resolve duplicate `BreadcrumbSeparator` declaration.
  - Ensure hooks (useMemo) are not called conditionally.
  - Acceptance: lint clean in `Breadcrumbs.tsx`; stories/tests still pass.

- Sidebar a11y audit
  - Replace non‑interactive click targets or add role="button", tabIndex, and keyboard support (Enter/Space).
  - Remove or underscore unused locals (e.g., `finalCollapsed`, `isCollapsed`).
  - Acceptance: `jsx-a11y/*` errors resolved in Sidebar components.

- Tooltip tidy
  - Remove unused imports; keep type safe timeout (`ReturnType<typeof setTimeout>` already used).
  - Acceptance: lint clean for `Tooltip.tsx`.

- Menu – submenu support
  - Add `SubmenuTrigger` pattern with story + a11y/keyboard coverage.
  - Acceptance: new `Menu` story “Submenus”, basic test validating keyboard/pointer open/close.

- MultiSelect component
  - Compose `Button + Popover + ListBox` with `selectionMode="multiple"`, tags with remove, optional search.
  - Stories + minimal tests.
  - Acceptance: component + stories + smoke tests; uses tokens and RAC.

- Tokens – semantic additions
  - Add: disabled text, placeholder text, inverted surface.
  - Map in `theme.css.ts`; adopt in inputs/menus/tooltip where relevant.
  - Acceptance: tokens build (`pnpm tokens:all`), no hardcoded fallbacks.

- Storybook docs polish
  - Add “When to use” to key components (Button, Badge, Menu, Tooltip, Sidebar, Select).
  - Acceptance: docs panel shows guidance; CSF3 consistent.

- CI – preflight on PR
  - Add GitHub Actions workflow to run `pnpm preflight` on PRs.
  - Acceptance: PRs show build/type/lint/test results.

### In Progress

- KeyboardShortcut – added component, stories, tests, and menu integration.
- Storybook codemod – '@storybook/react' → '@storybook/react‑vite' (script added + executed).

### Done

- Agent + architecture docs
  - `docs/AGENTS.md`, `docs/ARCHITECTURE.md`, `docs/COMPONENT-GUIDELINES.md`, `CONTRIBUTING.md`, `docs/TASKS.md`.
- Automation
  - `scripts/component-map.js` (component discovery)
  - `scripts/scaffold-component.js` (scaffolding)
  - `scripts/codemods/update-storybook-imports.cjs` (SB imports)
- Health‑check improvements
  - Better ESLint error parsing + suggestions; added `pnpm lint:fix` script.

### Notes

- Preferred commands: `pnpm preflight`, `pnpm component-map`, `pnpm scaffold:component`, `pnpm lint`, `pnpm lint:fix`.
- Lint scope (by default) excludes the demo package `@ras-ui/sporty-book`.
