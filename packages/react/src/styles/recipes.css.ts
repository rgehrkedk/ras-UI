/**
 * Shared component recipes for vanilla-extract
 * These provide reusable styling patterns across components
 */

import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { theme } from "./theme.css";

// Base focus ring style
export const focusRing = style({
  outline: `2px solid ${theme.color.border.focus}`,
  outlineOffset: "2px",

  "@media": {
    "(prefers-reduced-motion: no-preference)": {
      transition: "outline-color 0.2s ease-in-out",
    },
  },
});

// Floating UI surface styles
export const surface = recipe({
  base: {
    backgroundColor: theme.color.surface.base,
    border: `1px solid ${theme.color.border.default}`,
    borderRadius: theme.radius.md,

    "@media": {
      "(prefers-reduced-motion: no-preference)": {
        transition: "all 0.2s ease-in-out",
      },
    },
  },

  variants: {
    elevation: {
      "0": {
        boxShadow: theme.elevation.none,
      },
      "1": {
        backgroundColor: theme.color.surface.raised,
        boxShadow: theme.elevation.sm,
      },
      "2": {
        backgroundColor: theme.color.surface.float,
        boxShadow: theme.elevation.md,
        border: `1px solid ${theme.color.border.default}`,
      },
      "3": {
        backgroundColor: theme.color.surface.float,
        boxShadow: theme.elevation.lg,
        border: `1px solid ${theme.color.border.default}`,
      },
    },

    interactive: {
      true: {
        cursor: "pointer",

        ":hover": {
          transform: "translateY(-1px)",
        },

        ":active": {
          transform: "translateY(1px)",
        },

        ":focus-visible": {
          outline: `2px solid ${theme.color.border.focus}`,
          outlineOffset: "2px",
        },
      },
    },
  },

  compoundVariants: [
    {
      variants: {
        elevation: "0",
        interactive: true,
      },
      style: {
        ":hover": {
          boxShadow: theme.elevation.sm,
          backgroundColor: theme.color.surface.raised,
        },
      },
    },
    {
      variants: {
        elevation: "1",
        interactive: true,
      },
      style: {
        ":hover": {
          boxShadow: theme.elevation.md,
        },
      },
    },
    {
      variants: {
        elevation: "2",
        interactive: true,
      },
      style: {
        ":hover": {
          boxShadow: theme.elevation.lg,
        },
      },
    },
  ],
});

// Component size variants
export const sizeVariants = {
  sm: {
    padding: `${theme.space.xs} ${theme.space.sm}`,
    fontSize: theme.font.size.sm,
    minHeight: "32px",
  },
  md: {
    padding: `${theme.space.sm} ${theme.space[4]}`,
    fontSize: theme.font.size.md,
    minHeight: "40px",
  },
  lg: {
    padding: `${theme.space[4]} ${theme.space.md}`,
    fontSize: theme.font.size.lg,
    minHeight: "48px",
  },
};

// Typography utilities
export const text = recipe({
  base: {
    fontFamily: theme.font.family.sans,
    color: theme.color.text.primary,
    margin: 0,
    lineHeight: 1.5,
  },

  variants: {
    size: {
      xs: { fontSize: theme.font.size.xs },
      sm: { fontSize: theme.font.size.sm },
      md: { fontSize: theme.font.size.md },
      lg: { fontSize: theme.font.size.lg },
      xl: { fontSize: theme.font.size.xl },
    },

    weight: {
      regular: { fontWeight: theme.font.weight.regular },
      medium: { fontWeight: theme.font.weight.medium },
      semibold: { fontWeight: theme.font.weight.semibold },
      bold: { fontWeight: theme.font.weight.bold },
    },

    color: {
      primary: { color: theme.color.text.primary },
      secondary: { color: theme.color.text.secondary },
      onBrand: { color: theme.color.text.onBrand },
      danger: { color: theme.color.danger },
    },
  },

  defaultVariants: {
    size: "md",
    weight: "regular",
    color: "primary",
  },
});

// Container query utilities
export const container = style({
  containerType: "inline-size",
});

export const responsive = {
  sm: "@container (min-width: 320px)",
  md: "@container (min-width: 480px)",
  lg: "@container (min-width: 640px)",
  xl: "@container (min-width: 800px)",
} as const;
