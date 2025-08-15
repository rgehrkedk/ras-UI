/**
 * Shared type definitions for component props and common patterns
 */

import type { ReactNode } from 'react';

// Size variants used across components
export type ComponentSize = 'sm' | 'md' | 'lg';
export type ExtendedSize = ComponentSize | 'xl';

// Base props that most components share
export interface BaseComponentProps {
  /**
   * Additional CSS class names
   */
  className?: string;
}

// Props for components that support sizing
export interface SizedComponentProps extends BaseComponentProps {
  /**
   * Component size
   * @default 'md'
   */
  size?: ComponentSize;
}

// Props for components that support full width layout
export interface LayoutComponentProps extends BaseComponentProps {
  /**
   * Whether component should take full width of container
   * @default false
   */
  fullWidth?: boolean;
}

// Combined props for components with both sizing and layout
export interface SizedLayoutComponentProps extends SizedComponentProps {
  /**
   * Whether component should take full width of container
   * @default false
   */
  fullWidth?: boolean;
}

// Props for components that support loading states
export interface LoadingComponentProps {
  /**
   * Loading state - shows spinner and disables interaction
   * @default false
   */
  loading?: boolean;
}

// Props for components that can be disabled
export interface DisableableComponentProps {
  /**
   * Whether the component is disabled
   * @default false
   */
  isDisabled?: boolean;
}

// Common state types
export type ComponentState = 'default' | 'disabled' | 'loading' | 'error' | 'success';

// Validation state props
export interface ValidationProps {
  /**
   * Whether the component has validation errors
   * @default false
   */
  isInvalid?: boolean;
  
  /**
   * Whether the component is required
   * @default false
   */
  isRequired?: boolean;
}

// Form component props that combine validation and disabling
export interface FormComponentProps extends DisableableComponentProps, ValidationProps {
  /**
   * Error message to display when component is invalid
   */
  errorMessage?: string;
  
  /**
   * Helper text to display
   */
  helperText?: string;
}

// Component variant types
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type AlertType = 'info' | 'warning' | 'error' | 'success';

// Event handler types
export type PressHandler = () => void;
export type ChangeHandler<T = string> = (value: T) => void;
export type CloseHandler = () => void;

// Helper type for component children
export type ComponentChildren = ReactNode;