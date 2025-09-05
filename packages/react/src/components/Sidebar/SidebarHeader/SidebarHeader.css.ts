import { style, globalStyle } from '@vanilla-extract/css';

import { theme } from '../../../styles/theme.css';

// Sidebar header
export const sidebarHeader = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  padding: theme.space.md,
  paddingLeft: '58px', // Same as sidebar items - reserve space for logo
  minHeight: '64px',
});

// Global styles for text spans in header
globalStyle(`${sidebarHeader} span`, {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  transition: `opacity 100ms ease-out`,
  transitionDelay: '0ms',
});

// When collapsed, hide text with delay
globalStyle(`${sidebarHeader}[data-collapsed="true"] span`, {
  opacity: 0,
  transitionDelay: '200ms',
  pointerEvents: 'none',
});

// Ensure logo elements maintain fixed size
globalStyle(`${sidebarHeader} > div:first-child > div:first-child`, {
  width: '32px !important',
  height: '32px !important',
  minWidth: '32px !important',
  maxWidth: '32px !important',
  flexShrink: '0 !important',
  flexGrow: '0 !important',
});

// Header content container
export const sidebarHeaderContent = style({
  display: 'flex',
  alignItems: 'center',
  gap: theme.space.sm,
  width: '100%',
});

// Header text styling
export const sidebarHeaderText = style({
  fontWeight: '600',
  fontSize: '18px',
  color: theme.color.text.primary,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
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

// Logo container - absolutely positioned like sidebar item icons
export const sidebarHeaderLogo = style({
  position: 'absolute',
  left: '16px', // Center in the reserved space (43px - 32px = 11px, so 11px/2 ≈ 16px from left)
  top: '50%',
  transform: 'translateY(-50%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
});

// Title text - hidden when collapsed, truncated to single line
export const sidebarHeaderTitle = style({
  fontSize: '18px',
  fontWeight: '600',
  color: theme.color.text.primary,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  flex: 1, // Allow it to grow and shrink appropriately
  minWidth: 0, // Allow flex item to shrink below its content width
});

// Style for SidebarToggle positioning - absolutely positioned on the right
globalStyle(`${sidebarHeader} > button[type="button"]`, {
  position: 'absolute',
  right: '-10px',
  top: '14px',

});