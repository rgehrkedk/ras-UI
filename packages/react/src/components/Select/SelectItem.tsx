/**
 * SelectItem component for use with Select
 * Provides accessible select option functionality
 */

import React from 'react';
import { ListBoxItem, ListBoxItemProps } from 'react-aria-components';

import { cn } from '../../utils/cn';
import { CheckIcon } from '../Icon';

import { 
  selectItem,
  selectCheckIcon,
  selectItemText,
} from './Select.css';

export interface SelectItemProps extends ListBoxItemProps {
  /**
   * Optional icon to display with the item
   */
  icon?: React.ReactNode;
  
  /**
   * Item content
   */
  children: React.ReactNode;
}

/**
 * SelectItem component for use within Select.
 * Provides accessible select option with selection indicator.
 * 
 * @example
 * ```tsx
 * <Select label="Status">
 *   <SelectItem id="draft">Draft</SelectItem>
 *   <SelectItem id="published">Published</SelectItem>
 *   <SelectItem id="archived" isDisabled>Archived</SelectItem>
 * </Select>
 * 
 * // With icons
 * <Select label="Action">
 *   <SelectItem id="edit" icon={<EditIcon />}>Edit</SelectItem>
 *   <SelectItem id="delete" icon={<TrashIcon />}>Delete</SelectItem>
 * </Select>
 * ```
 */
export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ icon, className, children, ...props }, ref) => {
    return (
      <ListBoxItem
        ref={ref}
        className={(renderProps) =>
          cn(
            selectItem,
            typeof className === 'function' 
              ? className({ ...renderProps, defaultClassName: selectItem })
              : className
          )
        }
        {...props}
      >
        <CheckIcon className={selectCheckIcon} />
        {icon && <span className="select-item-icon">{icon}</span>}
        <span className={selectItemText}>{children}</span>
      </ListBoxItem>
    );
  }
);

SelectItem.displayName = 'SelectItem';

export default SelectItem;