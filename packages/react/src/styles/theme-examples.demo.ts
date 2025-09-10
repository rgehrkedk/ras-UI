/**
 * DEMO: New Developer-Friendly Token Access Patterns
 * This file demonstrates the improved DX with semantic token names
 */

import { theme } from "./theme.css";

// ❌ OLD: Awkward bracket notation
const oldPatterns = {
  // Hard to read and remember
  padding: `${theme.space.xs} ${theme.space.sm}`,
  boxShadow: theme.elevation.sm,
  margin: theme.space[4],
  borderRadius: theme.radius.md, // This one was already good
};

// ✅ NEW: Multiple access patterns available

// 1. Numeric access (cleaner than strings)
const numericAccess = {
  padding: `${theme.space.xs} ${theme.space.sm}`,
  boxShadow: theme.elevation.sm,
  margin: theme.space[4],
};

// 2. Semantic access (most developer-friendly)
const semanticAccess = {
  padding: `${theme.space.xs} ${theme.space.sm}`, // Clear intent!
  boxShadow: theme.elevation.sm, // Meaningful names!
  margin: theme.space.lg, // Easy to remember!
  borderRadius: theme.radius.md,
};

// 3. Mixed usage (for gradual migration)
const mixedUsage = {
  padding: `${theme.space.xs} ${theme.space.sm}`, // Can mix approaches
  boxShadow: theme.elevation.sm, // Use semantic where helpful
  oldMargin: theme.space[4], // Legacy still works
  newMargin: theme.space.lg, // New preferred way
};

/**
 * Real-world examples from our components
 */

// Alert component spacing (before vs after)
export const alertExamples = {
  // Before: Hard to understand the visual hierarchy
  before: {
    gap: theme.space.sm, // What size is '3'?
    padding: theme.space[4], // How does '4' relate to '3'?
    marginTop: theme.space[1], // Why '1' here?
    boxShadow: theme.elevation.sm, // What's the visual weight?
  },

  // After: Clear semantic meaning
  after: {
    gap: theme.space.sm, // Small gap between elements
    padding: theme.space.lg, // Large comfortable padding
    marginTop: theme.space.xs, // Tiny top margin
    boxShadow: theme.elevation.sm, // Subtle elevation
  },
};

// Button component (before vs after)
export const buttonExamples = {
  before: {
    padding: `${theme.space.sm} ${theme.space[4]}`,
    gap: theme.space.xs,
    boxShadow: theme.elevation.sm,
    borderRadius: theme.radius.md, // Already semantic
  },

  after: {
    padding: `${theme.space.sm} ${theme.space.lg}`, // Vertical sm, horizontal lg
    gap: theme.space.xs, // Extra small gap
    boxShadow: theme.elevation.sm, // Subtle lift
    borderRadius: theme.radius.md, // Medium roundness
  },
};

/**
 * Migration strategies showing all three approaches work:
 */

// Strategy 1: Complete migration to semantic
const fullySemanticComponent = {
  container: {
    padding: theme.space.lg,
    margin: theme.space.md,
    boxShadow: theme.elevation.sm,
    borderRadius: theme.radius.md,
  },
  inner: {
    gap: theme.space.sm,
    padding: theme.space.xs,
  },
};

// Strategy 2: Gradual migration (mix and match)
const gradualMigrationComponent = {
  container: {
    padding: theme.space.lg, // ✅ Migrated to semantic
    margin: theme.space[4], // ✅ Migrated to numeric (no brackets!)
    boxShadow: theme.elevation.sm, // ⏳ Not yet migrated (still works)
    borderRadius: theme.radius.md, // ✅ Already semantic
  },
};

// Strategy 3: Keep numeric for systematic spacing
const numericSystemComponent = {
  // Sometimes numeric makes sense for systematic relationships
  container: { padding: theme.space[6] }, // Base padding
  section: { padding: theme.space[4] }, // 2 steps smaller
  item: { padding: theme.space.xs }, // 4 steps smaller

  // But semantic for common meaningful sizes
  gap: theme.space.sm,
  margin: theme.space.md,
  borderRadius: theme.radius.md,
};

/**
 * TypeScript benefits:
 * - All three patterns have full type safety
 * - Autocomplete works for semantic names
 * - No need to remember numeric mappings
 */

// This will have great autocomplete:
const withAutocomplete = {
  // theme.space.  <- IntelliSense shows: none, xs, sm, md, lg, xl, 2xl, 3xl
  // theme.elevation.  <- IntelliSense shows: none, sm, md, lg
  padding: theme.space.md,
  boxShadow: theme.elevation.sm,
};

export default {
  oldPatterns,
  numericAccess,
  semanticAccess,
  mixedUsage,
  alertExamples,
  buttonExamples,
  fullySemanticComponent,
  gradualMigrationComponent,
  numericSystemComponent,
  withAutocomplete,
};
