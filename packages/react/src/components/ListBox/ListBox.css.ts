/**
 * Simplified ListBox component styles using vanilla-extract
 * Minimal implementation to debug the build issue
 */

import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { theme } from "../../styles/theme.css";

// Base ListBox styles
export const listBoxBase = style({
  // Reset browser defaults
  margin: 0,
  padding: theme.space.sm,
  background: "none",

  // Typography
  fontFamily: theme.font.family.sans,
  fontSize: theme.font.size.md,

  // Layout
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxHeight: "300px",
  overflowY: "auto",

  // Visual styling
  backgroundColor: theme.color.surface.base,
  border: `1px solid ${theme.color.border.default}`,
  borderRadius: theme.radius.md,
  boxShadow: theme.elevation.sm,
});

// ListBox recipe with size variants
export const listBox = recipe({
  base: listBoxBase,
  variants: {
    size: {
      sm: { fontSize: theme.font.size.sm },
      md: { fontSize: theme.font.size.md },
      lg: { fontSize: theme.font.size.lg },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

// Individual list item styles
export const listBoxItem = style({
  display: "flex",
  alignItems: "center",
  padding: theme.space.sm,
  cursor: "pointer",
  borderRadius: theme.radius.sm,

  ":hover": {
    backgroundColor: theme.color.interaction.hover,
  },
});

// Section styles
export const listBoxSection = style({
  display: "flex",
  flexDirection: "column",
});

export const listBoxHeader = style({
  padding: theme.space.sm,
  fontSize: theme.font.size.sm,
  fontWeight: theme.font.weight.semibold,
  color: theme.color.text.secondary,
});

// State styles
export const listBoxEmpty = style([
  listBoxBase,
  {
    alignItems: "center",
    justifyContent: "center",
    minHeight: "120px",
    color: theme.color.text.secondary,
  },
]);

export const listBoxLoading = style([
  listBoxBase,
  {
    alignItems: "center",
    justifyContent: "center",
    minHeight: "120px",
  },
]);

// Global content styles
export const listBoxItemContentGlobal = style({});
