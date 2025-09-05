/**
 * Select component styles using vanilla-extract
 */

import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { theme } from '../../styles/theme.css';

// Base select container styles
export const selectBase = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space.xs,
});

// Select trigger (button) base styles
export const selectTriggerBase = style({
  // Reset button defaults
  margin: 0,
  padding: 0,
  background: 'none',
  
  // Typography
  fontFamily: theme.font.family.sans,
  fontSize: theme.font.size.md,
  fontWeight: theme.font.weight.regular,
  lineHeight: 1.5,
  textAlign: 'left',
  
  // Layout
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.space.sm,
  width: '100%',
  
  // Styling
  backgroundColor: theme.color.surface.base,
  color: theme.color.text.primary,
  border: `1px solid ${theme.color.border.default}`,
  borderRadius: theme.radius.md,
  boxShadow: theme.elevation.sm,
  
  // Interaction
  cursor: 'pointer',
  userSelect: 'none',
  
  // Accessibility
  outline: 'none',
  
  // Transitions
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      transition: 'all 0.2s ease-in-out',
    },
  },
  
  // Focus styles
  ':focus-visible': {
    outline: `2px solid ${theme.color.border.focus}`,
    outlineOffset: '1px',
    borderColor: theme.color.border.focus,
  },
  
  // Hover styles
  ':hover': {
    borderColor: theme.color.border.focus,
    boxShadow: theme.elevation.md,
  },
  
  // Disabled state
  ':disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
    backgroundColor: theme.color.surface.base,
    borderColor: theme.color.border.default,
  },
  
  // Pressed state (for React Aria)
  selectors: {
    '&[data-pressed="true"]': {
      transform: 'scale(0.99)',
    },
    '&[data-invalid="true"]': {
      borderColor: theme.color.danger,
    },
  },
});

// Select trigger recipe with size variants
export const selectTrigger = recipe({
  base: selectTriggerBase,
  
  variants: {
    size: {
      sm: {
        height: theme.size.height.select.sm,
        padding: `0 ${theme.space.sm}`,
        fontSize: theme.font.size.sm,
      },
      md: {
        height: theme.size.height.select.md,
        padding: `0 ${theme.space[4]}`,
        fontSize: theme.font.size.md,
      },
      lg: {
        height: theme.size.height.select.lg,
        padding: `0 ${theme.space.md}`,
        fontSize: theme.font.size.lg,
      },
    },
    
    fullWidth: {
      true: {
        width: '100%',
      },
      false: {
        width: 'fit-content',
        minWidth: '200px',
      },
    },
  },
  
  defaultVariants: {
    size: 'md',
    fullWidth: false,
  },
});

// Select value container
export const selectValue = style({
  flex: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  
  selectors: {
    // Placeholder styling
    '&[data-placeholder="true"]': {
      color: theme.color.text.secondary,
      fontStyle: 'italic',
    },
  },
});

// Select chevron icon
export const selectChevron = style({
  flexShrink: 0,
  width: '16px',
  height: '16px',
  color: theme.color.text.secondary,
  
  // Transition for arrow rotation
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      transition: 'transform 0.2s ease-in-out',
    },
  },
  
  selectors: {
    // Rotate when open
    '[data-expanded="true"] &': {
      transform: 'rotate(180deg)',
    },
    
    // Disabled state
    '[data-disabled="true"] &': {
      color: theme.color.text.secondary,
      opacity: 0.5,
    },
  },
});

// Popover styles for Select dropdown
export const selectPopover = style({
  minWidth: 'var(--trigger-width)',
  maxHeight: '300px',
  overflowY: 'auto',
  backgroundColor: theme.color.surface.float,
  border: `1px solid ${theme.color.border.default}`,
  borderRadius: theme.radius.md,
  boxShadow: theme.elevation.lg,
  zIndex: theme.zIndex.dropdown,
  
  // Positioning
  marginTop: theme.space.xs,
  
  // Animation
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      // Entry animation
      selectors: {
        '&[data-entering]': {
          animationName: 'slideInFromTop',
          animationDuration: '0.2s',
          animationTimingFunction: 'ease-out',
        },
        '&[data-exiting]': {
          animationName: 'slideOutToTop',
          animationDuration: '0.15s',
          animationTimingFunction: 'ease-in',
        },
      },
    },
  },
});

// ListBox styles (the container for select options)
export const selectListBox = style({
  outline: 'none',
  padding: theme.space.xs,
});

// ListBox item styles
export const selectItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: theme.space.sm,
  padding: `${theme.space.xs} ${theme.space.sm}`,
  margin: 0,
  borderRadius: theme.radius.sm,
  cursor: 'pointer',
  userSelect: 'none',
  position: 'relative',
  
  // Typography
  fontSize: theme.font.size.md,
  fontWeight: theme.font.weight.regular,
  color: theme.color.text.primary,
  
  // Transitions
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      transition: 'background-color 0.15s ease-in-out',
    },
  },
  
  // States
  selectors: {
    // Hover state
    '&[data-hovered="true"]': {
      backgroundColor: theme.color.semantic.menu.itemHover,
    },
    
    // Focused state
    '&[data-focused="true"]': {
      backgroundColor: theme.color.semantic.menu.itemHover,
      outline: 'none',
    },
    
    // Selected state
    '&[data-selected="true"]': {
      backgroundColor: theme.color.semantic.menu.itemSelected,
      fontWeight: theme.font.weight.medium,
    },
    
    // Disabled state
    '&[data-disabled="true"]': {
      opacity: 0.5,
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
  },
});

// Check icon for selected items
export const selectCheckIcon = style({
  position: 'absolute',
  left: theme.space.xs,
  width: '16px',
  height: '16px',
  color: theme.color.brand.primary,
  opacity: 0,
  
  // Transitions
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      transition: 'opacity 0.15s ease-in-out',
    },
  },
  
  selectors: {
    // Show when selected
    '[data-selected="true"] &': {
      opacity: 1,
    },
  },
});

// Item text container (with left padding when check is visible)
export const selectItemText = style({
  flex: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  
  selectors: {
    // Add left padding when item is selected (to make room for check icon)
    '[data-selected="true"] &': {
      paddingLeft: theme.space.lg,
    },
  },
});

// Label styles
export const selectLabel = style({
  fontSize: theme.font.size.sm,
  fontWeight: theme.font.weight.medium,
  color: theme.color.text.primary,
  marginBottom: theme.space.xs,
});

// Required indicator
export const selectRequired = style({
  color: theme.color.danger,
  marginLeft: theme.space.xs,
});

// Helper text styles
export const selectHelperText = style({
  fontSize: theme.font.size.sm,
  color: theme.color.text.secondary,
  marginTop: theme.space.xs,
});

// Error text styles
export const selectErrorText = style({
  fontSize: theme.font.size.sm,
  color: theme.color.danger,
  marginTop: theme.space.xs,
});

// Animation styles (keyframes are handled by React Aria's built-in animations)
export const selectPopoverAnimated = style({
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
    },
  },
});

// Size-specific icon adjustments
export const selectItemIcon = style({
  flexShrink: 0,
  
  selectors: {
    [`${selectTrigger.classNames.variants.size.sm} &`]: {
      width: '14px',
      height: '14px',
    },
    [`${selectTrigger.classNames.variants.size.md} &`]: {
      width: '16px',
      height: '16px',
    },
    [`${selectTrigger.classNames.variants.size.lg} &`]: {
      width: '18px',
      height: '18px',
    },
  },
});