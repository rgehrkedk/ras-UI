/**
 * TableHeader component styles using vanilla-extract
 */

import { style } from '@vanilla-extract/css';

import { theme } from '../../../styles/theme.css';

// TableHeader styles
export const tableHeader = style({
  backgroundColor: theme.color.components.table.header.background,
  borderBottom: `1px solid ${theme.color.components.table.border}`,
  
  // Typography
  fontWeight: theme.font.weight.semibold,
  color: theme.color.components.table.header.text,
  
  // Ensure header stands out visually
  position: 'relative',
  
  // Border radius for top corners when table is bordered
  selectors: {
    'table[data-bordered="true"] &': {
      borderTopLeftRadius: 'inherit',
      borderTopRightRadius: 'inherit',
    },
  },
});