/**
 * Menu component built on React Aria Components
 * Provides accessible dropdown menu functionality with keyboard navigation
 */

import React from 'react';
import {
  MenuTrigger,
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  MenuProps as AriaMenuProps,
  MenuItemProps as AriaMenuItemProps,
  MenuTriggerProps as AriaMenuTriggerProps,
  Popover,
  Button as AriaButton,
  Separator as AriaSeparator,
  Key,
  SelectionMode,
  Selection,
} from 'react-aria-components';

import type { 
  SizedComponentProps, 
  BaseComponentProps,
  ComponentChildren 
} from '../../types';
import { cn } from '../../utils/cn';
import { IconWrapper } from '../Icon';

import { 
  menuContainer, 
  menu, 
  menuItem, 
  menuItemIcon, 
  menuItemText, 
  menuItemDescription,
  menuItemKeyboardShortcut,
  menuSeparator,
  menuTriggerButton,
  menuPopover 
} from './Menu.css';

// Core Menu Component Types
export interface MenuProps extends Omit<AriaMenuProps<object>, 'className'>, BaseComponentProps {
  /**
   * Menu size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Menu items - can be static or dynamic
   */
  children: ComponentChildren;
}

export interface MenuTriggerComponentProps 
  extends Omit<AriaMenuTriggerProps, 'children'>, 
          BaseComponentProps {
  /**
   * Menu trigger button content and menu
   */
  children: [React.ReactElement, React.ReactElement];
  
  /**
   * Menu size - passed down to menu and button
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
}

export interface MenuItemProps extends Omit<AriaMenuItemProps, 'className'>, BaseComponentProps {
  /**
   * Menu item content
   */
  children?: ComponentChildren;
  
  /**
   * Icon to display at the start of the menu item
   */
  startIcon?: React.ReactNode;
  
  /**
   * Icon to display at the end of the menu item
   */
  endIcon?: React.ReactNode;
  
  /**
   * Description text below the main label
   */
  description?: string;
  
  /**
   * Keyboard shortcut to display
   */
  keyboardShortcut?: string;
  
  /**
   * Whether this menu item is destructive (danger styling)
   * @default false
   */
  destructive?: boolean;
}

export type MenuSeparatorProps = BaseComponentProps;

/**
 * Menu Trigger Button component that opens the menu
 * Provides a standardized trigger button with proper accessibility
 * 
 * @example
 * ```tsx
 * <MenuTriggerButton size="md">
 *   Actions
 * </MenuTriggerButton>
 * ```
 */
export const MenuTriggerButton = React.forwardRef<HTMLButtonElement, 
  SizedComponentProps & { children: ComponentChildren; startIcon?: React.ReactNode; endIcon?: React.ReactNode }
>(({ size = 'md', className, children, startIcon, endIcon, ...props }, ref) => {
  return (
    <AriaButton
      ref={ref}
      className={cn(menuTriggerButton({ size }), className)}
      {...props}
    >
      {startIcon && (
        <IconWrapper position="start" size={size} className={menuItemIcon}>
          {startIcon}
        </IconWrapper>
      )}
      {children}
      {endIcon && (
        <IconWrapper position="end" size={size} className={menuItemIcon}>
          {endIcon}
        </IconWrapper>
      )}
    </AriaButton>
  );
});

MenuTriggerButton.displayName = 'MenuTriggerButton';

/**
 * Menu Separator component for dividing menu sections
 * 
 * @example
 * ```tsx
 * <MenuSeparator />
 * ```
 */
export const MenuSeparator = React.forwardRef<HTMLDivElement, MenuSeparatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <AriaSeparator
        ref={ref as any}
        className={cn(menuSeparator, className)}
        {...props}
      />
    );
  }
);

MenuSeparator.displayName = 'MenuSeparator';

/**
 * Menu Item component for individual menu options
 * Supports icons, descriptions, and keyboard shortcuts
 * 
 * @example
 * ```tsx
 * <MenuItem 
 *   startIcon={<Icon name="save" />}
 *   keyboardShortcut="⌘S"
 *   onAction={() => save()}
 * >
 *   Save Document
 * </MenuItem>
 * 
 * <MenuItem 
 *   description="Remove this item permanently"
 *   destructive
 *   onAction={() => delete()}
 * >
 *   Delete
 * </MenuItem>
 * ```
 */
export const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>(
  ({ 
    children, 
    className, 
    startIcon, 
    endIcon, 
    description, 
    keyboardShortcut,
    destructive = false,
    ...props 
  }, ref) => {
    const childrenArray = React.Children.toArray(children);
    const shortcutChild = childrenArray.find((child) => 
      React.isValidElement(child) && (child.type as any)?.displayName === 'KeyboardShortcut'
    ) as React.ReactElement | undefined;
    const mainChildren = childrenArray.filter((child) => child !== shortcutChild);

    // Validation warnings for better DX
    if (!children && !startIcon && !endIcon) {
      console.warn('MenuItem: Menu items should have visible content (children, startIcon, or endIcon)');
    }

    return (
      <AriaMenuItem
        ref={ref}
        className={cn(menuItem({ destructive }), className)}
        {...props}
      >
        <div className={menuContainer}>
          {startIcon && (
            <IconWrapper position="start" className={menuItemIcon}>
              {startIcon}
            </IconWrapper>
          )}
          
          <div className={menuItemText}>
            {mainChildren && <span>{mainChildren}</span>}
            {description && (
              <span className={menuItemDescription}>
                {description}
              </span>
            )}
          </div>
          
          {shortcutChild}
          
          {!shortcutChild && keyboardShortcut && (
            <span className={menuItemKeyboardShortcut}>
              {keyboardShortcut}
            </span>
          )}
          
          {endIcon && (
            <IconWrapper position="end" className={menuItemIcon}>
              {endIcon}
            </IconWrapper>
          )}
        </div>
      </AriaMenuItem>
    );
  }
);

MenuItem.displayName = 'MenuItem';

/**
 * Main Menu component containing menu items
 * Provides accessible menu with keyboard navigation
 * 
 * @example
 * ```tsx
 * <Menu size="md">
 *   <MenuItem onAction={() => console.log('Edit')}>Edit</MenuItem>
 *   <MenuItem onAction={() => console.log('Copy')}>Copy</MenuItem>
 *   <MenuSeparator />
 *   <MenuItem destructive onAction={() => console.log('Delete')}>
 *     Delete
 *   </MenuItem>
 * </Menu>
 * ```
 */
export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  ({ size = 'md', className, children, ...props }, ref) => {
    return (
      <AriaMenu
        ref={ref}
        className={cn(menu({ size }), className)}
        {...props}
      >
        {children}
      </AriaMenu>
    );
  }
);

Menu.displayName = 'Menu';

// removed inline MenuItemShortcut in favor of dedicated component

/**
 * Menu Trigger component that combines trigger button and menu
 * Provides complete dropdown menu functionality
 * 
 * @example
 * ```tsx
 * <MenuTriggerComponent>
 *   <MenuTriggerButton>Actions</MenuTriggerButton>
 *   <Menu>
 *     <MenuItem onAction={() => console.log('Edit')}>Edit</MenuItem>
 *     <MenuItem onAction={() => console.log('Copy')}>Copy</MenuItem>
 *   </Menu>
 * </MenuTriggerComponent>
 * 
 * // With custom trigger
 * <MenuTriggerComponent>
 *   <Button variant="primary">Custom Trigger</Button>
 *   <Menu>
 *     <MenuItem onAction={() => console.log('Action')}>Action</MenuItem>
 *   </Menu>
 * </MenuTriggerComponent>
 * ```
 */
export const MenuTriggerComponent = React.forwardRef<HTMLDivElement, MenuTriggerComponentProps>(
  ({ size = 'md', className, children, ...props }, ref) => {
    const [triggerButton, menuContent] = children;

    if (!triggerButton || !menuContent) {
      console.warn('MenuTriggerComponent: Must have exactly two children - trigger button and menu');
    }

    return (
      <MenuTrigger {...props}>
        {triggerButton}
        <Popover className={cn(menuPopover({ size }), className)}>
          {menuContent}
        </Popover>
      </MenuTrigger>
    );
  }
);

MenuTriggerComponent.displayName = 'MenuTriggerComponent';

// Advanced Menu Types for Dynamic Content
export interface MenuItemData {
  id: Key;
  label: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  description?: string;
  keyboardShortcut?: string;
  destructive?: boolean;
  disabled?: boolean;
  onAction?: () => void;
}

export interface MenuSectionData {
  id: Key;
  title?: string;
  items: MenuItemData[];
}

/**
 * Dynamic Menu component for programmatically generated menus
 * Supports sections and dynamic item collections
 * 
 * @example
 * ```tsx
 * const menuItems = [
 *   { id: 'edit', label: 'Edit', keyboardShortcut: '⌘E' },
 *   { id: 'copy', label: 'Copy', keyboardShortcut: '⌘C' },
 *   { id: 'delete', label: 'Delete', destructive: true }
 * ];
 * 
 * <DynamicMenu 
 *   items={menuItems} 
 *   onAction={(key) => console.log('Selected:', key)}
 * />
 * ```
 */
export interface DynamicMenuProps extends Omit<MenuProps, 'children'> {
  /**
   * Menu items or sections to render
   */
  items: (MenuItemData | MenuSectionData)[];
  
  /**
   * Handler for menu item selection
   */
  onAction?: (key: Key) => void;
  
  /**
   * Selection mode for the menu
   */
  selectionMode?: SelectionMode;
  
  /**
   * Selected keys (for controlled selection)
   */
  selectedKeys?: Selection;
  
  /**
   * Handler for selection changes
   */
  onSelectionChange?: (keys: Selection) => void;
}

export const DynamicMenu = React.forwardRef<HTMLDivElement, DynamicMenuProps>(
  ({ items, onAction, className, ...props }, ref) => {
    return (
      <Menu ref={ref} className={className} {...props}>
        {items.map((item) => {
          if ('items' in item) {
            // Section with items
            return (
              <React.Fragment key={item.id}>
                {item.title && <MenuSeparator />}
                {item.items.map((subItem) => (
                  <MenuItem
                    key={subItem.id}
                    startIcon={subItem.startIcon}
                    endIcon={subItem.endIcon}
                    description={subItem.description}
                    keyboardShortcut={subItem.keyboardShortcut}
                    destructive={subItem.destructive}
                    isDisabled={subItem.disabled}
                    onAction={subItem.onAction || (() => onAction?.(subItem.id))}
                  >
                    {subItem.label}
                  </MenuItem>
                ))}
              </React.Fragment>
            );
          } else {
            // Individual item
            return (
              <MenuItem
                key={item.id}
                startIcon={item.startIcon}
                endIcon={item.endIcon}
                description={item.description}
                keyboardShortcut={item.keyboardShortcut}
                destructive={item.destructive}
                isDisabled={item.disabled}
                onAction={item.onAction || (() => onAction?.(item.id))}
              >
                {item.label}
              </MenuItem>
            );
          }
        })}
      </Menu>
    );
  }
);

DynamicMenu.displayName = 'DynamicMenu';

export default MenuTriggerComponent;
