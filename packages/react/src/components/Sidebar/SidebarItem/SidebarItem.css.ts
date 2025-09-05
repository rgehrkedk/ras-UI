import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { theme } from '../../../styles/theme.css';

// Navigation item with enhanced states
export const sidebarItem = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.space.sm,
    width: '100%',
    height: '40px',
    padding: `0 ${theme.space.md}`,
    paddingLeft: '43px', // Reserve space for icon (22px icon position + 20px icon width + 10px gap)
    boxSizing: 'border-box',
    borderRadius: theme.radius.md,
    fontSize: theme.font.size.sm,
    fontWeight: theme.font.weight.medium,
    color: theme.color.text.secondary,
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: `background-color ${theme.animation.duration.fast} ${theme.animation.easing['ease-in-out']}, color ${theme.animation.duration.fast} ${theme.animation.easing['ease-in-out']}`,
    position: 'relative',
    
    // Disabled state
    'selectors': {
      '&[data-disabled="true"]': {
        opacity: 0.5,
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
    
    ':hover': {
      backgroundColor: theme.color.interaction.hover,
      color: theme.color.text.primary,
    },
    
    ':focus': {
      outline: 'none', // We handle focus ring separately
    },
  },
  variants: {
    active: {
      true: {
        backgroundColor: theme.color.interaction.active,
        color: theme.color.brand.primary,
        fontWeight: theme.font.weight.semibold,
        
        ':hover': {
          backgroundColor: theme.color.interaction.active,
          color: theme.color.brand.primary,
        },
      },
      false: {},
    },
    focusVisible: {
      true: {
        outline: `2px solid ${theme.color.border.focus}`,
        outlineOffset: '2px',
        zIndex: 1,
      },
      false: {},
    },
    pressed: {
      true: {
        transform: 'scale(0.98)',
        backgroundColor: theme.color.interaction.pressed,
      },
      false: {},
    },
  },
  defaultVariants: {
    active: false,
    focusVisible: false,
    pressed: false,
  },
});

export const sidebarItemIcon = style({
  position: 'absolute',
  left: '13px', // Center position that works for both states (roughly center of 64px collapsed width)
  top: '50%',
  transform: 'translateY(-50%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '20px',
  height: '20px',
  color: 'currentColor',
});

export const sidebarItemText = style({
  flex: 1,
  textAlign: 'left',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  // Delay fade out when collapsing (250ms sidebar transition + 50ms delay)
  transition: `opacity 100ms ease-out 0ms`,
  transitionDelay: '0ms',
  
  selectors: {
    '[data-collapsed="true"] &': {
      opacity: 0,
      transitionDelay: '200ms', // Disappear after sidebar collapses
      pointerEvents: 'none',
    }
  }
});

export const sidebarItemBadge = style({
  marginLeft: 'auto',
  flexShrink: 0,
  transition: `opacity 100ms ease-out`,
  transitionDelay: '0ms',
  
  selectors: {
    '[data-collapsed="true"] &': {
      opacity: 0,
      transitionDelay: '200ms', // Disappear after sidebar collapses
      pointerEvents: 'none',
    }
  }
});