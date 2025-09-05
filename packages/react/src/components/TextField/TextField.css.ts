/**
 * TextField component styles using vanilla-extract
 */

import { style, globalStyle } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { theme } from '../../styles/theme.css';

// Base input styles
export const textFieldInput = style({
  // Reset browser defaults
  border: 'none',
  margin: 0,
  padding: 0,
  background: 'none',
  outline: 'none',
  
  // Typography
  fontFamily: theme.font.family.sans,
  lineHeight: 1.5,
  color: theme.color.text.primary,
  
  // Layout
  width: '100%',
  display: 'block',
  
  // TextArea specific styles
  resize: 'vertical', // Allow vertical resize for textarea
  minHeight: 'inherit', // Inherit from container
  
  // Placeholder styles
  '::placeholder': {
    color: theme.color.text.secondary,
    opacity: 1,
  },
});

// Remove autofill styling using globalStyle
globalStyle(`${textFieldInput}:-webkit-autofill`, {
  borderRadius: 'inherit',
  boxShadow: `0 0 0 1000px ${theme.color.surface.base} inset`,
  WebkitTextFillColor: theme.color.text.primary,
});

// TextField container styles with recipe
export const textFieldContainer = recipe({
  base: {
    position: 'relative',
    display: 'flex',
    alignItems: 'stretch', // Allow content to stretch vertically for textarea
    backgroundColor: theme.color.surface.base,
    border: `1px solid ${theme.color.border.default}`,
    borderRadius: theme.radius.md,
    
    // Transitions
    '@media': {
      '(prefers-reduced-motion: no-preference)': {
        transition: 'all 0.2s ease-in-out',
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
    
    validation: {
      neutral: {},
      
      valid: {
        borderColor: theme.color.success,
        
        ':focus-within': {
          borderColor: theme.color.success,
          boxShadow: `0 0 0 1px ${theme.color.success}`,
        },
        
        ':hover': {
          borderColor: theme.color.success,
        },
      },
      
      invalid: {
        borderColor: theme.color.danger,
        
        ':focus-within': {
          borderColor: theme.color.danger,
          boxShadow: `0 0 0 1px ${theme.color.danger}`,
        },
        
        ':hover': {
          borderColor: theme.color.danger,
        },
      },
    },
    
    disabled: {
      true: {
        backgroundColor: theme.color.surface.raised,
        borderColor: theme.color.border.default,
        opacity: 0.6,
        cursor: 'not-allowed',
        
        ':hover': {
          borderColor: theme.color.border.default,
        },
      },
    },
    
    fullWidth: {
      true: {
        width: '100%',
      },
    },
  },
  
  compoundVariants: [
    {
      variants: {
        disabled: true,
        validation: 'invalid',
      },
      style: {
        borderColor: theme.color.border.default,
        ':focus-within': {
          borderColor: theme.color.border.default,
          boxShadow: 'none',
        },
        ':hover': {
          borderColor: theme.color.border.default,
        },
      },
    },
    {
      variants: {
        disabled: true,
        validation: 'valid',
      },
      style: {
        borderColor: theme.color.border.default,
        ':focus-within': {
          borderColor: theme.color.border.default,
          boxShadow: 'none',
        },
        ':hover': {
          borderColor: theme.color.border.default,
        },
      },
    },
  ],
  
  defaultVariants: {
    size: 'md',
    validation: 'neutral',
  },
});

// Label styles
export const textFieldLabel = style({
  display: 'block',
  fontFamily: theme.font.family.sans,
  fontSize: theme.font.size.sm,
  fontWeight: theme.font.weight.medium,
  color: theme.color.text.primary,
  marginBottom: theme.space.xs,
  lineHeight: 1.5,
});

// Helper text styles
export const textFieldHelperText = style({
  display: 'block',
  fontFamily: theme.font.family.sans,
  fontSize: theme.font.size.sm,
  color: theme.color.text.secondary,
  marginTop: theme.space.xs,
  lineHeight: 1.4,
});

// Error message styles
export const textFieldErrorText = style([
  textFieldHelperText,
  {
    color: theme.color.danger,
  },
]);

// Required indicator
export const textFieldRequired = style({
  color: theme.color.danger,
  marginLeft: theme.space[1],
});