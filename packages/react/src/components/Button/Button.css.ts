/**
 * Button component styles using vanilla-extract
 */

import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { theme } from '../../styles/theme.css';

// Note: Spinner animation moved to shared/Spinner component

// Base button styles following React Aria Components patterns
export const buttonBase = style({
  // Reset browser defaults
  border: 'none',
  margin: 0,
  padding: 0,
  background: 'none',
  
  // Typography
  fontFamily: theme.font.family.sans,
  fontSize: theme.font.size.md,
  fontWeight: theme.font.weight.medium,
  lineHeight: 1.5,
  
  // Layout
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.space.sm,
  
  // Interaction
  cursor: 'pointer',
  userSelect: 'none',
  textDecoration: 'none',
  
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
    outlineOffset: '2px',
  },
  
  // Disabled state
  ':disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
  
  // Pressed state (for React Aria)
  selectors: {
    '&[data-pressed="true"]': {
      transform: 'scale(0.98)',
    },
  },
});

// Button recipe with variants
export const button = recipe({
  base: buttonBase,
  
  variants: {
    variant: {
      primary: {
        backgroundColor: theme.color.components.button.primary.background,
        color: theme.color.components.button.primary.text,
        border: `1px solid ${theme.color.components.button.primary.border}`,
        
        ':hover': {
          backgroundColor: theme.color.components.button.primary.backgroundHover,
          transform: 'translateY(-1px)',
          boxShadow: theme.elevation.md,
        },
        
        ':active': {
          backgroundColor: theme.color.components.button.primary.backgroundActive,
          transform: 'translateY(0)',
          boxShadow: theme.elevation.sm,
        },
      },
      
      secondary: {
        backgroundColor: theme.color.components.button.secondary.background,
        color: theme.color.components.button.secondary.text,
        border: `1px solid ${theme.color.components.button.secondary.border}`,
        
        ':hover': {
          backgroundColor: theme.color.components.button.secondary.backgroundHover,
          transform: 'translateY(-1px)',
          boxShadow: theme.elevation.sm,
        },
        
        ':active': {
          backgroundColor: theme.color.components.button.secondary.backgroundActive,
          transform: 'translateY(0)',
        },
      },
      
      ghost: {
        backgroundColor: theme.color.components.button.ghost.background,
        color: theme.color.components.button.ghost.text,
        border: `1px solid ${theme.color.components.button.ghost.border}`,
        
        ':hover': {
          backgroundColor: theme.color.components.button.ghost.backgroundHover,
        },
        
        ':active': {
          backgroundColor: theme.color.components.button.ghost.backgroundActive,
        },
      },
      
      danger: {
        backgroundColor: theme.color.components.button.danger.background,
        color: theme.color.components.button.danger.text,
        border: `1px solid ${theme.color.components.button.danger.border}`,
        
        ':hover': {
          backgroundColor: theme.color.components.button.danger.backgroundHover,
          transform: 'translateY(-1px)',
          boxShadow: theme.elevation.md,
        },
        
        ':active': {
          backgroundColor: theme.color.components.button.danger.backgroundActive,
          transform: 'translateY(0)',
        },
      },
      
      icon: {
        backgroundColor: 'transparent',
        color: theme.color.components.button.ghost.text,
        border: '1px solid transparent',
        padding: theme.space.xs, // Square padding for icon buttons
        
        ':hover': {
          backgroundColor: theme.color.components.button.ghost.backgroundHover,
          borderColor: theme.color.components.button.ghost.border,
        },
        
        ':active': {
          backgroundColor: theme.color.components.button.ghost.backgroundActive,
          transform: 'scale(0.95)',
        },
      },
    },
    
    size: {
      sm: {
        padding: `${theme.space.xs} ${theme.space.sm}`,
        fontSize: theme.font.size.sm,
        minHeight: '32px',
        borderRadius: theme.color.components.button.borderRadius,
      },
      
      md: {
        padding: `${theme.space.sm} ${theme.space[4]}`,
        fontSize: theme.font.size.md,
        minHeight: '40px',
        borderRadius: theme.color.components.button.borderRadius,
      },
      
      lg: {
        padding: `${theme.space[4]} ${theme.space.md}`,
        fontSize: theme.font.size.lg,
        minHeight: '48px',
        borderRadius: theme.color.components.button.borderRadius,
      },
    },
    
    fullWidth: {
      true: {
        width: '100%',
      },
    },
  },
  
  compoundVariants: [
    // Icon variant size overrides for square buttons
    {
      variants: { variant: 'icon', size: 'sm' },
      style: {
        padding: theme.space.xs,
        width: '32px',
        minWidth: '32px',
      },
    },
    {
      variants: { variant: 'icon', size: 'md' },
      style: {
        padding: theme.space.sm,
        width: '40px',
        minWidth: '40px',
      },
    },
    {
      variants: { variant: 'icon', size: 'lg' },
      style: {
        padding: theme.space[4],
        width: '48px',
        minWidth: '48px',
      },
    },
  ],
  
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

// Icon styles within button
export const buttonIcon = style({
  flexShrink: 0,
  
  // Size adjustments based on button size
  selectors: {
    [`${button.classNames.variants.size.sm} &`]: {
      width: '16px',
      height: '16px',
    },
    [`${button.classNames.variants.size.md} &`]: {
      width: '18px',
      height: '18px',
    },
    [`${button.classNames.variants.size.lg} &`]: {
      width: '20px',
      height: '20px',
    },
  },
});

// Note: Loading spinner styles moved to shared/Spinner component