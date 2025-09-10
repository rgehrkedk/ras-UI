/**
 * Theme utilities for runtime theme management
 */

export type Theme = "light" | "dark" | "hc-light" | "hc-dark";

export const themes = {
  light: "light",
  dark: "dark",
  "hc-light": "hc-light",
  "hc-dark": "hc-dark",
} as const;

/**
 * Apply theme to document root or specific element
 * @param theme - Theme to apply
 * @param element - Element to apply theme to (defaults to document.documentElement)
 */
export function setTheme(theme: Theme, element?: HTMLElement): void {
  const target =
    element ||
    (typeof document !== "undefined" ? document.documentElement : null);
  if (target) {
    target.setAttribute("data-theme", theme);
  }
}

/**
 * Get current theme from element or document
 * @param element - Element to get theme from (defaults to document.documentElement)
 * @returns Current theme or 'light' as default
 */
export function getCurrentTheme(element?: HTMLElement): Theme {
  const target =
    element ||
    (typeof document !== "undefined" ? document.documentElement : null);
  if (target) {
    const theme = target.getAttribute("data-theme");
    if (theme && Object.values(themes).includes(theme as Theme)) {
      return theme as Theme;
    }
  }
  return "light";
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

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  return false;
}

/**
 * Toggle between light and dark themes
 * @param currentTheme - Current theme
 * @returns New theme
 */
export function toggleTheme(currentTheme: Theme): Theme {
  switch (currentTheme) {
    case "light":
      return "dark";
    case "dark":
      return "light";
    case "hc-light":
      return "hc-dark";
    case "hc-dark":
      return "hc-light";
    default:
      return "light";
  }
}
