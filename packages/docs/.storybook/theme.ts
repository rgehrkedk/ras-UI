import { create } from "@storybook/theming";

export const lightTheme = create({
  base: "light",

  // Brand
  brandTitle: "ras-UI Design System",
  brandUrl: "/",
  brandTarget: "_self",

  // Colors
  colorPrimary: "#2563eb",
  colorSecondary: "#60a5fa",

  // UI colors
  appBg: "#f9fafb",
  appContentBg: "#ffffff",
  appPreviewBg: "#ffffff",
  appBorderColor: "#e5e7eb",
  appBorderRadius: 8,

  // Text colors
  textColor: "#111827",
  textInverseColor: "#ffffff",
  textMutedColor: "#6b7280",

  // Toolbar colors
  barTextColor: "#6b7280",
  barSelectedColor: "#2563eb",
  barHoverColor: "#2563eb",
  barBg: "#ffffff",

  // Form colors
  inputBg: "#ffffff",
  inputBorder: "#e5e7eb",
  inputTextColor: "#111827",
  inputBorderRadius: 8,

  // Other
  fontBase:
    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontCode:
    '"JetBrains Mono", "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
});

export const darkTheme = create({
  base: "dark",

  // Brand
  brandTitle: "ras-UI Design System",
  brandUrl: "/",
  brandTarget: "_self",

  // Colors
  colorPrimary: "#60a5fa",
  colorSecondary: "#93c5fd",

  // UI colors
  appBg: "#111827",
  appContentBg: "#1f2937",
  appPreviewBg: "#111827",
  appBorderColor: "#374151",
  appBorderRadius: 8,

  // Text colors
  textColor: "#f3f4f6",
  textInverseColor: "#111827",
  textMutedColor: "#9ca3af",

  // Toolbar colors
  barTextColor: "#9ca3af",
  barSelectedColor: "#60a5fa",
  barHoverColor: "#60a5fa",
  barBg: "#1f2937",

  // Form colors
  inputBg: "#1f2937",
  inputBorder: "#374151",
  inputTextColor: "#f3f4f6",
  inputBorderRadius: 8,

  // Other
  fontBase:
    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontCode:
    '"JetBrains Mono", "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
});
