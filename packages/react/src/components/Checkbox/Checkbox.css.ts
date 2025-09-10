/**
 * Checkbox component styles using vanilla-extract
 */

import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { theme } from "../../styles/theme.css";

// Base checkbox container styles
const checkboxBase = style({
  display: "inline-flex",
  alignItems: "flex-start",
  gap: theme.space.xs,
  cursor: "pointer",
  userSelect: "none",
  lineHeight: "1.5",

  // Typography
  fontFamily: theme.font.family.sans,
  fontSize: theme.font.size.md,
  color: theme.color.text.primary,

  // Focus styles - Enhanced for accessibility
  outline: "none",

  ":focus-visible": {
    outline: `2px solid ${theme.color.border.focus}`,
    outlineOffset: "2px",
    borderRadius: theme.radius.sm,
  },

  // High contrast mode support
  "@media": {
    "(forced-colors: active)": {
      selectors: {
        "&:focus-visible": {
          outline: "2px solid ButtonText",
        },
      },
    },
  },

  // Disabled state
  selectors: {
    '&[data-disabled="true"]': {
      cursor: "not-allowed",
      opacity: 0.6,
    },
  },
});

// Checkbox recipe with size variants
export const checkbox = recipe({
  base: checkboxBase,

  variants: {
    size: {
      sm: {
        fontSize: theme.font.size.sm,
        gap: theme.space.xs,
      },
      md: {
        fontSize: theme.font.size.md,
        gap: theme.space.xs,
      },
      lg: {
        fontSize: theme.font.size.lg,
        gap: theme.space.sm,
      },
    },
  },

  defaultVariants: {
    size: "md",
  },
});

// Base checkbox icon (the visual checkbox square)
const checkboxIconBase = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,

  // Basic styling
  backgroundColor: theme.color.surface.base,
  border: `1px solid ${theme.color.border.default}`,
  borderRadius: theme.radius.sm,

  // Transitions
  "@media": {
    "(prefers-reduced-motion: no-preference)": {
      transition: "all 0.2s ease-in-out",
    },
    // High contrast mode support
    "(forced-colors: active)": {
      backgroundColor: "Field",
      borderColor: "FieldText",
      selectors: {
        '&[data-selected="true"], &[data-indeterminate="true"]': {
          backgroundColor: "Highlight",
          borderColor: "Highlight",
          color: "HighlightText",
        },
        '&[data-focus-visible="true"]': {
          outline: "2px solid ButtonText",
          outlineOffset: "2px",
        },
        '&[data-disabled="true"]': {
          backgroundColor: "GrayText",
          borderColor: "GrayText",
          opacity: 1, // Remove opacity in high contrast
        },
      },
    },
  },

  // SVG styling
  color: theme.color.text.onBrand,

  // Hover state
  ":hover": {
    borderColor: theme.color.border.focus,
    backgroundColor: theme.color.interaction.hover,
  },

  // States via data attributes
  selectors: {
    // Selected state (checked or indeterminate)
    '&[data-selected="true"], &[data-indeterminate="true"]': {
      backgroundColor: theme.color.brand.primary,
      borderColor: theme.color.brand.primary,
      color: theme.color.text.onBrand,
    },

    // Focus state with enhanced contrast
    '&[data-focus-visible="true"]': {
      outline: `2px solid ${theme.color.border.focus}`,
      outlineOffset: "2px",
    },

    // Disabled state
    '&[data-disabled="true"]': {
      backgroundColor: theme.color.base.neutral[100],
      borderColor: theme.color.base.neutral[200],
      cursor: "not-allowed",
    },

    // Disabled + selected
    '&[data-disabled="true"][data-selected="true"], &[data-disabled="true"][data-indeterminate="true"]':
      {
        backgroundColor: theme.color.base.neutral[300],
        borderColor: theme.color.base.neutral[400],
        color: theme.color.text.secondary,
        opacity: 0.7,
      },
  },
});

// Touch target wrapper for WCAG 44x44px requirement
const touchTargetBase = style({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  // Minimum 44x44px touch target
  minWidth: "44px",
  minHeight: "44px",
  // Reset any inherited styles
  margin: 0,
  padding: 0,
  border: "none",
  background: "none",
  cursor: "pointer",
});

// Touch target recipe with size variants
export const touchTarget = recipe({
  base: touchTargetBase,

  variants: {
    size: {
      // All sizes ensure 44x44px minimum touch area
      sm: {
        minWidth: "44px",
        minHeight: "44px",
      },
      md: {
        minWidth: "44px",
        minHeight: "44px",
      },
      lg: {
        minWidth: "44px",
        minHeight: "44px",
      },
    },
  },

  defaultVariants: {
    size: "md",
  },
});

// Checkbox icon recipe with size variants - visual size only
export const checkboxIcon = recipe({
  base: checkboxIconBase,

  variants: {
    size: {
      sm: {
        // Visual size - smaller than touch target
        width: "16px",
        height: "16px",
      },
      md: {
        // Visual size - smaller than touch target
        width: "20px",
        height: "20px",
      },
      lg: {
        // Visual size - smaller than touch target
        width: "24px",
        height: "24px",
      },
    },
  },

  defaultVariants: {
    size: "md",
  },
});

// Error message styling
export const errorMessage = style({
  display: "block",
  marginTop: theme.space.xs,
  fontSize: theme.font.size.sm,
  color: theme.color.danger,
  fontFamily: theme.font.family.sans,
});

// Description styling
export const description = style({
  display: "block",
  marginTop: theme.space.xs,
  fontSize: theme.font.size.sm,
  color: theme.color.text.secondary,
  fontFamily: theme.font.family.sans,
});
