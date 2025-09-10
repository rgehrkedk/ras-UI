import React from "react";

import type { BaseComponentProps } from "../../../types";
import { cn } from "../../../utils/cn";

import * as styles from "./SidebarContent.css";

export interface SidebarContentProps extends BaseComponentProps {
  children: React.ReactNode;
}

export const SidebarContent = React.forwardRef<
  HTMLDivElement,
  SidebarContentProps
>(({ children, className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn(styles.sidebarContent, className)} {...props}>
      {children}
    </div>
  );
});

SidebarContent.displayName = "SidebarContent";
