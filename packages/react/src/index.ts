/**
 * @ras-ui/react - React components for ras-UI design system
 *
 * This package provides accessible, performant React components
 * built with vanilla-extract and React Aria Components
 */

// Import tokens CSS for styling
import "@ras-ui/tokens";

// Export styling system
export { theme } from "./styles/theme.css";
export type { Theme } from "./styles/theme.css";
export {
  surface,
  text,
  focusRing,
  sizeVariants,
  container,
  responsive,
} from "./styles/recipes.css";
export { sprinkles } from "./styles/sprinkles.css";
export type { Sprinkles } from "./styles/sprinkles.css";

// Export utilities
export { cn } from "./utils/cn";
export {
  setTheme,
  getCurrentTheme,
  getPreferredTheme,
  watchPreferredTheme,
  toggleTheme,
  prefersReducedMotion,
  themes,
} from "./utils/theme";
export type { Theme as ThemeVariant } from "./utils/theme";

// Export shared types
export * from "./types";

// Export hooks
export * from "./hooks";

// Export icon utilities
export * from "./utils/icons";

// Export components
export * from "./components";

// Export Redux store and state management
export { store, persistor } from "./store";
export type { RootState, AppDispatch } from "./store";
export { useAppDispatch, useAppSelector } from "./store";
export { default as StoreProvider } from "./store/StoreProvider";
export * from "./store/hooks";
export * from "./store/slices/themeSlice";
export * from "./store/slices/userPreferencesSlice";
