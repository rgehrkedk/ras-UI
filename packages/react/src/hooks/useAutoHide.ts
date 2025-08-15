/**
 * Hook for auto-hiding/dismissing components after a specified duration
 * Centralizes auto-dismiss logic used in Alert, Toast, and similar components
 */

import { useEffect, useCallback } from 'react';

export interface UseAutoHideOptions {
  /** Duration in milliseconds before auto-hide triggers */
  duration?: number;
  /** Whether auto-hide is enabled */
  enabled?: boolean;
  /** Callback function to execute when auto-hide triggers */
  onAutoHide: () => void;
}

/**
 * Hook that automatically triggers a callback after a specified duration
 * Commonly used for auto-dismissing alerts, toasts, and notifications
 * 
 * @param options Configuration object with duration, enabled state, and callback
 * 
 * @example
 * ```tsx
 * const [isVisible, setIsVisible] = useState(true);
 * 
 * useAutoHide({
 *   duration: 5000, // 5 seconds
 *   enabled: isVisible && autoHideDuration > 0,
 *   onAutoHide: () => setIsVisible(false)
 * });
 * ```
 */
export function useAutoHide({ 
  duration, 
  enabled = true, 
  onAutoHide 
}: UseAutoHideOptions): void {
  const handleAutoHide = useCallback(() => {
    onAutoHide();
  }, [onAutoHide]);

  useEffect(() => {
    // Don't set timer if disabled, no duration, or invalid duration
    if (!enabled || !duration || duration <= 0) {
      return;
    }

    const timer = setTimeout(handleAutoHide, duration);

    // Cleanup timer on unmount or dependency change
    return () => {
      clearTimeout(timer);
    };
  }, [handleAutoHide, duration, enabled]);
}

/**
 * Simplified version for common use cases
 * 
 * @param callback Function to call after duration
 * @param duration Milliseconds to wait before calling callback
 * @param enabled Whether the auto-hide is active
 * 
 * @example
 * ```tsx
 * useAutoHideSimple(
 *   () => handleDismiss(),
 *   autoHideDuration,
 *   isVisible
 * );
 * ```
 */
export function useAutoHideSimple(
  callback: () => void,
  duration?: number,
  enabled: boolean = true
): void {
  useAutoHide({
    duration,
    enabled,
    onAutoHide: callback,
  });
}