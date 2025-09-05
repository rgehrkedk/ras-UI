# Component Guidelines

Consistency matters. Follow these conventions for all components.

## Structure

```
packages/react/src/components/ComponentName/
  ComponentName.tsx         // Primary implementation
  ComponentName.css.ts      // vanilla-extract styles
  ComponentName.stories.tsx // CSF3 Storybook
  ComponentName.test.tsx    // Vitest
  index.ts                  // Re-exports
```

## Implementation Rules

- Accessibility: Prefer React Aria Components. Ensure keyboard, focus, and ARIA props are correct.
- Tokens: Use semantic tokens via `theme.*`. Avoid hardcoded color/spacing.
- Styling: Use vanilla‑extract. No inline styles unless in stories/examples.
- Variants: Model with `recipes` (vanilla‑extract). Keep `defaultVariants` explicit.
- Props: Small, documented interfaces; avoid polymorphism unless needed. Support `className` passthrough.
- Data Attributes: Use `data-*` for visual states (e.g., `data-focused`, `data-pressed`) when RAC provides them.

## Storybook (CSF3)

- One “Basic” story with args and Controls wired.
- Examples highlighting a11y and brand/theme differences (`data-brand`, `data-theme`).
- Use docs.description for textual guidance (When to use, Do’s/Don’ts).
- Keep imports from the DS entrypoints (no `require` hacks).

## Testing (Vitest)

- Render sanity, aria roles, keyboard navigation, disabled states.
- Controlled/uncontrolled behavior when applicable.
- Keep tests fast and isolated; prefer user‑level interactions via Testing Library.

## Naming & Files

- PascalCase component names and folders.
- co‑locate styles/tests/stories.
- `index.ts` should re‑export component(s) and types.

## PR/Change Checklist

- [ ] Accessibility (keyboard/focus/aria)
- [ ] Tokens (no hardcoded colors/radii)
- [ ] Variants + defaults
- [ ] Stories complete + docs good
- [ ] Tests added/updated
- [ ] `pnpm preflight` clean
