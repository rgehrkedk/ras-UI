/**
 * EXAMPLE: Alert component CSS using new semantic tokens
 * This demonstrates the improved developer experience with semantic token names
 */

import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { theme } from '../../styles/theme.css';

// ✅ AFTER: Beautiful semantic token usage
export const alertEnhanced = recipe({
  base: {
    // Layout with semantic spacing
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.space.sm,        // 🎯 Clear intent: small gap between icon and content
    padding: theme.space.lg,    // 🎯 Clear intent: large comfortable padding
    borderRadius: theme.radius.md,
    
    // Floating UI elevation
    boxShadow: theme.elevation.sm,  // 🎯 Clear intent: subtle lift above surface
    
    // Transitions
    transition: `all ${theme.animation.duration.fast} ${theme.animation.easing['ease-out']}`,
    
    // Typography
    fontFamily: theme.font.family.sans,
    lineHeight: 1.5,
  },
  
  variants: {
    variant: {
      info: {
        backgroundColor: theme.color.base.brand[50],
        color: theme.color.base.brand[900],
        borderLeft: `${theme.space.xs} solid ${theme.color.base.brand[500]}`, // xs = 4px border
      },
      success: {
        backgroundColor: theme.color.base.success[50],
        color: theme.color.base.success[900],
        borderLeft: `${theme.space.xs} solid ${theme.color.base.success[500]}`,
      },
      warning: {
        backgroundColor: theme.color.base.warning[50],
        color: theme.color.base.warning[900],
        borderLeft: `${theme.space.xs} solid ${theme.color.base.warning[500]}`,
      },
      error: {
        backgroundColor: theme.color.base.danger[50],
        color: theme.color.base.danger[900],
        borderLeft: `${theme.space.xs} solid ${theme.color.base.danger[500]}`,
      },
    },
    
    size: {
      sm: {
        padding: theme.space.sm,    // 🎯 Small: compact padding
        gap: theme.space.xs,        // 🎯 Small: tight gap
        fontSize: theme.font.size.sm,
      },
      md: {
        padding: theme.space.lg,    // 🎯 Medium: comfortable padding
        gap: theme.space.sm,        // 🎯 Medium: balanced gap
        fontSize: theme.font.size.md,
      },
      lg: {
        padding: theme.space.xl,    // 🎯 Large: spacious padding
        gap: theme.space.md,        // 🎯 Large: generous gap
        fontSize: theme.font.size.lg,
      },
    },
  },
  
  defaultVariants: {
    variant: 'info',
    size: 'md',
  },
});

export const alertIconEnhanced = recipe({
  base: {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  variants: {
    size: {
      sm: {
        width: theme.icon.size.sm,     // 🎯 Semantic icon sizing
        height: theme.icon.size.sm,
      },
      md: {
        width: theme.icon.size.md,     // 🎯 No more magic numbers!
        height: theme.icon.size.md,
      },
      lg: {
        width: theme.icon.size.lg,     // 🎯 Clear size relationships
        height: theme.icon.size.lg,
      },
    },
  },
  
  defaultVariants: {
    size: 'md',
  },
});

export const alertContentEnhanced = style({
  flex: 1,
  minWidth: 0, // Allow text wrapping
});

export const alertTitleEnhanced = recipe({
  base: {
    fontWeight: theme.font.weight.semibold,
    marginBottom: theme.space.xs,     // 🎯 Small space below title
    lineHeight: 1.4,
  },
  
  variants: {
    size: {
      sm: {
        fontSize: theme.font.size.sm,
        marginBottom: theme.space.xs,  // 🎯 Consistent small spacing
      },
      md: {
        fontSize: theme.font.size.md,
        marginBottom: theme.space.xs,  // 🎯 Same logical spacing
      },
      lg: {
        fontSize: theme.font.size.lg,
        marginBottom: theme.space.sm,  // 🎯 Slightly more for larger text
      },
    },
  },
  
  defaultVariants: {
    size: 'md',
  },
});

export const alertDescriptionEnhanced = recipe({
  base: {
    lineHeight: 1.5,
  },
  
  variants: {
    size: {
      sm: { fontSize: theme.font.size.sm },
      md: { fontSize: theme.font.size.md },
      lg: { fontSize: theme.font.size.lg },
    },
  },
  
  defaultVariants: {
    size: 'md',
  },
});

export const alertCloseButtonEnhanced = recipe({
  base: {
    // Layout
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
    // Styling
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: theme.radius.sm,
    cursor: 'pointer',
    
    // Interactive states
    transition: `all ${theme.animation.duration.fast} ${theme.animation.easing['ease-in-out']}`,
    
    selectors: {
      '&:hover': {
        backgroundColor: theme.color.base.neutral[100],
      },
      '&:focus-visible': {
        outline: `2px solid ${theme.color.border.focus}`,
        outlineOffset: '1px',
      },
    },
  },
  
  variants: {
    size: {
      sm: {
        top: theme.space.xs,        // 🎯 Small offset from edge
        right: theme.space.xs,
        padding: theme.space.xs,    // 🎯 Tight padding for small
        width: theme.icon.close.sm, // 🎯 Dedicated close icon sizing
        height: theme.icon.close.sm,
      },
      md: {
        top: theme.space.sm,        // 🎯 Medium offset
        right: theme.space.sm,
        padding: theme.space.xs,    // 🎯 Consistent inner padding
        width: theme.icon.close.md,
        height: theme.icon.close.md,
      },
      lg: {
        top: theme.space.md,        // 🎯 Large offset
        right: theme.space.md,
        padding: theme.space.xs,    // 🎯 Same inner padding
        width: theme.icon.close.lg,
        height: theme.icon.close.lg,
      },
    },
  },
  
  defaultVariants: {
    size: 'md',
  },
});

export const alertActionsEnhanced = style({
  display: 'flex',
  gap: theme.space.xs,              // 🎯 Small gap between action buttons
  marginTop: theme.space.sm,        // 🎯 Medium space above actions
  alignItems: 'center',
});

/**
 * COMPARISON: Before vs After Developer Experience
 * 
 * BEFORE (awkward):
 * padding: theme.space[4]              ❌ What size is '4'?
 * gap: theme.space.xs                  ❌ Requires quotes and brackets
 * boxShadow: theme.elevation.sm        ❌ What's the visual weight?
 * marginTop: theme.space.sm            ❌ Magic numbers everywhere
 * 
 * AFTER (semantic):
 * padding: theme.space.lg                ✅ Large, comfortable padding
 * gap: theme.space.xs                    ✅ Extra small gap
 * boxShadow: theme.elevation.sm          ✅ Subtle elevation
 * marginTop: theme.space.sm              ✅ Small top margin
 * 
 * BENEFITS:
 * ✅ Self-documenting code
 * ✅ Better TypeScript autocomplete
 * ✅ Easier to understand design intent
 * ✅ Consistent with industry standards (Tailwind, Chakra UI)
 * ✅ No more guessing what numeric values mean
 * ✅ Clear semantic hierarchy (xs < sm < md < lg < xl)
 */