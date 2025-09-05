/**
 * RadioGroup component styles using vanilla-extract
 */

import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { theme } from '../../styles/theme.css';

// Base radio group container styles
const radioGroupBase = style({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space.xs,
  
  // Typography
  fontFamily: theme.font.family.sans,
  fontSize: theme.font.size.md,
  color: theme.color.text.primary,
});

// RadioGroup recipe with variants
export const radioGroup = recipe({
  base: radioGroupBase,
  
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
    orientation: {
      horizontal: {
        flexDirection: 'row',
        gap: theme.space.md,
      },
      vertical: {
        flexDirection: 'column',
        gap: theme.space.xs,
      },
    },
  },
  
  defaultVariants: {
    size: 'md',
    orientation: 'vertical',
  },
});

// Base radio option styles
const radioBase = style({
  display: 'inline-flex',
  alignItems: 'flex-start',
  gap: theme.space.xs,
  cursor: 'pointer',
  userSelect: 'none',
  lineHeight: '1.5',
  
  // Focus styles
  outline: 'none',
  
  ':focus-visible': {
    outline: `2px solid ${theme.color.border.focus}`,
    outlineOffset: '2px',
    borderRadius: theme.radius.sm,
  },
  
  // Disabled state
  selectors: {
    '&[data-disabled="true"]': {
      cursor: 'not-allowed',
      opacity: 0.6,
    },
  },
});

// Radio recipe with size variants
export const radio = recipe({
  base: radioBase,
  
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
    size: 'md',
  },
});

// Base radio indicator (the visual circle)
const radioIndicatorBase = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  borderRadius: '50%',
  
  // Basic styling
  backgroundColor: theme.color.surface.base,
  border: `1px solid ${theme.color.border.default}`,
  
  // Transitions
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      transition: 'all 0.2s ease-in-out',
    },
  },
  
  // SVG styling
  color: theme.color.text.onBrand,
  
  // Hover state
  ':hover': {
    borderColor: theme.color.border.focus,
    backgroundColor: theme.color.interaction.hover,
  },
  
  // States via data attributes
  selectors: {
    // Selected state
    '&[data-selected="true"]': {
      backgroundColor: theme.color.brand.primary,
      borderColor: theme.color.brand.primary,
      color: theme.color.text.onBrand,
    },
    
    // Focus state
    '&[data-focus-visible="true"]': {
      outline: `2px solid ${theme.color.border.focus}`,
      outlineOffset: '2px',
    },
    
    // Disabled state
    '&[data-disabled="true"]': {
      backgroundColor: theme.color.base.neutral[100],
      borderColor: theme.color.base.neutral[200],
      cursor: 'not-allowed',
    },
    
    // Disabled + selected
    '&[data-disabled="true"][data-selected="true"]': {
      backgroundColor: theme.color.base.neutral[300],
      borderColor: theme.color.base.neutral[400],
      color: theme.color.text.secondary,
      opacity: 0.7,
    },
  },
});

// Radio indicator recipe with size variants
export const radioIndicator = recipe({
  base: radioIndicatorBase,
  
  variants: {
    size: {
      sm: {
        width: '16px',
        height: '16px',
      },
      md: {
        width: '20px',
        height: '20px',
      },
      lg: {
        width: '24px',
        height: '24px',
      },
    },
  },
  
  defaultVariants: {
    size: 'md',
  },
});