import { style, styleVariants } from '@vanilla-extract/css';

export const avatar = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  flexShrink: 0,
  fontWeight: '600',
  overflow: 'hidden',
  position: 'relative',
});

export const avatarClickable = style({
  cursor: 'pointer',
  transition: 'transform 150ms ease',
  
  ':hover': {
    transform: 'scale(1.05)',
  },
  
  ':active': {
    transform: 'scale(0.95)',
  },
});

export const avatarSize = styleVariants({
  sm: {
    width: '24px',
    height: '24px',
    fontSize: '10px',
  },
  md: {
    width: '32px',
    height: '32px',
    fontSize: '14px',
  },
  lg: {
    width: '40px',
    height: '40px',
    fontSize: '16px',
  },
  xl: {
    width: '48px',
    height: '48px',
    fontSize: '18px',
  },
});

export const avatarVariant = styleVariants({
  primary: {
    backgroundColor: 'var(--color-components-avatar-primary-background)',
    color: 'var(--color-components-avatar-primary-text)',
  },
  secondary: {
    backgroundColor: 'var(--color-components-avatar-secondary-background)',
    color: 'var(--color-components-avatar-secondary-text)',
  },
  success: {
    backgroundColor: 'var(--color-components-avatar-success-background)',
    color: 'var(--color-components-avatar-success-text)',
  },
  warning: {
    backgroundColor: 'var(--color-components-avatar-warning-background)',
    color: 'var(--color-components-avatar-warning-text)',
  },
  danger: {
    backgroundColor: 'var(--color-components-avatar-danger-background)',
    color: 'var(--color-components-avatar-danger-text)',
  },
});

export const avatarImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '50%',
});

export const avatarInitials = style({
  userSelect: 'none',
});
