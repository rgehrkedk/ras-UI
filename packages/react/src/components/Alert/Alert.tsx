/**
 * Alert component for status messages and notifications
 * Provides accessible feedback with floating UI design principles
 */

import {
  InfoCircle,
  CheckCircle,
  WarningTriangle,
  XmarkCircle,
  Xmark,
} from "iconoir-react";
import React, { useState, useEffect, useCallback } from "react";

import type {
  ComponentSize,
  BaseComponentProps,
  ComponentChildren,
  CloseHandler,
  AlertType,
} from "../../types";
import { cn } from "../../utils/cn";

import {
  alert,
  alertIcon,
  alertContent,
  alertTitle,
  alertDescription,
  alertCloseButton,
  alertActions,
} from "./Alert.css";

export interface AlertProps extends BaseComponentProps {
  /**
   * Alert variant/type
   * @default 'info'
   */
  variant?: AlertType;

  /**
   * Alert size
   * @default 'md'
   */
  size?: ComponentSize;

  /**
   * Alert title
   */
  title?: ComponentChildren;

  /**
   * Alert description/content
   */
  children?: ComponentChildren;

  /**
   * Whether the alert can be dismissed
   * @default false
   */
  dismissible?: boolean;

  /**
   * Callback fired when alert is dismissed
   */
  onDismiss?: CloseHandler;

  /**
   * Custom icon to display instead of default
   */
  icon?: React.ReactNode;

  /**
   * Whether to hide the icon completely
   * @default false
   */
  hideIcon?: boolean;

  /**
   * Action buttons or elements to display
   */
  actions?: ComponentChildren;

  /**
   * ARIA role for the alert
   * @default 'alert'
   */
  role?: "alert" | "alertdialog" | "status";

  /**
   * Auto-dismiss timeout in milliseconds
   */
  autoHideDuration?: number;
}

// Default icons for each variant
const defaultIcons = {
  info: InfoCircle,
  success: CheckCircle,
  warning: WarningTriangle,
  error: XmarkCircle,
} as const;

/**
 * Accessible alert component with floating UI design principles.
 * Used for status messages, feedback, and notifications.
 *
 * @example
 * ```tsx
 * <Alert variant="success" title="Success!">
 *   Your changes have been saved.
 * </Alert>
 *
 * <Alert
 *   variant="error"
 *   dismissible
 *   onDismiss={() => setShowAlert(false)}
 * >
 *   Something went wrong. Please try again.
 * </Alert>
 * ```
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
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
    },
    ref,
  ) => {
    const [isExiting, setIsExiting] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const handleDismiss = useCallback(() => {
      if (!dismissible) return;

      setIsExiting(true);

      // Wait for animation to complete before hiding
      setTimeout(() => {
        setIsVisible(false);
        onDismiss?.();
      }, 250);
    }, [dismissible, onDismiss]);

    // Auto-hide functionality
    useEffect(() => {
      if (autoHideDuration && autoHideDuration > 0) {
        const timer = setTimeout(() => {
          handleDismiss();
        }, autoHideDuration);

        return () => clearTimeout(timer);
      }
    }, [autoHideDuration, handleDismiss]);

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
    const iconSize = size === "sm" ? 16 : size === "md" ? 20 : 24;

    return (
      <div
        ref={ref}
        className={cn(alert({ variant, size }), className)}
        role={role}
        data-exiting={isExiting}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {!hideIcon && (
          <div className={alertIcon({ variant, size })}>
            {icon ||
              (IconComponent && (
                <IconComponent width={iconSize} height={iconSize} />
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
              width={size === "sm" ? 14 : 16}
              height={size === "sm" ? 14 : 16}
            />
          </button>
        )}
      </div>
    );
  },
);

Alert.displayName = "Alert";

export default Alert;
