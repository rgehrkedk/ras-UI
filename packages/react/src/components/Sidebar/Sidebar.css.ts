import { style, globalStyle } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { theme } from '../../styles/theme.css';

// Sidebar container with layout variants
export const sidebar = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    transition: `width ${theme.animation.duration.normal} ${theme.animation.easing['ease-in-out']}`,
    overflow: 'visible', // Allow toggle button to overflow
  },
  variants: {
    variant: {
      floating: {
        position: 'relative',
        flexShrink: 0,
        height: `calc(100vh - ${theme.space.md} * 2)`,
        margin: theme.space.md,
        backgroundColor: theme.color.surface.float,
        borderRadius: theme.radius.lg,
        boxShadow: theme.elevation.lg,
        border: `1px solid ${theme.color.border.default}`,
      },
      push: {
        position: 'relative',
        flexShrink: 0,
        height: `calc(100vh - ${theme.space.md} * 2)`,
        margin: `${theme.space.md} 0`,
        backgroundColor: theme.color.surface.base,
        borderRight: `1px solid ${theme.color.border.default}`,
      },
    },
    collapsed: {
      false: {
        width: '200px',
      },
      true: {
        width: '64px',
      },
    },
  },
  defaultVariants: {
    variant: 'floating',
    collapsed: false,
  },
});