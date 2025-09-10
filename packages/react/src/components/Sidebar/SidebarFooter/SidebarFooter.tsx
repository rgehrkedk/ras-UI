import React from "react";

import type { BaseComponentProps } from "../../../types";
import { cn } from "../../../utils/cn";
import { Avatar } from "../../Avatar";
import { useSidebarContext } from "../Sidebar";

import * as styles from "./SidebarFooter.css";

export interface SidebarFooterProps extends BaseComponentProps {
  children?: React.ReactNode;
  userName?: string;
  userEmail?: string;
  avatar?: React.ReactNode;
}

export const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  SidebarFooterProps
>(({ children, userName, userEmail, avatar, className, ...props }, ref) => {
  const { isCollapsed } = useSidebarContext();

  // If userName/userEmail props are provided, use structured approach
  if (userName || userEmail) {
    const finalAvatar = avatar || (
      <Avatar name={userName || "User"} size="md" variant="primary" />
    );

    return (
      <div
        ref={ref}
        className={cn(styles.sidebarFooter, className)}
        data-collapsed={isCollapsed}
        {...props}
      >
        <div className={styles.sidebarFooterAvatar}>{finalAvatar}</div>
        <div>
          {userName && (
            <div className={styles.sidebarFooterName}>{userName}</div>
          )}
          {userEmail && (
            <div className={styles.sidebarFooterEmail}>{userEmail}</div>
          )}
        </div>
      </div>
    );
  }

  // Fallback to children-based approach for backwards compatibility
  if (children) {
    const childrenArray = React.Children.toArray(children);
    const avatarElement = childrenArray[0]; // First child is avatar
    const textElement = childrenArray[1]; // Second child is text content

    return (
      <div
        ref={ref}
        className={cn(styles.sidebarFooter, className)}
        data-collapsed={isCollapsed}
        {...props}
      >
        {avatarElement && (
          <div className={styles.sidebarFooterAvatar}>{avatarElement}</div>
        )}
        {textElement &&
          React.isValidElement(textElement) &&
          React.cloneElement(
            textElement as React.ReactElement<any>,
            {},
            React.Children.map(textElement.props.children, (child, index) => {
              if (React.isValidElement(child) && child.type === "div") {
                const className =
                  index === 0
                    ? styles.sidebarFooterName
                    : styles.sidebarFooterEmail;
                return React.cloneElement(child as React.ReactElement<any>, {
                  className: cn(className, (child.props as any).className),
                });
              }
              return child;
            }),
          )}
      </div>
    );
  }

  return null;
});

SidebarFooter.displayName = "SidebarFooter";
