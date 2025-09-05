/**
 * Breadcrumbs component styles using vanilla-extract
 */

import { style, globalStyle } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { theme } from '../../styles/theme.css';

// Base breadcrumbs container styles
export const breadcrumbsBase = style({
  // Reset browser defaults
  margin: 0,
  padding: 0,
  
  // Layout
  display: 'flex',
  alignItems: 'center',
  
  // Typography
  fontFamily: theme.font.family.sans,
  
  // Accessibility
  outline: 'none',
  
  // Focus styles for navigation landmark
  ':focus-visible': {
    outline: `2px solid ${theme.color.border.focus}`,
    outlineOffset: '2px',
    borderRadius: theme.radius.sm,
  },
});

// Breadcrumbs container recipe
export const breadcrumbs = recipe({
  base: breadcrumbsBase,
  
  variants: {
    size: {
      sm: {
        fontSize: theme.font.size.sm,
        gap: theme.space.xs,
      },
      md: {
        fontSize: theme.font.size.sm,
        gap: theme.space.sm,
      },
      lg: {
        fontSize: theme.font.size.md,
        gap: theme.space.sm,
      },
    },
  },
  
  defaultVariants: {
    size: 'md',
  },
});

// Breadcrumbs list (ol element)
export const breadcrumbsListBase = style({
  // Reset list defaults
  margin: 0,
  padding: 0,
  listStyle: 'none',
  
  // Layout
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
});

export const breadcrumbsList = recipe({
  base: breadcrumbsListBase,
  
  variants: {
    size: {
      sm: {
        gap: theme.space.xs,
      },
      md: {
        gap: theme.space.sm,
      },
      lg: {
        gap: theme.space.sm,
      },
    },
  },
  
  defaultVariants: {
    size: 'md',
  },
});

// Individual breadcrumb item container
export const breadcrumbItemBase = style({
  // Layout
  display: 'flex',
  alignItems: 'center',
  
  // Responsive behavior
  '@media': {
    '(max-width: 640px)': {
      maxWidth: '120px',
    },
  },
});

export const breadcrumbItem = recipe({
  base: breadcrumbItemBase,
  
  variants: {
    size: {
      sm: {
        minHeight: '24px',
      },
      md: {
        minHeight: '28px',
      },
      lg: {
        minHeight: '32px',
      },
    },
  },
  
  defaultVariants: {
    size: 'md',
  },
});

// Breadcrumb link styles
export const breadcrumbLinkBase = style({
  // Reset defaults
  border: 'none',
  background: 'none',
  margin: 0,
  padding: 0,
  textDecoration: 'none',
  
  // Typography
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontWeight: theme.font.weight.medium,
  lineHeight: 1.5,
  color: theme.color.components.breadcrumbs.link.text,
  
  // Layout
  display: 'inline-flex',
  alignItems: 'center',
  cursor: 'pointer',
  
  // Text overflow handling
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  
  // Interaction
  userSelect: 'none',
  
  // Accessibility
  outline: 'none',
  
  // Transitions
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      transition: 'all 0.15s ease-in-out',
    },
  },
  
  // Focus styles
  ':focus-visible': {
    outline: `2px solid ${theme.color.border.focus}`,
    outlineOffset: '2px',
    borderRadius: theme.color.components.breadcrumbs.link.borderRadius,
  },
  
  // Hover styles
  ':hover': {
    color: theme.color.components.breadcrumbs.link.textHover,
    backgroundColor: theme.color.components.breadcrumbs.link.backgroundHover,
  },
  
  // Active styles
  ':active': {
    color: theme.color.components.breadcrumbs.link.textActive,
    backgroundColor: theme.color.components.breadcrumbs.link.backgroundActive,
    transform: 'scale(0.98)',
  },
  
  // Disabled state
  selectors: {
    '&:disabled, &[data-disabled="true"]': {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
    '&:disabled:hover, &[data-disabled="true"]:hover': {
      color: theme.color.components.breadcrumbs.link.text,
      backgroundColor: 'transparent',
    },
  },
});

export const breadcrumbLink = recipe({
  base: breadcrumbLinkBase,
  
  variants: {
    size: {
      sm: {
        padding: `${theme.space[1]} ${theme.space.xs}`,
        borderRadius: theme.color.components.breadcrumbs.link.borderRadius,
        maxWidth: '100px',
      },
      md: {
        padding: `${theme.space.xs} ${theme.space.sm}`,
        borderRadius: theme.color.components.breadcrumbs.link.borderRadius,
        maxWidth: '120px',
      },
      lg: {
        padding: `${theme.space.sm} ${theme.space[4]}`,
        borderRadius: theme.color.components.breadcrumbs.link.borderRadius,
        maxWidth: '140px',
      },
    },
  },
  
  defaultVariants: {
    size: 'md',
  },
});

// Current page breadcrumb (non-clickable)
export const breadcrumbCurrentBase = style({
  // Typography
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontWeight: theme.font.weight.semibold,
  lineHeight: 1.5,
  color: theme.color.components.breadcrumbs.current.text,
  
  // Layout
  display: 'inline-flex',
  alignItems: 'center',
  
  // Text overflow handling
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  
  // Accessibility - aria-current="page" is added automatically by React Aria
});

export const breadcrumbCurrent = recipe({
  base: breadcrumbCurrentBase,
  
  variants: {
    size: {
      sm: {
        padding: `${theme.space[1]} ${theme.space.xs}`,
        maxWidth: '100px',
      },
      md: {
        padding: `${theme.space.xs} ${theme.space.sm}`,
        maxWidth: '120px',
      },
      lg: {
        padding: `${theme.space.sm} ${theme.space[4]}`,
        maxWidth: '140px',
      },
    },
  },
  
  defaultVariants: {
    size: 'md',
  },
});

// Breadcrumb separator styles
export const breadcrumbSeparatorBase = style({
  // Layout
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  
  // Typography
  color: theme.color.components.breadcrumbs.separator.text,
  fontWeight: theme.font.weight.regular,
  lineHeight: 1,
  
  // Accessibility
  userSelect: 'none',
  pointerEvents: 'none',
});

export const breadcrumbSeparator = recipe({
  base: breadcrumbSeparatorBase,
  
  variants: {
    size: {
      sm: {
        fontSize: theme.font.size.xs,
        minWidth: '16px',
        height: '16px',
      },
      md: {
        fontSize: theme.font.size.sm,
        minWidth: '18px',
        height: '18px',
      },
      lg: {
        fontSize: theme.font.size.md,
        minWidth: '20px',
        height: '20px',
      },
    },
  },
  
  defaultVariants: {
    size: 'md',
  },
});

// Ellipsis container for collapsed breadcrumbs
export const breadcrumbEllipsisBase = style({
  // Layout
  display: 'inline-flex',
  alignItems: 'center',
  position: 'relative',
});

export const breadcrumbEllipsis = recipe({
  base: breadcrumbEllipsisBase,
  
  variants: {
    size: {
      sm: {},
      md: {},
      lg: {},
    },
  },
  
  defaultVariants: {
    size: 'md',
  },
});

// Ellipsis trigger button
export const breadcrumbEllipsisButtonBase = style({
  // Reset defaults
  border: 'none',
  background: 'none',
  margin: 0,
  padding: 0,
  
  // Typography
  fontFamily: 'inherit',
  fontSize: 'inherit',
  color: theme.color.components.breadcrumbs.ellipsis.text,
  
  // Layout
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  
  // Interaction
  userSelect: 'none',
  
  // Accessibility
  outline: 'none',
  
  // Transitions
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      transition: 'all 0.15s ease-in-out',
    },
  },
  
  // Focus styles
  ':focus-visible': {
    outline: `2px solid ${theme.color.border.focus}`,
    outlineOffset: '2px',
    borderRadius: theme.color.components.breadcrumbs.ellipsis.borderRadius,
  },
  
  // Hover styles
  ':hover': {
    color: theme.color.components.breadcrumbs.ellipsis.textHover,
    backgroundColor: theme.color.components.breadcrumbs.ellipsis.backgroundHover,
  },
  
  // Active styles
  ':active': {
    transform: 'scale(0.95)',
  },
  
  // Pressed state (for React Aria)
  selectors: {
    '&[data-pressed="true"]': {
      transform: 'scale(0.95)',
    },
  },
});

export const breadcrumbEllipsisButton = recipe({
  base: breadcrumbEllipsisButtonBase,
  
  variants: {
    size: {
      sm: {
        padding: theme.space[1],
        borderRadius: theme.color.components.breadcrumbs.ellipsis.borderRadius,
        minWidth: '24px',
        minHeight: '24px',
      },
      md: {
        padding: theme.space.xs,
        borderRadius: theme.color.components.breadcrumbs.ellipsis.borderRadius,
        minWidth: '28px',
        minHeight: '28px',
      },
      lg: {
        padding: theme.space.sm,
        borderRadius: theme.color.components.breadcrumbs.ellipsis.borderRadius,
        minWidth: '32px',
        minHeight: '32px',
      },
    },
  },
  
  defaultVariants: {
    size: 'md',
  },
});

// Ellipsis dropdown menu
export const breadcrumbEllipsisMenuBase = style({
  // Menu container styles
  minWidth: '200px',
  maxWidth: '300px',
  maxHeight: '200px',
  overflowY: 'auto',
  
  // Visual styles
  backgroundColor: theme.color.surface.raised,
  border: `1px solid ${theme.color.border.default}`,
  borderRadius: theme.radius.lg,
  boxShadow: theme.elevation.lg,
  
  // Layout
  padding: theme.space.xs,
});

// Global styles for menu items within the breadcrumb ellipsis menu
globalStyle(`${breadcrumbEllipsisMenuBase} [role="menuitem"]`, {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  padding: `${theme.space.xs} ${theme.space.sm}`,
  border: 'none',
  backgroundColor: 'transparent',
  color: theme.color.text.primary,
  fontSize: theme.font.size.sm,
  fontFamily: theme.font.family.sans,
  fontWeight: theme.font.weight.regular,
  lineHeight: 1.5,
  textAlign: 'left',
  textDecoration: 'none',
  cursor: 'pointer',
  borderRadius: theme.radius.md,
  
  // Text overflow
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  
  // Transitions
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      transition: 'all 0.15s ease-in-out',
    },
  },
});

globalStyle(`${breadcrumbEllipsisMenuBase} [role="menuitem"]:hover`, {
  backgroundColor: theme.color.interaction.hover,
  color: theme.color.text.primary,
});

globalStyle(`${breadcrumbEllipsisMenuBase} [role="menuitem"]:focus-visible`, {
  outline: `2px solid ${theme.color.border.focus}`,
  outlineOffset: '-2px',
});

globalStyle(`${breadcrumbEllipsisMenuBase} [role="menuitem"][data-disabled="true"]`, {
  opacity: 0.5,
  cursor: 'not-allowed',
});

globalStyle(`${breadcrumbEllipsisMenuBase} [role="menuitem"][data-disabled="true"]:hover`, {
  backgroundColor: 'transparent',
  color: theme.color.text.primary,
});

export const breadcrumbEllipsisMenu = recipe({
  base: breadcrumbEllipsisMenuBase,
  
  variants: {
    size: {
      sm: {},
      md: {},
      lg: {},
    },
  },
  
  defaultVariants: {
    size: 'md',
  },
});