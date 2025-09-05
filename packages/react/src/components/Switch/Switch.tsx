/**
 * Switch component built on React Aria Components
 * Provides accessible toggle functionality with floating UI design principles
 */

import React, { useState } from 'react';
import { 
  Switch as AriaSwitch, 
  SwitchProps as AriaSwitchProps 
} from 'react-aria-components';

import type { 
  ComponentSize, 
  BaseComponentProps, 
  FormComponentProps, 
  ComponentChildren 
} from '../../types';
import { cn } from '../../utils/cn';

import { 
  switchContainer, 
  switchTrack, 
  switchThumb, 
  switchLabel,
  switchDescription,
  switchError 
} from './Switch.css';

export interface SwitchProps 
  extends Omit<AriaSwitchProps, 'className' | 'children'>,
          BaseComponentProps,
          FormComponentProps {
  /**
   * Switch size
   * @default 'md'
   */
  size?: ComponentSize;
  
  /**
   * Switch label text
   */
  children?: ComponentChildren;
  
  /**
   * Optional description text below the label
   */
  description?: ComponentChildren;
  
  /**
   * Whether the switch is checked/selected
   */
  isSelected?: boolean;
  
  /**
   * Default checked state for uncontrolled switches
   */
  defaultSelected?: boolean;
  
  /**
   * Callback fired when the switch state changes
   */
  onChange?: (isSelected: boolean) => void;
}

/**
 * Accessible switch component with floating UI design principles.
 * Used for binary on/off controls and settings.
 * 
 * @example
 * ```tsx
 * <Switch>Enable notifications</Switch>
 * 
 * <Switch 
 *   isSelected={darkMode} 
 *   onChange={setDarkMode}
 *   description="Switch between light and dark themes"
 * >
 *   Dark mode
 * </Switch>
 * ```
 */
export const Switch = React.forwardRef<HTMLLabelElement, SwitchProps>(
  (
    {
      size = 'md',
      children,
      description,
      isSelected,
      defaultSelected,
      onChange,
      isDisabled = false,
      isInvalid = false,
      isRequired = false,
      errorMessage,
      helperText,
      className,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    
    // Generate unique IDs for accessibility
    const descriptionId = React.useId();
    
    // Compute display text for descriptions/errors
    const displayText = isInvalid && errorMessage 
      ? errorMessage 
      : helperText || description;
    const isError = isInvalid && !!errorMessage;

    return (
      <AriaSwitch
        ref={ref}
        className={cn(switchContainer, className)}
        isSelected={isSelected}
        defaultSelected={defaultSelected}
        onChange={onChange}
        isDisabled={isDisabled}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onFocusChange={setIsFocused}
        {...props}
        aria-required={isRequired}
        aria-invalid={isInvalid}
        aria-describedby={displayText ? descriptionId : undefined}
      >
        {({ isSelected: checked, isDisabled: disabled }) => (
          <>
            <div
              className={switchTrack({ size, checked })}
              data-disabled={disabled}
              data-hovered={isHovered}
              data-focused={isFocused}
            >
              <div 
                className={switchThumb({ size, checked })}
                data-checked={checked}
              />
            </div>
            
            {children && (
              <div>
                <div className={switchLabel({ size })} data-disabled={disabled}>
                  {children}
                  {isRequired && (
                    <span aria-label="required" style={{ color: 'var(--color-danger)' }}>
                      {' *'}
                    </span>
                  )}
                </div>
                
                {displayText && (
                  <div 
                    id={descriptionId}
                    className={isError ? switchError : switchDescription}
                    data-disabled={disabled}
                  >
                    {displayText}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </AriaSwitch>
    );
  }
);

Switch.displayName = 'Switch';

export default Switch;