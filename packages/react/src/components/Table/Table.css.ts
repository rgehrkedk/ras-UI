/**
 * Table component styles using vanilla-extract
 */

import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { theme } from '../../styles/theme.css';

// Base table styles
export const tableBase = style({
  // Reset browser defaults
  borderCollapse: 'collapse',
  borderSpacing: 0,
  width: '100%',
  
  // Typography
  fontFamily: theme.font.family.sans,
  fontSize: theme.font.size.md,
  lineHeight: 1.5,
  
  // Visual appearance
  backgroundColor: theme.color.surface.base,
  border: `1px solid ${theme.color.components.table.border}`,
  borderRadius: theme.color.components.table.borderRadius,
  
  // Accessibility
  outline: 'none',
  
  // Focus styles for keyboard navigation
  ':focus-visible': {
    outline: `2px solid ${theme.color.border.focus}`,
    outlineOffset: '2px',
  },
  
  // Hide default table focus ring since we handle it with CSS
  selectors: {
    '&[data-focus-visible="true"]': {
      outline: `2px solid ${theme.color.border.focus}`,
      outlineOffset: '2px',
    },
  },
});

// Table recipe with variants
export const table = recipe({
  base: tableBase,
  
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
    
    striped: {
      true: {
        // Striped rows handled in Row component via nth-child
      },
    },
    
    bordered: {
      true: {
        border: `1px solid ${theme.color.components.table.border}`,
      },
      false: {
        border: 'none',
      },
    },
    
    hoverable: {
      true: {
        // Hover effects handled in Row component
      },
    },
  },
  
  defaultVariants: {
    size: 'md',
    striped: false,
    bordered: true,
    hoverable: true,
  },
});

// Loading state styles
export const tableLoading = style({
  position: 'relative',
  
  '::after': {
    content: '',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.color.surface.base,
    opacity: theme.opacity.overlay,
    pointerEvents: 'none',
    zIndex: 1,
  },
});

// Empty state styles
export const tableEmpty = style({
  textAlign: 'center',
  padding: theme.space.xl,
  color: theme.color.text.secondary,
  fontStyle: 'italic',
});

// Scroll container for responsive tables
export const tableScrollContainer = style({
  overflowX: 'auto',
  WebkitOverflowScrolling: 'touch',
});