/**
 * Checkbox component built on React Aria Components
 * Provides accessible checkbox functionality with multiple sizes and states
 */

import React from 'react';
import { Checkbox as AriaCheckbox, CheckboxProps as AriaCheckboxProps } from 'react-aria-components';

import { cn } from '../../utils/cn';

import { checkbox, checkboxIcon, touchTarget, errorMessage, description } from './Checkbox.css';

export interface CheckboxProps extends AriaCheckboxProps {
  /**
   * Size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Checkbox content/label
   */
  children?: React.ReactNode;
  
  /**
   * Error message to display below the checkbox
   */
  errorMessage?: string;
  
  /**
   * Description text to display below the checkbox
   */
  description?: string;
  
  /**
   * Whether the checkbox has a validation error
   */
  isInvalid?: boolean;
}

/**
 * Accessible checkbox component with support for checked, unchecked, and indeterminate states.
 * Built on React Aria Components for robust accessibility and keyboard navigation.
 * 
 * @example
 * ```tsx
 * <Checkbox size="md">Accept terms and conditions</Checkbox>
 * 
 * <Checkbox size="lg" isIndeterminate>
 *   Partially selected
 * </Checkbox>
 * 
 * <Checkbox 
 *   errorMessage="Please accept the terms to continue"
 *   isInvalid
 * >
 *   Accept terms and conditions
 * </Checkbox>
 * 
 * <Checkbox 
 *   description="This enables advanced features"
 *   size="md"
 * >
 *   Enable premium features
 * </Checkbox>
 * ```
 */
export const Checkbox = React.forwardRef<HTMLLabelElement, CheckboxProps>(
  (
    {
      size = 'md',
      children,
      className,
      errorMessage,
      description: descriptionText,
      isInvalid,
      ...props
    },
    ref
  ) => {
    // Generate unique IDs for ARIA relationships
    const errorId = errorMessage ? React.useId() : undefined;
    const descriptionId = descriptionText ? React.useId() : undefined;
    
    // Build aria-describedby from error and description IDs
    const ariaDescribedBy = [errorId, descriptionId, props['aria-describedby']]
      .filter(Boolean)
      .join(' ') || undefined;

    return (
      <>
        <AriaCheckbox
          ref={ref}
          className={(values) => cn(
            checkbox({ size }),
            typeof className === 'function' ? className(values) : className
          )}
          isInvalid={isInvalid || !!errorMessage}
          aria-describedby={ariaDescribedBy}
          {...props}
        >
          {({ isIndeterminate, isSelected }) => (
            <>
              <div className={touchTarget({ size })}>
                <div className={checkboxIcon({ size })}>
                  <svg viewBox="0 0 18 18" aria-hidden="true" fill="none">
                    {isIndeterminate ? (
                      <rect x={3} y={8} width={12} height={2} fill="currentColor" rx={1} />
                    ) : (
                      <path
                        d="M3 9l3.5 3.5L15 4"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          opacity: isSelected ? 1 : 0,
                        }}
                      />
                    )}
                  </svg>
                </div>
              </div>
              {children && <span>{children}</span>}
            </>
          )}
        </AriaCheckbox>
        
        {/* Error message with role="alert" for screen readers */}
        {errorMessage && (
          <div id={errorId} className={errorMessage} role="alert">
            {errorMessage}
          </div>
        )}
        
        {/* Description text */}
        {descriptionText && (
          <div id={descriptionId} className={description}>
            {descriptionText}
          </div>
        )}
      </>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;