import React from "react";

import { useSidebarGroupNavigation } from "../../../hooks";
import type { BaseComponentProps } from "../../../types";
import { cn } from "../../../utils/cn";
import { useSidebarContext } from "../Sidebar";

import * as styles from "./SidebarGroup.css";

export interface SidebarGroupProps extends BaseComponentProps {
  children: React.ReactNode;
  label?: string;
  id?: string;
}

export const SidebarGroup = React.forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ children, label, id, className, ...props }, ref) => {
    useSidebarContext();

    // Enhanced group navigation with React Aria
    const { groupProps, labelProps } = useSidebarGroupNavigation({
      label,
      id,
    });

    return (
      <div
        ref={ref}
        className={cn(styles.sidebarGroup, className)}
        {...groupProps}
        {...props}
      >
        {label && (
          <div className={styles.sidebarGroupLabel} {...labelProps}>
            {label}
          </div>
        )}
        <ul role="menu">{children}</ul>
      </div>
    );
  },
);

SidebarGroup.displayName = "SidebarGroup";
