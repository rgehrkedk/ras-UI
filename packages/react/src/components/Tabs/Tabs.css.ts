/**
 * Tabs component styles using vanilla-extract
 */

import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { theme } from '../../styles/theme.css';

// Base styles for the tabs container
export const tabsBase = style({
  // Layout
  display: 'flex',
  
  // Reset browser defaults
  margin: 0,
  padding: 0,
  border: 'none',
  background: 'none',
  
  // Box model
  boxSizing: 'border-box',
});

// Tabs container recipe with orientation and size variants
export const tabs = recipe({
  base: tabsBase,
  
  variants: {
    orientation: {
      horizontal: {
        flexDirection: 'column',
        width: '100%',
      },
      vertical: {
        flexDirection: 'row',
        height: '100%',
      },
    },
    
    size: {
      sm: {
        fontSize: theme.font.size.sm,
      },
      md: {
        fontSize: theme.font.size.md,
      },
      lg: {
        fontSize: theme.font.size.lg,
      },
    },
  },
  
  defaultVariants: {
    orientation: 'horizontal',
    size: 'md',
  },
});

// Tab list styles
export const tabListBase = style({
  // Reset browser defaults
  margin: 0,
  padding: 0,
  listStyle: 'none',
  border: 'none',
  background: 'none',
  
  // Layout
  display: 'flex',
  
  // Accessibility
  outline: 'none',
  
  // Box model
  boxSizing: 'border-box',
});

export const tabList = style([
  tabListBase,
  {
    // Dynamic styles based on parent tabs orientation
    selectors: {
      [`${tabs.classNames.variants.orientation.horizontal} &`]: {
        flexDirection: 'row',
        borderBottom: `1px solid ${theme.color.border.default}`,
        marginBottom: theme.space.md,
      },
      [`${tabs.classNames.variants.orientation.vertical} &`]: {
        flexDirection: 'column',
        borderRight: `1px solid ${theme.color.border.default}`,
        marginRight: theme.space.md,
        minWidth: '200px',
      },
    },
  },
]);

// Individual tab styles
export const tabBase = style({
  // Reset browser defaults
  margin: 0,
  padding: 0,
  border: 'none',
  background: 'none',
  
  // Typography
  fontFamily: theme.font.family.sans,
  fontWeight: theme.font.weight.medium,
  lineHeight: 1.5,
  color: theme.color.text.secondary,
  textAlign: 'left',
  textDecoration: 'none',
  
  // Layout
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  
  // Interaction
  cursor: 'pointer',
  userSelect: 'none',
  position: 'relative',
  
  // Accessibility
  outline: 'none',
  
  // Box model
  boxSizing: 'border-box',
  
  // Transitions
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      transition: 'all 0.2s ease-in-out',
    },
  },
  
  // Focus styles
  ':focus-visible': {
    outline: `2px solid ${theme.color.border.focus}`,
    outlineOffset: '2px',
    zIndex: 1,
  },
  
  // Hover states
  ':hover': {
    color: theme.color.text.primary,
    backgroundColor: theme.color.interaction.hover,
  },
  
  // Disabled state
  ':disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
    color: theme.color.text.secondary,
  },
  
  // React Aria state selectors
  selectors: {
    '&[data-selected="true"]': {
      color: theme.color.brand.primary,
      backgroundColor: 'transparent',
    },
    
    '&[data-pressed="true"]': {
      transform: 'scale(0.98)',
    },
    
    '&[data-disabled="true"]': {
      cursor: 'not-allowed',
      opacity: 0.5,
      color: theme.color.text.secondary,
    },
    
    '&[data-disabled="true"]:hover': {
      backgroundColor: 'transparent',
      color: theme.color.text.secondary,
    },
  },
});

export const tab = style([
  tabBase,
  {
    // Dynamic styles based on parent tabs
    selectors: {
      // Horizontal tabs styling
      [`${tabs.classNames.variants.orientation.horizontal} ${tabList} &`]: {
        borderBottom: '2px solid transparent',
        paddingBottom: theme.space.sm,
        marginBottom: '-1px', // Overlap border
      },
      
      [`${tabs.classNames.variants.orientation.horizontal} ${tabList} &[data-selected="true"]`]: {
        borderBottomColor: theme.color.brand.primary,
      },
      
      // Vertical tabs styling
      [`${tabs.classNames.variants.orientation.vertical} ${tabList} &`]: {
        justifyContent: 'flex-start',
        borderRight: '2px solid transparent',
        paddingRight: theme.space.sm,
        marginRight: '-1px', // Overlap border
        width: '100%',
      },
      
      [`${tabs.classNames.variants.orientation.vertical} ${tabList} &[data-selected="true"]`]: {
        borderRightColor: theme.color.brand.primary,
      },
      
      // Size variants
      [`${tabs.classNames.variants.size.sm} ${tabList} &`]: {
        padding: `${theme.space.xs} ${theme.space.sm}`,
        fontSize: theme.font.size.sm,
        minHeight: '32px',
      },
      
      [`${tabs.classNames.variants.size.md} ${tabList} &`]: {
        padding: `${theme.space.sm} ${theme.space[4]}`,
        fontSize: theme.font.size.md,
        minHeight: '40px',
      },
      
      [`${tabs.classNames.variants.size.lg} ${tabList} &`]: {
        padding: `${theme.space[4]} ${theme.space.md}`,
        fontSize: theme.font.size.lg,
        minHeight: '48px',
      },
    },
  },
]);

// Tab panel styles
export const tabPanelBase = style({
  // Reset browser defaults
  margin: 0,
  padding: 0,
  border: 'none',
  background: 'none',
  
  // Layout
  flex: 1,
  
  // Accessibility
  outline: 'none',
  
  // Box model
  boxSizing: 'border-box',
  
  // Focus management
  ':focus': {
    outline: 'none', // Focus is handled by keyboard navigation on tabs
  },
  
  // Animation for panel transitions
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      // Subtle fade-in animation for panel content
      selectors: {
        '&[data-entering="true"]': {
          animation: 'fadeIn 0.2s ease-in-out',
        },
      },
    },
  },
});

export const tabPanel = style([
  tabPanelBase,
  {
    display: 'block',
  },
]);