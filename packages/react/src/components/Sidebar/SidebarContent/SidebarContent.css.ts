import { style, globalStyle } from "@vanilla-extract/css";

import { theme } from "../../../styles/theme.css";
import {
  sidebarItemText,
  sidebarItemBadge,
} from "../SidebarItem/SidebarItem.css";

// Sidebar content (scrollable area)
export const sidebarContent = style({
  flex: 1,
  overflowY: "auto",
  overflowX: "hidden",
  padding: theme.space.sm,
});

// Reset list styles for sidebar menu
globalStyle(`${sidebarContent} ul[role="menu"]`, {
  margin: 0,
  padding: 0,
  paddingInlineStart: 0,
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: theme.space.xs, // Add gap between menu items
});

// Collapsed sidebar styles - hide text and badges
globalStyle(`aside[data-collapsed="true"] .${sidebarItemText}`, {
  display: "none",
});

globalStyle(`aside[data-collapsed="true"] .${sidebarItemBadge}`, {
  display: "none",
});

// Center sidebar items when collapsed
globalStyle(
  `aside[data-collapsed="true"] button, aside[data-collapsed="true"] a`,
  {
    justifyContent: "center",
    padding: `${theme.space.sm} 0`,
  },
);
