/**
 * Cell component styles using vanilla-extract
 */

import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { theme } from '../../../styles/theme.css';

// Base cell styles
export const cellBase = style({
  // Reset browser defaults
  padding: `${theme.space.sm} ${theme.space[4]}`,
  margin: 0,
  
  // Typography
  fontFamily: theme.font.family.sans,
  fontSize: 'inherit',
  fontWeight: theme.font.weight.regular,
  color: theme.color.components.table.cell.text,
  lineHeight: 1.5,
  
  // Layout
  verticalAlign: 'middle',
  textAlign: 'left',
  borderBottom: `1px solid ${theme.color.components.table.border}`,
  backgroundColor: 'inherit', // Inherit from row
  
  // Word wrapping
  wordWrap: 'break-word',
  overflowWrap: 'break-word',
  
  // Prevent layout shifts
  minHeight: '1.5em',
});

// Cell recipe with variants
export const cell = recipe({
  base: cellBase,
  
  variants: {
    align: {
      left: {
        textAlign: 'left',
      },
      center: {
        textAlign: 'center',
      },
      right: {
        textAlign: 'right',
      },
    },
    
    truncate: {
      true: {
        maxWidth: '200px', // Reasonable default, can be overridden
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
    },
    
    numeric: {
      true: {
        fontFamily: theme.font.family.mono,
        fontFeatureSettings: '"tnum"', // Tabular numbers for consistent spacing
        textAlign: 'right',
      },
    },
  },
  
  // Size-specific styling handled by parent table context
  compoundVariants: [
    {
      variants: {},
      style: {
        selectors: {
          // Size variants for padding
          'table[data-size="sm"] &': {
            padding: `${theme.space.xs} ${theme.space.sm}`,
            fontSize: theme.font.size.sm,
          },
          'table[data-size="md"] &': {
            padding: `${theme.space.sm} ${theme.space[4]}`,
            fontSize: theme.font.size.md,
          },
          'table[data-size="lg"] &': {
            padding: `${theme.space[4]} ${theme.space.md}`,
            fontSize: theme.font.size.lg,
          },
          
          // Row header cells (first column) styling
          'th[data-row-header="true"] &': {
            fontWeight: theme.font.weight.medium,
            color: theme.color.text.primary,
          },
        },
      },
    },
  ],
  
  defaultVariants: {
    align: 'left',
    truncate: false,
    numeric: false,
  },
});

// Special cell types
export const actionCell = style({
  // Cells containing buttons/actions
  padding: `${theme.space.xs} ${theme.space.sm}`,
  
  // Center action buttons
  textAlign: 'center',
  
  // Prevent text selection on action cells
  userSelect: 'none',
});

export const statusCell = style({
  // Cells containing status indicators - specific styling should be applied to child elements
  color: 'inherit',
});