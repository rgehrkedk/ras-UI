/**
 * Table component built on React Aria Components
 * Provides accessible table functionality with sorting, selection, and keyboard navigation
 */

import React from 'react';
import {
  Table as AriaTable,
  TableProps as AriaTableProps
} from 'react-aria-components';

import type { ComponentSize } from '../../types';
import { cn } from '../../utils/cn';

import { table } from './Table.css';

export interface TableProps extends Omit<AriaTableProps, 'className'> {
  /**
   * Table size variant
   * @default 'md'
   */
  size?: ComponentSize;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Table content
   */
  children: React.ReactNode;
  
  /**
   * Whether the table should be striped (alternating row colors)
   * @default false
   */
  striped?: boolean;
  
  /**
   * Whether the table should have borders
   * @default true
   */
  bordered?: boolean;
  
  /**
   * Whether the table should have hover effects on rows
   * @default true
   */
  hoverable?: boolean;
}

/**
 * Accessible table component with sorting, selection, and keyboard navigation.
 * Built on React Aria Components for robust accessibility.
 * 
 * @example
 * ```tsx
 * <Table aria-label="Files" selectionMode="multiple">
 *   <TableHeader>
 *     <Column isRowHeader>Name</Column>
 *     <Column allowsSorting>Size</Column>
 *     <Column allowsSorting>Date Modified</Column>
 *   </TableHeader>
 *   <TableBody>
 *     <Row>
 *       <Cell>document.pdf</Cell>
 *       <Cell>2.5 MB</Cell>
 *       <Cell>2024-01-15</Cell>
 *     </Row>
 *   </TableBody>
 * </Table>
 * 
 * // With sorting
 * <Table 
 *   aria-label="Sortable table"
 *   sortDescriptor={{column: 'name', direction: 'ascending'}}
 *   onSortChange={(descriptor) => setSortDescriptor(descriptor)}
 * >
 *   <TableHeader>
 *     <Column id="name" isRowHeader allowsSorting>Name</Column>
 *     <Column id="size" allowsSorting>Size</Column>
 *   </TableHeader>
 *   <TableBody items={sortedItems}>
 *     {(item) => (
 *       <Row>
 *         <Cell>{item.name}</Cell>
 *         <Cell>{item.size}</Cell>
 *       </Row>
 *     )}
 *   </TableBody>
 * </Table>
 * 
 * // With selection
 * <Table 
 *   aria-label="Files table"
 *   selectionMode="multiple"
 *   selectedKeys={selectedKeys}
 *   onSelectionChange={setSelectedKeys}
 * >
 *   <TableHeader>
 *     <Column>Name</Column>
 *     <Column>Actions</Column>
 *   </TableHeader>
 *   <TableBody>
 *     <Row>
 *       <Cell>file1.txt</Cell>
 *       <Cell>
 *         <Button variant="secondary" size="sm">Delete</Button>
 *       </Cell>
 *     </Row>
 *   </TableBody>
 * </Table>
 * ```
 */
export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (
    {
      size = 'md',
      striped = false,
      bordered = true,
      hoverable = true,
      className,
      children,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      ...props
    },
    ref
  ) => {
    // Accessibility validation
    if (!ariaLabel && !ariaLabelledBy) {
      console.warn(
        'Table: Tables require an aria-label or aria-labelledby prop for accessibility'
      );
    }

    return (
      <AriaTable
        ref={ref}
        className={cn(
          table({
            size,
            striped,
            bordered,
            hoverable,
          }),
          className
        )}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        {...props}
      >
        {children}
      </AriaTable>
    );
  }
);

Table.displayName = 'Table';

export default Table;