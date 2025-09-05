import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { theme } from '../../styles/theme.css';

// Root layout container
export const layout = style({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  backgroundColor: theme.color.surface.base,
});

// Layout header
export const layoutHeader = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '64px',
    padding: `0 ${theme.space.lg}`,
    backgroundColor: theme.color.surface.raised,
    borderBottom: `1px solid ${theme.color.border.default}`,
    zIndex: 10,
  },
  variants: {
    sticky: {
      true: {
        position: 'sticky',
        top: 0,
      },
      false: {
        position: 'relative',
      },
    },
  },
  defaultVariants: {
    sticky: true,
  },
});

// Layout body (sidebar + main content) - adjusted for floating sidebar
export const layoutBody = style({
  position: 'relative',
  display: 'flex',
  flex: 1,
  overflow: 'hidden',
});

// Main content area
export const layoutMain = recipe({
  base: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    backgroundColor: theme.color.surface.base,
  },
  variants: {
    padded: {
      true: {
        padding: theme.space.lg,
      },
      false: {
        padding: 0,
      },
    },
  },
  defaultVariants: {
    padded: true,
  },
});

// Content container with max-width
export const layoutContent = recipe({
  base: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  variants: {
    maxWidth: {
      sm: {
        maxWidth: '640px',
      },
      md: {
        maxWidth: '768px',
      },
      lg: {
        maxWidth: '1024px',
      },
      xl: {
        maxWidth: '1280px',
      },
      full: {
        maxWidth: '100%',
      },
    },
  },
  defaultVariants: {
    maxWidth: 'xl',
  },
});

// Layout footer
export const layoutFooter = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.space.lg,
  backgroundColor: theme.color.surface.raised,
  borderTop: `1px solid ${theme.color.border.default}`,
  fontSize: theme.font.size.sm,
  color: theme.color.text.secondary,
});