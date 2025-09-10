/**
 * Menu component styles using vanilla-extract
 */

import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { theme } from "../../styles/theme.css";

// Base menu container styles
export const menuContainer = style({
  display: "flex",
  alignItems: "center",
  gap: theme.space.sm,
  width: "100%",
});

// Menu Popover (overlay container)
export const menuPopoverBase = style({
  // Reset browser defaults
  margin: 0,
  padding: 0,
  border: "none",
  background: "none",

  // Positioning
  outline: "none",

  // Z-index for proper layering (from CLAUDE.md scale)
  zIndex: 50, // tooltip level for menu overlays

  // Animation support
  "@media": {
    "(prefers-reduced-motion: no-preference)": {
      transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
    },
  },

  // React Aria states
  selectors: {
    "&[data-entering]": {
      opacity: 0,
      transform: "translateY(-4px) scale(0.95)",
    },
    "&[data-exiting]": {
      opacity: 0,
      transform: "translateY(-4px) scale(0.95)",
    },
  },
});

export const menuPopover = recipe({
  base: menuPopoverBase,

  variants: {
    size: {
      sm: {
        minWidth: "fit-content",
        width: "max-content",
      },
      md: {
        minWidth: "fit-content",
        width: "max-content",
      },
      lg: {
        minWidth: "fit-content",
        width: "max-content",
      },
    },
  },

  defaultVariants: {
    size: "md",
  },
});

// Base menu styles
export const menuBase = style({
  // Reset browser defaults
  margin: 0,
  padding: theme.space.xs,
  listStyle: "none",

  // Layout
  display: "flex",
  flexDirection: "column",
  boxSizing: "border-box",

  // Appearance
  backgroundColor: "var(--color-components-menu-background)",
  color: "var(--color-components-menu-text)",
  borderRadius: "var(--color-components-menu-border-radius)",
  border: `1px solid var(--color-components-menu-border)`,
  boxShadow: theme.elevation.md,

  // Typography
  fontFamily: theme.font.family.sans,
  fontSize: theme.font.size.md,
  lineHeight: 1.5,

  // Focus management
  outline: "none",

  // Scrolling behavior
  maxHeight: "400px",
  overflowY: "auto",

  // Scrollbar styling
  selectors: {
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.color.border.default,
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: theme.color.border.default,
    },
  },
});

export const menu = recipe({
  base: menuBase,

  variants: {
    size: {
      sm: {
        padding: `${theme.space.xs} ${theme.space.xs}`,
        fontSize: theme.font.size.sm,
      },
      md: {
        padding: `${theme.space.sm} ${theme.space.xs}`,
        fontSize: theme.font.size.md,
      },
      lg: {
        padding: `${theme.space.sm} ${theme.space.sm}`,
        fontSize: theme.font.size.lg,
      },
    },
  },

  defaultVariants: {
    size: "md",
  },
});

// Menu Item styles
export const menuItemBase = style({
  // Reset browser defaults
  margin: 0,
  border: "none",
  background: "none",
  textAlign: "left",

  // Layout
  display: "flex",
  alignItems: "center",
  width: "100%",
  minHeight: "32px",
  padding: `${theme.space.xs} ${theme.space.sm}`,
  borderRadius: "var(--color-components-menu-item-border-radius)",

  // Typography
  fontFamily: "inherit",
  fontSize: "inherit",
  fontWeight: theme.font.weight.regular,
  lineHeight: 1.5,
  color: "var(--color-components-menu-item-text)",

  // Interaction
  cursor: "pointer",
  userSelect: "none",
  outline: "none",

  // Transitions
  "@media": {
    "(prefers-reduced-motion: no-preference)": {
      transition: "all 0.15s ease-in-out",
    },
  },

  // Hover state
  ":hover": {
    backgroundColor: "var(--color-components-menu-item-background-hover)",
    color: "var(--color-components-menu-item-text-hover)",
  },

  // Focus state
  ":focus-visible": {
    backgroundColor: "var(--color-components-menu-item-background-hover)",
    color: "var(--color-components-menu-item-text-hover)",
    outline: `2px solid ${theme.color.border.focus}`,
    outlineOffset: "-2px",
  },

  // React Aria focus state
  selectors: {
    '&[data-focused="true"]': {
      backgroundColor: "var(--color-components-menu-item-background-hover)",
      color: "var(--color-components-menu-item-text-hover)",
    },
    '&[data-pressed="true"]': {
      backgroundColor: "var(--color-components-menu-item-background-active)",
      color: "var(--color-components-menu-item-text-active)",
      transform: "scale(0.98)",
    },
    '&[data-disabled="true"]': {
      opacity: 0.5,
      cursor: "not-allowed",
    },
    '&[data-disabled="true"]:hover': {
      backgroundColor: "transparent",
      color: "var(--color-components-menu-item-text)",
    },
  },
});

export const menuItem = recipe({
  base: menuItemBase,

  variants: {
    destructive: {
      true: {
        color: "var(--color-components-menu-item-text-destructive)",

        ":hover": {
          backgroundColor:
            "var(--color-components-menu-item-background-destructive-hover)",
          color: "var(--color-components-menu-item-text-destructive-hover)",
        },

        selectors: {
          '&[data-focused="true"]': {
            backgroundColor:
              "var(--color-components-menu-item-background-destructive-hover)",
            color: "var(--color-components-menu-item-text-destructive-hover)",
          },
          '&[data-pressed="true"]': {
            backgroundColor:
              "var(--color-components-menu-item-background-destructive-active)",
            color: "var(--color-components-menu-item-text-destructive-active)",
          },
        },
      },
    },
  },

  defaultVariants: {
    destructive: false,
  },
});

// Menu item icon styles
export const menuItemIcon = style({
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "18px",
  height: "18px",
});

// Menu item text container
export const menuItemText = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  minWidth: 0, // Allow text truncation
});

// Menu item description
export const menuItemDescription = style({
  fontSize: theme.font.size.sm,
  color: "var(--color-components-menu-item-text-muted)",
  marginTop: "2px",
  lineHeight: 1.3,
});

// Menu item keyboard shortcut
export const menuItemKeyboardShortcut = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: theme.font.size.sm,
  color: "var(--color-components-menu-item-text-muted)",
  fontFamily: theme.font.family.sans,
  // Align digits consistently
  fontVariantNumeric: "tabular-nums",
  lineHeight: 1,
  height: "1.25rem",
  padding: "0 6px",
  border: `1px solid ${theme.color.border.default}`,
  borderRadius: theme.radius.sm,
  backgroundColor: "transparent",
  marginLeft: "auto",
  flexShrink: 0,
});

// Menu separator
export const menuSeparator = style({
  margin: `${theme.space.xs} ${theme.space.sm}`,
  height: "1px",
  backgroundColor: "var(--color-components-menu-separator)",
  flexShrink: 0,
});

// Menu Trigger Button styles
export const menuTriggerButtonBase = style({
  // Reset browser defaults
  margin: 0,
  padding: 0,
  background: "none",
  font: "inherit",
  textAlign: "center",
  textDecoration: "none",

  // Layout
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.space.sm,

  // Box model
  boxSizing: "border-box",
  flexShrink: 0,
  flexGrow: 0,
  flexBasis: "auto",

  // Typography
  fontFamily: theme.font.family.sans,
  fontSize: theme.font.size.md,
  fontWeight: theme.font.weight.medium,
  lineHeight: 1.5,
  color: theme.color.components.button.secondary.text,

  // Appearance
  backgroundColor: theme.color.components.button.secondary.background,
  border: `1px solid ${theme.color.components.button.secondary.border}`,
  borderRadius: theme.color.components.button.borderRadius,

  // Interaction
  cursor: "pointer",
  userSelect: "none",
  outline: "none",

  // Transitions
  "@media": {
    "(prefers-reduced-motion: no-preference)": {
      transition: "all 0.2s ease-in-out",
    },
  },

  // Focus styles
  ":focus-visible": {
    outline: `2px solid ${theme.color.border.focus}`,
    outlineOffset: "2px",
  },

  // Hover state
  ":hover": {
    backgroundColor: theme.color.components.button.secondary.backgroundHover,
    transform: "translateY(-1px)",
    boxShadow: theme.elevation.sm,
  },

  // Active state
  ":active": {
    backgroundColor: theme.color.components.button.secondary.backgroundActive,
    transform: "translateY(0)",
  },

  // Disabled state
  ":disabled": {
    cursor: "not-allowed",
    opacity: 0.5,
  },

  // React Aria states
  selectors: {
    '&[data-pressed="true"]': {
      transform: "scale(0.98)",
      backgroundColor: theme.color.components.button.secondary.backgroundActive,
    },
    '&[data-hovered="true"]': {
      backgroundColor: theme.color.components.button.secondary.backgroundHover,
      transform: "translateY(-1px)",
      boxShadow: theme.elevation.sm,
    },
  },
});

export const menuTriggerButton = recipe({
  base: menuTriggerButtonBase,

  variants: {
    size: {
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
    },
  },

  defaultVariants: {
    size: "md",
  },
});
