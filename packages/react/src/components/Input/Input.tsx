/**
 * Input component built on React Aria Components
 * Provides accessible text input functionality with labels and validation
 */

import React from 'react';
import { TextField, Label, Input as AriaInput, Text, FieldError } from 'react-aria-components';
import type { TextFieldProps } from 'react-aria-components';

import { useComponentState, useValidation } from '../../hooks';
import type { 
  SizedLayoutComponentProps, 
  FormComponentProps, 
  WithIcons 
} from '../../types';
import { cn } from '../../utils/cn';
import { IconWrapper } from '../Icon';

import { 
  inputContainer, 
  inputField, 
  inputBase, 
  inputLabel, 
  inputHelperText, 
  inputErrorText,
  inputRequired,
  inputStartIcon,
  inputEndIcon 
} from './Input.css';

export interface InputProps 
  extends Omit<TextFieldProps, 'className' | 'children'>,
          SizedLayoutComponentProps,
          FormComponentProps,
          WithIcons {
  /**
   * Input placeholder text
   */
  placeholder?: string;
  
  /**
   * Input type
   * @default 'text'
   */
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'search';
  
  /**
   * Input label text
   */
  label?: string;
  
  /**
   * Additional CSS class names for input field
   */
  inputClassName?: string;
}

/**
 * Accessible input component with label, validation, and helper text.
 * Built on React Aria Components for robust accessibility.
 * 
 * @example
 * ```tsx
 * <Input 
 *   label="Email" 
 *   placeholder="Enter your email"
 *   type="email"
 *   isRequired
 * />
 * 
 * <Input 
 *   label="Search" 
 *   startIcon={<SearchIcon />}
 *   placeholder="Search..."
 * />
 * ```
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      fullWidth = false,
      placeholder,
      type = 'text',
      label,
      helperText,
      errorMessage,
      startIcon,
      endIcon,
      className,
      inputClassName,
      isDisabled,
      isInvalid,
      isRequired,
      ...props
    },
    ref
  ) => {
    const { ariaProps } = useComponentState({
      isDisabled,
      isInvalid,
      isRequired,
    });
    
    // Map component state to input-specific state
    const inputState: 'default' | 'disabled' | 'loading' | 'error' = 
      isInvalid ? 'error' : 
      isDisabled ? 'disabled' : 
      'default';
    
    const { showHelper, displayHelperText } = useValidation({
      isInvalid,
      errorMessage,
      helperText,
    });
    
    return (
      <TextField 
        className={cn('flex flex-col', className)}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        isRequired={isRequired}
        {...ariaProps}
        {...props}
      >
        {label && (
          <Label className={inputLabel}>
            {label}
            {isRequired && <span className={inputRequired}>*</span>}
          </Label>
        )}
        
        <div
          className={inputContainer({
            size,
            state: inputState,
            fullWidth,
          })}
        >
          {startIcon && (
            <IconWrapper position="start" size={size} className={inputStartIcon}>
              {startIcon}
            </IconWrapper>
          )}
          
          <AriaInput
            ref={ref}
            className={cn(inputBase, inputField, inputClassName)}
            placeholder={placeholder}
            type={type}
          />
          
          {endIcon && (
            <IconWrapper position="end" size={size} className={inputEndIcon}>
              {endIcon}
            </IconWrapper>
          )}
        </div>
        
        {showHelper && (
          <Text slot="description" className={inputHelperText}>
            {displayHelperText}
          </Text>
        )}
        
        <FieldError className={inputErrorText} />
      </TextField>
    );
  }
);

Input.displayName = 'Input';

export default Input;