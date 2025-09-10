/**
 * Design tokens for ras-UI design system
 *
 * This module exports design tokens in multiple formats:
 * - CSS variables for vanilla-extract styling
 * - TypeScript constants for programmatic access
 * - Theme switching utilities
 */

// Note: Design tokens are available as CSS custom properties
// imported via the CSS file below. For programmatic access,
// import directly from '@ras-ui/tokens/dist/tokens'

// CSS import for global token variables
import "./tokens.css";
import "./brands.css";

/**
 * Theme utilities for runtime theme switching
 */
export type Theme = "light" | "dark" | "hc-light" | "hc-dark";
export type Brand = "default" | "vibrant" | "corporate";

export const themes = {
  light: "light",
  dark: "dark",
  "hc-light": "hc-light",
  "hc-dark": "hc-dark",
} as const;

export const brands = {
  default: "default",
  vibrant: "vibrant",
  corporate: "corporate",
} as const;

/**
 * Apply theme to document root
 * @param theme - Theme to apply
 */
export function setTheme(theme: Theme): void {
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-theme", theme);
  }
}

/**
 * Apply brand to document root
 * @param brand - Brand to apply
 */
export function setBrand(brand: Brand): void {
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-brand", brand);
  }
}

/**
 * Get current theme from document
 * @returns Current theme or 'light' as default
 */
export function getCurrentTheme(): Theme {
  if (typeof document !== "undefined") {
    const theme = document.documentElement.getAttribute("data-theme");
    if (theme && Object.values(themes).includes(theme as Theme)) {
      return theme as Theme;
    }
  }
  return "light";
}

/**
 * Get current brand from document
 * @returns Current brand or 'default' as default
 */
export function getCurrentBrand(): Brand {
  if (typeof document !== "undefined") {
    const brand = document.documentElement.getAttribute("data-brand");
    if (brand && Object.values(brands).includes(brand as Brand)) {
      return brand as Brand;
    }
  }
  return "default";
}

/**
 * Detect user's preferred color scheme
 * @returns 'dark' if user prefers dark mode, 'light' otherwise
 */
export function getPreferredTheme(): "light" | "dark" {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return "light";
}

/**
 * Listen to system color scheme changes
 * @param callback - Function to call when scheme changes
 * @returns Cleanup function to remove listener
 */
export function watchPreferredTheme(
  callback: (theme: "light" | "dark") => void,
): () => void {
  if (typeof window !== "undefined" && window.matchMedia) {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      callback(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }

  return () => {}; // No-op cleanup for SSR
}
