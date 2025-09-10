/**
 * Shared style utilities and variants for component recipes
 */

import { theme } from "./theme.css";

// Shared size variants that can be used across components
export const sizeVariants = {
  sm: {
    padding: `${theme.space.xs} ${theme.space.sm}`,
    fontSize: theme.font.size.sm,
    minHeight: "32px",
    borderRadius: theme.radius.sm,
  },
  md: {
    padding: `${theme.space.sm} ${theme.space[4]}`,
    fontSize: theme.font.size.md,
    minHeight: "40px",
    borderRadius: theme.radius.md,
  },
  lg: {
    padding: `${theme.space[4]} ${theme.space.md}`,
    fontSize: theme.font.size.lg,
    minHeight: "48px",
    borderRadius: theme.radius.lg,
  },
};

// Shared state variants for interactive components
export const stateVariants = {
  default: {
    opacity: 1,
    cursor: "pointer",
  },
  disabled: {
    opacity: 0.5,
    cursor: "not-allowed",
    pointerEvents: "none",
  },
  loading: {
    cursor: "progress",
    pointerEvents: "none",
  },
  error: {
    // Error-specific styles can be added here
  },
};

// Layout variants
export const layoutVariants = {
  fullWidth: {
    width: "100%",
  },
};

// Focus styles that can be reused
export const focusStyles = {
  ":focus-visible": {
    outline: `2px solid ${theme.color.border.focus}`,
    outlineOffset: "2px",
  },
};

// Common transition styles
export const transitionStyles = {
  "@media": {
    "(prefers-reduced-motion: no-preference)": {
      transition: "all 0.2s ease-in-out",
    },
  },
};

// Hover elevation effects
export const hoverElevation = {
  ":hover": {
    transform: "translateY(-1px)",
    boxShadow: theme.elevation.md,
  },
  ":active": {
    transform: "translateY(0)",
    boxShadow: theme.elevation.sm,
  },
};
