/**
 * Row component styles using vanilla-extract
 */

import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { theme } from '../../../styles/theme.css';

// Base row styles
export const rowBase = style({
  // Layout
  verticalAlign: 'middle',
  
  // Interaction
  cursor: 'default',
  transition: 'background-color 0.2s ease, color 0.2s ease',
  
  // Focus styles for keyboard navigation
  outline: 'none',
  
  selectors: {
    // Focus ring
    '&[data-focus-visible="true"]': {
      outline: `2px solid ${theme.color.border.focus}`,
      outlineOffset: '-2px',
      zIndex: 1,
    },
    
    // Selected state
    '&[data-selected="true"]': {
      backgroundColor: theme.color.components.table.row.backgroundSelected,
      color: theme.color.text.primary,
    },
    
    // Hover state (only when table has hoverable prop)
    'table[data-hoverable="true"] &:hover': {
      backgroundColor: theme.color.components.table.row.backgroundHover,
    },
    
    // Don't hover if already selected
    'table[data-hoverable="true"] &[data-selected="true"]:hover': {
      backgroundColor: theme.color.components.table.row.backgroundSelected,
    },
    
    // Pressed/active state
    '&[data-pressed="true"]': {
      backgroundColor: theme.color.interaction.active,
    },
    
    // Striped rows (odd rows get different background)
    'table[data-striped="true"] &:nth-child(odd)': {
      backgroundColor: theme.color.components.table.row.backgroundStriped,
    },
    
    'table[data-striped="true"] &:nth-child(even)': {
      backgroundColor: theme.color.components.table.row.background,
    },
    
    // Selected rows override striping
    'table[data-striped="true"] &[data-selected="true"]': {
      backgroundColor: theme.color.components.table.row.backgroundSelected,
    },
    
    // Hover on striped tables
    'table[data-striped="true"][data-hoverable="true"] &:nth-child(odd):hover': {
      backgroundColor: theme.color.components.table.row.backgroundHover,
    },
    
    'table[data-striped="true"][data-hoverable="true"] &:nth-child(even):hover': {
      backgroundColor: theme.color.components.table.row.backgroundHover,
    },
  },
});

// Row recipe with variants
export const row = recipe({
  base: rowBase,
  
  variants: {
    disabled: {
      true: {
        opacity: theme.opacity.disabled,
        cursor: 'not-allowed',
        pointerEvents: 'none',
        
        // Override hover states when disabled
        selectors: {
          'table[data-hoverable="true"] &:hover': {
            backgroundColor: 'inherit',
          },
        },
      },
      false: {
        // Clickable rows get pointer cursor
        selectors: {
          '&[data-has-action="true"]': {
            cursor: 'pointer',
          },
        },
      },
    },
  },
  
  // Size-specific styling handled by parent table context
  compoundVariants: [
    {
      variants: {},
      style: {
        selectors: {
          // Size variants for row height
          'table[data-size="sm"] &': {
            minHeight: '32px',
          },
          'table[data-size="md"] &': {
            minHeight: '40px',
          },
          'table[data-size="lg"] &': {
            minHeight: '48px',
          },
        },
      },
    },
  ],
  
  defaultVariants: {
    disabled: false,
  },
});