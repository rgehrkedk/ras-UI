/**
 * Select component built on React Aria Components
 * Provides accessible select/dropdown functionality with multiple variants
 */

import React, { useEffect, useId, useRef } from "react";
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
} from "react-aria-components";

import { useComponentState, useValidation } from "../../hooks";
import type {
  SizedLayoutComponentProps,
  FormComponentProps,
} from "../../types";
import { cn } from "../../utils/cn";
import { ChevronDownIcon } from "../Icon";

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
} from "./Select.css";

export interface SelectProps<T extends object>
  extends Omit<AriaSelectProps<T>, "className" | "children">,
    SizedLayoutComponentProps,
    Omit<FormComponentProps, "errorMessage"> {
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
export const Select = <T extends object>({
  size = "md",
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
}: SelectProps<T>) => {
  const labelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { ariaProps } = useComponentState({
    isDisabled,
    isInvalid,
    isRequired,
  });

  const { showHelper, displayHelperText } = useValidation({
    isInvalid,
    errorMessage: typeof errorMessage === "string" ? errorMessage : undefined,
    helperText,
  });

  // Ensure ARIA state attributes are present on the trigger for tests/assertions
  useEffect(() => {
    const el = triggerRef.current;
    if (!el) return;
    if (isInvalid) el.setAttribute("aria-invalid", "true");
    else el.removeAttribute("aria-invalid");
    if (isRequired) el.setAttribute("aria-required", "true");
    else el.removeAttribute("aria-required");
    if (isDisabled) el.setAttribute("aria-disabled", "true");
    else el.removeAttribute("aria-disabled");
  }, [isInvalid, isRequired, isDisabled]);

  return (
    <AriaSelect
      className={cn(selectBase, className)}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      isRequired={isRequired}
      validationBehavior="aria"
      {...ariaProps}
      {...props}
    >
      {label && (
        <Label id={labelId} className={selectLabel}>
          {label}
          {isRequired && <span className={selectRequired}>*</span>}
        </Label>
      )}

      <Button
        ref={triggerRef}
        className={selectTrigger({
          size,
          fullWidth,
        })}
        // Ensure state is reflected on the trigger for tests/accessibility
        aria-disabled={isDisabled ? "true" : undefined}
        aria-invalid={isInvalid ? "true" : undefined}
        aria-required={isRequired ? "true" : undefined}
        // Force accessible name to reference the visible label only
        aria-labelledby={label ? labelId : undefined}
      >
        <SelectValue className={selectValue} aria-hidden="true">
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

      <FieldError className={selectErrorText}>
        {typeof errorMessage === "function"
          ? (validation: ValidationResult) => errorMessage(validation)
          : errorMessage}
      </FieldError>

      <Popover className={selectPopover} isNonModal>
        <ListBox className={selectListBox} items={items}>
          {children}
        </ListBox>
      </Popover>
    </AriaSelect>
  );
};

Select.displayName = "Select";

export default Select;
