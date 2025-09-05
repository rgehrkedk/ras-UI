import { style, globalStyle } from '@vanilla-extract/css';

import { theme } from '../../../styles/theme.css';

// Sidebar footer
export const sidebarFooter = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  borderTop: `1px solid ${theme.color.border.default}`,
  padding: theme.space.md,
  paddingLeft: '58px', // Reserve space for avatar (32px avatar + proper positioning)
  marginTop: 'auto',
});

// Global styles for text container (second child)
globalStyle(`${sidebarFooter} > div:nth-child(2)`, {
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0,
  gap: '2px',
  transition: `opacity 100ms ease-out`,
  transitionDelay: '0ms',
});

// When collapsed, hide the text container
globalStyle(`${sidebarFooter}[data-collapsed="true"] > div:nth-child(2)`, {
  opacity: 0,
  transitionDelay: '200ms',
  pointerEvents: 'none',
});

// Avatar positioned absolutely - centered in the reserved space
export const sidebarFooterAvatar = style({
  position: 'absolute',
  left: '16px', // Center 32px avatar in the reserved space (72px - 32px = 40px, so 20px from left)
  top: '50%',
  transform: 'translateY(-50%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// Footer text container - positioned naturally like the original story
export const sidebarFooterText = style({
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0,
  gap: '2px',
  transition: `opacity 100ms ease-out`,
  transitionDelay: '0ms',
  
  selectors: {
    '[data-collapsed="true"] &': {
      opacity: 0,
      transitionDelay: '200ms',
      pointerEvents: 'none',
    }
  }
});

// Footer text name
export const sidebarFooterName = style({
  fontWeight: '500',
  fontSize: '14px',
  color: theme.color.text.primary,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

// Footer text email  
export const sidebarFooterEmail = style({
  fontSize: '12px',
  color: theme.color.text.secondary,
  opacity: 0.7,
  whiteSpace: 'nowrap',
  overflow: 'hidden', 
  textOverflow: 'ellipsis',
});