/**
 * Card component styles using vanilla-extract
 * Following ras-UI design principles with design tokens
 */

import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { theme } from "../../styles/theme.css";

// Base card container styles
export const cardBase = style({
  // Layout
  display: "flex",
  flexDirection: "column",
  position: "relative",

  // Spacing
  borderRadius: theme.radius.md,
  overflow: "hidden",

  // Design tokens
  backgroundColor: theme.color.surface.raised,
  border: `1px solid ${theme.color.border.default}`,

  // Typography inheritance
  fontFamily: theme.font.family.sans,
  color: theme.color.text.primary,

  // Accessibility
  outline: "none",

  // Focus styles for interactive cards
  ":focus-visible": {
    outline: `2px solid ${theme.color.border.focus}`,
    outlineOffset: "2px",
  },

  // Smooth transitions
  "@media": {
    "(prefers-reduced-motion: no-preference)": {
      transition: "all 0.2s ease-in-out",
    },
  },
});

// Card recipe with elevation and interaction variants
export const card = recipe({
  base: cardBase,

  variants: {
    elevation: {
      flat: {
        boxShadow: "none",
        border: `1px solid ${theme.color.border.default}`,
      },

      low: {
        boxShadow: theme.elevation.sm,
      },

      medium: {
        boxShadow: theme.elevation.md,
      },

      high: {
        boxShadow: theme.elevation.lg,
      },
    },

    interactive: {
      true: {
        cursor: "pointer",

        ":hover": {
          boxShadow: theme.elevation.lg,
          transform: "translateY(-2px)",
          borderColor: theme.color.border.focus,
        },

        ":active": {
          transform: "translateY(0)",
          boxShadow: theme.elevation.md,
        },

        selectors: {
          '&[data-pressed="true"]': {
            transform: "scale(0.99)",
          },
        },
      },
    },

    padding: {
      none: {
        padding: 0,
      },

      sm: {
        padding: theme.space.sm,
      },

      md: {
        padding: theme.space.md,
      },

      lg: {
        padding: theme.space.lg,
      },
    },
  },

  defaultVariants: {
    elevation: "low",
    padding: "md",
  },
});

// Card header styles
export const cardHeader = style({
  display: "flex",
  flexDirection: "column",
  gap: theme.space.xs,
  padding: theme.space.md,
  borderBottom: `1px solid ${theme.color.border.default}`,

  // When card has no padding, header provides its own
  selectors: {
    [`${card.classNames.variants.padding.none} &`]: {
      borderBottom: `1px solid ${theme.color.border.default}`,
    },
  },
});

// Card title styles with semantic sizing
export const cardTitle = recipe({
  base: {
    margin: 0,
    fontFamily: theme.font.family.sans,
    fontWeight: theme.font.weight.semibold,
    color: theme.color.text.primary,
    lineHeight: 1.3,
  },

  variants: {
    size: {
      sm: {
        fontSize: theme.font.size.lg,
      },

      md: {
        fontSize: theme.font.size.xl,
      },

      lg: {
        fontSize: theme.font.size["2xl"],
      },
    },
  },

  defaultVariants: {
    size: "md",
  },
});

// Card description styles
export const cardDescription = style({
  margin: 0,
  fontSize: theme.font.size.md,
  fontWeight: theme.font.weight.regular,
  color: theme.color.text.secondary,
  lineHeight: 1.5,
});

// Card content area
export const cardContent = style({
  flex: 1,
  padding: theme.space.md,

  // When card has padding, content adapts
  selectors: {
    [`${card.classNames.variants.padding.none} &`]: {
      padding: theme.space.md,
    },
    [`${card.classNames.variants.padding.sm} &`]: {
      padding: 0,
      paddingTop: theme.space.xs,
    },
    [`${card.classNames.variants.padding.lg} &`]: {
      padding: 0,
      paddingTop: theme.space.xs,
    },
  },
});

// Card footer styles
export const cardFooter = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.space.md,
  borderTop: `1px solid ${theme.color.border.default}`,
  gap: theme.space.sm,

  // Responsive stacking on small screens
  "@media": {
    "screen and (max-width: 640px)": {
      flexDirection: "column",
      alignItems: "stretch",
      gap: theme.space.xs,
    },
  },

  // Adapt to card padding
  selectors: {
    [`${card.classNames.variants.padding.none} &`]: {
      borderTop: `1px solid ${theme.color.border.default}`,
    },
  },
});
