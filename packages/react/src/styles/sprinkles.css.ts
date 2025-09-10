/**
 * Sprinkles system for atomic CSS utilities
 */

import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";

import { theme } from "./theme.css";

// Define atomic properties
const spaceProperties = defineProperties({
  properties: {
    margin: theme.space,
    marginTop: theme.space,
    marginBottom: theme.space,
    marginLeft: theme.space,
    marginRight: theme.space,
    padding: theme.space,
    paddingTop: theme.space,
    paddingBottom: theme.space,
    paddingLeft: theme.space,
    paddingRight: theme.space,
    gap: theme.space,
  },
  shorthands: {
    m: ["margin"],
    mt: ["marginTop"],
    mb: ["marginBottom"],
    ml: ["marginLeft"],
    mr: ["marginRight"],
    mx: ["marginLeft", "marginRight"],
    my: ["marginTop", "marginBottom"],
    p: ["padding"],
    pt: ["paddingTop"],
    pb: ["paddingBottom"],
    pl: ["paddingLeft"],
    pr: ["paddingRight"],
    px: ["paddingLeft", "paddingRight"],
    py: ["paddingTop", "paddingBottom"],
  },
});

const colorProperties = defineProperties({
  properties: {
    color: {
      primary: theme.color.text.primary,
      secondary: theme.color.text.secondary,
      onBrand: theme.color.text.onBrand,
      danger: theme.color.danger,
    },
    backgroundColor: {
      base: theme.color.surface.base,
      raised: theme.color.surface.raised,
      float: theme.color.surface.float,
      brand: theme.color.brand.primary,
      danger: theme.color.danger,
    },
    borderColor: {
      default: theme.color.border.default,
      focus: theme.color.border.focus,
      danger: theme.color.danger,
    },
  },
});

const layoutProperties = defineProperties({
  properties: {
    display: [
      "none",
      "block",
      "inline",
      "inline-block",
      "flex",
      "inline-flex",
      "grid",
    ],
    flexDirection: ["row", "column"],
    justifyContent: [
      "flex-start",
      "center",
      "flex-end",
      "space-between",
      "space-around",
    ],
    alignItems: ["flex-start", "center", "flex-end", "stretch"],
    borderRadius: theme.radius,
    position: ["static", "relative", "absolute", "fixed", "sticky"],
    overflow: ["visible", "hidden", "scroll", "auto"],
  },
  shorthands: {
    rounded: ["borderRadius"],
  },
});

const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: { "@container": "(min-width: 480px)" },
    desktop: { "@container": "(min-width: 800px)" },
  },
  defaultCondition: "mobile",
  properties: {
    display: ["none", "block", "flex", "grid"],
    flexDirection: ["row", "column"],
    justifyContent: ["flex-start", "center", "flex-end", "space-between"],
    alignItems: ["flex-start", "center", "flex-end"],
    padding: theme.space,
    margin: theme.space,
    fontSize: theme.font.size,
  },
});

// Create the sprinkles function
export const sprinkles = createSprinkles(
  spaceProperties,
  colorProperties,
  layoutProperties,
  responsiveProperties,
);

export type Sprinkles = Parameters<typeof sprinkles>[0];
