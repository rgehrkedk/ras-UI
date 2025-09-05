import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { theme } from '../../../styles/theme.css';

// Toggle button - isolated and refactored
export const sidebarToggle = recipe({
  base: {
    // Reset button defaults
    margin: 0,
    padding: 0,
    border: 'none',
    background: 'none',
    font: 'inherit',
    lineHeight: 'normal',
    textAlign: 'center',
    textDecoration: 'none',
    
    // Positioning and layout
    position: 'absolute',
    top: theme.space.md,
    right: '-12px',
    zIndex: 21,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '38%',
    cursor: 'pointer',
    transition: `all ${theme.animation.duration.fast} ${theme.animation.easing['ease-in-out']}`,
    
    // Prevent flex stretching
    flexShrink: 0,
    flexGrow: 0,
    flexBasis: 'auto',
    
    // Prevent width/height stretching
    boxSizing: 'border-box',
    
    ':focus': {
      outline: 'none',
    },
    
    ':disabled': {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
  },
  variants: {
    size: {
      sm: {
        width: '24px',
        height: '24px',
        minWidth: '24px',
        minHeight: '24px',
        maxWidth: '24px',
        maxHeight: '24px',
      },
      md: {
        width: '32px',
        height: '32px',
        minWidth: '32px',
        minHeight: '32px',
        maxWidth: '32px',
        maxHeight: '32px',
      },
      lg: {
        width: '40px',
        height: '40px',
        minWidth: '40px',
        minHeight: '40px',
        maxWidth: '40px',
        maxHeight: '40px',
      },
    },
    variant: {
      default: {
        backgroundColor: theme.color.surface.raised,
        border: `1px solid ${theme.color.border.default}`,
        color: theme.color.text.primary,
        boxShadow: theme.color.overlay,
        
        ':hover': {
          backgroundColor: theme.color.interaction.hover,
          color: theme.color.text.primary,
          transform: 'scale(1.05)',
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: theme.color.text.secondary,
        
        ':hover': {
          backgroundColor: theme.color.interaction.hover,
          color: theme.color.text.primary,
        },
      },
      outline: {
        backgroundColor: 'transparent',
        border: `2px solid ${theme.color.border.default}`,
        color: theme.color.text.secondary,
        
        ':hover': {
          backgroundColor: theme.color.interaction.hover,
          borderColor: theme.color.border.focus,
          color: theme.color.text.primary,
        },
      },
    },
    focusVisible: {
      true: {
        outline: `2px solid ${theme.color.border.focus}`,
        outlineOffset: '2px',
      },
      false: {},
    },
    pressed: {
      true: {
        transform: 'scale(0.95)',
      },
      false: {},
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
    focusVisible: false,
    pressed: false,
  },
});

// Toggle icon wrapper
export const sidebarToggleIcon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '18px',
  fontWeight: 'bold',
  lineHeight: 1,
  userSelect: 'none',
  pointerEvents: 'none',
});