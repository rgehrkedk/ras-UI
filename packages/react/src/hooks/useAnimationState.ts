/**
 * Hook for managing component animation states
 * Handles exit animations with proper timing and cleanup
 */

import { useState, useCallback } from "react";

export interface UseAnimationStateOptions {
  /** Duration of exit animation in milliseconds */
  exitDuration?: number;
  /** Callback when animation completes and component should be removed */
  onComplete?: () => void;
}

export interface UseAnimationStateResult {
  /** Whether the component is currently animating (exiting) */
  isAnimating: boolean;
  /** Whether the component should be visible */
  isVisible: boolean;
  /** Start the exit animation */
  startExit: () => void;
  /** Reset to initial state */
  reset: () => void;
  /** Props to spread on animated element */
  animationProps: {
    "data-exiting": boolean;
  };
}

/**
 * Hook for managing component animations, particularly exit animations
 * Provides coordinated timing between CSS animations and React state
 *
 * @param options Configuration for animation timing and completion callback
 *
 * @example
 * ```tsx
 * const { isVisible, startExit, animationProps } = useAnimationState({
 *   exitDuration: 250,
 *   onComplete: () => onDismiss?.()
 * });
 *
 * const handleDismiss = () => {
 *   startExit();
 * };
 *
 * if (!isVisible) return null;
 *
 * return (
 *   <div {...animationProps} className={alertClass}>
 *     Alert content
 *   </div>
 * );
 * ```
 */
export function useAnimationState({
  exitDuration = 250,
  onComplete,
}: UseAnimationStateOptions = {}): UseAnimationStateResult {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const startExit = useCallback(() => {
    // Start the exit animation
    setIsAnimating(true);

    // After animation completes, hide component and call completion callback
    setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, exitDuration);
  }, [exitDuration, onComplete]);

  const reset = useCallback(() => {
    setIsAnimating(false);
    setIsVisible(true);
  }, []);

  const animationProps = {
    "data-exiting": isAnimating,
  };

  return {
    isAnimating,
    isVisible,
    startExit,
    reset,
    animationProps,
  };
}

/**
 * Simplified hook for basic show/hide animations
 *
 * @param onHide Callback when component should be hidden
 * @param duration Animation duration in milliseconds
 *
 * @example
 * ```tsx
 * const { isVisible, hide } = useShowHide(onDismiss);
 *
 * if (!isVisible) return null;
 *
 * return (
 *   <div>
 *     <button onClick={hide}>Close</button>
 *   </div>
 * );
 * ```
 */
export function useShowHide(onHide?: () => void, duration: number = 250) {
  const { isVisible, startExit } = useAnimationState({
    exitDuration: duration,
    onComplete: onHide,
  });

  return {
    isVisible,
    hide: startExit,
  };
}
