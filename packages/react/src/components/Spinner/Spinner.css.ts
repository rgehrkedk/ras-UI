/**
 * Spinner component styles using vanilla-extract
 */

import { style, keyframes } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { theme } from '../../styles/theme.css';

// Spinner animation
const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

// Base spinner styles
const spinnerBase = style({
  border: '2px solid currentColor',
  borderTopColor: 'transparent',
  borderRadius: '50%',
  animation: `${spin} 1s linear infinite`,
  flexShrink: 0,
});

export const spinnerRecipe = recipe({
  base: spinnerBase,
  variants: {
    size: {
      sm: {
        width: '14px',
        height: '14px',
        borderWidth: '1.5px',
      },
      md: {
        width: '16px',
        height: '16px',
        borderWidth: '2px',
      },
      lg: {
        width: '20px',
        height: '20px',
        borderWidth: '2px',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});