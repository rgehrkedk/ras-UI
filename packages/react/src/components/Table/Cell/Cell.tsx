/**
 * Cell component built on React Aria Components
 * Provides accessible table cell functionality
 */

import React from 'react';
import {
  Cell as AriaCell,
  CellProps as AriaCellProps
} from 'react-aria-components';

import { cn } from '../../../utils/cn';

import { cell } from './Cell.css';

export interface CellProps extends Omit<AriaCellProps, 'className'> {
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Cell content
   */
  children: React.ReactNode;
  
  /**
   * Alignment of cell content
   * @default 'left'
   */
  align?: 'left' | 'center' | 'right';
  
  /**
   * Whether the cell content should truncate with ellipsis
   * @default false
   */
  truncate?: boolean;
  
  /**
   * Whether this is a numeric cell (applies right alignment and monospace font)
   * @default false
   */
  numeric?: boolean;
}

/**
 * Accessible table cell component.
 * Contains the actual data for each row and column intersection.
 * 
 * @example
 * ```tsx
 * // Basic cell
 * <Cell>document.pdf</Cell>
 * 
 * // Cell with custom alignment
 * <Cell align="center">Centered content</Cell>
 * 
 * // Numeric cell (right-aligned, monospace)
 * <Cell numeric>$1,234.56</Cell>
 * 
 * // Cell with truncation
 * <Cell truncate>This is a very long text that will be truncated</Cell>
 * 
 * // Cell with custom content
 * <Cell>
 *   <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
 *     <Icon name="file" />
 *     <span>document.pdf</span>
 *   </div>
 * </Cell>
 * 
 * // Cell with action button
 * <Cell>
 *   <Button variant="secondary" size="sm">
 *     Edit
 *   </Button>
 * </Cell>
 * ```
 */
export const Cell = React.forwardRef<HTMLTableCellElement, CellProps>(
  (
    {
      className,
      children,
      align = 'left',
      truncate = false,
      numeric = false,
      ...props
    },
    ref
  ) => {
    // Auto-align numeric cells to the right
    const finalAlign = numeric ? 'right' : align;

    return (
      <AriaCell
        ref={ref}
        className={cn(
          cell({
            align: finalAlign,
            truncate,
            numeric,
          }),
          className
        )}
        {...props}
      >
        {children}
      </AriaCell>
    );
  }
);

Cell.displayName = 'Cell';

export default Cell;