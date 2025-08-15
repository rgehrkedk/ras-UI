/**
 * Input component styles using vanilla-extract
 */

import { style, globalStyle } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { theme } from '../../styles/theme.css';

// Base input field styles
export const inputBase = style({
  // Reset browser defaults
  border: 'none',
  margin: 0,
  padding: 0,
  background: 'none',
  outline: 'none',
  
  // Typography
  fontFamily: theme.font.family.sans,
  fontSize: theme.font.size.md,
  fontWeight: theme.font.weight.regular,
  lineHeight: 1.5,
  color: theme.color.text.primary,
  
  // Layout
  width: '100%',
  display: 'block',
  
  // Placeholder styles
  '::placeholder': {
    color: theme.color.text.secondary,
    opacity: 1,
  },
  
});

// Remove autofill styling using globalStyle
globalStyle(`${inputBase}:-webkit-autofill`, {
  borderRadius: 'inherit',
  boxShadow: `0 0 0 1000px ${theme.color.surface.base} inset`,
  WebkitTextFillColor: theme.color.text.primary,
});

// Input container styles
export const inputContainer = recipe({
  base: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.color.surface.base,
    border: `1px solid ${theme.color.border.default}`,
    borderRadius: theme.radius.md,
    
    // Transitions
    '@media': {
      '(prefers-reduced-motion: no-preference)': {
        transition: `all ${theme.animation.duration.fast} ${theme.animation.easing.easeInOut}`,
      },
    },
    
    // Focus-within styles for container
    ':focus-within': {
      borderColor: theme.color.border.focus,
      boxShadow: `0 0 0 1px ${theme.color.border.focus}`,
    },
    
    // Hover styles
    ':hover': {
      borderColor: theme.color.border.focus,
    },
  },
  
  variants: {
    size: {
      sm: {
        padding: `${theme.space.xs} ${theme.space.sm}`,
        minHeight: '32px',
        fontSize: theme.font.size.sm,
      },
      
      md: {
        padding: `${theme.space.sm} ${theme.space[4]}`,
        minHeight: '40px',
        fontSize: theme.font.size.md,
      },
      
      lg: {
        padding: `${theme.space[4]} ${theme.space.md}`,
        minHeight: '48px',
        fontSize: theme.font.size.lg,
      },
    },
    
    state: {
      default: {},
      
      error: {
        borderColor: theme.color.danger,
        
        ':focus-within': {
          borderColor: theme.color.danger,
          boxShadow: `0 0 0 1px ${theme.color.danger}`,
        },
        
        ':hover': {
          borderColor: theme.color.danger,
        },
      },
      
      disabled: {
        backgroundColor: theme.color.surface.raised,
        borderColor: theme.color.border.default,
        opacity: 0.6,
        cursor: 'not-allowed',
        
        ':hover': {
          borderColor: theme.color.border.default,
        },
      },
      
      loading: {
        cursor: 'progress',
      },
    },
    
    fullWidth: {
      true: {
        width: '100%',
      },
    },
  },
  
  defaultVariants: {
    size: 'md',
    state: 'default',
  },
});

// Input field within container
export const inputField = style({
  selectors: {
    [`${inputContainer.classNames.variants.size.sm} &`]: {
      fontSize: theme.font.size.sm,
    },
    [`${inputContainer.classNames.variants.size.md} &`]: {
      fontSize: theme.font.size.md,
    },
    [`${inputContainer.classNames.variants.size.lg} &`]: {
      fontSize: theme.font.size.lg,
    },
    
    // Disabled state
    [`${inputContainer.classNames.variants.state.disabled} &`]: {
      cursor: 'not-allowed',
    },
  },
});

// Icon styles within input
export const inputIcon = style({
  flexShrink: 0,
  color: theme.color.text.secondary,
  
  selectors: {
    [`${inputContainer.classNames.variants.size.sm} &`]: {
      width: '16px',
      height: '16px',
    },
    [`${inputContainer.classNames.variants.size.md} &`]: {
      width: '18px',
      height: '18px',
    },
    [`${inputContainer.classNames.variants.size.lg} &`]: {
      width: '20px',
      height: '20px',
    },
    
    // Error state
    [`${inputContainer.classNames.variants.state.error} &`]: {
      color: theme.color.danger,
    },
  },
});

// Start icon (left side)
export const inputStartIcon = style([
  inputIcon,
  {
    marginRight: theme.space.xs,
  },
]);

// End icon (right side)
export const inputEndIcon = style([
  inputIcon,
  {
    marginLeft: theme.space.xs,
  },
]);

// Label styles
export const inputLabel = style({
  display: 'block',
  fontFamily: theme.font.family.sans,
  fontSize: theme.font.size.sm,
  fontWeight: theme.font.weight.medium,
  color: theme.color.text.primary,
  marginBottom: theme.space.xs,
  lineHeight: 1.5,
});

// Helper text styles
export const inputHelperText = style({
  display: 'block',
  fontFamily: theme.font.family.sans,
  fontSize: theme.font.size.sm,
  color: theme.color.text.secondary,
  marginTop: theme.space.xs,
  lineHeight: 1.4,
});

// Error message styles
export const inputErrorText = style([
  inputHelperText,
  {
    color: theme.color.danger,
  },
]);

// Required indicator
export const inputRequired = style({
  color: theme.color.danger,
  marginLeft: theme.space[1],
});