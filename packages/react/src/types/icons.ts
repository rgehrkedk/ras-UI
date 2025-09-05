/**
 * Icon-related type definitions
 */

import React from 'react';

// Icon position types
export type IconPosition = 'start' | 'end';

// Props for components that support start icons
export interface WithStartIcon {
  /**
   * Icon to display at the start of the component
   */
  startIcon?: React.ReactNode;
}

// Props for components that support end icons
export interface WithEndIcon {
  /**
   * Icon to display at the end of the component
   */
  endIcon?: React.ReactNode;
}

// Props for components that support both start and end icons
export interface WithIcons extends WithStartIcon, WithEndIcon {}

// Props for components with custom close icons
export interface WithCloseIcon {
  /**
   * Custom close button icon
   */
  closeIcon?: React.ReactNode;
}

// Icon wrapper props
export interface IconWrapperProps {
  children: React.ReactNode;
  position: IconPosition;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

// Default icon names for consistent usage (using Iconoir)
export type DefaultIconName = 
  | 'close' 
  | 'chevron-down' 
  | 'chevron-right'
  | 'check' 
  | 'alert-circle' 
  | 'info' 
  | 'x-circle'
  | 'search'
  | 'heart'
  | 'user'
  | 'users'
  | 'home'
  | 'settings'
  | 'mail'
  | 'phone'
  | 'calendar'
  | 'clock'
  | 'download'
  | 'upload'
  | 'edit'
  | 'trash'
  | 'plus'
  | 'minus'
  | 'save'
  | 'chart'
  | 'document'
  | 'help'
  | 'menu'
  | 'arrow-left'
  | 'arrow-right'
  | 'dashboard'
  | 'folder'
  | 'bookmark'
  | 'bell'
  | 'message'
  | 'star'
  | 'layout'
  | 'grid'
  | 'list'
  | 'eye'
  | 'lock'
  | 'unlock'
  | 'code'
  | 'terminal'
  | 'copy'
  | 'logout'
  | 'external-link'
  | 'crown'
  | 'tag'
  | 'outline';

// Icon component props
export interface IconProps {
  name?: DefaultIconName;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  'aria-hidden'?: boolean;
}
