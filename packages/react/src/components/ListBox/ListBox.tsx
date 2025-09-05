/**
 * ListBox component built on React Aria Components
 * Provides accessible list selection functionality with single/multiple selection modes
 */

import React from 'react';
import { 
  ListBox as AriaListBox, 
  ListBoxItem as AriaListBoxItem,
  Section,
  Header,
  Text,
  type ListBoxProps as AriaListBoxProps,
  type ListBoxItemProps as AriaListBoxItemProps,
  type Selection,
  type Key
} from 'react-aria-components';

import type { 
  SizedComponentProps, 
  LoadingComponentProps, 
  DisableableComponentProps,
  WithIcons,
  ComponentChildren
} from '../../types';
import { cn } from '../../utils/cn';
import { IconWrapper } from '../Icon';
import { Spinner } from '../Spinner';

import { listBox, listBoxItem, listBoxSection, listBoxHeader, listBoxEmpty, listBoxLoading, listBoxItemContentGlobal } from './ListBox.css';

// Selection types
export type ListBoxSelectionMode = 'single' | 'multiple' | 'none';

// Item data interface for dynamic collections
export interface ListBoxItemData extends WithIcons {
  id: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

// Section data interface for grouped collections
export interface ListBoxSectionData {
  id: string;
  title: string;
  items: ListBoxItemData[];
}

// Base ListBox props extending React Aria
export interface ListBoxProps<T extends object = ListBoxItemData>
  extends Omit<AriaListBoxProps<T>, 'className' | 'children'>,
          SizedComponentProps,
          LoadingComponentProps,
          DisableableComponentProps {
  /**
   * Selection mode
   * @default 'none'
   */
  selectionMode?: ListBoxSelectionMode;
  
  /**
   * Items for dynamic collections
   */
  items?: T[];
  
  /**
   * Sections for grouped collections
   */
  sections?: ListBoxSectionData[];
  
  /**
   * Static children (ListBoxItem elements)
   */
  children?: ComponentChildren | ((item: T) => React.ReactNode);
  
  /**
   * Empty state message
   * @default 'No items available'
   */
  emptyMessage?: string;
  
  /**
   * Loading state message
   * @default 'Loading...'
   */
  loadingMessage?: string;
  
  /**
   * Show empty state when no items
   * @default true
   */
  showEmptyState?: boolean;
  
  /**
   * Callback when selection changes
   */
  onSelectionChange?: (keys: Selection) => void;
  
  /**
   * Callback when an item is selected/activated
   */
  onAction?: (key: Key) => void;
}

// ListBoxItem props extending React Aria
export interface ListBoxItemProps 
  extends Omit<AriaListBoxItemProps, 'children'>,
          WithIcons {
  /**
   * Item content
   */
  children?: ComponentChildren;
  
  /**
   * Item description (secondary text)
   */
  description?: string;
}

/**
 * Individual list item component
 */
export const ListBoxItem = React.forwardRef<HTMLDivElement, ListBoxItemProps>(
  (
    {
      children,
      description,
      startIcon,
      endIcon,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <AriaListBoxItem
        ref={ref}
        className={cn(listBoxItem, listBoxItemContentGlobal, 
          typeof className === 'function' ? undefined : className
        )}
        {...props}
      >
        {({ isSelected, isPressed: _isPressed, isHovered: _isHovered, isFocused: _isFocused }) => (
          <>
            {startIcon && (
              <IconWrapper position="start" size="md" className="listbox-item-start-icon">
                {startIcon}
              </IconWrapper>
            )}
            
            <div className="listbox-item-content">
              <Text slot="label" className="listbox-item-label">
                {children}
              </Text>
              {description && (
                <Text slot="description" className="listbox-item-description">
                  {description}
                </Text>
              )}
            </div>
            
            {endIcon && (
              <IconWrapper position="end" size="md" className="listbox-item-end-icon">
                {endIcon}
              </IconWrapper>
            )}
            
            {/* Selection indicator for multiple selection */}
            <div className="listbox-item-indicator" data-selected={isSelected}>
              {/* Visual selection indicator */}
            </div>
          </>
        )}
      </AriaListBoxItem>
    );
  }
);

ListBoxItem.displayName = 'ListBoxItem';

/**
 * Accessible ListBox component with single/multiple selection modes.
 * Built on React Aria Components for robust accessibility.
 * 
 * @example
 * ```tsx
 * // Static items
 * <ListBox selectionMode="single" onSelectionChange={(keys) => console.log(keys)}>
 *   <ListBoxItem id="item1">Item 1</ListBoxItem>
 *   <ListBoxItem id="item2">Item 2</ListBoxItem>
 * </ListBox>
 * 
 * // Dynamic items
 * <ListBox 
 *   items={items} 
 *   selectionMode="multiple"
 *   onSelectionChange={(keys) => setSelected(keys)}
 * >
 *   {(item) => (
 *     <ListBoxItem 
 *       id={item.id}
 *       startIcon={item.startIcon}
 *       description={item.description}
 *     >
 *       {item.label}
 *     </ListBoxItem>
 *   )}
 * </ListBox>
 * 
 * // With sections
 * <ListBox sections={sections} selectionMode="single">
 *   {(section) => (
 *     <Section id={section.id}>
 *       <Header>{section.title}</Header>
 *       <Collection items={section.items}>
 *         {(item) => <ListBoxItem>{item.label}</ListBoxItem>}
 *       </Collection>
 *     </Section>
 *   )}
 * </ListBox>
 * ```
 */
export const ListBox = React.forwardRef<HTMLDivElement, ListBoxProps>(
  (
    {
      size = 'md',
      loading = false,
      selectionMode = 'none',
      items,
      sections,
      children,
      emptyMessage = 'No items available',
      loadingMessage = 'Loading...',
      showEmptyState = true,
      className,
      onSelectionChange,
      onAction,
      ...props
    },
    ref
  ) => {
    // Loading state
    if (loading) {
      return (
        <div 
          className={cn(listBox({ size }), listBoxLoading, className)}
          role="listbox"
          aria-busy="true"
          aria-label="Loading items"
        >
          <div className="listbox-loading-content">
            <Spinner size={size} aria-label={loadingMessage} />
            <Text>{loadingMessage}</Text>
          </div>
        </div>
      );
    }

    // Empty state for dynamic items
    const hasItems = items && items.length > 0;
    const hasSections = sections && sections.length > 0;
    const hasChildren = React.Children.count(children) > 0;
    const isEmpty = !hasItems && !hasSections && !hasChildren;

    if (isEmpty && showEmptyState) {
      return (
        <div 
          className={cn(listBox({ size }), listBoxEmpty, className)}
          role="listbox"
          aria-label="Empty list"
        >
          <Text className="listbox-empty-message">
            {emptyMessage}
          </Text>
        </div>
      );
    }

    // Render sections if provided
    if (sections && sections.length > 0) {
      return (
        <AriaListBox
          ref={ref}
          className={cn(listBox({ size }), className)}
          selectionMode={selectionMode}
          onSelectionChange={onSelectionChange}
          onAction={onAction}
          {...props}
        >
          {sections.map((section) => (
            <Section key={section.id} className={listBoxSection}>
              <Header className={listBoxHeader}>{section.title}</Header>
              {section.items.map((item) => (
                <ListBoxItem
                  key={item.id}
                  id={item.id}
                  startIcon={item.startIcon}
                  endIcon={item.endIcon}
                  description={item.description}
                >
                  {item.label}
                </ListBoxItem>
              ))}
            </Section>
          ))}
        </AriaListBox>
      );
    }

    // Main ListBox component
    return (
      <AriaListBox
        ref={ref}
        className={cn(listBox({ size }), className)}
        selectionMode={selectionMode}
        items={items}
        onSelectionChange={onSelectionChange}
        onAction={onAction}
        {...props}
      >
        {children}
      </AriaListBox>
    );
  }
);

ListBox.displayName = 'ListBox';

export default ListBox;
