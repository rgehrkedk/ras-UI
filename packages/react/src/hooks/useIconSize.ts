/**
 * Hook for standardizing icon sizes across components
 * Centralizes icon sizing logic and provides consistent scaling
 */

import { useMemo } from "react";

import type { ComponentSize } from "../types";

export interface UseIconSizeOptions {
  /** Size variant to get icon size for */
  size: ComponentSize;
  /** Custom size mapping override */
  customSizes?: Partial<Record<ComponentSize, number>>;
}

export interface IconSizeMap {
  sm: number;
  md: number;
  lg: number;
}

/** Default icon size mapping */
const DEFAULT_ICON_SIZES: IconSizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
} as const;

/** Icon sizes for close/dismiss buttons (typically smaller) */
const CLOSE_ICON_SIZES: IconSizeMap = {
  sm: 14,
  md: 16,
  lg: 18,
} as const;

/** Icon sizes for large decorative icons */
const LARGE_ICON_SIZES: IconSizeMap = {
  sm: 20,
  md: 24,
  lg: 32,
} as const;

/**
 * Hook that returns appropriate icon size for a given component size
 *
 * @param size Component size variant
 * @param customSizes Optional custom size mapping
 * @returns Icon size in pixels
 *
 * @example
 * ```tsx
 * const iconSize = useIconSize({ size: 'md' });
 *
 * return <InfoIcon width={iconSize} height={iconSize} />;
 * ```
 */
export function useIconSize({ size, customSizes }: UseIconSizeOptions): number {
  return useMemo(() => {
    const sizeMap = { ...DEFAULT_ICON_SIZES, ...customSizes };
    return sizeMap[size] || DEFAULT_ICON_SIZES.md;
  }, [size, customSizes]);
}

/**
 * Simplified hook for default icon sizes
 *
 * @param size Component size variant
 * @returns Icon size in pixels
 */
export function useIconSizeSimple(size: ComponentSize): number {
  return useIconSize({ size });
}

/**
 * Hook for close/dismiss button icon sizes (smaller than default)
 *
 * @param size Component size variant
 * @returns Smaller icon size appropriate for close buttons
 */
export function useCloseIconSize(size: ComponentSize): number {
  return useIconSize({ size, customSizes: CLOSE_ICON_SIZES });
}

/**
 * Hook for large decorative icon sizes
 *
 * @param size Component size variant
 * @returns Larger icon size for decorative purposes
 */
export function useLargeIconSize(size: ComponentSize): number {
  return useIconSize({ size, customSizes: LARGE_ICON_SIZES });
}

/**
 * Get all icon size variants for a component
 * Useful for responsive icons or size variants
 *
 * @param customSizes Optional custom size mapping
 * @returns Object with all size variants
 */
export function useIconSizes(customSizes?: Partial<IconSizeMap>): IconSizeMap {
  return useMemo(
    () => ({
      ...DEFAULT_ICON_SIZES,
      ...customSizes,
    }),
    [customSizes],
  );
}
