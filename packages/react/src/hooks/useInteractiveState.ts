/**
 * Hook for managing common interactive states (hover, focus, press)
 * Centralizes repetitive state management across components
 */

import { useState, useCallback } from "react";

export interface InteractiveState {
  isHovered: boolean;
  isFocused: boolean;
  isPressed: boolean;
}

export interface UseInteractiveStateResult {
  isHovered: boolean;
  isFocused: boolean;
  isPressed: boolean;
  interactiveProps: {
    onHoverStart: () => void;
    onHoverEnd: () => void;
    onFocusChange: (isFocused: boolean) => void;
    onPressStart: () => void;
    onPressEnd: () => void;
  };
  interactiveState: InteractiveState;
}

/**
 * Centralized hook for managing interactive component states
 *
 * @example
 * ```tsx
 * const { isHovered, isFocused, interactiveProps } = useInteractiveState();
 *
 * return (
 *   <button
 *     {...interactiveProps}
 *     data-hovered={isHovered}
 *     data-focused={isFocused}
 *   >
 *     Button content
 *   </button>
 * );
 * ```
 */
export function useInteractiveState(): UseInteractiveStateResult {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleHoverStart = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleHoverEnd = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleFocusChange = useCallback((focused: boolean) => {
    setIsFocused(focused);
  }, []);

  const handlePressStart = useCallback(() => {
    setIsPressed(true);
  }, []);

  const handlePressEnd = useCallback(() => {
    setIsPressed(false);
  }, []);

  const interactiveProps = {
    onHoverStart: handleHoverStart,
    onHoverEnd: handleHoverEnd,
    onFocusChange: handleFocusChange,
    onPressStart: handlePressStart,
    onPressEnd: handlePressEnd,
  };

  const interactiveState: InteractiveState = {
    isHovered,
    isFocused,
    isPressed,
  };

  return {
    isHovered,
    isFocused,
    isPressed,
    interactiveProps,
    interactiveState,
  };
}
