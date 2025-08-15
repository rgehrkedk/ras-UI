/**
 * Tooltip component styles using vanilla-extract
 * Following floating UI design principles with elevation.2
 */

import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { theme } from '../../styles/theme.css';

// React Aria handles positioning and animations - keep styles minimal

// Tooltip content styles following floating UI principles
export const tooltip = recipe({
  base: {
    // Floating UI: elevation.2 for clear floating elements
    backgroundColor: theme.color.surface.float,
    boxShadow: theme.elevation.md,
    borderRadius: theme.radius.md,
    
    // Typography
    fontSize: theme.font.size.sm,
    fontWeight: theme.font.weight.medium,
    color: theme.color.text.primary,
    lineHeight: 1.4,
    
    // Layout
    padding: `${theme.space.xs} ${theme.space.sm}`,
    maxWidth: '200px',
    wordWrap: 'break-word',
    
    // Accessibility
    pointerEvents: 'none',
    userSelect: 'none',
    
    // Smooth transitions instead of animations to prevent flickering
    '@media': {
      '(prefers-reduced-motion: no-preference)': {
        transition: 'opacity 150ms ease-out',
      },
      '(prefers-reduced-motion: reduce)': {
        transition: 'none',
      },
    },
    
    // React Aria handles positioning - let it manage states
    selectors: {
      '&[data-entering]': {
        opacity: 0,
      },
      '&[data-exiting]': {
        opacity: 0,
      },
    },
  },
  
  variants: {
    placement: {
      top: {},
      bottom: {},
      left: {},
      right: {},
    },
    
    size: {
      sm: {
        fontSize: theme.font.size.xs,
        padding: `${theme.space[1]} ${theme.space.xs}`,
        maxWidth: '150px',
      },
      md: {
        fontSize: theme.font.size.sm,
        padding: `${theme.space.xs} ${theme.space.sm}`,
        maxWidth: '200px',
      },
      lg: {
        fontSize: theme.font.size.md,
        padding: `${theme.space.sm} ${theme.space.lg}`,
        maxWidth: '300px',
      },
    },
  },
  
  defaultVariants: {
    placement: 'top',
    size: 'md',
  },
});

// Arrow element for better visual connection
export const tooltipArrow = style({
  position: 'absolute',
  width: 0,
  height: 0,
  
  // Arrow pointing down (for top placement)
  selectors: {
    '&[data-placement="top"]': {
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      borderLeft: '4px solid transparent',
      borderRight: '4px solid transparent',
      borderTop: `4px solid ${theme.color.surface.float}`,
    },
    
    // Arrow pointing up (for bottom placement)
    '&[data-placement="bottom"]': {
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      borderLeft: '4px solid transparent',
      borderRight: '4px solid transparent',
      borderBottom: `4px solid ${theme.color.surface.float}`,
    },
    
    // Arrow pointing right (for left placement)
    '&[data-placement="left"]': {
      left: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      borderTop: '4px solid transparent',
      borderBottom: '4px solid transparent',
      borderLeft: `4px solid ${theme.color.surface.float}`,
    },
    
    // Arrow pointing left (for right placement)
    '&[data-placement="right"]': {
      right: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      borderTop: '4px solid transparent',
      borderBottom: '4px solid transparent',
      borderRight: `4px solid ${theme.color.surface.float}`,
    },
  },
});