import React from "react";

import type { BaseComponentProps } from "../../../types";
import { cn } from "../../../utils/cn";
import { useSidebarContext } from "../Sidebar";
import { SidebarToggle } from "../SidebarToggle";

import * as styles from "./SidebarHeader.css";

export interface SidebarHeaderProps extends BaseComponentProps {
  children?: React.ReactNode;
  logo?: React.ReactNode;
  title?: string;
  isCollapsed?: boolean;
}

export const SidebarHeader = React.forwardRef<HTMLElement, SidebarHeaderProps>(
  ({ children, logo, title, isCollapsed: _isCollapsed, className, ...props }, ref) => {
    useSidebarContext();

    // Default logo if none provided
    const defaultLogo = (
      <div
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "6px",
          backgroundColor: "#3b82f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "14px",
          fontWeight: "600",
        }}
      >
        A
      </div>
    );

    // If children are provided, apply positioning automatically
    if (children) {
      const childrenArray = React.Children.toArray(children);
      const logoElement = childrenArray[0]; // First child is logo
      const textElement = childrenArray[1]; // Second child is text
      const toggleElement = childrenArray[2]; // Third child is toggle

      return (
        <header
          ref={ref}
          className={cn(styles.sidebarHeader, className)}
          {...props}
        >
          {logoElement && (
            <div className={styles.sidebarHeaderLogo}>{logoElement}</div>
          )}
          {textElement && (
            <span className={styles.sidebarHeaderText}>{textElement}</span>
          )}
          {toggleElement}
        </header>
      );
    }

    // New structured approach with logo + title + auto toggle
    return (
      <header
        ref={ref}
        className={cn(styles.sidebarHeader, className)}
        {...props}
      >
        <div className={styles.sidebarHeaderLogo}>{logo || defaultLogo}</div>
        {title && <span className={styles.sidebarHeaderText}>{title}</span>}
        <SidebarToggle />
      </header>
    );
  },
);

SidebarHeader.displayName = "SidebarHeader";
