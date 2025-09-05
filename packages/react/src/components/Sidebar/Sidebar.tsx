import React, { createContext, useContext, useState } from 'react';
import { FocusScope } from 'react-aria';

import { useSidebarFocusManagement } from '../../hooks';
import type { BaseComponentProps, CollapsibleComponentProps } from '../../types';
import { cn } from '../../utils/cn';

import * as styles from './Sidebar.css';

// Import all subcomponents for composition
import { SidebarContent } from './SidebarContent';
import { SidebarFooter } from './SidebarFooter';
import { SidebarGroup } from './SidebarGroup';
import { SidebarHeader } from './SidebarHeader';
import { SidebarItem, SidebarButton, SidebarLink } from './SidebarItem';
import { SidebarSeparator } from './SidebarSeparator';
import { SidebarToggle } from './SidebarToggle';

// Context for sidebar state with enhanced functionality
interface SidebarContextValue {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  collapsible: boolean;
  isFocusWithin: boolean;
}

const SidebarContext = createContext<SidebarContextValue | undefined>(undefined);

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('Sidebar components must be used within a Sidebar');
  }
  return context;
};

// Main Sidebar Container
export interface SidebarProps extends BaseComponentProps, CollapsibleComponentProps {
  children: React.ReactNode;
  variant?: 'floating' | 'push';
  onCollapseChange?: (collapsed: boolean) => void;
}

const SidebarBase = React.forwardRef<HTMLElement, SidebarProps>(
  ({ 
    children, 
    variant = 'floating',
    defaultCollapsed = false, 
    collapsible = true,
    onCollapseChange,
    className, 
    ...props 
  }, ref) => {
    const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
    
    // Wrapper to call onCollapseChange when state changes
    const handleSetIsCollapsed = (collapsed: boolean) => {
      setIsCollapsed(collapsed);
      onCollapseChange?.(collapsed);
    };
    
    // Enhanced focus management
    const { focusScopeProps, isFocusWithin } = useSidebarFocusManagement({
      isCollapsed
    });

    const contextValue: SidebarContextValue = {
      isCollapsed,
      setIsCollapsed: handleSetIsCollapsed,
      collapsible,
      isFocusWithin
    };

    // Handle click to expand when collapsed
    const handleSidebarClick = (event: React.MouseEvent) => {
      if (isCollapsed && collapsible) {
        // Only expand if click is not on interactive elements (buttons, links)
        const target = event.target as HTMLElement;
        const isInteractive = target.closest('button, a, [role="button"], [role="menuitem"]');
        
        if (!isInteractive) {
          handleSetIsCollapsed(false);
        }
      }
    };

    return (
      <SidebarContext.Provider value={contextValue}>
        <FocusScope>
          <aside
            ref={ref}
            data-collapsed={isCollapsed}
            data-focus-within={isFocusWithin}
            className={cn(
              styles.sidebar({ variant, collapsed: isCollapsed }),
              className
            )}
            onClick={handleSidebarClick}
            style={{ cursor: isCollapsed && collapsible ? 'pointer' : undefined }}
            {...focusScopeProps}
            {...props}
          >
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                const childType = child.type as any;
                if (childType?.displayName === 'SidebarHeader') {
                  return React.cloneElement(child, { isCollapsed });
                }
              }
              return child;
            })}
          </aside>
        </FocusScope>
      </SidebarContext.Provider>
    );
  }
);

SidebarBase.displayName = 'Sidebar';

// Internal composition interface for TypeScript support
type SidebarCompound = typeof SidebarBase & {
  Header: typeof SidebarHeader;
  Content: typeof SidebarContent;
  Footer: typeof SidebarFooter;
  Group: typeof SidebarGroup;
  Item: typeof SidebarItem;
  Button: typeof SidebarButton;
  Link: typeof SidebarLink;
  Toggle: typeof SidebarToggle;
  Separator: typeof SidebarSeparator;
};

// Create compound component with proper TypeScript support
const Sidebar = SidebarBase as SidebarCompound;

// Attach subcomponents as static properties
Sidebar.Header = SidebarHeader;
Sidebar.Content = SidebarContent;
Sidebar.Footer = SidebarFooter;
Sidebar.Group = SidebarGroup;
Sidebar.Item = SidebarItem;
Sidebar.Button = SidebarButton;
Sidebar.Link = SidebarLink;
Sidebar.Toggle = SidebarToggle;
Sidebar.Separator = SidebarSeparator;

export { Sidebar };

// Export types
export type { SidebarHeaderProps } from './SidebarHeader';
export type { SidebarContentProps } from './SidebarContent';
export type { SidebarFooterProps } from './SidebarFooter';
export type { SidebarGroupProps } from './SidebarGroup';
export type { SidebarItemProps, SidebarButtonProps, SidebarLinkProps } from './SidebarItem';
export type { SidebarToggleProps } from './SidebarToggle';
export type { SidebarSeparatorProps } from './SidebarSeparator';