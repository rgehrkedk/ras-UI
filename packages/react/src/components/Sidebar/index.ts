/**
 * Sidebar component exports
 * 
 * Provides compound component pattern: <Sidebar.Header>, <Sidebar.Content>, etc.
 * Also allows individual imports for flexibility: import { SidebarHeader } from './Sidebar'
 */

export { 
  Sidebar, 
  useSidebarContext,
} from './Sidebar';

// Individual subcomponent exports for flexibility (like Dialog pattern)
export { SidebarHeader } from './SidebarHeader';
export { SidebarContent } from './SidebarContent';
export { SidebarFooter } from './SidebarFooter';
export { SidebarGroup } from './SidebarGroup';
export { SidebarItem, SidebarButton, SidebarLink } from './SidebarItem';
export { SidebarToggle } from './SidebarToggle';
export { SidebarSeparator } from './SidebarSeparator';

// Export all types
export type {
  SidebarProps,
  SidebarHeaderProps,
  SidebarContentProps,
  SidebarFooterProps,
  SidebarGroupProps,
  SidebarItemProps,
  SidebarButtonProps,
  SidebarLinkProps,
  SidebarToggleProps,
  SidebarSeparatorProps,
} from './Sidebar';

export { Sidebar as default } from './Sidebar';