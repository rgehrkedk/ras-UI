import { style } from '@vanilla-extract/css';

import { theme } from '../../styles/theme.css';

export const shortcut = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: theme.font.size.sm,
  color: 'var(--color-components-menu-item-text-muted)',
  fontFamily: theme.font.family.sans,
  fontVariantNumeric: 'tabular-nums',
  lineHeight: 1,
  height: '1.25rem',
  padding: '0 6px',
  border: `1px solid ${theme.color.border.default}`,
  borderRadius: theme.radius.sm,
  backgroundColor: 'transparent',
  flexShrink: 0,
});

export const alignEnd = style({
  marginLeft: 'auto',
});
