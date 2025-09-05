/**
 * Link component styles using vanilla-extract
 */

import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { theme } from '../../styles/theme.css';

// Base link styles following React Aria Components patterns
export const linkBase = style({
  // Reset browser defaults
  margin: 0,
  padding: 0,
  background: 'none',
  
  // Typography
  fontFamily: theme.font.family.sans,
  fontSize: 'inherit', // Inherit font size by default
  fontWeight: theme.font.weight.medium,
  lineHeight: 'inherit',
  
  // Layout
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.space.xs,
  
  // Interaction
  cursor: 'pointer',
  userSelect: 'none',
  textDecoration: 'underline',
  textUnderlineOffset: '0.125em',
  textDecorationThickness: '1px',
  
  // Accessibility
  outline: 'none',
  
  // Transitions
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      transition: 'all 0.15s ease-in-out',
    },
  },
  
  // Focus styles
  ':focus-visible': {
    outline: `2px solid ${theme.color.border.focus}`,
    outlineOffset: '2px',
    textDecoration: 'none', // Remove underline when focused for clarity
  },
  
  // Disabled state
  selectors: {
    '&[data-disabled="true"]': {
      cursor: 'not-allowed',
      opacity: 0.5,
      textDecoration: 'none',
    },
    
    // Pressed state (for React Aria)
    '&[data-pressed="true"]': {
      transform: 'scale(0.98)',
    },
  },
});

// Link recipe with variants
export const link = recipe({
  base: linkBase,
  
  variants: {
    variant: {
      default: {
        color: theme.color.components.link.default.text,
        textDecorationColor: theme.color.components.link.default.text,
        
        ':hover': {
          color: theme.color.components.link.default.textHover,
          textDecorationColor: theme.color.components.link.default.textHover,
          textDecorationThickness: '2px',
        },
        
        ':active': {
          color: theme.color.components.link.default.textActive,
          textDecorationColor: theme.color.components.link.default.textActive,
        },
        
        // Visited state
        ':visited': {
          color: theme.color.components.link.default.textVisited,
        },
      },
      
      quiet: {
        color: theme.color.components.link.quiet.text,
        textDecoration: 'none',
        
        ':hover': {
          color: theme.color.components.link.quiet.textHover,
          textDecoration: 'underline',
          textUnderlineOffset: '0.125em',
        },
        
        ':active': {
          color: theme.color.components.link.quiet.textActive,
        },
        
        // No visited state for quiet links
        ':visited': {
          color: theme.color.components.link.quiet.text,
        },
      },
      
      emphasized: {
        color: theme.color.components.link.emphasized.text,
        fontWeight: theme.font.weight.semibold,
        textDecoration: 'none',
        backgroundColor: theme.color.components.link.emphasized.background,
        padding: `${theme.space.xs} ${theme.space.sm}`,
        borderRadius: theme.color.components.link.emphasized.borderRadius,
        
        ':hover': {
          backgroundColor: theme.color.components.link.emphasized.backgroundHover,
          color: theme.color.components.link.emphasized.textHover,
          transform: 'translateY(-1px)',
          boxShadow: theme.elevation.sm,
        },
        
        ':active': {
          backgroundColor: theme.color.components.link.emphasized.backgroundActive,
          transform: 'translateY(0)',
          boxShadow: 'none',
        },
        
        ':visited': {
          color: theme.color.components.link.emphasized.text,
        },
      },
    },
    
    size: {
      sm: {
        fontSize: theme.font.size.sm,
        gap: theme.space.xs,
      },
      
      md: {
        fontSize: theme.font.size.md,
        gap: theme.space.xs,
      },
      
      lg: {
        fontSize: theme.font.size.lg,
        gap: theme.space.sm,
      },
    },
    
    fullWidth: {
      true: {
        width: '100%',
        justifyContent: 'flex-start',
      },
    },
    
    disabled: {
      true: {
        // Disabled styles handled in base selector
      },
    },
  },
  
  compoundVariants: [
    // Emphasized variant size adjustments
    {
      variants: { variant: 'emphasized', size: 'sm' },
      style: {
        padding: `${theme.space.xs} ${theme.space.sm}`,
        fontSize: theme.font.size.sm,
      },
    },
    {
      variants: { variant: 'emphasized', size: 'md' },
      style: {
        padding: `${theme.space.xs} ${theme.space.md}`,
        fontSize: theme.font.size.md,
      },
    },
    {
      variants: { variant: 'emphasized', size: 'lg' },
      style: {
        padding: `${theme.space.sm} ${theme.space[4]}`,
        fontSize: theme.font.size.lg,
      },
    },
  ],
  
  defaultVariants: {
    variant: 'default',
    size: 'md',
    disabled: false,
  },
});

// Icon styles within link
export const linkIcon = style({
  flexShrink: 0,
  display: 'inline-flex',
  
  // Size adjustments based on link size
  selectors: {
    [`${link.classNames.variants.size.sm} &`]: {
      width: '14px',
      height: '14px',
    },
    [`${link.classNames.variants.size.md} &`]: {
      width: '16px',
      height: '16px',
    },
    [`${link.classNames.variants.size.lg} &`]: {
      width: '18px',
      height: '18px',
    },
  },
});

// External link indicator styles
export const externalLinkIndicator = style({
  opacity: 0.7,
  
  // Slightly smaller than regular icons
  selectors: {
    [`${link.classNames.variants.size.sm} &`]: {
      width: '12px',
      height: '12px',
    },
    [`${link.classNames.variants.size.md} &`]: {
      width: '14px',
      height: '14px',
    },
    [`${link.classNames.variants.size.lg} &`]: {
      width: '16px',
      height: '16px',
    },
  },
});