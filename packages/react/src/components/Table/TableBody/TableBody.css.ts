/**
 * TableBody component styles using vanilla-extract
 */

import { style } from '@vanilla-extract/css';

import { theme } from '../../../styles/theme.css';

// TableBody styles
export const tableBody = style({
  backgroundColor: theme.color.surface.base,
  
  // Empty state styles
  selectors: {
    '&:empty::after': {
      content: '"No data available"',
      display: 'table-row',
      textAlign: 'center',
      padding: theme.space.xl,
      color: theme.color.text.secondary,
      fontStyle: 'italic',
    },
  },
});

// Empty state container
export const emptyState = style({
  textAlign: 'center',
  padding: theme.space.xl,
  color: theme.color.text.secondary,
  fontStyle: 'italic',
  backgroundColor: theme.color.surface.base,
  
  // Center vertically within table
  verticalAlign: 'middle',
});