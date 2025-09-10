import React, { useState } from "react";

import { useSidebarNavigation } from "../../../hooks";
import type {
  BaseComponentProps,
  NavigationComponentProps,
  PressHandler,
} from "../../../types";
import type { DefaultIconName } from "../../../types/icons";
import { cn } from "../../../utils/cn";
import { Badge } from "../../Badge";
import { Icon } from "../../Icon";
import { Tooltip } from "../../Tooltip";
import { useSidebarContext } from "../Sidebar";

import * as styles from "./SidebarItem.css";

// Active state management hook
const useActiveState = (initialActive = false) => {
  const [isActive, setIsActive] = useState(initialActive);

  const toggleActive = () => setIsActive((prev) => !prev);

  return { isActive, toggleActive };
};

// Sidebar Item Content Component
interface SidebarItemContentProps {
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  children: React.ReactNode;
}

const SidebarItemContent: React.FC<SidebarItemContentProps> = ({
  icon,
  badge,
  children,
}) => (
  <>
    {icon && <span className={styles.sidebarItemIcon}>{icon}</span>}
    <span className={styles.sidebarItemText}>{children}</span>
    {badge && <span className={styles.sidebarItemBadge}>{badge}</span>}
  </>
);

// Sidebar Button Component (for interactive items)
export interface SidebarButtonProps
  extends BaseComponentProps,
    NavigationComponentProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  active?: boolean;
  isDisabled?: boolean;
  onPress?: PressHandler;
}

export const SidebarButton = React.forwardRef<
  HTMLButtonElement,
  SidebarButtonProps
>(
  (
    {
      children,
      icon,
      badge,
      active = false,
      isDisabled = false,
      onPress,
      className,
      ...props
    },
    ref,
  ) => {
    const { isCollapsed } = useSidebarContext();

    // Enhanced navigation with React Aria
    const { navigationProps, isFocusVisible, isPressed } = useSidebarNavigation(
      {
        isDisabled,
        onAction: onPress,
      },
    );

    const buttonElement = (
      <button
        ref={ref}
        className={cn(
          styles.sidebarItem({
            active,
            focusVisible: isFocusVisible,
            pressed: isPressed,
          }),
          className,
        )}
        data-active={active}
        data-focus-visible={isFocusVisible}
        data-pressed={isPressed}
        disabled={isDisabled}
        {...navigationProps}
        {...props}
      >
        <SidebarItemContent icon={icon} badge={badge}>
          {children}
        </SidebarItemContent>
      </button>
    );

    // Wrap with tooltip when collapsed
    if (isCollapsed) {
      return (
        <Tooltip trigger={buttonElement} placement="right" delay={100}>
          {children}
        </Tooltip>
      );
    }

    return buttonElement;
  },
);

SidebarButton.displayName = "SidebarButton";

// Sidebar Link Component (for navigation links)
export interface SidebarLinkProps
  extends BaseComponentProps,
    NavigationComponentProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  active?: boolean;
  href: string;
  target?: string;
  onPress?: PressHandler;
}

export const SidebarLink = React.forwardRef<
  HTMLAnchorElement,
  SidebarLinkProps
>(
  (
    {
      children,
      icon,
      badge,
      active = false,
      href,
      target,
      onPress,
      className,
      ...props
    },
    ref,
  ) => {
    const { isCollapsed } = useSidebarContext();

    // Enhanced navigation with React Aria
    const { navigationProps, isFocusVisible, isPressed } = useSidebarNavigation(
      {
        onAction: onPress,
      },
    );

    const linkElement = (
      <a
        ref={ref}
        href={href}
        target={target}
        className={cn(
          styles.sidebarItem({
            active,
            focusVisible: isFocusVisible,
            pressed: isPressed,
          }),
          className,
        )}
        data-active={active}
        data-focus-visible={isFocusVisible}
        data-pressed={isPressed}
        {...navigationProps}
        {...props}
      >
        <SidebarItemContent icon={icon} badge={badge}>
          {children}
        </SidebarItemContent>
      </a>
    );

    // Wrap with tooltip when collapsed
    if (isCollapsed) {
      return (
        <Tooltip trigger={linkElement} placement="right" delay={100}>
          {children}
        </Tooltip>
      );
    }

    return linkElement;
  },
);

SidebarLink.displayName = "SidebarLink";

// Backwards Compatible SidebarItem Component
export interface SidebarItemProps extends BaseComponentProps {
  children?: React.ReactNode;
  label?: string;
  icon?: React.ReactNode | string;
  badge?: React.ReactNode;
  badgeText?: string;
  badgeVariant?: "primary" | "success" | "warning" | "danger" | "outline";
  active?: boolean;
  onClick?: () => void;
  href?: string;
  target?: string;
  isDisabled?: boolean;
}

export const SidebarItem = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  SidebarItemProps
>(
  (
    {
      children,
      label,
      icon,
      badge,
      badgeText,
      badgeVariant = "primary",
      active,
      onClick,
      href,
      target,
      isDisabled = false,
      className,
      ...props
    },
    ref,
  ) => {
    // Use internal active state if not controlled
    const { isActive, toggleActive } = useActiveState(active);
    const finalActive = active !== undefined ? active : isActive;

    // Determine the final text content
    const finalText = label || children;

    // Handle icon - if string, convert to Icon component
    const finalIcon =
      typeof icon === "string" ? <Icon name={icon as DefaultIconName} /> : icon;

    // Create badge from badgeText if provided
    const finalBadge =
      badge ||
      (badgeText ? (
        <Badge variant={badgeVariant} size="sm">
          {badgeText}
        </Badge>
      ) : undefined);

    // Handle click with active state toggle
    const handleClick = () => {
      if (active === undefined) {
        toggleActive();
      }
      onClick?.();
    };

    // If href is provided, render as link
    if (href) {
      return (
        <SidebarLink
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          icon={finalIcon}
          badge={finalBadge}
          active={finalActive}
          onPress={handleClick}
          className={className}
          {...props}
        >
          {finalText}
        </SidebarLink>
      );
    }

    // Otherwise render as button
    return (
      <SidebarButton
        ref={ref as React.Ref<HTMLButtonElement>}
        icon={finalIcon}
        badge={finalBadge}
        active={finalActive}
        onPress={handleClick}
        isDisabled={isDisabled}
        className={className}
        {...props}
      >
        {finalText}
      </SidebarButton>
    );
  },
);

SidebarItem.displayName = "SidebarItem";
