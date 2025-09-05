/**
 * Row component built on React Aria Components
 * Provides accessible table row functionality with selection support
 */

import React from 'react';
import {
  Row as AriaRow,
  RowProps as AriaRowProps
} from 'react-aria-components';

import { cn } from '../../../utils/cn';

import { row } from './Row.css';

export interface RowProps extends Omit<AriaRowProps<any>, 'className'> {
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Row content (typically Cell components)
   */
  children: React.ReactNode;
  
  /**
   * Whether the row is disabled (cannot be selected or interacted with)
   * @default false
   */
  isDisabled?: boolean;
}

/**
 * Accessible table row component with selection support.
 * Contains Cell components that represent the row data.
 * 
 * @example
 * ```tsx
 * // Basic row
 * <Row>
 *   <Cell>document.pdf</Cell>
 *   <Cell>2.5 MB</Cell>
 *   <Cell>2024-01-15</Cell>
 * </Row>
 * 
 * // Row with unique ID (required for selection)
 * <Row id="row-1">
 *   <Cell>document.pdf</Cell>
 *   <Cell>2.5 MB</Cell>
 * </Row>
 * 
 * // Disabled row
 * <Row isDisabled>
 *   <Cell>protected.pdf</Cell>
 *   <Cell>1.0 MB</Cell>
 * </Row>
 * 
 * // Row with action handler
 * <Row onAction={() => openFile()}>
 *   <Cell>clickable-file.pdf</Cell>
 *   <Cell>3.2 MB</Cell>
 * </Row>
 * ```
 */
export const Row = React.forwardRef<HTMLTableRowElement, RowProps>(
  ({ className, children, isDisabled = false, ...props }, ref) => {
    return (
      <AriaRow
        ref={ref}
        className={cn(
          row({
            disabled: isDisabled,
          }),
          className
        )}
        isDisabled={isDisabled}
        {...props}
      >
        {children}
      </AriaRow>
    );
  }
);

Row.displayName = 'Row';

export default Row;