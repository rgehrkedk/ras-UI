/**
 * Dialog component styles using vanilla-extract
 */

import { style, keyframes, globalStyle } from '@vanilla-extract/css';

import { theme } from '../../styles/theme.css';

// Animations
const fadeIn = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const slideIn = keyframes({
  '0%': { 
    opacity: 0,
    transform: 'translateY(-50px) scale(0.95)',
  },
  '100%': { 
    opacity: 1,
    transform: 'translateY(0) scale(1)',
  },
});

// Overlay/backdrop styles
export const dialogOverlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: theme.color.overlay,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.space['4'],
  zIndex: 50,
  
  // Animation
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      animation: `${fadeIn} 0.2s ease-out`,
    },
  },
});

// Dialog container (floating UI surface)
export const dialogContainer = style({
  backgroundColor: theme.color.surface.float,
  border: `1px solid ${theme.color.border.default}`,
  borderRadius: theme.radius.lg,
  boxShadow: theme.elevation['3'],
  maxWidth: 'min(calc(100vw - 2rem), 32rem)',
  maxHeight: 'calc(100vh - 2rem)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  
  // Animation
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      animation: `${slideIn} 0.2s ease-out`,
    },
  },
  
  // Focus management
  outline: 'none',
});

// Dialog header
export const dialogHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `${theme.space['6']} ${theme.space['6']} ${theme.space['4']}`,
  borderBottom: `1px solid ${theme.color.border.default}`,
  flexShrink: 0,
});

// Dialog title
export const dialogTitle = style({
  fontFamily: theme.font.family.sans,
  fontSize: theme.font.size.lg,
  fontWeight: theme.font.weight.semibold,
  color: theme.color.text.primary,
  margin: 0,
  lineHeight: 1.4,
});

// Dialog close button
export const dialogCloseButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  borderRadius: theme.radius.sm,
  border: 'none',
  backgroundColor: 'transparent',
  color: theme.color.text.secondary,
  cursor: 'pointer',
  outline: 'none',
  flexShrink: 0,
  
  // Transitions
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      transition: 'all 0.2s ease-in-out',
    },
  },
  
  ':hover': {
    backgroundColor: theme.color.surface.raised,
    color: theme.color.text.primary,
  },
  
  ':focus-visible': {
    outline: `2px solid ${theme.color.border.focus}`,
    outlineOffset: '2px',
  },
  
  ':active': {
    transform: 'scale(0.95)',
  },
});

// Dialog body/content
export const dialogBody = style({
  padding: theme.space['6'],
  overflow: 'auto',
  flex: 1,
});

// Custom scrollbar styling for dialog body
globalStyle(`${dialogBody}::-webkit-scrollbar`, {
  width: '6px',
});

globalStyle(`${dialogBody}::-webkit-scrollbar-track`, {
  backgroundColor: 'transparent',
});

globalStyle(`${dialogBody}::-webkit-scrollbar-thumb`, {
  backgroundColor: theme.color.border.default,
  borderRadius: '3px',
});

globalStyle(`${dialogBody}::-webkit-scrollbar-thumb:hover`, {
  backgroundColor: theme.color.text.secondary,
});

// Dialog footer
export const dialogFooter = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: theme.space['3'],
  padding: `${theme.space['4']} ${theme.space['6']} ${theme.space['6']}`,
  borderTop: `1px solid ${theme.color.border.default}`,
  flexShrink: 0,
});

// Dialog description
export const dialogDescription = style({
  fontFamily: theme.font.family.sans,
  fontSize: theme.font.size.md,
  color: theme.color.text.secondary,
  lineHeight: 1.5,
  margin: 0,
  marginBottom: theme.space['4'],
});

// Alert dialog variant styles
export const alertDialogContainer = style([
  dialogContainer,
  {
    maxWidth: 'min(calc(100vw - 2rem), 28rem)',
  },
]);

export const alertDialogIcon = style({
  flexShrink: 0,
  marginRight: theme.space['3'],
  width: '20px',
  height: '20px',
});

export const alertDialogContent = style({
  display: 'flex',
  alignItems: 'flex-start',
});

// Size variants
export const dialogSizes = {
  sm: style([
    dialogContainer,
    {
      maxWidth: 'min(calc(100vw - 2rem), 24rem)',
    },
  ]),
  
  md: style([
    dialogContainer,
    {
      maxWidth: 'min(calc(100vw - 2rem), 32rem)',
    },
  ]),
  
  lg: style([
    dialogContainer,
    {
      maxWidth: 'min(calc(100vw - 2rem), 48rem)',
    },
  ]),
  
  xl: style([
    dialogContainer,
    {
      maxWidth: 'min(calc(100vw - 2rem), 64rem)',
    },
  ]),
};