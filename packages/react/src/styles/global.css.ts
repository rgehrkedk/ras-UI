/**
 * Global styles for the design system
 */

import { globalStyle } from "@vanilla-extract/css";

import { theme } from "./theme.css";

// Reset and base styles
globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
});

globalStyle("html", {
  fontFamily: theme.font.family.sans,
  fontSize: theme.font.size.md,
  lineHeight: 1.5,
  color: theme.color.text.primary,
  backgroundColor: theme.color.surface.base,

  // Improve text rendering
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
  textRendering: "optimizeLegibility",
});

globalStyle("body", {
  margin: 0,
  padding: 0,
  minHeight: "100vh",
});

// Focus styles for accessibility
globalStyle("*:focus", {
  outline: "none",
});

globalStyle("*:focus-visible", {
  outline: `2px solid ${theme.color.border.focus}`,
  outlineOffset: "2px",
});

// Button reset
globalStyle("button", {
  fontFamily: "inherit",
  fontSize: "inherit",
  lineHeight: "inherit",
  color: "inherit",
  backgroundColor: "transparent",
  border: "none",
  padding: 0,
  margin: 0,
  cursor: "pointer",
});

// Input reset
globalStyle("input, textarea, select", {
  fontFamily: "inherit",
  fontSize: "inherit",
  lineHeight: "inherit",
  color: "inherit",
  backgroundColor: "transparent",
  border: "none",
  padding: 0,
  margin: 0,
});

// High contrast mode improvements
globalStyle("*", {
  "@media": {
    "(prefers-contrast: high)": {
      textShadow: "none !important",
      boxShadow: "none !important",
    },
  },
});
