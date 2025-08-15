/**
 * IconWrapper component styles using vanilla-extract
 */

import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

// Icon wrapper base styles
const iconWrapperBase = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  color: 'currentColor',
});

export const iconWrapperRecipe = recipe({
  base: iconWrapperBase,
  variants: {
    size: {
      sm: {
        width: '14px',
        height: '14px',
      },
      md: {
        width: '16px',
        height: '16px',
      },
      lg: {
        width: '20px',
        height: '20px',
      },
    },
    position: {
      start: {},
      end: {},
    },
  },
  defaultVariants: {
    size: 'md',
    position: 'start',
  },
});