/**
 * TableHeader component built on React Aria Components
 * Provides accessible table header functionality
 */

import React from 'react';
import {
  TableHeader as AriaTableHeader,
  TableHeaderProps as AriaTableHeaderProps
} from 'react-aria-components';

import { cn } from '../../../utils/cn';

import { tableHeader } from './TableHeader.css';

export interface TableHeaderProps extends Omit<AriaTableHeaderProps<any>, 'className'> {
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Header content (typically Column components)
   */
  children: React.ReactNode;
}

/**
 * Accessible table header component.
 * Contains Column components that define the table structure.
 * 
 * @example
 * ```tsx
 * <TableHeader>
 *   <Column isRowHeader>Name</Column>
 *   <Column allowsSorting>Size</Column>
 *   <Column allowsSorting>Date Modified</Column>
 * </TableHeader>
 * ```
 */
export const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <AriaTableHeader
        ref={ref}
        className={cn(tableHeader, className)}
        {...props}
      >
        {children}
      </AriaTableHeader>
    );
  }
);

TableHeader.displayName = 'TableHeader';

export default TableHeader;