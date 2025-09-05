import { style } from '@vanilla-extract/css';

import { theme } from '../../../styles/theme.css';

// Navigation group
export const sidebarGroup = style({
  marginBottom: theme.space.lg,
});

export const sidebarGroupLabel = style({
  fontSize: theme.font.size.xs,
  fontWeight: theme.font.weight.semibold,
  color: theme.color.text.secondary,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  padding: `${theme.space.xs} ${theme.space.sm}`,
  marginBottom: theme.space.xs,
  
  // Single line truncation
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  transition: `opacity 200ms ease-out`,
  
  // When collapsed, simply fade out
  selectors: {
    '[data-collapsed="true"] &': {
      opacity: 0,
      pointerEvents: 'none',
    }
  }
});