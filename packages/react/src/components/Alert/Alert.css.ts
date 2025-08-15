/**
 * Alert component styles using vanilla-extract
 * Following floating UI design principles with elevation.1 for cards/panels
 */

import { style, keyframes } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { theme } from '../../styles/theme.css';

// Slide in animation for alerts
const slideIn = keyframes({
  '0%': { 
    opacity: 0,
    transform: 'translateY(-8px) scale(0.98)',
  },
  '100%': { 
    opacity: 1,
    transform: 'translateY(0) scale(1)',
  },
});

// Slide out animation for dismissible alerts
const slideOut = keyframes({
  '0%': { 
    opacity: 1,
    transform: 'translateY(0) scale(1)',
    maxHeight: '200px',
  },
  '100%': { 
    opacity: 0,
    transform: 'translateY(-8px) scale(0.98)',
    maxHeight: '0px',
  },
});

// Main alert container with floating UI elevation
export const alert = recipe({
  base: {
    // Layout
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.space.sm,
    padding: theme.space[4],
    
    // Floating UI: elevation.1 for subtle raised appearance (cards/panels)
    boxShadow: theme.elevation.sm,
    borderRadius: theme.radius.md,
    
    // Typography
    fontSize: theme.font.size.md,
    lineHeight: 1.5,
    
    // Animations respecting prefers-reduced-motion
    '@media': {
      '(prefers-reduced-motion: no-preference)': {
        animation: `${slideIn} 300ms ease-out`,
        transition: 'all 200ms ease-in-out',
      },
      '(prefers-reduced-motion: reduce)': {
        animation: 'none',
        transition: 'none',
      },
    },
    
    // Exit animation
    selectors: {
      '&[data-exiting="true"]': {
        '@media': {
          '(prefers-reduced-motion: no-preference)': {
            animation: `${slideOut} 250ms ease-in forwards`,
          },
          '(prefers-reduced-motion: reduce)': {
            opacity: 0,
            maxHeight: 0,
            padding: 0,
            marginTop: 0,
            marginBottom: 0,
          },
        },
      },
    },
  },
  
  variants: {
    variant: {
      info: {
        backgroundColor: theme.color.base.brand['50'],
        color: theme.color.base.brand['800'],
        border: `1px solid ${theme.color.base.brand['200']}`,
      },
      success: {
        backgroundColor: theme.color.base.success['50'],
        color: theme.color.base.success['800'],
        border: `1px solid ${theme.color.base.success['200']}`,
      },
      warning: {
        backgroundColor: theme.color.base.warning['50'],
        color: theme.color.base.warning['800'],
        border: `1px solid ${theme.color.base.warning['200']}`,
      },
      error: {
        backgroundColor: theme.color.base.danger['50'],
        color: theme.color.base.danger['800'],
        border: `1px solid ${theme.color.base.danger['200']}`,
      },
    },
    
    size: {
      sm: {
        padding: theme.space.sm,
        fontSize: theme.font.size.sm,
        gap: theme.space.xs,
      },
      md: {
        padding: theme.space[4],
        fontSize: theme.font.size.md,
        gap: theme.space.sm,
      },
      lg: {
        padding: theme.space.md,
        fontSize: theme.font.size.lg,
        gap: theme.space[4],
      },
    },
  },
  
  defaultVariants: {
    variant: 'info',
    size: 'md',
  },
});

// Icon container with proper sizing and color
export const alertIcon = recipe({
  base: {
    // Layout
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    
    // Position at top for multi-line content
    marginTop: '2px',
  },
  
  variants: {
    variant: {
      info: {
        color: theme.color.base.brand['600'],
      },
      success: {
        color: theme.color.base.success['600'],
      },
      warning: {
        color: theme.color.base.warning['600'],
      },
      error: {
        color: theme.color.base.danger['600'],
      },
    },
    
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
    variant: 'info',
    size: 'md',
  },
});

// Content area for title and description
export const alertContent = style({
  flex: 1,
  minWidth: 0, // Allow text to wrap and truncate properly
});

// Title styling
export const alertTitle = recipe({
  base: {
    fontWeight: theme.font.weight.semibold,
    margin: 0,
    marginBottom: theme.space[1],
  },
  
  variants: {
    size: {
      sm: {
        fontSize: theme.font.size.sm,
        marginBottom: theme.space[1],
      },
      md: {
        fontSize: theme.font.size.md,
        marginBottom: theme.space[1],
      },
      lg: {
        fontSize: theme.font.size.lg,
        marginBottom: theme.space.xs,
      },
    },
  },
  
  defaultVariants: {
    size: 'md',
  },
});

// Description styling
export const alertDescription = recipe({
  base: {
    margin: 0,
    opacity: 0.9,
  },
  
  variants: {
    size: {
      sm: {
        fontSize: theme.font.size.xs,
      },
      md: {
        fontSize: theme.font.size.sm,
      },
      lg: {
        fontSize: theme.font.size.md,
      },
    },
  },
  
  defaultVariants: {
    size: 'md',
  },
});

// Close button with floating UI interactive states
export const alertCloseButton = recipe({
  base: {
    // Reset button styles
    background: 'none',
    border: 'none',
    padding: theme.space[1],
    margin: 0,
    
    // Layout
    position: 'absolute',
    top: theme.space.xs,
    right: theme.space.xs,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
    // Styling
    borderRadius: theme.radius.sm,
    cursor: 'pointer',
    opacity: 0.7,
    
    // Transitions
    '@media': {
      '(prefers-reduced-motion: no-preference)': {
        transition: 'all 150ms ease-in-out',
      },
      '(prefers-reduced-motion: reduce)': {
        transition: 'none',
      },
    },
    
    // Focus styles - floating UI clear focus indicators
    ':focus-visible': {
      outline: `2px solid ${theme.color.border.focus}`,
      outlineOffset: '1px',
      opacity: 1,
    },
    
    selectors: {
      // Hover elevation following floating UI
      '&:hover': {
        opacity: 1,
        '@media': {
          '(prefers-reduced-motion: no-preference)': {
            transform: 'scale(1.1)',
          },
        },
      },
      
      // Active state
      '&:active': {
        '@media': {
          '(prefers-reduced-motion: no-preference)': {
            transform: 'scale(1.05)',
          },
        },
      },
    },
  },
  
  variants: {
    variant: {
      info: {
        color: theme.color.base.brand['600'],
        selectors: {
          '&:hover': {
            backgroundColor: theme.color.base.brand['100'],
          },
        },
      },
      success: {
        color: theme.color.base.success['600'],
        selectors: {
          '&:hover': {
            backgroundColor: theme.color.base.success['100'],
          },
        },
      },
      warning: {
        color: theme.color.base.warning['600'],
        selectors: {
          '&:hover': {
            backgroundColor: theme.color.base.warning['100'],
          },
        },
      },
      error: {
        color: theme.color.base.danger['600'],
        selectors: {
          '&:hover': {
            backgroundColor: theme.color.base.danger['100'],
          },
        },
      },
    },
    
    size: {
      sm: {
        top: theme.space[1],
        right: theme.space[1],
        padding: '2px',
      },
      md: {
        top: theme.space.xs,
        right: theme.space.xs,
        padding: theme.space[1],
      },
      lg: {
        top: theme.space.sm,
        right: theme.space.sm,
        padding: theme.space[1],
      },
    },
  },
  
  defaultVariants: {
    variant: 'info',
    size: 'md',
  },
});

// Actions container for buttons
export const alertActions = style({
  display: 'flex',
  gap: theme.space.xs,
  marginTop: theme.space.sm,
  flexWrap: 'wrap',
});