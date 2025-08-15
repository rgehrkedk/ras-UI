/**
 * Switch component styles using vanilla-extract
 * Following floating UI design principles with elevation and interactive states
 */

import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { theme } from '../../styles/theme.css';


// Base switch container
export const switchContainer = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.space.xs,
  
  // Ensure proper focus management
  outline: 'none',
});

// Track (background) styles with floating UI elevation
export const switchTrack = recipe({
  base: {
    // Layout
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    
    // Floating UI: elevation.1 for subtle raised appearance
    boxShadow: theme.elevation.sm,
    borderRadius: theme.radius.full,
    
    // Interaction
    cursor: 'pointer',
    userSelect: 'none',
    
    // Transitions respecting prefers-reduced-motion
    '@media': {
      '(prefers-reduced-motion: no-preference)': {
        transition: 'all 200ms ease-in-out',
      },
      '(prefers-reduced-motion: reduce)': {
        transition: 'none',
      },
    },
    
    // Focus styles - floating UI clear focus indicators
    ':focus-visible': {
      outline: `2px solid ${theme.color.border.focus}`,
      outlineOffset: '2px',
    },
    
    // Disabled state
    selectors: {
      '&:hover:not([data-disabled="true"])': {
        '@media': {
          '(prefers-reduced-motion: no-preference)': {
            transform: 'translateY(-1px)',
            boxShadow: theme.elevation.md,
          },
        },
      },
      
      '&:active:not([data-disabled="true"])': {
        '@media': {
          '(prefers-reduced-motion: no-preference)': {
            transform: 'translateY(0)',
            boxShadow: theme.elevation.sm,
          },
        },
      },
      
      '&[data-disabled="true"]': {
        cursor: 'not-allowed',
        opacity: 0.5,
        boxShadow: 'none',
      },
    },
  },
  
  variants: {
    size: {
      sm: {
        width: '32px',
        height: '18px',
      },
      md: {
        width: '44px',
        height: '24px',
      },
      lg: {
        width: '56px',
        height: '30px',
      },
    },
    
    checked: {
      true: {
        // Use brand-aware component colors
        backgroundColor: theme.color.components.button.primary.background,
        borderColor: theme.color.components.button.primary.border,
        
        selectors: {
          '&:hover:not([data-disabled="true"])': {
            backgroundColor: theme.color.components.button.primary.backgroundHover,
          },
          
          '&:active:not([data-disabled="true"])': {
            backgroundColor: theme.color.components.button.primary.backgroundActive,
          },
        },
      },
      false: {
        // Neutral background for unchecked state
        backgroundColor: theme.color.surface.raised,
        border: `1px solid ${theme.color.border.default}`,
        
        selectors: {
          '&:hover:not([data-disabled="true"])': {
            backgroundColor: theme.color.surface.float,
          },
        },
      },
    },
  },
  
  defaultVariants: {
    size: 'md',
    checked: false,
  },
});

// Thumb (toggle) styles with floating UI elevation
export const switchThumb = recipe({
  base: {
    // Layout
    position: 'absolute',
    borderRadius: theme.radius.full,
    
    // Floating UI: Clean white surface with subtle elevation
    backgroundColor: theme.color.surface.base,
    boxShadow: theme.elevation.sm,
    
    // Smooth transitions
    '@media': {
      '(prefers-reduced-motion: no-preference)': {
        transition: 'all 200ms ease-in-out',
      },
      '(prefers-reduced-motion: reduce)': {
        transition: 'none',
      },
    },
    
    // Enhanced elevation on parent hover
    selectors: {
      '[data-hovered="true"] &': {
        '@media': {
          '(prefers-reduced-motion: no-preference)': {
            boxShadow: theme.elevation.md,
          },
        },
      },
    },
  },
  
  variants: {
    size: {
      sm: {
        width: '14px',
        height: '14px',
        top: '2px',
        left: '2px',
      },
      md: {
        width: '20px',
        height: '20px',
        top: '2px',
        left: '2px',
      },
      lg: {
        width: '26px',
        height: '26px',
        top: '2px',
        left: '2px',
      },
    },
    
    checked: {
      true: {},
      false: {},
    },
  },
  
  compoundVariants: [
    {
      variants: { size: 'sm', checked: true },
      style: {
        transform: 'translateX(14px)',
      },
    },
    {
      variants: { size: 'md', checked: true },
      style: {
        transform: 'translateX(18px)',
      },
    },
    {
      variants: { size: 'lg', checked: true },
      style: {
        transform: 'translateX(24px)',
      },
    },
  ],
  
  defaultVariants: {
    size: 'md',
    checked: false,
  },
});

// Label text styles
export const switchLabel = recipe({
  base: {
    // Typography
    fontFamily: theme.font.family.sans,
    fontWeight: theme.font.weight.medium,
    color: theme.color.text.primary,
    lineHeight: 1.5,
    
    // Layout
    userSelect: 'none',
    cursor: 'pointer',
    
    // Disabled state
    selectors: {
      '[data-disabled="true"] &': {
        cursor: 'not-allowed',
        opacity: 0.5,
      },
    },
  },
  
  variants: {
    size: {
      sm: {
        fontSize: theme.font.size.sm,
      },
      md: {
        fontSize: theme.font.size.md,
      },
      lg: {
        fontSize: theme.font.size.lg,
      },
    },
  },
  
  defaultVariants: {
    size: 'md',
  },
});

// Description text styles
export const switchDescription = style({
  fontSize: theme.font.size.sm,
  color: theme.color.text.secondary,
  lineHeight: 1.4,
  marginTop: theme.space[1],
  
  selectors: {
    '[data-disabled="true"] &': {
      opacity: 0.5,
    },
  },
});

// Error message styles (for form integration)
export const switchError = style({
  fontSize: theme.font.size.sm,
  color: theme.color.danger,
  lineHeight: 1.4,
  marginTop: theme.space[1],
  
  selectors: {
    '[data-disabled="true"] &': {
      opacity: 0.5,
    },
  },
});