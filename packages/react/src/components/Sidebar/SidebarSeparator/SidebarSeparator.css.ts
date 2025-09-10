import { style } from "@vanilla-extract/css";

import { theme } from "../../../styles/theme.css";

// Separator
export const sidebarSeparator = style({
  border: "none",
  height: "1px",
  backgroundColor: theme.color.border.default,
  margin: `${theme.space.sm} 0`,
});
