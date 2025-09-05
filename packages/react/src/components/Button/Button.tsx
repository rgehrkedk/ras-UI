/**
 * Button component built on React Aria Components
 * Provides accessible button functionality with multiple variants
 */

import React from 'react';
import { Button as AriaButton, ButtonProps as AriaButtonProps } from 'react-aria-components';

import { useComponentState } from '../../hooks';
import type { 
  SizedLayoutComponentProps, 
  LoadingComponentProps, 
  DisableableComponentProps,
  WithIcons,
  ButtonVariant 
} from '../../types';
import { cn } from '../../utils/cn';
import { IconWrapper } from '../Icon';
import { Spinner } from '../Spinner';

import { button, buttonIcon } from './Button.css';

export interface ButtonProps 
  extends Omit<AriaButtonProps, 'className' | 'children'>,
          SizedLayoutComponentProps,
          LoadingComponentProps,
          DisableableComponentProps,
          WithIcons {
  /**
   * Visual style variant
   * @default 'primary'
   */
  variant?: ButtonVariant;
  
  /**
   * Button content
   */
  children?: React.ReactNode;
}

/**
 * Accessible button component with multiple variants and states.
 * Built on React Aria Components for robust accessibility.
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onPress={() => alert('Clicked!')}>
 *   Click me
 * </Button>
 * 
 * <Button variant="secondary" startIcon={<Icon name="save" />}>
 *   Save Document
 * </Button>
 * 
 * <Button variant="primary" endIcon={<Icon name="arrow-right" />}>
 *   Continue
 * </Button>
 * 
 * <Button variant="icon" aria-label="Edit" startIcon={<Icon name="edit" />} />
 * 
 * <Button variant="secondary" loading startIcon={<Icon name="upload" />}>
 *   Upload Files
 * </Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      startIcon,
      endIcon,
      className,
      children,
      isDisabled,
      ...props
    },
    ref
  ) => {
    const { computedDisabled, ariaProps } = useComponentState({
      isDisabled,
      loading,
    });

    // For icon-only buttons or buttons without children, require aria-label
    const isIconOnly = variant === 'icon' || (!children && (startIcon || endIcon));
    if (isIconOnly && !props['aria-label'] && !props['aria-labelledby']) {
      console.warn(
        'Button: Icon-only buttons require an aria-label or aria-labelledby prop for accessibility'
      );
    }

    return (
      <AriaButton
        ref={ref}
        className={cn(
          button({
            variant,
            size,
            fullWidth: variant === 'icon' ? false : fullWidth, // Icon buttons don't support fullWidth
          }),
          className
        )}
        isDisabled={computedDisabled}
        {...ariaProps}
        {...props}
      >
        {loading && (
          <Spinner size={size} aria-label="Loading" />
        )}
        
        {!loading && startIcon && (
          <IconWrapper position="start" size={size} className={buttonIcon}>
            {startIcon}
          </IconWrapper>
        )}
        
        {children && <span>{children}</span>}
        
        {!loading && endIcon && (
          <IconWrapper position="end" size={size} className={buttonIcon}>
            {endIcon}
          </IconWrapper>
        )}
      </AriaButton>
    );
  }
);

Button.displayName = 'Button';

export default Button;