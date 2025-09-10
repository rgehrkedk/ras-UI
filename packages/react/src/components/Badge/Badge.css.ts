/**
 * Badge component styles using vanilla-extract
 * Following ras-UI design principles, informed by sporty-book real usage patterns
 */

import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { theme } from "../../styles/theme.css";

// Base badge styles
export const badgeBase = style({
  // Layout
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.space.sm,

  // Typography
  fontFamily: theme.font.family.sans,
  fontWeight: theme.font.weight.medium,
  fontSize: theme.font.size.sm,
  lineHeight: 1,
  whiteSpace: "nowrap",

  // Interaction
  userSelect: "none",

  // Transitions
  "@media": {
    "(prefers-reduced-motion: no-preference)": {
      transition: "all 0.2s ease-in-out",
    },
  },

  // Prevent text selection
  WebkitUserSelect: "none",
  MozUserSelect: "none",
  msUserSelect: "none",
});

// Badge recipe with variants informed by sporty-book usage
export const badge = recipe({
  base: badgeBase,

  variants: {
    variant: {
      // Standard semantic variants using badge-specific tokens
      primary: {
        backgroundColor: "var(--color-components-badge-primary-background)",
        color: "var(--color-components-badge-primary-text)",
        border: "1px solid transparent",
      },

      secondary: {
        backgroundColor: "var(--color-components-badge-secondary-background)",
        color: "var(--color-components-badge-secondary-text)",
        border: "1px solid transparent",
      },

      outline: {
        backgroundColor: "transparent",
        color: theme.color.text.secondary,
        border: `1px solid ${theme.color.border.default}`,
      },

      // Status variants (based on sporty-book booking/membership status)
      success: {
        backgroundColor: "var(--color-semantic-surface-success)",
        color: "var(--color-semantic-text-success)",
        border: "1px solid transparent",
      },

      warning: {
        backgroundColor: "var(--color-semantic-surface-warning)",
        color: "var(--color-semantic-text-warning)",
        border: "1px solid transparent",
      },

      danger: {
        backgroundColor: "var(--color-semantic-surface-danger)",
        color: "var(--color-semantic-text-danger)",
        border: "1px solid transparent",
      },

      info: {
        backgroundColor: "var(--color-semantic-surface-info)",
        color: "var(--color-semantic-text-info)",
        border: "1px solid transparent",
      },

      // Semantic color variants for different sports/categories using design tokens
      tennis: {
        backgroundColor: "var(--color-components-badge-support-background)",
        color: "var(--color-components-badge-support-text)",
        border: "1px solid transparent",
      },

      basketball: {
        backgroundColor: "var(--color-components-badge-accent-background)",
        color: "var(--color-components-badge-accent-text)",
        border: "1px solid transparent",
      },

      football: {
        backgroundColor: "var(--color-components-badge-primary-background)",
        color: "var(--color-components-badge-primary-text)",
        border: "1px solid transparent",
      },

      volleyball: {
        backgroundColor: "var(--color-components-badge-secondary-background)",
        color: "var(--color-components-badge-secondary-text)",
        border: "1px solid transparent",
      },

      // Premium/gradient variant (for special badges like "Save up to 17%")
      premium: {
        backgroundColor: "var(--color-components-badge-premium-background)",
        color: "var(--color-components-badge-premium-text)",
        border: "1px solid transparent",
        fontWeight: theme.font.weight.semibold,
      },

      // Glassmorphism variant (for overlaid badges)
      glass: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        color: theme.color.text.primary,
        border: "1px solid rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      },
    },

    size: {
      sm: {
        height: "20px",
        padding: `0 ${theme.space.sm}`,
        fontSize: theme.font.size.xs,
        borderRadius: theme.radius.sm,
      },

      md: {
        height: "24px",
        padding: `0 ${theme.space.sm}`,
        fontSize: theme.font.size.sm,
        borderRadius: theme.radius.md,
      },

      lg: {
        height: "32px",
        padding: `0 ${theme.space.md}`,
        fontSize: theme.font.size.md,
        borderRadius: theme.radius.md,
      },
    },

    interactive: {
      true: {
        cursor: "pointer",

        ":hover": {
          transform: "translateY(-1px)",
          filter: "brightness(1.05)",
        },

        ":active": {
          transform: "translateY(0)",
          filter: "brightness(0.95)",
        },
      },
    },
  },

  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

// Badge icon styles for start/end icons
export const badgeIcon = style({
  flexShrink: 0,

  selectors: {
    [`${badge.classNames.variants.size.sm} &`]: {
      width: "12px",
      height: "12px",
    },
    [`${badge.classNames.variants.size.md} &`]: {
      width: "14px",
      height: "14px",
    },
    [`${badge.classNames.variants.size.lg} &`]: {
      width: "16px",
      height: "16px",
    },
  },
});

// Badge with remove functionality - no longer needed since we use flexbox
export const removableBadge = style({
  // Remove absolute positioning approach, let flexbox handle it
});

export const removeButton = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,

  width: "16px",
  height: "16px",

  border: "none",
  background: "none",
  cursor: "pointer",
  borderRadius: theme.radius.full,

  color: "currentColor",
  opacity: theme.opacity.muted,

  ":hover": {
    opacity: 1,
    backgroundColor: theme.color.overlay,
  },

  ":active": {
    opacity: 1,
    backgroundColor: theme.color.overlay,
    transform: "scale(0.95)",
  },

  ":focus": {
    outline: `2px solid ${theme.color.border.focus}`,
    outlineOffset: "1px",
  },
});
