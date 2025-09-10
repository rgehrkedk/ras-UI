/**
 * NumberField component styles using vanilla-extract
 */

import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { theme } from "../../styles/theme.css";

// Base number field container styles
const numberFieldContainerBase = style({
  position: "relative",
  display: "flex",
  alignItems: "center",

  // Typography
  fontFamily: theme.font.family.sans,
  fontSize: theme.font.size.md,
  fontWeight: theme.font.weight.regular,
  lineHeight: "1.5",

  // Layout
  width: "auto",
  minWidth: "120px",

  // Border and background
  backgroundColor: theme.color.surface.base,
  border: `1px solid ${theme.color.border.default}`,
  borderRadius: theme.radius.md,

  // Transitions
  "@media": {
    "(prefers-reduced-motion: no-preference)": {
      transition: "all 0.2s ease-in-out",
    },
  },

  // Focus state
  ":focus-within": {
    borderColor: theme.color.border.focus,
    outline: `2px solid ${theme.color.border.focus}`,
    outlineOffset: "0px",
  },

  // Hover state
  ":hover": {
    borderColor: theme.color.border.default,
  },

  // States via data attributes
  selectors: {
    '&[data-disabled="true"]': {
      backgroundColor: theme.color.base.neutral[50],
      borderColor: theme.color.base.neutral[200],
      cursor: "not-allowed",
      opacity: 0.6,
    },
  },
});

// NumberField container recipe with variants
export const numberFieldContainer = recipe({
  base: numberFieldContainerBase,

  variants: {
    size: {
      sm: {
        height: "32px",
        fontSize: theme.font.size.sm,
        paddingLeft: theme.space.xs,
        paddingRight: "32px", // Space for stepper buttons
      },
      md: {
        height: "40px",
        fontSize: theme.font.size.md,
        paddingLeft: theme.space.sm,
        paddingRight: "40px", // Space for stepper buttons
      },
      lg: {
        height: "48px",
        fontSize: theme.font.size.lg,
        paddingLeft: theme.space.md,
        paddingRight: "48px", // Space for stepper buttons
      },
    },
    validation: {
      neutral: {},
      valid: {
        borderColor: theme.color.success,
        ":focus-within": {
          borderColor: theme.color.success,
          outline: `2px solid ${theme.color.success}`,
        },
      },
      invalid: {
        borderColor: theme.color.danger,
        ":focus-within": {
          borderColor: theme.color.danger,
          outline: `2px solid ${theme.color.danger}`,
        },
      },
    },
    fullWidth: {
      true: {
        width: "100%",
      },
    },
    disabled: {
      true: {},
    },
  },

  defaultVariants: {
    size: "md",
    validation: "neutral",
    fullWidth: false,
    disabled: false,
  },
});

// Input field styles
export const numberFieldInput = style({
  // Reset styles
  margin: 0,
  padding: 0,
  border: "none",
  background: "transparent",
  outline: "none",

  // Layout
  flex: 1,
  width: "100%",
  height: "100%",

  // Typography
  fontFamily: "inherit",
  fontSize: "inherit",
  fontWeight: "inherit",
  lineHeight: "inherit",
  color: theme.color.text.primary,

  // Placeholder
  "::placeholder": {
    color: theme.color.text.secondary,
  },

  // Disabled state
  selectors: {
    "&:disabled": {
      color: theme.color.text.secondary,
      cursor: "not-allowed",
    },
  },

  // Remove default number input arrows
  "::-webkit-outer-spin-button": {
    // @ts-expect-error - webkit specific property
    "-webkit-appearance": "none",
    margin: 0,
  },
  "::-webkit-inner-spin-button": {
    // @ts-expect-error - webkit specific property
    "-webkit-appearance": "none",
    margin: 0,
  },
});

// Stepper container
export const numberFieldSteppers = style({
  position: "absolute",
  right: "1px",
  top: "1px",
  bottom: "1px",
  display: "flex",
  flexDirection: "column",
});

// Base stepper button styles
const stepperButtonBase = style({
  // Reset styles
  margin: 0,
  padding: 0,
  border: "none",
  background: "transparent",
  outline: "none",
  cursor: "pointer",

  // Layout
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,

  // Styling
  backgroundColor: theme.color.base.neutral[100],
  color: theme.color.text.secondary,
  borderLeft: `1px solid ${theme.color.border.default}`,

  // Transitions
  "@media": {
    "(prefers-reduced-motion: no-preference)": {
      transition: "all 0.15s ease-in-out",
    },
  },

  // Hover state
  ":hover": {
    backgroundColor: theme.color.interaction.hover,
    color: theme.color.text.primary,
  },

  // Active state
  ":active": {
    backgroundColor: theme.color.interaction.active,
  },

  // Focus state
  ":focus-visible": {
    outline: `2px solid ${theme.color.border.focus}`,
    outlineOffset: "-2px",
  },

  // Disabled state
  selectors: {
    "&:disabled": {
      backgroundColor: theme.color.base.neutral[100],
      color: theme.color.text.secondary,
      cursor: "not-allowed",
      opacity: 0.5,
    },
  },
});

// Stepper button recipe with variants
export const stepperButton = recipe({
  base: stepperButtonBase,

  variants: {
    size: {
      sm: {
        width: "30px",
        fontSize: "12px",
      },
      md: {
        width: "38px",
        fontSize: "14px",
      },
      lg: {
        width: "46px",
        fontSize: "16px",
      },
    },
    position: {
      top: {
        borderTopRightRadius: theme.radius.md,
        borderBottom: `1px solid ${theme.color.border.default}`,
      },
      bottom: {
        borderBottomRightRadius: theme.radius.md,
      },
    },
  },

  defaultVariants: {
    size: "md",
  },
});

// Label styles
export const numberFieldLabel = style({
  fontSize: theme.font.size.sm,
  fontWeight: theme.font.weight.medium,
  color: theme.color.text.primary,
  marginBottom: theme.space.xs,
  lineHeight: "1.4",
});

// Required indicator
export const numberFieldRequired = style({
  color: theme.color.danger,
  marginLeft: "2px",
});

// Helper text styles
export const numberFieldHelperText = style({
  fontSize: theme.font.size.xs,
  color: theme.color.text.secondary,
  marginTop: theme.space.xs,
  lineHeight: "1.4",
});

// Error text styles
export const numberFieldErrorText = style({
  fontSize: theme.font.size.xs,
  color: theme.color.danger,
  marginTop: theme.space.xs,
  lineHeight: "1.4",
});
