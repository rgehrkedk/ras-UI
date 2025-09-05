/**
 * TextField component built on React Aria Components
 * Provides accessible text field functionality with labels and validation
 */

import React from 'react';
import { TextField as AriaTextField, Label, Input, TextArea, Text, FieldError } from 'react-aria-components';
import type { TextFieldProps as AriaTextFieldProps } from 'react-aria-components';

import { useComponentState, useValidation } from '../../hooks';
import type { 
  SizedLayoutComponentProps, 
  FormComponentProps
} from '../../types';
import { cn } from '../../utils/cn';

import { 
  textFieldContainer, 
  textFieldInput, 
  textFieldLabel, 
  textFieldHelperText, 
  textFieldErrorText,
  textFieldRequired,
} from './TextField.css';

export interface TextFieldProps 
  extends Omit<AriaTextFieldProps, 'className' | 'children'>,
          SizedLayoutComponentProps,
          FormComponentProps {
  /**
   * Input placeholder text
   */
  placeholder?: string;
  
  /**
   * Input type (only applicable for single-line inputs)
   * @default 'text'
   */
  type?: 'text' | 'email' | 'password' | 'tel' | 'url';
  
  /**
   * TextField label text
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
   * Enable multiline text input using TextArea
   * @default false
   */
  multiline?: boolean;
  
  /**
   * Number of visible text lines for multiline input
   * @default 3
   */
  rows?: number;
}

/**
 * Accessible text field component with label, validation, and helper text.
 * Built on React Aria Components for robust accessibility.
 * 
 * @example
 * ```tsx
 * // Single-line input
 * <TextField 
 *   label="Email Address" 
 *   placeholder="Enter your email"
 *   type="email"
 *   isRequired
 *   size="md"
 * />
 * 
 * // Multiline textarea
 * <TextField 
 *   label="Description"
 *   placeholder="Enter your description..."
 *   multiline
 *   rows={4}
 *   isRequired
 * />
 * 
 * <TextField 
 *   label="Password" 
 *   type="password"
 *   validationState="invalid"
 *   errorMessage="Password must be at least 8 characters"
 * />
 * ```
 */
export const TextField = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, TextFieldProps>(
  (
    {
      size = 'md',
      fullWidth = false,
      placeholder,
      type = 'text',
      label,
      helperText,
      errorMessage,
      validationState = 'neutral',
      className,
      inputClassName,
      isDisabled,
      isInvalid,
      isRequired,
      multiline = false,
      rows = 3,
      ...props
    },
    ref
  ) => {
    const { ariaProps } = useComponentState({
      isDisabled,
      isInvalid,
      isRequired,
    });
    
    // Determine validation state from props
    const finalValidationState = isInvalid ? 'invalid' : validationState;
    
    const { showHelper, displayHelperText } = useValidation({
      isInvalid,
      errorMessage,
      helperText,
    });
    
    return (
      <AriaTextField 
        className={cn('flex flex-col', className)}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        isRequired={isRequired}
        {...ariaProps}
        {...props}
      >
        {label && (
          <Label className={textFieldLabel}>
            {label}
            {isRequired && <span className={textFieldRequired}>*</span>}
          </Label>
        )}
        
        {multiline ? (
          <TextArea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className={cn(
              textFieldContainer({
                size: size as 'sm' | 'md' | 'lg',
                validation: finalValidationState as 'neutral' | 'valid' | 'invalid',
                fullWidth,
                disabled: isDisabled,
              }),
              textFieldInput,
              inputClassName
            )}
            placeholder={placeholder}
            rows={rows}
          />
        ) : (
          <Input
            ref={ref as React.Ref<HTMLInputElement>}
            className={cn(
              textFieldContainer({
                size: size as 'sm' | 'md' | 'lg',
                validation: finalValidationState as 'neutral' | 'valid' | 'invalid',
                fullWidth,
                disabled: isDisabled,
              }),
              textFieldInput,
              inputClassName
            )}
            placeholder={placeholder}
            type={type}
          />
        )}
        
        {showHelper && (
          <Text slot="description" className={textFieldHelperText}>
            {displayHelperText}
          </Text>
        )}
        
        <FieldError className={textFieldErrorText} />
      </AriaTextField>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;