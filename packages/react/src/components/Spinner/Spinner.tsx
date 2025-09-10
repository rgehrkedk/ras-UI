/**
 * Reusable loading spinner component
 */

import React from "react";

import { cn } from "../../utils/cn";

import { spinnerRecipe } from "./Spinner.css";

export interface SpinnerProps {
  /**
   * Spinner size
   * @default 'md'
   */
  size?: "sm" | "md" | "lg";

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Accessible label for screen readers
   * @default 'Loading'
   */
  "aria-label"?: string;
}

/**
 * Loading spinner component with consistent styling
 *
 * @example
 * ```tsx
 * <Spinner size="md" aria-label="Loading content" />
 * ```
 */
export const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  className,
  "aria-label": ariaLabel = "Loading",
}) => {
  return (
    <span
      className={cn(spinnerRecipe({ size }), className)}
      role="status"
      aria-label={ariaLabel}
      aria-hidden="true"
    />
  );
};
