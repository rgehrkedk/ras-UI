/**
 * Select component built on React Aria Components
 * Provides accessible select/dropdown functionality with multiple variants
 */

import React from 'react';
import { 
  Select as AriaSelect, 
  SelectProps as AriaSelectProps,
  SelectValue,
  Button,
  Label,
  Popover,
  ListBox,
  Text,
  FieldError,
  ValidationResult,
} from 'react-aria-components';

import { useComponentState, useValidation } from '../../hooks';
import type { 
  SizedLayoutComponentProps, 
  FormComponentProps,
} from '../../types';
import { cn } from '../../utils/cn';
import { ChevronDownIcon, CheckIcon } from '../Icon';

import { 
  selectBase,
  selectTrigger,
  selectValue,
  selectChevron,
  selectPopover,
  selectListBox,
  selectLabel,
  selectRequired,
  selectHelperText,
  selectErrorText,
} from './Select.css';

export interface SelectProps<T extends object> 
  extends Omit<AriaSelectProps<T>, 'className' | 'children'>,
          SizedLayoutComponentProps,
          Omit<FormComponentProps, 'errorMessage'> {
  /**
   * Select label text
   */
  label?: string;
  
  /**
   * Description text shown below the select
   */
  description?: string;
  
  /**
   * Error message to display when select is invalid
   * Can be a string or a function that receives validation result
   */
  errorMessage?: string | ((validation: ValidationResult) => string);
  
  /**
   * Items for the select (optional - can also be provided as children)
   */
  items?: Iterable<T>;
  
  /**
   * Select option content
   * Can be static ReactNode or render function for items
   */
  children: React.ReactNode | ((item: T) => React.ReactNode);
  
  /**
   * Placeholder text when no option is selected
   */
  placeholder?: string;
}

/**
 * Accessible select component with label, validation, and helper text.
 * Built on React Aria Components for robust accessibility and keyboard navigation.
 * 
 * @example
 * ```tsx
 * <Select 
 *   label="Country" 
 *   placeholder="Select a country"
 *   size="md"
 *   isRequired
 * >
 *   <SelectItem id="us">United States</SelectItem>
 *   <SelectItem id="ca">Canada</SelectItem>
 *   <SelectItem id="mx">Mexico</SelectItem>
 * </Select>
 * 
 * // With data items
 * const countries = [
 *   { id: 'us', name: 'United States' },
 *   { id: 'ca', name: 'Canada' },
 *   { id: 'mx', name: 'Mexico' }
 * ];
 * 
 * <Select 
 *   label="Country" 
 *   items={countries}
 *   placeholder="Choose..."
 * >
 *   {(item) => <SelectItem id={item.id}>{item.name}</SelectItem>}
 * </Select>
 * ```
 */
export const Select = <T extends object>(
  {
    size = 'md',
    fullWidth = false,
    label,
    description,
    placeholder,
    errorMessage,
    helperText,
    className,
    children,
    items,
    isDisabled,
    isInvalid,
    isRequired,
    ...props
  }: SelectProps<T>
) => {
  const { ariaProps } = useComponentState({
    isDisabled,
    isInvalid,
    isRequired,
  });
  
  const { showHelper, displayHelperText } = useValidation({
    isInvalid,
    errorMessage: typeof errorMessage === 'string' ? errorMessage : undefined,
    helperText,
  });
  
  return (
    <AriaSelect
      className={cn(selectBase, className)}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      isRequired={isRequired}
      {...ariaProps}
      {...props}
    >
      {label && (
        <Label className={selectLabel}>
          {label}
          {isRequired && <span className={selectRequired}>*</span>}
        </Label>
      )}
      
      <Button
        className={selectTrigger({
          size,
          fullWidth,
        })}
      >
        <SelectValue className={selectValue}>
          {placeholder}
        </SelectValue>
        <ChevronDownIcon className={selectChevron} />
      </Button>
      
      {description && (
        <Text slot="description" className={selectHelperText}>
          {description}
        </Text>
      )}
      
      {showHelper && (
        <Text slot="description" className={selectHelperText}>
          {displayHelperText}
        </Text>
      )}
      
      <FieldError className={selectErrorText} />
      
      <Popover className={selectPopover}>
        <ListBox className={selectListBox} items={items}>
          {children}
        </ListBox>
      </Popover>
    </AriaSelect>
  );
};

Select.displayName = 'Select';

export default Select;