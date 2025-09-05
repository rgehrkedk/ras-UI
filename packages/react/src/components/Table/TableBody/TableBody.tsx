/**
 * TableBody component built on React Aria Components
 * Provides accessible table body functionality
 */

import React from 'react';
import {
  TableBody as AriaTableBody,
  TableBodyProps as AriaTableBodyProps
} from 'react-aria-components';

import { cn } from '../../../utils/cn';

import { tableBody } from './TableBody.css';

export interface TableBodyProps<T = any> extends Omit<AriaTableBodyProps<T>, 'className'> {
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Body content (typically Row components)
   */
  children: React.ReactNode;
  
  /**
   * Custom empty state content to show when no data is available
   */
  renderEmptyState?: () => React.ReactNode;
}

/**
 * Accessible table body component.
 * Contains Row components that represent the table data.
 * 
 * @example
 * ```tsx
 * <TableBody>
 *   <Row>
 *     <Cell>document.pdf</Cell>
 *     <Cell>2.5 MB</Cell>
 *   </Row>
 *   <Row>
 *     <Cell>image.jpg</Cell>
 *     <Cell>1.2 MB</Cell>
 *   </Row>
 * </TableBody>
 * 
 * // With dynamic data
 * <TableBody items={files}>
 *   {(file) => (
 *     <Row key={file.id}>
 *       <Cell>{file.name}</Cell>
 *       <Cell>{file.size}</Cell>
 *     </Row>
 *   )}
 * </TableBody>
 * 
 * // With empty state
 * <TableBody
 *   items={[]}
 *   renderEmptyState={() => (
 *     <div>No files found</div>
 *   )}
 * >
 *   {(file) => (
 *     <Row key={file.id}>
 *       <Cell>{file.name}</Cell>
 *     </Row>
 *   )}
 * </TableBody>
 * ```
 */
export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, children, renderEmptyState, ...props }, ref) => {
    return (
      <AriaTableBody
        ref={ref}
        className={cn(tableBody, className)}
        renderEmptyState={renderEmptyState}
        {...props}
      >
        {children}
      </AriaTableBody>
    );
  }
);

TableBody.displayName = 'TableBody';

export default TableBody;