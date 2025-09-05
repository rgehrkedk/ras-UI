import { style, styleVariants } from '@vanilla-extract/css';

import { theme } from '../../styles/theme.css';

export const tooltipContainer = style({
  position: 'relative',
  display: 'inline-block',
  // Allow tooltip to overflow container
  overflow: 'visible',
});

export const tooltip = style({
  position: 'absolute',
  backgroundColor: theme.color.surface.float,
  color: theme.color.text.primary,
  padding: '8px 12px',
  borderRadius: '6px',
  fontSize: '14px',
  fontWeight: 500,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  zIndex: 1000,
  maxWidth: '200px',
  wordWrap: 'break-word',
  whiteSpace: 'nowrap',
  opacity: 1,
});

export const tooltipPlacement = styleVariants({
  top: {
    bottom: 'calc(100% + 8px)',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  bottom: {
    top: 'calc(100% + 8px)',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  left: {
    right: 'calc(100% + 8px)',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  right: {
    left: 'calc(100% + 8px)',
    top: '50%',
    transform: 'translateY(-50%)',
  },
});

export const arrow = style({
  position: 'absolute',
  width: 0,
  height: 0,
  border: '6px solid transparent',
});

export const arrowPlacement = styleVariants({
  top: {
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    borderTopColor: theme.color.surface.float,
  },
  bottom: {
    bottom: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    borderBottomColor: theme.color.surface.float,
  },
  left: {
    left: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
    borderLeftColor: theme.color.surface.float,
  },
  right: {
    right: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
    borderRightColor: theme.color.surface.float,
  },
});