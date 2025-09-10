/**
 * Tabs component built on React Aria Components
 * Provides accessible tabbed interface functionality with multiple variants
 */

import React from "react";
import {
  Tabs as AriaTabs,
  TabList as AriaTabList,
  Tab as AriaTab,
  TabPanel as AriaTabPanel,
  TabsProps as AriaTabsProps,
  TabListProps as AriaTabListProps,
  TabProps as AriaTabProps,
  TabPanelProps as AriaTabPanelProps,
} from "react-aria-components";

import type { BaseComponentProps } from "../../types";
import { cn } from "../../utils/cn";

import { tabs, tabList, tab, tabPanel } from "./Tabs.css";

// Base interfaces extending React Aria props
export interface TabsProps
  extends Omit<AriaTabsProps, "className">,
    BaseComponentProps {
  /**
   * Tab orientation
   * @default 'horizontal'
   */
  orientation?: "horizontal" | "vertical";

  /**
   * Keyboard activation mode
   * @default 'automatic'
   */
  keyboardActivation?: "automatic" | "manual";

  /**
   * Size variant for all tabs
   * @default 'md'
   */
  size?: "sm" | "md" | "lg";
}

export interface TabListProps
  extends Omit<AriaTabListProps<any>, "className">,
    BaseComponentProps {
  /**
   * Accessible label for the tab list
   */
  "aria-label": string;
}

export interface TabProps
  extends Omit<AriaTabProps, "className">,
    BaseComponentProps {
  /**
   * Whether this tab is disabled
   * @default false
   */
  isDisabled?: boolean;
}

export interface TabPanelProps
  extends Omit<AriaTabPanelProps, "className">,
    BaseComponentProps {
  /**
   * Whether to keep the panel mounted when not active (lazy loading control)
   * @default false
   */
  shouldForceMount?: boolean;
}

/**
 * Root tabs container component that manages tab selection state.
 * Built on React Aria Components for robust accessibility.
 *
 * @example
 * ```tsx
 * <Tabs defaultSelectedKey="settings" size="md">
 *   <TabList aria-label="Settings tabs">
 *     <Tab id="general">General</Tab>
 *     <Tab id="advanced">Advanced</Tab>
 *     <Tab id="security">Security</Tab>
 *   </TabList>
 *   <TabPanel id="general">
 *     <h3>General Settings</h3>
 *     <p>General settings content...</p>
 *   </TabPanel>
 *   <TabPanel id="advanced">
 *     <h3>Advanced Settings</h3>
 *     <p>Advanced settings content...</p>
 *   </TabPanel>
 *   <TabPanel id="security">
 *     <h3>Security Settings</h3>
 *     <p>Security settings content...</p>
 *   </TabPanel>
 * </Tabs>
 * ```
 */
export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      orientation = "horizontal",
      keyboardActivation = "automatic",
      size = "md",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <AriaTabs
        ref={ref}
        className={cn(
          tabs({
            orientation,
            size,
          }),
          className,
        )}
        orientation={orientation}
        keyboardActivation={keyboardActivation}
        {...props}
      >
        {children}
      </AriaTabs>
    );
  },
);

/**
 * Container for tab buttons. Must contain Tab components.
 *
 * @example
 * ```tsx
 * <TabList aria-label="Navigation tabs">
 *   <Tab id="home">Home</Tab>
 *   <Tab id="about">About</Tab>
 *   <Tab id="contact">Contact</Tab>
 * </TabList>
 * ```
 */
export const TabList = React.forwardRef<HTMLDivElement, TabListProps>(
  ({ className, children, ...props }, ref) => {
    // Accessibility check for aria-label
    if (!props["aria-label"]) {
      console.warn(
        "TabList: aria-label prop is required for accessibility. Provide a descriptive label for the tab list.",
      );
    }

    return (
      <AriaTabList ref={ref} className={cn(tabList, className)} {...props}>
        {children}
      </AriaTabList>
    );
  },
);

/**
 * Individual tab button component.
 *
 * @example
 * ```tsx
 * <Tab id="settings">Settings</Tab>
 * <Tab id="profile" isDisabled>Profile</Tab>
 * ```
 */
export const Tab = React.forwardRef<HTMLDivElement, TabProps>(
  ({ isDisabled = false, className, children, ...props }, ref) => {
    return (
      <AriaTab
        ref={ref}
        className={cn(tab, className)}
        isDisabled={isDisabled}
        {...props}
      >
        {children}
      </AriaTab>
    );
  },
);

/**
 * Content panel associated with a tab.
 *
 * @example
 * ```tsx
 * <TabPanel id="settings">
 *   <h3>Settings</h3>
 *   <p>Settings content goes here...</p>
 * </TabPanel>
 *
 * // Lazy loading disabled (always mounted)
 * <TabPanel id="data" shouldForceMount>
 *   <ExpensiveDataComponent />
 * </TabPanel>
 * ```
 */
export const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>(
  ({ shouldForceMount = false, className, children, ...props }, ref) => {
    return (
      <AriaTabPanel
        ref={ref}
        className={cn(tabPanel, className)}
        shouldForceMount={shouldForceMount}
        {...props}
      >
        {children}
      </AriaTabPanel>
    );
  },
);

// Display names for debugging
Tabs.displayName = "Tabs";
TabList.displayName = "TabList";
Tab.displayName = "Tab";
TabPanel.displayName = "TabPanel";

export default Tabs;
