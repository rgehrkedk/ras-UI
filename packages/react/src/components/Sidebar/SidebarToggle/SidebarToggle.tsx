import { NavArrowLeft, NavArrowRight } from 'iconoir-react';
import React from 'react';

import { useSidebarNavigation } from '../../../hooks';
import type { BaseComponentProps } from '../../../types';
import { cn } from '../../../utils/cn';
import { useSidebarContext } from '../Sidebar';

import * as styles from './SidebarToggle.css';

export interface SidebarToggleProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'ghost' | 'outline';
  onToggle?: (collapsed: boolean) => void;
  iconExpanded?: React.ReactNode;
  iconCollapsed?: React.ReactNode;
}

export const SidebarToggle = React.forwardRef<HTMLButtonElement, SidebarToggleProps>(
  ({ className, size = 'md', variant = 'default', onToggle, iconExpanded, iconCollapsed, ...props }, ref) => {
    const { isCollapsed, setIsCollapsed, collapsible } = useSidebarContext();
    
    // Enhanced toggle with React Aria
    const { navigationProps, isFocusVisible, isPressed } = useSidebarNavigation({
      isDisabled: !collapsible,
      onAction: () => {
        const newCollapsed = !isCollapsed;
        setIsCollapsed(newCollapsed);
        onToggle?.(newCollapsed);
      }
    });
    
    if (!collapsible) {
      return null;
    }
    
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          styles.sidebarToggle({ 
            size,
            variant,
            focusVisible: isFocusVisible,
            pressed: isPressed 
          }),
          className
        )}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        aria-expanded={!isCollapsed}
        aria-controls="sidebar-content"
        data-collapsed={isCollapsed}
        data-focus-visible={isFocusVisible}
        data-pressed={isPressed}
        {...navigationProps}
        {...props}
      >
        <span className={styles.sidebarToggleIcon}>
          {isCollapsed 
            ? (iconCollapsed || <NavArrowRight width={16} height={16} />) 
            : (iconExpanded || <NavArrowLeft width={16} height={16} />)
          }
        </span>
      </button>
    );
  }
);

SidebarToggle.displayName = 'SidebarToggle';