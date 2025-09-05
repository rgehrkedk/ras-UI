/**
 * NumberField component built on React Aria Components
 * Provides accessible number field functionality with stepper buttons and formatting
 */

import React from 'react';
import { 
  NumberField as AriaNumberField, 
  Label, 
  Input, 
  Text, 
  FieldError,
  Button,
  Group
} from 'react-aria-components';
import type { NumberFieldProps as AriaNumberFieldProps } from 'react-aria-components';

import type { 
  SizedLayoutComponentProps, 
  FormComponentProps
} from '../../types';
import { cn } from '../../utils/cn';

import { 
  numberFieldContainer,
  numberFieldInput,
  numberFieldLabel,
  numberFieldHelperText,
  numberFieldErrorText,
  numberFieldRequired,
  numberFieldSteppers,
  stepperButton,
} from './NumberField.css';

export interface NumberFieldProps 
  extends Omit<AriaNumberFieldProps, 'className' | 'children'>,
          SizedLayoutComponentProps,
          FormComponentProps {
  /**
   * Input placeholder text
   */
  placeholder?: string;
  
  /**
   * NumberField label text
   */
  label?: string;
  
  /**
   * Additional CSS class names for input field
   */
  inputClassName?: string;
  
  /**
   * Validation state for visual feedback
   * @default 'neutral'
   */
  validationState?: 'neutral' | 'valid' | 'invalid';
  
  /**
   * Format the number field
   */
  formatOptions?: Intl.NumberFormatOptions;
  
  /**
   * Show stepper buttons
   * @default true
   */
  showSteppers?: boolean;
}

/**
 * Accessible number field component with label, validation, stepper buttons, and formatting.
 * Built on React Aria Components for robust accessibility and number handling.
 * 
 * @example
 * ```tsx
 * <NumberField 
 *   label="Quantity" 
 *   placeholder="Enter quantity"
 *   minValue={1}
 *   maxValue={100}
 *   size="md"
 * />
 * 
 * <NumberField 
 *   label="Price" 
 *   formatOptions={{
 *     style: 'currency',
 *     currency: 'USD',
 *   }}
 *   validationState="invalid"
 *   errorMessage="Price must be greater than 0"
 * />
 * ```
 */
export const NumberField = React.forwardRef<HTMLInputElement, NumberFieldProps>(
  (
    {
      size = 'md',
      fullWidth = false,
      placeholder,
      label,
      helperText,
      errorMessage,
      validationState = 'neutral',
      className,
      inputClassName,
      isDisabled,
      isInvalid,
      isRequired,
      showSteppers = true,
      formatOptions,
      ...props
    },
    ref
  ) => {
    // Determine validation state from props
    const finalValidationState = isInvalid ? 'invalid' : validationState;
    
    return (
      <AriaNumberField 
        className={cn('flex flex-col', className)}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        isRequired={isRequired}
        formatOptions={formatOptions}
        {...props}
      >
        {label && (
          <Label className={numberFieldLabel}>
            {label}
            {isRequired && <span className={numberFieldRequired}>*</span>}
          </Label>
        )}
        
        <Group
          className={cn(
            numberFieldContainer({
              size: size as 'sm' | 'md' | 'lg',
              validation: finalValidationState as 'neutral' | 'valid' | 'invalid',
              fullWidth,
              disabled: isDisabled,
            })
          )}
        >
          <Input
            ref={ref}
            className={cn(numberFieldInput, inputClassName)}
            placeholder={placeholder}
          />
          
          {showSteppers && (
            <div className={numberFieldSteppers}>
              <Button 
                slot="increment"
                className={stepperButton({ size: size as 'sm' | 'md' | 'lg', position: 'top' })}
                aria-label="Increase value"
              >
                +
              </Button>
              <Button 
                slot="decrement"
                className={stepperButton({ size: size as 'sm' | 'md' | 'lg', position: 'bottom' })}
                aria-label="Decrease value"
              >
                −
              </Button>
            </div>
          )}
        </Group>
        
        {helperText && (
          <Text slot="description" className={numberFieldHelperText}>
            {helperText}
          </Text>
        )}
        
        <FieldError className={numberFieldErrorText} />
      </AriaNumberField>
    );
  }
);

NumberField.displayName = 'NumberField';

export default NumberField;