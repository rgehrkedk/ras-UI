/**
 * EXAMPLE: Alert component using new centralized hooks and design tokens
 * This demonstrates how the Alert component could be refactored to use:
 * - useAutoHide hook for auto-dismiss logic
 * - useAnimationState hook for exit animations
 * - useIconSize hook for consistent icon sizing
 * - New design tokens for animations and sizing
 */

import {
  InfoCircle,
  CheckCircle,
  WarningTriangle,
  XmarkCircle,
  Xmark,
} from "iconoir-react";
import React from "react";

import {
  useAutoHide,
  useAnimationState,
  useIconSize,
  useCloseIconSize,
} from "../../hooks";
import type {
  ComponentSize,
  BaseComponentProps,
  ComponentChildren,
  CloseHandler,
  AlertType,
} from "../../types";
import { cn } from "../../utils/cn";

// Using the new centralized hooks

import {
  alert,
  alertIcon,
  alertContent,
  alertTitle,
  alertDescription,
  alertCloseButton,
  alertActions,
} from "./Alert.css";

export interface EnhancedAlertProps extends BaseComponentProps {
  variant?: AlertType;
  size?: ComponentSize;
  title?: ComponentChildren;
  children?: ComponentChildren;
  dismissible?: boolean;
  onDismiss?: CloseHandler;
  icon?: React.ReactNode;
  hideIcon?: boolean;
  actions?: ComponentChildren;
  role?: "alert" | "alertdialog" | "status";
  autoHideDuration?: number;
}

const defaultIcons = {
  info: InfoCircle,
  success: CheckCircle,
  warning: WarningTriangle,
  error: XmarkCircle,
} as const;

/**
 * Enhanced Alert component demonstrating centralized hook usage
 *
 * Key improvements:
 * 1. useAutoHide - Centralizes auto-dismiss logic
 * 2. useAnimationState - Manages exit animations
 * 3. useIconSize - Standardizes icon sizing
 * 4. Design tokens - Uses new animation and size tokens
 */
export const EnhancedAlert: React.FC<EnhancedAlertProps> = ({
  variant = "info",
  size = "md",
  title,
  children,
  dismissible = false,
  onDismiss,
  icon,
  hideIcon = false,
  actions,
  role = "alert",
  autoHideDuration,
  className,
  ...props
}) => {
  // ✅ NEW: Centralized animation state management
  const { isVisible, startExit, animationProps } = useAnimationState({
    exitDuration: 250, // Could use theme.animation.duration.normal
    onComplete: onDismiss,
  });

  const handleDismiss = () => {
    if (!dismissible) return;
    startExit();
  };

  // ✅ NEW: Centralized auto-hide functionality
  useAutoHide({
    duration: autoHideDuration,
    enabled: isVisible && !!autoHideDuration,
    onAutoHide: handleDismiss,
  });

  // ✅ NEW: Centralized icon sizing
  const iconSize = useIconSize({ size });
  const closeIconSize = useCloseIconSize(size);

  // Handle keyboard dismissal
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (dismissible && event.key === "Escape") {
      handleDismiss();
    }
  };

  if (!isVisible) {
    return null;
  }

  // Determine which icon to show
  const IconComponent = icon ? null : defaultIcons[variant];

  return (
    <div
      className={cn(alert({ variant, size }), className)}
      role={role}
      onKeyDown={handleKeyDown}
      {...animationProps} // ✅ NEW: Centralized animation props
      {...props}
    >
      {!hideIcon && (
        <div className={alertIcon({ variant, size })}>
          {icon ||
            (IconComponent && (
              <IconComponent
                width={iconSize} // ✅ NEW: Centralized icon sizing
                height={iconSize}
              />
            ))}
        </div>
      )}

      <div className={alertContent}>
        {title && <div className={alertTitle({ size })}>{title}</div>}

        {children && (
          <div className={alertDescription({ size })}>{children}</div>
        )}

        {actions && <div className={alertActions}>{actions}</div>}
      </div>

      {dismissible && (
        <button
          type="button"
          className={alertCloseButton({ variant, size })}
          onClick={handleDismiss}
          aria-label="Dismiss alert"
        >
          <Xmark
            width={closeIconSize} // ✅ NEW: Specialized close icon sizing
            height={closeIconSize}
          />
        </button>
      )}
    </div>
  );
};

/**
 * COMPARISON: Before vs After
 *
 * BEFORE (Manual implementation):
 * - const [isExiting, setIsExiting] = useState(false);
 * - const [isVisible, setIsVisible] = useState(true);
 * - useEffect(() => { // auto-hide logic }, [autoHideDuration, handleDismiss]);
 * - const iconSize = size === 'sm' ? 16 : size === 'md' ? 20 : 24;
 * - Manual animation timing and state management
 *
 * AFTER (Centralized hooks):
 * - const { isVisible, startExit, animationProps } = useAnimationState({...});
 * - useAutoHide({ duration: autoHideDuration, ... });
 * - const iconSize = useIconSize({ size });
 * - const closeIconSize = useCloseIconSize(size);
 * - Consistent behavior across all components
 *
 * BENEFITS:
 * ✅ Reduced code duplication
 * ✅ Consistent behavior across components
 * ✅ Centralized token usage
 * ✅ Easier testing and maintenance
 * ✅ Better TypeScript support
 */

export default EnhancedAlert;
