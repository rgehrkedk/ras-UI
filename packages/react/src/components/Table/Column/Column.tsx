/**
 * Column component built on React Aria Components
 * Provides accessible table column functionality with sorting support
 */

import React from 'react';
import {
  Column as AriaColumn,
  ColumnProps as AriaColumnProps
} from 'react-aria-components';

import { cn } from '../../../utils/cn';

import { 
  column, 
  sortIcon, 
  sortIconSvg,
  columnContent, 
  columnContentLeft, 
  columnContentCenter, 
  columnContentRight, 
  columnText 
} from './Column.css';

export interface ColumnProps extends Omit<AriaColumnProps, 'className' | 'width' | 'minWidth' | 'maxWidth'> {
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Column content (header text)
   */
  children: React.ReactNode;
  
  /**
   * Column width (CSS value)
   */
  width?: string | number;
  
  /**
   * Minimum column width (CSS value)
   */
  minWidth?: string | number;
  
  /**
   * Maximum column width (CSS value)
   */
  maxWidth?: string | number;
  
  /**
   * Whether the column should be sticky (fixed position during scroll)
   * @default false
   */
  isSticky?: boolean;
  
  /**
   * Alignment of column content
   * @default 'left'
   */
  align?: 'left' | 'center' | 'right';
}

/**
 * Accessible table column component with optional sorting.
 * Defines the structure and behavior of table columns.
 * 
 * @example
 * ```tsx
 * // Basic column
 * <Column>Name</Column>
 * 
 * // Row header column (first column with semantic meaning)
 * <Column isRowHeader>Name</Column>
 * 
 * // Sortable column
 * <Column id="name" allowsSorting>Name</Column>
 * 
 * // Column with custom width and alignment
 * <Column width="200px" align="right">Size</Column>
 * 
 * // Sticky column (stays visible during horizontal scroll)
 * <Column isSticky isRowHeader>Name</Column>
 * 
 * // Column with minimum width
 * <Column minWidth="150px" allowsSorting>Description</Column>
 * ```
 */
export const Column = React.forwardRef<HTMLTableCellElement, ColumnProps>(
  (
    {
      className,
      children,
      width,
      minWidth,
      maxWidth,
      isSticky = false,
      align = 'left',
      allowsSorting,
      ...props
    },
    ref
  ) => {
    const style: React.CSSProperties = {};
    
    if (width !== undefined) {
      style.width = typeof width === 'number' ? `${width}px` : width;
    }
    
    if (minWidth !== undefined) {
      style.minWidth = typeof minWidth === 'number' ? `${minWidth}px` : minWidth;
    }
    
    if (maxWidth !== undefined) {
      style.maxWidth = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;
    }
    
    if (isSticky) {
      style.position = 'sticky';
      style.left = 0;
      style.zIndex = 10;
    }

    return (
      <AriaColumn
        ref={ref}
        className={cn(
          column({
            align,
            sortable: allowsSorting,
            sticky: isSticky,
          }),
          className
        )}
        style={style}
        allowsSorting={allowsSorting}
        {...props}
      >
        {({ allowsSorting: sortable, sortDirection }) => {
          const contentAlignClass = align === 'center' ? columnContentCenter 
            : align === 'right' ? columnContentRight 
            : columnContentLeft;
          
          return (
            <div className={cn(columnContent, contentAlignClass)}>
              <span className={columnText}>{children}</span>
              {sortable && (
                <span className={sortIcon} data-sort-direction={sortDirection}>
                  <svg
                    className={sortIconSvg}
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                  >
                    {/* Up arrow */}
                    <path
                      d="M6 3L8.5 6H3.5L6 3Z"
                      fill="currentColor"
                      opacity={sortDirection === 'ascending' ? 1 : 0.3}
                    />
                    {/* Down arrow */}
                    <path
                      d="M6 9L3.5 6H8.5L6 9Z"
                      fill="currentColor"
                      opacity={sortDirection === 'descending' ? 1 : 0.3}
                    />
                  </svg>
                </span>
              )}
            </div>
          );
        }}
      </AriaColumn>
    );
  }
);

Column.displayName = 'Column';

export default Column;