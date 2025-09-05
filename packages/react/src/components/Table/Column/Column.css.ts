/**
 * Column component styles using vanilla-extract
 */

import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { theme } from '../../../styles/theme.css';

// Base column styles
export const columnBase = style({
  // Reset browser defaults
  padding: `${theme.space.sm} ${theme.space[4]}`,
  margin: 0,
  
  // Typography
  fontFamily: theme.font.family.sans,
  fontWeight: theme.font.weight.semibold,
  fontSize: 'inherit',
  color: theme.color.text.primary,
  textAlign: 'left',
  
  // Layout
  verticalAlign: 'middle',
  borderBottom: `1px solid ${theme.color.components.table.border}`,
  backgroundColor: theme.color.components.table.header.background,
  
  // Interaction styles for sortable columns
  cursor: 'default',
  userSelect: 'none',
  
  // Focus styles
  outline: 'none',
  
  // Focus styles will be handled by React Aria
});

// Column recipe with variants
export const column = recipe({
  base: columnBase,
  
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
    
    sortable: {
      true: {
        cursor: 'pointer',
        transition: 'background-color 0.2s ease, color 0.2s ease',
        
        ':hover': {
          backgroundColor: theme.color.interaction.hover,
          color: theme.color.text.primary,
        },
        
        ':active': {
          backgroundColor: theme.color.interaction.active,
        },
        
        // Focus styles for keyboard navigation
        ':focus-visible': {
          outline: `2px solid ${theme.color.border.focus}`,
          outlineOffset: '-2px',
        },
      },
      false: {
        cursor: 'default',
      },
    },
    
    sticky: {
      true: {
        position: 'sticky',
        left: 0,
        zIndex: 10,
        
        // Ensure sticky columns have proper background
        backgroundColor: theme.color.components.table.header.background,
        
        // Add shadow to indicate stickiness
        boxShadow: `2px 0 4px -1px ${theme.color.components.table.border}`,
      },
    },
  },
  
  // Compound variants for size-specific padding
  compoundVariants: [
    {
      variants: {},
      style: {
        // Size variants handled by parent table context
        selectors: {
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
        },
      },
    },
  ],
  
  defaultVariants: {
    align: 'left',
    sortable: false,
    sticky: false,
  },
});

// Sort indicator icon styles
export const sortIcon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: '16px',
  height: '16px',
  color: theme.color.components.table.header.sortIcon,
  transition: 'color 0.2s ease',
  
  // Different states based on sort direction
  selectors: {
    '&[data-sort-direction="ascending"]': {
      color: theme.color.components.table.header.sortIconActive,
    },
    
    '&[data-sort-direction="descending"]': {
      color: theme.color.components.table.header.sortIconActive,
    },
    
    // Show on column hover
    [`${column.classNames.variants.sortable.true}:hover &`]: {
      color: theme.color.text.primary,
    },
  },
});

// Column content layout (base)
export const columnContent = style({
  display: 'flex',
  alignItems: 'center',
  gap: theme.space.xs,
  width: '100%',
  justifyContent: 'flex-start', // default alignment
});

// Column content alignment variants
export const columnContentLeft = style({
  justifyContent: 'flex-start',
});

export const columnContentCenter = style({
  justifyContent: 'center',
});

export const columnContentRight = style({
  justifyContent: 'flex-end',
});

// Column text content
export const columnText = style({
  flex: 1,
  minWidth: 0, // Allow text to truncate
});

// Sort icon SVG
export const sortIconSvg = style({
  display: 'block',
  width: '100%',
  height: '100%',
});